import React, { useEffect, useState } from 'react'
import LoadingAnim from '@/components/anims/LoadingAnim'
import { useLocation, useNavigate } from 'react-router-dom'
import LugatButton from '@/components/form/LugatButton'
import LugatAlert from '@/components/LugatAlert'
import { CurrencyCodeToSign, ExpenseDataType, ExpenseTypeData } from '@/helpers/types'
import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import LugatTable from '@/components/table/LugatTable'
import { useGetExpensesQuery } from '@/services/api/expense-api'

const ExpensePage: React.FC = () => {
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
					<div
						className={'text-right'}
						onClick={() => navigate(`/expense/${cell.row.original.id}/edit`, { state: { background: location } })}
					>
						<LugatButton buttonClassNames={'!w-fit'}>Edit</LugatButton>
					</div>
				)
			},
		},
	]

	const navigate = useNavigate()
	const location = useLocation()
	const [currentPage, setCurrentPage] = useState('1')

	const { data: expenses, error, isLoading, refetch } = useGetExpensesQuery(currentPage)
	const table = useReactTable({
		data: expenses?.data ? expenses.data : [],
		columns: defaultColumns,
		getCoreRowModel: getCoreRowModel(),
	})

	useEffect(() => {
		refetch()
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
				{isLoading && (
					<div className={'h-96 flex items-center justify-center'}>
						<LoadingAnim />
					</div>
				)}
				<section className='grid grid-cols-1 gap-2 gap-y-2'>
					{!isLoading && expenses && (
						<LugatTable
							table={table}
							meta={expenses.meta}
							onPaginate={(page: string) => setCurrentPage(page)}
							currentPage={currentPage}
						/>
					)}
				</section>
				{!isLoading && expenses && expenses.data.length === 0 && (
					<LugatAlert alertClassNames={'bg-red-300 text-red-600'}>No expense found.</LugatAlert>
				)}
				{!isLoading && error && (
					<LugatAlert alertClassNames={'bg-red-200 text-red-900'}>
						Someting went wrong cant get expenses.
					</LugatAlert>
				)}
			</div>
		</>
	)
}
export default ExpensePage
