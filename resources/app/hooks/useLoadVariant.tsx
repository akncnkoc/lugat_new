import { storeDispatch } from '@/store'
import { variantApi } from '@/services/api/variant-api'
import { VariantDataType } from '@/types/variant-types'

const useLoadVariant = () => {
	const loadVariants = async (search: string, _: any, { page }: any) => {
		const response = await storeDispatch(
			variantApi.endpoints?.getVariants.initiate({ page, search }),
		)
			.unwrap()
			.then((res) => {
				return res
			})

		const responseJSON = response.data.map((variant: VariantDataType) => ({
			label: variant.name,
			value: variant.id,
		}))

		return {
			options: responseJSON,
			hasMore: response.meta.last_page > response.meta.current_page,
			additional: {
				page: page + 1,
			},
		}
	}

	const loadVariant = async (_: string, __: any, { page, id }: any) => {
		const response = await storeDispatch(variantApi.endpoints?.getVariant.initiate(id))
			.unwrap()
			.then((res) => {
				return res
			})

		const responseJSON = response.sub_variants.data.map((variant: VariantDataType) => ({
			label: variant.name,
			value: variant.id,
			parent_id: response.data.id,
			name: response.data.name,
		}))

		return {
			options: responseJSON,
			hasMore: response.sub_variants.last_page > response.sub_variants.current_page,
			additional: {
				page: page + 1,
			},
		}
	}
	const createVariant = async (name: string, parent_id: string | null) => {
		await storeDispatch(variantApi.endpoints?.storeVariant.initiate({ name, parent_id }))
			.unwrap()
			.then((res) => {
				return res
			})
	}

	return { loadVariants, loadVariant, createVariant }
}

export default useLoadVariant
