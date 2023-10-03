import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getIn, useFormik } from 'formik'
import LugatButton from '@/components/form/LugatButton'
import toast, { LoaderIcon } from 'react-hot-toast'
import LugatAsyncSelect from '@/components/form/LugatAsyncSelect'
import LugatInput from '@/components/form/LugatInput'
import { useStoreCustomerMutation } from '@/services/api/customer-api'
import { CustomerStoreFormInitialValues, CustomerStoreFormType } from '@/types/customer-types'
import LugatTextarea from '@/components/form/LugatTextarea'
import useCustomerType from '@/hooks/useCustomerType'
import { CustomerCreateValidationSchema } from '@/helpers/schemas'
import Card from '@/components/card'
import SeperatedColumn from '@/components/SeperatedColumn'
import SeperatedRow from '@/components/form/SeperatedRow'

const CustomerCreate: React.FC = () => {
	const navigate = useNavigate()
	const [storeCustomer, { isLoading }] = useStoreCustomerMutation()
	const { loadCustomerTypes } = useCustomerType()

	const customerCreateFormik = useFormik<CustomerStoreFormType>({
		initialValues: CustomerStoreFormInitialValues,
		validateOnBlur: false,
		validationSchema: CustomerCreateValidationSchema,
		onSubmit: (values) => {
			storeCustomer({
				...values,
				customer_type_id: values.customer_type.value,
				gender: values.gender.value,
			})
				.unwrap()
				.then((_) => {
					toast.success('Customer stored')
					customerCreateFormik.resetForm()
					navigate('/customer/list')
				})
				.catch((_) => {
					toast.error('Customer cant stored')
				})
		},
	})
	return (
		<Card>
			<Card.Header>
				<h3 className={'text-lg font-semibold'}>
					Create New Customer{' '}
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
							value={customerCreateFormik.values.name}
							onChange={(e) => customerCreateFormik.setFieldValue('name', e.target.value)}
							error={customerCreateFormik.touched.name && customerCreateFormik.errors.name}
						/>
						<LugatInput
							required
							label={'Surname'}
							value={customerCreateFormik.values.surname}
							onChange={(e) => customerCreateFormik.setFieldValue('surname', e.target.value)}
							error={customerCreateFormik.touched.surname && customerCreateFormik.errors.surname}
						/>
					</SeperatedRow>
					<SeperatedRow>
						<LugatInput
							required
							label={'Email'}
							value={customerCreateFormik.values.email}
							onChange={(e) => customerCreateFormik.setFieldValue('email', e.target.value)}
							error={customerCreateFormik.touched.email && customerCreateFormik.errors.email}
						/>
						<LugatInput
							required
							label={'Phone'}
							value={customerCreateFormik.values.phone}
							onChange={(e) => customerCreateFormik.setFieldValue('phone', e.target.value)}
							error={customerCreateFormik.touched.phone && customerCreateFormik.errors.phone}
						/>
					</SeperatedRow>
					<SeperatedRow>
						<LugatAsyncSelect
							required
							error={
								getIn(customerCreateFormik.touched, 'customer_type.id') &&
								getIn(customerCreateFormik.errors, 'customer_type.id')
							}
							value={customerCreateFormik.values.customer_type}
							label={'Customer Type'}
							additional={{
								page: 1,
							}}
							placeholder={'Select'}
							defaultOptions
							loadOptions={loadCustomerTypes}
							onChange={(value: any) => {
								customerCreateFormik.setFieldValue('customer_type', value)
							}}
						/>
						<LugatAsyncSelect
							required
							error={
								getIn(customerCreateFormik.touched, 'gender.value') &&
								getIn(customerCreateFormik.errors, 'gender.value')
							}
							value={customerCreateFormik.values.gender}
							label={'Gender'}
							additional={{
								page: 1,
							}}
							placeholder={'Select'}
							options={[
								{
									label: 'Male',
									value: '0',
								},
								{
									label: 'Female',
									value: '1',
								},
							]}
							onChange={(value: any) => {
								customerCreateFormik.setFieldValue('gender', value)
							}}
						/>
					</SeperatedRow>
					<div className={'grid grid-cols-4 gap-x-2'}>
						<LugatInput
							label={'City'}
							value={customerCreateFormik.values.city}
							onChange={(e) => customerCreateFormik.setFieldValue('city', e.target.value)}
							error={customerCreateFormik.touched.city && customerCreateFormik.errors.city}
						/>
						<LugatInput
							label={'District'}
							value={customerCreateFormik.values.district}
							onChange={(e) => customerCreateFormik.setFieldValue('district', e.target.value)}
							error={customerCreateFormik.touched.district && customerCreateFormik.errors.district}
						/>
						<LugatInput
							label={'Neighborhood'}
							value={customerCreateFormik.values.neighborhood}
							onChange={(e) => customerCreateFormik.setFieldValue('neighborhood', e.target.value)}
							error={
								customerCreateFormik.touched.neighborhood &&
								customerCreateFormik.errors.neighborhood
							}
						/>
						<LugatInput
							label={'Post Code'}
							value={customerCreateFormik.values.post_code}
							onChange={(e) => customerCreateFormik.setFieldValue('post_code', e.target.value)}
							error={
								customerCreateFormik.touched.post_code && customerCreateFormik.errors.post_code
							}
						/>
					</div>
					<div>
						<LugatTextarea
							label={'Address'}
							value={customerCreateFormik.values.address}
							onChange={(e) => customerCreateFormik.setFieldValue('address', e.target.value)}
							error={customerCreateFormik.touched.address && customerCreateFormik.errors.address}
						/>
					</div>
					<div>
						<LugatTextarea
							label={'Comment'}
							value={customerCreateFormik.values.comment}
							onChange={(e) => customerCreateFormik.setFieldValue('comment', e.target.value)}
							error={customerCreateFormik.touched.comment && customerCreateFormik.errors.comment}
						/>
					</div>
				</SeperatedColumn>
			</Card.Body>
			<Card.Footer>
				<LugatButton onClick={customerCreateFormik.submitForm}>
					{!isLoading ? 'Save' : <LoaderIcon />}
				</LugatButton>
			</Card.Footer>
		</Card>
	)
}

export default CustomerCreate
