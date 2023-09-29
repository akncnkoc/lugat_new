import { storeDispatch } from '@/store'
import { vaultApi } from '@/services/api/vault-api'
import { VaultDataType, VaultResource } from '@/types/vault-types'

const useLoadVault = () => {
	const loadVaults = async (search: string, _: any, { page }: any) => {
		const response = (await storeDispatch(
			vaultApi.endpoints?.getVaults.initiate({ page, search }),
		).then((res) => res.data)) as VaultResource
		const responseJSON = response.data.map((vault: VaultDataType) => ({
			id: vault.id,
			name: vault.name,
		}))

		return {
			options: responseJSON,
			hasMore: response.meta.last_page > response.meta.current_page,
			additional: {
				page: page + 1,
			},
		}
	}
	return { loadVaults }
}

export default useLoadVault
