import firebaseAuth from '../firebase_config';
import {
	GoogleAuthProvider,
	Unsubscribe,
	User,
	getRedirectResult,
	onAuthStateChanged,
	signInWithRedirect,
	signOut,
} from 'firebase/auth';


export const google_redirect_auth = async (): Promise<void> => {
	if (!firebaseAuth.currentUser) {
		const provider = new GoogleAuthProvider();
		signInWithRedirect(firebaseAuth, provider);
	} else {
		signOut(firebaseAuth);
	}

	const result = await getRedirectResult(firebaseAuth);
	if (!result) return;
}

export const logOutUser = (): void => {
	if (!firebaseAuth.currentUser) return;
	signOut(firebaseAuth)
	localStorage.removeItem('authToken')
}

export const onAuthStateChangeList = (cb: (userData: User | null) => void): Unsubscribe => {
	return onAuthStateChanged(firebaseAuth, user => {
		try {
			cb(user);
		} catch (error: unknown) {
			cb(null)
		}
	});
}