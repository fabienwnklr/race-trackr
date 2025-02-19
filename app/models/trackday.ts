import { DateTime } from 'luxon'
import { BaseModel, belongsTo, CamelCaseNamingStrategy, column, hasMany } from '@adonisjs/lucid/orm'
import Track from './track.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Chrono from './chrono.js'
import User from './user.js'
import { Weather } from '#types/trackday'

BaseModel.namingStrategy = new CamelCaseNamingStrategy()

export default class Trackday extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare date: string

  @column()
  declare weather: Weather | null

  @column({ columnName: 'tirePressureBack' })
  declare tirePressureBack: string | null

  @column()
  declare details: string | null

  @column({ columnName: 'userId' })
  declare userId: number // Référence à l'utilisateur qui a créé ce TrackDay

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column({ columnName: 'trackId' })
  declare trackId: number // Référence vers un Track

  @belongsTo(() => Track)
  declare track: BelongsTo<typeof Track>

  @column({ columnName: 'bestChrono' })
  declare bestChrono: string | null

  @column({ columnName: 'regulChrono' })
  declare regulChrono: string | null

  @hasMany(() => Chrono)
  declare chronos: HasMany<typeof Chrono>

  @column.dateTime({ autoCreate: true, columnName: 'createdAt' })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'updatedAt' })
  declare updatedAt: DateTime
}
