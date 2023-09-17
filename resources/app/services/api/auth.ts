import lugatAxios from '@/services/lugatAxios.ts'
import { storeDispatch } from '@/store'
import { setToken } from '@/store/slices/userSlice'
import toast from 'react-hot-toast'
import { setUserIsFetching } from '@/store/slices/appSlice'
import type { LoginFormType, LoginResponseType } from '@/helpers/types.ts'

export const authenticationSendCode = async (values: any): Promise<any> => {
	return await lugatAxios.post('/v1/auth/authenticate', values)
}

export const forgotPassword = async (values: any): Promise<any> => {
	return await lugatAxios.post('/v1/auth/forgot-password', values)
}

export const createPassword = async (values: any): Promise<any> => {
	return await lugatAxios.post('/v1/auth/create-password', values)
}

export const authenticate = async (values: LoginFormType): Promise<boolean> => {
	try {
		const { data, status } = await lugatAxios.post<LoginResponseType>(
			'/v1/auth/authenticate',
			values,
		)
		if (status === 201 && data.data) {
			storeDispatch(setToken(data.data.token))
		}
		return true
	} catch (err) {
		return Promise.reject(err)
	}
}

export const refreshToken = (values: any): any => {
	try {
		const controller = new AbortController()
		toast.promise(lugatAxios.post('/v1/auth/refresh', values, { signal: controller.signal }), {
			loading: 'Giriş için yeniden deneniyor',
			success: (res) => {
				console.log(res)
				if (res.data.status === 201) {
					console.log(res.data.data)
					storeDispatch(setToken(res.data.data.data))
				}
				storeDispatch(setUserIsFetching(false))
				return 'Tekrardan giriş yapıldı.'
			},
			error: (err) => {
				console.log(err)
				// window.location.href = '/login';
				storeDispatch(setUserIsFetching(false))
				return 'Tekrardan giriş yapılamadı'
			},
		})
	} catch (err: any) {
		storeDispatch(setUserIsFetching(false))
		if (err.response.status === 422) {
			storeDispatch(setToken(null))
			// window.location.reload();
		}
	}
}

export const getUserInformation = async (): Promise<any> => {
	return await lugatAxios.post('/v1/auth/me')
}
