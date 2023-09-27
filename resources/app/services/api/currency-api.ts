import { createApi } from '@reduxjs/toolkit/query/react'
import { VaultResource } from '@/helpers/types'
import baseQueryConfigWithAuth from '@/store/config/baseQueryConfigWithAuth'

export const currencyApi = createApi({
	reducerPath: 'currencyApi',
	baseQuery: baseQueryConfigWithAuth,
	tagTypes: ['Currency'],
	endpoints: (builder) => ({
		getCurrencies: builder.query<VaultResource, { page: string; search: string }>({
			query({ page = '1', search }) {
				const url = new URL(window.location.toString())
				url.searchParams.set('search', search.toString())
				return {
					url: `v1/currency?page=${page}&${decodeURIComponent(url.searchParams.toString())}`,
				}
			},
			providesTags: ['Currency'],
		}),
	}),
})

export const { useGetCurrenciesQuery } = currencyApi
