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

  async login({ request, response, auth, session }: HttpContext) {
    try {
      const { email, password } = request.only(['email', 'password'])

      await createLoginValidator.validate({ email, password })

      const user = await User.verifyCredentials(email, password)

      await auth.use('web').login(user)

      session.flash('success', `Welcome back ${user.fullName}`)
      return response.redirect().toPath('/dashboard')
    } catch (error) {
      return response.status(500).json({ error: 'Invalid credentials' })
    }
  }

  async logout({ response, auth }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect('/login')
  }
}
