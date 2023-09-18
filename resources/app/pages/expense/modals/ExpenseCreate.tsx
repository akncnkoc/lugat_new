import React, { Fragment, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Dialog, Transition } from '@headlessui/react'
import { FaMoneyCheck } from 'react-icons/fa6'
import { useFormik } from 'formik'
import { ExpenseCreateFormType, ExpenseTypeData, Shape } from '@/helpers/types.ts'
import { date, number, object, string } from 'yup'
import CurrencyInput from 'react-currency-input-field'
import LugatSelect from '@/components/form/LugatSelect'
import { useVaults } from '@/hooks/useVaults'
import { motion } from 'framer-motion'
import { turkeyLocaleConfig } from '@/config/datepicker-config.ts'
import DatePicker, { DateObject } from 'react-multi-date-picker'
import TimePicker from 'react-multi-date-picker/plugins/time_picker'
import parse from 'date-fns/parse'
import LugatInput from '@/components/form/LugatInput.tsx'
import LugatTextarea from '@/components/form/LugatTextarea.tsx'

const ExpenseCreate: React.FC = () => {
	const navigate = useNavigate()
	const cancelButtonRef = useRef(null)

	const expenseCreateFormik = useFormik<ExpenseCreateFormType>({
		initialValues: {
			amount: 0,
			type: '-1',
			comment: '',
			receipt_date: new Date(),
			vault_id: '-1¬',
		},
		validateOnBlur: false,
		validationSchema: object().shape<Shape<ExpenseCreateFormType>>({
			amount: number().required().min(1).max(1000),
			comment: string().notRequired(),
			type: string().required().notOneOf(['-1'], 'Expense type must be selected'),
			vault_id: string().required().notOneOf(['-1'], 'Vault must be selected'),
			receipt_date: date().transform(function (value, originalValue) {
				if (this.isType(value)) {
					return value
				}
				return parse(originalValue, 'dd.MM.yyyy', new Date())
			}),
		}),
		onSubmit: (values: ExpenseCreateFormType) => {},
	})

	const { data: vaultData } = useVaults('1')

	return (
		<Transition.Root show={true} as={Fragment}>
			<Dialog
				as='div'
				className='relative z-[999999]'
				initialFocus={cancelButtonRef}
				onClose={() => navigate(-1)}
			>
				<Transition.Child
					as={Fragment}
					enter='ease-out duration-300'
					enterFrom='opacity-0'
					enterTo='opacity-100'
					leave='ease-in duration-200'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'
				>
					<div className='fixed inset-0 bg-gray-700 bg-opacity-75 transition-opacity' />
				</Transition.Child>

				<div className='fixed inset-0 z-10 overflow-y-auto'>
					<div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
						<Transition.Child
							as={Fragment}
							enter='ease-out duration-300'
							enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
							enterTo='opacity-100 translate-y-0 sm:scale-100'
							leave='ease-in duration-200'
							leaveFrom='opacity-100 translate-y-0 sm:scale-100'
							leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
						>
							<Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-gray-700 text-left shadow-2xl shadow-gray-800 transition-all sm:my-8 sm:w-full sm:max-w-3xl'>
								<div className='bg-gray-700 px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
									<div className='sm:flex sm:items-start'>
										<div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-700 sm:mx-0 sm:h-10 sm:w-10'>
											<FaMoneyCheck color={'white'} />
										</div>
										<div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full'>
											<div className='flex space-x-4 flex-1 grow'>
												<div>
													<p className='font-medium text-lg'>Expense Details</p>
													<p>Please fill out all the fields.</p>
												</div>

												<div className='flex flex-col flex-1 space-y-2'>
													<div className={'flex-1'}>
														<label className={'block my-2 text-sm font-medium'}>Amount</label>
														<CurrencyInput
															className={`${
																expenseCreateFormik.errors.amount &&
																'focus:!ring-red-500 text-red-500 placeholder-red-500 !border-red-500'
															} sm:text-sm mt-2 rounded-lg block w-full p-2.5 outline-none bg-gray-100 placeholder-gray-400 text-gray-800 ring-blue-200 border-blue-200`}
															value={expenseCreateFormik.values.amount}
															onValueChange={(_, __, values) =>
																expenseCreateFormik.setFieldValue('amount', values?.value ?? 0)
															}
															onChange={() => {}}
															suffix={' ₺'}
															groupSeparator={'.'}
															decimalSeparator={','}
															allowDecimals
															step={0.1}
														/>
														{expenseCreateFormik.errors.amount && (
															<motion.p
																initial={{ opacity: 0 }}
																animate={{ opacity: 1 }}
																exit={{ opacity: 0 }}
																className='mt-2 text-sm text-red-600'
															>
																{expenseCreateFormik.errors.amount}
															</motion.p>
														)}
													</div>
													<div className='md:col-span-5'>
														<LugatSelect
															label={'Vault'}
															value={expenseCreateFormik.values.vault_id}
															onChange={(e) =>
																expenseCreateFormik.setFieldValue('vault_id', e.target.value)
															}
															error={expenseCreateFormik.errors.vault_id}
														>
															<option value='-1'>Select</option>
															{vaultData?.data &&
																vaultData.data.map((vault) => (
																	<option key={vault.id} value={`${vault.id}`}>
																		{vault.name}
																	</option>
																))}
														</LugatSelect>
													</div>
													<div className='md:col-span-5'>
														<LugatSelect
															label={'Expense Type'}
															value={expenseCreateFormik.values.type}
															onChange={(e) =>
																expenseCreateFormik.setFieldValue('type', e.target.value)
															}
															error={expenseCreateFormik.errors.type}
														>
															<option value='-1'>Select</option>
															{ExpenseTypeData &&
																(
																	Object.keys(ExpenseTypeData) as Array<
																		keyof typeof ExpenseTypeData
																	>
																).map((expense_type) => (
																	<option
																		key={ExpenseTypeData[expense_type]}
																		value={`${expense_type}`}
																	>
																		{ExpenseTypeData[expense_type]}
																	</option>
																))}
														</LugatSelect>
													</div>
													<div className='md:col-span-5'>
														<label className={'block my-2 text-sm font-medium'}>Receipt Date</label>
														<DatePicker
															format='DD/MM/YYYY HH:mm:ss'
															plugins={[<TimePicker position='bottom' />]}
															className={'w-full'}
															containerClassName={'w-full'}
															inputClass={
																'sm:text-sm rounded-lg block w-full p-2.5 outline-none bg-gray-100 placeholder-gray-400 text-black border-transparent'
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
															value={expenseCreateFormik.values.comment}
															textareaClassnames={'!bg-gray-100 !text-black'}
															onChange={(e) =>
																expenseCreateFormik.setFieldValue('comment', e.target.value)
															}
															error={expenseCreateFormik.errors.comment}
														/>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className='bg-gray-700 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
									<button
										type='button'
										className='inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto'
										onClick={() => navigate(-1)}
									>
										İçeri Aktar
									</button>
									<button
										type='button'
										className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 hover:bg-gray-50 sm:mt-0 sm:w-auto'
										onClick={() => navigate(-1)}
										ref={cancelButtonRef}
									>
										Kapat
									</button>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	)
}

export default ExpenseCreate
