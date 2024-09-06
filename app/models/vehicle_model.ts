import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import VehicleCylinder from './vehicle_cylinder.js'
import type { BelongsTo, HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import VehicleBrand from './vehicle_brand.js'

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

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updated_at: DateTime
}
