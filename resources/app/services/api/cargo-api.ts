import { DefaultResponseType } from '@/helpers/types'
import baseQueryConfigWithAuth from '@/store/config/baseQueryConfigWithAuth'
import { CargoResource, CargoSingleResource, CargoStoreType } from '@/types/cargo-types'
import { createApi } from '@reduxjs/toolkit/query/react'

export const cargoApi = createApi({
  reducerPath: 'cargoApi',
  baseQuery: baseQueryConfigWithAuth,
  tagTypes: ['Cargo'],
  endpoints: (builder) => ({
    getCargos: builder.query<CargoResource, { page: string; search: string }>({
      query({ page = '1', search }) {
        const url = new URL(window.location.toString())
        url.searchParams.set('page', page)
        if (search) {
          url.searchParams.set('search', search.toString())
        }
        return {
          method: 'GET',
          url: `v1/cargo?${decodeURIComponent(url.searchParams.toString())}`,
        }
      },
      providesTags: ['Cargo'],
    }),
    getCargo: builder.query<CargoSingleResource, string>({
      query: (id: string) => `v1/cargo/${id}`,
      providesTags: ['Cargo'],
    }),
    storeCargo: builder.mutation<DefaultResponseType, CargoStoreType>({
      query(body) {
        return {
          url: `v1/cargo`,
          method: 'POST',
          body,
        }
      },
      invalidatesTags: ['Cargo'],
    }),
    updateCargo: builder.mutation<DefaultResponseType, { body: CargoStoreType; id: string }>({
      query({ id, body }) {
        return {
          url: `v1/cargo/${id}`,
          method: 'PUT',
          body,
        }
      },
      invalidatesTags: ['Cargo'],
    }),
    deleteCargo: builder.mutation<DefaultResponseType, string>({
      query(id) {
        return {
          url: `v1/cargo/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: ['Cargo'],
    }),
  }),
})

export const { useLazyGetCargosQuery, useLazyGetCargoQuery, useStoreCargoMutation, useUpdateCargoMutation, useDeleteCargoMutation } =
  cargoApi
