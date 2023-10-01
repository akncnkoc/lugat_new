import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type IAppState = {
	isUserRefetching: boolean
	isGlobalLoading: boolean
	sidebarClassNames: string
}
const initialState: IAppState = {
	isUserRefetching: false,
	isGlobalLoading: false,
	sidebarClassNames: '',
}

const appSlice = createSlice({
	name: 'breadcumbSlice',
	initialState,
	reducers: {
		setUserIsFetching: (state, action: PayloadAction<boolean>) => {
			state.isUserRefetching = action.payload
			return state
		},
		setIsGlobalLoading: (state, action: PayloadAction<boolean>) => {
			state.isGlobalLoading = action.payload
			return state
		},
		setSidebarClassNames: (state, action: PayloadAction<string>) => {
			state.sidebarClassNames = action.payload
			return state
		},
	},
})
export const { setUserIsFetching, setIsGlobalLoading, setSidebarClassNames } = appSlice.actions
export default appSlice.reducer
