import LugatButton from '@/components/form/LugatButton'
import LugatInput from '@/components/form/LugatInput'
import { useFormik } from 'formik'
import React from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import LugatLink from '@/components/LugatLink'
import { LoginFormValidationSchema } from '@/helpers/schemas'
import { authApi } from '@/services/api/auth-api'
import { storeDispatch } from '@/store'
import { setRefreshToken, setToken } from '@/store/slices/userSlice'
import { LoginFormType } from '@/types/auth-types'
import { clsx } from 'clsx'

const Login: React.FC = () => {
  const navigate = useNavigate()

  const loginForm = useFormik<LoginFormType>({
    initialValues: {
      email: 'test@test.com',
      password: 'incrediblySecurePassword',
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
    <div className={clsx('flex', 'flex-col', 'items-center', 'justify-center', 'h-screen', 'pt:mt-0', 'bg-gray-200', 'w-full')}>
      <a className={clsx('flex', 'items-center', 'justify-center', 'mb-8', 'text-2xl', 'font-semibold', 'lg:mb-10', 'text-gray-700')}>
        <span>Lügat</span>
      </a>
      <div className='w-full mx-auto'>
        <div
          className={clsx('p-6', 'space-y-8', 'sm:p-8', 'rounded-lg', 'shadow', 'shadow-gray-100', 'bg-gray-100', 'mx-auto')}
          style={{ maxWidth: '40rem' }}
        >
          <h2 className={clsx('text-2xl', 'font-bold', 'text-gray-800', 'text-center')}>Login to your account</h2>
          <form className='mt-8 space-y-6 max-w-8xl' onSubmit={loginForm.handleSubmit}>
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
              error={loginForm.touched.password && loginForm.errors.password && loginForm.errors.password}
            />
            <div className='flex items-start'>
              <LugatLink className={clsx('ml-auto', 'text-xs', 'hover:underline')} to={'/forgot-password'}>
                Forgot Password ?
              </LugatLink>
            </div>
            <LugatButton className={'!w-full'}>Login</LugatButton>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
