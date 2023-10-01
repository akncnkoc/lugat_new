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
import useLoadVault from '@/hooks/useLoadVault'
import { ExpenseCreateValidationSchema } from '@/helpers/schemas'
import LugatCurrencyInput from '@/components/LugatCurrencyInput'

const ExpenseCreate: React.FC = () => {
	const navigate = useNavigate()
	const [storeExpense, { isLoading }] = useStoreExpenseMutation()
	const { loadVaults } = useLoadVault()

	const expenseCreateFormik = useFormik<ExpenseStoreFormType>({
		initialValues: ExpenseStoreInitialValues,
		validateOnBlur: false,
		validationSchema: ExpenseCreateValidationSchema,
		onSubmit: (values) => {
			storeExpense({ ...values, vault_id: values.vault.id })
				.unwrap()
				.then((_) => {
					toast.success('Expense stored')
					expenseCreateFormik.resetForm()
					navigate(-1)
				})
				.catch((_) => {
					toast.error('Expense cant stored')
				})
		},
	})

	return (
		<div className='relative transform rounded-lg bg-white text-left shadow-2xl shadow-gray-100 transition-all overflow-hidden tablet:max-w-7xl tablet:mx-auto'>
			<div className={'h-16 px-6 border-b border-gray-100 flex items-center justify-between'}>
				<h3 className={'text-lg font-semibold'}>Create New Expense</h3>
			</div>
			<div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
				<div className='sm:flex sm:items-start'>
					<div className='mt-3 text-center sm:mt-0 sm:text-left w-full'>
						<div className='flex flex-1 grow'>
							<div className='flex flex-col flex-1 space-y-2'>
								<div className={'flex-1 flex space-x-2'}>
									<div className={'flex-1'}>
										<LugatCurrencyInput
											label={'Amount'}
											required
											error={
												expenseCreateFormik.touched.amount && expenseCreateFormik.errors.amount
											}
											value={expenseCreateFormik.values.amount}
											onValueChange={(_, __, values) => {
												expenseCreateFormik.setFieldTouched('amount', true)
												expenseCreateFormik.setFieldValue('amount', values?.value ?? 0)
											}}
										/>
									</div>
									<div className={'flex-1'}>
										<LugatAsyncSelect
											error={
												getIn(expenseCreateFormik.touched, 'vault.id') &&
												getIn(expenseCreateFormik.errors, 'vault.id')
											}
											value={expenseCreateFormik.values.vault}
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
												expenseCreateFormik.setFieldValue('vault', value)
											}}
										/>
									</div>
								</div>
								<div className='md:col-span-5'>
									<LugatAsyncSelect
										label={'Expense Type'}
										error={expenseCreateFormik.touched.type && expenseCreateFormik.errors.type}
										onChange={(value: any) => {
											expenseCreateFormik.setFieldValue('type', value.value)
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
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='bg-white p-4 flex justify-end border-t border-gray-100'>
				<LugatButton onClick={expenseCreateFormik.submitForm}>
					{!isLoading ? 'Save' : <LoaderIcon />}
				</LugatButton>
			</div>
		</div>
	)
}

export default ExpenseCreate
