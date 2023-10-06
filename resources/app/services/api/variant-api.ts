import { createApi } from '@reduxjs/toolkit/query/react'
import { DefaultResponseType } from '@/helpers/types'
import baseQueryConfigWithAuth from '@/store/config/baseQueryConfigWithAuth'
import { VaultResource, VaultSingleResource, VaultStoreType } from '@/types/vault-types'
import { VariantResource, VariantSingleResource, VariantStoreType } from '@/types/variant-types'

export const variantApi = createApi({
	reducerPath: 'variantApi',
	baseQuery: baseQueryConfigWithAuth,
	tagTypes: ['Variant'],
	endpoints: (builder) => ({
		getVariants: builder.query<VariantResource, { page: string; search: string }>({
			query({ page = '1', search }) {
				const url = new URL(window.location.toString())
				url.searchParams.set('page', page)
				if (search) {
					url.searchParams.set('search', search.toString())
				}
				return {
					url: `v1/variant?${decodeURIComponent(url.searchParams.toString())}`,
				}
			},
			providesTags: ['Variant'],
		}),
		getVariant: builder.query<VariantSingleResource, string>({
			query: (id: string) => `v1/variant/${id}`,
			providesTags: ['Variant'],
		}),
		storeVariant: builder.mutation<DefaultResponseType, VariantStoreType>({
			query(body) {
				return {
					url: `v1/variant`,
					method: 'POST',
					body,
				}
			},
			invalidatesTags: ['Variant'],
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
	useLazyGetVariantsQuery,
	useLazyGetVariantQuery,
	useStoreVaultMutation,
	useDeleteVaultMutation,
	useUpdateVaultMutation,
} = variantApi
