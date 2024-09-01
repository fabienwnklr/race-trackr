export type Track = {
  id: number
  name: string
  slug: string
  country: string | null
  city: string | null
  adress: string | null
  distance: string | null
  bestLapTime: string | null
  bestLapTimePilote: string | null
  infos: string | null
  createdAt: DateTime
  updatedAt: DateTime
}
