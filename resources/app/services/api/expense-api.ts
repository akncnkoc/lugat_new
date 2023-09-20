import { createApi } from '@reduxjs/toolkit/query/react'
import { ExpenseResource } from '@/helpers/types'
import baseQueryConfigWithAuth from '@/store/config/baseQueryConfigWithAuth'

export const expenseApi = createApi({
	reducerPath: 'expenseApi',
	baseQuery: baseQueryConfigWithAuth,
	tagTypes: ['Expense'],
	endpoints: (builder) => ({
		getExpenses: builder.query<ExpenseResource, string>({
			query: (page: string = '1') => `v1/expense?page=${page}`,
			providesTags: ['Expense'],
		}),
	}),
})

export const { useGetExpensesQuery } = expenseApi
