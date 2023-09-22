import { configureStore } from '@reduxjs/toolkit'
import appSlice from '@/store/slices/appSlice'
import userSlice from '@/store/slices/userSlice'
import { expenseApi } from '@/services/api/expense-api'
import { setupListeners } from '@reduxjs/toolkit/query'
import { vaultApi } from '@/services/api/vault-api'

export const store = configureStore({
	reducer: {
		userSlice,
		appSlice,
		[expenseApi.reducerPath]: expenseApi.reducer,
		[vaultApi.reducerPath]: vaultApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(expenseApi.middleware).concat(vaultApi.middleware),
})

setupListeners(store.dispatch)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const { dispatch: storeDispatch } = store
export default store
