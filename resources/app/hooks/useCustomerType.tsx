import { storeDispatch } from '@/store'
import { customerType } from '@/services/api/customer-type-api'
import { CustomerTypeDataType, CustomerTypeResource } from '@/types/customer-types'

const useCustomerType = () => {
	const loadCustomerTypes = async (search: string, _: any, { page }: any) => {
		const response = (await storeDispatch(
			customerType.endpoints?.getCustomerTypes.initiate({ page, search }),
		).then((res) => res.data)) as CustomerTypeResource
		const responseJSON = response.data.map((customerType: CustomerTypeDataType) => ({
			id: customerType.id,
			name: customerType.name,
		}))

		return {
			options: responseJSON,
			hasMore: response.meta.last_page > response.meta.current_page,
			additional: {
				page: page + 1,
			},
		}
	}
	return { loadCustomerTypes }
}

export default useCustomerType
