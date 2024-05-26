import React from 'react';
import { FaRegHeart, FaEye } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Button, toast } from 'keep-react';
import { google_redirect_auth } from '../../firebase/utils/firebase_auth_utils';
import { AlertModalHandler } from '../../pages/recipes/Recipes_Page';

export interface RecipesShortInfo {
	_id: string;
	purchased: number;
	reacts: number;
	recipeName: string;
	creatorEmail: string;
	recipeImage: string;
	watchCount: number;
	country: string;
}

interface Props extends  RecipesShortInfo{
	alertModalHandler:AlertModalHandler
}

const RecipesCard: React.FC<Props> = ({
	_id,
	country,
	purchased,
	reacts,
	creatorEmail,
	recipeImage,
	watchCount,
	alertModalHandler,
	recipeName
}) => {
	const { userAuth } = useSelector((state: RootState) => state.userData);

	const handleDetails = () => {
		if (!userAuth) {
			toast('You need to LogIn', {
				action: {
					label: 'Sign In',
					onClick: () => google_redirect_auth(),
				},
			});
		} else if (userAuth.email === creatorEmail) {
			// visit details page to the user
		} else if (userAuth && userAuth.coin < 10) {
			// redirect user to the coin purchase page
		} else if(userAuth && userAuth.coin > 10) {
			alertModalHandler({
				active:true,
				recipeId:_id
			})
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
				<p className="text-sm text-gray-600"><strong>Purchased:</strong> { purchased }</p>
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
					<div className="flex items-center flex-col cursor-pointer">
						<FaRegHeart size={ 20 } />
						<span className="text-sm">{ reacts }</span>
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
