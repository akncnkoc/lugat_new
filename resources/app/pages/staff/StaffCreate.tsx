import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getIn, useFormik } from 'formik'
import LugatButton from '@/components/form/LugatButton'
import toast, { LoaderIcon } from 'react-hot-toast'
import LugatAsyncSelect from '@/components/form/LugatAsyncSelect'
import LugatInput from '@/components/form/LugatInput'
import { StaffStoreFormType, StaffStoreInitialValues } from '@/types/staff-types'
import useStaffType from '@/hooks/useStaffType'
import { useStoreStaffMutation } from '@/services/api/staff-api'
import useLoadVault from '@/hooks/useLoadVault'
import { StaffCreateValidationSchema } from '@/helpers/schemas'
import LugatCurrencyInput from '@/components/LugatCurrencyInput'

const StaffCreate: React.FC = () => {
	const navigate = useNavigate()
	const [storeStaff, { isLoading }] = useStoreStaffMutation()
	const { loadStaffTypes } = useStaffType()
	const { loadVaults } = useLoadVault()

	const staffCreateFormik = useFormik<StaffStoreFormType>({
		initialValues: StaffStoreInitialValues,
		validateOnBlur: false,
		validationSchema: StaffCreateValidationSchema,
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
	return (
		<div className='relative transform rounded-lg bg-white text-left shadow-2xl shadow-gray-100 transition-all overflow-hidden tablet:max-w-7xl tablet:mx-auto'>
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
											<LugatCurrencyInput
												label={'Salary'}
												required
												error={staffCreateFormik.touched.salary && staffCreateFormik.errors.salary}
												value={staffCreateFormik.values.salary}
												onValueChange={(_, __, values) => {
													staffCreateFormik.setFieldTouched('salary', true)
													staffCreateFormik.setFieldValue('salary', values?.value ?? 0)
												}}
											/>
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
			<div className='bg-white p-4 flex justify-end border-t border-gray-100'>
				<LugatButton onClick={staffCreateFormik.submitForm}>
					{!isLoading ? 'Save' : <LoaderIcon />}
				</LugatButton>
			</div>
		</div>
	)
}

export default StaffCreate
