import { createApi } from '@reduxjs/toolkit/query/react'
import { VaultResource } from '@/helpers/types'
import baseQueryConfigWithAuth from '@/store/config/baseQueryConfigWithAuth'

export const vaultApi = createApi({
	reducerPath: 'vaultApi',
	baseQuery: baseQueryConfigWithAuth,
	tagTypes: ['Vault'],
	endpoints: (builder) => ({
		getVaults: builder.query<VaultResource, string>({
			query: (page: string = '1') => `v1/vault?page=${page}`,
			providesTags: ['Vault'],
		}),
	}),
})

export const { useGetVaultsQuery } = vaultApi
