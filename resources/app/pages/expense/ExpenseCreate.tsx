import SeperatedColumn from '@/components/SeperatedColumn'
import Card from '@/components/card'
import LugatAsyncSelect from '@/components/form/LugatAsyncSelect'
import LugatButton from '@/components/form/LugatButton'
import LugatCurrencyInputWithAsyncSelect from '@/components/form/LugatCurrencyInputWithAsyncSelect'
import LugatTextarea from '@/components/form/LugatTextarea'
import SeperatedRow from '@/components/form/SeperatedRow'
import { ExpenseStoreValidationSchema } from '@/helpers/schemas'
import useCurrencies from '@/hooks/useCurrencies'
import { useStoreExpenseMutation } from '@/services/api/expense-api'
import { useAppSelector } from '@/store/hooks'
import { ExpenseStatusType, ExpenseStoreFormType, ExpenseStoreInitialValues, ExpenseTypeData } from '@/types/expense-types'
import { clsx } from 'clsx'
import { getIn, useFormik } from 'formik'
import { motion } from 'framer-motion'
import moment from 'moment-timezone'
import React from 'react'
import toast, { LoaderIcon } from 'react-hot-toast'
import DatePicker, { DateObject } from 'react-multi-date-picker'
import TimePicker from 'react-multi-date-picker/plugins/time_picker'
import { useNavigate } from 'react-router-dom'
const ExpenseCreate: React.FC = () => {
  const navigate = useNavigate()
  const [storeExpense, { isLoading }] = useStoreExpenseMutation()
  const { loadCurrencies } = useCurrencies()
  const currencySelector = useAppSelector((state) => state.currencySlice)

  const expenseCreateFormik = useFormik<ExpenseStoreFormType>({
    initialValues: {
      ...ExpenseStoreInitialValues,
      currency: {
        label: currencySelector.defaultCurrency?.code ?? '',
        value: currencySelector.defaultCurrency?.id ?? '',
      },
    },
    validateOnBlur: false,
    validationSchema: ExpenseStoreValidationSchema,
    onSubmit: (values) => {
      toast.promise(
        storeExpense({
          ...values,
          currency_id: values.currency.value,
          type: values.type.value as keyof typeof ExpenseTypeData,
          status: values.status.value as keyof typeof ExpenseTypeData,
          receipt_date: values.receipt_date ? moment(values.receipt_date).tz('Europe/Istanbul').format() : null,
          scheduled_date: values.scheduled_date ? moment(values.scheduled_date).tz('Europe/Istanbul').format() : null,
        }).unwrap(),
        {
          loading: 'Loading...',
          success: () => {
            navigate('/expense/list')
            return 'Expense stored'
          },
          error: 'Expense cant stored',
        },
      )
    },
  })

  return (
    <div className='flex justify-center gap-y-2 gap-x-0 md:gap-y-0 md:gap-x-2 max-w-8xl md:mx-auto flex-col md:flex-row'>
      <Card className='flex-1'>
        <Card.Header>
          <h3 className={'text-lg font-semibold'}>
            Create New Expense{' '}
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
              error={getIn(expenseCreateFormik.touched, 'type.value') && getIn(expenseCreateFormik.errors, 'type.value')}
              value={expenseCreateFormik.values.type}
              onChange={(value: any) => {
                expenseCreateFormik.setFieldValue('type', value)
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
                  error: expenseCreateFormik.touched.amount && expenseCreateFormik.errors.amount,
                  value: expenseCreateFormik.values.amount,
                  onValueChange: (_, __, values) => {
                    expenseCreateFormik.setFieldTouched('amount', true)
                    expenseCreateFormik.setFieldValue('amount', values?.value ?? 0)
                  },
                }}
                select={{
                  error: getIn(expenseCreateFormik.touched, 'currency.value') && getIn(expenseCreateFormik.errors, 'currency.value'),
                  value: expenseCreateFormik.values.currency,
                  other: {
                    additional: {
                      page: 1,
                    },
                    onChange: (value: any) => {
                      expenseCreateFormik.setFieldValue('currency', value)
                    },
                  },
                  loadOptions: loadCurrencies,
                }}
              />
            </SeperatedRow>
            <div className='md:col-span-3'>
              <LugatTextarea
                label={'Comment'}
                value={expenseCreateFormik.values.comment ?? ''}
                onChange={(e) => expenseCreateFormik.setFieldValue('comment', e.target.value)}
                error={expenseCreateFormik.errors.comment}
              />
            </div>
          </SeperatedColumn>
        </Card.Body>
        <Card.Footer>
          <LugatButton onClick={expenseCreateFormik.submitForm}>{!isLoading ? 'Save' : <LoaderIcon />}</LugatButton>
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
                error={getIn(expenseCreateFormik.touched, 'status.value') && getIn(expenseCreateFormik.errors, 'status.value')}
                value={expenseCreateFormik.values.status}
                onChange={(value: any) => {
                  expenseCreateFormik.setFieldValue('status', value)
                }}
                options={(Object.keys(ExpenseStatusType) as Array<keyof typeof ExpenseStatusType>).map((expense_status) => ({
                  value: expense_status,
                  label: ExpenseStatusType[expense_status],
                }))}
              />
              {expenseCreateFormik.values.status.value === 'paided' && (
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
                        expenseCreateFormik.touched.receipt_date &&
                          expenseCreateFormik.errors.receipt_date && [
                            'focus:!ring-red-500',
                            'text-red-500',
                            'placeholder-red-500',
                            '!border-red-500',
                          ],
                      ],
                    )}
                    value={expenseCreateFormik.values.receipt_date}
                    onChange={(value: DateObject) => {
                      expenseCreateFormik.setFieldValue('receipt_date', value.toDate())
                    }}
                  />
                  {expenseCreateFormik.touched.receipt_date && expenseCreateFormik.errors.receipt_date && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className='mt-2 text-sm text-red-600 font-semibold'
                    >
                      {expenseCreateFormik.errors.receipt_date}
                    </motion.p>
                  )}
                </div>
              )}
              {expenseCreateFormik.values.status.value === 'scheduled' && (
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
                        expenseCreateFormik.touched.scheduled_date &&
                          expenseCreateFormik.errors.scheduled_date && [
                            'focus:!ring-red-500',
                            'text-red-500',
                            'placeholder-red-500',
                            '!border-red-500',
                          ],
                      ],
                    )}
                    value={expenseCreateFormik.values.scheduled_date}
                    onChange={(value: DateObject) => {
                      expenseCreateFormik.setFieldValue('scheduled_date', value.toDate())
                    }}
                  />
                  {expenseCreateFormik.touched.scheduled_date && expenseCreateFormik.errors.scheduled_date && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className='mt-2 text-sm text-red-600 font-semibold'
                    >
                      {expenseCreateFormik.errors.scheduled_date}
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

export default ExpenseCreate
