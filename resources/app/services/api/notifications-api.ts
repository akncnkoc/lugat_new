import { CurrencyResource } from '@/helpers/types'
import baseQueryConfigWithAuth from '@/store/config/baseQueryConfigWithAuth'
import { createApi } from '@reduxjs/toolkit/query/react'

export const notificationsApi = createApi({
  reducerPath: 'notificationsApi',
  baseQuery: baseQueryConfigWithAuth,
  tagTypes: ['Currency'],
  endpoints: (builder) => ({
    getNotifications: builder.query<CurrencyResource, { page: string; search: string }>({
      query({ page = '1', search }) {
        const url = new URL(window.location.toString())
        url.searchParams.set('search', search.toString())
        return {
          url: `v1/currency?page=${page}&${decodeURIComponent(url.searchParams.toString())}`,
        }
      },
      providesTags: ['Currency'],
    }),
  }),
})

export const { useGetNotificationsQuery } = notificationsApi
