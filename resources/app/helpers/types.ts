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
type CollectionMetaType = {
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
	name: string
	code: string
	forex_buy: number
	forex_sell: number
	banknote_buy: number
	banknote_sell: number
	updated_at: number
}
type VaultDataType = {
	id: string
	name: string
	currency: CurrencyDataType
}

type ExpenseTypeDataType = {
	id: string
	name: string
}
export type ExpenseDataType = {
	id: string
	amount: number
	vault: VaultDataType
	comment: string | null
	receipt_date: string
	expense_type: ExpenseTypeDataType
}

export type LoginFormType = {
	email: string
	password: string
}

type DefaultResponseType<T> = {
	data?: T
	message: string
}

type LoginResponseDataType = {
	token: string
}

export type LoginResponseType = DefaultResponseType<LoginResponseDataType>



export type ExpenseResource = CollectionDataType<ExpenseDataType>
