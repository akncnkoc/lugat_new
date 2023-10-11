import { createApi } from '@reduxjs/toolkit/query/react'
import { DefaultResponseType } from '@/helpers/types'
import baseQueryConfigWithAuth from '@/store/config/baseQueryConfigWithAuth'
import { VariantResource, VariantSingleResource, VariantStoreType } from '@/types/variant-types'

export const variantApi = createApi({
	reducerPath: 'variantApi',
	baseQuery: baseQueryConfigWithAuth,
	tagTypes: ['Variant'],
	endpoints: (builder) => ({
		getVariants: builder.query<VariantResource, { page?: string; search?: string }>({
			query({ page, search }) {
				const url = new URL(window.location.toString())
				if (page) {
					url.searchParams.set('page', page)
				}
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
		updateVariant: builder.mutation<DefaultResponseType, { body: VariantStoreType; id: string }>({
			query({ id, body }) {
				return {
					url: `v1/variant/${id}`,
					method: 'PUT',
					body,
				}
			},
			invalidatesTags: ['Variant'],
		}),
		deleteVariant: builder.mutation<DefaultResponseType, string>({
			query(id) {
				return {
					url: `v1/variant/${id}`,
					method: 'DELETE',
				}
			},
			invalidatesTags: ['Variant'],
		}),
	}),
})

export const {
	useLazyGetVariantsQuery,
	useLazyGetVariantQuery,
	useStoreVariantMutation,
	useDeleteVariantMutation,
} = variantApi
