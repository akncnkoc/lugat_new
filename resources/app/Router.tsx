import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import RouteLoading from '@/components/RouteLoading'
import ProtectedRoute from '@/layouts/ProtectedRoute.tsx'
import Expenses from '@/pages/expense/Expenses.tsx'
import Notfound from '@/pages/notfound'

const Home = React.lazy(() => import('@/pages/Home'))
const Login = React.lazy(() => import('@/pages/auth/Login'))

const Router: React.FC = () => {
	const location = useLocation()
	const background = location.state && location.state.background
	return (
		<Routes location={background || location}>
			<Route path='/' element={<ProtectedRoute />}>
				<Route
					index
					element={
						<React.Suspense fallback={<RouteLoading />}>
							<Home />
						</React.Suspense>
					}
				/>
				<Route
					path={'/expense'}
					element={
						<React.Suspense fallback={<RouteLoading />}>
							<Expenses />
						</React.Suspense>
					}
				/>
			</Route>
			<Route
				path='/login'
				element={
					<React.Suspense fallback={<RouteLoading />}>
						<Login />
					</React.Suspense>
				}
			/>
			<Route path='*' element={<Notfound />} />
		</Routes>
	)
}

export default Router
