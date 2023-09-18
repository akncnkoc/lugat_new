import { useEffect, useState } from 'react'
import { VaultResource } from '@/helpers/types.ts'
import { lugatVaultAll } from '@/services/api/lugat-vault.ts'

export const useVaults = (page: string) => {
	const [loading, setLoading] = useState<boolean>(false)
	const [data, setData] = useState<VaultResource>()

	useEffect(() => {
		const fetchVaults = async () => {
			setLoading(true)
			let response = await lugatVaultAll(page)
			setData(response.data)
			setLoading(false)
		}
		fetchVaults()
	}, [])
	return { loading, data }
}
