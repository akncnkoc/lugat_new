import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import LugatButton from '@/components/form/LugatButton'
import LugatAlert from '@/components/LugatAlert'
import { CurrencyCodeToSign, ExpenseDataType, ExpenseTypeData } from '@/helpers/types'
import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import LugatTable from '@/components/table/LugatTable'
import { useDeleteExpenseMutation, useGetExpensesQuery } from '@/services/api/expense-api'
import toast from 'react-hot-toast'

const ExpensePage: React.FC = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	const [deleteExpense, { isLoading: deleteIsLoading }] = useDeleteExpenseMutation()
	const defaultColumns: ColumnDef<ExpenseDataType>[] = [
		{
			header: 'Amount',
			accessorFn: (originalRow) =>
				originalRow.amount + ' ' + CurrencyCodeToSign(originalRow.vault.currency.code),
		},
		{
			header: 'Expense Type',
			accessorFn: (originalRow) => ExpenseTypeData[originalRow.type],
		},
		{
			header: 'Receipt Date',
			accessorKey: 'receipt_date',
		},
		{
			header: 'Actions',
			cell: ({ cell }) => {
				return (
					<div className={'text-right space-x-1'}>
						<LugatButton
							buttonClassNames={'!w-fit'}
							onClick={() =>
								navigate(`/expense/${cell.row.original.id}/edit`, {
									state: { background: location },
								})
							}
						>
							Edit
						</LugatButton>
						<LugatButton
							buttonClassNames={'!w-fit bg-red-500 hover:bg-red-600'}
							onClick={async () => {
								if (!deleteIsLoading) {
									await toast.promise(deleteExpense(cell.row.original.id), {
										loading: 'Expense deleting...',
										error: 'Expense cannot deleted',
										success: () => {
											refetch()
											return 'Expense Deleted'
										},
									})
								} else {
									toast.error('You must wait before loading...', {
										position: 'top-right',
										duration: 1250,
									})
								}
							}}
						>
							Delete
						</LugatButton>
					</div>
				)
			},
		},
	]

	const navigate = useNavigate()
	const location = useLocation()
	const [currentPage, setCurrentPage] = useState(searchParams.get('page') ?? '1')

	const { data: expenses, error, isFetching, refetch } = useGetExpensesQuery(currentPage)
	const table = useReactTable({
		data: expenses?.data ? expenses.data : [],
		columns: defaultColumns,
		getCoreRowModel: getCoreRowModel(),
	})

	useEffect(() => {
		refetch()
		setSearchParams({
			page: currentPage,
		})
	}, [currentPage])

	return (
		<>
			<div className={'flex space-x-4 justify-end px-4'}>
				<div className='w-fit'>
					<LugatButton
						onClick={() => navigate('/expense/create', { state: { background: location } })}
					>
						Create Expense
					</LugatButton>
				</div>
			</div>
			<div className='p-4 rounded-lg'>
				<section className='grid grid-cols-1 gap-2 gap-y-2'>
					<LugatTable
						table={table}
						meta={expenses?.meta ?? undefined}
						fetching={isFetching}
						onPaginate={(page: string) => setCurrentPage(page)}
						currentPage={currentPage}
					/>
				</section>
				{!isFetching && expenses && expenses.data.length === 0 && (
					<LugatAlert alertClassNames={'bg-red-300 text-red-600'}>No expense found.</LugatAlert>
				)}
				{!isFetching && error && (
					<LugatAlert alertClassNames={'bg-red-200 text-red-900'}>
						Someting went wrong cant get expenses.
					</LugatAlert>
				)}
			</div>
		</>
	)
}
export default ExpensePage
