import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from '@/locales/en/translations.json'

i18next.use(initReactI18next).init({
	lng: 'en',
	debug: false,
	fallbackLng: 'en',
	resources: {
		en: {
			translation: en,
		},
	},
})
export default i18next
