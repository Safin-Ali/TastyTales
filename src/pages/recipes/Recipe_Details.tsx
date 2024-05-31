import React from 'react';
import { useLoaderData, useNavigate, useNavigation } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import Loading_Screen from '../home/Loading_Screen';
interface RecipeDetails {
	_id: string;
	recipeName: string;
	recipeCreator: string;
	purchased_by: string[];
	reacts: number;
	watchCount: number;
	creatorEmail: string;
	recipeImage: string;
	recipeDetails: string;
	embeddedYoutubeUrl: string;
	country: string;
	category: string;
	similarRecipe: {
		_id: string;
		recipeName: string;
		recipeImage: string
	}[];
}

const RecipeDetails: React.FC = () => {
	const {
		category,
		country,
		creatorEmail,
		embeddedYoutubeUrl,
		reacts,
		recipeCreator,
		recipeDetails,
		recipeImage,
		watchCount,
		recipeName,
		purchased_by,
		similarRecipe
	} = useLoaderData() as RecipeDetails;

	const { userAuth } = useSelector((state: RootState) => state.userData);

	const naviagte = useNavigate();

	const {state} = useNavigation();

	if(state === 'loading') return <Loading_Screen text={'Processing Recipe Data...'}/>

	return (
		<section className="container mx-auto p-10">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div>
					<h1 className="text-3xl font-bold mb-2">{ recipeName }</h1>
					<p className="text-gray-600 mb-4">{ recipeCreator }</p>
					<div className="w-8/12">
						<img src={ recipeImage } alt={ `${recipeName}_thumbnail` } className="w-full h-auto rounded-lg" />
					</div>
				</div>

				<div className="self-center mt-8">
					<div className="flex flex-col space-y-2">
						<h5 className="text-gray-600 font-medium">Category:</h5>
						<p>{ category }</p>
					</div>
					<div className="flex flex-col space-y-2">
						<h5 className="text-gray-600 font-medium">Country:</h5>
						<p>{ country }</p>
					</div>
					<div className="flex flex-col space-y-2">
						<h5 className="text-gray-600 font-medium">Creator Email:</h5>
						<p className="text-gray-600 break-words">{ creatorEmail }</p>
					</div>
					<div className="flex flex-col space-y-2">
						<h5 className="text-gray-600 font-medium">Watch Count:</h5>
						<p>{ watchCount }</p>
					</div>
					<div className="flex flex-col space-y-2">
						<h5 className="text-gray-600 font-medium">React Count:</h5>
						<p>{ reacts }</p>
					</div>
					<div className="flex flex-col space-y-2">
						<h5 className="text-gray-600 font-medium">Purchased By:</h5>
						<p className="text-gray-600">
							{ purchased_by.slice(0, 3).join(', ') }
							{ purchased_by.length > 3 && (
								<span> and { purchased_by.length - 3 } more</span>
							) }
						</p>
					</div>
				</div>
			</div>
			<div className="mt-4">
				<h2 className="text-xl font-bold mb-2">Recipe Details</h2>
				<p className="text-gray-700">{ recipeDetails }</p>
			</div>
			<div className="mt-4">
				<h2 className="text-xl font-bold mb-2">Embedded Video</h2>
				<p className={ `mb-5` }>Watch the tutorial on YouTube:</p>
				<iframe
					width="600"
					height="330"
					className={ `rounded-lg` }
					src={ embeddedYoutubeUrl }
					title="YouTube video player"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					referrerPolicy="strict-origin-when-cross-origin"
					allowFullScreen
				></iframe>
			</div>
			{
				similarRecipe.length ?
					<div className="mt-4">
						<h2 className="text-xl font-bold mb-2">Recipe Suggestions</h2>
						<div className="flex gap-4">
							{ similarRecipe.slice(0, 4).map(suggestion => (
								<div
									key={ suggestion._id }
									className="border w-1/4 p-4 rounded-lg cursor-pointer"
									onClick={ () => {
										naviagte(`/recipe/${suggestion._id}?user=${userAuth?.email}`)
									} }
								>
									<h3 className="text-lg font-bold mb-2">
										{ suggestion.recipeName }
									</h3>
									<img src={ suggestion.recipeImage } alt={ `${suggestion.recipeName}_thumbnail` } className="w-full h-auto rounded-lg" />
								</div>
							)) }
						</div>
					</div>
					: <></>
			}
		</section>
	);
}

export default RecipeDetails;
