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
		},
		handleInstantReact: (state,action:PayloadAction<{type:0 | 1,id:string}>) => {

			if(!state.userAuth) return;

			if(action.payload.type === 1) {
				state.userAuth = {
					...state.userAuth,
					reacts:[...state.userAuth.reacts,action.payload.id]
				}

				return
			}

			state.userAuth = {
				...state.userAuth,
				reacts:state.userAuth.reacts.filter(id => id!==action.payload.id )
			}
		},
		decInstantCoin: (state) => {

			if(!state.userAuth) return;

			const currentCoint = state.userAuth.coin;

			state.userAuth = {
				...state.userAuth,
				coin:currentCoint < 0 ? 0 : currentCoint - 10
			}
		},
	},
})

// Action creators are generated for each case reducer function
export const { signIn, signOut,decInstantCoin, authStateChecker,handleInstantReact } = userDataSlice.actions

export default userDataSlice.reducer