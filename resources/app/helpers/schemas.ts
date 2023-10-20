import { Shape } from '@/helpers/types'
import { LoginFormType } from '@/types/auth-types'
import { CargoStoreFormType } from '@/types/cargo-types'
import { CustomerStoreFormType } from '@/types/customer-types'
import { ExpenseStoreFormType } from '@/types/expense-types'
import { ProductStoreFormType } from '@/types/product-types'
import { SettingFormDataType } from '@/types/setting-types'
import { StaffStoreFormType } from '@/types/staff-types'
import { VaultStoreFormType } from '@/types/vault-types'
import parse from 'date-fns/parse'
import { date, number, object, string } from 'yup'

export const LoginFormValidationSchema = object<LoginFormType>({
  email: string().required('E-Posta alanı gereklidir').email('E-Posta geçersiz'),
  password: string().required('Şifre alanı gereklidir'),
})

export const CustomerCreateValidationSchema = object().shape<Shape<Partial<CustomerStoreFormType>>>({
  name: string().label('Name').required().max(255),
  surname: string().label('Surname').required().max(255),
  email: string().label('Email').email().required().max(255),
  phone: string()
    .label('Phone')
    .required()
    .matches(
      /^((\+\d{1,3}([- ])?\(?\d\)?([- ])?\d{1,3})|(\(?\d{2,3}\)?))([- ])?(\d{3,4})([- ])?(\d{4})(( x| ext)\d{1,5})?$/,
      'Phone must be valid',
    ),
  customer_type: object()
    .label('Customer Type')
    .shape({
      value: string().required().notOneOf(['-1'], 'Customer Type must be selected'),
    }),
})

export const CustomerEditValidationSchema = object().shape<Shape<Partial<CustomerStoreFormType>>>({
  name: string().label('Name').required().max(255),
  surname: string().label('Surname').required().max(255),
  email: string().label('Email').email().required().max(255),
  phone: string()
    .label('Phone')
    .required()
    .matches(
      /^((\+\d{1,3}([- ])?\(?\d\)?([- ])?\d{1,3})|(\(?\d{2,3}\)?))([- ])?(\d{3,4})([- ])?(\d{4})(( x| ext)\d{1,5})?$/,
      'Phone must be valid',
    ),
  customer_type: object()
    .label('Customer Type')
    .shape({
      value: string().required().notOneOf(['-1'], 'Customer Type must be selected'),
    }),
})

export const ExpenseCreateValidationSchema = object().shape<Shape<ExpenseStoreFormType>>({
  amount: number().label('Amount').required().min(1).max(100000),
  comment: string(),
  type: object()
    .label('Expense Type')
    .shape({
      value: string().required().notOneOf(['-1'], 'Expense Type must be selected'),
    }),
  currency: object()
    .label('Currency')
    .shape({
      value: string().required().notOneOf(['-1'], 'Currency must be selected'),
    }),
  receipt_date: date()
    .label('Receipt Date')
    .transform(function (value, originalValue) {
      if (this.isType(value)) {
        return value
      }
      return parse(originalValue, 'dd.MM.yyyy', new Date())
    }),
})

export const ExpenseEditValidationSchema = object().shape<Shape<Partial<ExpenseStoreFormType>>>({
  amount: number().label('Amount').required().min(1).max(100000),
  type: object()
    .label('Expense Type')
    .shape({
      value: string().required().notOneOf(['-1'], 'Expense Type must be selected'),
    }),
  currency: object()
    .label('Vault')
    .shape({
      value: string().required().notOneOf(['-1'], 'Currency must be selected'),
    }),
  receipt_date: date()
    .label('Receipt Date')
    .transform(function (value, originalValue) {
      if (this.isType(value)) {
        return value
      }
      return parse(originalValue, 'dd.MM.yyyy', new Date())
    }),
})

export const StaffCreateValidationSchema = object().shape<Shape<Partial<StaffStoreFormType>>>({
  name: string().label('Name').required().max(255),
  surname: string().label('Surname').required().max(255),
  email: string().label('Email').email().required().max(255),
  phone: string()
    .label('Phone')
    .required()
    .matches(
      /^((\+\d{1,3}([- ])?\(?\d\)?([- ])?\d{1,3})|(\(?\d{2,3}\)?))([- ])?(\d{3,4})([- ])?(\d{4})(( x| ext)\d{1,5})?$/,
      'Phone must be valid',
    ),
  salary_currency: object()
    .label('Salary Currency')
    .shape({
      value: string().required().notOneOf(['-1'], 'Salary Currency must be selected'),
    }),
})

export const StaffEditValidationSchema = object().shape<Shape<Partial<StaffStoreFormType>>>({
  name: string().label('Name').required().max(255),
  surname: string().label('Surname').required().max(255),
  email: string().label('Email').email().required().max(255),
  phone: string()
    .label('Phone')
    .required()
    .matches(
      /^((\+\d{1,3}([- ])?\(?\d\)?([- ])?\d{1,3})|(\(?\d{2,3}\)?))([- ])?(\d{3,4})([- ])?(\d{4})(( x| ext)\d{1,5})?$/,
      'Phone must be valid',
    ),
  salary_currency: object()
    .label('Salary Currency')
    .shape({
      value: string().required().notOneOf(['-1'], 'Salary Currency must be selected'),
    }),
})

export const VaultCreateValidationSchema = object().shape<Shape<VaultStoreFormType>>({
  name: string().label('Name').required().max(255),
  currency: object()
    .label('Currency')
    .shape({
      value: string().required().notOneOf(['-1'], 'Currency must be selected'),
    }),
})

export const VaultEditValidationSchema = object().shape<Shape<Partial<VaultStoreFormType>>>({
  name: string().label('Name').required().max(255),
  currency: object()
    .label('Currency')
    .shape({
      value: string().required().notOneOf(['-1'], 'Currency must be selected'),
    }),
})

export const ProductCreateValidationSchema = object().shape<Shape<Partial<ProductStoreFormType>>>({
  name: string().label('Name').required().max(255),
  sell_price: number().required(),
  sell_currency: object()
    .label('Sell Currency')
    .shape({
      value: string().required().notOneOf(['-1'], 'Sell currency must be selected'),
    }),
})

export const SettingStoreInitialValues = {
  name: '',
  timezone: {
    value: '-1',
    label: 'Select',
  },
  defaultCurrency: {
    value: '-1',
    label: 'Select',
  },
  dateFormat: {
    value: '-1',
    label: 'Select',
  },
  companyVatNumber: '',
  companyPostCode: '',
  companyName: '',
  companyContactPhoneNumber: '',
  companyAddress: '',
  companyContactEmail: '',
  companyWebsite: '',
}

export const SettingStoreValidationSchema = object().shape<Shape<SettingFormDataType>>({
  name: string().label('Name').required(),
  companyAddress: string(),
  companyName: string().label('Company Name').max(255),
  companyContactEmail: string().label('Contact Email').email().max(255),
  companyWebsite: string().label('Company Website').max(255),
  companyContactPhoneNumber: string().label('Contact Phone Number').max(13),
  companyPostCode: string(),
  companyVatNumber: string(),
  dateFormat: object()
    .label('Date Format')
    .shape({
      value: string().required().notOneOf(['-1'], 'Date Format must be selected'),
    }),
  defaultCurrency: object()
    .label('Default Currency')
    .shape({
      value: string().required().notOneOf(['-1'], 'Default Currrency must be selected'),
    }),
  timezone: object()
    .label('Timezone')
    .shape({
      value: string().required().notOneOf(['-1'], 'Timezone must be selected'),
    }),
})

export const CargoStoreInitialValues: CargoStoreFormType = {
  cargo_company: {
    value: '-1',
    label: 'Select',
  },
  type: {
    value: '-1',
    label: 'Select',
  },
  amount_type: { value: '-1', label: 'Select' },
  tracking_no: '',
  price: 0,
  price_currency: {
    value: '-1',
    label: 'Select',
  },
  date_of_paid: new Date(),
}
export const CargoCreateValidationSchema = object().shape<Shape<CargoStoreFormType>>({
  cargo_company: object()
    .label('Cargo Company')
    .shape({
      value: string().required().notOneOf(['-1'], 'Cargo Company must be selected'),
    }),
  amount_type: object()
    .label('Amount Type')
    .shape({
      value: string().required().notOneOf(['-1'], 'Amount Type must be selected'),
    }),
  type: object()
    .label('Cargo Type')
    .shape({
      value: string().required().notOneOf(['-1'], 'Cargo Type must be selected'),
    }),
  price: number().required(),
  price_currency: object()
    .label('Currency')
    .shape({
      value: string().required().notOneOf(['-1'], 'Currency must be selected'),
    }),
  tracking_no: string(),
  date_of_paid: date()
    .nullable()
    .default(undefined)
    .label('Date of paid')
    .transform(function (value, originalValue) {
      if (originalValue == '') return null
      if (this.isType(value)) {
        return value
      }
      return parse(originalValue, 'dd.MM.yyyy', new Date())
    }),
})
