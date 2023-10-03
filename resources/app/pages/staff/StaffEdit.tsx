import React, { useEffect } from 'react'
import { Await, defer, useLoaderData, useNavigate, useParams } from 'react-router-dom'
import { getIn, useFormik } from 'formik'
import toast, { LoaderIcon } from 'react-hot-toast'
import { storeDispatch } from '@/store'
import LoaderComponent from '@/components/anims/LoaderComponent'
import { TrackedPromise } from '@remix-run/router/utils'
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
import Card from '@/components/card'
import SeperatedColumn from '@/components/SeperatedColumn'
import SeperatedRow from '@/components/form/SeperatedRow'
import LugatInput from '@/components/form/LugatInput'
import LugatCurrencyInput from '@/components/form/LugatCurrencyInput'
import LugatAsyncSelect from '@/components/form/LugatAsyncSelect'
import LugatButton from '@/components/form/LugatButton'

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
					salary_vault_id: values.salary_vault.value,
					type: values.type.value,
				},
				id: id ?? '',
			})
				.unwrap()
				.then((_) => {
					toast.success('Staff updated')
					staffUpdateFormik.resetForm()
					navigate('/staff/list')
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
						value: staff.salary_vault.id,
						label: staff.salary_vault.name,
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
										Update Staff{' '}
										<span className={'text-xs'}>
											(<span className={'text-red-700'}> *</span>
											required fields to be filled )
										</span>
									</h3>
								</Card.Header>
								<Card.Body>
									<SeperatedColumn>
										<SeperatedRow>
											<LugatInput
												required
												label={'Name'}
												value={staffUpdateFormik.values.name}
												onChange={(e) => staffUpdateFormik.setFieldValue('name', e.target.value)}
												error={staffUpdateFormik.touched.name && staffUpdateFormik.errors.name}
											/>
											<LugatInput
												required
												label={'Surname'}
												value={staffUpdateFormik.values.surname}
												onChange={(e) => staffUpdateFormik.setFieldValue('surname', e.target.value)}
												error={
													staffUpdateFormik.touched.surname && staffUpdateFormik.errors.surname
												}
											/>
										</SeperatedRow>
										<SeperatedRow>
											<LugatInput
												required
												label={'Email'}
												value={staffUpdateFormik.values.email}
												onChange={(e) => staffUpdateFormik.setFieldValue('email', e.target.value)}
												error={staffUpdateFormik.touched.email && staffUpdateFormik.errors.email}
											/>
											<LugatInput
												required
												label={'Phone'}
												value={staffUpdateFormik.values.phone}
												onChange={(e) => staffUpdateFormik.setFieldValue('phone', e.target.value)}
												error={staffUpdateFormik.touched.phone && staffUpdateFormik.errors.phone}
											/>
										</SeperatedRow>
										<SeperatedRow>
											<LugatCurrencyInput
												label={'Salary'}
												error={staffUpdateFormik.touched.salary && staffUpdateFormik.errors.salary}
												value={staffUpdateFormik.values.salary}
												onValueChange={(_, __, values) => {
													staffUpdateFormik.setFieldTouched('salary', true)
													staffUpdateFormik.setFieldValue('salary', values?.value ?? 0)
												}}
											/>
											<LugatAsyncSelect
												error={
													getIn(staffUpdateFormik.touched, 'salary_vault.value') &&
													getIn(staffUpdateFormik.errors, 'salary_vault.value')
												}
												value={staffUpdateFormik.values.salary_vault}
												label={'Salary Vault'}
												additional={{
													page: 1,
												}}
												defaultOptions
												loadOptions={loadVaults}
												onChange={(value: any) => {
													staffUpdateFormik.setFieldValue('salary_vault', value)
												}}
											/>
										</SeperatedRow>
										<LugatAsyncSelect
											required
											error={staffUpdateFormik.touched.type && staffUpdateFormik.errors.type}
											value={staffUpdateFormik.values.type}
											label={'Staff Type'}
											options={loadStaffTypes()}
											onChange={(value: any) => {
												staffUpdateFormik.setFieldValue('type', value)
											}}
										/>
									</SeperatedColumn>
								</Card.Body>
								<Card.Footer>
									<LugatButton onClick={staffUpdateFormik.submitForm}>
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

export default StaffEdit
