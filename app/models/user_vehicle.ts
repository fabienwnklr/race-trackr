import { DateTime } from 'luxon'
import { BaseModel, CamelCaseNamingStrategy, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import type { HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Maintenance from './maintenance.js'

BaseModel.namingStrategy = new CamelCaseNamingStrategy()

/**
 * Vehicle model used into maintenances (My bike 1, etc)
 */
export default class UserVehicle extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @hasOne(() => User)
  declare user: HasOne<typeof User>

  @column({ columnName: 'userId' })
  declare userId: number // Référence a l'utilisateur

  @hasMany(() => Maintenance)
  declare maintenances: HasMany<typeof Maintenance>

  // @hasOne(() => Maintenance)
  // declare maintenance: HasOne<typeof Maintenance>

  // @column({ columnName: 'maintenanceId' })
  // declare maintenanceId: number

  @column()
  declare name: string

  @column()
  declare slug: string

  @column.dateTime({ autoCreate: true, columnName: 'createdAt' })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'updatedAt' })
  declare updatedAt: DateTime
}
