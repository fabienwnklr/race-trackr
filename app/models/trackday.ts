import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import Track from './track.js'
import type { BelongsTo, HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import Chrono from './chrono.js'
import User from './user.js'

export default class Trackday extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare date: string

  @column()
  declare weather: string

  @column()
  declare tire_pressure_front: string

  @column()
  declare tire_pressure_back: string

  @column()
  declare details: string

  @column()
  declare userId: number // Référence à l'utilisateur qui a créé ce TrackDay

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column()
  declare trackId: number // Référence vers un Track

  @belongsTo(() => Track)
  declare track: BelongsTo<typeof Track>

  @hasMany(() => Chrono)
  declare chronos: HasMany<typeof Chrono>

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updated_at: DateTime
}
