import LugatButton from '@/components/form/LugatButton'
import LugatInput from '@/components/form/LugatInput'
import LugatModal from '@/components/modal'
import LugatTable from '@/components/table/LugatTable'
import { CurrencyCodeToSign, ListingPageStateParams } from '@/helpers/types'
import { useLazyGetCargosQuery } from '@/services/api/cargo-api'
import { CargoDataType, CargoTypes } from '@/types/cargo-types'
import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import CargoTableActionColumn from './components/CargoTableActionColumn'
import CargoCompanyModal from './modal/CargoCompanyModal'

const CargoPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const [pageParams, setPageParams] = useState<ListingPageStateParams>({
    page: searchParams.get('page') ?? '1',
    search: searchParams.get('search') ?? '',
  })
  const [getCargos, { isFetching, error, data: staffs }] = useLazyGetCargosQuery()
  const fetch = (page = pageParams.page, search = pageParams.search) => getCargos({ page, search })

  const defaultColumns: ColumnDef<CargoDataType>[] = [
    {
      header: 'Cargo Company',
      accessorFn: (originalRow) => originalRow.cargo_company.name,
    },
    {
      header: 'Tracking No',
      accessorKey: 'tracking_no',
    },
    {
      header: 'Type',
      accessorFn: (originialRow) => CargoTypes[originialRow.type],
    },
    {
      header: 'Amount Type',
      accessorKey: 'amount_type',
    },
    {
      header: 'Price',
      accessorFn: (originalRow) => originalRow.price + '' + CurrencyCodeToSign(originalRow.price_currency.code),
    },
    {
      header: 'Date Of Paid',
      accessorKey: 'date_of_paid',
    },
    {
      header: 'Actions',
      cell: ({ cell }) => {
        return <CargoTableActionColumn cell={cell} refetch={fetch} />
      },
    },
  ]

  const table = useReactTable({
    data: staffs?.data ? staffs.data : [],
    columns: defaultColumns,
    getCoreRowModel: getCoreRowModel(),
  })

  useEffect(() => {
    fetch()
  }, [])

  const handleOnPaginate = (page: string) => {
    setPageParams((prev) => ({ ...prev, page }))
    fetch(page, pageParams.search)
  }

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
        <div className='w-fit flex space-x-2'>
          <LugatModal>
            <LugatModal.Trigger>
              <LugatButton buttonClassNames={'bg-green-500 hover:bg-green-600'}>Cargo Companies</LugatButton>
            </LugatModal.Trigger>
            <LugatModal.Body>
              <CargoCompanyModal />
            </LugatModal.Body>
          </LugatModal>
          <LugatButton onClick={() => navigate('/cargo/create')}>Create Cargo</LugatButton>
        </div>
      </div>
      <div className='p-4 rounded-lg'>
        <section className='grid grid-cols-1 gap-2 gap-y-2'>
          <LugatTable
            label={'Cargo'}
            table={table}
            meta={staffs?.meta ?? undefined}
            fetching={isFetching}
            onPaginate={(page: string) => handleOnPaginate(page)}
            currentPage={pageParams.page}
            error={error}
          />
        </section>
      </div>
    </>
  )
}
export default CargoPage
