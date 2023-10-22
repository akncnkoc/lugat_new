import { CollectionDataType, CurrencyDataType, DefaultResponseCollectionType, SelectOption } from '@/helpers/types'

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

export enum ExpenseStatusType {
  paided = 'Paided',
  scheduled = 'Scheduled',
}

export type ExpenseStoreType = {
  amount: number
  receipt_date: string | null
  scheduled_date: string | null
  currency_id: string
  type: string
  status: string
  comment?: string | null
}

export type ExpenseDataType = {
  id: string
  amount: number
  currency: CurrencyDataType
  comment: string | null
  receipt_date: Date | null
  scheduled_date: Date | null
  type: keyof typeof ExpenseTypeData
  status: keyof typeof ExpenseStatusType
}

export type ExpenseStoreFormType = {
  amount: number
  currency: SelectOption
  type: SelectOption
  status: SelectOption
  comment: string | null
  receipt_date: Date | string | null
  scheduled_date: Date | string | null
}

export const ExpenseStoreInitialValues: ExpenseStoreFormType = {
  amount: 0,
  type: { value: '-1', label: 'Select' },
  status: { value: '-1', label: 'Select' },
  comment: '',
  receipt_date: null,
  scheduled_date: null,
  currency: {
    value: '-1',
    label: 'Select',
  },
}

export type ExpenseResource = CollectionDataType<ExpenseDataType>
export type ExpenseSingleResource = DefaultResponseCollectionType<ExpenseDataType>
