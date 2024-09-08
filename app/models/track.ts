import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Trackday from './trackday.js'

export default class Track extends BaseModel {
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

  @column()
  declare best_lap_time: string | null

  @column()
  declare best_lap_time_pilote: string | null

  @column()
  declare infos: string | null

  @hasMany(() => Trackday)
  declare trackDays: HasMany<typeof Trackday>

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updated_at: DateTime
}
