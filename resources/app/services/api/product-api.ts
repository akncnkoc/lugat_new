import { createApi } from '@reduxjs/toolkit/query/react'
import { DefaultResponseType } from '@/helpers/types'
import baseQueryConfigWithAuth from '@/store/config/baseQueryConfigWithAuth'
import { ProductResource, ProductSingleResource, ProductStoreType } from '@/types/product-types'

export const productApi = createApi({
	reducerPath: 'productApi',
	baseQuery: baseQueryConfigWithAuth,
	tagTypes: ['Product'],
	endpoints: (builder) => ({
		getProducts: builder.mutation<ProductResource, { page: string; search: string }>({
			query({ page = '1', search }) {
				const url = new URL(window.location.toString())
				url.searchParams.set('page', page)
				if (search) {
					url.searchParams.set('search', search.toString())
				}
				return {
					method: 'GET',
					url: `v1/product?${decodeURIComponent(url.searchParams.toString())}`,
				}
			},
		}),
		getProduct: builder.query<ProductSingleResource, string>({
			query: (id: string) => `v1/product/${id}`,
			providesTags: ['Product'],
		}),
		storeProduct: builder.mutation<DefaultResponseType, ProductStoreType>({
			query(body) {
				return {
					url: `v1/product`,
					method: 'POST',
					body,
				}
			},
			invalidatesTags: ['Product'],
		}),
		updateProduct: builder.mutation<DefaultResponseType, { body: ProductStoreType; id: string }>({
			query({ id, body }) {
				return {
					url: `v1/product/${id}`,
					method: 'PUT',
					body,
				}
			},
			invalidatesTags: ['Product'],
		}),
		deleteProduct: builder.mutation<DefaultResponseType, string>({
			query(id) {
				return {
					url: `v1/product/${id}`,
					method: 'DELETE',
				}
			},
			invalidatesTags: ['Product'],
		}),
	}),
})

export const {
	useGetProductsMutation,
	useGetProductQuery,
	useStoreProductMutation,
	useUpdateProductMutation,
	useDeleteProductMutation,
} = productApi
