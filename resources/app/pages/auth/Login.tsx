import React from 'react'
import { useFormik } from 'formik'
import LugatInput from '@/components/form/LugatInput'
import LugatButton from '@/components/form/LugatButton'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import LugatLink from '@/components/LugatLink'
import { LoginFormType } from '@/types/auth-types'
import { storeDispatch } from '@/store'
import { authApi } from '@/services/api/auth-api'
import { setRefreshToken, setToken } from '@/store/slices/userSlice'
import { LoginFormValidationSchema } from '@/helpers/schemas'

const Login: React.FC = () => {
	const navigate = useNavigate()

	const loginForm = useFormik<LoginFormType>({
		initialValues: {
			email: 'test@test.com',
			password: 'password',
		},
		validationSchema: LoginFormValidationSchema,
		onSubmit: async (values) => {
			toast.dismiss()
			toast.loading('Loading')
			storeDispatch(authApi.endpoints?.authenticate.initiate(values))
				.then(({ data }) => {
					storeDispatch(setToken(data?.data.token ?? null))
					storeDispatch(setRefreshToken(data?.data.refresh_token ?? null))
					toast.dismiss()
					toast.success('Logged In')
					navigate('/')
				})
				.catch(() => toast.error('Wrong credientals'))
				.finally(() => toast.dismiss())
		},
	})
	return (
		<div className='flex flex-col items-center justify-center px-6 pt-8 mx-auto h-screen pt:mt-0 bg-gray-200 w-full'>
			<a className='flex items-center justify-center mb-8 text-2xl font-semibold lg:mb-10 text-gray-700'>
				<span>Lügat</span>
			</a>
			<div className='w-full max-w-xl p-6 space-y-8 sm:p-8 rounded-lg shadow shadow-gray-100 bg-gray-100'>
				<h2 className='text-2xl font-bold text-gray-800 text-center'>Login to your account</h2>
				<form className='mt-8 space-y-6' onSubmit={loginForm.handleSubmit}>
					<LugatInput
						name={'email'}
						type={'email'}
						placeholder={'ornek@rbbt.com.tr'}
						label={'Email'}
						onChange={loginForm.handleChange}
						onBlur={loginForm.handleBlur}
						value={loginForm.values.email}
						error={loginForm.touched.email && loginForm.errors.email && loginForm.errors.email}
					/>
					<LugatInput
						name={'password'}
						type={'password'}
						placeholder={'********'}
						label={'Password'}
						onChange={loginForm.handleChange}
						onBlur={loginForm.handleBlur}
						value={loginForm.values.password}
						error={
							loginForm.touched.password && loginForm.errors.password && loginForm.errors.password
						}
					/>
					<div className='flex items-start'>
						<LugatLink className='ml-auto text-xs hover:underline' to={'/forgot-password'}>
							Forgot Password ?
						</LugatLink>
					</div>
					<LugatButton>Login</LugatButton>
				</form>
			</div>
		</div>
	)
}

export default Login
