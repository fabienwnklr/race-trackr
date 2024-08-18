import type { HttpContext } from '@adonisjs/core/http'

export default class MaintenancesController {
  async index({ inertia }: HttpContext) {
    return inertia.render('maintenances')
  }
}