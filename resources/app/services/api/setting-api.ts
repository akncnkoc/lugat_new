import { createApi } from '@reduxjs/toolkit/query/react'
import baseQueryConfigWithAuth from '@/store/config/baseQueryConfigWithAuth'
import { SettingSingleResource, SettingStoreDataType } from '@/types/setting-types'
import { DefaultResponseType } from '@/helpers/types'

export const settingApi = createApi({
  reducerPath: 'settingApi',
  baseQuery: baseQueryConfigWithAuth,
  tagTypes: ['Setting'],
  endpoints: (builder) => ({
    getSettings: builder.query<SettingSingleResource, unknown>({
      query() {
        return {
          url: `v1/setting`,
        }
      },
      providesTags: ['Setting'],
    }),
    storeSetting: builder.mutation<DefaultResponseType, SettingStoreDataType>({
      query(body) {
        return {
          method: 'POST',
          url: `v1/setting`,
          body,
        }
      },
      invalidatesTags: ['Setting'],
    }),
  }),
})

export const { useStoreSettingMutation } = settingApi
