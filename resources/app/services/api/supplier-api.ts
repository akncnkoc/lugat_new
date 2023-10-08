import { createApi } from '@reduxjs/toolkit/query/react'
import { DefaultResponseType } from '@/helpers/types'
import baseQueryConfigWithAuth from '@/store/config/baseQueryConfigWithAuth'
import { VaultSingleResource, VaultStoreType } from '@/types/vault-types'
import { SupplierResource, SupplierSingleResource } from '@/types/supplier-types'

export const supplierApi = createApi({
	reducerPath: 'supplierApi',
	baseQuery: baseQueryConfigWithAuth,
	tagTypes: ['Supplier'],
	endpoints: (builder) => ({
		getSuppliers: builder.query<SupplierResource, { page: string; search: string }>({
			query({ page = '1', search }) {
				const url = new URL(window.location.toString())
				url.searchParams.set('page', page)
				if (search) {
					url.searchParams.set('search', search.toString())
				}
				return {
					url: `v1/supplier?${decodeURIComponent(url.searchParams.toString())}`,
				}
			},
			providesTags: ['Supplier'],
		}),
		getSupplier: builder.query<SupplierSingleResource, string>({
			query: (id: string) => `v1/supplier/${id}`,
			providesTags: ['Supplier'],
		}),
		storeVault: builder.mutation<DefaultResponseType, VaultStoreType>({
			query(body) {
				return {
					url: `v1/vault`,
					method: 'POST',
					body,
				}
			},
			invalidatesTags: ['Supplier'],
		}),
		updateVault: builder.mutation<DefaultResponseType, { body: VaultStoreType; id: string }>({
			query({ id, body }) {
				return {
					url: `v1/vault/${id}`,
					method: 'PUT',
					body,
				}
			},
			invalidatesTags: ['Supplier'],
		}),
		deleteVault: builder.mutation<DefaultResponseType, string>({
			query(id) {
				return {
					url: `v1/vault/${id}`,
					method: 'DELETE',
				}
			},
			invalidatesTags: ['Supplier'],
		}),
	}),
})

export const { useStoreVaultMutation, useDeleteVaultMutation, useUpdateVaultMutation } = supplierApi
