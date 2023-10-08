import { createApi } from '@reduxjs/toolkit/query/react'
import { DefaultResponseType } from '@/helpers/types'
import baseQueryConfigWithAuth from '@/store/config/baseQueryConfigWithAuth'
import { storeDispatch } from '@/store'
import { productApi } from '@/services/api/product-api'
import { SubProductVariantStoreType, SubProductVariantUpdateType } from '@/types/product-types'

export const subProductApi = createApi({
	reducerPath: 'subProductApi',
	baseQuery: baseQueryConfigWithAuth,
	tagTypes: ['SubProduct'],
	endpoints: (builder) => ({
		createSubProdocts: builder.mutation<
			DefaultResponseType,
			{ sub_products: Array<SubProductVariantStoreType>; productId: string }
		>({
			query({ sub_products, productId }) {
				return {
					url: `v1/sub-product/${productId}`,
					method: 'PUT',
					body: {
						sub_products,
					},
				}
			},
		}),
		updateSubProdocts: builder.mutation<
			DefaultResponseType,
			{ sub_products: Array<SubProductVariantUpdateType> }
		>({
			query({ sub_products }) {
				return {
					url: `v1/sub-product`,
					method: 'POST',
					body: {
						sub_products,
					},
				}
			},
		}),
		deleteSubProduct: builder.mutation<DefaultResponseType, string>({
			query(id) {
				return {
					url: `v1/sub-product/${id}`,
					method: 'DELETE',
				}
			},
			transformResponse: (baseQueryReturnValue: unknown): any => {
				storeDispatch(productApi.util?.invalidateTags(['Product']))
				return baseQueryReturnValue
			},
			invalidatesTags: ['SubProduct'],
		}),
	}),
})

export const {
	useDeleteSubProductMutation,
	useCreateSubProdoctsMutation,
	useUpdateSubProdoctsMutation,
} = subProductApi
