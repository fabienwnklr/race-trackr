import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Trackday from './trackday.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Chrono extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare lapTime: string

  @column()
  declare trackdayId: number

  @belongsTo(() => Trackday)
  declare trackDay: BelongsTo<typeof Trackday>

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updated_at: DateTime
}
