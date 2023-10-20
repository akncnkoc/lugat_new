import { authApi } from '@/services/api/auth-api'
import { cargoApi } from '@/services/api/cargo-api'
import { cargoCompanyApi } from '@/services/api/cargo-company-api'
import { currencyApi } from '@/services/api/currency-api'
import { customerApi } from '@/services/api/customer-api'
import { customerTypeApi } from '@/services/api/customer-type-api'
import { expenseApi } from '@/services/api/expense-api'
import { productApi } from '@/services/api/product-api'
import { settingApi } from '@/services/api/setting-api'
import { staffApi } from '@/services/api/staff-api'
import { subProductApi } from '@/services/api/sub-product-api'
import { supplierApi } from '@/services/api/supplier-api'
import { variantApi } from '@/services/api/variant-api'
import { vaultApi } from '@/services/api/vault-api'
import { rootReducer } from '@/store/rootReducer'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

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
    'subProductApi',
    'supplierApi',
    'settingApi',
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
      .concat(currencyApi.middleware)
      .concat(supplierApi.middleware)
      .concat(cargoApi.middleware)
      .concat(cargoCompanyApi.middleware)
      .concat(settingApi.middleware),
})

const persistor = persistStore(store)
setupListeners(store.dispatch)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export { persistor, store }
export const { dispatch: storeDispatch } = store
