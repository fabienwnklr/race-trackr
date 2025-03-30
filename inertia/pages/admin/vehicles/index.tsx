import Main from '#components/layout/main'
import i18n from '#config/i18n_react'

export default function Vehicles(props: any) {
  return (
    <Main {...props} title={i18n.t('vehicles')}>
      <h1>{i18n.t('vehicles')}</h1>
    </Main>
  )
}
