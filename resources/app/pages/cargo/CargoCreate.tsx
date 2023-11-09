import RequiredFieldSpan from '@/components/RequiredFieldSpan'
import SeperatedColumn from '@/components/SeperatedColumn'
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
import { useStoreCargoMutation } from '@/services/api/cargo-api'
import { useAppSelector } from '@/store/hooks'
import {
  AmountTypes,
  AmountTypesUnion,
  CargoStoreFormType,
  CargoStoreInitialValues,
  CargoTypes,
  CargoTypesUnion,
} from '@/types/cargo-types'
import clsx from 'clsx'
import { getIn, useFormik } from 'formik'
import { motion } from 'framer-motion'
import moment from 'moment-timezone'
import React from 'react'
import { Helmet } from 'react-helmet'
import toast, { LoaderIcon } from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import DatePicker, { DateObject } from 'react-multi-date-picker'
import TimePicker from 'react-multi-date-picker/plugins/time_picker'
import { useNavigate } from 'react-router-dom'

const CargoCreate: React.FC = () => {
  const navigate = useNavigate()
  const [storeCargo, { isLoading }] = useStoreCargoMutation()
  const { loadCurrencies } = useCurrencies()
  const { loadCargoCompanies } = useCargoCompany()
  const { t } = useTranslation()
  const currencySelector = useAppSelector((state) => state.currencySlice)
  const cargoCreateFormik = useFormik<CargoStoreFormType>({
    initialValues: {
      ...CargoStoreInitialValues,
      price_currency: {
        label: currencySelector.defaultCurrency?.code ?? '',
        value: currencySelector.defaultCurrency?.id ?? '',
      },
    },
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
      storeCargo({
        ...values,
        cargo_company_id: values.cargo_company.value,
        price_currency_id: values.price_currency.value,
        amount_type: values.amount_type.value,
        type: values.type.value,
        ready_to_ship_date: dates[0],
        shipped_date: dates[1],
        delivered_date: dates[2],
        returned_date: dates[3],
      })
        .unwrap()
        .then((_) => {
          toast.success('Cargo stored')
          cargoCreateFormik.resetForm()
          navigate('/cargo/list')
        })
        .catch((_) => {
          toast.error('Cargo cant stored')
        })
    },
  })

  return (
    <div className='flex justify-center gap-y-2 gap-x-0 md:gap-y-0 md:gap-x-2 max-w-8xl md:mx-auto flex-col md:flex-row'>
      <Helmet>
        <title>Create Cargo Page</title>
      </Helmet>
      <Card className='flex-1'>
        <Card.Header>
          <h3 className={'text-lg font-semibold'}>
            Create Cargo <RequiredFieldSpan />
          </h3>
        </Card.Header>
        <Card.Body>
          <SeperatedColumn>
            <LugatAsyncSelect
              error={getIn(cargoCreateFormik.touched, 'cargo_company.value') && getIn(cargoCreateFormik.errors, 'cargo_company.value')}
              value={cargoCreateFormik.values.cargo_company}
              label={t('')}
              additional={{
                page: 1,
              }}
              loadOptions={loadCargoCompanies}
              onChange={(value: any) => {
                cargoCreateFormik.setFieldValue('cargo_company', value)
              }}
            />
            <SeperatedRow>
              <LugatInput
                label={'Amount'}
                value={cargoCreateFormik.values.amount}
                onChange={(e) => cargoCreateFormik.setFieldValue('amount', e.target.value)}
                error={cargoCreateFormik.touched.amount && cargoCreateFormik.errors.amount}
              />
              <LugatAsyncSelect
                error={getIn(cargoCreateFormik.touched, 'amount_type.value') && getIn(cargoCreateFormik.errors, 'amount_type.value')}
                value={cargoCreateFormik.values.amount_type}
                label={'Amount Type'}
                options={Object.keys(AmountTypes).map((amount_type) => ({
                  value: amount_type,
                  label: AmountTypes[amount_type as AmountTypesUnion],
                }))}
                onChange={(value: any) => {
                  cargoCreateFormik.setFieldValue('amount_type', value)
                }}
              />
            </SeperatedRow>
            <LugatInput
              label={'Tracking Number'}
              value={cargoCreateFormik.values.tracking_no}
              onChange={(e) => cargoCreateFormik.setFieldValue('tracking_no', e.target.value)}
              error={cargoCreateFormik.touched.tracking_no && cargoCreateFormik.errors.tracking_no}
            />
            <SeperatedRow>
              <LugatCurrencyInputWithAsyncSelect
                input={{
                  label: 'Amount',
                  required: true,
                  error: cargoCreateFormik.touched.price && cargoCreateFormik.errors.price,
                  value: cargoCreateFormik.values.price,
                  onValueChange: (_, __, values) => {
                    cargoCreateFormik.setFieldTouched('price', true)
                    cargoCreateFormik.setFieldValue('price', values?.value ?? 0)
                  },
                }}
                select={{
                  error: getIn(cargoCreateFormik.touched, 'currency.value') && getIn(cargoCreateFormik.errors, 'currency.value'),
                  value: cargoCreateFormik.values.price_currency,
                  other: {
                    additional: {
                      page: 1,
                    },
                    onChange: (value: any) => {
                      cargoCreateFormik.setFieldValue('currency', value)
                    },
                  },
                  loadOptions: loadCurrencies,
                }}
              />
            </SeperatedRow>
          </SeperatedColumn>
        </Card.Body>
        <Card.Footer>
          <LugatButton onClick={cargoCreateFormik.submitForm}>{!isLoading ? 'Save' : <LoaderIcon />}</LugatButton>
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
                error={getIn(cargoCreateFormik.touched, 'type.value') && getIn(cargoCreateFormik.errors, 'type.value')}
                value={cargoCreateFormik.values.type}
                label={'Type'}
                options={Object.keys(CargoTypes).map((cargo_type) => ({
                  value: cargo_type,
                  label: CargoTypes[cargo_type as CargoTypesUnion],
                }))}
                onChange={(value: any) => {
                  cargoCreateFormik.setFieldValue('type', value)
                }}
              />
              {cargoTypesCheckIn(
                ['ready_to_ship', 'shipped', 'delivered', 'returned'],
                cargoCreateFormik.values.type.value as CargoTypesUnion,
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
                        cargoCreateFormik.touched.ready_to_ship_date &&
                          cargoCreateFormik.errors.ready_to_ship_date && [
                            'focus:!ring-red-500',
                            'text-red-500',
                            'placeholder-red-500',
                            '!border-red-500',
                          ],
                      ],
                    )}
                    value={cargoCreateFormik.values.ready_to_ship_date}
                    onChange={(value: DateObject) => {
                      cargoCreateFormik.setFieldValue('ready_to_ship_date', value.toDate())
                    }}
                  />
                  {cargoCreateFormik.touched.ready_to_ship_date && cargoCreateFormik.errors.ready_to_ship_date && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className='mt-2 text-sm text-red-600 font-semibold'
                    >
                      {cargoCreateFormik.errors.ready_to_ship_date}
                    </motion.p>
                  )}
                </div>
              )}
              {cargoTypesCheckIn(['shipped', 'delivered', 'returned'], cargoCreateFormik.values.type.value as CargoTypesUnion) && (
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
                        cargoCreateFormik.touched.shipped_date &&
                          cargoCreateFormik.errors.shipped_date && [
                            'focus:!ring-red-500',
                            'text-red-500',
                            'placeholder-red-500',
                            '!border-red-500',
                          ],
                      ],
                    )}
                    value={cargoCreateFormik.values.shipped_date}
                    onChange={(value: DateObject) => {
                      cargoCreateFormik.setFieldValue('shipped_date', value.toDate())
                    }}
                  />
                  {cargoCreateFormik.touched.shipped_date && cargoCreateFormik.errors.shipped_date && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className='mt-2 text-sm text-red-600 font-semibold'
                    >
                      {cargoCreateFormik.errors.shipped_date}
                    </motion.p>
                  )}
                </div>
              )}
              {cargoTypesCheckIn(['delivered'], cargoCreateFormik.values.type.value as CargoTypesUnion) && (
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
                        cargoCreateFormik.touched.delivered_date &&
                          cargoCreateFormik.errors.delivered_date && [
                            'focus:!ring-red-500',
                            'text-red-500',
                            'placeholder-red-500',
                            '!border-red-500',
                          ],
                      ],
                    )}
                    value={cargoCreateFormik.values.delivered_date}
                    onChange={(value: DateObject) => {
                      cargoCreateFormik.setFieldValue('delivered_date', value.toDate())
                    }}
                  />
                  {cargoCreateFormik.touched.delivered_date && cargoCreateFormik.errors.delivered_date && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className='mt-2 text-sm text-red-600 font-semibold'
                    >
                      {cargoCreateFormik.errors.delivered_date}
                    </motion.p>
                  )}
                </div>
              )}
              {cargoTypesCheckIn(['returned'], cargoCreateFormik.values.type.value as CargoTypesUnion) && (
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
                        cargoCreateFormik.touched.returned_date &&
                          cargoCreateFormik.errors.returned_date && [
                            'focus:!ring-red-500',
                            'text-red-500',
                            'placeholder-red-500',
                            '!border-red-500',
                          ],
                      ],
                    )}
                    value={cargoCreateFormik.values.returned_date}
                    onChange={(value: DateObject) => {
                      cargoCreateFormik.setFieldValue('returned_date', value.toDate())
                    }}
                  />
                  {cargoCreateFormik.touched.returned_date && cargoCreateFormik.errors.returned_date && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className='mt-2 text-sm text-red-600 font-semibold'
                    >
                      {cargoCreateFormik.errors.returned_date}
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
}

export default CargoCreate
