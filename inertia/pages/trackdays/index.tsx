import Nav from '#components/nav'
import { Button, Col, Row, Typography } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import LogoNogaro from '../../images/logo_nogaro.png'

import type { Trackday } from '#types/trackday'
import { router } from '@inertiajs/react'
import NoDataFound from '#components/no_data_found'
import i18n from '#config/i18n_react'

const { Meta } = Card
const { Title } = Typography

export default function Trackdays(props: { trackdays: Trackday[]; user: any }) {
  const { trackdays = [] } = props
  return (
    <>
      <Nav route="/trackdays" {...props}>
        <Title
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {i18n.t('trackdays')}
          <Button
            type="primary"
            onClick={() => {
              router.visit('/trackdays/create')
            }}
          >
            {i18n.t('create_trackday')} <PlusOutlined />
          </Button>
        </Title>

        {trackdays.length ? (
          <Row gutter={30}>
            {trackdays.map((td, i) => (
              <Col
                span={6}
                style={{
                  marginBottom: 20,
                }}
              >
                <Card
                  onClick={() => {
                    router.get('/trackdays/nogaro')
                  }}
                  hoverable
                  style={{ width: 240, padding: 10 }}
                  cover={<img alt="nogaro" src={LogoNogaro} />}
                >
                  <Meta title="Nogaro" />
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <NoDataFound />
        )}
      </Nav>
    </>
  )
}
