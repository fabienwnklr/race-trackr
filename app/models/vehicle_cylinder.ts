import { DateTime } from 'luxon'
import { BaseModel, belongsTo, CamelCaseNamingStrategy, column } from '@adonisjs/lucid/orm'
import VehicleModel from './vehicle_model.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

BaseModel.namingStrategy = new CamelCaseNamingStrategy()

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

  @column.dateTime({ autoCreate: true, columnName: 'createdAt' })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'updatedAt' })
  declare updatedAt: DateTime
}
