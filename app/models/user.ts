import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import {
  BaseModel,
  belongsTo,
  CamelCaseNamingStrategy,
  column,
  hasMany,
  manyToMany,
} from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Trackday from './trackday.js'
import { AccessToken, DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import Role from './role.js'
import Permission from './permission.js'

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

  @belongsTo(() => Role)
  declare role: BelongsTo<typeof Role>

  @manyToMany(() => Permission, {
    pivotTable: 'role_user', // La table pivot entre `users` et `roles`
  })
  declare permissions: ManyToMany<typeof Permission>

  @column()
  declare premium: boolean

  static accessTokens = DbAccessTokensProvider.forModel(User)

  @hasMany(() => Trackday)
  declare trackDays: HasMany<typeof Trackday>

  @column.dateTime({ autoCreate: true, columnName: 'createdAt' })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'updatedAt' })
  declare updatedAt: DateTime | null

  // Méthode pour transformer les permissions en un objet avec des ressources et des actions
  public get transformedPermissions() {
    const permissionsObj: PermissionType = {
      dashboard: { view: false, edit: false, create: false, delete: false },
      trackday: { view: false, edit: false, create: false, delete: false },
      healthcheck: { view: false, edit: false, create: false, delete: false },
      track: { view: false, edit: false, create: false, delete: false },
      user_vehicle: { view: false, edit: false, create: false, delete: false },
      vehicle: { view: false, edit: false, create: false, delete: false },
      maintenance: { view: false, edit: false, create: false, delete: false },
    }

    this.permissions.forEach((permission) => {
      const description = permission.permissions as Record<ResourceList, Record<Action, boolean>>

      // Parcourir chaque ressource dans la description
      Object.keys(description).forEach((resource) => {
        const resourceKey = resource as keyof PermissionType
        if (permissionsObj[resourceKey]) {
          Object.keys(description[resourceKey]).forEach((action) => {
            const actionKey = action as keyof PermissionObject
            permissionsObj[resourceKey][actionKey] = description[resourceKey][actionKey]
          })
        }
      })
    })

    return permissionsObj
  }
}
