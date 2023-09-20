import 'i18next'

import en from '@/locales/en/translations.json'

declare module 'i18next' {
	interface CustomTypeOptions {
		resources: {
			en: typeof en
		}
	}
}
