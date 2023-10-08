import { configureStore } from '@reduxjs/toolkit'
import { expenseApi } from '@/services/api/expense-api'
import { setupListeners } from '@reduxjs/toolkit/query'
import { vaultApi } from '@/services/api/vault-api'
import { customerApi } from '@/services/api/customer-api'
import { customerTypeApi } from '@/services/api/customer-type-api'
import { authApi } from '@/services/api/auth-api'
import { staffApi } from '@/services/api/staff-api'
import { productApi } from '@/services/api/product-api'
import storage from 'redux-persist/lib/storage'
import {
	FLUSH,
	PAUSE,
	PERSIST,
	persistReducer,
	persistStore,
	PURGE,
	REGISTER,
	REHYDRATE,
} from 'redux-persist'
import { rootReducer } from '@/store/rootReducer'
import { variantApi } from '@/services/api/variant-api'
import { supplierApi } from '@/services/api/supplier-api'
import { subProductApi } from '@/services/api/sub-product-api'

const persistConfig = {
	key: 'root',
	storage: storage,
	blacklist: [
		'vaultApi',
		'productApi',
		'expenseApi',
		'customerApi',
		'authApi',
		'staffApi',
		'customerTypeApi',
		'variantApi',
		'supplierApi'
	],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		})
			.concat(authApi.middleware)
			.concat(expenseApi.middleware)
			.concat(vaultApi.middleware)
			.concat(customerApi.middleware)
			.concat(customerTypeApi.middleware)
			.concat(staffApi.middleware)
			.concat(productApi.middleware)
			.concat(variantApi.middleware)
			.concat(subProductApi.middleware)
			.concat(supplierApi.middleware)
})

const persistor = persistStore(store)
setupListeners(store.dispatch)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export { store, persistor }
export const { dispatch: storeDispatch } = store
