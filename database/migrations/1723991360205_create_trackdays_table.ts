import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'trackdays'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.date('date').notNullable()
      table.string('weather').nullable()
      table.string('tire_pressure_front').nullable()
      table.string('tire_pressure_back').nullable()
      table.text('details').nullable()
      table.integer('track_id').unsigned().references('tracks.id').onDelete('CASCADE') // Relation avec Track
      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE') // Référence à l'utilisateur

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
