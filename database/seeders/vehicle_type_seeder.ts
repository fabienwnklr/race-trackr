import VehicleBrand from '#models/vehicle_brand'
import VehicleCylinder from '#models/vehicle_cylinder'
import VehicleModel from '#models/vehicle_model'
import VehicleType from '#models/vehicle_type'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // const moto = await VehicleType.create({ name: 'Moto' })
    // const car = await VehicleType.create({ name: 'Car' })
    // const vehicleBrand = await VehicleBrand.create({
    //   name: 'Suzuki',
    //   slug: 'suzuki',
    //   vehicleTypeId: moto.id,
    // })
    // const vehicleModel = await VehicleModel.create({
    //   name: 'GSX-R',
    //   vehicleBrandId: vehicleBrand.id,
    // })
    // await VehicleCylinder.create({
    //   cylinder: '4',
    //   vehicleModelId: vehicleModel.id,
    // })
  }
}
