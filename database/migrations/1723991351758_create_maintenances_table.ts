import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'maintenances'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.integer('vehiculeId').unsigned().references('vehicules.id').onDelete('CASCADE')
      table.string('name').notNullable()
      table.date('date').notNullable()
      table.text('details').nullable()
      table.timestamp('createdAt')
      table.timestamp('updatedAt')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
