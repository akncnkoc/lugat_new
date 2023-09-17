import { flexRender, Table } from '@tanstack/react-table'
import React from 'react'
import { ExpenseDataType } from '@/helpers/types.ts'

type LugatTableProps = {
	table: Table<ExpenseDataType>
}

const LugatTable: React.FC<LugatTableProps> = ({ table }) => {
	return (
		<div className='overflow-x-auto shadow-md sm:rounded-lg'>
			<div className='overflow-hidden '>
				<table className='min-w-full divide-y table-fixed divide-gray-700'>
					<thead className={'bg-gray-100 dark:bg-gray-900'}>
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<th
										className={
											'py-3 px-6 text-xs font-medium tracking-wider text-center uppercase text-white'
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
					<tbody className={'divide-y bg-gray-800 divide-gray-700'}>
						{table.getRowModel().rows.map((row) => (
							<tr key={row.id} className={'text-center hover:bg-gray-900 text-white align-middle'}>
								{row.getVisibleCells().map((cell) => (
									<td className={'p-4 w-4'} key={cell.id}>
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
