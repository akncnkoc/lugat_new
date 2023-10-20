import SeperatedColumn from '@/components/SeperatedColumn'
import LoaderComponent from '@/components/anims/LoaderComponent'
import Card from '@/components/card'
import LugatAsyncSelect from '@/components/form/LugatAsyncSelect'
import LugatButton from '@/components/form/LugatButton'
import LugatCurrencyInput from '@/components/form/LugatCurrencyInput'
import LugatInput from '@/components/form/LugatInput'
import SeperatedRow from '@/components/form/SeperatedRow'
import { CargoCreateValidationSchema, CargoStoreInitialValues } from '@/helpers/schemas'
import useCargoCompany from '@/hooks/useCargoCompany'
import useCurrencies from '@/hooks/useCurrencies'
import { cargoApi, useUpdateCargoMutation } from '@/services/api/cargo-api'
import { storeDispatch } from '@/store'
import { AmountTypes, AmountTypesUnion, CargoDataType, CargoStoreFormType, CargoTypes, CargoTypesUnion } from '@/types/cargo-types'
import { TrackedPromise } from '@remix-run/router/utils'
import clsx from 'clsx'
import { parse } from 'date-fns'
import { getIn, useFormik } from 'formik'
import React, { useEffect } from 'react'
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
      updateCargo({
        body: {
          ...values,
          cargo_company_id: values.cargo_company.value,
          price_currency_id: values.price_currency.value,
          amount_type: values.amount_type.value,
          type: values.type.value,
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
          date_of_paid: parse(cargo.date_of_paid, 'dd.MM.yyyy HH:mm:ss', new Date()),
          price: cargo.price,
          price_currency: {
            label: cargo.price_currency.name,
            value: cargo.price_currency.id,
          },
          tracking_no: cargo.tracking_no,
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
                    Update Staff{' '}
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
                      defaultOptions
                      loadOptions={loadCargoCompanies}
                      onChange={(value: any) => {
                        cargoUpdateFormik.setFieldValue('cargo_company', value)
                      }}
                    />
                    <SeperatedRow>
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
                      <LugatCurrencyInput
                        label={'Price'}
                        required
                        error={cargoUpdateFormik.touched.price && cargoUpdateFormik.errors.price}
                        value={cargoUpdateFormik.values.price}
                        onValueChange={(_, __, values) => {
                          cargoUpdateFormik.setFieldTouched('price', true)
                          cargoUpdateFormik.setFieldValue('price', values?.value ?? 0)
                        }}
                      />
                      <LugatAsyncSelect
                        error={
                          getIn(cargoUpdateFormik.touched, 'price_currency.value') &&
                          getIn(cargoUpdateFormik.errors, 'price_currency.value')
                        }
                        value={cargoUpdateFormik.values.price_currency}
                        label={'Price Currency'}
                        additional={{
                          page: 1,
                        }}
                        placeholder={'Select'}
                        defaultOptions
                        loadOptions={loadCurrencies}
                        onChange={(value: any) => {
                          cargoUpdateFormik.setFieldValue('price_currency', value)
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
                        value={cargoUpdateFormik.values.date_of_paid}
                        onChange={(value: DateObject) => {
                          cargoUpdateFormik.setFieldValue('date_of_paid', value.toDate())
                        }}
                      />
                    </div>
                  </SeperatedColumn>
                </Card.Body>
                <Card.Footer>
                  <LugatButton onClick={cargoUpdateFormik.submitForm} disabled={!cargoUpdateFormik.isValid}>
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

export default CargoEdit
