import { configureStore } from '@reduxjs/toolkit'
import userDataReducer from './slicer/userData_slicer'
import recipesDataReducer from './slicer/recipesData_slicer'

export const store = configureStore({
	reducer: {
		userData: userDataReducer,
		recipesData: recipesDataReducer
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware({
		serializableCheck: false
	})
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch