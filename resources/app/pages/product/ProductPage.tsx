import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import LugatButton from '@/components/form/LugatButton'
import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import LugatTable from '@/components/table/LugatTable'
import LugatInput from '@/components/form/LugatInput'
import { useGetProductsMutation } from '@/services/api/product-api'
import { ProductDataType } from '@/types/product-types'
import { CurrencyCodeToSign } from '@/helpers/types'
import ProductTableActionColumn from '@/pages/product/components/ProductTableActionColumn'

const ProductPage: React.FC = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	const navigate = useNavigate()
	const [pageParams, setPageParams] = useState<{
		page: string
		search: string
	}>({
		page: searchParams.get('page') ?? '1',
		search: searchParams.get('search') ?? '',
	})
	const [getProducts, { isLoading, error, data: products }] = useGetProductsMutation()
	const fetch = (page = pageParams.page, search = pageParams.search) => getProducts({ page, search })

	const defaultColumns: ColumnDef<ProductDataType>[] = [
		{
			header: 'Name',
			accessorKey: 'name',
		},
		{
			header: 'Model Code',
			accessorKey: 'model_code',
		},
		{
			header: 'Buy',
			accessorFn: (originalRow) =>
				originalRow.buy_price + ' ' + CurrencyCodeToSign(originalRow.buy_price_vault.currency.code),
		},
		{
			header: 'Sell',
			accessorFn: (originalRow) =>
				originalRow.sell_price +
				' ' +
				CurrencyCodeToSign(originalRow.sell_price_vault.currency.code),
		},
		{
			header: 'Critical Stock Alert',
			accessorFn: (originalRow) => (originalRow.critical_stock_alert ? 'Yes' : 'No'),
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
			fetch("1", pageParams.search)
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
					<LugatButton onClick={() => navigate('/product/create')}>Create Product</LugatButton>
				</div>
			</div>
			<div className='p-4 rounded-lg'>
				<section className='grid grid-cols-1 gap-2 gap-y-2'>
					<LugatTable
						label={'Product'}
						table={table}
						meta={products?.meta ?? undefined}
						fetching={isLoading}
						onPaginate={(page: string) => handleOnPaginate(page)}
						currentPage={pageParams.page}
						error={error}
					/>
				</section>
			</div>
		</>
	)
}
export default ProductPage
