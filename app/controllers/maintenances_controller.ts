import Maintenance from '#models/maintenance'
import UserVehicle from '#models/user_vehicle'
import { createMaintenanceValidator } from '#validators/maintenance_validators'
import type { HttpContext } from '@adonisjs/core/http'
import redis from '@adonisjs/redis/services/main'
import type { Maintenance as MaintenanceType } from '#types/maintenance'
import { CACHE_DURATION } from '#config/cache'
export default class MaintenancesController {
  /**
   * @view
   * Show all maintenances
   */
  async index({ inertia, auth }: HttpContext) {
    const user = auth.user

    if (!user) {
      return inertia.render('errors/unauthorized')
    }
    // Get maintenances from cache
    let cachedMaintenances = await redis.get('maintenances')
    if (cachedMaintenances) {
      const maintenances = JSON.parse(cachedMaintenances) as MaintenanceType
      return inertia.render('maintenances/maintenances', {
        maintenances,
      })
    }
    const maintenances = await Maintenance.query().where('userId', user.id).preload('vehicle')
    // Set cached maintenances during 120 seconds (cf: config/cache.ts)
    await redis.set('maintenances', JSON.stringify(maintenances), 'EX', CACHE_DURATION)
    return inertia.render('maintenances/maintenances', { maintenances })
  }

  async show({ inertia, params }: HttpContext) {
    const maintenance = await Maintenance.query().where('id', params.id).firstOrFail()
    return inertia.render('maintenances/maintenance', { maintenance })
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
  async create({ response, request, session, i18n, auth }: HttpContext) {
    try {
      if (!auth.user) {
        return response.redirect('errors/unauthorized')
      }
      const data = request.all()
      data.userId = auth.user.id
      data.date = new Date(data.date).toISOString()

      await createMaintenanceValidator.validate(data)

      await Maintenance.create(data)
      session.flash('success', i18n.t('success.maintenanceCreated'))
      return response.redirect('/maintenances')
    } catch (error) {
      session.flash('error', i18n.t('error.creatingMaintenance', { error }))
      return response.redirect('/maintenances/create')
    }
  }

  async update({ response, request, session, i18n, params }: HttpContext) {
    const maintenanceData = request.all()
    const maintenance = await Maintenance.findByOrFail('id', params.id)
    try {
      maintenance.name = maintenanceData.name
      maintenance.date = new Date(maintenanceData.date).toISOString()
      maintenance.details = maintenanceData.details
      maintenance.vehicleId = maintenanceData.vehicleId

      await maintenance.save()

      session.flash('success', i18n.t('success.maintenanceUpdated'))
      return response.redirect(`/maintenances/${maintenance.id}/edit`)
    } catch (error) {
      console.log(error)
      session.flash('error', i18n.t('error.update', { error }))
      return response.redirect(`maintenances/${maintenance.id}/edit`)
    }
  }

  async delete({ response, params, session, i18n, auth }: HttpContext) {
    if (!auth.user) {
      return response.redirect('errors/unauthorized')
    }
    const maintenance = await Maintenance.findByOrFail('id', params.id)
    await maintenance.delete()
    session.flash('success', i18n.t('success.maintenanceDeleted'))
    return response.redirect('/maintenances')
  }
}
