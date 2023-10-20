import Card from '@/components/card'
import LugatButton from '@/components/form/LugatButton'
import LugatModal from '@/components/modal'
import LugatTable from '@/components/table/LugatTable'
import { ListingPageStateParams } from '@/helpers/types'
import { useLazyGetCargoCompaniesQuery } from '@/services/api/cargo-company-api'
import { CargoCompanyDataType } from '@/types/cargo-types'
import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import CargoCompanyTableActionColumn from '../components/CargoCompanyTableActionColumn'
import CargoCompanyCreateModal from './CargoCompanyCreateModal'

const CargoCompanyModal: React.FC = () => {
  const [searchParams, _] = useSearchParams()
  const [getCargoCompanies, { isFetching, error, data: cargos }] = useLazyGetCargoCompaniesQuery()
  const [pageParams, setPageParams] = useState<ListingPageStateParams>({
    page: searchParams.get('page') ?? '1',
    search: searchParams.get('search') ?? '',
  })
  const fetch = (page = pageParams.page, search = pageParams.search) => getCargoCompanies({ page, search }, true)
  const defaultColumns: ColumnDef<CargoCompanyDataType>[] = [
    {
      header: 'Name',
      accessorKey: 'name',
    },
    {
      header: 'Actions',
      cell: ({ cell }) => {
        return <CargoCompanyTableActionColumn cell={cell} refetch={fetch} />
      },
    },
  ]

  const table = useReactTable({
    data: cargos?.data ? cargos.data : [],
    columns: defaultColumns,
    getCoreRowModel: getCoreRowModel(),
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
          <h3 className={'text-lg block font-semibold'}>Cargo Companies</h3>
          <LugatModal>
            <LugatModal.Trigger>
              <LugatButton className={'!px-4 !h-8'}>Create</LugatButton>
            </LugatModal.Trigger>
            <LugatModal.Body>{(setShow) => <CargoCompanyCreateModal setShow={setShow} />}</LugatModal.Body>
          </LugatModal>
        </div>
      </Card.Header>
      <Card.Body className={'!p-0'}>
        <LugatTable
          table={table}
          meta={cargos?.meta ?? undefined}
          fetching={isFetching}
          onPaginate={(page: string) => handleOnPaginate(page)}
          currentPage={pageParams.page}
          error={error}
        />
      </Card.Body>
    </Card>
  )
}

export default CargoCompanyModal
