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
      {
        name: 'Alcarras',
        slug: 'alcarras',
      },
      {
        name: 'Valencia',
        slug: 'valencia',
      },
      {
        name: 'Jerez',
        slug: 'jerez',
      },
      {
        name: 'Calafat',
        slug: 'calafat',
      },
      {
        name: 'Dijon',
        slug: 'dijon',
      },
      {
        name: 'Misano',
        slug: 'misano',
      },
      {
        name: 'Mugello',
        slug: 'mugello',
      },
      {
        name: ' Magny Cours',
        slug: 'magny-cours',
      },
      {
        name: 'Ales',
        slug: 'ales',
      },
      {
        name: 'Le Mans',
        slug: 'le-mans',
      },
      {
        name: 'Portimao',
        slug: 'portimao',
      },
    ])
  }
}
