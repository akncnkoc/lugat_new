import React, { useEffect } from 'react'
import { Await, defer, useLoaderData, useNavigate, useParams } from 'react-router-dom'
import { getIn, useFormik } from 'formik'
import { Shape } from '@/helpers/types'
import { object, string } from 'yup'
import LugatButton from '@/components/form/LugatButton'
import toast, { LoaderIcon } from 'react-hot-toast'
import LugatAsyncSelect from '@/components/form/LugatAsyncSelect'
import { storeDispatch } from '@/store'
import LoaderComponent from '@/components/LoaderComponent'
import { TrackedPromise } from '@remix-run/router/utils'
import LugatInput from '@/components/form/LugatInput'
import { customerApi, useUpdateCustomerMutation } from '@/services/api/customer-api'
import {
	CustomerDataType,
	CustomerStoreFormType,
	CustomerTypeDataType,
	CustomerTypeResource,
} from '@/types/customer-types'
import { customerType } from '@/services/api/customer-type-api'
import LugatTextarea from '@/components/form/LugatTextarea'

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
	const customerUpdateFormik = useFormik<CustomerStoreFormType>({
		initialValues: {
			name: '',
			surname: '',
			phone: '',
			email: '',
			customer_type: {
				id: '-1',
				name: 'Select',
			},
			city: '',
			district: '',
			address: '',
			neighborhood: '',
			gender: {
				label: '-1',
				value: 'Select',
			},
			post_code: '',
			comment: '',
		},
		validateOnBlur: false,
		validationSchema: object().shape<Shape<Partial<CustomerStoreFormType>>>({
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
			customer_type: object()
				.label('Customer Type')
				.shape({
					id: string().required().notOneOf(['-1'], 'Customer Type must be selected'),
				}),
		}),
		onSubmit: (values) => {
			updateCustomer({
				body: {
					...values,
					...values,
					customer_type_id: values.customer_type.id,
					gender: values.gender.value,
				},
				id: id ?? '',
			})
				.unwrap()
				.then((_) => {
					toast.success('Customer updated')
					customerUpdateFormik.resetForm()
					navigate(-1)
				})
				.catch((_) => {
					toast.error('Customer cant stored')
				})
		},
	})

	const goBack = () => {
		navigate(-1)
	}
	const loadCustomerTypes = async (search: string, _: any, { page }: any) => {
		const response = (await storeDispatch(
			customerType.endpoints?.getCustomerTypes.initiate({ page, search }),
		).then((res) => res.data)) as CustomerTypeResource
		const responseJSON = response.data.map((customerType: CustomerTypeDataType) => ({
			id: customerType.id,
			name: customerType.name,
		}))

		return {
			options: responseJSON,
			hasMore: response.meta.last_page > response.meta.current_page,
			additional: {
				page: page + 1,
			},
		}
	}
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
					customer_type: customer.customer_type,
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
		<div className='relative transform rounded-lg bg-white text-left shadow-2xl shadow-gray-100 transition-all pb-4'>
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
										Update Customer{' '}
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
																	value={customerUpdateFormik.values.name}
																	onChange={(e) =>
																		customerUpdateFormik.setFieldValue('name', e.target.value)
																	}
																	error={
																		customerUpdateFormik.touched.name &&
																		customerUpdateFormik.errors.name
																	}
																/>
															</div>
															<div className={'flex-1'}>
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
															</div>
														</div>
														<div className={'flex-1 flex space-x-2'}>
															<div className={'flex-1'}>
																<LugatInput
																	required
																	label={'Email'}
																	value={customerUpdateFormik.values.email}
																	onChange={(e) =>
																		customerUpdateFormik.setFieldValue('email', e.target.value)
																	}
																	error={
																		customerUpdateFormik.touched.email &&
																		customerUpdateFormik.errors.email
																	}
																/>
															</div>
															<div className={'flex-1'}>
																<LugatInput
																	required
																	label={'Phone'}
																	value={customerUpdateFormik.values.phone}
																	onChange={(e) =>
																		customerUpdateFormik.setFieldValue('phone', e.target.value)
																	}
																	error={
																		customerUpdateFormik.touched.phone &&
																		customerUpdateFormik.errors.phone
																	}
																/>
															</div>
														</div>
														<div className={'flex-1 flex space-x-2'}>
															<div className={'flex-1'}>
																<LugatAsyncSelect
																	required
																	error={
																		getIn(customerUpdateFormik.touched, 'customer_type.id') &&
																		getIn(customerUpdateFormik.errors, 'customer_type.id')
																	}
																	value={customerUpdateFormik.values.customer_type}
																	getOptionLabel={(e: any) => e.name}
																	getOptionValue={(e: any) => e.id}
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
															</div>
															<div className={'flex-1'}>
																<LugatAsyncSelect
																	required
																	error={
																		getIn(customerUpdateFormik.touched, 'gender.value') &&
																		getIn(customerUpdateFormik.errors, 'gender.value')
																	}
																	value={customerUpdateFormik.values.gender}
																	getOptionLabel={(e: any) => e.label}
																	getOptionValue={(e: any) => e.value}
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
															</div>
														</div>
														<div className={'grid grid-cols-4 gap-x-2'}>
															<LugatInput
																label={'City'}
																value={customerUpdateFormik.values.city}
																onChange={(e) =>
																	customerUpdateFormik.setFieldValue('city', e.target.value)
																}
																error={
																	customerUpdateFormik.touched.city &&
																	customerUpdateFormik.errors.city
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
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className='bg-white px-4 py-3 sm:flex sm:px-6 justify-between'>
									<LugatButton
										onClick={goBack}
										buttonClassNames={
											'bg-gray-50 !text-gray-900 hover:!bg-gray-100 !w-fit text-base'
										}
									>
										Cancel
									</LugatButton>
									<LugatButton
										buttonClassNames={'!w-fit'}
										onClick={customerUpdateFormik.submitForm}
									>
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

export default CustomerEdit
