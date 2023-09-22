import { flexRender, Table } from '@tanstack/react-table'
import React from 'react'
import { CollectionMetaType, ExpenseDataType } from '@/helpers/types'
import Pagination from '@/components/Pagination'

type LugatTableProps = {
	table: Table<ExpenseDataType>
	meta: CollectionMetaType
	onPaginate: Function
	currentPage: number | string
}

const LugatTable: React.FC<LugatTableProps> = ({ table, meta, onPaginate, currentPage }) => {
	return (
		<div className='overflow-x-auto  sm:rounded-lg bg-white'>
			<div className='overflow-hidden'>
				<div className={'bg-white w-full px-6 py-4'}>Expense</div>
				<table className='min-w-full divide-y table-fixed divide-gray-100 border-b border-b-gray-100'>
					<thead className={'bg-gray-50'}>
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id} className={'h-9'}>
								{headerGroup.headers.map((header) => (
									<th
										className={
											'py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase'
										}
										key={header.id}
										colSpan={header.colSpan}
									>
										{header.isPlaceholder
											? null
											: flexRender(header.column.columnDef.header, header.getContext())}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody className={'divide-y bg-white divide-gray-100'}>
						{table.getRowModel().rows.map((row) => (
							<tr key={row.id} className={'text-left text-gray-700 text-sm align-middle'}>
								{row.getVisibleCells().map((cell) => (
									<td className={'py-3 px-6 min-h-[72px] h-[72px]'} key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div className={'px-6 py-4'}>
				{table && meta && (
					<Pagination meta={meta} paginate={onPaginate} currentPage={Number(currentPage)} />
				)}
			</div>
		</div>
	)
}

export default LugatTable
