import { DateTime } from 'luxon'
import { BaseModel, CamelCaseNamingStrategy, column } from '@adonisjs/lucid/orm'

BaseModel.namingStrategy = new CamelCaseNamingStrategy()

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

  @column.dateTime({ autoCreate: true, columnName: 'createdAt' })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'updatedAt' })
  declare updatedAt: DateTime
}
