import type { Vehicle } from '#types/vehicle'
import type { User } from '#types/user'
export type Maintenance = {
  id: number
  vehicleId: number
  name: string
  date: string
  details: string
  userId: number
  vehicleId: number
  vehicle: Vehicle
  user?: User
}
