import { DateTime } from 'luxon'
import { BaseModel, CamelCaseNamingStrategy, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Trackday from './trackday.js'

export default class Track extends BaseModel {
  static namingStrategy = new CamelCaseNamingStrategy()

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare slug: string

  @column()
  declare country: string | null

  @column()
  declare city: string | null

  @column()
  declare adress: string | null

  @column()
  declare distance: string | null

  @column({ columnName: 'bestLapTime' })
  declare bestLapTime: string | null

  @column({ columnName: 'bestLapTimePilote' })
  declare bestLapTimePilote: string | null

  @column()
  declare infos: string | null

  @hasMany(() => Trackday)
  declare trackDays: HasMany<typeof Trackday>

  @column.dateTime({ autoCreate: true, columnName: 'createdAt' })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'updatedAt' })
  declare updatedAt: DateTime
}
