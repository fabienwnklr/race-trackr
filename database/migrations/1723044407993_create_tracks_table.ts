import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tracks'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.string('name').notNullable().unique()
      table.string('slug').notNullable()
      table.string('country')
      table.string('city')
      table.string('adress')
      table.integer('turn')
      table.integer('width')
      table.integer('length')
      table.integer('maxDb')
      table.string('bestLapTime')
      table.string('bestLapTimePilote')
      table.text('infos')

      table.timestamp('createdAt')
      table.timestamp('updatedAt')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
