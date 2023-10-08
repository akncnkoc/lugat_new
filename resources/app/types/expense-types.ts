import {
	CollectionDataType,
	CurrencyDataType,
	DefaultResponseCollectionType,
	SelectOption,
} from '@/helpers/types'

export enum ExpenseTypeData {
	food = 'Food & Drinks',
	rent = 'Rent',
	phone = 'Phone',
	internet = 'Internet',
	water = 'Water',
	heating = 'Natural Gas',
	advertising = 'Advertising',
	promotion = 'Promotion',
	accounting = 'Accounting',
	maintenance_or_repair = 'Maintenance Or Repair',
	supplies = 'Supplies',
	lawyer = 'Lawyer',
	transport = 'Transport',
	travel = 'Travel',
}

export type ExpenseStoreType = {
	amount: number
	receipt_date: Date | null
	currency_id: string
	type: keyof typeof ExpenseTypeData | '-1'
	comment?: string | null
}

export type ExpenseDataType = {
	id: string
	amount: number
	currency: CurrencyDataType
	comment: string | null
	receipt_date: Date
	type: keyof typeof ExpenseTypeData
}

export type ExpenseStoreFormType = {
	amount: number
	currency: SelectOption
	type: SelectOption
	comment: string | null
	receipt_date: Date | null
}

export const ExpenseStoreInitialValues: ExpenseStoreFormType = {
	amount: 0,
	type: { value: '-1', label: 'Select' },
	comment: '',
	receipt_date: new Date(),
	currency: {
		value: '-1',
		label: 'Select',
	},
}

export type ExpenseResource = CollectionDataType<ExpenseDataType>
export type ExpenseSingleResource = DefaultResponseCollectionType<ExpenseDataType>
