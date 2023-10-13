import { combineReducers } from 'redux'
import userSlice from '@/store/slices/userSlice'
import appSlice from '@/store/slices/appSlice'
import currencySlice from '@/store/slices/currencySlice'
import vaultSlice from '@/store/slices/vaultSlice'
import { authApi } from '@/services/api/auth-api'
import { expenseApi } from '@/services/api/expense-api'
import { vaultApi } from '@/services/api/vault-api'
import { currencyApi } from '@/services/api/currency-api'
import { customerApi } from '@/services/api/customer-api'
import { customerTypeApi } from '@/services/api/customer-type-api'
import { staffApi } from '@/services/api/staff-api'
import { productApi } from '@/services/api/product-api'
import { variantApi } from '@/services/api/variant-api'
import { supplierApi } from '@/services/api/supplier-api'
import { subProductApi } from '@/services/api/sub-product-api'
import { settingApi } from '@/services/api/setting-api'

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
	[settingApi.reducerPath]: settingApi.reducer,
})
