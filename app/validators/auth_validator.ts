import vine from '@vinejs/vine'

export const createRegisterValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim(),
    email: vine
      .string()
      .trim()
      .email()
      .unique(async (query, field) => {
        const user = await query.from('users').where('email', field).first()
        return !user
      }),
    password: vine.string().trim().minLength(8).maxLength(255),
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
