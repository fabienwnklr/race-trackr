import { DateTime } from 'luxon'
import { BaseModel, belongsTo, CamelCaseNamingStrategy, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import VehicleModel from './vehicle_model.js'
import VehicleType from './vehicle_type.js'

BaseModel.namingStrategy = new CamelCaseNamingStrategy()

export default class VehicleBrand extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare slug: string

  // Clé étrangère vers VehicleType
  @column()
  declare vehicleTypeId: number

  @belongsTo(() => VehicleType)
  declare vehicleType: BelongsTo<typeof VehicleType>

  @hasMany(() => VehicleModel)
  declare models: HasMany<typeof VehicleModel>

  @column.dateTime({ autoCreate: true, columnName: 'createdAt' })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'updatedAt' })
  declare updatedAt: DateTime
}
