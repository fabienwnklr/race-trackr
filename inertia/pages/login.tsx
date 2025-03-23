import { LoginForm } from '#components/login_form'
import i18n from '#config/i18n_react'
import { toast } from 'sonner'
export default function Login(props: { errors?: string }) {
  const { errors } = props

  if (errors) {
    toast.error(errors)
  }

  return (
    <main>
      <LoginForm />
    </main>
  )
}
