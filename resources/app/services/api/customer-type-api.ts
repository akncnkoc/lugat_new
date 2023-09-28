import { createApi } from '@reduxjs/toolkit/query/react'
import baseQueryConfigWithAuth from '@/store/config/baseQueryConfigWithAuth'
import { CustomerTypeResource } from '@/types/customer'

export const customerType = createApi({
	reducerPath: 'customerType',
	baseQuery: baseQueryConfigWithAuth,
	tagTypes: ['CustomerType'],
	endpoints: (builder) => ({
		getCustomerTypes: builder.query<CustomerTypeResource, { page: string; search: string }>({
			query({ page = '1', search }) {
				const url = new URL(window.location.toString())
				url.searchParams.set('search', search.toString())
				return {
					url: `v1/customer-type?page=${page}&${decodeURIComponent(url.searchParams.toString())}`,
				}
			},
			providesTags: ['CustomerType'],
		}),
	}),
})

export const { useGetCustomerTypesQuery } = customerType
