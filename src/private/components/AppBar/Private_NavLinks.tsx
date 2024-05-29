import { Navbar } from 'keep-react';
import React from 'react';
interface Props {
	currentPath:string
}
const Private_NavLinks: React.FC<Props> = ({currentPath}) => {
	return (
		<>
			<Navbar.Link
				href={ '/addRecipe' }
				className={ `${"/addRecipe" === currentPath ? '[&>span]:text-primary-500' : '[&>span]:hover:text-primary-500'}` }
				linkName="Add Recipe"
			/>
		</>
	);
}

export default Private_NavLinks;