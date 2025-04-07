import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import Role from './role'

export default class Permission extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column({
    serialize: (value: PermissionType): PermissionType => value,
    consume: (value: PermissionType): PermissionType => value,
  })
  declare permissions: PermissionType

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @manyToMany(() => Role, {
    pivotTable: 'permission_role', // nom de ta table pivot
  })
  declare roles: ManyToMany<typeof Role>
}
