import type { HttpContext } from '@adonisjs/core/http'

export default class VehiclesController {
  async index({ inertia }: HttpContext) {
    return inertia.render('vehicles/index')
  }

  async indexAdmin({ inertia }: HttpContext) {
    return inertia.render('admin/vehicles/index')
  }
}
