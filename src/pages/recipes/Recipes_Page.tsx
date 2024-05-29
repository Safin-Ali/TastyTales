import React, { memo, useState } from 'react';
import Recipes_Card, { RecipesShortInfo } from '../../components/Card/Recipe_Card';
import Confirm_Alert from '../../components/Modal/Confirm_Alert';
import { endpointApi } from '../../utils/https-fetcher';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { toast } from 'keep-react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { decInstantCoin } from '../../redux/slicer/userData_slicer';

export type AlertModalState = { active: boolean, recipeId: string }
export type AlertModalHandler = (sts: AlertModalState) => void

const Recipes_Page: React.FC = memo(() => {

	const recipes = useLoaderData() as RecipesShortInfo[];

	const [modal, setModalStatus] = useState<AlertModalState>({ active: false, recipeId: '' });

	const { userAuth } = useSelector((state: RootState) => state.userData);

	const dispatch = useDispatch();

	const handleAlertModal: AlertModalHandler = (sts): void => {
		setModalStatus(sts)
	}

	const dismissModal = () => {
		setModalStatus({ active: false, recipeId: '' })
	}

	const navigate = useNavigate();

	if (!recipes.length) return <div>no recipes found</div>

	return (
		<>
			<section className={ `py-5` }>
				<div className="flex items-center flex-col gap-5 justify-center">
					{
						recipes.map((res, idx) => {
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
							endpointApi.post(`/purchase/recipe?userEmail=${userAuth?.email}&recipesId=${modal.recipeId}`)
								.then((res) => {
									if (res.status === 200) {
										resolve(true);
										dismissModal();
										navigate(`/recipe/${modal.recipeId}?user=${userAuth?.email}`)
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
							position:'bottom-center'
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