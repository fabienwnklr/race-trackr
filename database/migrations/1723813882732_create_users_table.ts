import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable().primary()
      table.string('fullName').nullable()
      table.string('email', 254).notNullable().unique()
      table.string('password').notNullable()
      table.string('country').notNullable()
      table.string('role').notNullable().defaultTo('user')
      table.boolean('premium').notNullable().defaultTo(false)

      table.timestamp('createdAt').notNullable()
      table.timestamp('updatedAt').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
