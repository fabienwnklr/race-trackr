import Layout from '#components/layout'
import i18n from '#config/i18n_react'

export default function Vehicles(props: any) {
  return (
    <Layout {...props}>
      <h1>{i18n.t('vehicles')}</h1>
    </Layout>
  )
}
