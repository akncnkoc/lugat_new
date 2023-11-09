import SeperatedColumn from '@/components/SeperatedColumn'
import Card from '@/components/card'
import LugatAsyncSelect from '@/components/form/LugatAsyncSelect'
import LugatButton from '@/components/form/LugatButton'
import LugatCurrencyInputWithAsyncSelect from '@/components/form/LugatCurrencyInputWithAsyncSelect'
import LugatInput from '@/components/form/LugatInput'
import SeperatedRow from '@/components/form/SeperatedRow'
import { StaffCreateValidationSchema } from '@/helpers/schemas'
import useCurrencies from '@/hooks/useCurrencies'
import useStaffType from '@/hooks/useStaffType'
import { useStoreStaffMutation } from '@/services/api/staff-api'
import { useAppSelector } from '@/store/hooks'
import { StaffStoreFormType, StaffStoreInitialValues } from '@/types/staff-types'
import { getIn, useFormik } from 'formik'
import React from 'react'
import toast, { LoaderIcon } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const StaffCreate: React.FC = () => {
  const navigate = useNavigate()
  const [storeStaff, { isLoading }] = useStoreStaffMutation()
  const { loadStaffTypes } = useStaffType()
  const { loadCurrencies } = useCurrencies()
  const currencySelector = useAppSelector((state) => state.currencySlice)

  const staffCreateFormik = useFormik<StaffStoreFormType>({
    initialValues: {
      ...StaffStoreInitialValues,
      salary_currency: {
        label: currencySelector.defaultCurrency?.code ?? '',
        value: currencySelector.defaultCurrency?.id ?? '',
      },
    },
    validateOnBlur: false,
    validationSchema: StaffCreateValidationSchema,
    onSubmit: (values) => {
      storeStaff({
        ...values,
        salary_currency_id: values.salary_currency.value,
        type: values.type.value,
      })
        .unwrap()
        .then((_) => {
          toast.success('Staff stored')
          staffCreateFormik.resetForm()
          navigate('/staff/list')
        })
        .catch((_) => {
          toast.error('Staff cant stored')
        })
    },
  })
  return (
    <div className='flex justify-center gap-y-2 gap-x-0 md:gap-y-0 md:gap-x-2 max-w-8xl md:mx-auto flex-col md:flex-row'>
      <Card className='flex-1'>
        <Card.Header>
          <h3 className={'text-lg font-semibold'}>
            Create New Staff{' '}
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
                value={staffCreateFormik.values.name}
                onChange={(e) => staffCreateFormik.setFieldValue('name', e.target.value)}
                error={staffCreateFormik.touched.name && staffCreateFormik.errors.name}
              />
              <LugatInput
                required
                label={'Surname'}
                value={staffCreateFormik.values.surname}
                onChange={(e) => staffCreateFormik.setFieldValue('surname', e.target.value)}
                error={staffCreateFormik.touched.surname && staffCreateFormik.errors.surname}
              />
            </SeperatedRow>
            <SeperatedRow>
              <LugatInput
                required
                label={'Email'}
                value={staffCreateFormik.values.email}
                onChange={(e) => staffCreateFormik.setFieldValue('email', e.target.value)}
                error={staffCreateFormik.touched.email && staffCreateFormik.errors.email}
              />
              <LugatInput
                required
                label={'Phone'}
                value={staffCreateFormik.values.phone}
                onChange={(e) => staffCreateFormik.setFieldValue('phone', e.target.value)}
                error={staffCreateFormik.touched.phone && staffCreateFormik.errors.phone}
              />
            </SeperatedRow>
            <SeperatedRow>
              <LugatCurrencyInputWithAsyncSelect
                input={{
                  label: 'Salary',
                  required: true,
                  error: staffCreateFormik.touched.salary && staffCreateFormik.errors.salary,
                  value: staffCreateFormik.values.salary,
                  onValueChange: (_, __, values) => {
                    staffCreateFormik.setFieldValue('salary', values?.value ?? 0)
                  },
                }}
                select={{
                  error:
                    getIn(staffCreateFormik.touched, 'salary_currency.value') && getIn(staffCreateFormik.errors, 'salary_currency.value'),
                  value: staffCreateFormik.values.salary_currency,
                  other: {
                    additional: {
                      page: 1,
                    },
                    onChange: (value: any) => {
                      staffCreateFormik.setFieldValue('salary_currency', value)
                    },
                  },
                  loadOptions: loadCurrencies,
                }}
              />
            </SeperatedRow>
            <LugatAsyncSelect
              required
              error={getIn(staffCreateFormik.touched, 'type.value') && getIn(staffCreateFormik.errors, 'type.value')}
              value={staffCreateFormik.values.type}
              label={'Staff Type'}
              options={loadStaffTypes()}
              onChange={(value: any) => {
                staffCreateFormik.setFieldValue('type', value)
              }}
            />
          </SeperatedColumn>
        </Card.Body>
        <Card.Footer>
          <LugatButton onClick={staffCreateFormik.submitForm}>{!isLoading ? 'Save' : <LoaderIcon />}</LugatButton>
        </Card.Footer>
      </Card>
    </div>
  )
}

export default StaffCreate
