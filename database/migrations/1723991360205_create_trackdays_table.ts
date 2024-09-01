import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'trackdays'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.timestamp('createdAt')
      table.timestamp('updatedAt')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
