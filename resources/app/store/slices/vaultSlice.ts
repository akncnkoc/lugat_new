import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { VaultDataType } from '@/types/vault-types'

export type IUserState = {
	vaults: Array<VaultDataType>
}

const initialState: IUserState = {
	vaults: [],
}

const vaultSlice = createSlice({
	name: 'vaultSlice',
	initialState,
	reducers: {
		setVaults: (state, action: PayloadAction<Array<VaultDataType>>) => {
			if (action.payload == null) localStorage.removeItem('token')
			else {
				state.vaults = action.payload
			}
		},
	},
})
export const { setVaults } = vaultSlice.actions
export default vaultSlice.reducer
