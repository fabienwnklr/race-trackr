import Main from '#components/layout/main'
import { Button, Col, Row, Typography } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Card, theme } from 'antd'

import type { Trackday } from '#types/trackday'
import type { Vehicle } from '#types/vehicle'
import { router } from '@inertiajs/react'
import { useState } from 'react'
import NoDataFound from '#components/no_data_found'
import i18n from '#config/i18n_react'
import { Maintenance } from '../../../@types/maintenance'

const { Meta } = Card
const { Title } = Typography

export default function Maintenances(props: { user: any, maintenances: Maintenance[] }) {
  const { maintenances } = props

  return (
    <>
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
                  onClick={() => {
                    router.get('/maintenances/my-bike-' + (i + 1))
                  }}
                  hoverable
                  style={{
                    width: 240,
                    padding: 10,
                  }}
                >
                  <Meta title={maintenance.name} />
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <NoDataFound />
        )}
      </Main>
    </>
  )
}
