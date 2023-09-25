import React from 'react'
import { createBrowserRouter, defer } from 'react-router-dom'
import ProtectedRoute from '@/layouts/ProtectedRoute'
import ExpensePage from '@/pages/expense/ExpensePage'
import ExpenseCreate from '@/pages/expense/modals/ExpenseCreate'
import ExpenseEdit from '@/pages/expense/modals/ExpenseEdit'
import { storeDispatch } from '@/store'
import { expenseApi } from '@/services/api/expense-api'

const Home = React.lazy(() => import('@/pages/Home'))
// const Login = React.lazy(() => import('@/pages/auth/Login'))

// const Router: React.FC = () => {
// 	const location = useLocation()
// 	const background = location.state && location.state.background
//
//
// 	return (
// 		<CookiesProvider>
// 			<Routes location={background || location}>
// 				<Route path='/' element={<ProtectedRoute />}>
// 					<Route
// 						index
// 						element={
// 							<React.Suspense fallback={<RouteLoading />}>
// 								<Home />
// 							</React.Suspense>
// 						}
// 					/>
// 					<Route path={'expense'}>
// 						<Route
// 							index
// 							path={'list'}
// 							element={
// 								<React.Suspense fallback={<RouteLoading />}>
// 									<ExpensePage />
// 								</React.Suspense>
// 							}
// 						/>
// 					</Route>
// 				</Route>
// 				<Route
// 					path='/login'
// 					element={
// 						<React.Suspense fallback={<RouteLoading />}>
// 							<Login />
// 						</React.Suspense>
// 					}
// 				/>
// 				<Route path='*' element={<Notfound />} />
// 			</Routes>
// 			{background && (
// 				<Routes>
// 					<Route path={'expense'} element={<ProtectedRoute />}>
// 						<Route
// 							path='create'
// 							element={
// 								<React.Suspense fallback={<RouteLoading />}>
// 									<ExpenseCreate />
// 								</React.Suspense>
// 							}
// 						/>
// 						<Route
// 							path=':id/edit'
// 							action={async ({ params }) => {
// 								return lugatExpenseGet(params.id ?? '')
// 							}}
// 							element={
// 								<React.Suspense fallback={<RouteLoading />}>
// 									<ExpenseEdit />
// 								</React.Suspense>
// 							}
// 						/>
// 					</Route>
// 				</Routes>
// 			)}
// 		</CookiesProvider>
// 	)
// }
const router = createBrowserRouter([
	{
		path: '/',
		element: <ProtectedRoute />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: 'expense',
				children: [
					{
						index: true,
						path: 'list',
						element: <ExpensePage />,
					},
					{
						path: 'create',
						element: <ExpenseCreate />,
					},
					{
						path: ':id/edit',
						element: <ExpenseEdit />,
						loader: async ({  params }) => {
							let data = await storeDispatch(
								expenseApi.endpoints?.getExpense.initiate(params.id ?? ''),
							)
							return defer(data.data as Record<string, unknown>)
						},
					},
				],
			},
		],
	},
])

export default router
