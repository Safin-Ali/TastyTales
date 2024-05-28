import { createBrowserRouter, redirect } from 'react-router-dom';
import RootLayout from '../layout/RootLayout';
import Home from '../pages/Home';
import Recipes_Page from '../pages/recipes/Recipes_Page';
import { endpointApi } from '../utils/https-fetcher';
import Recipe_Details from '../pages/recipes/Recipe_Details';
import Private_Route from './Private_Route';

const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		children: [
			{
				path: '/',
				element: <Home />
			},
			{
				path: '/recipe/:id',
				loader: (async ({params,request}) => {

					try {

						const userEmail = new URLSearchParams(new URL(request.url).search).get('user');

						const result = await (await endpointApi.get(`/recipe/getRecipe/${params.id}`)).json();

						if(!result || !result?.purchased_by.includes(userEmail)) {
							return redirect('/')
						}

						return result


					} catch (error) {
						return redirect('/')
					}
				}),
				element: <Private_Route><Recipe_Details /></Private_Route>
			},
			{
				path: '/recipes',
				loader: (async () => {
					try {
						const result = await (await endpointApi.get(`/recipe/getRecipes`)).json();

						return result.length > 0 ? result : []
					} catch (error) {
						return []
					}
				}),
				element: <Recipes_Page />
			},
		]
	},
])

export default router;