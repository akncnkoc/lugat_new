import { CollectionDataType, DefaultResponseCollectionType } from '@/helpers/types'
import { VaultDataType } from '@/types/vault-types'

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
	vault_id: string
	type: keyof typeof ExpenseTypeData | '-1'
	comment?: string | null
}


export type ExpenseDataType = {
	id: string
	amount: number
	vault: VaultDataType
	comment: string | null
	receipt_date: Date
	type: keyof typeof ExpenseTypeData
}

export type ExpenseStoreFormType = {
	amount: number
	vault: {
		id: string
		name: string
	}
	type: keyof typeof ExpenseTypeData | '-1'
	comment: string | null
	receipt_date: Date | null
}

export const ExpenseStoreInitialValues: ExpenseStoreFormType = {
	amount: 0,
	type: '-1',
	comment: '',
	receipt_date: new Date(),
	vault: {
		id: '-1',
		name: 'Select',
	},
}

export type ExpenseResource = CollectionDataType<ExpenseDataType>
export type ExpenseSingleResource = DefaultResponseCollectionType<ExpenseDataType>
