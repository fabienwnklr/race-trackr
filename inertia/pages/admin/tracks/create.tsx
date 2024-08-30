import Nav from '#components/nav'
import { router } from '@inertiajs/react'
import { Button, Col, Form, Input, Row, Select, Space, theme } from 'antd'
import { Typography } from 'antd'

import type { Track } from '#types/track'
import { PropsWithChildren } from 'react'

const { Option } = Select
const { Title } = Typography
const { TextArea } = Input

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}

const buttonsStyle = { display: 'flex', width: '100%', justifyContent: 'flex-end', marginTop: 24 }

const onCancel = () => {
  router.visit('/admin/tracks')
}
const onFinish = (values: Track) => {
  console.log(values)
}

export default function CreateAdminTrack(props: PropsWithChildren & { user: any }) {
  const [form] = Form.useForm()
  const { token } = theme.useToken()
  const colSpan = 12

  const formStyle: React.CSSProperties = {
    maxWidth: 'none',
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    padding: 24,
  }

  return (
    <Nav route="/admin/tracks/create" {...props}>
      <Title
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        Admin - New Track
      </Title>
      <Form layout="inline" {...layout} style={formStyle} name="control-hooks" onFinish={onFinish}>
        <Row gutter={[24, 24]}>
          <Col span={colSpan}>
            <Form.Item<Track> name="name" label="Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item<Track> name="country" label="Country">
              <Select placeholder="Select a country" allowClear>
                <Option value="france">France</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item<Track> name="city" label="City">
              <Select placeholder="Select a country" allowClear>
                <Option value="france">Nogaro</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item<Track> name="adress" label="Adress">
              <Input />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item<Track> name="distance" label="Distance">
              <Input />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item<Track> name="best_lap_time" label="Best lap time">
              <Input />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item<Track> name="best_lap_time_pilote" label="Best lap time pilote">
              <Input />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item<Track> name="infos" label="Infos">
              <TextArea />
            </Form.Item>
          </Col>
        </Row>

        <div style={buttonsStyle}>
          <Space>
            <Button htmlType="button" onClick={onCancel}>
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              disabled={
                !form.isFieldsTouched(true) ||
                !!form.getFieldsError().filter(({ errors }) => errors.length).length
              }
            >
              Submit
            </Button>
          </Space>
        </div>
      </Form>
    </Nav>
  )
}
