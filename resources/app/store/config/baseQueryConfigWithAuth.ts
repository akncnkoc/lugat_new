import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/react'
import { RootState, storeDispatch } from '@/store'
import toast from 'react-hot-toast'
import { setRefreshToken, setToken } from '@/store/slices/userSlice'
import { setIsGlobalLoading } from '@/store/slices/appSlice'
import { LoginResponseType } from '@/types/auth-types'
import axios from 'axios'

const API_URL = '/api/'
const baseQueryConfig = fetchBaseQuery({
	baseUrl: API_URL,
	mode: 'cors',
	prepareHeaders: (headers, { getState }) => {
		const token = (getState() as RootState).userSlice.token
		if (token !== '') {
			headers.set('Authorization', `Bearer ${token}`)
		}
		headers.set('Accept', 'application/json')
		return headers
	},
})

const baseQueryConfigWithReAuth: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {
	storeDispatch(setIsGlobalLoading(true))
	let result = await baseQueryConfig(args, api, extraOptions)
	if (result.error && result.error.status === 401) {
		// toast.error('Oturum sonlandırıldı. Lütfen tekrar giriş yapın.')
		// storeDispatch(setToken(null))
		// storeDispatch(setIsGlobalLoading(false))
		// window.location.pathname = '/login'

		const refreshResult = ((await axios.post(API_URL + 'v1/auth/refreshToken', null, {
			headers: {
				'Authorization': 'Bearer ' + localStorage.getItem('refresh_token'),
			},
		})).data) as LoginResponseType
		if (refreshResult.data) {
			storeDispatch(setToken(refreshResult?.data?.token))
			storeDispatch(setRefreshToken(refreshResult?.data?.refresh_token))
			result = await baseQueryConfig(args, api, extraOptions)
		} else {
			toast.promise(
				new Promise((resolve) => {
					setTimeout(() => {
						resolve(true)
					}, 1500)
				}),
				{
					loading: 'Oturum sonlandırıldı. Lütfen tekrar giriş yapın.',
					success: () => {
						return ''
						// (window.location.pathname = '/login')
					},
					error: '',
				},
			)
		}
	} else if (result.error && result.error.status === 403) {
		storeDispatch(setIsGlobalLoading(false))
		toast.error('Yetkiniz bulunmamaktadır.')
	}
	storeDispatch(setIsGlobalLoading(false))
	return result
}

export default baseQueryConfigWithReAuth
