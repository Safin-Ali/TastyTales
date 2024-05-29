import React, { memo, useState } from 'react';
import Recipes_Card, { RecipesShortInfo } from '../../components/Card/Recipe_Card';
import Confirm_Alert from '../../components/Modal/Confirm_Alert';
import { endpointApi } from '../../utils/https-fetcher';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { toast } from 'keep-react';
import { useNavigate } from 'react-router-dom';
import { decInstantCoin } from '../../redux/slicer/userData_slicer';
import { MdSort } from "react-icons/md";
import { country_names, recipe_categories } from '../../components/data/recipe_form';
import { EmptyData } from '../../components/Empty/EmptyData';

export type AlertModalState = { active: boolean, recipeId: string }
export type AlertModalHandler = (sts: AlertModalState) => void

type SortHandlerParams = {
	readonly type:'country' | 'category';
	readonly evt:React.ChangeEvent<HTMLSelectElement>
}

const Recipes_Page: React.FC = memo(() => {


	const [modal, setModalStatus] = useState<AlertModalState>({ active: false, recipeId: '' });

	const { recipesData, userData } = useSelector((state: RootState) => state);

	const [sortedRecipes,setSortedRecipes] = useState<RecipesShortInfo[] | []>([]);

	const dispatch = useDispatch();

	const handleAlertModal: AlertModalHandler = (sts): void => {
		setModalStatus(sts)
	}

	const dismissModal = () => {
		setModalStatus({ active: false, recipeId: '' })
	}

	const navigate = useNavigate();

	const handleSort = (arg:SortHandlerParams) => {

		const value = arg.evt.currentTarget.value.toLowerCase();

		if(value === 'null') return;

		const sortedData = recipesData[recipesData.filteredData.length ? 'filteredData' : 'data'].filter(dt => dt[arg.type].toLowerCase().includes(value));

		if(!sortedData.length) {
			toast.info('No recipes found',{
				position:'bottom-center'
			});
			return
		}

		setSortedRecipes(sortedData);
	}

	if (!recipesData.data.length) return <EmptyData/>

	return (
		<>
			<section className={ `py-5` }>
				<div className="flex items-center flex-col gap-5 justify-center">
					<div className={ `inline-flex items-center` }>
						<span><MdSort size={ 30 } /></span>
						<span className={ `font-medium ml-3 mr-5` }>Short By</span>

						<div>
							<select
								onChange={(evt:React.ChangeEvent<HTMLSelectElement>) => handleSort({type:'category',evt}) }
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
								onChange={(evt:React.ChangeEvent<HTMLSelectElement>) => handleSort({type:'country',evt}) }
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
			</section>
			<Confirm_Alert
				alertTitle={ 'Confirm Recipe Purchase' }
				alertShortDesc={ 'To access detailed information, you need to purchase the recipe. Are you sure you want to proceed?' }
				possitiveButton={ {
					label: 'Purchase',
					cb: () => {

						const promise = new Promise((resolve, reject) => {
							endpointApi.post(`/purchase/recipe?userEmail=${userData.userAuth?.email}&recipesId=${modal.recipeId}`)
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