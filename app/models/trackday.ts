import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import Track from './track.js'
import type { HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import Chrono from './chrono.js'

export default class Trackday extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare slug: string // slug = name of track

  @column.dateTime({ autoCreate: false })
  declare date: DateTime

  @column()
  declare track_map: string

  @column()
  declare weather: string

  @column()
  declare tire_pressure: string

  @hasOne(() => Track)
  declare track: HasOne<typeof Track>

  @hasMany(() => Chrono)
  declare chronos: HasMany<typeof Chrono>

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updated_at: DateTime
}
