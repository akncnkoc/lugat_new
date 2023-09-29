import { createApi } from '@reduxjs/toolkit/query/react'
import { DefaultResponseType } from '@/helpers/types'
import baseQueryConfigWithAuth from '@/store/config/baseQueryConfigWithAuth'
import { ExpenseResource, ExpenseSingleResource, ExpenseStoreType } from '@/types/expense-types'

export const expenseApi = createApi({
	reducerPath: 'expenseApi',
	baseQuery: baseQueryConfigWithAuth,
	tagTypes: ['Expense'],
	endpoints: (builder) => ({
		getExpenses: builder.query<ExpenseResource, { page: string; search: string }>({
			query({ page = '1', search }) {
				const url = new URL(window.location.toString())
				url.searchParams.set('search', search.toString())
				return {
					url: `v1/expense?page=${page}&${decodeURIComponent(url.searchParams.toString())}`,
				}
			},
			providesTags: ['Expense'],
		}),
		getExpense: builder.query<ExpenseSingleResource, string>({
			query: (id: string) => `v1/expense/${id}`,
			providesTags: ['Expense'],
		}),
		storeExpense: builder.mutation<DefaultResponseType, ExpenseStoreType>({
			query(body) {
				return {
					url: `v1/expense`,
					method: 'POST',
					body,
				}
			},
			invalidatesTags: ['Expense'],
		}),
		updateExpense: builder.mutation<DefaultResponseType, { body: ExpenseStoreType; id: string }>({
			query({ id, body }) {
				return {
					url: `v1/expense/${id}`,
					method: 'PUT',
					body,
				}
			},
			invalidatesTags: ['Expense'],
		}),
		deleteExpense: builder.mutation<DefaultResponseType, string>({
			query(id) {
				return {
					url: `v1/expense/${id}`,
					method: 'DELETE',
				}
			},
			invalidatesTags: ['Expense'],
		}),
	}),
})

export const {
	useGetExpensesQuery,
	useStoreExpenseMutation,
	useDeleteExpenseMutation,
	useUpdateExpenseMutation,
} = expenseApi
