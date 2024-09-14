import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'vehicle_cylinders'

  async up() {
    // this.schema.createTable(this.tableName, (table) => {
    // table.increments('id')
    // table.string('cylinder').notNullable()
    // table
    //   .integer('vehicleModelId')
    //   .unsigned()
    //   .references('id')
    //   .inTable('vehicleModels')
    //   .onDelete('CASCADE') // Clé étrangère vers vehicleModels
    // table.timestamp('createdAt')
    // table.timestamp('updatedAt')
    // })
  }

  async down() {
    // this.schema.dropTable(this.tableName)
  }
}
