import { createApi } from '@reduxjs/toolkit/query/react'
import {
	DefaultResponseType,
	ExpenseResource,
	ExpenseSingleResource,
	ExpenseStoreFormType,
} from '@/helpers/types'
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
		getExpense: builder.query<ExpenseSingleResource, string>({
			query: (id: string) => `v1/expense/${id}`,
			providesTags: ['Expense'],
		}),
		storeExpense: builder.mutation<DefaultResponseType, ExpenseStoreFormType>({
			query(body) {
				return {
					url: `v1/expense`,
					method: 'POST',
					body,
				}
			},
		}),
		updateExpense: builder.mutation<
			DefaultResponseType,
			{ body: ExpenseStoreFormType; id: string }
		>({
			query({ id, body }) {
				return {
					url: `v1/expense/${id}`,
					method: 'PUT',
					body,
				}
			},
		}),
		deleteExpense: builder.mutation<DefaultResponseType, string>({
			query(id) {
				return {
					url: `v1/expense/${id}`,
					method: 'DELETE',
				}
			},
		}),
	}),
})

export const {
	useGetExpensesQuery,
	useStoreExpenseMutation,
	useGetExpenseQuery,
	useDeleteExpenseMutation,
	useUpdateExpenseMutation,
} = expenseApi
