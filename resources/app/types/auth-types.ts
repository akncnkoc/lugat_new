import { DefaultResponseCollectionType } from '@/helpers/types'

export type LoginFormType = {
	email: string
	password: string
}
type LoginResponseDataType = {
	token: string
}

export type LoginResponseType = DefaultResponseCollectionType<LoginResponseDataType>
