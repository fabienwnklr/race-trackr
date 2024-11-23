import vine from '@vinejs/vine'

/**
 * For create/update track
 */
export const createMaintenanceValidator = vine.compile(
  vine.object({
    date: vine
      .date({
        formats: { utc: true },
      })
      .optional(),
    vehicleId: vine.number().withoutDecimals().positive(),
    name: vine.string().trim().optional(),
    details: vine.string().trim().optional(),
    userId: vine.number().withoutDecimals().positive(),
  })
)
