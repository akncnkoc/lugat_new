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
import LugatCurrencyInput from '@/components/LugatCurrencyInput'
import Card from '@/components/card'

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
				buy_price_vault_id: values.buy_price_vault.id,
				sell_price_vault_id: values.sell_price_vault.id,
			})
				.unwrap()
				.then((_) => {
					toast.success('Product stored')
					productCreateFormik.resetForm()
					navigate(-1)
				})
				.catch((_) => {
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
					<div className='flex flex-col flex-1 space-y-2'>
						<div className={'flex-1 flex flex-col space-y-4'}>
							<div
								className={
									'flex-1 flex flex-col space-y-2 laptop:flex-row laptop:space-x-2 laptop:space-y-0'
								}
							>
								<div className={'flex-1'}>
									<LugatInput
										required
										label={'Name'}
										value={productCreateFormik.values.name}
										onChange={(e) => productCreateFormik.setFieldValue('name', e.target.value)}
										error={productCreateFormik.touched.name && productCreateFormik.errors.name}
									/>
								</div>
								<div className={'flex-1'}>
									<LugatInput
										required
										label={'Model Code'}
										value={productCreateFormik.values.model_code}
										onChange={(e) =>
											productCreateFormik.setFieldValue('model_code', e.target.value)
										}
										error={
											productCreateFormik.touched.model_code &&
											productCreateFormik.errors.model_code
										}
									/>
								</div>
							</div>
							<div
								className={
									'flex-1 flex flex-col space-y-2 laptop:flex-row laptop:space-x-2 laptop:space-y-0'
								}
							>
								<div className={'flex-1'}>
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
								</div>
								<div className={'flex-1'}>
									<LugatAsyncSelect
										error={
											getIn(productCreateFormik.touched, 'buy_price_vault.id') &&
											getIn(productCreateFormik.errors, 'buy_price_vault.id')
										}
										value={productCreateFormik.values.buy_price_vault}
										getOptionLabel={(e: any) => e.name}
										getOptionValue={(e: any) => e.id}
										label={'Buy Price Vault'}
										additional={{
											page: 1,
										}}
										placeholder={'Select'}
										defaultOptions
										loadOptions={loadVaults}
										onChange={(value: any) => {
											productCreateFormik.setFieldValue('buy_price_vault', value)
										}}
									/>
								</div>
							</div>
							<div
								className={
									'flex-1 flex flex-col space-y-2 laptop:flex-row laptop:space-x-2 laptop:space-y-0'
								}
							>
								<div className={'flex-1'}>
									<LugatCurrencyInput
										label={'Sell Price'}
										required
										error={
											productCreateFormik.touched.sell_price &&
											productCreateFormik.errors.sell_price
										}
										value={productCreateFormik.values.sell_price}
										onValueChange={(_, __, values) => {
											productCreateFormik.setFieldTouched('sell_price', true)
											productCreateFormik.setFieldValue('sell_price', values?.value ?? 0)
										}}
									/>
								</div>
								<div className={'flex-1'}>
									<LugatAsyncSelect
										required
										error={
											getIn(productCreateFormik.touched, 'sell_price_vault.id') &&
											getIn(productCreateFormik.errors, 'sell_price_vault.id')
										}
										value={productCreateFormik.values.sell_price_vault}
										getOptionLabel={(e: any) => e.name}
										getOptionValue={(e: any) => e.id}
										label={'Sell Price Vault '}
										additional={{
											page: 1,
										}}
										placeholder={'Select'}
										defaultOptions
										loadOptions={loadVaults}
										onChange={(value: any) => {
											productCreateFormik.setFieldValue('sell_price_vault', value)
										}}
									/>
								</div>
							</div>
						</div>
					</div>
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
