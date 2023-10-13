import { DefaultResponseCollectionType } from '@/helpers/types'

export type SettingDataType = {
	name: string
	defaultCurrency: string
	timezone: string
	dateFormat: string
	companyName: string
	companyVatNumber: string
	companyAddress: string
	companyPostCode: string
	companyContactPhoneNumber: string
	companyContactEmail: string
	companyWebsite: string
}

export type SettingSingleResource = DefaultResponseCollectionType<SettingDataType>
