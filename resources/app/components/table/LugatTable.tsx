import { flexRender, Table } from '@tanstack/react-table'
import React from 'react'
import { CollectionMetaType, ExpenseDataType, VaultDataType } from '@/helpers/types'
import Pagination from '@/components/Pagination'
import LoaderComponent from '@/components/LoaderComponent'
import LugatAlert from '@/components/LugatAlert'
import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/react'

type LugatTableProps = {
	table: Table<ExpenseDataType> | Table<VaultDataType>
	meta?: CollectionMetaType
	onPaginate: Function
	currentPage: number | string
	fetching: boolean
	error?: FetchBaseQueryError | SerializedError | undefined
	label: string
}

const LugatTable: React.FC<LugatTableProps> = ({
	table,
	meta,
	onPaginate,
	currentPage,
	fetching,
	error,
	label,
}) => {
	return (
		<div className='overflow-x-auto  sm:rounded-lg bg-white'>
			<div className='overflow-hidden'>
				<div className={'bg-white w-full px-6 py-4 font-semibold'}>{label}</div>
				<table className='min-w-full divide-y table-fixed divide-gray-100 border-b border-b-gray-100'>
					<thead className={'bg-gray-50'}>
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id} className={'h-9 flex-1'}>
								{headerGroup.headers.map((header) => (
									<th
										className={`py-3 px-6 text-xs font-semibold tracking-wider text-gray-700 uppercase ${
											header.column.columnDef.header === 'Actions' ? 'text-right' : 'text-left'
										}`}
										key={header.id}
										colSpan={header.colSpan}
									>
										{header.isPlaceholder
											? null
											: flexRender(header.column.columnDef.header as any, header.getContext())}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody className={'divide-y bg-white divide-gray-100'}>
						{error && (
							<>
								<tr>
									<td className={'w-full h-96'} colSpan={100}>
										<LugatAlert alertClassNames={'bg-red-200 text-red-900'}>
											Someting went wrong cant get expenses.
										</LugatAlert>
									</td>
								</tr>
							</>
						)}
						{!fetching && table.getRowModel().rows.length === 0 && (
							<tr>
								<td className={'w-full h-96  align-middle'} colSpan={200}>
									<LugatAlert alertClassNames={'!bg-gray-100 !text-gray-900 mx-auto !w-fit space-y-2'}>
										No {label.toLocaleLowerCase()} found.
									</LugatAlert>
								</td>
							</tr>
						)}
						{fetching ? (
							<tr>
								<td className={'w-full h-96'} colSpan={100}>
									<LoaderComponent loaderClassName={'after:bg-gray-100'} />
								</td>
							</tr>
						) : (
							table.getRowModel().rows.map((row) => (
								<tr key={row.id} className={'text-left text-gray-700 text-sm align-middle'}>
									{row.getVisibleCells().map((cell) => (
										<td className={'py-3 px-6 min-h-[52px] h-[52px]'} key={cell.id}>
											{flexRender(cell.column.columnDef.cell as any, cell.getContext())}
										</td>
									))}
								</tr>
							))
						)}
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
