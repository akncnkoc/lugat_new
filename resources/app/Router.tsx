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
			</Route>
			<Route path={'login'} element={<Login />} />
			<Route path={'*'} element={<Notfound />} />
		</>,
	),
)

export default router
