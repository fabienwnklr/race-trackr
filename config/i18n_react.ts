import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(Backend)
  .init({
    load: 'languageOnly',
    preload: ['fr', 'en'],
    fallbackLng: 'fr',
    ns: ['common', 'validation'],
    defaultNS: ['common'],
    supportedLngs: ['en', 'fr', 'es', 'it'],
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/resources/lang/{{lng}}/{{ns}}.json',
    },
    react: {
      useSuspense: false,
    },
    saveMissing: true,
    // debug: process.env.NODE_ENV === 'development',
  })

export default i18n
