import { DateTime } from 'luxon'
import { BaseModel, belongsTo, CamelCaseNamingStrategy, column, hasMany } from '@adonisjs/lucid/orm'
import VehicleCylinder from './vehicle_cylinder.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import VehicleBrand from './vehicle_brand.js'

BaseModel.namingStrategy = new CamelCaseNamingStrategy()

/**
 * Vehicle model like 'gsx-r'
 */
export default class VehicleModel extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  // Clé étrangère vers VehicleBrand
  @column()
  declare vehicleBrandId: number

  @belongsTo(() => VehicleBrand)
  declare vehicleBrand: BelongsTo<typeof VehicleBrand>

  @hasMany(() => VehicleCylinder)
  declare cylinders: HasMany<typeof VehicleCylinder>

  @column.dateTime({ autoCreate: true, columnName: 'createdAt' })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'updatedAt' })
  declare updatedAt: DateTime
}
