import { test } from '@japa/runner'
import User from '#models/user'

test.group('Pages dashboard', () => {
  test('example test', async ({ browserContext, visit }) => {
    const user = await User.create({
      password: 'secret',
      fullName: 'John Doe',
      country: 'france',
      email: 'pC0gQ@example.com',
    })

    await browserContext.loginAs(user)

    const page = await visit('/dashboard')
  })
})
