import {
	CollectionDataType,
	CurrencyDataType,
	DefaultResponseCollectionType,
	SelectOption,
} from '@/helpers/types'

export enum StaffTypeData {
	full_time = 'Full Time',
	part_time = 'Part Time',
	temporary = 'Temporary',
	seasonal = 'Seasonal',
}

export type StaffDataType = {
	id: string
	name: string
	surname: string
	full_name: string
	phone: string
	email: string
	salary: number
	salary_currency: CurrencyDataType
	type: keyof typeof StaffTypeData | '-1'
}

export type StaffStoreFormType = {
	name: string
	surname: string
	phone: string
	email: string
	salary: number
	salary_currency: SelectOption
	type: {
		label: string
		value: keyof typeof StaffTypeData | '-1'
	}
}
export const StaffStoreInitialValues: StaffStoreFormType = {
	name: '',
	surname: '',
	phone: '',
	email: '',
	salary: 0,
	type: {
		label: 'Select',
		value: '-1',
	},
	salary_currency: {
		value: '-1',
		label: 'Select',
	},
}

export type StaffStoreType = {
	name: string
	surname: string
	phone: string
	email: string
	salary: number
	salary_currency_id: string
	type: string
}

export type StaffSingleResource = DefaultResponseCollectionType<StaffDataType>
export type StaffResource = CollectionDataType<StaffDataType>
