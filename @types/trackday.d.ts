import { DateTime } from 'luxon'

export type Trackday = {
    declare id: number
    declare date: DateTime
    declare track_map: string
    declare weather: string
    declare tire_pressure: string
    declare track: HasOne<typeof Track>
    declare chronos: HasMany<typeof Chrono>
    declare createdAt: DateTime
    declare updatedAt: DateTime
}
