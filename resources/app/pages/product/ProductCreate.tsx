import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import LugatButton from '@/components/form/LugatButton'
import toast, { LoaderIcon } from 'react-hot-toast'
import LugatInput from '@/components/form/LugatInput'
import useLoadVault from '@/hooks/useLoadVault'
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

const ProductCreate: React.FC = () => {
	const navigate = useNavigate()
	const [storeProduct, { isLoading }] = useStoreProductMutation()
	const { loadVaults } = useLoadVault()
	const { loadVariants, loadVariant, createVariant } = useLoadVariant()

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
					navigate('/product/list')
				})
				.catch(() => {
					toast.error('Product cant stored')
				})
		},
	})

	const variantFormik = useFormik<{
		data: any
	}>({
		initialValues: {
			data: [],
		},
		onSubmit: () => {},
	})
	return (
		<div>
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
								required
								label={'SKU'}
								value={productCreateFormik.values.sku}
								onChange={(e) => productCreateFormik.setFieldValue('sku', e.target.value)}
								error={productCreateFormik.touched.sku && productCreateFormik.errors.sku}
							/>
							<LugatInput
								required
								label={'Barcode'}
								value={productCreateFormik.values.barcode}
								onChange={(e) => productCreateFormik.setFieldValue('barcode', e.target.value)}
								error={productCreateFormik.touched.barcode && productCreateFormik.errors.barcode}
							/>
						</SeperatedRow>
						<LugatInput
							required
							label={'Quantity'}
							value={productCreateFormik.values.stock}
							onChange={(e) => productCreateFormik.setFieldValue('stock', e.target.value)}
							error={productCreateFormik.touched.stock && productCreateFormik.errors.stock}
						/>
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
								{productCreateFormik.values.variants.length > 0 &&
									productCreateFormik.values.variants.map((variant: any, index) => (
										<div key={variant.value}>
											<LugatAsyncSelect
												// value={variantFormik.values.data[index]}
												label={variant.label + ' Variants'}
												additional={{
													page: 1,
													id: variant.value,
												}}
												isMulti
												loadOptions={loadVariant}
												onCreateOption={(val: any) => createVariant(val, variant.value)}
												onChange={(value: any) => {
													// variantFormik.setFieldValue('data', value)
												}}
											/>
										</div>
									))}
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
	)
}

export default ProductCreate
