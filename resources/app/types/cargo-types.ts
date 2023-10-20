import { CollectionDataType, CurrencyDataType, DefaultResponseCollectionType, SelectOption } from '@/helpers/types'

export const CargoTypes = {
  ready_to_ship: 'Ready To Ship',
  shipped: 'Shipped',
  delivered: 'Delivered',
  returned: 'Returned',
}
export type CargoTypesUnion = keyof typeof CargoTypes

export const AmountTypes = {
  cm: 'Cm',
  mm: 'Mm',
  inch: 'Inch',
  km: 'Km',
  km2: 'Km2',
  m2: 'M2',
  m3: 'M3',
  g: 'G',
  kg: 'KG',
  ton: 'Ton',
}
export type AmountTypesUnion = keyof typeof AmountTypes

export type CargoCompanyFormType = {
  name: string
  photo_path?: string
}

export type CargoCompanyDataType = {
  id: string
  name: string
  photo_path: string
}

export type CargoCompanyStoreType = {
  name: string
  photo_path?: string
}

export type CargoDataType = {
  id: string
  cargo_company: CargoCompanyDataType
  type: CargoTypesUnion
  amount_type: AmountTypesUnion
  tracking_no: string
  price: number
  price_currency: CurrencyDataType
  date_of_paid: string
}

export type CargoStoreFormType = {
  cargo_company: SelectOption
  type: SelectOption
  amount_type: SelectOption
  tracking_no: string
  price: number
  price_currency: SelectOption
  date_of_paid: Date | null
}

export type CargoStoreType = {
  cargo_company_id: string
  type: string
  amount_type: string
  tracking_no: string
  price: number
  price_currency_id: string
  date_of_paid: Date | null
}

export type CargoSingleResource = DefaultResponseCollectionType<CargoDataType>
export type CargoCompanySingleResource = DefaultResponseCollectionType<CargoCompanyDataType>
export type CargoResource = CollectionDataType<CargoDataType>
export type CargoCompanyResource = CollectionDataType<CargoCompanyDataType>
