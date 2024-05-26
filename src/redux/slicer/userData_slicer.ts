import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface UserCredential {
	email:string,
	photoURL:string,
	displayName:string
	coin:number,
	reacts:string[]
}

export interface UserState {
	userAuth: UserCredential | null,
	authStateChecked: boolean
}

const userInitState: UserState = {
	userAuth: null,
	authStateChecked: false,
}

export const userDataSlice = createSlice({
	name: 'counter',
	initialState: userInitState,
	reducers: {
		signIn: (state, action: PayloadAction<UserCredential | null>) => {
			state.userAuth = action.payload
		},
		signOut: (state) => {
			state.userAuth = null
		},
		authStateChecker: (state, action: PayloadAction<boolean>) => {
			state.authStateChecked = action.payload
		}
	},
})

// Action creators are generated for each case reducer function
export const { signIn, signOut, authStateChecker } = userDataSlice.actions

export default userDataSlice.reducer