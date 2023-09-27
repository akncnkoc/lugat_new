import { flexRender, Table } from '@tanstack/react-table'
import React from 'react'
import { CollectionMetaType, ExpenseDataType } from '@/helpers/types'
import Pagination from '@/components/Pagination'
import LoaderComponent from '@/components/LoaderComponent'

type LugatTableProps = {
	table: Table<ExpenseDataType>
	meta?: CollectionMetaType
	onPaginate: Function
	currentPage: number | string
	fetching: boolean
}

const LugatTable: React.FC<LugatTableProps> = ({
	table,
	meta,
	onPaginate,
	currentPage,
	fetching,
}) => {
	return (
		<div className='overflow-x-auto  sm:rounded-lg bg-white'>
			<div className='overflow-hidden'>
				<div className={'bg-white w-full px-6 py-4'}>Expense</div>
				<table className='min-w-full divide-y table-fixed divide-gray-100 border-b border-b-gray-100'>
					<thead className={'bg-gray-50'}>
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id} className={'h-9 flex-1'}>
								{headerGroup.headers.map((header) => (
									<th
										className={`py-3 px-6 text-xs font-medium tracking-wider text-gray-700 uppercase ${
											header.column.columnDef.header === 'Actions' ? 'text-right' : 'text-left'
										}`}
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
					{fetching ? (
						<tr>
							<td className={'w-full h-96'} colSpan={100}>
								<LoaderComponent loaderClassName={'after:bg-gray-200'} />
							</td>
						</tr>
					) : (
						<tbody className={'divide-y bg-white divide-gray-100'}>
							{table.getRowModel().rows.map((row) => (
								<tr key={row.id} className={'text-left text-gray-700 text-sm align-middle'}>
									{row.getVisibleCells().map((cell) => (
										<td className={'py-3 px-6 min-h-[52px] h-[52px]'} key={cell.id}>
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</td>
									))}
								</tr>
							))}
						</tbody>
					)}
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
