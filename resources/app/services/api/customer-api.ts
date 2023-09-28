import { createApi } from '@reduxjs/toolkit/query/react'
import { DefaultResponseType } from '@/helpers/types'
import baseQueryConfigWithAuth from '@/store/config/baseQueryConfigWithAuth'
import { CustomerResource, CustomerSingleResource, CustomerStoreType } from '@/types/customer'

export const customerApi = createApi({
	reducerPath: 'customerApi',
	baseQuery: baseQueryConfigWithAuth,
	tagTypes: ['Customer'],
	endpoints: (builder) => ({
		getCustomers: builder.query<CustomerResource, { page: string; search: string }>({
			query({ page = '1', search }) {
				const url = new URL(window.location.toString())
				url.searchParams.set('search', search.toString())
				return {
					url: `v1/customer?page=${page}&${decodeURIComponent(url.searchParams.toString())}`,
				}
			},
			providesTags: ['Customer'],
		}),
		getCustomer: builder.query<CustomerSingleResource, string>({
			query: (id: string) => `v1/customer/${id}`,
			providesTags: ['Customer'],
		}),
		storeCustomer: builder.mutation<DefaultResponseType, CustomerStoreType>({
			query(body) {
				return {
					url: `v1/customer`,
					method: 'POST',
					body,
				}
			},
			invalidatesTags: ['Customer'],
		}),
		updateCustomer: builder.mutation<DefaultResponseType, { body: CustomerStoreType; id: string }>({
			query({ id, body }) {
				return {
					url: `v1/customer/${id}`,
					method: 'PUT',
					body,
				}
			},
			invalidatesTags: ['Customer'],
		}),
		deleteCustomer: builder.mutation<DefaultResponseType, string>({
			query(id) {
				return {
					url: `v1/customer/${id}`,
					method: 'DELETE',
				}
			},
			invalidatesTags: ['Customer'],
		}),
	}),
})

export const {
	useGetCustomersQuery,
	useGetCustomerQuery,
	useStoreCustomerMutation,
	useUpdateCustomerMutation,
	useDeleteCustomerMutation,
} = customerApi
