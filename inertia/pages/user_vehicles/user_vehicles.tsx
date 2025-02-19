import Main from '#components/layout/main'
import NoDataFound from '#components/no_data_found'
import i18n from '#config/i18n_react'
import type { UserVehicle } from '#types/user_vehicle'
import { router } from '@inertiajs/react'
import { Col, Row, Card, Modal, Typography, Button } from 'antd'
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons'
import { modalConfigDelete } from '#constants/index'

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
    <Main route="/user-vehicles" {...props}>
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
          {i18n.t('createVehicle')} <PlusOutlined />
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
                  <EyeOutlined
                    onClick={() => router.visit(`/user-vehicles/${userVehicle.id}`)}
                    key="show"
                  />,
                  <EditOutlined
                    onClick={() => router.visit(`/user-vehicles/${userVehicle.id}/edit`)}
                    key="edit"
                  />,
                  <DeleteOutlined
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
