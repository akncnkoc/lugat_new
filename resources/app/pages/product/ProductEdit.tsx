import SeperatedColumn from '@/components/SeperatedColumn'
import LoaderComponent from '@/components/anims/LoaderComponent'
import Card from '@/components/card'
import LugatAsyncSelect from '@/components/form/LugatAsyncSelect'
import LugatButton from '@/components/form/LugatButton'
import LugatCurrencyInputWithAsyncSelect from '@/components/form/LugatCurrencyInputWithAsyncSelect'
import LugatInput from '@/components/form/LugatInput'
import LugatInputLabel from '@/components/form/LugatInputLabel'
import LugatToggle from '@/components/form/LugatToggle'
import SeperatedRow from '@/components/form/SeperatedRow'
import { flattenArray, getVariantPreview } from '@/helpers/functions'
import { ProductCreateValidationSchema } from '@/helpers/schemas'
import { Shape } from '@/helpers/types'
import useCurrencies from '@/hooks/useCurrencies'
import useLoadVariant from '@/hooks/useLoadVariant'
import useSupplier from '@/hooks/useSupplier'
import StoreableProductVariants from '@/pages/product/components/StoreableProductVariants'
import { productApi, useUpdateProductMutation } from '@/services/api/product-api'
import { useCreateSubProdoctsMutation, useUpdateSubProdoctsMutation } from '@/services/api/sub-product-api'
import { storeDispatch } from '@/store'
import { ProductDataType, ProductStoreFormType, ProductStoreInitialValues } from '@/types/product-types'
import { ProductVariantFormType, VariantFormType } from '@/types/variant-types'
import { TrackedPromise } from '@remix-run/router/utils'
import { clsx } from 'clsx'
import { getIn, useFormik } from 'formik'
import { motion } from 'framer-motion'
import { isEmpty } from 'lodash'
import React, { useEffect } from 'react'
import Dropzone from 'react-dropzone'
import toast, { LoaderIcon } from 'react-hot-toast'
import { Await, defer, useLoaderData, useParams } from 'react-router-dom'
import { array, number, object, string } from 'yup'

export const productLoader = async ({ params }: any) => {
  const results = storeDispatch(productApi.endpoints?.getProduct.initiate(params.id ?? '')).then((res) => res.data?.data)
  return defer({
    results: results,
  })
}

const ProductEdit: React.FC = () => {
  const { id } = useParams<'id'>()
  const data = useLoaderData() as {
    results: TrackedPromise
  }
  const [updateProduct, { isLoading }] = useUpdateProductMutation()
  const [createSubProducts] = useCreateSubProdoctsMutation()
  const [updateSubProducts] = useUpdateSubProdoctsMutation()
  const { loadCurrencies } = useCurrencies()
  const { loadVariants, loadVariant, createVariant } = useLoadVariant()
  const { loadSuppliers } = useSupplier()

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

  const alreadyCreatedVariantsFormik = useFormik<ProductVariantFormType>({
    initialValues: {
      data: [],
    },
    enableReinitialize: true,
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
    onSubmit: (values) => {
      toast.promise(
        updateSubProducts({
          sub_products: values.data.map((item) => ({
            id: item.id,
            name: item.name,
            sku: item.sku,
            barcode: item.barcode,
            tax: item.tax,
            variants: item.variants,
            stock: item.stock,
            buy_price: item.buy_price,
            sell_price: item.sell_price,
            buy_currency_id: item.buy_currency.value,
            sell_currency_id: item.sell_currency.value,
            images: [],
          })),
        }),
        {
          loading: 'Loading ...',
          success: 'Sub Products Updated',
          error: 'Error while creating sub products',
        },
      )
    },
  })
  const newlyCreatedVariantsFormik = useFormik<ProductVariantFormType>({
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
    onSubmit: async (values) => {
      if (values.data.length === 0) {
        toast.error('You must select at least 1 variant')
        return
      }
      toast.promise(
        createSubProducts({
          sub_products: values.data.map((variant) => ({
            name: variant.name,
            sku: variant.sku,
            barcode: variant.sku,
            tax: variant.tax,
            variants: variant.variants,
            stock: variant.stock,
            buy_price: variant.buy_price,
            sell_price: variant.sell_price,
            buy_currency_id: variant.buy_currency.value,
            sell_currency_id: variant.sell_currency.value,
            images: [],
          })),
          productId: id ?? '',
        }),
        {
          loading: 'Loading ...',
          success: () => {
            setTimeout(() => window.location.reload(), 1000)
            return 'Sub Products Created'
          },
          error: 'Error while creating sub products',
        },
      )
    },
  })
  const handleGenerateVariant = () => {
    if (isEmpty(productUpdateFormik.values.name)) {
      toast.error('You must specify name first')
      return
    }
    if (flattenArray(variantFormik.values.data).length === 0) {
      toast.error('You must select at least 1 variant')
      return
    }
    getVariantPreview(
      productUpdateFormik.values.name,
      flattenArray(variantFormik.values.data).map((item: any) => ({
        id: item.value,
        parent_id: item.parent_id,
        name: item.label,
      })),
    ).map((item, index) => {
      newlyCreatedVariantsFormik.setFieldValue(`data.${index}`, {
        name: item.name,
        sku: productUpdateFormik.values.sku,
        barcode: '',
        buy_price: productUpdateFormik.values.buy_price,
        sell_price: productUpdateFormik.values.sell_price,
        buy_currency: {
          label: productUpdateFormik.values.buy_currency.label,
          value: productUpdateFormik.values.buy_currency.value,
        },
        sell_currency: {
          label: productUpdateFormik.values.sell_currency.label,
          value: productUpdateFormik.values.sell_currency.value,
        },
        stock: 1,
        tax: 0,
        variants: item.variants,
      })
    })
  }
  const productUpdateFormik = useFormik<ProductStoreFormType>({
    initialValues: ProductStoreInitialValues,
    validateOnBlur: false,
    validationSchema: ProductCreateValidationSchema,
    onSubmit: async (values) => {
      toast.promise(
        updateProduct({
          body: {
            name: values.name,
          },
          id: id ?? '',
        }),
        {
          loading: 'Loading ...',
          success: 'Sub Products Created',
          error: 'Error while creating sub products',
        },
      )
    },
  })
  useEffect(() => {
    if (data) {
      data.results.then((product: ProductDataType) => {
        productUpdateFormik.setValues({
          name: product.name,
          sku: product.sub_products[0].sku,
          barcode: product.sub_products[0].barcode,
          suppliers: product.suppliers.map((item) => ({ label: item.name, value: item.id })),
          buy_price: product.sub_products[0].buy_price,
          sell_price: product.sub_products[0].sell_price,
          buy_currency: {
            label: product.sub_products[0].buy_currency.code,
            value: product.sub_products[0].buy_currency.id,
          },
          sell_currency: {
            label: product.sub_products[0].sell_currency.code,
            value: product.sub_products[0].sell_currency.id,
          },
          variants: [],
          images: [],
          have_variants: true,
        })
        product.sub_products.map((item, index) => {
          alreadyCreatedVariantsFormik.setFieldValue(`data.${index}`, {
            id: item.id,
            name: item.name,
            sku: item.sku,
            barcode: item.barcode,
            buy_price: item.buy_price,
            sell_price: item.sell_price,
            buy_currency: {
              label: item.buy_currency.code,
              value: item.buy_currency.id,
            },
            sell_currency: {
              label: item.sell_currency.code,
              value: item.sell_currency.id,
            },
            stock: item.stock,
            tax: item.tax,
            variants: item.variants.map((item) => item.id),
          })
        })
      })
    }
  }, [data])

  return (
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
              <div className={clsx('grid', 'grid-cols-8', 'gap-x-2', 'place-content-center')}>
                <div className={'flex-col col-span-6'}>
                  <Card>
                    <Card.Header>
                      <div className={'flex items-center justify-between flex-1'}>
                        <h3 className={'text-lg font-semibold block'}>
                          Update Product{' '}
                          <span className={'text-xs'}>
                            (<span className={'text-red-700'}> *</span>
                            required fields to be filled )
                          </span>
                        </h3>
                        <LugatButton buttonClassNames={'!w-fit'} onClick={productUpdateFormik.submitForm}>
                          {!isLoading ? 'Save' : <LoaderIcon />}
                        </LugatButton>
                      </div>
                    </Card.Header>
                    <Card.Body className={clsx(productUpdateFormik.values.have_variants && ['rounded-bl-2xl', 'rounded-br-2xl'])}>
                      <SeperatedColumn>
                        <SeperatedRow>
                          <LugatInput
                            required
                            label={'Name'}
                            value={productUpdateFormik.values.name}
                            onChange={(e) => productUpdateFormik.setFieldValue('name', e.target.value)}
                            error={productUpdateFormik.touched.name && productUpdateFormik.errors.name}
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
                            disabled
                            value={productUpdateFormik.values.sku}
                            onChange={(e) => productUpdateFormik.setFieldValue('sku', e.target.value)}
                            error={productUpdateFormik.touched.sku && productUpdateFormik.errors.sku}
                          />
                          <LugatInput
                            label={'Barcode'}
                            disabled
                            value={productUpdateFormik.values.barcode}
                            onChange={(e) => productUpdateFormik.setFieldValue('barcode', e.target.value)}
                            error={productUpdateFormik.touched.barcode && productUpdateFormik.errors.barcode}
                          />
                        </SeperatedRow>
                        <SeperatedRow>
                          <LugatCurrencyInputWithAsyncSelect
                            input={{
                              label: 'Buy Price',
                              required: true,
                              error: productUpdateFormik.touched.buy_price && productUpdateFormik.errors.buy_price,
                              value: productUpdateFormik.values.buy_price,
                              onValueChange: (_, __, values) => {
                                productUpdateFormik.setFieldTouched('buy_price', true)
                                productUpdateFormik.setFieldValue('buy_price', values?.value ?? 0)
                              },
                            }}
                            select={{
                              error:
                                getIn(productUpdateFormik.touched, 'buy_currency.value') &&
                                getIn(productUpdateFormik.errors, 'buy_currency.value'),
                              value: productUpdateFormik.values.buy_currency,
                              other: {
                                additional: {
                                  page: 1,
                                },
                                onChange: (value: any) => {
                                  productUpdateFormik.setFieldValue('buy_currency', value)
                                },
                              },
                              loadOptions: loadCurrencies,
                            }}
                          />
                        </SeperatedRow>
                        <SeperatedRow>
                          <LugatCurrencyInputWithAsyncSelect
                            input={{
                              label: 'Sell Price',
                              required: true,
                              error: productUpdateFormik.touched.sell_price && productUpdateFormik.errors.sell_price,
                              value: productUpdateFormik.values.sell_price,
                              onValueChange: (_, __, values) => {
                                productUpdateFormik.setFieldTouched('sell_price', true)
                                productUpdateFormik.setFieldValue('sell_price', values?.value ?? 0)
                              },
                            }}
                            select={{
                              error:
                                getIn(productUpdateFormik.touched, 'sell_currency.value') &&
                                getIn(productUpdateFormik.errors, 'sell_currency.value'),
                              value: productUpdateFormik.values.sell_currency,
                              other: {
                                additional: {
                                  page: 1,
                                },
                                onChange: (value: any) => {
                                  productUpdateFormik.setFieldValue('sell_currency', value)
                                },
                              },
                              loadOptions: loadCurrencies,
                            }}
                          />
                        </SeperatedRow>
                        <LugatToggle
                          suffix={'Does this product have variants?'}
                          selected={productUpdateFormik.values.have_variants}
                          onChange={(val) => productUpdateFormik.setFieldValue('have_variants', val)}
                        />
                      </SeperatedColumn>
                    </Card.Body>
                    {!productUpdateFormik.values.have_variants && (
                      <Card.Footer>
                        <LugatButton onClick={productUpdateFormik.submitForm}>{!isLoading ? 'Save' : <LoaderIcon />}</LugatButton>
                      </Card.Footer>
                    )}
                  </Card>
                  {productUpdateFormik.values.have_variants && (
                    <motion.div className={'mt-4'} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <Card>
                        <Card.Header>
                          <h3 className={'text-lg font-semibold'}>
                            Update Product Variants{' '}
                            <span className={'text-xs'}>
                              (<span className={'text-red-700'}> *</span>
                              required fields to be filled )
                            </span>
                          </h3>
                        </Card.Header>
                        <Card.Body>
                          <SeperatedColumn>
                            {alreadyCreatedVariantsFormik.values.data.length > 0 && (
                              <StoreableProductVariants
                                values={alreadyCreatedVariantsFormik.values}
                                touched={alreadyCreatedVariantsFormik.touched}
                                errors={alreadyCreatedVariantsFormik.errors}
                                setFieldTouched={alreadyCreatedVariantsFormik.setFieldTouched}
                                setFieldValue={alreadyCreatedVariantsFormik.setFieldValue}
                                loadCurrencies={loadCurrencies}
                              />
                            )}
                          </SeperatedColumn>
                          {JSON.stringify(alreadyCreatedVariantsFormik.dirty)}
                        </Card.Body>
                        <Card.Footer>
                          <LugatButton onClick={alreadyCreatedVariantsFormik.submitForm}>
                            {!isLoading ? 'Update Variants' : <LoaderIcon />}
                          </LugatButton>
                        </Card.Footer>
                      </Card>
                    </motion.div>
                  )}
                  <motion.div className={'mt-4'} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <Card>
                      <Card.Header>
                        <h3 className={'text-lg font-semibold'}>
                          Create Product Variants{' '}
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
                              value={productUpdateFormik.values.variants}
                              label={'Variants'}
                              additional={{
                                page: 1,
                              }}
                              isMulti
                              placeholder={'Variants'}
                              defaultOptions
                              loadOptions={loadVariants}
                              onChange={(value: any) => {
                                productUpdateFormik.setFieldValue('variants', value)
                              }}
                              onCreateOption={(val: string) => createVariant(val, null)}
                              isClearable
                            />
                          </SeperatedRow>
                          {productUpdateFormik.values.variants.length > 0 && (
                            <div className={clsx('grid', 'grid-cols-2', 'gap-2')}>
                              {productUpdateFormik.values.variants.map((variant: any, index) => (
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
                          {variantFormik.values.data.length > 0 && (
                            <div className={'flex-1 flex w-full'}>
                              <LugatButton onClick={handleGenerateVariant}>Generate Variants</LugatButton>
                            </div>
                          )}
                          {newlyCreatedVariantsFormik.values.data.length > 0 && (
                            <StoreableProductVariants
                              values={newlyCreatedVariantsFormik.values}
                              touched={newlyCreatedVariantsFormik.touched}
                              errors={newlyCreatedVariantsFormik.errors}
                              setFieldTouched={newlyCreatedVariantsFormik.setFieldTouched}
                              setFieldValue={newlyCreatedVariantsFormik.setFieldValue}
                              loadCurrencies={loadCurrencies}
                            />
                          )}
                        </SeperatedColumn>
                      </Card.Body>
                      <Card.Footer>
                        <LugatButton onClick={newlyCreatedVariantsFormik.submitForm}>{!isLoading ? 'Save' : <LoaderIcon />}</LugatButton>
                      </Card.Footer>
                    </Card>
                  </motion.div>
                </div>
                <div className={clsx('col-span-2')}>
                  <Card>
                    <Card.Header>Product Supplier</Card.Header>
                    <Card.Body>
                      <LugatAsyncSelect
                        label={'Suppliers'}
                        value={productUpdateFormik.values.suppliers}
                        additional={{
                          page: 1,
                        }}
                        isMulti
                        loadOptions={loadSuppliers}
                        onChange={(value: any) => {
                          productUpdateFormik.setFieldValue('suppliers', value)
                        }}
                      />
                    </Card.Body>
                  </Card>
                </div>
              </div>
            </>
          )
        }}
      </Await>
    </React.Suspense>
  )
}

export default ProductEdit
