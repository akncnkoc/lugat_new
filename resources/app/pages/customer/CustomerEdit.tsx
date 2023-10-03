import React, { useEffect } from 'react'
import { Await, defer, useLoaderData, useNavigate, useParams } from 'react-router-dom'
import { getIn, useFormik } from 'formik'
import LugatButton from '@/components/form/LugatButton'
import toast, { LoaderIcon } from 'react-hot-toast'
import LugatAsyncSelect from '@/components/form/LugatAsyncSelect'
import { storeDispatch } from '@/store'
import LoaderComponent from '@/components/anims/LoaderComponent'
import { TrackedPromise } from '@remix-run/router/utils'
import LugatInput from '@/components/form/LugatInput'
import { customerApi, useUpdateCustomerMutation } from '@/services/api/customer-api'
import {
	CustomerDataType,
	CustomerStoreFormInitialValues,
	CustomerStoreFormType,
} from '@/types/customer-types'
import LugatTextarea from '@/components/form/LugatTextarea'
import useCustomerType from '@/hooks/useCustomerType'
import { CustomerEditValidationSchema } from '@/helpers/schemas'
import Card from '@/components/card'
import SeperatedRow from '@/components/form/SeperatedRow'
import SeperatedColumn from '@/components/SeperatedColumn'

export const customerLoader = async ({ params }: any) => {
	const results = storeDispatch(customerApi.endpoints?.getCustomer.initiate(params.id ?? '')).then(
		(res) => res.data?.data,
	)
	return defer({
		results: results,
	})
}

const CustomerEdit: React.FC = () => {
	const navigate = useNavigate()
	const { id } = useParams<'id'>()
	const data = useLoaderData() as {
		results: TrackedPromise
	}
	const [updateCustomer, { isLoading }] = useUpdateCustomerMutation()
	const { loadCustomerTypes } = useCustomerType()

	const customerUpdateFormik = useFormik<CustomerStoreFormType>({
		initialValues: CustomerStoreFormInitialValues,
		validateOnBlur: false,
		validationSchema: CustomerEditValidationSchema,
		onSubmit: (values) => {
			updateCustomer({
				body: {
					...values,
					customer_type_id: values.customer_type.value,
					gender: values.gender.value,
				},
				id: id ?? '',
			})
				.unwrap()
				.then((_) => {
					toast.success('Customer updated')
					customerUpdateFormik.resetForm()
					navigate('/customer/list')
				})
				.catch((_) => {
					toast.error('Customer cant stored')
				})
		},
	})
	useEffect(() => {
		if (data) {
			data.results.then((customer: CustomerDataType) => {
				customerUpdateFormik.setValues({
					name: customer.name,
					surname: customer.surname,
					email: customer.email,
					phone: customer.phone,
					city: customer.city,
					district: customer.district,
					neighborhood: customer.neighborhood,
					customer_type: {
						label: customer.customer_type.name,
						value: customer.customer_type.id,
					},
					address: customer.address,
					gender: {
						label: customer.gender === 0 ? 'Male' : 'Female',
						value: customer.gender === 0 ? '0' : '1',
					},
					post_code: customer.post_code,
					comment: customer.comment,
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
										Update Customer{' '}
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
												value={customerUpdateFormik.values.name}
												onChange={(e) => customerUpdateFormik.setFieldValue('name', e.target.value)}
												error={
													customerUpdateFormik.touched.name && customerUpdateFormik.errors.name
												}
											/>
											<LugatInput
												required
												label={'Surname'}
												value={customerUpdateFormik.values.surname}
												onChange={(e) =>
													customerUpdateFormik.setFieldValue('surname', e.target.value)
												}
												error={
													customerUpdateFormik.touched.surname &&
													customerUpdateFormik.errors.surname
												}
											/>
										</SeperatedRow>
										<SeperatedRow>
											<LugatInput
												required
												label={'Email'}
												value={customerUpdateFormik.values.email}
												onChange={(e) =>
													customerUpdateFormik.setFieldValue('email', e.target.value)
												}
												error={
													customerUpdateFormik.touched.email && customerUpdateFormik.errors.email
												}
											/>
											<LugatInput
												required
												label={'Phone'}
												value={customerUpdateFormik.values.phone}
												onChange={(e) =>
													customerUpdateFormik.setFieldValue('phone', e.target.value)
												}
												error={
													customerUpdateFormik.touched.phone && customerUpdateFormik.errors.phone
												}
											/>
										</SeperatedRow>
										<SeperatedRow>
											<LugatAsyncSelect
												required
												error={
													getIn(customerUpdateFormik.touched, 'customer_type.value') &&
													getIn(customerUpdateFormik.errors, 'customer_type.value')
												}
												value={customerUpdateFormik.values.customer_type}
												label={'Customer Type'}
												additional={{
													page: 1,
												}}
												placeholder={'Select'}
												defaultOptions
												loadOptions={loadCustomerTypes}
												onChange={(value: any) => {
													customerUpdateFormik.setFieldValue('customer_type', value)
												}}
											/>
											<LugatAsyncSelect
												required
												error={
													getIn(customerUpdateFormik.touched, 'gender.value') &&
													getIn(customerUpdateFormik.errors, 'gender.value')
												}
												value={customerUpdateFormik.values.gender}
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
													customerUpdateFormik.setFieldValue('gender', value)
												}}
											/>
										</SeperatedRow>
										<div className={'grid grid-cols-4 gap-x-2'}>
											<LugatInput
												label={'City'}
												value={customerUpdateFormik.values.city}
												onChange={(e) => customerUpdateFormik.setFieldValue('city', e.target.value)}
												error={
													customerUpdateFormik.touched.city && customerUpdateFormik.errors.city
												}
											/>
											<LugatInput
												label={'District'}
												value={customerUpdateFormik.values.district}
												onChange={(e) =>
													customerUpdateFormik.setFieldValue('district', e.target.value)
												}
												error={
													customerUpdateFormik.touched.district &&
													customerUpdateFormik.errors.district
												}
											/>
											<LugatInput
												label={'Neighborhood'}
												value={customerUpdateFormik.values.neighborhood}
												onChange={(e) =>
													customerUpdateFormik.setFieldValue('neighborhood', e.target.value)
												}
												error={
													customerUpdateFormik.touched.neighborhood &&
													customerUpdateFormik.errors.neighborhood
												}
											/>
											<LugatInput
												label={'Post Code'}
												value={customerUpdateFormik.values.post_code}
												onChange={(e) =>
													customerUpdateFormik.setFieldValue('post_code', e.target.value)
												}
												error={
													customerUpdateFormik.touched.post_code &&
													customerUpdateFormik.errors.post_code
												}
											/>
										</div>
										<div>
											<LugatTextarea
												label={'Address'}
												value={customerUpdateFormik.values.address}
												onChange={(e) =>
													customerUpdateFormik.setFieldValue('address', e.target.value)
												}
												error={
													customerUpdateFormik.touched.address &&
													customerUpdateFormik.errors.address
												}
											/>
										</div>
										<div>
											<LugatTextarea
												label={'Comment'}
												value={customerUpdateFormik.values.comment}
												onChange={(e) =>
													customerUpdateFormik.setFieldValue('comment', e.target.value)
												}
												error={
													customerUpdateFormik.touched.comment &&
													customerUpdateFormik.errors.comment
												}
											/>
										</div>
									</SeperatedColumn>
								</Card.Body>
								<Card.Footer>
									<LugatButton
										buttonClassNames={'!w-fit'}
										onClick={customerUpdateFormik.submitForm}
									>
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

export default CustomerEdit
