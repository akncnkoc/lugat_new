import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import ProtectedRoute from '@/layouts/ProtectedRoute'
import { expenseLoader } from '@/pages/expense/ExpenseEdit'
import { vaultLoader } from '@/pages/vault/VaultEdit'
import { customerLoader } from '@/pages/customer/CustomerEdit'
import { staffLoader } from '@/pages/staff/StaffEdit'
import { productLoader } from '@/pages/product/ProductEdit'
import LoaderComponent from '@/components/LoaderComponent'

const Home = React.lazy(() => import('@/pages/Home'))

const ExpensePage = React.lazy(() => import('@/pages/expense/ExpensePage'))
const ExpenseCreatePage = React.lazy(() => import('@/pages/expense/ExpenseCreate'))
const ExpenseEditPage = React.lazy(() => import('@/pages/expense/ExpenseEdit'))
const VaultPage = React.lazy(() => import('@/pages/vault/VaultPage'))
const VaultCreatePage = React.lazy(() => import('@/pages/vault/VaultCreate'))
const VaultEditPage = React.lazy(() => import('@/pages/vault/VaultEdit'))
const CustomerPage = React.lazy(() => import('@/pages/customer/CustomerPage'))
const CustomerCreatePage = React.lazy(() => import('@/pages/customer/CustomerCreate'))
const CustomerEditPage = React.lazy(() => import('@/pages/customer/CustomerEdit'))

const StaffPage = React.lazy(() => import('@/pages/staff/StaffPage'))
const StaffCreatePage = React.lazy(() => import('@/pages/staff/StaffCreate'))
const StaffEditPage = React.lazy(() => import('@/pages/staff/StaffEdit'))
const ProductPage = React.lazy(() => import('@/pages/product/ProductPage'))
const ProductCreatePage = React.lazy(() => import('@/pages/product/ProductCreate'))
const ProductEditPage = React.lazy(() => import('@/pages/product/ProductEdit'))
const LoginPage = React.lazy(() => import('@/pages/auth/Login'))
const NotfoundPage = React.lazy(() => import('@/pages/notfound'))

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path='/' element={<ProtectedRoute />}>
				<Route
					index
					element={
						<React.Suspense fallback={<LoaderComponent loaderClassName={'after:bg-gray-200'} />}>
							<Home />
						</React.Suspense>
					}
				/>
				<Route path={'expense'}>
					<Route
						path={'list'}
						element={
							<React.Suspense fallback={<LoaderComponent loaderClassName={'after:bg-gray-200'} />}>
								<ExpensePage />
							</React.Suspense>
						}
					/>
					<Route
						path={'create'}
						element={
							<React.Suspense fallback={<LoaderComponent loaderClassName={'after:bg-gray-200'} />}>
								<ExpenseCreatePage />
							</React.Suspense>
						}
					/>
					<Route
						path={':id/edit'}
						element={
							<React.Suspense fallback={<LoaderComponent loaderClassName={'after:bg-gray-200'} />}>
								<ExpenseEditPage />
							</React.Suspense>
						}
						loader={expenseLoader}
					/>
				</Route>
				<Route path={'vault'}>
					<Route
						path={'list'}
						element={
							<React.Suspense fallback={<LoaderComponent loaderClassName={'after:bg-gray-200'} />}>
								<VaultPage />
							</React.Suspense>
						}
					/>
					<Route
						path={'create'}
						element={
							<React.Suspense fallback={<LoaderComponent loaderClassName={'after:bg-gray-200'} />}>
								<VaultCreatePage />
							</React.Suspense>
						}
					/>
					<Route
						path={':id/edit'}
						element={
							<React.Suspense fallback={<LoaderComponent loaderClassName={'after:bg-gray-200'} />}>
								<VaultEditPage />
							</React.Suspense>
						}
						loader={vaultLoader}
					/>
				</Route>
				<Route path={'customer'}>
					<Route
						path={'list'}
						element={
							<React.Suspense fallback={<LoaderComponent loaderClassName={'after:bg-gray-200'} />}>
								<CustomerPage />
							</React.Suspense>
						}
					/>
					<Route
						path={'create'}
						element={
							<React.Suspense fallback={<LoaderComponent loaderClassName={'after:bg-gray-200'} />}>
								<CustomerCreatePage />
							</React.Suspense>
						}
					/>
					<Route
						path={':id/edit'}
						element={
							<React.Suspense fallback={<LoaderComponent loaderClassName={'after:bg-gray-200'} />}>
								<CustomerEditPage />
							</React.Suspense>
						}
						loader={customerLoader}
					/>
				</Route>
				<Route path={'staff'}>
					<Route
						path={'list'}
						element={
							<React.Suspense fallback={<LoaderComponent loaderClassName={'after:bg-gray-200'} />}>
								<StaffPage />
							</React.Suspense>
						}
					/>
					<Route
						path={'create'}
						element={
							<React.Suspense fallback={<LoaderComponent loaderClassName={'after:bg-gray-200'} />}>
								<StaffCreatePage />
							</React.Suspense>
						}
					/>
					<Route
						path={':id/edit'}
						element={
							<React.Suspense fallback={<LoaderComponent loaderClassName={'after:bg-gray-200'} />}>
								<StaffEditPage />
							</React.Suspense>
						}
						loader={staffLoader}
					/>
				</Route>
				<Route path={'product'}>
					<Route
						path={'list'}
						element={
							<React.Suspense fallback={<LoaderComponent loaderClassName={'after:bg-gray-200'} />}>
								<ProductPage />
							</React.Suspense>
						}
					/>
					<Route
						path={'create'}
						element={
							<React.Suspense fallback={<LoaderComponent loaderClassName={'after:bg-gray-200'} />}>
								<ProductCreatePage />
							</React.Suspense>
						}
					/>
					<Route
						path={':id/edit'}
						element={
							<React.Suspense fallback={<LoaderComponent loaderClassName={'after:bg-gray-200'} />}>
								<ProductEditPage />
							</React.Suspense>
						}
						loader={productLoader}
					/>
				</Route>
			</Route>
			<Route
				path={'login'}
				element={
					<React.Suspense fallback={<LoaderComponent loaderClassName={'after:bg-gray-200'} />}>
						<LoginPage />
					</React.Suspense>
				}
			/>
			<Route
				path={'*'}
				element={
					<React.Suspense fallback={<LoaderComponent loaderClassName={'after:bg-gray-200'} />}>
						<NotfoundPage />
					</React.Suspense>
				}
			/>
		</>,
	),
)

export default router
