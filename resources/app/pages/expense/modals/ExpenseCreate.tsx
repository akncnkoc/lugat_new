import React, { Fragment, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Dialog, Transition } from '@headlessui/react'
import { useFormik } from 'formik'
import { ExpenseCreateFormType, ExpenseTypeData, Shape } from '@/helpers/types'
import { date, number, object, string } from 'yup'
import CurrencyInput from 'react-currency-input-field'
import LugatSelect from '@/components/form/LugatSelect'
import { AnimatePresence, motion } from 'framer-motion'
import { turkeyLocaleConfig } from '@/config/datepicker-config'
import DatePicker, { DateObject } from 'react-multi-date-picker'
import TimePicker from 'react-multi-date-picker/plugins/time_picker'
import parse from 'date-fns/parse'
import LugatTextarea from '@/components/form/LugatTextarea'
import useVaults from '@/hooks/useVaults'
import LugatButton from '@/components/form/LugatButton'
import TimesIcon from '@/components/icons/TimesIcon'
import { tr } from 'date-fns/locale'

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
			amount: number().label('Amount').required().min(1).max(100000),
			comment: string(),
			type: string().required().notOneOf(['-1'], 'Expense type must be selected'),
			vault_id: string().required().notOneOf(['-1'], 'Vault must be selected'),
			receipt_date: date().transform(function (value, originalValue) {
				if (this.isType(value)) {
					return value
				}
				return parse(originalValue, 'dd.MM.yyyy', new Date())
			}),
		}),
		onSubmit: () => {},
	})

	const VaultSelect = useVaults({
		error: expenseCreateFormik.errors.vault_id,
		onChangeCallback: (value) => expenseCreateFormik.setFieldValue('vault_id', value),
		value: expenseCreateFormik.values.vault_id,
	})

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
					enter="ease-out duration-300"
					enterFrom="opacity-0 scale-95"
					enterTo="opacity-100 scale-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100 scale-100"
					leaveTo="opacity-0 scale-95"
				>
					<div className='fixed inset-0 bg-black/70 transition-opacity' />
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
							<Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-2xl shadow-gray-800 transition-all sm:my-8 sm:w-full sm:max-w-3xl'>
								<div
									className={
										'h-16 px-6 py-5  border-b border-gray-100 flex items-center justify-between'
									}
								>
									<h3 className={'text-lg font-semibold'}>Create New Expense</h3>
									<button
										className={
											'w-10 h-10 bg-gray-50 hover:bg-gray-100 transition-colors grid place-items-center rounded-full'
										}
										onClick={() => navigate(-1)}
									>
										<TimesIcon width={20} height={20} fillColor={'#191B1C'} />
									</button>
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
															<CurrencyInput
																className={`${
																	expenseCreateFormik.touched.amount &&
																	expenseCreateFormik.errors.amount &&
																	'focus:!ring-red-500 text-red-500 placeholder-red-500 !border-red-500'
																} text-sm font-semibold mt-2 rounded-lg block w-full p-2.5 outline-none bg-white border border-gray-100 placeholder-gray-400 text-gray-900`}
																value={expenseCreateFormik.values.amount}
																onValueChange={(_, __, values) => {
																	expenseCreateFormik.setFieldTouched('amount', true)
																	expenseCreateFormik.setFieldValue('amount', values?.value ?? 0)
																}}
																onChange={() => {}}
																suffix={' ₺'}
															/>
															{expenseCreateFormik.touched.amount &&
																expenseCreateFormik.errors.amount && (
																	<motion.p
																		initial={{ opacity: 0 }}
																		animate={{ opacity: 1 }}
																		exit={{ opacity: 0 }}
																		className='mt-2 text-sm text-red-600 font-semibold'
																	>
																		{expenseCreateFormik.errors.amount}
																	</motion.p>
																)}
														</div>
														<div className={'flex-1'}>{VaultSelect}</div>
													</div>
													<div className='md:col-span-5'>
														<LugatSelect
															label={'Expense Type'}
															value={expenseCreateFormik.values.type}
															onChange={(e) =>
																expenseCreateFormik.setFieldValue('type', e.target.value)
															}
															error={
																expenseCreateFormik.touched.type && expenseCreateFormik.errors.type
															}
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
														<label className={'block mb-2 text-sm font-semibold text-gray-900'}>
															Receipt Date
														</label>
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
								<div className='bg-white px-4 py-3 sm:flex sm:px-6 justify-between'>
									<LugatButton
										buttonClassNames={
											'bg-gray-50 !text-gray-900 hover:!bg-gray-100 !w-fit text-base'
										}
									>
										Cancel
									</LugatButton>
									<LugatButton
										ref={cancelButtonRef}
										onClick={() => navigate(-1)}
										buttonClassNames={'bg-green-600 !w-fit text-base'}
									>
										İçeri Aktar
									</LugatButton>
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
