import Country from '#models/country'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    Country.createMany([
      {
        name: 'France',
        slug: 'france',
        iso: 'FR',
        timezone: 'Europe/Paris',
        capital: 'Paris',
      },
      {
        name: 'Espagne',
        slug: 'espagne',
        iso: 'ES',
        timezone: 'Europe/Madrid',
        capital: 'Madrid',
      },
      {
        name: 'Italie',
        slug: 'italie',
        iso: 'IT',
        timezone: 'Europe/Rome',
        capital: 'Rome',
      },
      {
        name: 'Allemagne',
        slug: 'allemagne',
        iso: 'DE',
        timezone: 'Europe/Berlin',
        capital: 'Berlin',
      },
      {
        name: 'Portugal',
        slug: 'portugal',
        iso: 'PT',
        timezone: 'Europe/Lisbon',
        capital: 'Lisbonne',
      },
      {
        name: 'Irlande',
        slug: 'irlande',
        iso: 'IE',
        timezone: 'Europe/Dublin',
        capital: 'Dublin',
      },
      {
        name: 'Suisse',
        slug: 'suisse',
        iso: 'CH',
        timezone: 'Europe/Zurich',
        capital: 'Zurich',
      },
      {
        name: 'Angleterre',
        slug: 'angleterre',
        iso: 'GB',
        timezone: 'Europe/London',
        capital: 'London',
      },
      {
        name: 'Suisse',
        slug: 'suisse',
        iso: 'CH',
        timezone: 'Europe/Zurich',
        capital: 'Zurich',
      },
      {
        name: 'Belgique',
        slug: 'belgique',
        iso: 'BE',
        timezone: 'Europe/Brussels',
        capital: 'Brussels',
      },
      {
        name: 'Pays-Bas',
        slug: 'pays-bas',
        iso: 'NL',
        timezone: 'Europe/Amsterdam',
        capital: 'Amsterdam',
      },
      {
        name: 'Qatar',
        slug: 'qatar',
        iso: 'QA',
        timezone: 'Asia/Qatar',
        capital: 'Doha',
      },
      {
        name: 'Amerique',
        slug: 'amerique',
        iso: 'US',
        timezone: 'America/New_York',
        capital: 'New York',
      },
      {
        name: 'Indonésie',
        slug: 'indonesie',
        iso: 'ID',
        timezone: 'Asia/Jakarta',
        capital: 'Jakarta',
      },
      {
        name: 'Thaïlande',
        slug: 'thailand',
        iso: 'TH',
        timezone: 'Asia/Bangkok',
        capital: 'Bangkok',
      },
    ])
  }
}
