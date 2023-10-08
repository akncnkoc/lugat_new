import {
	CollectionDataType,
	CurrencyDataType,
	DefaultResponseCollectionType,
	SelectOption,
} from '@/helpers/types'
import { VariantDataType } from '@/types/variant-types'
import { SupplierDataType } from '@/types/supplier-types'

export type ProductDataType = {
	id: string
	name: string
	sub_products: Array<SubProductVariantType>
	suppliers: Array<SupplierDataType>
}

export type ProductStoreFormType = {
	name: string
	sku: string
	buy_price: number
	sell_price: number
	buy_currency: SelectOption
	sell_currency: SelectOption
	barcode: string
	have_variants?: boolean
	images?: Array<File>
	variants: Array<VariantDataType>
	suppliers: Array<SelectOption>
}

export type SubProductVariantStoreType = {
	name: string
	sku: string
	barcode: string
	buy_price: number
	sell_price: number
	buy_currency_id: string
	sell_currency_id: string
	stock: number
	tax: 0 | 1 | 10 | 20
	variants: Array<string>
	images: Array<File>
}

export type SubProductVariantUpdateType = {
	id?: string
} & SubProductVariantStoreType

export type SubProductVariantType = {
	id?: string
	name: string
	sku: string
	barcode: string
	buy_price: number
	sell_price: number
	buy_currency: CurrencyDataType
	sell_currency: CurrencyDataType
	stock: number
	tax: 0 | 1 | 10 | 20
	variants: Array<VariantDataType>
	images: Array<File>
}

export const ProductStoreInitialValues: ProductStoreFormType = {
	name: '',
	have_variants: false,
	sku: '',
	barcode: '',
	buy_price: 0,
	sell_price: 0,
	buy_currency: {
		value: '-1',
		label: 'Select',
	},
	sell_currency: {
		value: '-1',
		label: 'Select',
	},
	images: [],
	variants: [],
	suppliers: [],
}

export type ProductStoreType = {
	name: string
	sub_products: Array<SubProductVariantStoreType>
	suppliers: Array<string>
}

export type ProductSingleResource = DefaultResponseCollectionType<ProductDataType>
export type ProductResource = CollectionDataType<ProductDataType>
