import { Button } from 'keep-react';
import React from 'react';
import { FaRegHeart } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { FaEye } from "react-icons/fa";

export interface RecipesShortInfo {
	id: string,
	purchased: number,
	reacts: number,
	recipeName: string,
	creatorEmail: string,
	recipeImage: string,
	category: string,
	watchCount:number,
	country: string
}

const Recipes_Card: React.FC<RecipesShortInfo> = ({
	category,
	country,
	id,
	purchased,
	reacts,
	creatorEmail,
	recipeImage,
	watchCount,
	recipeName
}) => {

	return (
		<figure
			className={ `border rounded-lg flex gap-[5%] mx-auto overflow-hidden` }
		>

			<div
				className={ `w-[30%]` }
			>
				<img
					src={ recipeImage }
					alt={ recipeName + '_thumb' }
				/>
			</div>

			<div className={ `flex justify-center flex-col` }>
				<h4 className={ `text-heading-6 my-1.5 font-medium` }>{ recipeName }</h4>

				<div className={ `text-lg` }>
					<div>
						<address>
							Creator Email: { creatorEmail }
						</address>
					</div>

					<div>
						Purchased: { 10 }
					</div>

					<div>
						<span> From: { country }</span>
					</div>

					<div className={`my-2`}>
						<div >
							<Button size={ 'xs' }>Details</Button>
						</div>
					</div>

					<div className={ `flex text-gray-500 items-center my-3 gap-5` }>
						<div className={`cursor-pointer flex items-center flex-col`}>
							<FaRegHeart size={ 20 } />
							<span className={`text-sm`}>{reacts}</span>
						</div>

						<div className={`flex items-center flex-col`}>
							<FaEye size={ 20 } />
							<span className={`text-sm`}>{watchCount}</span>
						</div>


					</div>
				</div>

			</div>


		</figure>
	);
}

export default Recipes_Card;