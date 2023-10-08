import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import LugatButton from '@/components/form/LugatButton'
import {
	ColumnDef,
	getCoreRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable,
} from '@tanstack/react-table'
import LugatTable from '@/components/table/LugatTable'
import LugatInput from '@/components/form/LugatInput'
import { useLazyGetProductsQuery } from '@/services/api/product-api'
import { ProductDataType } from '@/types/product-types'
import ProductTableActionColumn from '@/pages/product/components/ProductTableActionColumn'
import { clsx } from 'clsx'

const ProductPage: React.FC = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	const navigate = useNavigate()
	const [pageParams, setPageParams] = useState<{
		page: string
		search: string
		sorting: SortingState
	}>({
		page: searchParams.get('page') ?? '1',
		search: searchParams.get('search') ?? '',
		sorting: [],
	})
	const [getProducts, { isFetching, error, data: products }] = useLazyGetProductsQuery()
	const fetch = (
		page = pageParams.page,
		search = pageParams.search,
		sorting: SortingState = [
			{
				id: 'name',
				desc: true,
			},
		],
	) => {
		return getProducts({
			page,
			search,
			orderByColumn: sorting[0].id,
			orderByColumnDirection: sorting[0].desc ? 'desc' : 'asc',
		})
	}

	const defaultColumns: ColumnDef<ProductDataType>[] = [
		{
			header: 'Name',
			accessorKey: 'name',
		},
		{
			header: 'Actions',
			cell: ({ cell }) => {
				return <ProductTableActionColumn cell={cell} refetch={fetch} />
			},
		},
	]

	const table = useReactTable({
		data: products?.data ? products.data : [],
		columns: defaultColumns,
		state: {
			sorting: pageParams.sorting,
		},
		onSortingChange: (sorting: any) => {
			setPageParams((prevState) => ({
				...prevState,
				sorting: sorting(),
			}))
			fetch(pageParams.page, pageParams.search, sorting())
		},
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		enableFilters: true,
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
					<LugatButton onClick={() => navigate('/product/create')}>Create Product</LugatButton>
				</div>
			</div>
			<div className='p-4 rounded-lg'>
				<LugatTable
					label={'Product'}
					table={table}
					meta={products?.meta ?? undefined}
					fetching={isFetching}
					onPaginate={(page: string) => handleOnPaginate(page)}
					currentPage={pageParams.page}
					error={error}
				/>
			</div>
		</>
	)
}
export default ProductPage
