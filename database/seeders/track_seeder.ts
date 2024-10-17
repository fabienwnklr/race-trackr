import Track from '#models/track'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Track.createMany([
      {
        name: 'Nogaro',
        slug: 'nogaro',
        countryId: 1,
        city: 'Nogaro',
        adress: "Av. de l'Autodrome, 32110 Nogaro, France",
        length: 3636,
        turn: '14 (5 à gauche et 9 à droite)',
        bestLapTime: '1.20.160',
        bestLapTimePilote: 'Alessandro Zanardi',
        width: 9.5,
        maxDb: 102,
        infos: '6600 m2 de bâtiments couverts',
      },
      {
        name: 'Pau Arnos',
        slug: 'pau-arnos',
        countryId: 1,
        city: 'Arnos',
        adress: 'Circuit Arnos, Petrou, 64370 Arnos, France',
        length: 3030,
        turn: "12 (7 à droite et 5 à gauche)",
        bestLapTime: '1.10.870',
        bestLapTimePilote: 'Giedo Van der Garde',
        width: "9 a 12",
        maxDb: 102,
        infos: '1 tracé principal de 3 030 mètres (5 tracés dérivés de 3 030 mètres & 600 mètres), circuit de karting',
      },
      {
        name: 'Navarra',
        slug: 'navarra',
        countryId: 2,
        city: 'Los Arcos',
        adress: 'Calle Malvasia 5, 31210 Los Arcos Spain',
        turn: "15 (7 à droite et 5 à gauche)",
        length: 3933,
        bestLapTime: '1.38.417',
        bestLapTimePilote: 'Cauvin Dominique',
        width: "9 a 12",
        maxDb: 102,
        infos: 'Restaurant sur place, circuit de karting',
      },
      {
        name: 'Motorland Aràgon',
        slug: 'motorland-aragon',
        countryId: 2,
        city: 'Alcañiz',
        adress: 'Crta, A-2404, km 1, 44600 Alcaniz Spain',
        turn: "13 (6 à droite et 7 à gauche)",
        length: 5345,
        bestLapTime: '1.38.976',
        bestLapTimePilote: 'Raffaele Marciello',
        width: 15,
        maxDb: 102,
        infos: 'Restaurant sur place, circuit de karting',
      },
      {
        name: 'Alcarras',
        slug: 'alcarras',
        countryId: 2,
        city: 'Alcarras',
        adress: 'km, Av. de Valmanya, 13, 25180 Alcarràs, Lleida, Spain',
        turn: "14 (10 à gauche, 4 à droite)",
        length: 3743,
        width: '14 a 15',
        maxDb: 102,
        infos: 'Circuit de karting (1km17, 13 virages 8 à gauche, 5 à droite)',
      },
      {
        name: 'Valencia',
        slug: 'valencia',
        countryId: 2,
        city: 'Cheste',
        adress: 'Salida, Autovía del Este, 334, 46380 Cheste, Valencia, Spain',
        turn: "14",
        length: 4005,
        width: '14 a 15',
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
