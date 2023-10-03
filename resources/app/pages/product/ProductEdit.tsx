import React, { useEffect } from 'react'
import { Await, defer, useLoaderData, useNavigate, useParams } from 'react-router-dom'
import { getIn, useFormik } from 'formik'
import toast, { LoaderIcon } from 'react-hot-toast'
import { storeDispatch } from '@/store'
import LoaderComponent from '@/components/anims/LoaderComponent'
import { TrackedPromise } from '@remix-run/router/utils'
import useLoadVault from '@/hooks/useLoadVault'
import { ProductCreateValidationSchema } from '@/helpers/schemas'
import { productApi, useUpdateProductMutation } from '@/services/api/product-api'
import {
	ProductDataType,
	ProductStoreFormType,
	ProductStoreInitialValues,
} from '@/types/product-types'
import Card from '@/components/card'
import SeperatedRow from '@/components/form/SeperatedRow'
import LugatInput from '@/components/form/LugatInput'
import LugatCurrencyInput from '@/components/form/LugatCurrencyInput'
import LugatAsyncSelect from '@/components/form/LugatAsyncSelect'
import SeperatedColumn from '@/components/SeperatedColumn'
import LugatButton from '@/components/form/LugatButton'

export const productLoader = async ({ params }: any) => {
	const results = storeDispatch(productApi.endpoints?.getProduct.initiate(params.id ?? '')).then(
		(res) => res.data?.data,
	)
	return defer({
		results: results,
	})
}

const ProductEdit: React.FC = () => {
	const navigate = useNavigate()
	const { id } = useParams<'id'>()
	const data = useLoaderData() as {
		results: TrackedPromise
	}
	const [updateProduct, { isLoading }] = useUpdateProductMutation()
	const { loadVaults } = useLoadVault()
	const productUpdateFormik = useFormik<ProductStoreFormType>({
		initialValues: ProductStoreInitialValues,
		validateOnBlur: false,
		validationSchema: ProductCreateValidationSchema,
		onSubmit: (values) => {
			updateProduct({
				body: {
					...values,
					buy_price_vault_id: values.buy_price_vault.value,
					sell_price_vault_id: values.sell_price_vault.value,
				},
				id: id ?? '',
			})
				.unwrap()
				.then((_) => {
					toast.success('Product updated')
					productUpdateFormik.resetForm()
					navigate('/product/list')
				})
				.catch((_) => {
					toast.error('Product cant stored')
				})
		},
	})
	useEffect(() => {
		if (data) {
			data.results.then((product: ProductDataType) => {
				productUpdateFormik.setValues({
					name: product.name,
					model_code: product.model_code,
					buy_price: product.buy_price,
					sell_price: product.sell_price,
					critical_stock_alert: product.critical_stock_alert,
					buy_price_vault: {
						value: product.buy_price_vault.id,
						label: product.buy_price_vault.name,
					},
					sell_price_vault: {
						value: product.sell_price_vault.id,
						label: product.sell_price_vault.name,
					},
				})
			})
		}
	}, [data])

	return (
		<Card>
			<React.Suspense
				fallback={
					<div className={'h-96 w-full flex items-center justify-center'}>
						<LoaderComponent loaderClassName={'after:bg-gray-100'} />
					</div>
				}
			>
				<Await resolve={data.results}>
					{() => {
						return (
							<>
								<Card.Header>
									<h3 className={'text-lg font-semibold'}>
										Update Product{' '}
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
												value={productUpdateFormik.values.name}
												onChange={(e) => productUpdateFormik.setFieldValue('name', e.target.value)}
												error={productUpdateFormik.touched.name && productUpdateFormik.errors.name}
											/>
											<LugatInput
												required
												label={'Model Code'}
												value={productUpdateFormik.values.model_code}
												onChange={(e) =>
													productUpdateFormik.setFieldValue('model_code', e.target.value)
												}
												error={
													productUpdateFormik.touched.model_code &&
													productUpdateFormik.errors.model_code
												}
											/>
										</SeperatedRow>
										<SeperatedRow>
											<LugatCurrencyInput
												label={'Buy Price'}
												required
												error={
													productUpdateFormik.touched.buy_price &&
													productUpdateFormik.errors.buy_price
												}
												value={productUpdateFormik.values.buy_price}
												onValueChange={(_, __, values) => {
													productUpdateFormik.setFieldTouched('buy_price', true)
													productUpdateFormik.setFieldValue('buy_price', values?.value ?? 0)
												}}
											/>
											<LugatAsyncSelect
												error={
													getIn(productUpdateFormik.touched, 'buy_price_vault.value') &&
													getIn(productUpdateFormik.errors, 'buy_price_vault.value')
												}
												value={productUpdateFormik.values.buy_price_vault}
												label={'Buy Price Vault'}
												additional={{
													page: 1,
												}}
												placeholder={'Select'}
												loadOptions={loadVaults}
												onChange={(value: any) => {
													productUpdateFormik.setFieldValue('buy_price_vault', value)
												}}
											/>
										</SeperatedRow>
										<SeperatedRow>
											<LugatCurrencyInput
												label={'Sell Price'}
												required
												error={
													productUpdateFormik.touched.sell_price &&
													productUpdateFormik.errors.sell_price
												}
												value={productUpdateFormik.values.sell_price}
												onValueChange={(_, __, values) => {
													productUpdateFormik.setFieldTouched('sell_price', true)
													productUpdateFormik.setFieldValue('sell_price', values?.value ?? 0)
												}}
											/>
											<LugatAsyncSelect
												required
												error={
													getIn(productUpdateFormik.touched, 'sell_price_vault.value') &&
													getIn(productUpdateFormik.errors, 'sell_price_vault.value')
												}
												value={productUpdateFormik.values.sell_price_vault}
												label={'Sell Price Vault '}
												additional={{
													page: 1,
												}}
												placeholder={'Select'}
												loadOptions={loadVaults}
												onChange={(value: any) => {
													productUpdateFormik.setFieldValue('sell_price_vault', value)
												}}
											/>
										</SeperatedRow>
									</SeperatedColumn>
								</Card.Body>
								<Card.Footer>
									<LugatButton onClick={productUpdateFormik.submitForm}>
										{!isLoading ? 'Save' : <LoaderIcon />}
									</LugatButton>
								</Card.Footer>
							</>
						)
					}}
				</Await>
			</React.Suspense>
		</Card>
	)
}

export default ProductEdit
