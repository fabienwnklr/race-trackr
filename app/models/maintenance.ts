import { DateTime } from 'luxon'
import { BaseModel, belongsTo, CamelCaseNamingStrategy, column, hasOne } from '@adonisjs/lucid/orm'
import UserVehicle from './user_vehicle.js'
import type { BelongsTo, HasOne } from '@adonisjs/lucid/types/relations'
import User from './user.js'

BaseModel.namingStrategy = new CamelCaseNamingStrategy()

export default class Maintenance extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @belongsTo(() => UserVehicle)
  declare vehicle: BelongsTo<typeof UserVehicle>

  @column({ columnName: 'vehicleId' })
  declare vehicleId: number

  @hasOne(() => User)
  declare user: HasOne<typeof User>

  @column({ columnName: 'userId' })
  declare userId: number // Référence a l'utilisateur

  @column()
  declare name: string

  @column()
  declare date: string

  @column()
  declare details: string

  @column.dateTime({ autoCreate: true, columnName: 'createdAt' })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'updatedAt' })
  declare updatedAt: DateTime
}
