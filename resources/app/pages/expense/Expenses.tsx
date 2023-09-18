import React, { useCallback, useEffect, useState } from 'react'
import LoadingAnim from '@/components/anims/LoadingAnim'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import Pagination from '@/components/Pagination'
import LugatButton from '@/components/form/LugatButton'
import LugatAlert from '@/components/LugatAlert.tsx'
import { lugatExpenseAll } from '@/services/api/lugat-expense.ts'
import { ExpenseDataType, ExpenseResource } from '@/helpers/types.ts'
import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import LugatTable from '@/components/table/LugatTable.tsx'
import { useTranslation } from 'react-i18next'

const Expenses: React.FC = () => {
	const { t } = useTranslation()
	const defaultColumns: ColumnDef<ExpenseDataType>[] = [
		{
			header: t(''),
			accessorKey: 'amount',
		},
		{
			header: 'Expense Type',
			accessorFn: (originalRow) => originalRow.type,
		},
		{
			header: 'Receipt Date',
			accessorKey: 'receipt_date',
		},
	]

	const navigate = useNavigate()
	const location = useLocation()
	const [expenses, setExpenses] = useState<ExpenseResource>()
	const [loading, setLoading] = useState(false)
	const [params] = useSearchParams()
	const [currentPage, setCurrentPage] = useState('1')

	const table = useReactTable({
		data: expenses?.data ?? [],
		columns: defaultColumns,
		getCoreRowModel: getCoreRowModel(),
	})
	const fetchExpenses = useCallback(
		(page = '1') => {
			setLoading(true)
			lugatExpenseAll(page.toString()).then((res) => {
				setExpenses(res.data)
				setLoading(false)
				setCurrentPage(page)
			})
		},
		[params],
	)
	useEffect(() => {
		fetchExpenses(localStorage.getItem('current_page') ?? '1')
	}, [])

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
				{loading && (
					<div className={'h-96 flex items-center justify-center'}>
						<LoadingAnim />
					</div>
				)}
				<section className='grid grid-cols-1 gap-2 gap-y-2'>
					{!loading && expenses && <LugatTable table={table} />}
				</section>
				{!loading && expenses && expenses.data.length === 0 && (
					<LugatAlert>Herhangi bir kupon bulunamadı.</LugatAlert>
				)}
				{expenses && expenses.meta && (
					<Pagination
						perPage={expenses.meta.per_page}
						total={expenses.meta.total}
						paginate={(page: string) => {
							fetchExpenses(page)
						}}
						currentPage={Number(currentPage)}
					/>
				)}
			</div>
		</>
	)
}
export default Expenses
