import { storeDispatch } from '@/store'
import { supplierApi } from '@/services/api/supplier-api'
import { SupplierDataType } from '@/types/supplier-types'

const useSupplier = () => {
	const loadSuppliers = async (search: string, _: any, { page }: any) => {
		const response = await storeDispatch(
			supplierApi.endpoints?.getSuppliers.initiate({ page, search }),
		)
			.unwrap()
			.then((res) => {
				return res
			})

		const responseJSON = response.data.map((supplier: SupplierDataType) => ({
			label: supplier.name,
			value: supplier.id,
		}))

		return {
			options: responseJSON,
			hasMore: response.meta.last_page > response.meta.current_page,
			additional: {
				page: page + 1,
			},
		}
	}
	return { loadSuppliers }
}

export default useSupplier
