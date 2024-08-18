import type { HttpContext } from '@adonisjs/core/http'

export default class ChronosController {
  async index({ inertia }: HttpContext) {
    return inertia.render('chronos')
  }
}
