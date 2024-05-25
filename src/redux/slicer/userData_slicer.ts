import { createSlice } from '@reduxjs/toolkit'

export interface UserState {
	userAuth:string | null
}

const userInitState: UserState = {
	userAuth:null
}

export const userDataSlice = createSlice({
	name: 'counter',
	initialState:userInitState,
	reducers: {
		signIn:(state) => {
			state.userAuth = 'singed'
		},
		signOut:(state) => {
			state.userAuth = null
		}
	},
})

// Action creators are generated for each case reducer function
export const { signIn,signOut } = userDataSlice.actions

export default userDataSlice.reducer