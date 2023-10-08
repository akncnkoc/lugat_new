import {
	CollectionDataType,
	CurrencyDataType,
	DefaultResponseCollectionType,
	SelectOption,
} from '@/helpers/types'

export type VaultDataType = {
	id: string
	name: string
	currency: CurrencyDataType
}

export type VaultStoreFormType = {
	name: string
	currency: SelectOption
}

export const VaultStoreInitialValues: VaultStoreFormType = {
	name: '',
	currency: {
		label: 'Select',
		value: '-1',
	},
}

export type VaultStoreType = {
	name: string
	currency_id: string
}

export type VaultSingleResource = DefaultResponseCollectionType<VaultDataType>
export type VaultResource = CollectionDataType<VaultDataType>
