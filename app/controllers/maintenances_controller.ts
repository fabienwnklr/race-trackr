import Maintenance from '#models/maintenance'
import type { HttpContext } from '@adonisjs/core/http'

export default class MaintenancesController {
  async index({ inertia }: HttpContext) {
    return inertia.render('maintenances/maintenances')
  }

  async createOrEdit({ inertia, params }: HttpContext) {
    if (params.id) {
      const maintenance = await Maintenance.query().where('id', params.id).firstOrFail()

      return inertia.render('maintenances/[id]', { maintenance })
    }
    return inertia.render('maintenances/[id]')
  }

  async showMaintenanceForVehicle({ inertia }: HttpContext) {
    return inertia.render('maintenances/maintenance', {
      name: 'test',
    })
  }
}
