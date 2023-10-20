import SeperatedColumn from '@/components/SeperatedColumn'
import Card from '@/components/card'
import LugatAsyncSelect from '@/components/form/LugatAsyncSelect'
import LugatButton from '@/components/form/LugatButton'
import LugatCurrencyInput from '@/components/form/LugatCurrencyInput'
import LugatInput from '@/components/form/LugatInput'
import SeperatedRow from '@/components/form/SeperatedRow'
import { CargoCreateValidationSchema, CargoStoreInitialValues } from '@/helpers/schemas'
import useCargoCompany from '@/hooks/useCargoCompany'
import useCurrencies from '@/hooks/useCurrencies'
import { useStoreCargoMutation } from '@/services/api/cargo-api'
import { AmountTypes, AmountTypesUnion, CargoStoreFormType, CargoTypes, CargoTypesUnion } from '@/types/cargo-types'
import clsx from 'clsx'
import { getIn, useFormik } from 'formik'
import React from 'react'
import toast, { LoaderIcon } from 'react-hot-toast'
import DatePicker, { DateObject } from 'react-multi-date-picker'
import TimePicker from 'react-multi-date-picker/plugins/time_picker'
import { useNavigate } from 'react-router-dom'

const CargoCreate: React.FC = () => {
  const navigate = useNavigate()
  const [storeCargo, { isLoading }] = useStoreCargoMutation()
  const { loadCurrencies } = useCurrencies()
  const { loadCargoCompanies } = useCargoCompany()

  const cargoCreateFormik = useFormik<CargoStoreFormType>({
    initialValues: CargoStoreInitialValues,
    validateOnBlur: false,
    validationSchema: CargoCreateValidationSchema,
    onSubmit: (values) => {
      storeCargo({
        ...values,
        cargo_company_id: values.cargo_company.value,
        price_currency_id: values.price_currency.value,
        amount_type: values.amount_type.value,
        type: values.type.value,
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
    <Card>
      <Card.Header>
        <h3 className={'text-lg font-semibold'}>
          Create New Cargo{' '}
          <span className={'text-xs'}>
            (<span className={'text-red-700'}> *</span>
            required fields to be filled )
          </span>
        </h3>
      </Card.Header>
      <Card.Body>
        <SeperatedColumn>
          <LugatAsyncSelect
            error={getIn(cargoCreateFormik.touched, 'cargo_company.value') && getIn(cargoCreateFormik.errors, 'cargo_company.value')}
            value={cargoCreateFormik.values.cargo_company}
            label={'Cargo Company'}
            additional={{
              page: 1,
            }}
            loadOptions={loadCargoCompanies}
            onChange={(value: any) => {
              cargoCreateFormik.setFieldValue('cargo_company', value)
            }}
          />
          <SeperatedRow>
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
            <LugatCurrencyInput
              label={'Price'}
              required
              error={cargoCreateFormik.touched.price && cargoCreateFormik.errors.price}
              value={cargoCreateFormik.values.price}
              onValueChange={(_, __, values) => {
                cargoCreateFormik.setFieldTouched('price', true)
                cargoCreateFormik.setFieldValue('price', values?.value ?? 0)
              }}
            />
            <LugatAsyncSelect
              error={getIn(cargoCreateFormik.touched, 'price_currency.value') && getIn(cargoCreateFormik.errors, 'price_currency.value')}
              value={cargoCreateFormik.values.price_currency}
              label={'Price Currency'}
              additional={{
                page: 1,
              }}
              placeholder={'Select'}
              defaultOptions
              loadOptions={loadCurrencies}
              onChange={(value: any) => {
                cargoCreateFormik.setFieldValue('price_currency', value)
              }}
            />
          </SeperatedRow>
          <div className='flex-1'>
            <label className={'block mb-2 text-sm font-semibold text-gray-900'}>Date Of Paid</label>
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
                'border-gray-50',
              )}
              value={cargoCreateFormik.values.date_of_paid}
              onChange={(value: DateObject) => {
                cargoCreateFormik.setFieldValue('date_of_paid', value.toDate())
              }}
            />
          </div>
        </SeperatedColumn>
      </Card.Body>
      <Card.Footer>
        <LugatButton onClick={cargoCreateFormik.submitForm}>{!isLoading ? 'Save' : <LoaderIcon />}</LugatButton>
      </Card.Footer>
    </Card>
  )
}

export default CargoCreate
