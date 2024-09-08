import type { HttpContext } from '@adonisjs/core/http'
import { createRegisterValidator, createLoginValidator } from '#validators/auth_validator'
import User from '#models/user'
import { errors } from '@vinejs/vine'

export default class AuthController {
  async index({ inertia }: HttpContext) {
    return inertia.render('home')
  }

  async register({ request, response, auth }: HttpContext) {
    try {
      const data = request.all()

      await createRegisterValidator.validate(data)

      const user = await User.create(data)

      await auth.use('web').login(user)

      response.json({ error: false })
      return response.redirect().toRoute('dashboard')
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return response.json({ error: error.messages[0] })
      } else {
        return response.json({ error: error })
      }
    }
  }

  async login({ request, response, auth, session, i18n }: HttpContext) {
    try {
      const { email, password } = request.only(['email', 'password'])

      await createLoginValidator.validate({ email, password })

      const user = await User.verifyCredentials(email, password)

      await auth.use('web').login(user)

      session.flash('success', i18n.t('login_success'))

      return response.redirect('/dashboard')
    } catch (error) {
      // if (error instanceof E_INVALID_CREDENTIALS) {

      // }
      session.flash('error', i18n.t('validation.invalid_credentials'))
      return response.redirect('/')
    }
  }

  async logout({ response, auth }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect('/')
  }
}
