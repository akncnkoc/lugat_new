import React, { useEffect } from 'react'
import { Await, defer, useLoaderData, useNavigate, useParams } from 'react-router-dom'
import { getIn, useFormik } from 'formik'
import DatePicker, { DateObject } from 'react-multi-date-picker'
import TimePicker from 'react-multi-date-picker/plugins/time_picker'
import LugatTextarea from '@/components/form/LugatTextarea'
import LugatButton from '@/components/form/LugatButton'
import { expenseApi, useUpdateExpenseMutation } from '@/services/api/expense-api'
import toast, { LoaderIcon } from 'react-hot-toast'
import LugatAsyncSelect from '@/components/form/LugatAsyncSelect'
import { storeDispatch } from '@/store'
import LoaderComponent from '@/components/anims/LoaderComponent'
import { TrackedPromise } from '@remix-run/router/utils'
import { parse } from 'date-fns'
import {
	ExpenseStoreFormType,
	ExpenseStoreInitialValues,
	ExpenseTypeData,
} from '@/types/expense-types'
import useLoadVault from '@/hooks/useLoadVault'
import { ExpenseEditValidationSchema } from '@/helpers/schemas'
import LugatCurrencyInput from '@/components/form/LugatCurrencyInput'
import Card from '@/components/card'
import SeperatedColumn from '@/components/SeperatedColumn'
import SeperatedRow from '@/components/form/SeperatedRow'
import { clsx } from 'clsx'
import { turkeyLocaleConfig } from '@/config/datepicker-config'

export const expenseLoader = async ({ params }: any) => {
	const results = storeDispatch(expenseApi.endpoints?.getExpense.initiate(params.id ?? '')).then(
		(res) => res.data?.data,
	)
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
	const { loadVaults } = useLoadVault()
	const expenseUpdateFormik = useFormik<ExpenseStoreFormType>({
		initialValues: ExpenseStoreInitialValues,
		validateOnBlur: false,
		validationSchema: ExpenseEditValidationSchema,
		onSubmit: (values) => {
			updateExpense({
				body: {
					...values,
					vault_id: values.vault.value,
					type: values.type.value as keyof typeof ExpenseTypeData,
				},
				id: id ?? '',
			})
				.unwrap()
				.then((_) => {
					toast.success('Expense updated')
					expenseUpdateFormik.resetForm()
					navigate('/expense/list')
				})
				.catch((_) => {
					toast.error('Expense cant stored')
				})
		},
	})
	useEffect(() => {
		if (data) {
			data.results.then((expense) => {
				expenseUpdateFormik.setValues({
					amount: expense.amount,
					type: {
						label: ExpenseTypeData[expense.type as keyof typeof ExpenseTypeData],
						value: expense.type,
					},
					comment: expense.comment,
					receipt_date: parse(expense.receipt_date.toString(), 'dd.MM.yyyy HH:mm:ss', new Date()),
					vault: {
						label: expense.vault.name,
						value: expense.vault.id,
					},
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
										Update Expense{' '}
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
												error={
													expenseUpdateFormik.touched.amount && expenseUpdateFormik.errors.amount
												}
												value={expenseUpdateFormik.values.amount}
												onValueChange={(_, __, values) => {
													expenseUpdateFormik.setFieldTouched('amount', true)
													expenseUpdateFormik.setFieldValue('amount', values?.value ?? 0)
												}}
											/>
											<LugatAsyncSelect
												error={
													getIn(expenseUpdateFormik.touched, 'vault.value') &&
													getIn(expenseUpdateFormik.errors, 'vault.value')
												}
												value={expenseUpdateFormik.values.vault}
												label={'Vault'}
												additional={{
													page: 1,
												}}
												placeholder={'Select'}
												defaultOptions
												loadOptions={loadVaults}
												onChange={(value: any) => {
													expenseUpdateFormik.setFieldValue('vault', value)
												}}
											/>
										</SeperatedRow>
										<LugatAsyncSelect
											label={'Expense Type'}
											value={expenseUpdateFormik.values.type}
											error={
												getIn(expenseUpdateFormik.touched, 'type.value') &&
												getIn(expenseUpdateFormik.errors, 'type.value')
											}
											onChange={(value: any) => {
												expenseUpdateFormik.setFieldValue('type', value)
											}}
											options={(
												Object.keys(ExpenseTypeData) as Array<keyof typeof ExpenseTypeData>
											).map((expense_type) => ({
												value: expense_type,
												label: ExpenseTypeData[expense_type],
											}))}
										/>
										<div className='flex-1'>
											<label className={'block mb-2 text-sm font-semibold text-gray-900'}>
												Receipt Date
											</label>
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
												value={expenseUpdateFormik.values.receipt_date}
												locale={turkeyLocaleConfig}
												onChange={(value: DateObject) => {
													expenseUpdateFormik.setFieldValue('receipt_date', value.toDate())
												}}
											/>
										</div>
										<div className='md:col-span-3'>
											<LugatTextarea
												label={'Comment'}
												value={expenseUpdateFormik.values.comment ?? ''}
												onChange={(e) =>
													expenseUpdateFormik.setFieldValue('comment', e.target.value)
												}
												error={expenseUpdateFormik.errors.comment}
											/>
										</div>
									</SeperatedColumn>
								</Card.Body>
								<Card.Footer>
									<LugatButton onClick={expenseUpdateFormik.submitForm}>
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

export default ExpenseEdit
