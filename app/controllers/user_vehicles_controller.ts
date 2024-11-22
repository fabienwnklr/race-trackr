import type { HttpContext } from '@adonisjs/core/http'
import UserVehicle from '#models/user_vehicle'
import { errors } from '@vinejs/vine'
import { slugify } from '#utils/index'

export default class UserVehiclesController {
  public async index({ auth, inertia }: HttpContext) {
    const userVehicles = await UserVehicle.query().where('userId', auth.user!.id)

    return inertia.render('user_vehicles/user_vehicles', {
      userVehicles: userVehicles,
    })
  }

  public async create({ request, response, auth, inertia }: HttpContext) {
    try {
      const data = request.all()
      data.userId = auth.user!.id
      data.slug = slugify(data.name)
      await UserVehicle.create(data)
      const userVehicles = await UserVehicle.query().where('userId', auth.user!.id)
      return inertia.render('user_vehicles/user_vehicles', userVehicles)
    } catch (error) {
      console.log(error)
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return response.json({ error: error.messages[0] })
      } else {
        return response.json({ error: error })
      }
    }
  }
}
