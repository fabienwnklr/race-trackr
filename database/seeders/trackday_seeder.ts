import Chrono from '#models/chrono'
import Trackday from '#models/trackday'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Trackday.createMany([
      {
        date: '01/01/2024',
        trackId: 1,
        userId: 1,
        weather: 'sunny',
        details: 'some details',
        bestChrono: getRandomTime(),
        regulChrono: getRandomTime(),
      },
      {
        date: '02/04/2024',
        trackId: 1,
        userId: 1,
        weather: 'rainy',
        details: 'some details',
      },
      { date: '03/05/2024', trackId: 1, userId: 1, weather: 'rainy' },
      { date: '04/02/2024', trackId: 3, userId: 1, weather: 'cloudy' },
      { date: '05/07/2024', trackId: 2, userId: 1 },
      { date: '06/08/2024', trackId: 3, userId: 1 },
    ])

    const trackdaysWithChronos = await Trackday.all()

    for (const trackdayWithChronos of trackdaysWithChronos) {
      await Chrono.createMany([
        { lapTime: getRandomTime(), trackdayId: trackdayWithChronos.id },
        { lapTime: getRandomTime(), trackdayId: trackdayWithChronos.id },
        { lapTime: getRandomTime(), trackdayId: trackdayWithChronos.id },
        { lapTime: getRandomTime(), trackdayId: trackdayWithChronos.id },
      ])
    }
  }
}

function getRandomTime() {
  // Define the minimum and maximum times in milliseconds
  const minTime = 1 * 60 * 1000 + 20 * 1000 // 1 minute 20 seconds in ms
  const maxTime = 2 * 60 * 1000 + 10 * 1000 // 2 minutes 10 seconds in ms

  // Generate a random time between minTime and maxTime
  const randomTime = Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime

  // Convert randomTime to minutes, seconds, and milliseconds
  const minutes = Math.floor(randomTime / 60000) // Convert to minutes
  const seconds = Math.floor((randomTime % 60000) / 1000) // Get the remaining seconds
  const milliseconds = randomTime % 1000 // Get the milliseconds

  // Format the time as 'M.SS.MS'
  const formattedTime = `${minutes}.${seconds.toString().padStart(2, '0')}.${milliseconds}`

  return formattedTime
}
