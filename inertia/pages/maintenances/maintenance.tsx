import Main from "#components/layout/main";

export default function Maintenance(props: any) {
    const { maintenance } = props
  return (
    <Main title={maintenance.name} route="/maintenances" {...props}>

    </Main>
  )
}
