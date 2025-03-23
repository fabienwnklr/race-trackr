import Layout from '#components/layout'
import NoDataFound from '#components/no_data_found'
import i18n from '#config/i18n_react'
import type { UserVehicle } from '#types/user_vehicle'
import { router } from '@inertiajs/react'
import { Delete, Edit, Eye, Plus } from 'lucide-react'

export default function UserVehicles(props: { user: any; userVehicles: UserVehicle[] }) {
  const { userVehicles } = props

  const deleteUserVehicle = (userVehicle: UserVehicle) => {
    Modal.confirm({
      ...modalConfigDelete(i18n, userVehicle.name),
      onOk: () => {
        router.delete('/user-vehicles/' + userVehicle.id)
      },
    })
  }

  return (
    <Layout {...props}>
      <Typography.Title
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {i18n.t('userVehicles')}
        <Button
          type="primary"
          onClick={() => {
            router.visit('/user-vehicles/create')
          }}
        >
          {i18n.t('createVehicle')} <Plus />
        </Button>
      </Typography.Title>

      {userVehicles.length ? (
        <Row gutter={30}>
          {userVehicles.map((userVehicle, i) => (
            <Col
              span={6}
              style={{
                marginBottom: 20,
              }}
              key={i}
            >
              <Card
                actions={[
                  <Eye
                    onClick={() => router.visit(`/user-vehicles/${userVehicle.id}`)}
                    key="show"
                  />,
                  <Edit
                    onClick={() => router.visit(`/user-vehicles/${userVehicle.id}/edit`)}
                    key="edit"
                  />,
                  <Delete
                    style={{ color: 'red' }}
                    onClick={() => deleteUserVehicle(userVehicle)}
                    key="delete"
                  />,
                ]}
                style={{
                  padding: 10,
                }}
              >
                <Card.Meta title={userVehicle.name} />
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <NoDataFound />
      )}
    </Layout>
  )
}
