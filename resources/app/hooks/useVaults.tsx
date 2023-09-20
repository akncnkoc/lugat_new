import LugatSelect from '@/components/form/LugatSelect'
import { useMemo } from 'react'
import { useGetVaultsQuery } from '@/services/api/vault-api'

const useVaults = () => {
	const { data, error, isLoading, refetch } = useGetVaultsQuery()

	const VaultSelect = useMemo(() => {
		if (!isLoading) {
			return (
				<LugatSelect disabled>
					<option value=''>Loading...</option>
				</LugatSelect>
			)
		}
		if (error){
			return (
				<LugatSelect disabled>
					<option value=''>Someting went wrong and cannot load vaults...</option>
				</LugatSelect>
			)
		}
		return <LugatSelect></LugatSelect>
	}, [data])
	return { VaultSelect }
}

export default useVaults
