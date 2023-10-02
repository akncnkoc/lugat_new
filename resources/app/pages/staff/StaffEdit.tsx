import React, { useEffect } from 'react'
import { Await, defer, useLoaderData, useNavigate, useParams } from 'react-router-dom'
import { getIn, useFormik } from 'formik'
import LugatButton from '@/components/form/LugatButton'
import toast, { LoaderIcon } from 'react-hot-toast'
import LugatAsyncSelect from '@/components/form/LugatAsyncSelect'
import { storeDispatch } from '@/store'
import LoaderComponent from '@/components/LoaderComponent'
import { TrackedPromise } from '@remix-run/router/utils'
import LugatInput from '@/components/form/LugatInput'
import { staffApi, useUpdateStaffMutation } from '@/services/api/staff-api'
import {
	StaffDataType,
	StaffStoreFormType,
	StaffStoreInitialValues,
	StaffTypeData,
} from '@/types/staff-types'
import useStaffType from '@/hooks/useStaffType'
import useLoadVault from '@/hooks/useLoadVault'
import { StaffEditValidationSchema } from '@/helpers/schemas'
import LugatCurrencyInput from '@/components/LugatCurrencyInput'

export const staffLoader = async ({ params }: any) => {
	const results = storeDispatch(staffApi.endpoints?.getStaff.initiate(params.id ?? '')).then(
		(res) => res.data?.data,
	)
	return defer({
		results: results,
	})
}

const StaffEdit: React.FC = () => {
	const navigate = useNavigate()
	const { id } = useParams<'id'>()
	const data = useLoaderData() as {
		results: TrackedPromise
	}
	const [updateStaff, { isLoading }] = useUpdateStaffMutation()
	const { loadStaffTypes } = useStaffType()
	const { loadVaults } = useLoadVault()
	const staffUpdateFormik = useFormik<StaffStoreFormType>({
		initialValues: StaffStoreInitialValues,
		validateOnBlur: false,
		validationSchema: StaffEditValidationSchema,
		onSubmit: (values) => {
			updateStaff({
				body: {
					...values,
					salary_vault_id: values.salary_vault.id,
					type: values.type.value,
				},
				id: id ?? '',
			})
				.unwrap()
				.then((_) => {
					toast.success('Staff updated')
					staffUpdateFormik.resetForm()
					navigate(-1)
				})
				.catch((_) => {
					toast.error('Staff cant stored')
				})
		},
	})
	useEffect(() => {
		if (data) {
			data.results.then((staff: StaffDataType) => {
				staffUpdateFormik.setValues({
					name: staff.name,
					surname: staff.surname,
					email: staff.email,
					phone: staff.phone,
					salary: staff.salary,
					salary_vault: {
						id: staff.salary_vault.id,
						name: staff.salary_vault.name,
					},
					type: {
						label: StaffTypeData[staff.type as keyof typeof StaffTypeData],
						value: staff.type,
					},
				})
			})
		}
	}, [data])

	return (
		<div className='relative transform rounded-lg bg-white text-left shadow-2xl shadow-gray-100 transition-all tablet:max-w-7xl tablet:mx-auto'>
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
									<h3 className={'text-lg font-semibold'}>
										Update Staff{' '}
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
																	value={staffUpdateFormik.values.name}
																	onChange={(e) =>
																		staffUpdateFormik.setFieldValue('name', e.target.value)
																	}
																	error={
																		staffUpdateFormik.touched.name && staffUpdateFormik.errors.name
																	}
																/>
															</div>
															<div className={'flex-1'}>
																<LugatInput
																	required
																	label={'Surname'}
																	value={staffUpdateFormik.values.surname}
																	onChange={(e) =>
																		staffUpdateFormik.setFieldValue('surname', e.target.value)
																	}
																	error={
																		staffUpdateFormik.touched.surname &&
																		staffUpdateFormik.errors.surname
																	}
																/>
															</div>
														</div>
														<div className={'flex-1 flex space-x-2'}>
															<div className={'flex-1'}>
																<LugatInput
																	required
																	label={'Email'}
																	value={staffUpdateFormik.values.email}
																	onChange={(e) =>
																		staffUpdateFormik.setFieldValue('email', e.target.value)
																	}
																	error={
																		staffUpdateFormik.touched.email &&
																		staffUpdateFormik.errors.email
																	}
																/>
															</div>
															<div className={'flex-1'}>
																<LugatInput
																	required
																	label={'Phone'}
																	value={staffUpdateFormik.values.phone}
																	onChange={(e) =>
																		staffUpdateFormik.setFieldValue('phone', e.target.value)
																	}
																	error={
																		staffUpdateFormik.touched.phone &&
																		staffUpdateFormik.errors.phone
																	}
																/>
															</div>
														</div>
														<div className={'flex-1 flex space-x-2'}>
															<div className={'flex-1'}>
																<LugatCurrencyInput
																	label={'Salary'}
																	required
																	error={
																		staffUpdateFormik.touched.salary &&
																		staffUpdateFormik.errors.salary
																	}
																	value={staffUpdateFormik.values.salary}
																	onValueChange={(_, __, values) => {
																		staffUpdateFormik.setFieldTouched('salary', true)
																		staffUpdateFormik.setFieldValue('salary', values?.value ?? 0)
																	}}
																/>
															</div>
															<div className={'flex-1'}>
																<LugatAsyncSelect
																	error={
																		getIn(staffUpdateFormik.touched, 'salary_vault.id') &&
																		getIn(staffUpdateFormik.errors, 'salary_vault.id')
																	}
																	value={staffUpdateFormik.values.salary_vault}
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
																		staffUpdateFormik.setFieldValue('salary_vault', value)
																	}}
																/>
															</div>
														</div>
														<div className={'flex-1 flex space-x-2'}>
															<div className={'flex-1'}>
																<LugatAsyncSelect
																	required
																	error={
																		staffUpdateFormik.touched.type && staffUpdateFormik.errors.type
																	}
																	value={staffUpdateFormik.values.type}
																	label={'Staff Type'}
																	placeholder={'Select'}
																	options={loadStaffTypes()}
																	onChange={(value: any) => {
																		staffUpdateFormik.setFieldValue('type', value)
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
								<div className='bg-white p-4 flex justify-end border-t border-gray-50 rounded-bl-2xl rounded-br-2xl'>
									<LugatButton onClick={staffUpdateFormik.submitForm}>
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

export default StaffEdit
