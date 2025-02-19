import { Track } from './track.js'
import { Chrono } from './chrono.js'

export enum Weathers {
  sunny = 'sunny',
  cloudy = 'cloudy',
  rainy = 'rainy',
}

export type Weather = keyof typeof Weathers

export type Trackday = {
  id: number
  date: string
  weather: Weather
  details: string
  track: Track
  trackId: number
  bestChrono: string
  regulChrono: string
  chronos: Chrono[]
  createdAt: DateTime
  updatedAt: DateTime
}
