import Trackday from '#models/trackday'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Trackday.createMany([
      { date: '01/01/2024', trackId: 1, userId: 1 },
      { date: '02/04/2024', trackId: 1, userId: 1 },
      { date: '03/05/2024', trackId: 1, userId: 1 },
      { date: '04/02/2024', trackId: 3, userId: 1 },
      { date: '05/07/2024', trackId: 2, userId: 1 },
      { date: '06/08/2024', trackId: 3, userId: 1 },
    ])
  }
}
