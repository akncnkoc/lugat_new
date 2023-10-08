import { CollectionDataType, DefaultResponseCollectionType } from '@/helpers/types'

export type SupplierDataType = {
	id: string
	name: string
	email: string
	phone: string
}

export type SupplierStoreFormType = {
	name: string
	email: string
	phone: string
}

// export const VaultStoreInitialValues: VaultStoreFormType = {
// 	name: '',
// 	currency: {
// 		id: '-1',
// 		name: 'Select',
// 	},
// }

// export type VaultStoreType = {
// 	name: string
// 	currency_id: string
// }

// export type VaultEditFormType = {
// 	name: string
// 	currency: {
// 		id: string
// 		name: string
// 	}
// }

export type SupplierSingleResource = DefaultResponseCollectionType<SupplierDataType>
export type SupplierResource = CollectionDataType<SupplierDataType>
