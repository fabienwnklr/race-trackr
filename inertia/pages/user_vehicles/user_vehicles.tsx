import Main from '#components/layout/main'
import NoDataFound from '#components/no_data_found'
import type { UserVehicle } from '#types/user_vehicle'
import { router } from '@inertiajs/react'
import { Delete, Edit, Eye, Plus } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function UserVehicles(props: { user: any; userVehicles: UserVehicle[] }) {
  const { i18n } = useTranslation()
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
    <Main {...props}>
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
    </Main>
  )
}
