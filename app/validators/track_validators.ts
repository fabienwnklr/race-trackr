import vine from '@vinejs/vine'

/**
 * For create/update track
 */
export const createTrackValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
    slug: vine.string().trim(),
    country: vine.string().trim().optional(),
    city: vine.string().trim().optional(),
    adress: vine.string().trim().optional(),
    distance: vine.string().trim().optional(),
    bestLapTime: vine.string().trim().optional(),
    bestLapTimePilote: vine.string().trim().optional(),
    infos: vine.string().trim().optional(),
  })
)
