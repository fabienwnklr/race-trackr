import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import frCommon from '../resources/lang/fr/common.json' assert { type: 'json' }
import enCommon from '../resources/lang/en/common.json' assert { type: 'json' }

const resources = {
  fr: {
    common: frCommon,
  },
  en: {
    common: enCommon,
  },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    load: 'languageOnly',
    preload: ['fr', 'en'],
    fallbackLng: 'fr',
    ns: ['common', 'validation'],
    defaultNS: 'common',
    supportedLngs: ['en', 'fr', 'es', 'it'],
    interpolation: {
      escapeValue: false,
    },
    // backend: {
    //   loadPath: '/resources/lang/{{lng}}/{{ns}}.json',
    // },
    react: {
      useSuspense: false,
    },
    saveMissing: true,
    // debug: process.env.NODE_ENV === 'development',
  })

export default i18n
