import VehicleBrand from '#models/vehicle_brand'
import VehicleCylinder from '#models/vehicle_cylinder'
import VehicleModel from '#models/vehicle_model'
import VehicleType from '#models/vehicle_type'
import type { HttpContext } from '@adonisjs/core/http'

export default class VehiclesController {
  async index({ inertia }: HttpContext) {
    return inertia.render('vehicles/index')
  }

  async indexAdmin({ inertia }: HttpContext) {
    return inertia.render('admin/vehicles/index')
  }

  async read({ response }: HttpContext) {
    try {
      // Récupérer le VehicleType avec toutes les relations imbriquées
      const vehicleType = await VehicleType.query()
        .where('id', 1) // Filtrer par VehicleType ID
        .preload('brands', (brandQuery) => {
          // Ajouter un filtre pour VehicleBrand
          brandQuery
            .where('name', 'LIKE', '%Suzuki%') // Filtrer par nom de marque
            .preload('models', (modelQuery) => {
              // Charger les modèles (VehicleModel) pour chaque marque (VehicleBrand)
              modelQuery.preload('cylinders')
            })
        })
        .firstOrFail() // Assurer que le résultat est trouvé

      return response.ok(vehicleType)
    } catch (error) {
      return response.badRequest({ message: 'VehicleType not found', error })
    }
  }

  async readVehicleType({ response }: HttpContext) {
    try {
      const vehicleType = await VehicleType.all()
      return response.ok(vehicleType)
    } catch (error) {
      return response.badRequest({ message: 'VehicleType not found', error })
    }
  }

  async readBrand({ response, params }: HttpContext) {
    try {
      const vehicleBrand = await VehicleBrand.findByOrFail({
        vehicleTypeId: params.id,
      })
      return response.ok(vehicleBrand)
    } catch (error) {
      return response.badRequest({ message: 'vehicleBrand not found', error })
    }
  }

  async readModels({ response, params }: HttpContext) {
    try {
      const vehicleModels = await VehicleModel.findByOrFail({ vehicleBrandId: params.id })
      return response.ok(vehicleModels)
    } catch (error) {
      console.log(error)
      return response.badRequest({ message: 'vehicleModels not found', error })
    }
  }

  async readCylinders({ response, params }: HttpContext) {
    try {
      const vehicleCylinders = await VehicleCylinder.findByOrFail({ vehicleModelId: params.id })
      return response.ok(vehicleCylinders)
    } catch (error) {
      return response.badRequest({ message: 'vehicleCylinders not found', error })
    }
  }
}
