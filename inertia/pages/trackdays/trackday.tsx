import Main from '#components/layout/main'
import { Button, Typography, Row, Col, Card, Statistic, theme, List } from 'antd'
import {
  LeftOutlined,
  EditOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  SunOutlined,
} from '@ant-design/icons'
import SunnyIcon from '#components/icons/sunny'
import { router } from '@inertiajs/react'
import type { User } from '#types/user'
import type { Trackday } from '#types/trackday'
import i18n from '#config/i18n_react'
import dayjs from 'dayjs'
import RainyIcon from '#components/icons/rainy'
import CloudyIcon from '#components/icons/cloudy'

const { Title } = Typography
/**
 * Show unique trackday
 */
export default function Trackday(props: { user: User; trackday: Trackday }) {
  const { token } = theme.useToken()
  const { trackday } = props
  return (
    <Main route="" {...props}>
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

      <Card bordered={false}>
        <Row gutter={16}>
          {/* Weather */}
          <Col span={12} xs={24} sm={5}>
            <p>{i18n.t('weather')}</p>
            {trackday.weather === 'sunny' ? (
              <SunnyIcon size={80} />
            ) : trackday.weather === 'cloudy' ? (
              <CloudyIcon size={80} />
            ) : (
              <RainyIcon size={80} />
            )}
          </Col>
          {/* Tire pressure */}
          {trackday.tirePressureFront || trackday.tirePressureBack ? (
            <Col span={12} xs={24} sm={5}>
              <p>{i18n.t('tire_pressure')}</p>
              <p>{trackday.tirePressureFront}</p>
              <p>{trackday.tirePressureBack}</p>
            </Col>
          ) : (
            ''
          )}
          {/* Best chrono */}
          {trackday.bestChrono ? (
            <Col span={12} xs={24} sm={5}>
              <p>{i18n.t('best_chrono')}</p>
              <p>{trackday.bestChrono}</p>
            </Col>
          ) : (
            ''
          )}

          {trackday.regulChrono ? (
            <Col span={12} xs={24} sm={5}>
              <p>{i18n.t('regul_chrono')}</p>
              <p>{trackday.regulChrono}</p>
            </Col>
          ) : (
            ''
          )}

          {/* Chronos */}
          {trackday.chronos.length ? (
            <Col span={24} style={{ marginTop: 20 }}>
              <p>{i18n.t('chronos')}</p>
              <List
                dataSource={trackday.chronos}
                renderItem={(chrono: any) => <List.Item>{chrono.lapTime}</List.Item>}
              ></List>
            </Col>
          ) : (
            ''
          )}
        </Row>
      </Card>
      {/* <Col span={12} xs={24} sm={12}>
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
        </Col> */}
    </Main>
  )
}
