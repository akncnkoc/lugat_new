import LoaderComponent from '@/components/anims/LoaderComponent'
import LugatAlert from '@/components/LugatAlert'
import Pagination from '@/components/Pagination'
import { CollectionMetaType } from '@/helpers/types'
import { CargoCompanyDataType, CargoDataType } from '@/types/cargo-types'
import { CustomerDataType } from '@/types/customer-types'
import { ExpenseDataType } from '@/types/expense-types'
import { ProductDataType } from '@/types/product-types'
import { StaffDataType } from '@/types/staff-types'
import { VariantDataType } from '@/types/variant-types'
import { VaultDataType } from '@/types/vault-types'
import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/react'
import { flexRender, Table } from '@tanstack/react-table'
import { clsx } from 'clsx'
import React from 'react'

type LugatTableProps = {
  table:
    | Table<ExpenseDataType>
    | Table<VaultDataType>
    | Table<CustomerDataType>
    | Table<StaffDataType>
    | Table<ProductDataType>
    | Table<VariantDataType>
    | Table<CargoDataType>
    | Table<CargoCompanyDataType>
  meta?: CollectionMetaType
  onPaginate: Function
  currentPage: number | string
  fetching: boolean
  error?: FetchBaseQueryError | SerializedError | undefined
  label?: string
}

const LugatTable: React.FC<LugatTableProps> = ({ table, meta, onPaginate, currentPage, fetching, error, label }) => {
  return (
    <div className={clsx('overflow-x-auto', 'sm:rounded-lg', 'bg-white', 'w-full')}>
      <div className='overflow-hidden'>
        {label && <div className={clsx('bg-white', 'w-full', 'px-6', 'py-4', 'font-semibold')}>{label}</div>}
        <table className={clsx('min-w-full', 'divide-y', 'table-fixed', 'divide-gray-100', 'border-b', 'border-b-gray-100')}>
          <thead className={'bg-gray-50'}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className={'h-9 flex-1'}>
                {headerGroup.headers.map((header) => (
                  <th
                    className={clsx(
                      'py-3',
                      'px-6',
                      'text-xs',
                      'font-semibold',
                      'tracking-wider',
                      'text-gray-700',
                      'uppercase',
                      header.column.columnDef.header === 'Actions' ? 'text-right' : 'text-left',
                    )}
                    key={header.id}
                    colSpan={header.colSpan}
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort() ? 'cursor-pointer select-none' : '',
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(header.column.columnDef.header as any, header.getContext())}
                        {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className={clsx('divide-y', 'bg-white', 'divide-gray-100')}>
            {!fetching && error && (
              <tr>
                <td className={'w-full h-96'} colSpan={200}>
                  <LugatAlert alertClassNames={clsx('bg-red-200', 'text-red-900', '!w-fit', 'mx-auto')}>
                    Someting went wrong cant get {label && label.toLocaleLowerCase()}.
                  </LugatAlert>
                </td>
              </tr>
            )}
            {!fetching && !error && table.getRowModel().rows.length === 0 && (
              <tr>
                <td className={clsx('w-full', 'h-96', 'align-middle')} colSpan={200}>
                  <LugatAlert alertClassNames={clsx('!bg-gray-100', '!text-gray-900', 'mx-auto', '!w-fit space-y-2')}>
                    No {label && label.toLocaleLowerCase()} found.
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
                <tr key={row.id} className={clsx('text-left', 'text-gray-700', 'text-sm', 'align-middle')}>
                  {row.getVisibleCells().map((cell) => (
                    <td className={clsx('py-3', 'px-6', 'min-h-[52px]', 'h-[52px]')} key={cell.id}>
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
        {table && meta && <Pagination meta={meta} paginate={onPaginate} currentPage={Number(currentPage)} />}
      </div>
    </div>
  )
}

export default LugatTable
