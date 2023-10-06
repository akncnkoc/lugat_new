import {
	CollectionDataType,
	CollectionMetaType,
	ColletionLinkType,
	DefaultResponseCollectionType,
} from '@/helpers/types'

export type VariantDataType = {
	id: string
	name: string
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
export type VariantResource = CollectionDataType<VariantDataType>
