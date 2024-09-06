import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'vehicle_cylinders'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('cylinder').notNullable()
      table
        .integer('vehicle_model_id')
        .unsigned()
        .references('id')
        .inTable('vehicle_models')
        .onDelete('CASCADE') // Clé étrangère vers vehicle_models

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
