import { date, number, object, string } from 'yup'
import { LoginFormType } from '@/types/auth-types'
import { Shape } from '@/helpers/types'
import { CustomerStoreFormType } from '@/types/customer-types'
import { ExpenseStoreFormType } from '@/types/expense-types'
import parse from 'date-fns/parse'
import { StaffStoreFormType } from '@/types/staff-types'
import { VaultStoreFormType } from '@/types/vault-types'
import { ProductStoreFormType } from '@/types/product-types'

export const LoginFormValidationSchema = object<LoginFormType>({
	email: string().required('E-Posta alanı gereklidir').email('E-Posta geçersiz'),
	password: string().required('Şifre alanı gereklidir'),
})

export const CustomerCreateValidationSchema = object().shape<Shape<Partial<CustomerStoreFormType>>>(
	{
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
				id: string().required().notOneOf(['-1'], 'Customer Type must be selected'),
			}),
	},
)

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
			id: string().required().notOneOf(['-1'], 'Customer Type must be selected'),
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
	vault: object()
		.label('Vault')
		.shape({
			value: string().required().notOneOf(['-1'], 'Vault must be selected'),
		}),
	receipt_date: date().transform(function (value, originalValue) {
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
	vault: object()
		.label('Vault')
		.shape({
			value: string().required().notOneOf(['-1'], 'Vault must be selected'),
		}),
	receipt_date: date().transform(function (value, originalValue) {
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
	salary_vault: object()
		.label('Staff Type')
		.shape({
			id: string().required().notOneOf(['-1'], 'Staff Type must be selected'),
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
	salary_vault: object()
		.label('Staff Type')
		.shape({
			value: string().required().notOneOf(['-1'], 'Staff Type must be selected'),
		}),
})

export const VaultCreateValidationSchema = object().shape<Shape<VaultStoreFormType>>({
	name: string().label('Name').required().max(255),
	currency: object()
		.label('Currency')
		.shape({
			id: string().required().notOneOf(['-1'], 'Currency must be selected'),
		}),
})

export const VaultEditValidationSchema = object().shape<Shape<Partial<VaultStoreFormType>>>({
	name: string().label('Name').required().max(255),
	currency: object()
		.label('Currency')
		.shape({
			id: string().required().notOneOf(['-1'], 'Currency must be selected'),
		}),
})

export const ProductCreateValidationSchema = object().shape<Shape<Partial<ProductStoreFormType>>>({
	name: string().label('Name').required().max(255),
	buy_price: number().label('Amount').required().min(1).max(100000),
})
