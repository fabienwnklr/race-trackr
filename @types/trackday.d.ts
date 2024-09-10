import { Track } from './track.js'
import { Chrono } from './chrono.js'

export type Trackday = {
  id: number
  date: string
  track_map: string
  weather: string
  tirePressureFront: string
  tirePressureBack: string
  details: string
  track: Track
  trackId: number
  chronos: Chrono[]
  created_at: DateTime
  updated_at: DateTime
}
