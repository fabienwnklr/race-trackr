import type { HttpContext } from '@adonisjs/core/http'

export default class MaintenancesController {
  async index({ inertia }: HttpContext) {
    return inertia.render('maintenances/index')
  }

  async showMaintenanceForVehicle({ inertia }: HttpContext) {
    return inertia.render('maintenances/maintenance', {
      name: 'test',
    })
  }
}
