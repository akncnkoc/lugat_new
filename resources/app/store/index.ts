import { configureStore } from '@reduxjs/toolkit'
import appSlice from '@/store/slices/appSlice'
import userSlice from '@/store/slices/userSlice'
import { expenseApi } from '@/services/api/expense-api'
import { setupListeners } from '@reduxjs/toolkit/query'
import { vaultApi } from '@/services/api/vault-api'
import { currencyApi } from '@/services/api/currency-api'
import { customerApi } from '@/services/api/customer-api'
import { customerType } from '@/services/api/customer-type-api'
import { authApi } from '@/services/api/auth-api'

export const store = configureStore({
	reducer: {
		userSlice,
		appSlice,
		[expenseApi.reducerPath]: expenseApi.reducer,
		[vaultApi.reducerPath]: vaultApi.reducer,
		[currencyApi.reducerPath]: currencyApi.reducer,
		[customerApi.reducerPath]: customerApi.reducer,
		[customerType.reducerPath]: customerType.reducer,
		[authApi.reducerPath]: authApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(expenseApi.middleware)
			.concat(vaultApi.middleware)
			.concat(customerApi.middleware)
			.concat(customerType.middleware)
			.concat(authApi.middleware),
})

setupListeners(store.dispatch)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const { dispatch: storeDispatch } = store
export default store
