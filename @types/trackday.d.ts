import { Track } from './track.js'
import { Chrono } from './chrono.js'

export type Trackday = {
  id: number
  date: string
  track_map: string
  weather: string
  tire_pressure_front: string
  tire_pressure_back: string
  details: string
  track: Track
  chronos: Chrono[]
  created_at: DateTime
  updated_at: DateTime
}
