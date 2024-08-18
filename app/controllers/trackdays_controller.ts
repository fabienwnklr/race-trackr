import type { HttpContext } from '@adonisjs/core/http'

export default class TrackDaysController {
  async index({ inertia }: HttpContext) {
    return inertia.render('trackdays')
  }
}
