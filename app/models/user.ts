import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, CamelCaseNamingStrategy, column, hasMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Trackday from './trackday.js'
import { AccessToken, DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  static namingStrategy = new CamelCaseNamingStrategy()

  currentAccessToken?: AccessToken

  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'firstName' })
  declare firstName: string

  @column({ columnName: 'lastName' })
  declare lastName: string

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare country: string

  @column()
  declare role: string

  @column()
  declare premium: boolean

  static accessTokens = DbAccessTokensProvider.forModel(User)

  @hasMany(() => Trackday)
  declare trackDays: HasMany<typeof Trackday>

  @column.dateTime({ autoCreate: true, columnName: 'createdAt' })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'updatedAt' })
  declare updatedAt: DateTime | null
}
