import type { HttpContext } from '@adonisjs/core/http'
import { createRegisterValidator, createLoginValidator } from '#validators/auth_validator'
import User from '#models/user'
import { errors } from '@vinejs/vine'
import redis from '@adonisjs/redis/services/main'

export default class AuthController {
  async viewLogin({ inertia }: HttpContext) {
    return inertia.render('login')
  }

  async viewRegister({ inertia }: HttpContext) {
    return inertia.render('register')
  }

  async createToken({ inertia, auth, params }: HttpContext) {
    if (!auth.user) {
      return inertia.render('errors/unauthorized')
    }
    const { abilities, expiresIn, name } = params
    const token = await User.accessTokens.create(auth.user, abilities, {
      expiresIn,
      name,
    })

    return {
      type: 'bearer',
      value: token.value!.release(),
    }
  }

  async readTokens({ inertia, auth }: HttpContext) {
    if (!auth.user) {
      return inertia.render('errors/unauthorized')
    }
    const tokens = await User.accessTokens.all(auth.user)
    return inertia.render('tokens/index', { tokens })
  }

  async register({ request, response, auth }: HttpContext) {
    try {
      const data = request.all()

      await createRegisterValidator.validate(data)

      const user = await User.create(data)

      await auth.use('web').login(user)

      response.json({ error: false })
      await redis.set('user', JSON.stringify(user), 'EX', 60 * 60 * 24)
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
      await redis.set('user', JSON.stringify(user))
      session.flash('infos', i18n.t('success.login', { lastName: user.lastName }))

      return response.redirect('/dashboard')
    } catch (error) {
      session.flash('error', i18n.t('validation.invalidCredentials'))
      return response.redirect('/')
    }
  }

  async logout({ response, auth }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect('/')
  }
}
