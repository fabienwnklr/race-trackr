import Track from '#models/track'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Track.createMany([
      {
        name: 'Nogaro',
        slug: 'nogaro',
      },
      {
        name: 'Pau Arnos',
        slug: 'pau-arnos',
      },
      {
        name: 'Navarra',
        slug: 'navarra',
      },
      {
        name: 'Motorland Aràgon',
        slug: 'motorland-aragon',
      },
    ])
  }
}
