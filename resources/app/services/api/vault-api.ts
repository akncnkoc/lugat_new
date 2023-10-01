import { createApi } from '@reduxjs/toolkit/query/react'
import { DefaultResponseType } from '@/helpers/types'
import baseQueryConfigWithAuth from '@/store/config/baseQueryConfigWithAuth'
import { VaultResource, VaultSingleResource, VaultStoreType } from '@/types/vault-types'

export const vaultApi = createApi({
	reducerPath: 'vaultApi',
	baseQuery: baseQueryConfigWithAuth,
	tagTypes: ['Vault'],
	endpoints: (builder) => ({
		getVaults: builder.mutation<VaultResource, { page: string; search: string }>({
			query({ page = '1', search }) {
				const url = new URL(window.location.toString())
				url.searchParams.set('page', page)
				if (search) {
					url.searchParams.set('search', search.toString())
				}
				return {
					method: 'GET',
					url: `v1/vault?${decodeURIComponent(url.searchParams.toString())}`,
				}
			},
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
	useGetVaultsMutation,
	useStoreVaultMutation,
	useDeleteVaultMutation,
	useUpdateVaultMutation,
} = vaultApi
