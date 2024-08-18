import Nav from '#components/nav'
import { Button, Form, Input, Typography, Select, Row, Col, Space } from 'antd'
import { LeftOutlined, PlusOutlined } from '@ant-design/icons'
import { router } from '@inertiajs/react'

const { Title } = Typography

type FieldType = {
  username?: string
  password?: string
  remember?: string
}
/**
 * Show trackdays filtering on specific track
 */
export default function Track(props: any) {
  const [form] = Form.useForm()
  return (
    <Nav route="/trackdays">
      <Title
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        Create new trackday
      </Title>

      <Form name="create_trackday" form={form}>
        <Row gutter={18}>
          <Col span={8}>
            <Form.Item
              label="Track"
              name="track"
              rules={[{ required: true, message: 'Please input track' }]}
            >
              <Select />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Weather"
              name="weather"
              rules={[{ required: true, message: 'Please input weather' }]}
            >
              <Select />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item<FieldType>>
          <Space>
            <Button
              onClick={() => {
                router.visit('/trackdays')
              }}
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Nav>
  )
}
