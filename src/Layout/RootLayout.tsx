import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import AppBar from '../components/AppBar/AppBar';
import Footer from '../components/Footer/Footer';
import { onAuthStateChangeList } from '../firebase/utils/firebase_auth_utils';
import { User } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { authStateChecker, signIn } from '../redux/slicer/userData_slicer';
import Loading_Screen from '../pages/home/Loading_Screen';
import { RootState } from '../redux/store';

const RootLayout: React.FC = () => {

	const { authStateChecked } = useSelector((state: RootState) => state.userData)

	const dispatch = useDispatch();

	const handleInitUser = (user: User | null) => {

		if (user) {
			console.log(user);
			dispatch(signIn(user))
		} else {
			dispatch(signIn(null))
		}

		dispatch(authStateChecker(true))
	}

	useEffect(() => {
		const unsubs = onAuthStateChangeList(handleInitUser);

		return () => {
			unsubs()
		}
	}, [])


	if (!authStateChecked) {
		return <Loading_Screen />
	}


	return (
		<>
			<AppBar />
			<main
				className={ `min-h-[calc(100dvh-20dvh)] bg-white container my-5 rounded-2xl mx-auto` }
			>
				<Outlet />
			</main>
			<Footer />
		</>
	);
};

export default RootLayout;