import React, { Fragment, useEffect, useState } from 'react'
import LugatButton from '@/components/form/LugatButton'
import { Dialog, Transition } from '@headlessui/react'
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

const ProductVariants: React.FC = () => {
	const [showVariantsModal, setShowVariantsModal] = useState(false)
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
		})
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
		if (showVariantsModal) fetch()
	}, [showVariantsModal])

	const closeModal = () => setShowVariantsModal(false)
	return (
		<>
			<LugatButton
				buttonClassNames={'bg-green-500 hover:bg-green-600'}
				onClick={() => setShowVariantsModal((prev) => !prev)}
			>
				Variants
			</LugatButton>
			<Transition appear show={showVariantsModal} as={Fragment}>
				<Dialog as='div' className='relative z-[99]' onClose={closeModal}>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
					>
						<div className='fixed w-screen h-screen inset-0 bg-black bg-opacity-25' />
					</Transition.Child>

					<div className='fixed inset-0 overflow-y-auto z-[999]'>
						<div className='flex min-h-full items-center justify-center z-[999] p-4 text-center '>
							<Transition.Child
								as={Fragment}
								enter='ease-out duration-300'
								enterFrom='opacity-0 scale-95'
								enterTo='opacity-100 scale-100'
								leave='ease-in duration-200'
								leaveFrom='opacity-100 scale-100'
								leaveTo='opacity-0 scale-95'
							>
								<Dialog.Panel className='w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all'>
									<LugatTable
										label={'Variants'}
										table={table}
										meta={variants?.meta ?? undefined}
										fetching={isFetching}
										onPaginate={(page: string) => handleOnPaginate(page)}
										currentPage={pageParams.page}
										error={error}
									/>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	)
}

export default ProductVariants
