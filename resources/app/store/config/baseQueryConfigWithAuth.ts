import {
	BaseQueryFn,
	FetchArgs,
	fetchBaseQuery,
	FetchBaseQueryError,
} from '@reduxjs/toolkit/dist/query/react'
import { RootState, storeDispatch } from '@/store'
import toast from 'react-hot-toast'
import { setToken } from '@/store/slices/userSlice'
import { setIsGlobalLoading } from '@/store/slices/appSlice'

const API_URL = '/api/'
const baseQueryConfig = fetchBaseQuery({
	baseUrl: API_URL,
	mode: 'cors',
	prepareHeaders: (headers, {getState}) => {
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
	const result = await baseQueryConfig(args, api, extraOptions)
	if (result.error && result.error.status === 401) {
		toast.error('Oturum sonlandırıldı. Lütfen tekrar giriş yapın.')
		storeDispatch(setToken(null))
		storeDispatch(setIsGlobalLoading(false))
		window.location.pathname = '/login'
	} else if (result.error && result.error.status === 403) {
		storeDispatch(setIsGlobalLoading(false))
		toast.error('Yetkiniz bulunmamaktadır.')
	}
	storeDispatch(setIsGlobalLoading(false))
	return result
}

export default baseQueryConfigWithReAuth
