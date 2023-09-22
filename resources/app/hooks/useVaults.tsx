import LugatSelect from '@/components/form/LugatSelect'
import { useState } from 'react'
import { useGetVaultsQuery } from '@/services/api/vault-api'

type UseVaultsType = {
	onChangeCallback: (value: string) => void
	value: string
	error?: string
}

const useVaults = (options: UseVaultsType) => {
	const { data: vaults, error, isLoading } = useGetVaultsQuery('1')
	const [selectedVault, setSelectedVault] = useState(options.value)

	if (isLoading) {
		return (
			<LugatSelect disabled>
				<option value=''>Loading...</option>
			</LugatSelect>
		)
	}
	if (error) {
		return (
			<LugatSelect disabled>
				<option value=''>Someting went wrong and cannot load vaults...</option>
			</LugatSelect>
		)
	}
	return (
		<LugatSelect
			label={'Vault'}
			value={selectedVault}
			onChange={(e) => {
				options.onChangeCallback(e.target.value)
				setSelectedVault(e.target.value)
			}}
			error={options.error}
		>
			<option value='-1'>Select</option>
			{vaults?.data &&
				vaults.data.map((vault) => (
					<option key={vault.id} value={`${vault.id}`}>
						{vault.name}
					</option>
				))}
		</LugatSelect>
	)
}

export default useVaults
