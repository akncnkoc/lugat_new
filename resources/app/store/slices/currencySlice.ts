import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CurrencyDataType } from '@/helpers/types'

export type IUserState = {
	currencies: Array<CurrencyDataType>
}

const initialState: IUserState = {
	currencies: [],
}

const vaultSlice = createSlice({
	name: 'vaultSlice',
	initialState,
	reducers: {
		setCurrencies: (state, action: PayloadAction<Array<CurrencyDataType>>) => {
			if (action.payload == null) state.currencies = []
			else {
				state.currencies = action.payload
			}
		},
	},
})
export const { setCurrencies } = vaultSlice.actions
export default vaultSlice.reducer
