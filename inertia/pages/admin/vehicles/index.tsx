import Nav from '#components/nav'

export default function Vehicles(props: any) {
  return (
    <Nav route="/admin/vehicles" {...props}>
      <h1>Vehicles</h1>
    </Nav>
  )
}
