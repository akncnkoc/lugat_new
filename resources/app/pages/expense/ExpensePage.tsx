import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import LugatButton from '@/components/form/LugatButton'
import { CurrencyCodeToSign } from '@/helpers/types'
import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import LugatTable from '@/components/table/LugatTable'
import { useGetExpensesQuery } from '@/services/api/expense-api'
import ExpenseTableActionColumn from '@/pages/expense/components/ExpenseTableActionColumn'
import { ExpenseDataType, ExpenseTypeData } from '@/types/expense-types'

const ExpensePage: React.FC = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	const navigate = useNavigate()
	const [currentPage, setCurrentPage] = useState(searchParams.get('page') ?? '1')
	const {
		data: expenses,
		error,
		isFetching,
		refetch,
	} = useGetExpensesQuery({ page: currentPage, search: '' })
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
				return <ExpenseTableActionColumn cell={cell} refetch={refetch} />
			},
		},
	]

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
					<LugatButton onClick={() => navigate('/expense/create')}>Create Expense</LugatButton>
				</div>
			</div>
			<div className='p-4 rounded-lg'>
				<section className='grid grid-cols-1 gap-2 gap-y-2'>
					<LugatTable
						label={'Expense'}
						table={table}
						meta={expenses?.meta ?? undefined}
						fetching={isFetching}
						onPaginate={(page: string) => setCurrentPage(page)}
						currentPage={currentPage}
						error={error}
					/>
				</section>
			</div>
		</>
	)
}
export default ExpensePage
