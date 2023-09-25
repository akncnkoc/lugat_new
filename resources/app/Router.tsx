import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import ProtectedRoute from '@/layouts/ProtectedRoute'
import ExpensePage from '@/pages/expense/ExpensePage'
import ExpenseCreate from '@/pages/expense/modals/ExpenseCreate'
import Login from '@/pages/auth/Login'
import ExpenseEdit from '@/pages/expense/modals/ExpenseEdit'

const Home = React.lazy(() => import('@/pages/Home'))

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path='/' element={<ProtectedRoute />}>
				<Route index element={<Home />} />
				<Route path={'expense'}>
					<Route path={'list'} element={<ExpensePage />} />
					<Route path={'create'} element={<ExpenseCreate />} />
					<Route path={':id/edit'} element={<ExpenseEdit />} />
				</Route>
			</Route>
			<Route path={'login'} element={<Login />} />
		</>,
	),
)

export default router
