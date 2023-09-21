import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import RouteLoading from '@/components/RouteLoading'
import ProtectedRoute from '@/layouts/ProtectedRoute'
import ExpensePage from '@/pages/expense/ExpensePage'
import Notfound from '@/pages/notfound'
import ExpenseCreate from '@/pages/expense/modals/ExpenseCreate'
import { CookiesProvider } from 'react-cookie'

const Home = React.lazy(() => import('@/pages/Home'))
const Login = React.lazy(() => import('@/pages/auth/Login'))

const Router: React.FC = () => {
	const location = useLocation()
	const background = location.state && location.state.background
	return (
		<CookiesProvider>
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
					<Route path={'expense'}>
						<Route
							index
							path={'list'}
							element={
								<React.Suspense fallback={<RouteLoading />}>
									<ExpensePage />
								</React.Suspense>
							}
						/>
					</Route>
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
			{background && (
				<Routes>
					<Route path={'expense'} element={<ProtectedRoute />}>
						<Route
							path='create'
							element={
								<React.Suspense fallback={<RouteLoading />}>
									<ExpenseCreate />
								</React.Suspense>
							}
						/>
					</Route>
				</Routes>
			)}
		</CookiesProvider>
	)
}

export default Router
