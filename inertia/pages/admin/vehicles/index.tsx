import Nav from '#components/nav'
import i18n from '#config/i18n_react'

export default function Vehicles(props: any) {
  return (
    <Nav route="/admin/vehicles" {...props}>
      <h1>{i18n.t('vehicles')}</h1>
    </Nav>
  )
}
