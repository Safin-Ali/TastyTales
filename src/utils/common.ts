import { FormState } from '../pages/recipes/Insert_Recipe_Form';
import { IMGBB_Response } from '../types/custom.types';
import { endpointApi } from './https-fetcher';

export const handleFormPost = async (data:FormState):Promise<Response> => {
	try {

		if(typeof data.recipeImage === 'string') throw new Error('Invalid image file');

		const imageUrl = (await handleImageUpload(data.recipeImage!)).data as IMGBB_Response;

		const {selectThumbName,isLoading,...rest} = data;
		const response = await (await endpointApi.post('/recipe/addRecipe',{
			body:JSON.stringify({...rest,recipeImage:imageUrl.url}),
			headers: {
				"Content-Type": "application/json",
			}
		})).json();

		return response.id

	} catch (error) {
		throw new Error('Post cancelled');
	}
}

export const handleImageUpload = async (imageData:File) => {
	try {
        const formData = new FormData();
        formData.append('image', imageData);

        const response = await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API}`, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Error uploading recipe thumbnail');
        }
		const result = await response.json();
		return result;
    } catch (error) {
        console.error();
		throw new Error('Error uploading recipe thumbnail')
    }
}