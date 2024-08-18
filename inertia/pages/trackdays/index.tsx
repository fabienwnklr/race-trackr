import Nav from '#components/nav'
import { Button, Col, Row, Typography } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import LogoNogaro from '../../images/logo_nogaro.png'

import type { Trackday } from '../../../@types/trackday'
import { router } from '@inertiajs/react'

const { Meta } = Card
const { Title } = Typography

export default function Trackdays(props: { trackdays: Trackday[] }) {
  const trackdays = [
    {
      track: 'test',
    },
    {
      track: 'test',
    },
    {
      track: 'test',
    },
    {
      track: 'test',
    },
    {
      track: 'test',
    },
    {
      track: 'test',
    },
    {
      track: 'test',
    },
    {
      track: 'test',
    },
    {
      track: 'test',
    },
    {
      track: 'test',
    },
    {
      track: 'test',
    },
    {
      track: 'test',
    },
    {
      track: 'test',
    },
    {
      track: 'test',
    },
    {
      track: 'test',
    },
  ]
  return (
    <>
      <Nav route="/trackdays">
        <Title
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          Trackdays
          <Button type="primary">
            Create new trackday <PlusOutlined />
          </Button>
        </Title>

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
      </Nav>
    </>
  )
}
