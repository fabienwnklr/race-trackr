export type Track = {
  id: number
  name: string
  slug: string
  country: string | null
  city: string | null
  adress: string | null
  distance: string | null
  best_lap_time: string | null
  best_lap_time_pilote: string | null
  infos: string | null
  created_at: DateTime
  updated_at: DateTime
}
