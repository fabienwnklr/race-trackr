import Nav from '#components/nav'
import { Button, Col, Row, Typography } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import LogoMoto from '../../images/logo_moto.jpg'

import type { Trackday } from '../../../@types/trackday'
import { router } from '@inertiajs/react'

const { Meta } = Card
const { Title } = Typography

export default function Maintenances(props: { vehicles: Trackday[] }) {
  const vehicles = [{}, {}]
  return (
    <>
      <Nav route="/maintenances">
        <Title
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          Maintenances
          <Button type="primary">
            Add new vehicle <PlusOutlined />
          </Button>
        </Title>

        <Row gutter={30}>
          {vehicles.map((td, i) => (
            <Col
              span={6}
              style={{
                marginBottom: 20,
              }}
            >
              <Card
                onClick={() => {
                  router.get('/maintenances/my-bike')
                }}
                hoverable
                style={{ width: 240, padding: 10 }}
                cover={<img alt="nogaro" src={LogoMoto} />}
              >
                <Meta title={`My bike ${i + 1}`} />
              </Card>
            </Col>
          ))}
        </Row>
      </Nav>
    </>
  )
}
