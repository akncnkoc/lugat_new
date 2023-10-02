import { DefaultResponseCollectionType } from '@/helpers/types'

export type LoginFormType = {
	email: string
	password: string
}
type LoginResponseDataType = {
	token: string
	refresh_token: string
}

export type LoginResponseType = DefaultResponseCollectionType<LoginResponseDataType>
