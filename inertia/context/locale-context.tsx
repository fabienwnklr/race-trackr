import { createContext, useContext, useState, useEffect } from 'react'
import i18n from '#config/i18n_react'

type LocaleContextType = {
  locale: string
  setLocale: (locale: string) => void
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined)

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState(() => {
    if (typeof window === 'undefined') return 'fr'

    // Vérifier d'abord la configuration i18n
    const configuredLocale = i18n.language
    if (configuredLocale && ['fr', 'en'].includes(configuredLocale)) {
      return configuredLocale
    }

    // Si aucune configuration, utiliser la langue du navigateur
    const browserLocale = navigator.language.split('-')[0]
    if (browserLocale && ['fr', 'en'].includes(browserLocale)) {
      return browserLocale
    }

    return 'fr'
  })

  useEffect(() => {
    // Vérifier d'abord la configuration i18n
    const configuredLocale = i18n.language
    if (configuredLocale && ['fr', 'en'].includes(configuredLocale)) {
      setLocale(configuredLocale)
      return
    }

    // Si aucune configuration, utiliser la langue du navigateur
    const browserLocale = navigator.language.split('-')[0]
    if (browserLocale && ['fr', 'en'].includes(browserLocale)) {
      setLocale(browserLocale)
    }
  }, [])

  const handleSetLocale = (newLocale: string) => {
    setLocale(newLocale)
    i18n.changeLanguage(newLocale)
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale: handleSetLocale }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  const context = useContext(LocaleContext)
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider')
  }
  return context
}
