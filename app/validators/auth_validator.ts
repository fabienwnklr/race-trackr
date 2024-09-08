import vine from '@vinejs/vine'

export const createRegisterValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim(),
    email: vine.string().trim().email(),
    password: vine.string().trim(),
    country: vine.string().trim(),
  })
)

/**
 * For login
 */
export const createLoginValidator = vine.compile(
  vine.object({
    email: vine.string().trim(),
    password: vine.string().trim(),
  })
)
