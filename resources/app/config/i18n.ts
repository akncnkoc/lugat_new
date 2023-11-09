import esCommonJsonTranslate from '@/locales/en/common.json'
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
i18next.use(initReactI18next).init({
  resources: {
    en: { common: esCommonJsonTranslate },
  },
  lng: 'en',
  ns: ['common'],
  defaultNS: 'common',
  react: { useSuspense: false },
  compatibilityJSON: 'v4',
  interpolation: {
    escapeValue: true,
  },
})

export default i18next
