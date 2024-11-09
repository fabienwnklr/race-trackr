import { useState } from 'react'
import { Button, Checkbox, Flex, Form, Input } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { router, useForm } from '@inertiajs/react'

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
  const [form] = Form.useForm<LoginFieldType>()

  return (
    <Form
      form={form}
      name="login"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true, email: 'admin@hotmail.fr', password: 'admin' }}
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
        rules={[{ required: true, type: 'email', message: i18n.t('validation:email_required') }]}
      >
        <Input prefix={<UserOutlined />} autoComplete="email" />
      </Form.Item>

      <Form.Item<LoginFieldType>
        label={i18n.t('password')}
        name="password"
        rules={[{ required: true, message: i18n.t('validation:password_required') }]}
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
          <Checkbox>{i18n.t('rememberMe')}</Checkbox>
        </Form.Item>
        <Button type="link" href="">
          {i18n.t('forgotPassword')}
        </Button>
      </Flex>

      <Flex justify="space-around" align="center">
        <Button type="primary" htmlType="submit" loading={isLoading}>
          {i18n.t('login')}
        </Button>
        {/* <Button>{i18n.t('register')}</Button>
          <Button>{i18n.t('register_with_facebook')}</Button>
          <Button>{i18n.t('register_with_google')}</Button>
          <Button>{i18n.t('register_with_twitter')}</Button>
          <Button>{i18n.t('register_with_apple')}</Button> */}
      </Flex>
    </Form>
  )
}
