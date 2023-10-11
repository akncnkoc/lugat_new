import React from 'react'
import LugatButton from '@/components/form/LugatButton'
import { VariantStoreFormType } from '@/types/variant-types'
import Card from '@/components/card'
import LugatInput from '@/components/form/LugatInput'
import LugatAsyncSelect from '@/components/form/LugatAsyncSelect'
import useLoadVariant from '@/hooks/useLoadVariant'
import SeperatedColumn from '@/components/SeperatedColumn'
import { useFormik } from 'formik'
import toast from 'react-hot-toast'
import { variantApi } from '@/services/api/variant-api'
import { storeDispatch } from '@/store'

const ProductVariantCreateModal: React.FC<{ setShow?: Function }> = (props) => {
	const { loadVariants } = useLoadVariant()

	const productVariantCreateFormik = useFormik<VariantStoreFormType>({
		initialValues: {
			name: '',
			parent: {
				label: 'Select',
				value: '-1',
			},
		},
		onSubmit: (values) => {
			toast.promise(
				storeDispatch(
					variantApi.endpoints?.storeVariant.initiate({
						name: values.name,
						parent_id: values.parent.value === '-1' ? null : values.parent.value,
					}),
				),
				{
					loading: 'Loading',
					success: () => {
						props.setShow && props.setShow(false)
						return 'Saved'
					},
					error: 'Error saving variant',
				},
			)
		},
	})

	return (
		<Card className={'w-[400px] !shadow-none'}>
			<Card.Header>
				<div className={'flex items-center justify-between flex-1'}>
					<h3 className={'text-lg block font-semibold'}>Create Variant Type</h3>
				</div>
			</Card.Header>
			<Card.Body>
				<SeperatedColumn>
					<LugatInput
						label={'Name'}
						placeholder={'Name'}
						value={productVariantCreateFormik.values.name}
						onChange={(e) => productVariantCreateFormik.setFieldValue('name', e.target.value)}
					/>
					<LugatAsyncSelect
						value={productVariantCreateFormik.values.parent}
						label={'Parent Variant'}
						additional={{
							page: 1,
						}}
						placeholder={'Variants'}
						defaultOptions
						loadOptions={loadVariants}
						onChange={(value: any) => {
							productVariantCreateFormik.setFieldValue('parent', value)
						}}
					/>
				</SeperatedColumn>
			</Card.Body>
			<Card.Footer>
				<LugatButton onClick={productVariantCreateFormik.submitForm}>Save</LugatButton>
			</Card.Footer>
		</Card>
	)
}

export default ProductVariantCreateModal
