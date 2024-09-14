import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await User.createMany([
      {
        email: 'admin@tdm.com',
        password: 'admin',
        role: 'admin',
        country: 'france',
      },
      {
        email: 'romain@adonisjs.com',
        password: 'supersecret',
        country: 'france',
      },
    ])
  }
}
