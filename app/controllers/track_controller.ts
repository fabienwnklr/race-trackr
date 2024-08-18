import type { HttpContext } from '@adonisjs/core/http'

export default class TrackController {
  async index({ inertia }: HttpContext) {
    return inertia.render('tracks')
  }
}
