import Main from '#components/layout/main'
import { Button, Col, Modal, Row, Typography } from 'antd'
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons'
import { Card } from 'antd'

import { router } from '@inertiajs/react'
import NoDataFound from '#components/no_data_found'
import i18n from '#config/i18n_react'
import dayjs from 'dayjs'

import type { Maintenance } from '#types/maintenance'
import { useState } from 'react'
import { modalConfigDelete } from '../../../constants'

const { Meta } = Card
const { Title } = Typography

export default function Maintenances(props: { user: any; maintenances: Maintenance[] }) {
  const { maintenances } = props

  const deleteMaintenance = (maintenance: Maintenance) => {
    Modal.confirm({
      ...modalConfigDelete(i18n, maintenance.name),
      onOk: () => {
        router.delete('/maintenances/' + maintenance.id)
      },
    })
  }

  return (
    <Main route="/maintenances" {...props}>
      <Title
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        Maintenances
        <Button
          type="primary"
          onClick={() => {
            router.visit('/maintenances/create')
          }}
        >
          {i18n.t('createMaintenance')} <PlusOutlined />
        </Button>
      </Title>

      {maintenances.length ? (
        <Row gutter={30}>
          {maintenances.map((maintenance, i) => (
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
                    onClick={() => router.visit(`/maintenances/${maintenance.id}`)}
                    key="show"
                  />,
                  <EditOutlined
                    onClick={() => router.visit(`/maintenances/${maintenance.id}/edit`)}
                    key="edit"
                  />,
                  <DeleteOutlined
                    style={{ color: 'red' }}
                    onClick={() => deleteMaintenance(maintenance)}
                    key="delete"
                  />,
                ]}
                style={{
                  width: 350,
                  padding: 10,
                }}
              >
                <Meta title={i18n.t('vehicle') + ' : ' + maintenance.vehicle.name} />
                <Meta
                  title={i18n.t('date') + ' : ' + dayjs(maintenance.date).format('DD/MM/YYYY')}
                />
                <Meta
                  title={i18n.t('maintenance') + ' : ' + maintenance.name}
                />
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
