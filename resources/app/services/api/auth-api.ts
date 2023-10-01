import { createApi } from '@reduxjs/toolkit/query/react'
import baseQueryConfigWithAuth from '@/store/config/baseQueryConfigWithAuth'
import { LoginFormType, LoginResponseType } from '@/types/auth-types'

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: baseQueryConfigWithAuth,
	tagTypes: ['Auth'],
	endpoints: (builder) => ({
		authenticate: builder.query<LoginResponseType, LoginFormType>({
			query(body) {
				return {
					method: 'POST',
					url: `v1/auth/authenticate`,
					body,
				}
			},
			providesTags: ['Auth'],
		}),
	}),
})

export const {} = authApi
