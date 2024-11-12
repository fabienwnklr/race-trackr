import { DateTime } from 'luxon'
import { BaseModel, CamelCaseNamingStrategy, column, hasOne } from '@adonisjs/lucid/orm'
import UserVehicle from './user_vehicle.js'
import type { HasOne } from '@adonisjs/lucid/types/relations'

BaseModel.namingStrategy = new CamelCaseNamingStrategy()

export default class Maintenance extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @hasOne(() => UserVehicle)
  declare vehicleId: HasOne<typeof UserVehicle>

  @column()
  declare name: string

  @column.dateTime({ autoCreate: false })
  declare date: DateTime

  @column()
  declare details: string

  @column.dateTime({ autoCreate: true, columnName: 'createdAt' })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'updatedAt' })
  declare updatedAt: DateTime
}
