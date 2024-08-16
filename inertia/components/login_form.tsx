import { NotificationPlacement } from 'antd/es/notification/interface'
import { useState } from 'react'
import { Button, Checkbox, Form, Input } from 'antd'
import { ValidateErrorEntity } from 'rc-field-form/lib/interface'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import type { LoginFieldType } from '../../@types/form'

const onLogin = async (
  values: LoginFieldType,
  openNotification: (message: string, placement: NotificationPlacement, details: string) => void
) => {
  if (values.email && values.password) {
    try {
      const url = `/auth/login`
      const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(values),
      })

      let data = {
        error: '',
      }
      try {
        data = await response.json()
      } catch (err) {}

      if (data.error) {
        openNotification('Error', 'bottom', data.error)
      } else {
        localStorage.setItem('jwtToken', JSON.stringify(data))
      }
    } catch (error) {
      console.error(error)
    }
  }
}

const onLoginFailed = (
  errorInfo: ValidateErrorEntity<LoginFieldType>,
  openNotification: (message: string, placement: NotificationPlacement, details: string) => void
) => {
  openNotification('Error', 'bottom', 'Please fill all input.')
}

/**
 * Login form
 * @param openNotification
 * @returns
 */
export function Login(
  openNotification: (message: string, placement: NotificationPlacement, details: string) => void
) {
  const [isLoading, setLoading] = useState(false)

  return (
    <Form
      name="login"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={async (values) => {
        await onLogin(values, openNotification)
        setLoading(false)
      }}
      onFinishFailed={(errorInfo) => {
        onLoginFailed(errorInfo, openNotification)
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
        <Checkbox checked={false}>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
