import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../layout/RootLayout';

const router = createBrowserRouter([
	{
		path:'/',
		element: <RootLayout/>,
		children:[
			{
				path:'/',
				element:<div>content</div>
			}
		]
	},
])

export default router;