import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tracks'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('name').notNullable()
      table.string('slug').notNullable()
      table.string('country')
      table.string('city')
      table.string('adress')
      table.string('distance')
      table.string('best_lap_time')
      table.string('best_lap_time_pilote')
      table.text('infos')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
