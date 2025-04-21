import Main from '#components/layout/main'
import { useTranslation } from 'react-i18next'

export default function Vehicles(props: any) {
    const { i18n } = useTranslation()
  return (
    <Main {...props} title={i18n.t('vehicles')}>
      <h1>{i18n.t('vehicles')}</h1>
    </Main>
  )
}
