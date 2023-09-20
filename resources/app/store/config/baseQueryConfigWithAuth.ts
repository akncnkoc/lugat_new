import {
	BaseQueryFn,
	FetchArgs,
	fetchBaseQuery,
	FetchBaseQueryError,
} from '@reduxjs/toolkit/dist/query/react'
import store from '@/store'
import toast from 'react-hot-toast'
import { setToken } from '@/store/slices/userSlice'

const API_URL = '/api/'
const baseQueryConfig = fetchBaseQuery({
	baseUrl: API_URL,
	mode: 'cors',
	prepareHeaders: (headers) => {
		const token = store.getState().userSlice.token
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
	const result = await baseQueryConfig(args, api, extraOptions)
	if (result.error && result.error.status === 401) {
		toast.error('Oturum sonlandırıldı. Lütfen tekrar giriş yapın.')
		store.dispatch(setToken(null))
		window.location.pathname = '/login'
	} else if (result.error && result.error.status === 403) {
		toast.error('Yetkiniz bulunmamaktadır.')
	}
	return result
}

export default baseQueryConfigWithReAuth
