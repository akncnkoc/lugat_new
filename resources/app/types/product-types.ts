import { CollectionDataType, DefaultResponseCollectionType } from '@/helpers/types'
import { VaultDataType } from '@/types/vault-types'
import { VariantDataType } from '@/types/variant-types'

export type ProductDataType = {
	id: string
	name: string
	model_code: string
	buy_price: number
	buy_price_vault: VaultDataType
	sell_price: number
	sell_price_vault: VaultDataType
	critical_stock_alert: boolean
	images?: Array<File>
}

export type ProductStoreFormType = {
	name: string
	sku: string
	barcode: string
	have_variants?: boolean
	stock: number
	buy_price: number
	sell_price: number
	buy_price_vault: {
		value: string
		label: string
	}
	sell_price_vault: {
		value: string
		label: string
	}
	critical_stock_alert: boolean
	images?: Array<File>
	variants: Array<VariantDataType>
}
export const ProductStoreInitialValues: ProductStoreFormType = {
	name: '',
	have_variants: true,
	stock: 0,
	sku: '',
	barcode: '',
	buy_price: 0,
	sell_price: 0,
	buy_price_vault: {
		value: '-1',
		label: 'Select',
	},
	sell_price_vault: {
		value: '-1',
		label: 'Select',
	},
	critical_stock_alert: false,
	images: [],
	variants: []
}

export type ProductStoreType = {
	name: string
	model_code: string
	buy_price: number
	sell_price: number
	buy_price_vault_id: string
	sell_price_vault_id: string
	critical_stock_alert: boolean
	images?: Array<File>
}

export type ProductSingleResource = DefaultResponseCollectionType<ProductDataType>
export type ProductResource = CollectionDataType<ProductDataType>
