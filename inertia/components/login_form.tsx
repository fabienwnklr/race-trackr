import { useState } from 'react'
import { Button, Checkbox, Flex, Form, Input } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { router } from '@inertiajs/react'

import type { LoginFieldType } from '#types/auth'
import i18n from '#config/i18n_react'

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
    >
      <Form.Item<LoginFieldType>
        label={i18n.t('email')}
        name="email"
        rules={[{ required: true, message: i18n.t('email_required') }]}
      >
        <Input prefix={<UserOutlined />} autoComplete="email" />
      </Form.Item>

      <Form.Item<LoginFieldType>
        label={i18n.t('password')}
        name="password"
        rules={[{ required: true, message: i18n.t('password_required') }]}
      >
        <Input.Password autoComplete="current-password" prefix={<LockOutlined />} />
      </Form.Item>

      <Flex
        justify="space-evenly"
        align="center"
        style={{
          marginBottom: 20,
        }}
      >
        <Form.Item<LoginFieldType>
          name="remember"
          valuePropName="checked"
          // wrapperCol={{ offset: 8, span: 16 }}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          noStyle
        >
          <Checkbox>{i18n.t('remember_me')}</Checkbox>
        </Form.Item>
        <Button type="link" href="">
          {i18n.t('forgot_password')}
        </Button>
      </Flex>

      <Flex justify="space-around" align="center">
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            {i18n.t('login')}
          </Button>
          <Button>{i18n.t('register')}</Button>
          <Button>{i18n.t('register_with_facebook')}</Button>
          <Button>{i18n.t('register_with_google')}</Button>
          <Button>{i18n.t('register_with_twitter')}</Button>
          <Button>{i18n.t('register_with_apple')}</Button>
        </Form.Item>
      </Flex>
    </Form>
  )
}
