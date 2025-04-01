import { createContext, useContext, useState, useEffect } from 'react'

type LocaleContextType = {
  locale: string
  setLocale: (locale: string) => void
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined)

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState(() => {
    if (typeof window === 'undefined') return 'fr'
    return navigator.language.split('-')[0] || 'fr'
  })

  useEffect(() => {
    const browserLocale = navigator.language.split('-')[0]
    if (browserLocale && ['fr', 'en'].includes(browserLocale)) {
      setLocale(browserLocale)
    }
  }, [])

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
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
