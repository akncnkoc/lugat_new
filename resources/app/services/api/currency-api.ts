import { CurrencyResource, DefaultResponseType } from '@/helpers/types'
import baseQueryConfigWithAuth from '@/store/config/baseQueryConfigWithAuth'
import { createApi } from '@reduxjs/toolkit/query/react'

export const currencyApi = createApi({
  reducerPath: 'currencyApi',
  baseQuery: baseQueryConfigWithAuth,
  tagTypes: ['Currency'],
  endpoints: (builder) => ({
    getCurrencies: builder.query<CurrencyResource, { page: string; search: string }>({
      query({ page = '1', search }) {
        const url = new URL(window.location.toString())
        url.searchParams.set('search', search.toString())
        return {
          url: `v1/currency?page=${page}&${decodeURIComponent(url.searchParams.toString())}`,
        }
      },
      providesTags: ['Currency'],
    }),
    searchCurrencies: builder.query<CurrencyResource, { page: string; search: string }>({
      query({ page = '1', search }) {
        const url = new URL(window.location.toString())
        url.searchParams.set('search', search.toString())
        return {
          url: `v1/currency/search?page=${page}&${decodeURIComponent(url.searchParams.toString())}`,
        }
      },
      providesTags: ['Currency'],
    }),
    updateDefaultCurrency: builder.mutation<DefaultResponseType, string>({
      query(id) {
        return {
          url: `v1/currency/update-primary-currency/${id}`,
          method: 'PUT',
        }
      },
      invalidatesTags: ['Currency'],
    }),
  }),
})

export const { useGetCurrenciesQuery, useUpdateDefaultCurrencyMutation } = currencyApi
