import vine from '@vinejs/vine'

/**
 * For create/update track
 */
export const createTrackdayValidator = vine.compile(
  vine.object({
    date: vine.date({
      formats: ['DD/MM/YYYY'],
    }),
    trackId: vine.number().withoutDecimals().positive(),
    weather: vine.string().trim().optional(),
    tirePressureFront: vine.string().trim().optional(),
    tirePressureBack: vine.string().trim().optional(),
    details: vine.string().trim().optional(),
  })
)
