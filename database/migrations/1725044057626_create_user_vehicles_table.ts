import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user_vehicles'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('userId').unsigned().references('users.id').onDelete('CASCADE')
      table.string('name').notNullable().unique()
      table.string('slug').notNullable()
      table.timestamp('createdAt')
      table.timestamp('updatedAt')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
