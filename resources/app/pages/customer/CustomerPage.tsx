import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import LugatButton from '@/components/form/LugatButton'
import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import LugatTable from '@/components/table/LugatTable'
import { useGetCustomersQuery } from '@/services/api/customer-api'
import { CustomerDataType } from '@/types/customer-types'
import CustomerTableActionColumn from '@/pages/customer/components/CustomerTableActionColumn'
import LugatInput from '@/components/form/LugatInput'
import debounce from 'lodash.debounce'

const ExpensePage: React.FC = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	const navigate = useNavigate()
	const [searchText, setSearchText] = useState('')
	const [currentPage, setCurrentPage] = useState(searchParams.get('page') ?? '1')
	const {
		data: customers,
		error,
		isFetching,
		refetch,
	} = useGetCustomersQuery({ page: currentPage, search: searchText })
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
				return <CustomerTableActionColumn cell={cell} refetch={refetch} />
			},
		},
	]

	const table = useReactTable({
		data: customers?.data ? customers.data : [],
		columns: defaultColumns,
		getCoreRowModel: getCoreRowModel(),
	})

	useEffect(() => {
		refetch()
		setSearchParams({
			page: currentPage,
			search: searchText,
		})
	}, [currentPage, searchText])
	const handleInputChange = (text: string) => {
		setSearchText(text)
		setSearchParams({
			page: currentPage,
			search: text,
		})
		debounce(refetch, 300)
	}

	return (
		<>
			<div className={'flex space-x-4 justify-between px-4 items-center'}>
				<div>
					<div className='w-fit'>
						<LugatInput
							inputClassnames={'!w-64'}
							placeholder={'Search'}
							value={searchText}
							onChange={(e) => handleInputChange(e.target.value)}
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
