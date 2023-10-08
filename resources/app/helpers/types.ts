import * as yup from 'yup'
import React, { ReactNode } from 'react'
import { NavigateOptions } from 'react-router/dist/lib/context'

export type ColletionLinkType = {
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
export type CollectionDataType<T> = {
	data: Array<T>
	links: ColletionLinkType
	meta: CollectionMetaType
}

export type CurrencyDataType = {
	id: string
	name: string
	code: string
	forex_buy: number
	forex_sell: number
	banknote_buy: number
	banknote_sell: number
	updated_at: number
}

export type SelectOption = {
	value: string
	label: string
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

export type DefaultResponseType = {
	status: string | number
	message: string
}

export type DefaultResponseCollectionType<T> = {
	data: T
	message: string
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
	isMenuEnabled?: boolean | 0 | null
}
export type NavigationItemProps = {
	handleNavigate: Function
	item: NavigationItemType
	isPopover?: boolean
	close?: Function
	isMenuEnabled?: boolean | 0 | null
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

export type CurrencyResource = CollectionDataType<CurrencyDataType>

export enum ConfirmationDialogResponse {
	YES = 'YES',
	NO = 'NO',
}
