import SeperatedColumn from '@/components/SeperatedColumn'
import LoaderComponent from '@/components/anims/LoaderComponent'
import Card from '@/components/card'
import LugatAsyncSelect from '@/components/form/LugatAsyncSelect'
import LugatButton from '@/components/form/LugatButton'
import LugatCurrencyInputWithAsyncSelect from '@/components/form/LugatCurrencyInputWithAsyncSelect'
import LugatInput from '@/components/form/LugatInput'
import SeperatedRow from '@/components/form/SeperatedRow'
import { cargoTypesCheckIn } from '@/helpers/functions'
import { CargoCreateValidationSchema } from '@/helpers/schemas'
import useCargoCompany from '@/hooks/useCargoCompany'
import useCurrencies from '@/hooks/useCurrencies'
import { cargoApi, useUpdateCargoMutation } from '@/services/api/cargo-api'
import { storeDispatch } from '@/store'
import {
  AmountTypes,
  AmountTypesUnion,
  CargoDataType,
  CargoStoreFormType,
  CargoStoreInitialValues,
  CargoTypes,
  CargoTypesUnion,
} from '@/types/cargo-types'
import { TrackedPromise } from '@remix-run/router/utils'
import clsx from 'clsx'
import { getIn, useFormik } from 'formik'
import { motion } from 'framer-motion'
import moment from 'moment-timezone'
import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import toast, { LoaderIcon } from 'react-hot-toast'
import DatePicker, { DateObject } from 'react-multi-date-picker'
import TimePicker from 'react-multi-date-picker/plugins/time_picker'
import { Await, defer, useLoaderData, useNavigate, useParams } from 'react-router-dom'

export const cargoLoader = async ({ params }: any) => {
  const results = storeDispatch(cargoApi.endpoints?.getCargo.initiate(params.id ?? '')).then((res) => res.data?.data)
  return defer({
    results: results,
  })
}

const CargoEdit: React.FC = () => {
  const navigate = useNavigate()
  const { id } = useParams<'id'>()
  const data = useLoaderData() as {
    results: TrackedPromise
  }
  const [updateCargo, { isLoading }] = useUpdateCargoMutation()
  const { loadCargoCompanies } = useCargoCompany()
  const { loadCurrencies } = useCurrencies()

  const cargoUpdateFormik = useFormik<CargoStoreFormType>({
    initialValues: CargoStoreInitialValues,
    validateOnBlur: false,
    validationSchema: CargoCreateValidationSchema,
    onSubmit: (values) => {
      let dates: Array<null | string> = [null, null, null, null]
      if (cargoTypesCheckIn(['ready_to_ship', 'shipped', 'delivered', 'returned'], values.type.value as CargoTypesUnion)) {
        dates[0] = moment(values.ready_to_ship_date).tz('Europe/Istanbul').format()
      }
      if (cargoTypesCheckIn(['shipped', 'delivered', 'returned'], values.type.value as CargoTypesUnion)) {
        dates[1] = moment(values.shipped_date).tz('Europe/Istanbul').format()
      }
      if (cargoTypesCheckIn(['delivered'], values.type.value as CargoTypesUnion)) {
        dates[2] = moment(values.delivered_date).tz('Europe/Istanbul').format()
      }
      if (cargoTypesCheckIn(['returned'], values.type.value as CargoTypesUnion)) {
        dates[3] = moment(values.returned_date).tz('Europe/Istanbul').format()
      }
      updateCargo({
        body: {
          ...values,
          cargo_company_id: values.cargo_company.value,
          price_currency_id: values.price_currency.value,
          amount_type: values.amount_type.value,
          type: values.type.value,
          ready_to_ship_date: dates[0],
          shipped_date: dates[1],
          delivered_date: dates[2],
          returned_date: dates[3],
        },
        id: id ?? '',
      })
        .unwrap()
        .then((_) => {
          toast.success('Cargo updated')
          cargoUpdateFormik.resetForm()
          navigate('/cargo/list')
        })
        .catch((_) => {
          toast.error('Cargo cant stored')
        })
    },
  })
  useEffect(() => {
    if (data) {
      data.results.then((cargo: CargoDataType) => {
        cargoUpdateFormik.setValues({
          amount_type: {
            label: AmountTypes[cargo.amount_type as AmountTypesUnion],
            value: cargo.amount_type,
          },
          type: {
            label: CargoTypes[cargo.type as CargoTypesUnion],
            value: cargo.type,
          },
          cargo_company: {
            label: cargo.cargo_company.name,
            value: cargo.cargo_company.id,
          },
          price: cargo.price,
          price_currency: {
            label: cargo.price_currency.code,
            value: cargo.price_currency.id,
          },
          tracking_no: cargo.tracking_no,
          amount: cargo.amount,
          ready_to_ship_date: cargo.ready_to_ship_date ? moment(cargo.ready_to_ship_date).tz('Europe/Istanbul').toISOString() : null,
          shipped_date: cargo.shipped_date ? moment(cargo.shipped_date).tz('Europe/Istanbul').toISOString() : null,
          delivered_date: cargo.delivered_date ? moment(cargo.delivered_date).tz('Europe/Istanbul').toISOString() : null,
          returned_date: cargo.returned_date ? moment(cargo.returned_date).tz('Europe/Istanbul').toISOString() : null,
        })
      })
    }
  }, [data])

  return (
    <React.Suspense
      fallback={
        <div className={'h-96 w-full flex items-center justify-center'}>
          <LoaderComponent />
        </div>
      }
    >
      <Await resolve={data.results}>
        {() => {
          return (
            <div className='flex justify-center gap-y-2 gap-x-0 md:gap-y-0 md:gap-x-2 max-w-8xl md:mx-auto flex-col md:flex-row'>
              <Helmet>
                <title>Update Cargo Page</title>
              </Helmet>
              <Card className='flex-1'>
                <Card.Header>
                  <h3 className={'text-lg font-semibold'}>
                    Update Cargo{' '}
                    <span className={'text-xs'}>
                      (<span className={'text-red-700'}> *</span>
                      required fields to be filled )
                    </span>
                  </h3>
                </Card.Header>
                <Card.Body>
                  <SeperatedColumn>
                    <LugatAsyncSelect
                      error={
                        getIn(cargoUpdateFormik.touched, 'cargo_company.value') && getIn(cargoUpdateFormik.errors, 'cargo_company.value')
                      }
                      value={cargoUpdateFormik.values.cargo_company}
                      label={'Cargo Company'}
                      additional={{
                        page: 1,
                      }}
                      loadOptions={loadCargoCompanies}
                      onChange={(value: any) => {
                        cargoUpdateFormik.setFieldValue('cargo_company', value)
                      }}
                    />
                    <SeperatedRow>
                      <LugatInput
                        label={'Amount'}
                        value={cargoUpdateFormik.values.amount}
                        onChange={(e) => cargoUpdateFormik.setFieldValue('amount', e.target.value)}
                        error={cargoUpdateFormik.touched.amount && cargoUpdateFormik.errors.amount}
                      />
                      <LugatAsyncSelect
                        error={
                          getIn(cargoUpdateFormik.touched, 'amount_type.value') && getIn(cargoUpdateFormik.errors, 'amount_type.value')
                        }
                        value={cargoUpdateFormik.values.amount_type}
                        label={'Amount Type'}
                        options={Object.keys(AmountTypes).map((amount_type) => ({
                          value: amount_type,
                          label: AmountTypes[amount_type as AmountTypesUnion],
                        }))}
                        onChange={(value: any) => {
                          cargoUpdateFormik.setFieldValue('amount_type', value)
                        }}
                      />
                    </SeperatedRow>
                    <LugatInput
                      label={'Tracking Number'}
                      value={cargoUpdateFormik.values.tracking_no}
                      onChange={(e) => cargoUpdateFormik.setFieldValue('tracking_no', e.target.value)}
                      error={cargoUpdateFormik.touched.tracking_no && cargoUpdateFormik.errors.tracking_no}
                    />
                    <SeperatedRow>
                      <LugatCurrencyInputWithAsyncSelect
                        input={{
                          label: 'Amount',
                          required: true,
                          error: cargoUpdateFormik.touched.price && cargoUpdateFormik.errors.price,
                          value: cargoUpdateFormik.values.price,
                          onValueChange: (_, __, values) => {
                            cargoUpdateFormik.setFieldTouched('price', true)
                            cargoUpdateFormik.setFieldValue('price', values?.value ?? 0)
                          },
                        }}
                        select={{
                          error: getIn(cargoUpdateFormik.touched, 'currency.value') && getIn(cargoUpdateFormik.errors, 'currency.value'),
                          value: cargoUpdateFormik.values.price_currency,
                          other: {
                            additional: {
                              page: 1,
                            },
                            onChange: (value: any) => {
                              cargoUpdateFormik.setFieldValue('currency', value)
                            },
                          },
                          loadOptions: loadCurrencies,
                        }}
                      />
                    </SeperatedRow>
                  </SeperatedColumn>
                </Card.Body>
                <Card.Footer>
                  <LugatButton onClick={cargoUpdateFormik.submitForm}>{!isLoading ? 'Save' : <LoaderIcon />}</LugatButton>
                </Card.Footer>
              </Card>
              <div className='w-full md:w-96'>
                <Card>
                  <Card.Header>
                    <h3 className={'text-lg font-semibold'}>Status</h3>
                  </Card.Header>
                  <Card.Body withoutFooter>
                    <SeperatedColumn>
                      <LugatAsyncSelect
                        error={getIn(cargoUpdateFormik.touched, 'type.value') && getIn(cargoUpdateFormik.errors, 'type.value')}
                        value={cargoUpdateFormik.values.type}
                        label={'Type'}
                        options={Object.keys(CargoTypes).map((cargo_type) => ({
                          value: cargo_type,
                          label: CargoTypes[cargo_type as CargoTypesUnion],
                        }))}
                        onChange={(value: any) => {
                          cargoUpdateFormik.setFieldValue('type', value)
                        }}
                      />
                      {cargoTypesCheckIn(
                        ['ready_to_ship', 'shipped', 'delivered', 'returned'],
                        cargoUpdateFormik.values.type.value as CargoTypesUnion,
                      ) && (
                        <div className='flex-1'>
                          <label className={'block mb-2 text-sm font-semibold text-gray-900'}>Ready To Ship Date</label>
                          <DatePicker
                            format='DD/MM/YYYY HH:mm:ss'
                            plugins={[<TimePicker position='bottom' key={'time-picker'} />]}
                            className={'w-full'}
                            containerClassName={'w-full'}
                            inputClass={clsx(
                              'text-sm',
                              'rounded-lg',
                              'font-semibold',
                              'block',
                              'w-full',
                              'p-2.5',
                              'outline-none',
                              'border',
                              'border-gray-200',
                              [
                                cargoUpdateFormik.touched.ready_to_ship_date &&
                                  cargoUpdateFormik.errors.ready_to_ship_date && [
                                    'focus:!ring-red-500',
                                    'text-red-500',
                                    'placeholder-red-500',
                                    '!border-red-500',
                                  ],
                              ],
                            )}
                            value={cargoUpdateFormik.values.ready_to_ship_date}
                            onChange={(value: DateObject) => {
                              cargoUpdateFormik.setFieldValue('ready_to_ship_date', value.toDate())
                            }}
                          />
                          {cargoUpdateFormik.touched.ready_to_ship_date && cargoUpdateFormik.errors.ready_to_ship_date && (
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className='mt-2 text-sm text-red-600 font-semibold'
                            >
                              {cargoUpdateFormik.errors.ready_to_ship_date}
                            </motion.p>
                          )}
                        </div>
                      )}
                      {cargoTypesCheckIn(['shipped', 'delivered', 'returned'], cargoUpdateFormik.values.type.value as CargoTypesUnion) && (
                        <div className='flex-1'>
                          <label className={'block mb-2 text-sm font-semibold text-gray-900'}>Shipped Date</label>
                          <DatePicker
                            format='DD/MM/YYYY HH:mm:ss'
                            plugins={[<TimePicker position='bottom' key={'time-picker'} />]}
                            className={'w-full'}
                            containerClassName={'w-full'}
                            inputClass={clsx(
                              'text-sm',
                              'rounded-lg',
                              'font-semibold',
                              'block',
                              'w-full',
                              'p-2.5',
                              'outline-none',
                              'border',
                              'border-gray-200',
                              [
                                cargoUpdateFormik.touched.shipped_date &&
                                  cargoUpdateFormik.errors.shipped_date && [
                                    'focus:!ring-red-500',
                                    'text-red-500',
                                    'placeholder-red-500',
                                    '!border-red-500',
                                  ],
                              ],
                            )}
                            value={cargoUpdateFormik.values.shipped_date}
                            onChange={(value: DateObject) => {
                              cargoUpdateFormik.setFieldValue('shipped_date', value.toDate())
                            }}
                          />
                          {cargoUpdateFormik.touched.shipped_date && cargoUpdateFormik.errors.shipped_date && (
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className='mt-2 text-sm text-red-600 font-semibold'
                            >
                              {cargoUpdateFormik.errors.shipped_date}
                            </motion.p>
                          )}
                        </div>
                      )}
                      {cargoTypesCheckIn(['delivered'], cargoUpdateFormik.values.type.value as CargoTypesUnion) && (
                        <div className='flex-1'>
                          <label className={'block mb-2 text-sm font-semibold text-gray-900'}>Delivered Date</label>
                          <DatePicker
                            format='DD/MM/YYYY HH:mm:ss'
                            plugins={[<TimePicker position='bottom' key={'time-picker'} />]}
                            className={'w-full'}
                            containerClassName={'w-full'}
                            inputClass={clsx(
                              'text-sm',
                              'rounded-lg',
                              'font-semibold',
                              'block',
                              'w-full',
                              'p-2.5',
                              'outline-none',
                              'border',
                              'border-gray-200',
                              [
                                cargoUpdateFormik.touched.delivered_date &&
                                  cargoUpdateFormik.errors.delivered_date && [
                                    'focus:!ring-red-500',
                                    'text-red-500',
                                    'placeholder-red-500',
                                    '!border-red-500',
                                  ],
                              ],
                            )}
                            value={cargoUpdateFormik.values.delivered_date}
                            onChange={(value: DateObject) => {
                              cargoUpdateFormik.setFieldValue('delivered_date', value.toDate())
                            }}
                          />
                          {cargoUpdateFormik.touched.delivered_date && cargoUpdateFormik.errors.delivered_date && (
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className='mt-2 text-sm text-red-600 font-semibold'
                            >
                              {cargoUpdateFormik.errors.delivered_date}
                            </motion.p>
                          )}
                        </div>
                      )}
                      {cargoTypesCheckIn(['returned'], cargoUpdateFormik.values.type.value as CargoTypesUnion) && (
                        <div className='flex-1'>
                          <label className={'block mb-2 text-sm font-semibold text-gray-900'}>Returned Date</label>
                          <DatePicker
                            format='DD/MM/YYYY HH:mm:ss'
                            plugins={[<TimePicker position='bottom' key={'time-picker'} />]}
                            className={'w-full'}
                            containerClassName={'w-full'}
                            inputClass={clsx(
                              'text-sm',
                              'rounded-lg',
                              'font-semibold',
                              'block',
                              'w-full',
                              'p-2.5',
                              'outline-none',
                              'border',
                              'border-gray-200',
                              [
                                cargoUpdateFormik.touched.returned_date &&
                                  cargoUpdateFormik.errors.returned_date && [
                                    'focus:!ring-red-500',
                                    'text-red-500',
                                    'placeholder-red-500',
                                    '!border-red-500',
                                  ],
                              ],
                            )}
                            value={cargoUpdateFormik.values.returned_date}
                            onChange={(value: DateObject) => {
                              cargoUpdateFormik.setFieldValue('returned_date', value.toDate())
                            }}
                          />
                          {cargoUpdateFormik.touched.returned_date && cargoUpdateFormik.errors.returned_date && (
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className='mt-2 text-sm text-red-600 font-semibold'
                            >
                              {cargoUpdateFormik.errors.returned_date}
                            </motion.p>
                          )}
                        </div>
                      )}
                    </SeperatedColumn>
                  </Card.Body>
                </Card>
              </div>
            </div>
          )
        }}
      </Await>
    </React.Suspense>
  )
}

export default CargoEdit
