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
import LoaderComponent from '@/components/LoaderComponent'
import { TrackedPromise } from '@remix-run/router/utils'
import { parse } from 'date-fns'
import {
	ExpenseStoreFormType,
	ExpenseStoreInitialValues,
	ExpenseTypeData,
} from '@/types/expense-types'
import useLoadVault from '@/hooks/useLoadVault'
import { ExpenseEditValidationSchema } from '@/helpers/schemas'
import LugatCurrencyInput from '@/components/LugatCurrencyInput'

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
			updateExpense({ body: { ...values, vault_id: values.vault.id }, id: id ?? '' })
				.unwrap()
				.then((_) => {
					toast.success('Expense updated')
					expenseUpdateFormik.resetForm()
					navigate(-1)
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
					type: expense.type,
					comment: expense.comment,
					receipt_date: parse(expense.receipt_date.toString(), 'dd.MM.yyyy HH:mm:ss', new Date()),
					vault: {
						id: expense.vault.id,
						name: expense.vault.name,
					},
				})
			})
		}
	}, [data])

	return (
		<div className='relative transform rounded-lg bg-white text-left shadow-2xl shadow-gray-100 transition-all overflow-hidden tablet:max-w-7xl tablet:mx-auto'>
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
								<div
									className={'h-16 px-6 border-b border-gray-100 flex items-center justify-between'}
								>
									<h3 className={'text-lg font-semibold'}>Update Expense</h3>
								</div>
								<div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
									<div className='sm:flex sm:items-start'>
										<div className='mt-3 text-center sm:mt-0 sm:text-left w-full'>
											<div className='flex flex-1 grow'>
												<div className='flex flex-col flex-1 space-y-2'>
													<div className={'flex-1 flex space-x-2'}>
														<div className={'flex-1'}>
															<label className={'block mb-2 text-sm font-semibold text-gray-900'}>
																Amount
															</label>
															<LugatCurrencyInput
																label={'Amount'}
																required
																error={
																	expenseUpdateFormik.touched.amount &&
																	expenseUpdateFormik.errors.amount
																}
																value={expenseUpdateFormik.values.amount}
																onValueChange={(_, __, values) => {
																	expenseUpdateFormik.setFieldTouched('amount', true)
																	expenseUpdateFormik.setFieldValue('amount', values?.value ?? 0)
																}}
															/>
														</div>
														<div className={'flex-1'}>
															<LugatAsyncSelect
																error={
																	getIn(expenseUpdateFormik.touched, 'vault.id') &&
																	getIn(expenseUpdateFormik.errors, 'vault.id')
																}
																value={expenseUpdateFormik.values.vault}
																getOptionLabel={(e: any) => e.name}
																getOptionValue={(e: any) => e.id}
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
														</div>
													</div>
													<div className='md:col-span-5'>
														<LugatAsyncSelect
															label={'Expense Type'}
															value={{
																label:
																	ExpenseTypeData[
																		expenseUpdateFormik.values.type as keyof typeof ExpenseTypeData
																	],
																value: expenseUpdateFormik.values.type,
															}}
															error={
																expenseUpdateFormik.touched.type && expenseUpdateFormik.errors.type
															}
															onChange={(value: any) => {
																expenseUpdateFormik.setFieldValue('type', value.value)
															}}
															options={(
																Object.keys(ExpenseTypeData) as Array<keyof typeof ExpenseTypeData>
															).map((expense_type) => ({
																value: expense_type,
																label: ExpenseTypeData[expense_type],
															}))}
														/>
													</div>
													<div className='md:col-span-5'>
														<label className={'block mb-2 text-sm font-semibold text-gray-900'}>
															Receipt Date
														</label>
														<DatePicker
															format='DD/MM/YYYY HH:mm:ss'
															plugins={[<TimePicker position='bottom' />]}
															className={'w-full'}
															containerClassName={'w-full'}
															inputClass={
																'sm:text-sm rounded-lg font-semibold block w-full p-2.5 outline-none border border-gray-50'
															}
															value={expenseUpdateFormik.values.receipt_date}
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
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className='bg-white p-4 flex justify-end border-t border-gray-100'>
									<LugatButton onClick={expenseUpdateFormik.submitForm}>
										{!isLoading ? 'Save' : <LoaderIcon />}
									</LugatButton>
								</div>
							</>
						)
					}}
				</Await>
			</React.Suspense>
		</div>
	)
}

export default ExpenseEdit
