import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await User.createMany([
      {
        email: 'admin@hotmail.fr',
        password: 'admin',
        role: 'admin',
        country: 'france',
        firstName: 'Winkler',
        lastName: 'Fabien',
      },
      {
        email: 'user@hotmail.com',
        password: 'user',
        country: 'france',
        role: 'user',
        firstName: 'Doe',
        lastName: 'John',
      },
    ])
  }
}
