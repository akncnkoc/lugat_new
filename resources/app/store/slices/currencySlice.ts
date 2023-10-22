import { CurrencyDataType, CurrencyResource } from '@/helpers/types'
import { currencyApi } from '@/services/api/currency-api'
import { createSlice } from '@reduxjs/toolkit'

export type ICurrenciesState = {
  currencies: CurrencyResource
  isLoading: boolean
  defaultCurrency: CurrencyDataType | undefined
}

const initialState: ICurrenciesState = {
  currencies: {
    data: [],
    links: {
      first: '',
      last: '',
      next: '',
      prev: '',
    },
    meta: {
      current_page: 1,
      from: 1,
      last_page: 1,
      links: [],
      path: '',
      per_page: 0,
      to: 0,
      total: 0,
    },
  },
  isLoading: false,
  defaultCurrency: undefined,
}

const vaultSlice = createSlice({
  name: 'vaultSlice',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addMatcher(currencyApi.endpoints.getCurrencies.matchPending, (state) => {
      state.isLoading = true
    })
    builder.addMatcher(currencyApi.endpoints.getCurrencies.matchRejected, (state) => {
      state.isLoading = false
    })
    builder.addMatcher(currencyApi.endpoints.getCurrencies.matchFulfilled, (state, { payload }) => {
      state.isLoading = false
      state.currencies = payload
      state.defaultCurrency = payload.data.find((item) => !item.primary)
    })
  },
})
export const {} = vaultSlice.actions
export default vaultSlice.reducer
