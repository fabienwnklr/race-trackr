import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tracks'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.string('name').notNullable().unique()
      table.string('slug').notNullable()
      table.string('city')
      table.string('adress')
      table.string('turn')
      table.string('width')
      table.string('length')
      table.double('maxDb')
      table.string('bestLapTime')
      table.string('bestLapTimePilote')
      table.text('infos')
      table.string('urlLogo')
      table.string('urlTrackThumbnail')
      table.string('urlTrack')
      table.integer('countryId').unsigned().references('countries.id').onDelete('CASCADE')
      table.timestamp('createdAt')
      table.timestamp('updatedAt')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
