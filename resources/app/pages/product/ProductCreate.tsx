import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getIn, useFormik } from 'formik'
import LugatButton from '@/components/form/LugatButton'
import toast, { LoaderIcon } from 'react-hot-toast'
import LugatAsyncSelect from '@/components/form/LugatAsyncSelect'
import LugatInput from '@/components/form/LugatInput'
import useLoadVault from '@/hooks/useLoadVault'
import { ProductCreateValidationSchema } from '@/helpers/schemas'
import { useStoreProductMutation } from '@/services/api/product-api'
import { ProductStoreFormType, ProductStoreInitialValues } from '@/types/product-types'
import LugatCurrencyInput from '@/components/form/LugatCurrencyInput'
import Card from '@/components/card'
import SeperatedRow from '@/components/form/SeperatedRow'
import SeperatedColumn from '@/components/SeperatedColumn'

const ProductCreate: React.FC = () => {
	const navigate = useNavigate()
	const [storeProduct, { isLoading }] = useStoreProductMutation()
	const { loadVaults } = useLoadVault()

	const productCreateFormik = useFormik<ProductStoreFormType>({
		initialValues: ProductStoreInitialValues,
		validateOnBlur: false,
		validationSchema: ProductCreateValidationSchema,
		onSubmit: (values) => {
			storeProduct({
				...values,
				buy_price_vault_id: values.buy_price_vault.value,
				sell_price_vault_id: values.sell_price_vault.value,
			})
				.unwrap()
				.then(() => {
					toast.success('Product stored')
					productCreateFormik.resetForm()
					navigate(-1)
				})
				.catch(() => {
					toast.error('Product cant stored')
				})
		},
	})
	return (
		<>
			<Card>
				<Card.Header>
					<h3 className={'text-lg font-semibold'}>
						Create New Product{' '}
						<span className={'text-xs'}>
							(<span className={'text-red-700'}> *</span>
							required fields to be filled )
						</span>
					</h3>
				</Card.Header>
				<Card.Body>
					<SeperatedColumn>
						<SeperatedRow>
							<LugatInput
								required
								label={'Name'}
								value={productCreateFormik.values.name}
								onChange={(e) => productCreateFormik.setFieldValue('name', e.target.value)}
								error={productCreateFormik.touched.name && productCreateFormik.errors.name}
							/>
							<LugatInput
								required
								label={'Model Code'}
								value={productCreateFormik.values.model_code}
								onChange={(e) => productCreateFormik.setFieldValue('model_code', e.target.value)}
								error={
									productCreateFormik.touched.model_code && productCreateFormik.errors.model_code
								}
							/>
						</SeperatedRow>
						<SeperatedRow>
							<LugatCurrencyInput
								label={'Buy Price'}
								required
								error={
									productCreateFormik.touched.buy_price && productCreateFormik.errors.buy_price
								}
								value={productCreateFormik.values.buy_price}
								onValueChange={(_, __, values) => {
									productCreateFormik.setFieldTouched('buy_price', true)
									productCreateFormik.setFieldValue('buy_price', values?.value ?? 0)
								}}
							/>
							<LugatAsyncSelect
								error={
									getIn(productCreateFormik.touched, 'buy_price_vault.value') &&
									getIn(productCreateFormik.errors, 'buy_price_vault.value')
								}
								value={productCreateFormik.values.buy_price_vault}
								label={'Buy Price Vault'}
								additional={{
									page: 1,
								}}
								placeholder={'Select'}
								loadOptions={loadVaults}
								onChange={(value: any) => {
									productCreateFormik.setFieldValue('buy_price_vault', value)
								}}
							/>
						</SeperatedRow>
						<SeperatedRow>
							<LugatCurrencyInput
								label={'Sell Price'}
								required
								error={
									productCreateFormik.touched.sell_price && productCreateFormik.errors.sell_price
								}
								value={productCreateFormik.values.sell_price}
								onValueChange={(_, __, values) => {
									productCreateFormik.setFieldTouched('sell_price', true)
									productCreateFormik.setFieldValue('sell_price', values?.value ?? 0)
								}}
							/>
							<LugatAsyncSelect
								required
								error={
									getIn(productCreateFormik.touched, 'sell_price_vault.value') &&
									getIn(productCreateFormik.errors, 'sell_price_vault.value')
								}
								value={productCreateFormik.values.sell_price_vault}
								label={'Sell Price Vault '}
								additional={{
									page: 1,
								}}
								placeholder={'Select'}
								loadOptions={loadVaults}
								onChange={(value: any) => {
									productCreateFormik.setFieldValue('sell_price_vault', value)
								}}
							/>
						</SeperatedRow>
					</SeperatedColumn>
				</Card.Body>
				<Card.Footer>
					<LugatButton onClick={productCreateFormik.submitForm}>
						{!isLoading ? 'Save' : <LoaderIcon />}
					</LugatButton>
				</Card.Footer>
			</Card>
		</>
	)
}

export default ProductCreate
