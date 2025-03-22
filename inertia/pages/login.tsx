import { Col, notification, Row, Tabs } from 'antd'
import { LoginForm } from '#components/login_form'
import RegisterForm from '#components/register_form'
import i18n from '#config/i18n_react'

export default function Login(props: { errors?: string }) {
  const { errors } = props

  if (errors) {
    notification.error({
      message: i18n.t('validation:error'),
      description: errors,
    })
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}
