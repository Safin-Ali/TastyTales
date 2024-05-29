import { Button, Input, Textarea, toast } from 'keep-react';
import { BsImageFill } from "react-icons/bs";
import React, { FormEvent, useState } from 'react';
import { country_names, recipe_categories } from '../../components/data/recipe_form';
import { useNavigate } from 'react-router-dom';
import { handleFormPost } from '../../utils/common';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

export interface FormState {
	recipeName: string;
	creatorEmail:string;
	ytTutorial: string;
	recipeCategories: string;
	country: string;
	recipeDetails: string;
	recipeImage: File | null | string;
	selectThumbName:string;
	isLoading:boolean;
}

const Insert_Recipe_Form: React.FC = () => {

	const {userAuth} = useSelector((state:RootState) => state.userData)


	const [formState, setFormState] = useState<FormState>({
		recipeName: '',
		ytTutorial: '',
		creatorEmail:(userAuth?.email) || '',
		recipeCategories: 'null',
		country: 'null',
		recipeDetails: '',
		recipeImage: null,
		selectThumbName:'Recipe Thumbnail',
		isLoading:false,
	});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormState({ ...formState, [name]: value });
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files ? e.target.files[0] : null;
		setFormState({ ...formState, recipeImage: file, selectThumbName:file?.name || formState.selectThumbName});
	};

	const navigate = useNavigate();

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setFormState({ ...formState, isLoading: true });
		try {
			toast.promise(async () => await handleFormPost(formState
				),{
				success:(id) => {
					navigate(`/recipe/${id}?user=${userAuth?.email}`)
					return 'Post Successful'
				},
				error:(_) => {
					setFormState({ ...formState, isLoading: false });
					return 'Post Failed'
				},
				loading:'Processing...',
				position:'bottom-center'
			})
		} catch (err) {
			toast.error('There was an issue with the form submission.',{
				position:'bottom-center'
			})
			setFormState({ ...formState, isLoading: false });
		}
	};

	return (
		<section className={ `py-5` }>
			<h6 className={ `text-heading-6 text-center` }>Add Your Favorite Recipe</h6>
			<p className={ `text-center` }>Share your culinary skills with the world by adding your favorite recipe to our collection.</p>
			<form className={ `grid col-span-2 justify-center` } onSubmit={ handleSubmit }>
				<fieldset className={ `flex gap-5` }>
					<Input placeholder="Recipe Name" name={ 'recipeName' } className="ps-11 focus-visible:ring-0 my-5 w-full" onChange={ handleInputChange } value={ formState.recipeName } required />
					<Input placeholder="Youtube Tutorial" name={ `ytTutorial` } className="ps-11 my-5 focus-visible:ring-0 w-full" onChange={ handleInputChange } value={ formState.ytTutorial } required />
				</fieldset>

				<fieldset className={ `flex gap-5` }>

					<select
						name="recipeCategories"
						className={ `border w-full text-center focus-visible:outline-none py-2 [&>option]:text-metal-900 rounded-lg border-metal-200 ${formState.recipeCategories === 'null' && 'text-metal-200'}` }
						onChange={ handleInputChange }
						value={ formState.recipeCategories }
						required
					>
						{
							formState.recipeCategories === 'null'
							&&
							<option value="null" defaultValue={ 'null' }>Category</option>
						}
						{
							recipe_categories.map((ct, idx) => <option
								key={ idx }
								value={ ct.toLowerCase() }>
								{ ct }
							</option>)
						}
					</select>

					<select
						name="country"
						className={ `border w-full text-center focus-visible:outline-none py-2 [&>option]:text-metal-900 rounded-lg border-metal-200 ${formState.country === 'null' && 'text-metal-200'}` }
						onChange={ handleInputChange }
						value={ formState.country }
						required
					>
						{
							formState.country === 'null'
							&&
							<option value="null" defaultValue={ 'null' }>Country</option>
						}

						{
							country_names.map((ct, idx) => <option
								key={ idx }
								value={ ct.toLowerCase() }>
								{ ct }
							</option>)
						}
					</select>

				</fieldset>

				<fieldset>
					<Textarea rows={ 7 } className={ `my-5 focus-visible:ring-0` } name={ 'recipeDetails' } placeholder={ `Recipe Details` } onChange={ handleInputChange } value={ formState.recipeDetails } required />
				</fieldset>

				<fieldset>
					<input
						type="file"
						id="recipeImage"
						name={ 'recipeImage' }
						className="opacity-0"
						onChange={ handleFileChange }
						required
					/>

					<label htmlFor="recipeImage" className={ `border mb-5 block py-[25%] px-5 border-dashed rounded-lg text-metal-200 relative` }>
						<div className={ `absolute left-1/2 top-1/2 inline-flex flex-col -translate-x-1/2 -translate-y-1/2` }>
							<BsImageFill className={ `inline-block self-center mb-2` } size={ 40 } />
							<span className={ `inline-block text-xs font-normal` }>{formState.selectThumbName}</span>
						</div>

					</label>
				</fieldset>

				<Button size={ 'sm' } type="submit" disabled={formState.isLoading}>Submit</Button>

			</form>
		</section>
	);
}

export default Insert_Recipe_Form;
