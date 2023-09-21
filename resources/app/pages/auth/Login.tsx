import React from 'react'
import { object, string } from 'yup'
import { useFormik } from 'formik'
import LugatInput from '@/components/form/LugatInput'
import LugatButton from '@/components/form/LugatButton'
import toast from 'react-hot-toast'
import { authenticate } from '@/services/api/auth'
import { useNavigate } from 'react-router-dom'
import type { LoginFormType } from '@/helpers/types'
import LugatLink from '@/components/LugatLink'

const Login: React.FC = () => {
	const navigate = useNavigate()
	const loginFormValidationSchema = object<LoginFormType>({
		email: string().required('E-Posta alanı gereklidir').email('E-Posta geçersiz'),
		password: string().required('Şifre alanı gereklidir'),
	})
	const loginForm = useFormik<LoginFormType>({
		initialValues: {
			email: 'test@test.com',
			password: 'password',
		},
		validationSchema: loginFormValidationSchema,
		onSubmit: async (values) => {
			toast.dismiss()
			await toast.promise(authenticate(values), {
				loading: 'Loading...',
				success: function () {
					navigate('/')
					return 'Logged In'
				},
				error: 'Wrong credientals',
			})
		},
	})
	return (
		<div className='flex flex-col items-center justify-center px-6 pt-8 mx-auto h-screen pt:mt-0 bg-gray-200 w-full'>
			<a className='flex items-center justify-center mb-8 text-2xl font-semibold lg:mb-10 text-gray-700'>
				<span>Lügat</span>
			</a>
			<div className='w-full max-w-xl p-6 space-y-8 sm:p-8 rounded-lg shadow bg-gray-100'>
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