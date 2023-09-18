import i18n from '@/@types/i18next'
import { initReactI18next } from 'react-i18next'
import EnTranslations from '@/i18n/locales/en/translations.json'

i18n.use(initReactI18next).init({
	fallbackLng: 'en',
	lng: 'en',
	resources: {
		en: {
			translations: EnTranslations,
		},
	},
	ns: ['translations'],
	defaultNS: 'translations',
})

i18n.languages = ['en']
export default i18n
