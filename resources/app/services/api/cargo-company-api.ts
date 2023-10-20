import { DefaultResponseType, ListingPageStateParams } from '@/helpers/types'
import baseQueryConfigWithAuth from '@/store/config/baseQueryConfigWithAuth'
import { CargoCompanyResource, CargoCompanySingleResource, CargoCompanyStoreType } from '@/types/cargo-types'
import { createApi } from '@reduxjs/toolkit/query/react'

export const cargoCompanyApi = createApi({
  reducerPath: 'cargoCompanyApi',
  baseQuery: baseQueryConfigWithAuth,
  tagTypes: ['CargoCompany'],
  endpoints: (builder) => ({
    getCargoCompanies: builder.query<CargoCompanyResource, ListingPageStateParams>({
      query({ page = '1', search }) {
        const url = new URL(window.location.toString())
        url.searchParams.set('page', page)
        if (search) {
          url.searchParams.set('search', search.toString())
        }
        return {
          method: 'GET',
          url: `v1/cargo-company?${decodeURIComponent(url.searchParams.toString())}`,
        }
      },
      providesTags: ['CargoCompany'],
    }),
    getCargoCompany: builder.query<CargoCompanySingleResource, string>({
      query: (id: string) => `v1/cargo-company/${id}`,
      providesTags: ['CargoCompany'],
    }),
    storeCargoCompany: builder.mutation<DefaultResponseType, CargoCompanyStoreType>({
      query(body) {
        return {
          url: `v1/cargo-company`,
          method: 'POST',
          body,
        }
      },
      invalidatesTags: ['CargoCompany'],
    }),
    updateCargoCompany: builder.mutation<DefaultResponseType, { body: CargoCompanyStoreType; id: string }>({
      query({ id, body }) {
        return {
          url: `v1/cargo-company/${id}`,
          method: 'PUT',
          body,
        }
      },
      invalidatesTags: ['CargoCompany'],
    }),
    deleteCargoCompany: builder.mutation<DefaultResponseType, string>({
      query(id) {
        return {
          url: `v1/cargo-company/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: ['CargoCompany'],
    }),
  }),
})

export const {
  useLazyGetCargoCompaniesQuery,
  useLazyGetCargoCompanyQuery,
  useStoreCargoCompanyMutation,
  useUpdateCargoCompanyMutation,
  useDeleteCargoCompanyMutation,
} = cargoCompanyApi
