import { DateTime } from 'luxon'
import { BaseModel, CamelCaseNamingStrategy, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import type { HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import Trackday from './trackday.js'
import Country from './country.js'

export default class Track extends BaseModel {
  static namingStrategy = new CamelCaseNamingStrategy()

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare slug: string

  @column({ columnName: 'countryId' })
  declare countryId: number // Référence au pays

  @hasOne(() => Country)
  declare country: HasOne<typeof Country>

  @column()
  declare city: string | null

  @column()
  declare adress: string | null

  @column()
  declare turn: string | number | null

  @column()
  declare width: string | number | null

  @column()
  declare length: number | null

  @column({ columnName: 'maxDb' })
  declare maxDb: number | null

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
