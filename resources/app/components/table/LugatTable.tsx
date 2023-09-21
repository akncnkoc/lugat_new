import { flexRender, Table } from '@tanstack/react-table'
import React from 'react'
import { ExpenseDataType } from '@/helpers/types'

type LugatTableProps = {
	table: Table<ExpenseDataType>
}

const LugatTable: React.FC<LugatTableProps> = ({ table }) => {
	return (
		<div className='overflow-x-auto  sm:rounded-lg'>
			<div className='overflow-hidden'>
				<div className={'bg-white w-full px-6 py-4'}>Expense</div>
				<table className='min-w-full divide-y table-fixed divide-gray-100'>
					<thead className={'bg-gray-50'}>
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<th
										className={
											'py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700'
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
									<td className={'py-3 px-6'} key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default LugatTable
