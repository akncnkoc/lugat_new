import { createApi } from '@reduxjs/toolkit/query/react'
import baseQueryConfigWithAuth from '@/store/config/baseQueryConfigWithAuth'
import { SettingDataType, SettingSingleResource } from '@/types/setting-types'

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
		storeSetting: builder.mutation<SettingDataType, unknown>({
			query() {
				return {
					method: 'POST',
					url: `v1/setting`,
				}
			},
			invalidatesTags: ['Setting']
		}),
	}),
})

export const {useStoreSettingMutation} = settingApi
