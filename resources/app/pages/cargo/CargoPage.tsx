import LugatBadge from '@/components/LugatBadge'
import LugatButton from '@/components/form/LugatButton'
import LugatInput from '@/components/form/LugatInput'
import LugatModal from '@/components/modal'
import LugatTable from '@/components/table/LugatTable'
import { CurrencyCodeToSign, ListingPageStateParams } from '@/helpers/types'
import { useLazyGetCargosQuery } from '@/services/api/cargo-api'
import { AmountTypes, CargoDataType, CargoTypes, CargoTypesUnion } from '@/types/cargo-types'
import { Menu, Transition } from '@headlessui/react'
import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import moment from 'moment-timezone'
import React, { Fragment, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
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
      cell: ({ getValue }) => {
        const value = getValue() as (typeof CargoTypes)[CargoTypesUnion]
        const data = () => {
          switch (value) {
            case 'Preparing':
              return <LugatBadge variant='success'>{value}</LugatBadge>
            case 'Ready To Ship':
              return <LugatBadge variant='info'>{value}</LugatBadge>
            case 'Shipped':
              return <LugatBadge variant='secondary'>{value}</LugatBadge>
            case 'Delivered':
              return <LugatBadge variant='success'>{value}</LugatBadge>
            case 'Returned':
              return <LugatBadge variant='danger'>{value}</LugatBadge>
          }
        }
        return (
          <Menu as='div' className='relative inline-block text-left '>
            <div>
              <Menu.Button>{data}</Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter='transition ease-out duration-100'
              enterFrom='transform opacity-0 scale-95'
              enterTo='transform opacity-100 scale-100'
              leave='transition ease-in duration-75'
              leaveFrom='transform opacity-100 scale-100'
              leaveTo='transform opacity-0 scale-95'
            >
              <Menu.Items className='absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 z-5050 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                {Object.keys(CargoTypes).map((cargo_type, index: number) => (
                  <div className='px-1 py-1' key={index}>
                    <Menu.Item>
                      <button className={`group flex w-full items-center rounded-md px-2 py-2 text-sm`}>
                        {CargoTypes[cargo_type as CargoTypesUnion]}
                      </button>
                    </Menu.Item>
                  </div>
                ))}
              </Menu.Items>
            </Transition>
          </Menu>
        )
      },
    },
    {
      header: 'Amount',
      accessorKey: 'amount',
    },
    {
      header: 'Amount type',
      accessorFn: (originialRow) => AmountTypes[originialRow.amount_type],
    },
    {
      header: 'Price',
      accessorFn: (originalRow) => originalRow.price + '' + CurrencyCodeToSign(originalRow.price_currency.code),
    },
    {
      header: 'Ready To Ship Date',
      accessorKey: 'ready_to_ship_date',
      cell: ({ getValue }) => ((getValue() as string) ? moment(getValue() as string).format('DD.MM.YYYY HH:mm:ss') : null),
    },
    {
      header: 'Shipped Date',
      accessorKey: 'shipped_date',
      cell: ({ getValue }) => ((getValue() as string) ? moment(getValue() as string).format('DD.MM.YYYY HH:mm:ss') : null),
    },
    {
      header: 'Delivered Date',
      accessorKey: 'delivered_date',
      cell: ({ getValue }) => ((getValue() as string) ? moment(getValue() as string).format('DD.MM.YYYY HH:mm:ss') : null),
    },
    {
      header: 'Returned Date',
      accessorKey: 'returned_date',
      cell: ({ getValue }) => ((getValue() as string) ? moment(getValue() as string).format('DD.MM.YYYY HH:mm:ss') : null),
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
      <Helmet>
        <title>Cargo Listing Page</title>
      </Helmet>
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
