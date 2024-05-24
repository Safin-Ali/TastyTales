import React from 'react';
import { Outlet } from 'react-router-dom';

const RootLayout: React.FC = () => {

	return (
		<>
			<main className={`min-h-[calc(100dvh-20dvh)]`}>
				<Outlet />
			</main>
		</>
	);
};

export default RootLayout;