import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../layout/RootLayout';
import Home from '../pages/Home';
import Recipes_Page from '../pages/recipes/Recipes_Page';
import { endpointApi } from '../utils/https-fetcher';

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