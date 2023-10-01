import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type IUserState = {
	user: null
	token?: string | null
	isAuthenticated: boolean
}

const initialState: IUserState = {
	user: null,
	token: localStorage.getItem('token') ?? '',
	isAuthenticated: false,
}

const userSlice = createSlice({
	name: 'userSlice',
	initialState,
	reducers: {
		logout: () => initialState,
		setToken: (state, action: PayloadAction<string | null>) => {
			if (action.payload == null) localStorage.removeItem('token')
			else {
				state.token = action.payload
				localStorage.setItem('token', action.payload ?? '')
			}
		},
		setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
			state.isAuthenticated = action.payload
		},
	},
})
export const { setToken, logout } = userSlice.actions
export default userSlice.reducer
