import { CurrencyDataType, DefaultResponseCollectionType, SelectOption } from '@/helpers/types'

export const dateFormats: string[] = ['m/d/Y H:i:s', 'd/m/Y H:i:s', 'Y/m/d H:i:s']

export type SettingDataType = {
  name: string
  defaultCurrency: CurrencyDataType
  timezone: string
  dateFormat: (typeof dateFormats)[Exclude<keyof typeof dateFormats, keyof Array<string>>]
  companyName: string
  companyVatNumber: string
  companyAddress: string
  companyPostCode: string
  companyContactPhoneNumber: string
  companyContactEmail: string
  companyWebsite: string
}
export type SettingFormDataType = Omit<SettingDataType, 'defaultCurrency' | 'timezone' | 'dateFormat'> & {
  defaultCurrency: SelectOption
  timezone: SelectOption
  dateFormat: SelectOption
}

export type SettingStoreDataType = Omit<SettingDataType, 'defaultCurrency' | 'timezone' | 'dateFormat'> & {
  defaultCurrency: string
  timezone: string
  dateFormat: string
}

export type SettingSingleResource = DefaultResponseCollectionType<SettingDataType>
