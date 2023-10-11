import React, { useEffect } from 'react'
import LugatButton from '@/components/form/LugatButton'
import { VariantSingleResource, VariantStoreFormType } from '@/types/variant-types'
import Card from '@/components/card'
import LugatInput from '@/components/form/LugatInput'
import LugatAsyncSelect from '@/components/form/LugatAsyncSelect'
import useLoadVariant from '@/hooks/useLoadVariant'
import SeperatedColumn from '@/components/SeperatedColumn'
import { useFormik } from 'formik'
import toast from 'react-hot-toast'
import { useLazyGetVariantQuery, variantApi } from '@/services/api/variant-api'
import { storeDispatch } from '@/store'
import LoaderComponent from '@/components/anims/LoaderComponent'

const ProductVariantCreateModal: React.FC<{ setShow?: Function; id: string }> = (props) => {
	const { loadVariants } = useLoadVariant()

	const [getVariant, { isFetching }] = useLazyGetVariantQuery()

	const productVariantUpdateFormik = useFormik<VariantStoreFormType>({
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
					variantApi.endpoints?.updateVariant.initiate({
						body: {
							name: values.name,
							parent_id: values.parent.value === '-1' ? null : values.parent.value,
						},
						id: props.id,
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

	useEffect(() => {
		;(async () => {
			const data = (await getVariant(props.id).then(
				(res) => res.data,
			)) as unknown as VariantSingleResource
			console.log(data)
			await productVariantUpdateFormik.setValues({
				name: data.data.name,
				parent: {
					label: data.parent ? data.parent.name : 'Select',
					value: data.parent ? data.parent.id : '-1',
				},
			})
		})()
	}, [])
	return (
		<Card className={'w-[400px] !shadow-none'}>
			{isFetching ? (
				<div className={'h-80 w-full flex items-center justify-center'}>
					<LoaderComponent loaderClassName={'after:bg-gray-100'} />
				</div>
			) : (
				<>
					<Card.Header>
						<div className={'flex items-center justify-between flex-1'}>
							<h3 className={'text-lg block font-semibold'}>Update Variant Type</h3>
						</div>
					</Card.Header>
					<Card.Body>
						<SeperatedColumn>
							<LugatInput
								label={'Name'}
								placeholder={'Name'}
								value={productVariantUpdateFormik.values.name}
								onChange={(e) => productVariantUpdateFormik.setFieldValue('name', e.target.value)}
							/>
							<LugatAsyncSelect
								value={productVariantUpdateFormik.values.parent}
								label={'Parent Variant'}
								additional={{
									page: 1,
								}}
								placeholder={'Variants'}
								defaultOptions
								loadOptions={loadVariants}
								onChange={(value: any) => {
									productVariantUpdateFormik.setFieldValue('parent', value)
								}}
							/>
						</SeperatedColumn>
					</Card.Body>
					<Card.Footer>
						<LugatButton onClick={productVariantUpdateFormik.submitForm}>Save</LugatButton>
					</Card.Footer>
				</>
			)}
		</Card>
	)
}

export default ProductVariantCreateModal
