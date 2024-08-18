import { useState } from 'react'
import { Button, Checkbox, Form, Input } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import type { LoginFieldType } from '../../@types/form'
import { router } from '@inertiajs/react'

const onLogin = async (values: LoginFieldType) => {
  if (values.email && values.password) {
    const url = `/auth/login`
    router.post(url, values)
  }
}

/**
 * Login form
 * @param openNotification
 * @returns
 */
export default function Login() {
  const [isLoading, setLoading] = useState(false)

  return (
    <Form
      name="login"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={async (values) => {
        await onLogin(values)
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
      <Form.Item<LoginFieldType>
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input prefix={<UserOutlined />} autoComplete="email" />
      </Form.Item>

      <Form.Item<LoginFieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password autoComplete="current-password" prefix={<LockOutlined />} />
      </Form.Item>

      <Form.Item<LoginFieldType>
        name="remember"
        //   valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
