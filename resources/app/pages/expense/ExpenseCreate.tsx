import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getIn, useFormik } from 'formik'
import { turkeyLocaleConfig } from '@/config/datepicker-config'
import DatePicker, { DateObject } from 'react-multi-date-picker'
import TimePicker from 'react-multi-date-picker/plugins/time_picker'
import LugatTextarea from '@/components/form/LugatTextarea'
import LugatButton from '@/components/form/LugatButton'
import { useStoreExpenseMutation } from '@/services/api/expense-api'
import toast, { LoaderIcon } from 'react-hot-toast'
import LugatAsyncSelect from '@/components/form/LugatAsyncSelect'
import {
	ExpenseStoreFormType,
	ExpenseStoreInitialValues,
	ExpenseTypeData,
} from '@/types/expense-types'
import { ExpenseCreateValidationSchema } from '@/helpers/schemas'
import LugatCurrencyInput from '@/components/form/LugatCurrencyInput'
import Card from '@/components/card'
import SeperatedColumn from '@/components/SeperatedColumn'
import SeperatedRow from '@/components/form/SeperatedRow'
import { clsx } from 'clsx'
import useCurrencies from '@/hooks/useCurrencies'

const ExpenseCreate: React.FC = () => {
	const navigate = useNavigate()
	const [storeExpense, { isLoading }] = useStoreExpenseMutation()
	const { loadCurrencies } = useCurrencies()

	const expenseCreateFormik = useFormik<ExpenseStoreFormType>({
		initialValues: ExpenseStoreInitialValues,
		validateOnBlur: false,
		validationSchema: ExpenseCreateValidationSchema,
		onSubmit: (values) => {
			storeExpense({
				...values,
				currency_id: values.currency.value,
				type: values.type.value as keyof typeof ExpenseTypeData,
			})
				.unwrap()
				.then((_) => {
					toast.success('Expense stored')
					expenseCreateFormik.resetForm()
					navigate('/expense/list')
				})
				.catch((_) => {
					toast.error('Expense cant stored')
				})
		},
	})

	return (
		<Card>
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
					<SeperatedRow>
						<LugatCurrencyInput
							label={'Amount'}
							required
							error={expenseCreateFormik.touched.amount && expenseCreateFormik.errors.amount}
							value={expenseCreateFormik.values.amount}
							onValueChange={(_, __, values) => {
								expenseCreateFormik.setFieldTouched('amount', true)
								expenseCreateFormik.setFieldValue('amount', values?.value ?? 0)
							}}
						/>
						<LugatAsyncSelect
							error={
								getIn(expenseCreateFormik.touched, 'currency.value') &&
								getIn(expenseCreateFormik.errors, 'currency.value')
							}
							value={expenseCreateFormik.values.currency}
							label={'Currency'}
							additional={{
								page: 1,
							}}
							placeholder={'Select'}
							defaultOptions
							loadOptions={loadCurrencies}
							onChange={(value: any) => {
								expenseCreateFormik.setFieldValue('currency', value)
							}}
						/>
					</SeperatedRow>
					<LugatAsyncSelect
						label={'Expense Type'}
						error={
							getIn(expenseCreateFormik.touched, 'type.value') &&
							getIn(expenseCreateFormik.errors, 'type.value')
						}
						value={expenseCreateFormik.values.type}
						onChange={(value: any) => {
							expenseCreateFormik.setFieldValue('type', value)
						}}
						options={(Object.keys(ExpenseTypeData) as Array<keyof typeof ExpenseTypeData>).map(
							(expense_type) => ({
								value: expense_type,
								label: ExpenseTypeData[expense_type],
							}),
						)}
					/>
					<div className='flex-1'>
						<label className={'block mb-2 text-sm font-semibold text-gray-900'}>Receipt Date</label>
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
							value={expenseCreateFormik.values.receipt_date}
							locale={turkeyLocaleConfig}
							onChange={(value: DateObject) => {
								expenseCreateFormik.setFieldValue('receipt_date', value.toDate())
							}}
						/>
					</div>
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
				<LugatButton onClick={expenseCreateFormik.submitForm}>
					{!isLoading ? 'Save' : <LoaderIcon />}
				</LugatButton>
			</Card.Footer>
		</Card>
	)
}

export default ExpenseCreate
