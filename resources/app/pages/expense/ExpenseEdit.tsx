import SeperatedColumn from '@/components/SeperatedColumn'
import LoaderComponent from '@/components/anims/LoaderComponent'
import Card from '@/components/card'
import LugatAsyncSelect from '@/components/form/LugatAsyncSelect'
import LugatButton from '@/components/form/LugatButton'
import LugatCurrencyInputWithAsyncSelect from '@/components/form/LugatCurrencyInputWithAsyncSelect'
import LugatTextarea from '@/components/form/LugatTextarea'
import SeperatedRow from '@/components/form/SeperatedRow'
import { expenseStatusCheckIn } from '@/helpers/functions'
import { ExpenseStoreValidationSchema } from '@/helpers/schemas'
import useCurrencies from '@/hooks/useCurrencies'
import { expenseApi, useUpdateExpenseMutation } from '@/services/api/expense-api'
import { storeDispatch } from '@/store'
import {
  ExpenseDataType,
  ExpenseStatusType,
  ExpenseStatusTypeUnion,
  ExpenseStoreFormType,
  ExpenseStoreInitialValues,
  ExpenseTypeData,
} from '@/types/expense-types'
import { TrackedPromise } from '@remix-run/router/utils'
import { clsx } from 'clsx'
import { getIn, useFormik } from 'formik'
import { motion } from 'framer-motion'
import moment from 'moment-timezone'
import React, { useEffect } from 'react'
import toast, { LoaderIcon } from 'react-hot-toast'
import DatePicker, { DateObject } from 'react-multi-date-picker'
import TimePicker from 'react-multi-date-picker/plugins/time_picker'
import { Await, defer, useLoaderData, useNavigate, useParams } from 'react-router-dom'

export const expenseLoader = async ({ params }: any) => {
  const results = storeDispatch(expenseApi.endpoints?.getExpense.initiate(params.id ?? '')).then((res) => res.data?.data)
  return defer({
    results: results,
  })
}

const ExpenseEdit: React.FC = () => {
  const navigate = useNavigate()
  const { id } = useParams<'id'>()
  const data = useLoaderData() as {
    results: TrackedPromise
  }
  const [updateExpense, { isLoading }] = useUpdateExpenseMutation()
  const { loadCurrencies } = useCurrencies()
  const expenseUpdateFormik = useFormik<ExpenseStoreFormType>({
    initialValues: ExpenseStoreInitialValues,
    validateOnBlur: false,
    validationSchema: ExpenseStoreValidationSchema,
    onSubmit: (values) => {
      let dates: Array<null | string> = [null, null]

      if (expenseStatusCheckIn(['paided'], values.status.value as ExpenseStatusTypeUnion))
        dates[0] = moment(values.receipt_date).tz('Europe/Istanbul').format()
      if (expenseStatusCheckIn(['scheduled'], values.status.value as ExpenseStatusTypeUnion))
        dates[1] = moment(values.scheduled_date).tz('Europe/Istanbul').format()
      toast.promise(
        updateExpense({
          body: {
            ...values,
            currency_id: values.currency.value,
            type: values.type.value as keyof typeof ExpenseTypeData,
            status: values.status.value as keyof typeof ExpenseTypeData,
            receipt_date: dates[0],
            scheduled_date: dates[1],
          },
          id: id ?? '',
        }).unwrap(),
        {
          loading: 'Loading',
          success: () => {
            navigate('/expense/list')
            return 'Expense updated'
          },
          error: 'Expense cant stored',
        },
      )
    },
  })
  useEffect(() => {
    if (data) {
      data.results.then((expense: ExpenseDataType) => {
        expenseUpdateFormik.setValues({
          amount: expense.amount,
          type: {
            label: ExpenseTypeData[expense.type as keyof typeof ExpenseTypeData],
            value: expense.type,
          },
          comment: expense.comment,
          status: {
            value: expense.status,
            label: ExpenseStatusType[expense.status],
          },
          receipt_date: expense.receipt_date ? moment(expense.receipt_date).tz('Europe/Istanbul').toISOString() : null,
          scheduled_date: expense.scheduled_date ? moment(expense.scheduled_date).tz('Europe/Istanbul').toISOString() : null,
          currency: {
            label: expense.currency.code,
            value: expense.currency.id,
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
            <>
              <div className='flex justify-center gap-y-2 gap-x-0 md:gap-y-0 md:gap-x-2 max-w-8xl md:mx-auto flex-col md:flex-row'>
                <Card className='flex-1'>
                  <Card.Header>
                    <h3 className={'text-lg font-semibold'}>
                      Update Expense{' '}
                      <span className={'text-xs'}>
                        (<span className={'text-red-700'}> *</span>
                        required fields to be filled )
                      </span>
                    </h3>
                  </Card.Header>
                  <Card.Body>
                    <SeperatedColumn>
                      <LugatAsyncSelect
                        label={'Expense Type'}
                        error={getIn(expenseUpdateFormik.touched, 'type.value') && getIn(expenseUpdateFormik.errors, 'type.value')}
                        value={expenseUpdateFormik.values.type}
                        onChange={(value: any) => {
                          expenseUpdateFormik.setFieldValue('type', value)
                        }}
                        options={(Object.keys(ExpenseTypeData) as Array<keyof typeof ExpenseTypeData>).map((expense_type) => ({
                          value: expense_type,
                          label: ExpenseTypeData[expense_type],
                        }))}
                      />
                      <SeperatedRow>
                        <LugatCurrencyInputWithAsyncSelect
                          input={{
                            label: 'Amount',
                            required: true,
                            error: expenseUpdateFormik.touched.amount && expenseUpdateFormik.errors.amount,
                            value: expenseUpdateFormik.values.amount,
                            onValueChange: (_, __, values) => {
                              expenseUpdateFormik.setFieldTouched('amount', true)
                              expenseUpdateFormik.setFieldValue('amount', values?.value ?? 0)
                            },
                          }}
                          select={{
                            error:
                              getIn(expenseUpdateFormik.touched, 'currency.value') && getIn(expenseUpdateFormik.errors, 'currency.value'),
                            value: expenseUpdateFormik.values.currency,
                            other: {
                              additional: {
                                page: 1,
                              },
                              onChange: (value: any) => {
                                expenseUpdateFormik.setFieldValue('currency', value)
                              },
                            },
                            loadOptions: loadCurrencies,
                          }}
                        />
                      </SeperatedRow>
                      <div className='md:col-span-3'>
                        <LugatTextarea
                          label={'Comment'}
                          value={expenseUpdateFormik.values.comment ?? ''}
                          onChange={(e) => expenseUpdateFormik.setFieldValue('comment', e.target.value)}
                          error={expenseUpdateFormik.errors.comment}
                        />
                      </div>
                    </SeperatedColumn>
                  </Card.Body>
                  <Card.Footer>
                    <LugatButton onClick={expenseUpdateFormik.submitForm}>{!isLoading ? 'Save' : <LoaderIcon />}</LugatButton>
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
                          error={getIn(expenseUpdateFormik.touched, 'status.value') && getIn(expenseUpdateFormik.errors, 'status.value')}
                          value={expenseUpdateFormik.values.status}
                          onChange={(value: any) => {
                            expenseUpdateFormik.setFieldValue('status', value)
                          }}
                          options={(Object.keys(ExpenseStatusType) as Array<keyof typeof ExpenseStatusType>).map((expense_status) => ({
                            value: expense_status,
                            label: ExpenseStatusType[expense_status],
                          }))}
                        />
                        {expenseUpdateFormik.values.status.value === 'paided' && (
                          <div className='flex-1'>
                            <label className={'block mb-2 text-sm font-semibold text-gray-900'}>Receipt Date</label>
                            <DatePicker
                              format='DD/MM/YYYY HH:mm:ss'
                              maxDate={moment().toDate()}
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
                                  expenseUpdateFormik.touched.receipt_date &&
                                    expenseUpdateFormik.errors.receipt_date && [
                                      'focus:!ring-red-500',
                                      'text-red-500',
                                      'placeholder-red-500',
                                      '!border-red-500',
                                    ],
                                ],
                              )}
                              value={expenseUpdateFormik.values.receipt_date}
                              onChange={(value: DateObject) => {
                                expenseUpdateFormik.setFieldValue('receipt_date', value.toDate())
                              }}
                            />
                            {expenseUpdateFormik.touched.receipt_date && expenseUpdateFormik.errors.receipt_date && (
                              <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className='mt-2 text-sm text-red-600 font-semibold'
                              >
                                {expenseUpdateFormik.errors.receipt_date}
                              </motion.p>
                            )}
                          </div>
                        )}
                        {expenseUpdateFormik.values.status.value === 'scheduled' && (
                          <div className='flex-1'>
                            <label className={'block mb-2 text-sm font-semibold text-gray-900'}>Scheduled Date</label>
                            <DatePicker
                              format='DD/MM/YYYY HH:mm:ss'
                              minDate={moment().toDate()}
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
                                  expenseUpdateFormik.touched.scheduled_date &&
                                    expenseUpdateFormik.errors.scheduled_date && [
                                      'focus:!ring-red-500',
                                      'text-red-500',
                                      'placeholder-red-500',
                                      '!border-red-500',
                                    ],
                                ],
                              )}
                              value={expenseUpdateFormik.values.scheduled_date}
                              onChange={(value: DateObject) => {
                                expenseUpdateFormik.setFieldValue('scheduled_date', value.toDate())
                              }}
                            />
                            {expenseUpdateFormik.touched.scheduled_date && expenseUpdateFormik.errors.scheduled_date && (
                              <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className='mt-2 text-sm text-red-600 font-semibold'
                              >
                                {expenseUpdateFormik.errors.scheduled_date}
                              </motion.p>
                            )}
                          </div>
                        )}
                      </SeperatedColumn>
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

export default ExpenseEdit
