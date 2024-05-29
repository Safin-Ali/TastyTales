import { createBrowserRouter, redirect } from 'react-router-dom';
import RootLayout from '../layout/RootLayout';
import Home from '../pages/home/Home';
import Insert_Recipe_Form from '../pages/recipes/Insert_Recipe_Form';
import Recipe_Details from '../pages/recipes/Recipe_Details';
import Recipes_Page from '../pages/recipes/Recipes_Page';
import { setRecipes } from '../redux/slicer/recipesData_slicer';
import { store } from '../redux/store';
import { endpointApi } from '../utils/https-fetcher';
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

						if(!result) return redirect('/');

						if(result.creatorEmail === userEmail || result.purchased_by.includes(userEmail)) return result;

						return redirect('/')


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

						store.dispatch(setRecipes(result));

						return result.length > 0 ? result : []
					} catch (error) {
						return []
					}
				}),
				element: <Recipes_Page />
			},
			{
				path:'/addRecipe',
				element:<Private_Route><Insert_Recipe_Form/></Private_Route>
			}
		]
	},
])

export default router;