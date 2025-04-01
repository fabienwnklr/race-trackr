import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useLocale } from '@/context/locale-context'
import i18n from '#config/i18n_react'

export function LanguageSwitch() {
  const { locale, setLocale } = useLocale()
  return (
    <Select defaultValue={locale} onValueChange={setLocale}>
      <SelectTrigger>
        <SelectValue placeholder="Select a language" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">{i18n.t('english')}</SelectItem>
        <SelectItem value="fr">{i18n.t('french')}</SelectItem>
      </SelectContent>
    </Select>
  )
}
