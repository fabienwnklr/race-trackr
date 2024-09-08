import app from '@adonisjs/core/services/app'
import { defineConfig, formatters, loaders } from '@adonisjs/i18n'

const i18nConfig = defineConfig({
  defaultLocale: 'fr',
  formatter: formatters.icu(),
  supportedLocales: ['en', 'fr', 'it'],
  fallback: (identifier, _locale) => {
    return `${identifier} (auto-generated)`
  },
  loaders: [
    loaders.fs({
      location: app.languageFilesPath(),
    }),
  ],
  fallbackLocales: {
    ca: 'es', // show Spanish content when a user speaks Catalin
  },
})

export default i18nConfig
