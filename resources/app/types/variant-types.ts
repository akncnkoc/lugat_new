import {
	CollectionDataType,
	CollectionMetaType,
	ColletionLinkType,
	DefaultResponseCollectionType,
	SelectOption,
} from '@/helpers/types'

export type VariantDataType = {
	id: string
	name: string
	parent_id: string | null
	childrens: VariantDataType[]
}

export type VariantSingleResource = DefaultResponseCollectionType<VariantDataType> & {
	sub_variants: {
		data: Array<VariantDataType>
	} & ColletionLinkType &
		CollectionMetaType
}

export type VariantStoreType = {
	name: string
	parent_id: string | null
}

export type VariantFormType = {
	id?: string
	name: string
	sku: string
	barcode: string
	buy_price: number
	sell_price: number
	buy_currency: SelectOption
	sell_currency: SelectOption
	stock: number
	tax: 0 | 1 | 10 | 20
	variants: Array<string>
}

export type ProductVariantFormType = {
	data: Array<VariantFormType>
}
export type VariantResource = CollectionDataType<VariantDataType>
