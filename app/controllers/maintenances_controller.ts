import Maintenance from '#models/maintenance'
import UserVehicle from '#models/user_vehicle'
import type { HttpContext } from '@adonisjs/core/http'

export default class MaintenancesController {
  async index({ inertia }: HttpContext) {
    return inertia.render('maintenances/maintenances')
  }

  async createOrEdit({ inertia, params }: HttpContext) {
    const userVehicles = await UserVehicle.all()

    if (params.id) {
      const maintenance = await Maintenance.query().where('id', params.id).firstOrFail()

      return inertia.render('maintenances/[id]', { maintenance, userVehicles })
    }
    return inertia.render('maintenances/[id]', { userVehicles })
  }

  async showMaintenanceForVehicle({ inertia }: HttpContext) {
    return inertia.render('maintenances/maintenance', {
      name: 'test',
    })
  }
}
