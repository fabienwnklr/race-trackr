import { test } from '@japa/runner'
import User from '#models/user'

test.group('Pages dashboard', () => {
  test('example test', async ({ browserContext, visit }) => {
    const user = await User.create({
      password: 'secret',
      lastName: 'John',
      firstName: 'Doe',
      country: 'france',
      email: 'pC0gQ@example.com',
    })

    await browserContext.loginAs(user)

    await visit('/dashboard')
  })
})
