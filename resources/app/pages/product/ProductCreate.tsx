import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getIn, useFormik } from 'formik'
import LugatButton from '@/components/form/LugatButton'
import toast, { LoaderIcon } from 'react-hot-toast'
import LugatInput from '@/components/form/LugatInput'
import { ProductCreateValidationSchema } from '@/helpers/schemas'
import { useStoreProductMutation } from '@/services/api/product-api'
import { ProductStoreFormType, ProductStoreInitialValues } from '@/types/product-types'
import Card from '@/components/card'
import SeperatedRow from '@/components/form/SeperatedRow'
import SeperatedColumn from '@/components/SeperatedColumn'
import Dropzone from 'react-dropzone'
import { clsx } from 'clsx'
import LugatInputLabel from '@/components/form/LugatInputLabel'
import LugatToggle from '@/components/form/LugatToggle'
import { motion } from 'framer-motion'
import LugatAsyncSelect from '@/components/form/LugatAsyncSelect'
import useLoadVariant from '@/hooks/useLoadVariant'
import { flattenArray, getVariantPreview } from '@/helpers/functions'
import { ProductVariantFormType, VariantFormType } from '@/types/variant-types'
import ProductVariants from '@/pages/product/components/ProductVariants'
import { array, number, object, string } from 'yup'
import { Shape } from '@/helpers/types'
import { isEmpty } from 'lodash'
import useSupplier from '@/hooks/useSupplier'
import LugatCurrencyInput from '@/components/form/LugatCurrencyInput'
import useCurrencies from '@/hooks/useCurrencies'

const ProductCreate: React.FC = () => {
	const navigate = useNavigate()
	const [storeProduct, { isLoading }] = useStoreProductMutation()
	const { loadCurrencies } = useCurrencies()
	const { loadVariants, loadVariant, createVariant } = useLoadVariant()
	const { loadSuppliers } = useSupplier()

	const productCreateFormik = useFormik<ProductStoreFormType>({
		initialValues: ProductStoreInitialValues,
		validateOnBlur: false,
		validationSchema: ProductCreateValidationSchema,
		onSubmit: async (values) => {
			if (values.have_variants) {
				const errors = await createdVariantsFormik.validateForm()
				if (!isEmpty(errors)) {
					console.log(errors)
					toast.error('Something went wrong with variants.')
					return
				}
				storeProduct({
					name: values.name,
					sub_products: createdVariantsFormik.values.data.map((item) => ({
						name: item.name,
						images: [],
						sku: item.sku,
						barcode: item.barcode,
						stock: item.stock,
						variants: item.variants,
						tax: 0,
						buy_price: item.buy_price,
						sell_price: item.sell_price,
						buy_currency_id: item.buy_currency.value,
						sell_currency_id: item.sell_currency.value,
					})),
					suppliers: values.suppliers.map((supplier) => supplier.value),
				})
					.unwrap()
					.then(() => {
						toast.success('Product stored')
						productCreateFormik.resetForm()
						navigate('/product/list')
					})
					.catch(() => {
						toast.error('Product cant stored')
					})
			} else {
				storeProduct({
					name: values.name,
					sub_products: [
						{
							name: values.name,
							buy_price: values.buy_price,
							sell_price: values.sell_price,
							buy_currency_id: values.buy_currency.value,
							sell_currency_id: values.sell_currency.value,
							sku: values.sku,
							barcode: values.barcode,
							stock: 1,
							tax: 0,
							variants: [],
							images: [],
						},
					],
					suppliers: values.suppliers.map((supplier) => supplier.value),
				})
					.unwrap()
					.then(() => {
						toast.success('Product stored')
						productCreateFormik.resetForm()
						navigate('/product/list')
					})
					.catch(() => {
						toast.error('Product cant stored')
					})
			}
		},
	})

	const variantFormik = useFormik<{
		data: Array<{
			id: string
			parent_id: string
			name: string
		}>
	}>({
		initialValues: {
			data: [],
		},
		onSubmit: () => {},
	})

	const createdVariantsFormik = useFormik<ProductVariantFormType>({
		initialValues: {
			data: [],
		},
		validationSchema: object().shape<Shape<Partial<ProductVariantFormType>>>({
			data: array().of(
				object().shape<Shape<Partial<VariantFormType>>>({
					name: string().required().max(255),
					sell_price: number().min(1),
					sell_currency: object()
						.label('Currency')
						.shape({
							value: string().required().notOneOf(['-1'], 'Currency must be selected'),
						}),
					stock: number().min(1),
				}),
			),
		}),
		onSubmit: () => {},
	})

	const handleGenerateVariant = () => {
		if (isEmpty(productCreateFormik.values.name)) {
			toast.error('You must specify name first')
			return
		}
		if (flattenArray(variantFormik.values.data).length === 0) {
			toast.error('You must select at least 1 variant')
			return
		}
		getVariantPreview(
			productCreateFormik.values.name,
			flattenArray(variantFormik.values.data).map((item: any) => ({
				id: item.value,
				parent_id: item.parent_id,
				name: item.label,
			})),
		).map((item, index) => {
			createdVariantsFormik.setFieldValue(`data.${index}`, {
				name: item.name,
				sku: productCreateFormik.values.sku,
				barcode: '',
				buy_price: productCreateFormik.values.buy_price,
				sell_price: productCreateFormik.values.sell_price,
				buy_currency: {
					label: productCreateFormik.values.buy_currency.label,
					value: productCreateFormik.values.buy_currency.value,
				},
				sell_currency: {
					label: productCreateFormik.values.sell_currency.label,
					value: productCreateFormik.values.sell_currency.value,
				},
				stock: 1,
				tax: 0,
				variants: item.variants
			})
		})
	}

	return (
		<div className={clsx('grid', 'grid-cols-8', 'gap-x-2', 'place-content-center')}>
			<div className={'flex-col col-span-6'}>
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
					<Card.Body
						className={clsx(
							productCreateFormik.values.have_variants && ['rounded-bl-2xl', 'rounded-br-2xl'],
						)}
					>
						<SeperatedColumn>
							<SeperatedRow>
								<LugatInput
									required
									label={'Name'}
									value={productCreateFormik.values.name}
									onChange={(e) => productCreateFormik.setFieldValue('name', e.target.value)}
									error={productCreateFormik.touched.name && productCreateFormik.errors.name}
								/>
							</SeperatedRow>
							<LugatInputLabel label={'Images'} />
							<Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
								{({ getRootProps, getInputProps }) => (
									<section
										className={clsx(
											'w-full',
											'bg-white',
											'border-2',
											'border-dashed',
											'border-gray-200',
											'rounded-md',
											'h-24',
											'flex',
											'items-center',
											'justify-center',
											'cursor-pointer',
											'transition-all',
											'hover:border-blue-500',
										)}
									>
										<div {...getRootProps()}>
											<input {...getInputProps()} />
											<p>Drag 'n' drop some files here, or click to select files</p>
										</div>
									</section>
								)}
							</Dropzone>
							<SeperatedRow>
								<LugatInput
									label={'SKU'}
									value={productCreateFormik.values.sku}
									onChange={(e) => productCreateFormik.setFieldValue('sku', e.target.value)}
									error={productCreateFormik.touched.sku && productCreateFormik.errors.sku}
								/>
								<LugatInput
									label={'Barcode'}
									value={productCreateFormik.values.barcode}
									onChange={(e) => productCreateFormik.setFieldValue('barcode', e.target.value)}
									error={productCreateFormik.touched.barcode && productCreateFormik.errors.barcode}
								/>
							</SeperatedRow>
							<SeperatedRow>
								<LugatCurrencyInput
									label={'Buy Price'}
									required
									error={
										getIn(productCreateFormik.touched, 'buy_price') &&
										getIn(productCreateFormik.errors, 'buy_price')
									}
									value={productCreateFormik.values.buy_price}
									onValueChange={(_, __, values) => {
										productCreateFormik.setFieldTouched('buy_price', true)
										productCreateFormik.setFieldValue('buy_price', values?.value ?? 0)
									}}
								/>
								<LugatAsyncSelect
									error={
										getIn(productCreateFormik.touched, 'buy_currency.value') &&
										getIn(productCreateFormik.errors, 'buy_currency.value')
									}
									value={productCreateFormik.values.buy_currency}
									label={'Buy Currency'}
									additional={{
										page: 1,
									}}
									placeholder={'Select'}
									defaultOptions
									loadOptions={loadCurrencies}
									onChange={(value: any) => {
										productCreateFormik.setFieldValue('buy_currency', value)
									}}
								/>
							</SeperatedRow>
							<SeperatedRow>
								<LugatCurrencyInput
									label={'Sell Price'}
									required
									error={
										getIn(productCreateFormik.touched, 'sell_price') &&
										getIn(productCreateFormik.errors, 'sell_price')
									}
									value={productCreateFormik.values.sell_price}
									onValueChange={(_, __, values) => {
										productCreateFormik.setFieldTouched('sell_price', true)
										productCreateFormik.setFieldValue('sell_price', values?.value ?? 0)
									}}
								/>
								<LugatAsyncSelect
									error={
										getIn(productCreateFormik.touched, 'sell_currency.value') &&
										getIn(productCreateFormik.errors, 'sell_currency.value')
									}
									value={productCreateFormik.values.sell_currency}
									label={'Buy Currency'}
									additional={{
										page: 1,
									}}
									placeholder={'Select'}
									defaultOptions
									loadOptions={loadCurrencies}
									onChange={(value: any) => {
										productCreateFormik.setFieldValue('sell_currency', value)
									}}
								/>
							</SeperatedRow>
							<LugatToggle
								suffix={'Does this product have variants?'}
								selected={productCreateFormik.values.have_variants}
								onChange={(val) => productCreateFormik.setFieldValue('have_variants', val)}
							/>
						</SeperatedColumn>
					</Card.Body>
					{!productCreateFormik.values.have_variants && (
						<Card.Footer>
							<LugatButton onClick={productCreateFormik.submitForm}>
								{!isLoading ? 'Save' : <LoaderIcon />}
							</LugatButton>
						</Card.Footer>
					)}
				</Card>
				{productCreateFormik.values.have_variants && (
					<motion.div
						className={'mt-4'}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<Card>
							<Card.Header>
								<h3 className={'text-lg font-semibold'}>
									Product Variants{' '}
									<span className={'text-xs'}>
										(<span className={'text-red-700'}> *</span>
										required fields to be filled )
									</span>
								</h3>
							</Card.Header>
							<Card.Body>
								<SeperatedColumn>
									<SeperatedRow>
										<LugatAsyncSelect
											value={productCreateFormik.values.variants}
											label={'Variants'}
											additional={{
												page: 1,
											}}
											isMulti
											placeholder={'Variants'}
											defaultOptions
											loadOptions={loadVariants}
											onChange={(value: any) => {
												productCreateFormik.setFieldValue('variants', value)
											}}
											onCreateOption={(val: string) => createVariant(val, null)}
											isClearable
										/>
									</SeperatedRow>
									{productCreateFormik.values.variants.length > 0 && (
										<div className={clsx('grid', 'grid-cols-2', 'gap-2')}>
											{productCreateFormik.values.variants.map((variant: any, index) => (
												<div key={variant.value}>
													<LugatAsyncSelect
														value={variantFormik.values.data[index]}
														label={variant.label + ' Variants'}
														additional={{
															page: 1,
															id: variant.value,
														}}
														isMulti
														loadOptions={loadVariant}
														onCreateOption={(val: any) => createVariant(val, variant.value)}
														onChange={(value: any) => {
															variantFormik.setFieldValue(`data.${index}`, value)
														}}
													/>
												</div>
											))}
										</div>
									)}
									{productCreateFormik.values.variants.length > 0 && (
										<div className={'flex-1 flex w-full'}>
											<LugatButton onClick={handleGenerateVariant}>Generate Variants</LugatButton>
										</div>
									)}

									{createdVariantsFormik.values.data.length > 0 && (
										<ProductVariants
											values={createdVariantsFormik.values}
											touched={createdVariantsFormik.touched}
											errors={createdVariantsFormik.errors}
											setFieldTouched={createdVariantsFormik.setFieldTouched}
											setFieldValue={createdVariantsFormik.setFieldValue}
											loadCurrencies={loadCurrencies}
										/>
									)}
								</SeperatedColumn>
							</Card.Body>
							<Card.Footer>
								<LugatButton onClick={productCreateFormik.submitForm}>
									{!isLoading ? 'Save' : <LoaderIcon />}
								</LugatButton>
							</Card.Footer>
						</Card>
					</motion.div>
				)}
			</div>
			<div className={clsx('col-span-2')}>
				<Card>
					<Card.Header>Product Supplier</Card.Header>
					<Card.Body>
						<LugatAsyncSelect
							label={'Suppliers'}
							additional={{
								page: 1,
							}}
							isMulti
							loadOptions={loadSuppliers}
							onChange={(value: any) => {
								productCreateFormik.setFieldValue('suppliers', value)
							}}
						/>
					</Card.Body>
				</Card>
			</div>
		</div>
	)
}

export default ProductCreate
