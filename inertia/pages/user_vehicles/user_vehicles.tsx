import Main from '#components/layout/main'
import i18n from '#config/i18n_react'

export default function UserVehicles(props: any) {
  return (
    <Main route="/user-vehicles" {...props}>
      <h1>{i18n.t('userVehicles')}</h1>
      <ul>
        {props.userVehicles.map((vehicle: any) => (
          <li key={vehicle.id}>{vehicle.name}</li>
        ))}
      </ul>
    </Main>
  )
}
