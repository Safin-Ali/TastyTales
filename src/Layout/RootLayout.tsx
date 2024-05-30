import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import AppBar from '../components/AppBar/AppBar';
import { logOutUser, onAuthStateChangeList } from '../firebase/utils/firebase_auth_utils';
import { User } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { authStateChecker, signIn } from '../redux/slicer/userData_slicer';
import Loading_Screen from '../pages/home/Loading_Screen';
import { RootState } from '../redux/store';
import { endpointApi } from '../utils/https-fetcher';
import Footer from '../components/Footer/Footer';

const RootLayout: React.FC = () => {

	const { authStateChecked } = useSelector((state: RootState) => state.userData)

	const dispatch = useDispatch();

	const handleInitUser = async (user: User | null) => {
		try {
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
				})).json();

				const authToken = localStorage.getItem('authToken');

				if (!authToken) {
					const jwt = (await (await endpointApi.get('/jwt',{
						headers:{
							Email:userCredential.email
						}
					})).json()).encryptJWTToken;
					localStorage.setItem('authToken', jwt);
				}

				dispatch(signIn(userCredential));
			} else {
				dispatch(signIn(null))
				logOutUser()
			}


		} catch (err) {
			logOutUser()
			dispatch(signIn(null))
		} finally {
			dispatch(authStateChecker(true))
		}
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
				className={ `bg-white min-h-[65dvh] container my-5 rounded-2xl mx-auto` }
			>
				<Outlet />
			</main>

			<Footer />
		</>
	);
};

export default RootLayout;