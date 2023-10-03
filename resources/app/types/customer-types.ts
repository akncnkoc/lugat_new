import { CollectionDataType, DefaultResponseCollectionType } from '@/helpers/types'

export type CustomerDataType = {
	id: string
	name: string
	surname: string
	full_name: string
	phone: string
	email: string
	gender: number
	customer_type: CustomerTypeDataType
	city: string
	district: string
	neighborhood: string
	post_code: string
	address: string
	comment: string
}

export type CustomerStoreFormType = {
	name: string
	surname: string
	phone: string
	email: string
	gender: {
		label: string
		value: string
	}
	customer_type: {
		label: string
		value: string
	}
	city: string
	district: string
	neighborhood: string
	post_code: string
	address: string
	comment: string
}
export const CustomerStoreFormInitialValues: CustomerStoreFormType = {
	name: '',
	surname: '',
	phone: '',
	email: '',
	customer_type: {
		value: '-1',
		label: 'Select',
	},
	city: '',
	district: '',
	address: '',
	neighborhood: '',
	gender: {
		label: 'Select',
		value: '-1',
	},
	post_code: '',
	comment: '',
}

export type CustomerTypeDataType = {
	id: string
	name: string
}

export type CustomerStoreType = {
	name: string
	surname: string
	phone: string
	email: string
	gender: string
	customer_type_id: string
	city: string
	post_code: string
	district: string
	neighborhood: string
	address: string
	comment: string
}

export type CustomerSingleResource = DefaultResponseCollectionType<CustomerDataType>
export type CustomerResource = CollectionDataType<CustomerDataType>
export type CustomerTypeResource = CollectionDataType<CustomerTypeDataType>
