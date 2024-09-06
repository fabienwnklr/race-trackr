import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'vehicle_brands'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('name').notNullable()
      table.string('slug').notNullable()
      table
        .integer('vehicle_type_id')
        .unsigned()
        .references('id')
        .inTable('vehicle_types')
        .onDelete('CASCADE') // Clé étrangère vers vehicle_types

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
