import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import VehicleBrand from './vehicle_brand.js'

/**
 * Vehicle model used into maintenances (My bike 1, etc)
 */
export default class UserVehicle extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare slug: string

  @column()
  declare creation_date: DateTime

  @hasOne(() => VehicleBrand)
  declare brand: HasOne<typeof VehicleBrand>

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updated_at: DateTime
}
