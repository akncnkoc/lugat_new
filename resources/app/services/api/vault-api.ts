import { createApi } from '@reduxjs/toolkit/query/react'
import { DefaultResponseType, VaultResource, VaultStoreFormType } from '@/helpers/types'
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
		storeVault: builder.mutation<DefaultResponseType, VaultStoreFormType & { currency_id: string }>(
			{
				query(body) {
					return {
						url: `v1/vault`,
						method: 'POST',
						body,
					}
				},
				invalidatesTags: ['Vault'],
			},
		),
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

export const { useGetVaultsQuery, useStoreVaultMutation, useDeleteVaultMutation } = vaultApi
