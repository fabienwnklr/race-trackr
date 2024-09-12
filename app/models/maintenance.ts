import { DateTime } from 'luxon'
import { BaseModel, CamelCaseNamingStrategy, column } from '@adonisjs/lucid/orm'

BaseModel.namingStrategy = new CamelCaseNamingStrategy()

export default class Maintenance extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare slug: string

  @column.dateTime({ autoCreate: false })
  declare date: DateTime

  @column.dateTime({ autoCreate: true, columnName: 'createdAt' })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'updatedAt' })
  declare updatedAt: DateTime
}
