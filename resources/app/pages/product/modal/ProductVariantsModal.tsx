import React, { useEffect, useState } from 'react'
import LugatButton from '@/components/form/LugatButton'
import { useLazyGetVariantsQuery } from '@/services/api/variant-api'
import { useSearchParams } from 'react-router-dom'
import {
	ColumnDef,
	ExpandedState,
	getCoreRowModel,
	getExpandedRowModel,
	useReactTable,
} from '@tanstack/react-table'
import { VariantDataType } from '@/types/variant-types'
import VariantTableActionColumn from '@/pages/product/components/VariantTableActionColumn'
import LugatTable from '@/components/table/LugatTable'
import { LuMinusCircle, LuPlusCircle } from 'react-icons/lu'
import { VscDebugBreakpointDataUnverified } from 'react-icons/vsc'
import { motion } from 'framer-motion'
import Card from '@/components/card'
import LugatModal from '@/components/modal'
import ProductVariantCreateModal from '@/pages/product/modal/ProductVariantsCreateModal'

const ProductVariantsModal: React.FC = () => {
	const [searchParams, _] = useSearchParams()
	const [getVariants, { isFetching, error, data: variants }] = useLazyGetVariantsQuery()
	const [pageParams, setPageParams] = useState<{
		page: string
		search: string
	}>({
		page: searchParams.get('page') ?? '1',
		search: searchParams.get('search') ?? '',
	})
	const fetch = (page = pageParams.page, search = pageParams.search) => {
		return getVariants({
			page,
			search,
		}, true)
	}

	const defaultColumns: ColumnDef<VariantDataType>[] = [
		{
			accessorKey: 'name',
			footer: (props) => props.column.id,
			header: 'Name',
			cell: ({ row, getValue }) => (
				<div
					style={{
						paddingLeft: `${row.depth}rem`,
					}}
				>
					<motion.div
						className={'flex items-center space-x-2'}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						{row.getCanExpand() ? (
							<button
								{...{
									onClick: row.getToggleExpandedHandler(),
									style: { cursor: 'pointer' },
								}}
							>
								{row.getIsExpanded() ? <LuMinusCircle /> : <LuPlusCircle />}
							</button>
						) : (
							<VscDebugBreakpointDataUnverified />
						)}{' '}
						<div className={'block'}>
							<>{getValue()}</>
						</div>
					</motion.div>
				</div>
			),
		},
		{
			header: 'Actions',
			cell: ({ cell }) => {
				return <VariantTableActionColumn cell={cell} refetch={fetch} />
			},
		},
	]
	const [expanded, setExpanded] = React.useState<ExpandedState>({})

	const table = useReactTable({
		data: variants?.data ? variants.data : [],
		columns: defaultColumns,
		getCoreRowModel: getCoreRowModel(),
		state: {
			expanded,
		},
		onExpandedChange: setExpanded,
		getSubRows: (row) => row.childrens,
		getExpandedRowModel: getExpandedRowModel(),
	})

	const handleOnPaginate = (page: string) => {
		setPageParams((prev) => ({ ...prev, page }))
		fetch(page, pageParams.search)
	}

	useEffect(() => {
		fetch()
	}, [])

	return (
		<Card className={'w-[800px] !shadow-none'}>
			<Card.Header>
				<div className={'flex items-center justify-between flex-1'}>
					<h3 className={'text-lg block font-semibold'}>Product Variant Types</h3>
					<LugatModal>
						<LugatModal.Trigger>
							<LugatButton className={'!px-4 !h-8'}>Create</LugatButton>
						</LugatModal.Trigger>
						<LugatModal.Body>
							{(setShow) => <ProductVariantCreateModal setShow={setShow} />}
						</LugatModal.Body>
					</LugatModal>
				</div>
			</Card.Header>
			<Card.Body className={'!p-0'}>
				<LugatTable
					table={table}
					meta={variants?.meta ?? undefined}
					fetching={isFetching}
					onPaginate={(page: string) => handleOnPaginate(page)}
					currentPage={pageParams.page}
					error={error}
				/>
			</Card.Body>
		</Card>
	)
}

export default ProductVariantsModal
