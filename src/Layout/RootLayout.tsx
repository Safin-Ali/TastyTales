import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import AppBar from '../components/AppBar/AppBar';
import { onAuthStateChangeList } from '../firebase/utils/firebase_auth_utils';
import { User } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { authStateChecker, signIn } from '../redux/slicer/userData_slicer';
import Loading_Screen from '../pages/home/Loading_Screen';
import { RootState } from '../redux/store';
import { endpointApi } from '../utils/https-fetcher';

const RootLayout: React.FC = () => {

	const { authStateChecked } = useSelector((state: RootState) => state.userData)

	const dispatch = useDispatch();

	const handleInitUser = async (user: User | null) => {

		if (user) {

			const { displayName, email, photoURL } = user;

			const userCredential = await (await endpointApi.post('/users/register', {
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					displayName,
					photoURL,
					email
				})
			})).json()

			dispatch(signIn(userCredential));
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
				className={ `bg-white container my-5 rounded-2xl mx-auto` }
			>
				<Outlet />
			</main>
		</>
	);
};

export default RootLayout;