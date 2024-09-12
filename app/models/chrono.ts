import { DateTime } from 'luxon'
import { BaseModel, belongsTo, CamelCaseNamingStrategy, column } from '@adonisjs/lucid/orm'
import Trackday from './trackday.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

BaseModel.namingStrategy = new CamelCaseNamingStrategy()

export default class Chrono extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'lapTime' })
  declare lapTime: string

  @column({ columnName: 'trackdayId' })
  declare trackdayId: number

  @belongsTo(() => Trackday)
  declare trackDay: BelongsTo<typeof Trackday>

  @column.dateTime({ autoCreate: true, columnName: 'createdAt' })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'updatedAt' })
  declare updatedAt: DateTime
}
