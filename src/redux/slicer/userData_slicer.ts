import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { User } from 'firebase/auth'

export interface UserState {
	userAuth: User | null,
	authStateChecked: boolean
}

const userInitState: UserState = {
	userAuth: null,
	authStateChecked: false
}

export const userDataSlice = createSlice({
	name: 'counter',
	initialState: userInitState,
	reducers: {
		signIn: (state, action: PayloadAction<User | null>) => {
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