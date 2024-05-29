import React, { useState } from 'react';
import { FaRegHeart, FaEye, FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Button, toast } from 'keep-react';
import { google_redirect_auth } from '../../firebase/utils/firebase_auth_utils';
import { AlertModalHandler } from '../../pages/recipes/Recipes_Page';
import { endpointApi } from '../../utils/https-fetcher';
import { handleInstantReact } from '../../redux/slicer/userData_slicer';
import { useNavigate } from 'react-router-dom';

export interface RecipesShortInfo {
	_id: string;
	purchased_by: string[];
	reacts: number;
	recipeName: string;
	creatorEmail: string;
	recipeImage: string;
	watchCount: number;
	country: string;
}

interface Props extends RecipesShortInfo {
	alertModalHandler: AlertModalHandler
}

const RecipesCard: React.FC<Props> = ({
	_id,
	country,
	purchased_by,
	reacts,
	creatorEmail,
	recipeImage,
	watchCount,
	alertModalHandler,
	recipeName
}) => {
	const { userAuth } = useSelector((state: RootState) => state.userData);

	const [reactsState,setReacts] = useState<number>(reacts);

	const dispatch = useDispatch();

	const navigate = useNavigate();

	const handleDetails = () => {
		if (!userAuth) {
			toast.info('You need to LogIn', {
				action: {
					label: 'Sign In',
					onClick: () => google_redirect_auth(),
				},
				position:'bottom-center'
			});
		} else if (userAuth.email === creatorEmail || purchased_by.includes(userAuth.email)) {
			navigate(`/recipe/${_id}?user=${userAuth.email}`)
		} else if (userAuth && userAuth.coin < 10) {
			// redirect user to the coin purchase page
		} else if (userAuth && userAuth.coin > 10) {
			alertModalHandler({
				active: true,
				recipeId: _id
			})
		}
	};

	const existReact = userAuth?.reacts.includes(_id);

	const handleReact = async () => {
		const res = await endpointApi.patch(`/recipe/addReact`, {
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				recipeId: _id,
				userEmail: userAuth?.email
			})
		})

		if (res.status === 200) {

			const type = existReact ? 0 : 1
			dispatch(
				handleInstantReact({
					id: _id,
					type
				})
			)

			setReacts(type === 0 ? reactsState-1 : reactsState+1)
		}
	};

	return (
		<article className="border rounded-lg flex gap-4 mx-auto overflow-hidden shadow-medium transition-transform transform hover:scale-[1.01] ease-linear max-w-2xl">
			<div className="w-1/3">
				<img
					src={ recipeImage }
					alt={ `${recipeName} thumbnail` }
					className="w-full h-full object-cover"
				/>
			</div>

			<div className="flex flex-col justify-center p-4 w-2/3">
				<h2 className="text-2xl font-medium mb-2">{ recipeName }</h2>

				<p className="text-sm text-gray-600"><strong>Creator Email:</strong> <a href={ `mailto:${creatorEmail}` } className="text-blue-500">{ creatorEmail }</a></p>
				<p className="text-sm text-gray-600"><strong>From:</strong> { country }</p>

				<div className="mt-4">
					<Button
						size="xs"
						onClick={ handleDetails }
						className="text-white px-4 py-2 rounded"
					>
						Details
					</Button>
				</div>

				<div className="flex text-gray-500 items-center mt-4 gap-5">
					<div
						className={`flex items-center flex-col ${userAuth && 'cursor-pointer'}`}
						onClick={ userAuth ? handleReact : () => null }
						title={`${!userAuth ? 'Login to React' : 'Add React'}`}
					>
						{
							existReact
								?
								<FaHeart size={ 20 } className={`fill-blue-600 `}/>
								:
								<FaRegHeart size={ 20 } />
						}
						<span className="text-sm">{ reactsState }</span>
					</div>

					<div className="flex items-center flex-col">
						<FaEye size={ 20 } />
						<span className="text-sm">{ watchCount }</span>
					</div>
				</div>
			</div>
		</article>
	);
};

export default RecipesCard;
