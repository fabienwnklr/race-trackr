import { NotificationPlacement } from 'antd/es/notification/interface'
import { useState } from 'react'
import { Button, Select, Form, Input } from 'antd'
import { ValidateErrorEntity } from 'rc-field-form/lib/interface'
import { UserOutlined, LockOutlined, DownOutlined } from '@ant-design/icons'
import { RegisterFieldType } from '../../@types/form'
import { router } from '@inertiajs/react'

const { Option } = Select

const onRegister = async (values: RegisterFieldType) => {
  if (values.fullName && values.email && values.password && values.country) {
    const url = `/auth/register`
    router.post(url, values)
  }
}

/**
 * Register form
 * @param openNotification
 * @returns
 */
export default function Register() {
  const [isLoading, setLoading] = useState(false)

  return (
    <Form
      name="register"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={async (values) => {
        await onRegister(values)
        setLoading(false)
      }}
      onFinishFailed={() => {
        setLoading(false)
      }}
      onSubmitCapture={() => {
        setLoading(true)
      }}
      onError={() => {
        setLoading(false)
      }}
      autoComplete="off"
    >
      <Form.Item<RegisterFieldType>
        label="Full name"
        name="fullName"
        rules={[{ required: true, message: 'Please input your name!' }]}
      >
        <Input prefix={<UserOutlined />} />
      </Form.Item>

      <Form.Item<RegisterFieldType>
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input a valid email!', type: 'email' }]}
      >
        <Input prefix={<UserOutlined />} autoComplete="email" />
      </Form.Item>

      <Form.Item<RegisterFieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password prefix={<LockOutlined />} autoComplete="current-password" />
      </Form.Item>

      <Form.Item<RegisterFieldType>
        name="country"
        label="Country"
        rules={[{ required: true, message: 'Please select your country!' }]}
      >
        <Select showSearch suffixIcon={<DownOutlined />}>
          <Option value="fr">FR - France</Option>
          <Option value="en">EN - England</Option>
        </Select>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
