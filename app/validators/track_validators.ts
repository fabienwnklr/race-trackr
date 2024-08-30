import vine from '@vinejs/vine'

/**
 * For create/update track
 */
export const createTrackValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
    slug: vine.string().trim(),
  })
)
