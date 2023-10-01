import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import ProtectedRoute from '@/layouts/ProtectedRoute'
import ExpensePage from '@/pages/expense/ExpensePage'
import ExpenseCreate from '@/pages/expense/ExpenseCreate'
import Login from '@/pages/auth/Login'
import ExpenseEdit, { expenseLoader } from '@/pages/expense/ExpenseEdit'
import Notfound from '@/pages/notfound'
import VaultCreate from '@/pages/vault/VaultCreate'
import VaultPage from '@/pages/vault/VaultPage'
import VaultEdit, { vaultLoader } from '@/pages/vault/VaultEdit'
import CustomerPage from '@/pages/customer/CustomerPage'
import CustomerCreate from '@/pages/customer/CustomerCreate'
import CustomerEdit, { customerLoader } from '@/pages/customer/CustomerEdit'
import StaffPage from '@/pages/staff/StaffPage'
import StaffCreate from '@/pages/staff/StaffCreate'
import StaffEdit, { staffLoader } from '@/pages/staff/StaffEdit'
import ProductPage from '@/pages/product/ProductPage'
import ProductCreate from '@/pages/product/ProductCreate'

const Home = React.lazy(() => import('@/pages/Home'))

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path='/' element={<ProtectedRoute />}>
				<Route index element={<Home />} />
				<Route path={'expense'}>
					<Route path={'list'} element={<ExpensePage />} />
					<Route path={'create'} element={<ExpenseCreate />} />
					<Route path={':id/edit'} element={<ExpenseEdit />} loader={expenseLoader} />
				</Route>
				<Route path={'vault'}>
					<Route path={'list'} element={<VaultPage />} />
					<Route path={'create'} element={<VaultCreate />} />
					<Route path={':id/edit'} element={<VaultEdit />} loader={vaultLoader} />
				</Route>
				<Route path={'customer'}>
					<Route path={'list'} element={<CustomerPage />} />
					<Route path={'create'} element={<CustomerCreate />} />
					<Route path={':id/edit'} element={<CustomerEdit />} loader={customerLoader} />
				</Route>
				<Route path={'staff'}>
					<Route path={'list'} element={<StaffPage />} />
					<Route path={'create'} element={<StaffCreate />} />
					<Route path={':id/edit'} element={<StaffEdit />} loader={staffLoader} />
				</Route>
				<Route path={'product'}>
					<Route path={'list'} element={<ProductPage />} />
					<Route path={'create'} element={<ProductCreate />} />
					<Route path={':id/edit'} element={<StaffEdit />} loader={staffLoader} />
				</Route>
			</Route>
			<Route path={'login'} element={<Login />} />
			<Route path={'*'} element={<Notfound />} />
		</>,
	),
)

export default router
