import SeperatedColumn from '@/components/SeperatedColumn'
import LoaderComponent from '@/components/anims/LoaderComponent'
import Card from '@/components/card'
import LugatAsyncSelect from '@/components/form/LugatAsyncSelect'
import LugatButton from '@/components/form/LugatButton'
import LugatCurrencyInputWithAsyncSelect from '@/components/form/LugatCurrencyInputWithAsyncSelect'
import LugatInput from '@/components/form/LugatInput'
import SeperatedRow from '@/components/form/SeperatedRow'
import { StaffEditValidationSchema } from '@/helpers/schemas'
import useCurrencies from '@/hooks/useCurrencies'
import useStaffType from '@/hooks/useStaffType'
import { staffApi, useUpdateStaffMutation } from '@/services/api/staff-api'
import { storeDispatch } from '@/store'
import { StaffDataType, StaffStoreFormType, StaffStoreInitialValues, StaffTypeData } from '@/types/staff-types'
import { TrackedPromise } from '@remix-run/router/utils'
import { getIn, useFormik } from 'formik'
import React, { useEffect } from 'react'
import toast, { LoaderIcon } from 'react-hot-toast'
import { Await, defer, useLoaderData, useNavigate, useParams } from 'react-router-dom'

export const staffLoader = async ({ params }: any) => {
  const results = storeDispatch(staffApi.endpoints?.getStaff.initiate(params.id ?? '')).then((res) => res.data?.data)
  return defer({
    results: results,
  })
}

const StaffEdit: React.FC = () => {
  const navigate = useNavigate()
  const { id } = useParams<'id'>()
  const data = useLoaderData() as {
    results: TrackedPromise
  }
  const [updateStaff, { isLoading }] = useUpdateStaffMutation()
  const { loadStaffTypes } = useStaffType()
  const { loadCurrencies } = useCurrencies()
  const staffUpdateFormik = useFormik<StaffStoreFormType>({
    initialValues: StaffStoreInitialValues,
    validateOnBlur: false,
    validationSchema: StaffEditValidationSchema,
    onSubmit: (values) => {
      updateStaff({
        body: {
          ...values,
          salary_currency_id: values.salary_currency.value,
          type: values.type.value,
        },
        id: id ?? '',
      })
        .unwrap()
        .then((_) => {
          toast.success('Staff updated')
          staffUpdateFormik.resetForm()
          navigate('/staff/list')
        })
        .catch((_) => {
          toast.error('Staff cant stored')
        })
    },
  })
  useEffect(() => {
    if (data) {
      data.results.then((staff: StaffDataType) => {
        staffUpdateFormik.setValues({
          name: staff.name,
          surname: staff.surname,
          email: staff.email,
          phone: staff.phone,
          salary: staff.salary,
          salary_currency: {
            value: staff.salary_currency.id,
            label: staff.salary_currency.code,
          },
          type: {
            label: StaffTypeData[staff.type as keyof typeof StaffTypeData],
            value: staff.type,
          },
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
                        value={staffUpdateFormik.values.name}
                        onChange={(e) => staffUpdateFormik.setFieldValue('name', e.target.value)}
                        error={staffUpdateFormik.touched.name && staffUpdateFormik.errors.name}
                      />
                      <LugatInput
                        required
                        label={'Surname'}
                        value={staffUpdateFormik.values.surname}
                        onChange={(e) => staffUpdateFormik.setFieldValue('surname', e.target.value)}
                        error={staffUpdateFormik.touched.surname && staffUpdateFormik.errors.surname}
                      />
                    </SeperatedRow>
                    <SeperatedRow>
                      <LugatInput
                        required
                        label={'Email'}
                        value={staffUpdateFormik.values.email}
                        onChange={(e) => staffUpdateFormik.setFieldValue('email', e.target.value)}
                        error={staffUpdateFormik.touched.email && staffUpdateFormik.errors.email}
                      />
                      <LugatInput
                        required
                        label={'Phone'}
                        value={staffUpdateFormik.values.phone}
                        onChange={(e) => staffUpdateFormik.setFieldValue('phone', e.target.value)}
                        error={staffUpdateFormik.touched.phone && staffUpdateFormik.errors.phone}
                      />
                    </SeperatedRow>
                    <SeperatedRow>
                      <LugatCurrencyInputWithAsyncSelect
                        input={{
                          label: 'Salary',
                          required: true,
                          error: staffUpdateFormik.touched.salary && staffUpdateFormik.errors.salary,
                          value: staffUpdateFormik.values.salary,
                          onValueChange: (_, __, values) => {
                            staffUpdateFormik.setFieldValue('salary', values?.value ?? 0)
                          },
                        }}
                        select={{
                          error:
                            getIn(staffUpdateFormik.touched, 'salary_currency.value') &&
                            getIn(staffUpdateFormik.errors, 'salary_currency.value'),
                          value: staffUpdateFormik.values.salary_currency,
                          other: {
                            additional: {
                              page: 1,
                            },
                            onChange: (value: any) => {
                              staffUpdateFormik.setFieldValue('salary_currency', value)
                            },
                          },
                          loadOptions: loadCurrencies,
                        }}
                      />
                    </SeperatedRow>
                    <LugatAsyncSelect
                      required
                      error={getIn(staffUpdateFormik.touched, 'type.value') && getIn(staffUpdateFormik.errors, 'type.value')}
                      value={staffUpdateFormik.values.type}
                      label={'Staff Type'}
                      options={loadStaffTypes()}
                      onChange={(value: any) => {
                        staffUpdateFormik.setFieldValue('type', value)
                      }}
                    />
                  </SeperatedColumn>
                </Card.Body>
                <Card.Footer>
                  <LugatButton onClick={staffUpdateFormik.submitForm}>{!isLoading ? 'Save' : <LoaderIcon />}</LugatButton>
                </Card.Footer>
              </Card>
            </div>
          )
        }}
      </Await>
    </React.Suspense>
  )
}

export default StaffEdit
