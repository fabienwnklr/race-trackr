import Main from '#components/layout/main'
import { Button, Typography, Row, Col, Card, Statistic, theme } from 'antd'
import { LeftOutlined, EditOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons'
import { router } from '@inertiajs/react'
import type { User } from '#types/user'
import type { Trackday } from '#types/trackday'
import i18n from '#config/i18n_react'
import dayjs from 'dayjs'

const { Title } = Typography
/**
 * Show unique trackday
 */
export default function Trackday(props: { user: User; trackday: Trackday }) {
  const { token } = theme.useToken()
  const { trackday } = props
  return (
    <Main route="/trackdays" {...props}>
      <Title
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          // backgroundColor: token.colorBgContainer,
          // padding: 10,
          // borderRadius: token.borderRadiusLG,
        }}
        level={3}
      >
        <Typography.Link
          onClick={() => {
            router.get('/trackdays')
          }}
        >
          <LeftOutlined style={{ marginRight: 5 }} />
          {i18n.t('back')}
        </Typography.Link>
        {trackday.track.name} - {dayjs(trackday.date).format('DD/MM/YYYY')}
        <Button type="primary" onClick={() => router.get('/trackdays/' + trackday.id + '/edit')}>
          {i18n.t('edit')}
          <EditOutlined />
        </Button>
      </Title>

      <Row gutter={16}>
        <Col span={12} xs={24} sm={12}>
          <Card bordered={false}>
            <Statistic
              title="Active"
              value={11.28}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={12} xs={24} sm={12}>
          <Card bordered={false}>
            <Statistic
              title="Idle"
              value={9.3}
              precision={2}
              valueStyle={{ color: '#cf1322' }}
              prefix={<ArrowDownOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>
    </Main>
  )
}
