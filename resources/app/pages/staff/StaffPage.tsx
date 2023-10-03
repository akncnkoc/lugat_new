import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import LugatButton from '@/components/form/LugatButton'
import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import LugatTable from '@/components/table/LugatTable'
import LugatInput from '@/components/form/LugatInput'
import { useLazyGetStaffsQuery } from '@/services/api/staff-api'
import { StaffDataType, StaffTypeData } from '@/types/staff-types'
import StaffTableActionColumn from '@/pages/staff/components/StaffTableActionColumn'

const StaffPage: React.FC = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	const navigate = useNavigate()
	const [pageParams, setPageParams] = useState<{
		page: string
		search: string
	}>({
		page: searchParams.get('page') ?? '1',
		search: searchParams.get('search') ?? '',
	})
	const [getStaffs, { isFetching, error, data: staffs }] = useLazyGetStaffsQuery()
	const fetch = (page = pageParams.page, search = pageParams.search) =>
		getStaffs({ page: page, search: search })

	const defaultColumns: ColumnDef<StaffDataType>[] = [
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
			accessorFn: (originalRow) => StaffTypeData[originalRow.type as keyof typeof StaffTypeData],
		},
		{
			header: 'Actions',
			cell: ({ cell }) => {
				return <StaffTableActionColumn cell={cell} refetch={fetch} />
			},
		},
	]

	const table = useReactTable({
		data: staffs?.data ? staffs.data : [],
		columns: defaultColumns,
		getCoreRowModel: getCoreRowModel(),
	})

	useEffect(() => {
		fetch()
	}, [])

	const handleOnPaginate = (page: string) => {
		setPageParams((prev) => ({ ...prev, page }))
		fetch(page, pageParams.search)
	}

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
			<div className={'flex space-x-4 justify-between px-4 items-center'}>
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
					<LugatButton onClick={() => navigate('/staff/create')}>Create Staff</LugatButton>
				</div>
			</div>
			<div className='p-4 rounded-lg'>
				<section className='grid grid-cols-1 gap-2 gap-y-2'>
					<LugatTable
						label={'Staff'}
						table={table}
						meta={staffs?.meta ?? undefined}
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
export default StaffPage
