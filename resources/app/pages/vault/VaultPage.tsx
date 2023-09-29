import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import LugatButton from '@/components/form/LugatButton'
import { CurrencyCodeToSign } from '@/helpers/types'
import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import LugatTable from '@/components/table/LugatTable'
import { useGetVaultsMutation } from '@/services/api/vault-api'
import VaultTableActionColumn from '@/pages/vault/components/VaultTableActionColumn'
import LugatInput from '@/components/form/LugatInput'
import { VaultDataType } from '@/types/vault-types'

const VaultPage: React.FC = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	const [pageParams, setPageParams] = useState<{
		page: string
		search: string
	}>({
		page: searchParams.get('page') ?? '1',
		search: searchParams.get('search') ?? '',
	})
	const navigate = useNavigate()
	const [getVaults, { isLoading, error, data: vaults }] = useGetVaultsMutation()
	const fetch = () => getVaults({ page: pageParams.page, search: pageParams.search })
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
				return <VaultTableActionColumn cell={cell} refetch={fetch} />
			},
		},
	]

	const table = useReactTable({
		data: vaults?.data ? vaults.data : [],
		columns: defaultColumns,
		getCoreRowModel: getCoreRowModel(),
	})

	useEffect(() => {
		fetch()
	}, [pageParams.page])

	useEffect(() => {
		fetch()
	}, [])

	const handleInputChange = (text: string) => {
		setPageParams((prev) => ({ ...prev, search: text }))
	}
	const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.code === 'Enter') {
			setSearchParams({
				page: pageParams.page,
				search: pageParams.search,
			})
			fetch()
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
						fetching={isLoading}
						onPaginate={(page: string) => setPageParams((prev) => ({ ...prev, page }))}
						currentPage={pageParams.page}
						error={error}
					/>
				</section>
			</div>
		</>
	)
}
export default VaultPage
