import { DateTime } from 'luxon'
import { BaseModel, CamelCaseNamingStrategy, column, hasOne } from '@adonisjs/lucid/orm'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import User from './user.js'

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

  @column()
  declare name: string

  @column()
  declare slug: string

  @column.dateTime({ autoCreate: true, columnName: 'createdAt' })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'updatedAt' })
  declare updatedAt: DateTime
}
