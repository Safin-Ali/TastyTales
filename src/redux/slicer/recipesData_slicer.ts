import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RecipesShortInfo } from '../../components/Card/Recipe_Card'

export interface RecipesData {
	data:RecipesShortInfo[] | [];
	filteredData:RecipesShortInfo[] | [];
	isFilterMode:boolean;
}


const recipesDataInit: RecipesData = {
	data:[],
	filteredData:[],
	isFilterMode:false
}

export const recipesDataSlice = createSlice({
	name: 'recipes',
	initialState: recipesDataInit,
	reducers: {
		setRecipes:(state,action:PayloadAction<RecipesShortInfo[] | []>) => {
			state.data = action.payload
		},
		setFilterMode:(state,action:PayloadAction<boolean>) => {
			state.isFilterMode = action.payload
		},
		setFilteredData:(state,action:PayloadAction<RecipesShortInfo[] | []>) => {
			state.filteredData = action.payload;
		}
	},
})

export const {setRecipes,setFilterMode,setFilteredData} = recipesDataSlice.actions

export default recipesDataSlice.reducer