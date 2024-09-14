import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'trackdays'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.date('date').notNullable()
      table.string('weather').nullable()
      table.string('tirePressureFront').nullable()
      table.string('tirePressureBack').nullable()
      table.string('bestChrono').nullable()
      table.string('regulChrono').nullable()
      table.text('details').nullable()
      table.integer('trackId').unsigned().references('tracks.id').onDelete('CASCADE') // Relation avec Track
      table.integer('userId').unsigned().references('users.id').onDelete('CASCADE') // Référence à l'utilisateur

      table.timestamp('createdAt')
      table.timestamp('updatedAt')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
