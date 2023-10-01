import { CollectionDataType, DefaultResponseCollectionType } from '@/helpers/types'
import { VaultDataType } from '@/types/vault-types'

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
	model_code: string
	buy_price: number
	sell_price: number
	buy_price_vault: {
		id: string
		name: string
	}
	sell_price_vault: {
		id: string
		name: string
	}
	critical_stock_alert: boolean
	images?: Array<File>
}
export const ProductStoreInitialValues: ProductStoreFormType = {
	name: '',
	model_code: '',
	buy_price: 0,
	sell_price: 0,
	buy_price_vault: {
		id: '-1',
		name: 'Select',
	},
	sell_price_vault: {
		id: '-1',
		name: 'Select',
	},
	critical_stock_alert: false,
	images: []
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
