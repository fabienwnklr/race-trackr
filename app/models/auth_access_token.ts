import { DateTime } from 'luxon'
import { BaseModel, CamelCaseNamingStrategy, column } from '@adonisjs/lucid/orm'

export default class AuthAccessToken extends BaseModel {
  static namingStrategy = new CamelCaseNamingStrategy()

  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'tokenableId' })
  declare tokenableId: number

  @column()
  declare type: string

  @column()
  declare name: string

  @column()
  declare hash: string

  @column()
  declare abilities: string

  @column({ columnName: 'lastUsedAt' })
  declare lastUsedAt: DateTime | null

  @column({ columnName: 'expiresAt' })
  declare expiresAt: DateTime | null

  @column({ columnName: 'userId' })
  declare userId: number

  @column.dateTime({ autoCreate: true, columnName: 'createdAt' })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'updatedAt' })
  declare updatedAt: DateTime
}
