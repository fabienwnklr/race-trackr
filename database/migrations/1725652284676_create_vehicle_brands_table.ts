import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'vehicle_brands'

  async up() {
    // this.schema.createTable(this.tableName, (table) => {
    //   table.increments('id')
    //   table.string('name').notNullable()
    //   table.string('slug').notNullable()
    //   table
    //     .integer('vehiculeTypeId')
    //     .unsigned()
    //     .references('id')
    //     .inTable('vehicleTypes')
    //     .onDelete('CASCADE') // Clé étrangère vers vehicleTypes
    //   table.timestamp('createdAt')
    //   table.timestamp('updatedAt')
    // })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
