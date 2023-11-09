import i18next from '@/config/i18n'
import { CollectionDataType, CurrencyDataType, DefaultResponseCollectionType, SelectOption } from '@/helpers/types'
export const CargoTypes = {
  preparing: 'Preparing',
  ready_to_ship: 'Ready To Ship',
  shipped: 'Shipped',
  delivered: 'Delivered',
  returned: 'Returned',
} as const
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
  amount: string
  amount_type: AmountTypesUnion
  tracking_no: string
  price: number
  price_currency: CurrencyDataType
  ready_to_ship_date: Date | string
  shipped_date: Date | string
  delivered_date: Date | string
  returned_date: Date | string
}

export type CargoStoreFormType = {
  cargo_company: SelectOption
  type: SelectOption
  tracking_no: string
  amount: string
  amount_type: SelectOption
  price: number
  price_currency: SelectOption
  ready_to_ship_date: Date | string | null
  shipped_date: Date | string | null
  delivered_date: Date | string | null
  returned_date: Date | string | null
}

export type CargoStoreType = {
  cargo_company_id: string
  type: string
  amount: string
  amount_type: string
  tracking_no: string
  price: number
  price_currency_id: string
  ready_to_ship_date: Date | string | null
  shipped_date: Date | string | null
  delivered_date: Date | string | null
  returned_date: Date | string | null
}

export type CargoSingleResource = DefaultResponseCollectionType<CargoDataType>
export type CargoCompanySingleResource = DefaultResponseCollectionType<CargoCompanyDataType>
export type CargoResource = CollectionDataType<CargoDataType>
export type CargoCompanyResource = CollectionDataType<CargoCompanyDataType>

export const CargoStoreInitialValues: CargoStoreFormType = {
  cargo_company: {
    value: '-1',
    label: i18next.t('common:select'),
  },
  type: {
    value: '-1',
    label: i18next.t('common:select'),
  },
  amount_type: { value: '-1', label: i18next.t('common:select') },
  tracking_no: '',
  price: 0,
  amount: '',
  ready_to_ship_date: null,
  shipped_date: null,
  delivered_date: null,
  returned_date: null,
  price_currency: {
    value: '-1',
    label: i18next.t('common:select'),
  },
}
