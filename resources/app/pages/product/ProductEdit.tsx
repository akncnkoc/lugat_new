import React, { useEffect } from 'react'
import { Await, defer, useLoaderData, useNavigate, useParams } from 'react-router-dom'
import { getIn, useFormik } from 'formik'
import LugatButton from '@/components/form/LugatButton'
import toast, { LoaderIcon } from 'react-hot-toast'
import LugatAsyncSelect from '@/components/form/LugatAsyncSelect'
import { storeDispatch } from '@/store'
import LoaderComponent from '@/components/LoaderComponent'
import { TrackedPromise } from '@remix-run/router/utils'
import LugatInput from '@/components/form/LugatInput'
import useStaffType from '@/hooks/useStaffType'
import useLoadVault from '@/hooks/useLoadVault'
import { ProductCreateValidationSchema } from '@/helpers/schemas'
import { productApi, useUpdateProductMutation } from '@/services/api/product-api'
import {
	ProductDataType,
	ProductStoreFormType,
	ProductStoreInitialValues,
} from '@/types/product-types'
import LugatCurrencyInput from '@/components/LugatCurrencyInput'

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
	const { loadStaffTypes } = useStaffType()
	const { loadVaults } = useLoadVault()
	const updateProductFormik = useFormik<ProductStoreFormType>({
		initialValues: ProductStoreInitialValues,
		validateOnBlur: false,
		validationSchema: ProductCreateValidationSchema,
		onSubmit: (values) => {
			updateProduct({
				body: {
					...values,
					buy_price_vault_id: values.buy_price_vault.id,
					sell_price_vault_id: values.sell_price_vault.id,
				},
				id: id ?? '',
			})
				.unwrap()
				.then((_) => {
					toast.success('Product updated')
					updateProductFormik.resetForm()
					navigate(-1)
				})
				.catch((_) => {
					toast.error('Product cant stored')
				})
		},
	})
	useEffect(() => {
		if (data) {
			data.results.then((product: ProductDataType) => {
				updateProductFormik.setValues({
					name: product.name,
					model_code: product.model_code,
					buy_price: product.buy_price,
					sell_price: product.sell_price,
					critical_stock_alert: product.critical_stock_alert,
					buy_price_vault: {
						id: product.buy_price_vault.id,
						name: product.buy_price_vault.name,
					},
					sell_price_vault: {
						id: product.sell_price_vault.id,
						name: product.sell_price_vault.name,
					},
				})
			})
		}
	}, [data])

	return (
		<div className='relative transform rounded-lg bg-white text-left shadow-2xl shadow-gray-100 transition-all overflow-hidden tablet:max-w-7xl tablet:mx-auto'>
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
								<div
									className={'h-16 px-6 border-b border-gray-100 flex items-center justify-between'}
								>
									<h3 className={'text-lg font-semibold'}>
										Update Product{' '}
										<span className={'text-xs'}>
											(<span className={'text-red-700'}> *</span>
											required fields to be filled )
										</span>
									</h3>
								</div>
								<div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
									<div className='sm:flex sm:items-start'>
										<div className='mt-3 text-center sm:mt-0 sm:text-left w-full'>
											<div className='flex flex-1 grow'>
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
																	value={updateProductFormik.values.name}
																	onChange={(e) =>
																		updateProductFormik.setFieldValue('name', e.target.value)
																	}
																	error={
																		updateProductFormik.touched.name &&
																		updateProductFormik.errors.name
																	}
																/>
															</div>
															<div className={'flex-1'}>
																<LugatInput
																	required
																	label={'Model Code'}
																	value={updateProductFormik.values.model_code}
																	onChange={(e) =>
																		updateProductFormik.setFieldValue('model_code', e.target.value)
																	}
																	error={
																		updateProductFormik.touched.model_code &&
																		updateProductFormik.errors.model_code
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
																		updateProductFormik.touched.buy_price &&
																		updateProductFormik.errors.buy_price
																	}
																	value={updateProductFormik.values.buy_price}
																	onValueChange={(_, __, values) => {
																		updateProductFormik.setFieldTouched('buy_price', true)
																		updateProductFormik.setFieldValue(
																			'buy_price',
																			values?.value ?? 0,
																		)
																	}}
																/>
															</div>
															<div className={'flex-1'}>
																<LugatAsyncSelect
																	error={
																		getIn(updateProductFormik.touched, 'buy_price_vault.id') &&
																		getIn(updateProductFormik.errors, 'buy_price_vault.id')
																	}
																	value={updateProductFormik.values.buy_price_vault}
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
																		updateProductFormik.setFieldValue('buy_price_vault', value)
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
																		updateProductFormik.touched.sell_price &&
																		updateProductFormik.errors.sell_price
																	}
																	value={updateProductFormik.values.sell_price}
																	onValueChange={(_, __, values) => {
																		updateProductFormik.setFieldTouched('sell_price', true)
																		updateProductFormik.setFieldValue(
																			'sell_price',
																			values?.value ?? 0,
																		)
																	}}
																/>
															</div>
															<div className={'flex-1'}>
																<LugatAsyncSelect
																	required
																	error={
																		getIn(updateProductFormik.touched, 'sell_price_vault.id') &&
																		getIn(updateProductFormik.errors, 'sell_price_vault.id')
																	}
																	value={updateProductFormik.values.sell_price_vault}
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
																		updateProductFormik.setFieldValue('sell_price_vault', value)
																	}}
																/>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className='bg-white p-4 flex justify-end border-t border-gray-100'>
									<LugatButton onClick={updateProductFormik.submitForm}>
										{!isLoading ? 'Save' : <LoaderIcon />}
									</LugatButton>
								</div>
							</>
						)
					}}
				</Await>
			</React.Suspense>
		</div>
	)
}

export default ProductEdit
