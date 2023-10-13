import React, { useEffect } from 'react'
import { Await, defer, Outlet, useLoaderData, useNavigate } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import Aside from '@/components/aside'
import LoaderComponent from '@/components/anims/LoaderComponent'
import { storeDispatch } from '@/store'
import { TrackedPromise } from '@remix-run/router/utils'
import { setCurrencies } from '@/store/slices/currencySlice'
import { currencyApi } from '@/services/api/currency-api'

export const pageLoader = async () => {
	const currencies = storeDispatch(
		currencyApi.endpoints?.getCurrencies.initiate({ page: "1", search: '' }),
	).then((res) => res.data?.data)
	return defer({
		currencies: currencies,
	})
}

const ProtectedRoute: React.FC = () => {
	const navigate = useNavigate()

	const data = useLoaderData() as {
		currencies: TrackedPromise
	}

	useEffect(() => {
		if (data) {
			data.currencies.then((res) => {
				storeDispatch(setCurrencies(res))
			})
		}
	}, [data])
	useEffect(() => {
		if (!localStorage.getItem('token')) navigate('/login')
	}, [])
	return (
		<>
			<Navbar />
			<div className={'flex flex-1'}>
				<Aside />
				<div className={'p-4 flex-1'}>
					<React.Suspense fallback={<LoaderComponent />}>
						<Await resolve={data.currencies}>
							<Outlet />
						</Await>
					</React.Suspense>
				</div>
			</div>
		</>
	)
}

export default ProtectedRoute
