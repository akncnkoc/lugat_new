import * as yup from 'yup'
import React, { ReactNode } from 'react'
import { NavigateOptions } from 'react-router/dist/lib/context'

type ColletionLinkType = {
	first: string | null
	last: string | null
	prev: string | null
	next: string | null
}
type CollectionMetaLinkType = {
	url: string | null
	label: string | null
	active: boolean
}
export type CollectionMetaType = {
	current_page: number
	from: number
	last_page: number
	path: string
	per_page: number
	to: number
	total: number
	links: CollectionMetaLinkType[]
}
type CollectionDataType<T> = {
	data: Array<T>
	links: ColletionLinkType
	meta: CollectionMetaType
}

type CurrencyDataType = {
	id: string
	name: string
	code: string
	forex_buy: number
	forex_sell: number
	banknote_buy: number
	banknote_sell: number
	updated_at: number
}
export type VaultDataType = {
	id: string
	name: string
	currency: CurrencyDataType
}
export type ExpenseTypeDataType =
	| 'food'
	| 'rent'
	| 'phone'
	| 'internet'
	| 'water'
	| 'heating'
	| 'advertising'
	| 'promotion'
	| 'accounting'
	| 'maintenance_or_repair'
	| 'supplies'
	| 'lawyer'
	| 'transport'
	| 'travel'

// export enum ExpenseTypeData {
// 	food = 'Yiyecek & İçecek',
// 	rent = 'Kira',
// 	phone = 'Telefon',
// 	internet = 'İnternet',
// 	water = 'Su',
// 	heating = 'Doğalgaz',
// 	advertising = 'Reklam',
// 	promotion = 'Promosyon',
// 	accounting = 'Muhasebe',
// 	maintenance_or_repair = 'Bakım & Onarım',
// 	supplies = 'Araç & Gereç',
// 	lawyer = 'Avukat',
// 	transport = 'Ulaşım',
// 	travel = 'Seyahat',
// }

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

export type ExpenseStoreFormType = {
	amount: number
	receipt_date: Date | null
	vault_id: string
	type: keyof typeof ExpenseTypeData | '-1'
	comment?: string | null
}

export type VaultStoreFormType = {
	name: string
	currency: {
		id: string
		name: string
	}
}

export const CurrencyCodeToSign = (code: string): string | null => {
	const signs = {
		USD: '$',
		TRY: '₺',
		EUR: '€',
		JPY: '¥',
		GBP: '£',
		PKR: '₹',
		RUB: '₽',
	}
	return signs[code as keyof typeof signs] ?? code
}

export type ExpenseDataType = {
	id: string
	amount: number
	vault: VaultDataType
	comment: string | null
	receipt_date: Date
	type: keyof typeof ExpenseTypeData
}

export type LoginFormType = {
	email: string
	password: string
}

export type DefaultResponseType = {
	status: string | number
	message: string
}

export type DefaultResponseCollectionType<T> = {
	data: T
	message: string
}

type LoginResponseDataType = {
	token: string
}

export type ExpenseCreateFormType = {
	amount: number
	vault: {
		id: string
		name: string
	}
	type: keyof typeof ExpenseTypeData | '-1'
	comment: string | null
	receipt_date: Date | null
}

export type ExpenseEditFormType = {
	amount: number
	vault: {
		id: string
		name: string
	}
	type: keyof typeof ExpenseTypeData
	comment: string | null
	receipt_date: Date | null
}

export type SvgProps = {
	width?: number | string
	height?: number | string
	fillColor?: string
}

export type NavigationItemType = {
	route: string
	text: string
	icon?: React.ReactNode
	popover?: React.ReactElement | ReactNode
	isPopover?: boolean
	state?: NavigateOptions['state']
}
export type NavigationItemProps = {
	handleNavigate: Function
	item: NavigationItemType
	isPopover?: boolean
}
export type ConditionalSchema<T> = T extends string
	? yup.StringSchema
	: T extends number
	? yup.NumberSchema
	: T extends boolean
	? yup.BooleanSchema
	: T extends Record<any, any>
	? yup.AnyObjectSchema
	: T extends Array<any>
	? yup.DateSchema
	: T extends Date
	? yup.ArraySchema<any, any>
	: yup.AnySchema

export type Shape<Fields> = {
	[Key in keyof Fields]: ConditionalSchema<Fields[Key]>
}

export type LoginResponseType = DefaultResponseCollectionType<LoginResponseDataType>

export type ExpenseResource = CollectionDataType<ExpenseDataType>
export type ExpenseSingleResource = DefaultResponseCollectionType<ExpenseDataType>
export type VaultResource = CollectionDataType<VaultDataType>
export type CurrencyResource = CollectionDataType<CurrencyDataType>
