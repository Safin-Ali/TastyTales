import React from 'react';
import { Outlet } from 'react-router-dom';
import AppBar from '../components/AppBar/AppBar';

const RootLayout: React.FC = () => {

	return (
		<>
			<AppBar/>
			<main
				className={`min-h-[calc(100dvh-20dvh)] bg-white container my-5 rounded-2xl mx-auto`}
			>
				<Outlet />
			</main>
		</>
	);
};

export default RootLayout;