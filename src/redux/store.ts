import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slicer/counter_slicer'
import userDataReducer from './slicer/userData_slicer'

export const store = configureStore({
	reducer: {
		counter:counterReducer,
		userData:userDataReducer
	},
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch