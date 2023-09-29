import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getIn, useFormik } from 'formik'
import { Shape } from '@/helpers/types'
import { object, string } from 'yup'
import LugatButton from '@/components/form/LugatButton'
import toast, { LoaderIcon } from 'react-hot-toast'
import LugatAsyncSelect from '@/components/form/LugatAsyncSelect'
import LugatInput from '@/components/form/LugatInput'
import { StaffStoreFormType } from '@/types/staff-types'
import useStaffType from '@/hooks/useStaffType'
import { useStoreStaffMutation } from '@/services/api/staff-api'
import CurrencyInput from 'react-currency-input-field'
import { motion } from 'framer-motion'
import useLoadVault from '@/hooks/useLoadVault'

const StaffCreate: React.FC = () => {
	const navigate = useNavigate()
	const [storeStaff, { isLoading }] = useStoreStaffMutation()
	const { loadStaffTypes } = useStaffType()
	const { loadVaults } = useLoadVault()

	const staffCreateFormik = useFormik<StaffStoreFormType>({
		initialValues: {
			name: '',
			surname: '',
			phone: '',
			email: '',
			salary: 0,
			type: {
				label: 'Select',
				value: '-1',
			},
			salary_vault: {
				id: '-1',
				name: 'Select',
			},
		},
		validateOnBlur: false,
		validationSchema: object().shape<Shape<Partial<StaffStoreFormType>>>({
			name: string().label('Name').required().max(255),
			surname: string().label('Surname').required().max(255),
			email: string().label('Email').email().required().max(255),
			phone: string()
				.label('Phone')
				.required()
				.matches(
					/^((\+\d{1,3}([- ])?\(?\d\)?([- ])?\d{1,3})|(\(?\d{2,3}\)?))([- ])?(\d{3,4})([- ])?(\d{4})(( x| ext)\d{1,5})?$/,
					'Phone must be valid',
				),
			salary_vault: object()
				.label('Staff Type')
				.shape({
					id: string().required().notOneOf(['-1'], 'Staff Type must be selected'),
				}),
		}),
		onSubmit: (values) => {
			storeStaff({
				...values,
				salary_vault_id: values.salary_vault.id,
				type: values.type.value,
			})
				.unwrap()
				.then((_) => {
					toast.success('Staff stored')
					staffCreateFormik.resetForm()
					navigate(-1)
				})
				.catch((_) => {
					toast.error('Staff cant stored')
				})
		},
	})

	const goBack = () => {
		navigate(-1)
	}
	return (
		<div className='relative transform rounded-lg bg-white text-left shadow-2xl shadow-gray-100 transition-all pb-4'>
			<div className={'h-16 px-6 border-b border-gray-100 flex items-center justify-between'}>
				<h3 className={'text-lg font-semibold'}>
					Create New Staff{' '}
					<span className={'text-xs'}>
						(<span className={'text-red-700'}> *</span>
						required fields to be filled )
					</span>
				</h3>
			</div>
			<div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
				<div className='sm:flex sm:items-start'>
					<div className='mt-3 text-center sm:mt-0 sm:text-left w-full'>
						<div className='flex flex-1 grow'>
							<div className='flex flex-col flex-1 space-y-2'>
								<div className={'flex-1 flex flex-col space-y-4'}>
									<div className={'flex-1 flex space-x-2'}>
										<div className={'flex-1'}>
											<LugatInput
												required
												label={'Name'}
												value={staffCreateFormik.values.name}
												onChange={(e) => staffCreateFormik.setFieldValue('name', e.target.value)}
												error={staffCreateFormik.touched.name && staffCreateFormik.errors.name}
											/>
										</div>
										<div className={'flex-1'}>
											<LugatInput
												required
												label={'Surname'}
												value={staffCreateFormik.values.surname}
												onChange={(e) => staffCreateFormik.setFieldValue('surname', e.target.value)}
												error={
													staffCreateFormik.touched.surname && staffCreateFormik.errors.surname
												}
											/>
										</div>
									</div>
									<div className={'flex-1 flex space-x-2'}>
										<div className={'flex-1'}>
											<LugatInput
												required
												label={'Email'}
												value={staffCreateFormik.values.email}
												onChange={(e) => staffCreateFormik.setFieldValue('email', e.target.value)}
												error={staffCreateFormik.touched.email && staffCreateFormik.errors.email}
											/>
										</div>
										<div className={'flex-1'}>
											<LugatInput
												required
												label={'Phone'}
												value={staffCreateFormik.values.phone}
												onChange={(e) => staffCreateFormik.setFieldValue('phone', e.target.value)}
												error={staffCreateFormik.touched.phone && staffCreateFormik.errors.phone}
											/>
										</div>
									</div>
									<div className={'flex-1 flex space-x-2'}>
										<div className={'flex-1'}>
											<label className={'block mb-2 text-sm font-semibold text-gray-900'}>
												Salary
											</label>
											<CurrencyInput
												className={`${
													staffCreateFormik.touched.salary &&
													staffCreateFormik.errors.salary &&
													'focus:!ring-red-500 text-red-500 placeholder-red-500 !border-red-500'
												} text-sm font-semibold mt-2 rounded-lg block w-full p-2.5 outline-none bg-white border border-gray-100 placeholder-gray-400 text-gray-900`}
												value={staffCreateFormik.values.salary}
												onValueChange={(_, __, values) => {
													staffCreateFormik.setFieldTouched('salary', true)
													staffCreateFormik.setFieldValue('salary', values?.value ?? 0)
												}}
												onChange={() => {}}
											/>
											{staffCreateFormik.touched.salary && staffCreateFormik.errors.salary && (
												<motion.p
													initial={{ opacity: 0 }}
													animate={{ opacity: 1 }}
													exit={{ opacity: 0 }}
													className='mt-2 text-sm text-red-600 font-semibold'
												>
													{staffCreateFormik.errors.salary}
												</motion.p>
											)}
										</div>
										<div className={'flex-1'}>
											<LugatAsyncSelect
												error={
													getIn(staffCreateFormik.touched, 'salary_vault.id') &&
													getIn(staffCreateFormik.errors, 'salary_vault.id')
												}
												value={staffCreateFormik.values.salary_vault}
												getOptionLabel={(e: any) => e.name}
												getOptionValue={(e: any) => e.id}
												label={'Salary Vault'}
												additional={{
													page: 1,
												}}
												placeholder={'Select'}
												defaultOptions
												loadOptions={loadVaults}
												onChange={(value: any) => {
													staffCreateFormik.setFieldValue('salary_vault', value)
												}}
											/>
										</div>
									</div>
									<div className={'flex-1 flex space-x-2'}>
										<div className={'flex-1'}>
											<LugatAsyncSelect
												required
												error={staffCreateFormik.touched.type && staffCreateFormik.errors.type}
												value={staffCreateFormik.values.type}
												label={'Staff Type'}
												placeholder={'Select'}
												options={loadStaffTypes()}
												onChange={(value: any) => {
													staffCreateFormik.setFieldValue('type', value)
												}}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='bg-white px-4 py-3 sm:flex sm:px-6 justify-between'>
				<LugatButton
					onClick={goBack}
					buttonClassNames={'bg-gray-50 !text-gray-900 hover:!bg-gray-100 !w-fit text-base'}
				>
					Cancel
				</LugatButton>
				<LugatButton buttonClassNames={'!w-fit'} onClick={staffCreateFormik.submitForm}>
					{!isLoading ? 'Save' : <LoaderIcon />}
				</LugatButton>
			</div>
		</div>
	)
}

export default StaffCreate
