import Maintenance from '#models/maintenance'
import UserVehicle from '#models/user_vehicle'
import { createMaintenanceValidator } from '#validators/maintenance_validators'
import type { HttpContext } from '@adonisjs/core/http'

export default class MaintenancesController {
  /**
   * @view
   * Show all maintenances
   */
  async index({ inertia }: HttpContext) {
    return inertia.render('maintenances/maintenances')
  }

  /**
   * @view
   * Show edit form
   */
  async createOrEdit({ inertia, params }: HttpContext) {
    const userVehicles = await UserVehicle.all()

    if (params.id) {
      const maintenance = await Maintenance.query().where('id', params.id).firstOrFail()

      return inertia.render('maintenances/[id]', { maintenance, userVehicles })
    }
    return inertia.render('maintenances/[id]', { userVehicles })
  }

  /**
   * Create maintenance and redirect to maintenances
   */
  async create({ inertia, request, session, i18n, auth }: HttpContext) {
    try {
      if (!auth.user) {
        return inertia.render('errors/unauthorized')
      }
      const data = request.all()
      data.userId = auth.user.id
      data.date = new Date(data.date).toISOString()
      console.log(data)

      await createMaintenanceValidator.validate(data)

      await Maintenance.create(data)
      session.flash('success', i18n.t('success.maintenanceCreated'))
      return inertia.render('maintenances/maintenances')
    } catch (error) {
      console.log(error)
      session.flash('error', i18n.t('error.creatingMaintenance', { error }))
      return inertia.render('maintenances/create')
    }
  }

  async update({ inertia, params, session }: HttpContext) {
    const maintenanceData = params.all()
    const maintenance = await Maintenance.findByOrFail('id', maintenanceData.id)
  }

  async showMaintenanceForVehicle({ inertia }: HttpContext) {
    return inertia.render('maintenances/maintenance', {
      name: 'test',
    })
  }
}
