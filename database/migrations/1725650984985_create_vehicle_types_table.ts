import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'vehicle_types'

  async up() {
    // this.schema.createTable(this.tableName, (table) => {
    //   table.increments('id').primary()
    //   table.string('name').notNullable()
    //   table.timestamp('createdAt')
    //   table.timestamp('updatedAt')
    // })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
