import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import LugatButton from '@/components/form/LugatButton'
import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import LugatTable from '@/components/table/LugatTable'
import { CustomerDataType } from '@/types/customer-types'
import CustomerTableActionColumn from '@/pages/customer/components/CustomerTableActionColumn'
import LugatInput from '@/components/form/LugatInput'
import { useLazyGetCustomersQuery } from '@/services/api/customer-api'
import { clsx } from 'clsx'

const ExpensePage: React.FC = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	const navigate = useNavigate()
	const [pageParams, setPageParams] = useState<{
		page: string
		search: string
	}>({
		page: searchParams.get('page') ?? '1',
		search: searchParams.get('search') ?? '',
	})
	const [getCustomers, { isFetching, error, data: customers }] = useLazyGetCustomersQuery()
	const fetch = (page = pageParams.page, search = pageParams.search) =>
		getCustomers({ page, search })

	const defaultColumns: ColumnDef<CustomerDataType>[] = [
		{
			header: 'Full Name',
			accessorKey: 'full_name',
		},
		{
			header: 'Email',
			accessorKey: 'email',
		},
		{
			header: 'Phone',
			accessorKey: 'phone', 
		},
		{
			header: 'Type',
			accessorFn: (originalRow) => originalRow.customer_type.name,
		},
		{
			header: 'Actions',
			cell: ({ cell }) => {
				return <CustomerTableActionColumn cell={cell} refetch={fetch} />
			},
		},
	]

	const table = useReactTable({
		data: customers?.data ? customers.data : [],
		columns: defaultColumns,
		getCoreRowModel: getCoreRowModel(),
	})

	const handleOnPaginate = (page: string) => {
		setPageParams((prev) => ({ ...prev, page }))
		fetch(page, pageParams.search)
	}

	useEffect(() => {
		fetch()
	}, [])

	const handleInputChange = (text: string) => {
		setPageParams((prev) => ({ ...prev, search: text }))
	}
	const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.code === 'Enter') {
			setSearchParams({
				page: pageParams.page,
				search: pageParams.search,
			})
			fetch('1', pageParams.search)
		}
	}
	return (
		<>
			<div className={clsx('flex', 'space-x-4', 'justify-between', 'px-4', 'items-center')}>
				<div>
					<div className='w-fit'>
						<LugatInput
							inputClassnames={'!w-64'}
							placeholder={'Search'}
							value={pageParams.search}
							onChange={(e) => handleInputChange(e.target.value)}
							onKeyUp={(e) => handleEnterPress(e)}
						/>
					</div>
				</div>
				<div className='w-fit'>
					<LugatButton onClick={() => navigate('/customer/create')}>Create Customer</LugatButton>
				</div>
			</div>
			<div className='p-4 rounded-lg'>
				<section className='grid grid-cols-1 gap-2 gap-y-2'>
					<LugatTable
						label={'Customer'}
						table={table}
						meta={customers?.meta ?? undefined}
						fetching={isFetching}
						onPaginate={(page: string) => handleOnPaginate(page)}
						currentPage={pageParams.page}
						error={error}
					/>
				</section>
			</div>
		</>
	)
}
export default ExpensePage
