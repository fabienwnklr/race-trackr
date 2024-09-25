import { useState } from 'react'
import { Button, Select, Form, Input } from 'antd'
import { UserOutlined, LockOutlined, DownOutlined } from '@ant-design/icons'
import { router } from '@inertiajs/react'

import type { RegisterFieldType } from '#types/auth'
import i18n from '#config/i18n_react'

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
        label={i18n.t('fullName')}
        name="fullName"
        rules={[{ required: true, message: i18n.t('validation:full_name_required') }]}
      >
        <Input prefix={<UserOutlined />} />
      </Form.Item>

      <Form.Item<RegisterFieldType>
        label={i18n.t('email')}
        name="email"
        rules={[{ required: true, message: i18n.t('validation:email_required'), type: 'email' }]}
      >
        <Input prefix={<UserOutlined />} autoComplete="email" />
      </Form.Item>

      <Form.Item<RegisterFieldType>
        label={i18n.t('password')}
        name="password"
        rules={[{ required: true, message: i18n.t('validation:password_required') }]}
      >
        <Input.Password prefix={<LockOutlined />} autoComplete="current-password" />
      </Form.Item>
      <Form.Item<RegisterFieldType>
        label={i18n.t('passwordConfirm')}
        name="passwordConfirm"
        rules={[{ required: true, message: i18n.t('validation:password_required') }]}
      >
        <Input.Password prefix={<LockOutlined />} />
      </Form.Item>

      <Form.Item<RegisterFieldType>
        label={i18n.t('country')}
        name="country"
        rules={[{ required: true, message: i18n.t('validation:country_required') }]}
      >
        <Select showSearch suffixIcon={<DownOutlined />}>
          <Option value="fr">FR - France</Option>
          <Option value="en">EN - England</Option>
        </Select>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          {i18n.t('register')}
        </Button>
      </Form.Item>
    </Form>
  )
}
