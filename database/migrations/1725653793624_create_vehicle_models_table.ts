import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'vehicle_models'

  async up() {
    // this.schema.createTable(this.tableName, (table) => {
    //   table.increments('id').primary()
    //   table.string('name').notNullable()
    //   table
    //     .integer('vehicleBrandId')
    //     .unsigned()
    //     .references('id')
    //     .inTable('vehicle_brands')
    //     .onDelete('CASCADE') // Clé étrangère vers vehicle_brands
    //   table.timestamp('createdAt')
    //   table.timestamp('updatedAt')
    // })
  }

  async down() {
    // this.schema.dropTable(this.tableName)
  }
}
