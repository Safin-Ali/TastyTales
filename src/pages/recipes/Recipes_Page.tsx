import { Spinner, toast } from 'keep-react';
import React, { memo, useEffect, useRef, useState } from 'react';
import { MdSort } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useNavigation } from 'react-router-dom';
import Recipes_Card, { RecipesShortInfo } from '../../components/Card/Recipe_Card';
import { EmptyData } from '../../components/Empty/EmptyData';
import Confirm_Alert from '../../components/Modal/Confirm_Alert';
import { country_names, recipe_categories } from '../../data/recipe_form';
import { decInstantCoin } from '../../redux/slicer/userData_slicer';
import { RootState } from '../../redux/store';
import { endpointApi } from '../../utils/https-fetcher';
import { getJwt } from '../../utils/common';
import Loading_Screen from '../home/Loading_Screen';
import { setRecipes } from '../../redux/slicer/recipesData_slicer';

export type AlertModalState = { active: boolean, recipeId: string }
export type AlertModalHandler = (sts: AlertModalState) => void

type SortHandlerParams = {
	readonly type: 'country' | 'category';
	readonly evt: React.ChangeEvent<HTMLSelectElement>
}

const Recipes_Page: React.FC = memo(() => {


	const [modal, setModalStatus] = useState<AlertModalState>({ active: false, recipeId: '' });

	const { recipesData, userData } = useSelector((state: RootState) => state);

	const [sortedRecipes, setSortedRecipes] = useState<RecipesShortInfo[] | []>([]);

	const spinnerRef = useRef<HTMLDivElement>(null);

	const [reached, setReached] = useState<boolean>(false);

	const rangeRef = useRef<number>(1);

	const dispatch = useDispatch();

	const handleAlertModal: AlertModalHandler = (sts): void => {
		setModalStatus(sts)
	}

	const dismissModal = () => {
		setModalStatus({ active: false, recipeId: '' })
	}

	const navigate = useNavigate();

	const { state } = useNavigation();

	const handleSort = (arg: SortHandlerParams) => {

		const value = arg.evt.currentTarget.value.toLowerCase();

		if (value === 'null') {
			if (sortedRecipes.length) {
				setSortedRecipes(sortedRecipes)
			}
		}

		let sortedData: RecipesShortInfo[] | [] = []

		if (sortedRecipes.length) {
			sortedRecipes.filter(dt => dt[arg.type].toLowerCase().includes(value));
		} else {
			sortedData = recipesData[recipesData.filteredData.length ? 'filteredData' : 'data'].filter(dt => dt[arg.type].toLowerCase().includes(value));
		}

		if (!sortedData.length) {
			if (value !== 'null') {
				toast.info('No recipes found', {
					position: 'bottom-center'
				});
			}
			setSortedRecipes([])
			return
		}
		setSortedRecipes(sortedData);
	};

	const interSectionObserverCb = async ([entry]: IntersectionObserverEntry[]) => {

		if (entry.isIntersecting && !reached) {
			const newRange = rangeRef.current * 5;
			const res = await endpointApi.get(`/recipe/getRecipes?r=${newRange}`);
			if (res.status === 200) {
				const data: RecipesShortInfo[] | [] = await res.json();
				dispatch(setRecipes([...recipesData.data, ...data]));
				rangeRef.current = rangeRef.current + 1;

				if (data.length < 5) {
					setReached(() => true);
				}
			}

		}
	};


	useEffect(() => {
		const observer = new IntersectionObserver(
			interSectionObserverCb,
			{
				root: null,
				rootMargin: '0px',
				threshold: 1,
			}
		);

		if (spinnerRef.current) {
			observer.observe(spinnerRef.current); // Start observing the spinner element
		}

		return () => {
			if (spinnerRef.current) {
				observer.unobserve(spinnerRef.current); // Stop observing when component unmounts
			}
		};
	}, [recipesData]);

	if (state === 'loading') return <Loading_Screen text={ 'Retrieving Recipe Information...' } />

	if (!recipesData.data.length) return <EmptyData />

	return (
		<>
			<section className={ `py-5` }>
				<div className="flex items-center flex-col gap-5 justify-center">
					<div className={ `inline-flex items-center` }>
						<span><MdSort size={ 30 } /></span>
						<span className={ `font-medium ml-3 mr-5` }>Short By</span>

						<div>
							<select
								onChange={ (evt: React.ChangeEvent<HTMLSelectElement>) => handleSort({ type: 'category', evt }) }
								className={ `border cursor-pointer mx-2 w-fit text-center focus-visible:outline-none py-2 [&>option]:text-metal-900 rounded-lg` }
							>
								<option value="null" defaultValue={ 'null' }>Category</option>
								{
									recipe_categories.map((ct, idx) => <option
										key={ idx }
										value={ ct.toLowerCase() }>
										{ ct }
									</option>)
								}
							</select>

							<select
								className={ `border cursor-pointer mx-2 w-fit text-center focus-visible:outline-none py-2 [&>option]:text-metal-900 rounded-lg` }
								onChange={ (evt: React.ChangeEvent<HTMLSelectElement>) => handleSort({ type: 'country', evt }) }
							>
								<option value="null" defaultValue={ 'null' }>Country</option>
								{
									country_names.map((ct, idx) => <option
										key={ idx }
										value={ ct.toLowerCase() }>
										{ ct }
									</option>)
								}
							</select>
						</div>

					</div>
					{
						!sortedRecipes.length
							?
							recipesData[recipesData.filteredData.length ? 'filteredData' : 'data'].map((res, idx) => {
								return <Recipes_Card
									alertModalHandler={ handleAlertModal }
									{ ...res }
									key={ idx } />
							})
							:
							sortedRecipes.map((res, idx) => {
								return <Recipes_Card
									alertModalHandler={ handleAlertModal }
									{ ...res }
									key={ idx } />
							})
					}
				</div>
				{
					reached
						?
						<></>
						:
						<div className={ `w-fit mx-auto mt-8` } ref={ spinnerRef }>
							<Spinner size={ 'lg' } />
						</div>
				}
			</section>
			<Confirm_Alert
				alertTitle={ 'Confirm Recipe Purchase' }
				alertShortDesc={ 'To access detailed information, you need to purchase the recipe. Are you sure you want to proceed?' }
				possitiveButton={ {
					label: 'Purchase',
					cb: () => {

						const promise = new Promise((resolve, reject) => {
							endpointApi.get(`/purchase/recipe?userEmail=${userData.userAuth?.email}&recipesId=${modal.recipeId}`, {
								headers: {
									'Authorization': getJwt(),
								}
							})
								.then((res) => {
									if (res.status === 200) {
										resolve(true);
										dismissModal();
										navigate(`/recipe/${modal.recipeId}?user=${userData.userAuth?.email}`)
										return
									}
									reject(true)
								})
								.catch(() => {
									reject(true)
								})
						})

						toast.promise(promise, {
							loading: 'Processing your request...',
							success: () => {
								dispatch(decInstantCoin())
								return 'Purchase completed successfully'
							},
							error: 'Purchase failed. Please try again.',
							position: 'bottom-center'
						})
					}
				} }
				negativeButton={ {
					label: 'Cancel',
					cb: dismissModal
				} }
				modalState={ modal.active }
				cb={ {
					onDismiss: dismissModal
				} } />
		</>
	);
})

export default Recipes_Page;