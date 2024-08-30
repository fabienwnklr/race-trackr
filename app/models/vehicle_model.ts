import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import VehicleCylinder from './vehicle_cylinder.js'
import type { HasOne } from '@adonisjs/lucid/types/relations'

/**
 * Vehicle model like 'gsx-r'
 */
export default class VehicleModel extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @hasOne(() => VehicleCylinder)
  declare cylinder: HasOne<typeof VehicleCylinder>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
