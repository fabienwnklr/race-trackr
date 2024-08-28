import type { HttpContext } from '@adonisjs/core/http'

export default class TrackController {
  async index({ inertia }: HttpContext) {
    return inertia.render('tracks')
  }

  async indexAdmin({ inertia }: HttpContext) {
    return inertia.render('admin/tracks/index')
  }

  async createTrack({ inertia }: HttpContext) {
    return inertia.render('admin/tracks/create')
  }
}
