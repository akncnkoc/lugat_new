import { configureStore } from '@reduxjs/toolkit'
import appSlice from '@/store/slices/appSlice'
import userSlice from '@/store/slices/userSlice'
import { expenseApi } from '@/services/api/expense-api'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
	reducer: {
		userSlice,
		appSlice,
		[expenseApi.reducerPath]: expenseApi.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(expenseApi.middleware),
})

setupListeners(store.dispatch)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const { dispatch: storeDispatch } = store
export default store
