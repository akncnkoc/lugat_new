import {
	CollectionDataType,
	CurrencyDataType,
	DefaultResponseCollectionType,
} from '@/helpers/types'

export type VaultDataType = {
	id: string
	name: string
	currency: CurrencyDataType
}

export type VaultStoreFormType = {
	name: string
	currency: {
		id: string
		name: string
	}
}

export const VaultStoreInitialValues: VaultStoreFormType = {
	name: '',
	currency: {
		id: '-1',
		name: 'Select',
	},
}

export type VaultStoreType = {
	name: string
	currency_id: string
}

export type VaultEditFormType = {
	name: string
	currency: {
		id: string
		name: string
	}
}

export type VaultSingleResource = DefaultResponseCollectionType<VaultDataType>
export type VaultResource = CollectionDataType<VaultDataType>
