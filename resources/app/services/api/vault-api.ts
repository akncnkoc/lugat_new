import { createApi } from '@reduxjs/toolkit/query/react'
import {
	DefaultResponseType,
	VaultResource,
	VaultSingleResource,
	VaultStoreType,
} from '@/helpers/types'
import baseQueryConfigWithAuth from '@/store/config/baseQueryConfigWithAuth'

export const vaultApi = createApi({
	reducerPath: 'vaultApi',
	baseQuery: baseQueryConfigWithAuth,
	tagTypes: ['Vault'],
	endpoints: (builder) => ({
		getVaults: builder.query<VaultResource, { page: string; search: string }>({
			query({ page = '1', search }) {
				const url = new URL(window.location.toString())
				url.searchParams.set('search', search.toString())
				return {
					url: `v1/vault?page=${page}&${decodeURIComponent(url.searchParams.toString())}`,
				}
			},
			providesTags: ['Vault'],
		}),
		getVault: builder.query<VaultSingleResource, string>({
			query: (id: string) => `v1/vault/${id}`,
			providesTags: ['Vault'],
		}),
		storeVault: builder.mutation<DefaultResponseType, VaultStoreType>({
			query(body) {
				return {
					url: `v1/vault`,
					method: 'POST',
					body,
				}
			},
			invalidatesTags: ['Vault'],
		}),
		updateVault: builder.mutation<DefaultResponseType, { body: VaultStoreType; id: string }>({
			query({ id, body }) {
				return {
					url: `v1/vault/${id}`,
					method: 'PUT',
					body,
				}
			},
			invalidatesTags: ['Vault'],
		}),
		deleteVault: builder.mutation<DefaultResponseType, string>({
			query(id) {
				return {
					url: `v1/vault/${id}`,
					method: 'DELETE',
				}
			},
			invalidatesTags: ['Vault'],
		}),
	}),
})

export const {
	useGetVaultsQuery,
	useStoreVaultMutation,
	useDeleteVaultMutation,
	useUpdateVaultMutation,
} = vaultApi
