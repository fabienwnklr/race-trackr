import Main from '#components/layout/main'
import { Button, Col, Row, theme, Typography } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import dayjs from 'dayjs'

import type { Trackday } from '#types/trackday'
import { router } from '@inertiajs/react'
import NoDataFound from '#components/no_data_found'
import i18n from '#config/i18n_react'
import { slugify } from '#utils/index'

const { Meta } = Card
const { Title } = Typography

export default function Trackdays(props: { trackdays: Trackday[]; user: any }) {
  const { token } = theme.useToken()
  const { trackdays } = props

  return (
    <>
      <Main route="/trackdays" {...props}>
        <Title
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          level={3}
          ellipsis
        >
          {i18n.t('trackdays')}
          <Button
            type="primary"
            onClick={() => {
              router.visit('/trackdays/create')
            }}
          >
            {i18n.t('createTrackday')} <PlusOutlined />
          </Button>
        </Title>

        {trackdays.length ? (
          <Row>
            {trackdays.map((td, i) => (
              <Col
                key={i}
                span={8}
                xs={24}
                sm={12}
                md={8}
                style={{
                  marginBottom: 20,
                }}
              >
                <Card
                  onClick={() => {
                    router.get(`/trackdays/${td.id}`)
                  }}
                  hoverable
                  style={{ width: 'calc(100% - 20px)', padding: 10 }}
                  cover={
                    <img
                      alt={td.track.name}
                      style={{ width: '100%', height: '70px' }}
                      src={`inertia/images/logo_${slugify(td.track.name)}.png`}
                    />
                  }
                >
                  <Meta title={td.track.name} description={dayjs(td.date).format('DD/MM/YYYY')} />
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
