import { RegisterForm } from '#components/register_form'
import i18n from '#config/i18n_react'
import { toast } from 'sonner'

export default function Register(props: { errors?: string }) {
  const { errors } = props

  if (errors) {
    toast.error(errors)
  }

  return (
    <div>
      <RegisterForm />
    </div>
  )
}
