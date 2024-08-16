import { NotificationPlacement } from 'antd/es/notification/interface'
import { useState } from 'react'
import { Button, Select, Form, Input } from 'antd'
import { ValidateErrorEntity } from 'rc-field-form/lib/interface'
import { UserOutlined, LockOutlined, DownOutlined } from '@ant-design/icons'
import { RegisterFieldType } from '../../@types/form'

const { Option } = Select

const onResgister = async (
  values: RegisterFieldType,
  openNotification: (message: string, placement: NotificationPlacement, details: string) => void
) => {
  if (values.fullName && values.email && values.password && values.country) {
    try {
      const url = `/auth/register`
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

      const data = await response.json()

      if (data.error) {
        openNotification('Error', 'bottom', data.error.message)
      }
    } catch (error) {
      console.error(error)
    }
  }
}

const onResgisterFailed = (
  errorInfo: ValidateErrorEntity<RegisterFieldType>,
  openNotification: (message: string, placement: NotificationPlacement, details: string) => void
) => {
  openNotification('Error', 'bottom', 'Please fill all input.')
}

/**
 * Register form
 * @param openNotification
 * @returns
 */
export function Register(
  openNotification: (message: string, placement: NotificationPlacement, details: string) => void
) {
  const [isLoading, setLoading] = useState(false)

  return (
    <Form
      name="register"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={async (values) => {
        await onResgister(values, openNotification)
        setLoading(false)
      }}
      onFinishFailed={(errorInfo) => {
        onResgisterFailed(errorInfo, openNotification)
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
