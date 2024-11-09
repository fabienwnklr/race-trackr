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

const { Meta } = Card
const { Title } = Typography

export default function Maintenances(props: { vehicles: Trackday[]; user: any }) {
  const vehicles = [] as Trackday[]
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

        {vehicles.length ? (
          <Row gutter={30}>
            {vehicles.map((td, i) => (
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
                  cover={<img alt="nogaro" src={'/resources/images/logo_moto.png'} />}
                >
                  <Meta title={`My bike ${i + 1}`} />
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
