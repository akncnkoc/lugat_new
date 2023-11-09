import LugatBadge from '@/components/LugatBadge'
import LugatButton from '@/components/form/LugatButton'
import LugatTable from '@/components/table/LugatTable'
import { CurrencyCodeToSign } from '@/helpers/types'
import ExpenseTableActionColumn from '@/pages/expense/components/ExpenseTableActionColumn'
import { useLazyGetExpensesQuery } from '@/services/api/expense-api'
import { ExpenseDataType, ExpenseStatusType, ExpenseTypeData } from '@/types/expense-types'
import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { clsx } from 'clsx'
import moment from 'moment-timezone'
import React, { ReactNode, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const ExpensePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(searchParams.get('page') ?? '1')
  const [getExpenses, { isFetching, error, data: expenses }] = useLazyGetExpensesQuery()
  const fetch = (page = currentPage) => getExpenses({ page: page })

  const defaultColumns: ColumnDef<ExpenseDataType>[] = [
    {
      header: 'Amount',
      accessorFn: (originalRow) => originalRow.amount + ' ' + CurrencyCodeToSign(originalRow.currency.code),
    },
    {
      header: 'Expense Type',
      accessorFn: (originalRow) => ExpenseTypeData[originalRow.type],
    },
    {
      header: 'Status',
      accessorFn: (originalRow) => ExpenseStatusType[originalRow.status],
      cell: ({ getValue }) => {
        const value = getValue() as ReactNode
        switch (value) {
          case 'Paided':
            return <LugatBadge variant='success'>{value}</LugatBadge>
          case 'Scheduled':
            return <LugatBadge variant='secondary'>{value}</LugatBadge>
        }
      },
    },
    {
      header: 'Receipt Date',
      accessorKey: 'receipt_date',
      cell: ({ getValue }) => ((getValue() as string) ? moment(getValue() as string).format('DD.MM.YYYY HH:mm:ss') : null),
    },
    {
      header: 'Scheduled Date',
      accessorKey: 'scheduled_date',
      cell: ({ getValue }) => ((getValue() as string) ? moment(getValue() as string).format('DD.MM.YYYY HH:mm:ss') : null),
    },
    {
      header: 'Actions',
      cell: ({ cell }) => {
        return <ExpenseTableActionColumn cell={cell} refetch={fetch} />
      },
    },
  ]

  const table = useReactTable({
    data: expenses?.data ? expenses.data : [],
    columns: defaultColumns,
    getCoreRowModel: getCoreRowModel(),
  })

  useEffect(() => {
    fetch(currentPage)
    setSearchParams({
      page: currentPage,
    })
  }, [currentPage])

  return (
    <>
      <div className={clsx('flex', 'space-x-4', 'justify-end', 'px-4')}>
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
