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
import LugatCurrencyInput from '@/components/form/LugatCurrencyInput'
import Card from '@/components/card'
import SeperatedColumn from '@/components/SeperatedColumn'
import SeperatedRow from '@/components/form/SeperatedRow'

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
				salary_vault_id: values.salary_vault.value,
				type: values.type.value,
			})
				.unwrap()
				.then((_) => {
					toast.success('Staff stored')
					staffCreateFormik.resetForm()
					navigate('/staff/list')
				})
				.catch((_) => {
					toast.error('Staff cant stored')
				})
		},
	})
	return (
		<Card>
			<Card.Header>
				<h3 className={'text-lg font-semibold'}>
					Create New Staff{' '}
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
							value={staffCreateFormik.values.name}
							onChange={(e) => staffCreateFormik.setFieldValue('name', e.target.value)}
							error={staffCreateFormik.touched.name && staffCreateFormik.errors.name}
						/>
						<LugatInput
							required
							label={'Surname'}
							value={staffCreateFormik.values.surname}
							onChange={(e) => staffCreateFormik.setFieldValue('surname', e.target.value)}
							error={staffCreateFormik.touched.surname && staffCreateFormik.errors.surname}
						/>
					</SeperatedRow>
					<SeperatedRow>
						<LugatInput
							required
							label={'Email'}
							value={staffCreateFormik.values.email}
							onChange={(e) => staffCreateFormik.setFieldValue('email', e.target.value)}
							error={staffCreateFormik.touched.email && staffCreateFormik.errors.email}
						/>
						<LugatInput
							required
							label={'Phone'}
							value={staffCreateFormik.values.phone}
							onChange={(e) => staffCreateFormik.setFieldValue('phone', e.target.value)}
							error={staffCreateFormik.touched.phone && staffCreateFormik.errors.phone}
						/>
					</SeperatedRow>
					<SeperatedRow>
						<LugatCurrencyInput
							label={'Salary'}
							error={staffCreateFormik.touched.salary && staffCreateFormik.errors.salary}
							value={staffCreateFormik.values.salary}
							onValueChange={(_, __, values) => {
								staffCreateFormik.setFieldTouched('salary', true)
								staffCreateFormik.setFieldValue('salary', values?.value ?? 0)
							}}
						/>
						<LugatAsyncSelect
							error={
								getIn(staffCreateFormik.touched, 'salary_vault.value') &&
								getIn(staffCreateFormik.errors, 'salary_vault.value')
							}
							value={staffCreateFormik.values.salary_vault}
							label={'Salary Vault'}
							additional={{
								page: 1,
							}}
							defaultOptions
							loadOptions={loadVaults}
							onChange={(value: any) => {
								staffCreateFormik.setFieldValue('salary_vault', value)
							}}
						/>
					</SeperatedRow>
					<LugatAsyncSelect
						required
						error={staffCreateFormik.touched.type && staffCreateFormik.errors.type}
						value={staffCreateFormik.values.type}
						label={'Staff Type'}
						options={loadStaffTypes()}
						onChange={(value: any) => {
							staffCreateFormik.setFieldValue('type', value)
						}}
					/>
				</SeperatedColumn>
			</Card.Body>
			<Card.Footer>
				<LugatButton onClick={staffCreateFormik.submitForm}>
					{!isLoading ? 'Save' : <LoaderIcon />}
				</LugatButton>
			</Card.Footer>
		</Card>
	)
}

export default StaffCreate
