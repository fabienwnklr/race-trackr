import { DateTime } from 'luxon'
import { BaseModel, CamelCaseNamingStrategy, column, hasMany } from '@adonisjs/lucid/orm'
import VehicleBrand from './vehicle_brand.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

BaseModel.namingStrategy = new CamelCaseNamingStrategy()

/**
 * Vehicle type like car/moto
 */
export default class VehicleType extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  // @column()
  // declare brands: HasMany<typeof VehicleBrand>

  @hasMany(() => VehicleBrand)
  declare brands: HasMany<typeof VehicleBrand>

  @column.dateTime({ autoCreate: true, columnName: 'createdAt' })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'updatedAt' })
  declare updatedAt: DateTime
}
