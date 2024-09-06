import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import VehicleModel from './vehicle_model.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class VehicleCylinder extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare cylinder: string

  // Clé étrangère vers VehicleBrand
  @column()
  declare vehicleModelId: number

  @belongsTo(() => VehicleModel)
  declare vehicleModel: BelongsTo<typeof VehicleModel>

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updated_at: DateTime
}
