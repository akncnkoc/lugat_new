import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import LugatButton from '@/components/form/LugatButton'
import { CurrencyCodeToSign, VaultDataType } from '@/helpers/types'
import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import LugatTable from '@/components/table/LugatTable'
import { useGetVaultsQuery } from '@/services/api/vault-api'
import VaultTableActionColumn from '@/pages/vault/components/VaultTableActionColumn'
import LugatInput from '@/components/form/LugatInput'
import debounce from 'lodash.debounce'

const VaultPage: React.FC = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	const [searchText, setSearchText] = useState('')
	const navigate = useNavigate()
	const [currentPage, setCurrentPage] = useState(searchParams.get('page') ?? '1')
	const {
		data: vaults,
		error,
		isFetching,
		refetch,
	} = useGetVaultsQuery({ page: currentPage, search: searchText })
	const defaultColumns: ColumnDef<VaultDataType>[] = [
		{
			header: 'Name',
			accessorFn: (originalRow) => originalRow.name,
		},
		{
			header: 'Currency',
			accessorFn: (originalRow) =>
				originalRow.currency.name + ' ( ' + CurrencyCodeToSign(originalRow.currency.code) + ' )',
		},
		{
			header: 'Actions',
			cell: ({ cell }) => {
				return <VaultTableActionColumn cell={cell} refetch={refetch} />
			},
		},
	]

	const table = useReactTable({
		data: vaults?.data ? vaults.data : [],
		columns: defaultColumns,
		getCoreRowModel: getCoreRowModel(),
	})

	useEffect(() => {
		refetch()
		setSearchParams({
			page: currentPage,
			search: searchText,
		})
	}, [currentPage, searchText])
	const handleInputChange = (text: string) => {
		setSearchText(text)
	}

	const debouncedChangeHandler = useCallback(debounce(handleInputChange, 500), [])
	return (
		<>
			<div className={'flex space-x-4 justify-between px-4 items-center'}>
				<div>
					<div className='w-fit'>
						<LugatInput
							inputClassnames={'!w-64'}
							placeholder={'Search'}
							onChange={(e) => debouncedChangeHandler(e.target.value)}
						/>
					</div>
				</div>
				<div>
					<div className='w-fit'>
						<LugatButton onClick={() => navigate('/vault/create')}>Create Vault</LugatButton>
					</div>
				</div>
			</div>
			<div className='p-4 rounded-lg'>
				<section className='grid grid-cols-1 gap-2 gap-y-2'>
					<LugatTable
						label={'Vault'}
						table={table}
						meta={vaults?.meta ?? undefined}
						fetching={isFetching}
						onPaginate={(page: string) => setCurrentPage(page)}
						currentPage={currentPage}
						error={error}
					/>
				</section>
			</div>
		</>
	)
}
export default VaultPage
