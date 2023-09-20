import React, { useEffect, useState } from 'react'
import LoadingAnim from '@/components/anims/LoadingAnim'
import { useLocation, useNavigate } from 'react-router-dom'
import Pagination from '@/components/Pagination'
import LugatButton from '@/components/form/LugatButton'
import LugatAlert from '@/components/LugatAlert'
import { CurrencyCodeToSign, ExpenseDataType, ExpenseTypeData } from '@/helpers/types'
import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import LugatTable from '@/components/table/LugatTable'
import { useGetExpensesQuery } from '@/services/api/expense-api'

const Expenses: React.FC = () => {
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
			<div className='p-2 border-2 border-dashed rounded-lg border-gray-700 bg-gray-700 mt-14'>
				<div className={'flex space-x-4 justify-end'}>
					<div className='w-fit'>
						<LugatButton
							onClick={() => navigate('/expense/create', { state: { background: location } })}
						>
							Gider Ekle
						</LugatButton>
					</div>
				</div>
			</div>
			<div className='p-4 border-2 border-dashed rounded-lg border-gray-700 bg-gray-700 mt-4'>
				{isLoading && (
					<div className={'h-96 flex items-center justify-center'}>
						<LoadingAnim />
					</div>
				)}
				<section className='grid grid-cols-1 gap-2 gap-y-2'>
					{!isLoading && expenses && <LugatTable table={table} />}
				</section>
				{!isLoading && expenses && expenses.data.length === 0 && (
					<LugatAlert alertClassNames={'bg-red-300 text-red-600'}>No expense found.</LugatAlert>
				)}
				{!isLoading && error && (
					<LugatAlert alertClassNames={'bg-red-200 text-red-900'}>
						Someting went wrong cant get expenses.
					</LugatAlert>
				)}
				{expenses && expenses.meta && (
					<Pagination
						perPage={expenses.meta.per_page}
						total={expenses.meta.total}
						paginate={(page: string) => setCurrentPage(page)}
						currentPage={Number(currentPage)}
					/>
				)}
			</div>
		</>
	)
}
export default Expenses
