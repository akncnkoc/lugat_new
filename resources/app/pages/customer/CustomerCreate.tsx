import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getIn, useFormik } from 'formik'
import { Shape } from '@/helpers/types'
import { object, string } from 'yup'
import LugatButton from '@/components/form/LugatButton'
import toast, { LoaderIcon } from 'react-hot-toast'
import LugatAsyncSelect from '@/components/form/LugatAsyncSelect'
import { storeDispatch } from '@/store'
import LugatInput from '@/components/form/LugatInput'
import { useStoreCustomerMutation } from '@/services/api/customer-api'
import { CustomerStoreFormType, CustomerTypeDataType, CustomerTypeResource } from '@/types/customer'
import { customerType } from '@/services/api/customer-type-api'
import LugatTextarea from '@/components/form/LugatTextarea'

const CustomerCreate: React.FC = () => {
	const navigate = useNavigate()
	const [storeCustomer, { isLoading }] = useStoreCustomerMutation()

	const customerCreateFormik = useFormik<CustomerStoreFormType>({
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
			storeCustomer({
				...values,
				customer_type_id: values.customer_type.id,
				gender: values.gender.value,
			})
				.unwrap()
				.then((_) => {
					toast.success('Customer stored')
					customerCreateFormik.resetForm()
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

	return (
		<div className='relative transform rounded-lg bg-white text-left shadow-2xl shadow-gray-100 transition-all pb-4'>
			<div className={'h-16 px-6 border-b border-gray-100 flex items-center justify-between'}>
				<h3 className={'text-lg font-semibold'}>
					Create New Customer{' '}
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
												value={customerCreateFormik.values.name}
												onChange={(e) => customerCreateFormik.setFieldValue('name', e.target.value)}
												error={
													customerCreateFormik.touched.name && customerCreateFormik.errors.name
												}
											/>
										</div>
										<div className={'flex-1'}>
											<LugatInput
												required
												label={'Surname'}
												value={customerCreateFormik.values.surname}
												onChange={(e) =>
													customerCreateFormik.setFieldValue('surname', e.target.value)
												}
												error={
													customerCreateFormik.touched.surname &&
													customerCreateFormik.errors.surname
												}
											/>
										</div>
									</div>
									<div className={'flex-1 flex space-x-2'}>
										<div className={'flex-1'}>
											<LugatInput
												required
												label={'Email'}
												value={customerCreateFormik.values.email}
												onChange={(e) =>
													customerCreateFormik.setFieldValue('email', e.target.value)
												}
												error={
													customerCreateFormik.touched.email && customerCreateFormik.errors.email
												}
											/>
										</div>
										<div className={'flex-1'}>
											<LugatInput
												required
												label={'Phone'}
												value={customerCreateFormik.values.phone}
												onChange={(e) =>
													customerCreateFormik.setFieldValue('phone', e.target.value)
												}
												error={
													customerCreateFormik.touched.phone && customerCreateFormik.errors.phone
												}
											/>
										</div>
									</div>
									<div className={'flex-1 flex space-x-2'}>
										<div className={'flex-1'}>
											<LugatAsyncSelect
												required
												error={
													getIn(customerCreateFormik.touched, 'customer_type.id') &&
													getIn(customerCreateFormik.errors, 'customer_type.id')
												}
												value={customerCreateFormik.values.customer_type}
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
													customerCreateFormik.setFieldValue('customer_type', value)
												}}
											/>
										</div>
										<div className={'flex-1'}>
											<LugatAsyncSelect
												required
												error={
													getIn(customerCreateFormik.touched, 'gender.value') &&
													getIn(customerCreateFormik.errors, 'gender.value')
												}
												value={customerCreateFormik.values.gender}
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
													customerCreateFormik.setFieldValue('gender', value)
												}}
											/>
										</div>
									</div>
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
											onChange={(e) =>
												customerCreateFormik.setFieldValue('district', e.target.value)
											}
											error={
												customerCreateFormik.touched.district &&
												customerCreateFormik.errors.district
											}
										/>
										<LugatInput
											label={'Neighborhood'}
											value={customerCreateFormik.values.neighborhood}
											onChange={(e) =>
												customerCreateFormik.setFieldValue('neighborhood', e.target.value)
											}
											error={
												customerCreateFormik.touched.neighborhood &&
												customerCreateFormik.errors.neighborhood
											}
										/>
										<LugatInput
											label={'Post Code'}
											value={customerCreateFormik.values.post_code}
											onChange={(e) =>
												customerCreateFormik.setFieldValue('post_code', e.target.value)
											}
											error={
												customerCreateFormik.touched.post_code &&
												customerCreateFormik.errors.post_code
											}
										/>
									</div>
									<div>
										<LugatTextarea
											label={'Address'}
											value={customerCreateFormik.values.address}
											onChange={(e) =>
												customerCreateFormik.setFieldValue('address', e.target.value)
											}
											error={
												customerCreateFormik.touched.address && customerCreateFormik.errors.address
											}
										/>
									</div>
									<div>
										<LugatTextarea
											label={'Comment'}
											value={customerCreateFormik.values.comment}
											onChange={(e) =>
												customerCreateFormik.setFieldValue('comment', e.target.value)
											}
											error={
												customerCreateFormik.touched.comment && customerCreateFormik.errors.comment
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
					buttonClassNames={'bg-gray-50 !text-gray-900 hover:!bg-gray-100 !w-fit text-base'}
				>
					Cancel
				</LugatButton>
				<LugatButton buttonClassNames={'!w-fit'} onClick={customerCreateFormik.submitForm}>
					{!isLoading ? 'Save' : <LoaderIcon />}
				</LugatButton>
			</div>
		</div>
	)
}

export default CustomerCreate
