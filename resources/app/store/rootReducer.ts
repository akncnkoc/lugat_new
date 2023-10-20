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
import appSlice from '@/store/slices/appSlice'
import currencySlice from '@/store/slices/currencySlice'
import userSlice from '@/store/slices/userSlice'
import vaultSlice from '@/store/slices/vaultSlice'
import { combineReducers } from 'redux'

export const rootReducer = combineReducers({
  userSlice,
  appSlice,
  currencySlice,
  vaultSlice,
  [authApi.reducerPath]: authApi.reducer,
  [expenseApi.reducerPath]: expenseApi.reducer,
  [vaultApi.reducerPath]: vaultApi.reducer,
  [currencyApi.reducerPath]: currencyApi.reducer,
  [customerApi.reducerPath]: customerApi.reducer,
  [customerTypeApi.reducerPath]: customerTypeApi.reducer,
  [staffApi.reducerPath]: staffApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [subProductApi.reducerPath]: subProductApi.reducer,
  [variantApi.reducerPath]: variantApi.reducer,
  [supplierApi.reducerPath]: supplierApi.reducer,
  [cargoApi.reducerPath]: cargoApi.reducer,
  [cargoCompanyApi.reducerPath]: cargoCompanyApi.reducer,
  [settingApi.reducerPath]: settingApi.reducer,
})
