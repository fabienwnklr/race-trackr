import { test } from '@japa/runner'
import hash from '@adonisjs/core/services/hash'
import User from '#models/user'

test.group('Auth', () => {
  test('create new user', async ({ assert }) => {
    const user = await User.create({
      password: 'secret',
      lastName: 'John',
      firstName: 'Doe',
      country: 'france',
      email: 'pC0gQ@example.com',
    })

    assert.isTrue(hash.isValidHash(user.password))
    assert.isTrue(await hash.verify(user.password, 'secret'))
    assert.isTrue(user.role === 'user')
    assert.isTrue(user.role !== 'admin')
  })

  test('create new user as admin', async ({ assert }) => {
    const user = new User()
    user.password = 'secret'
    user.lastName = 'John'
    user.firstName = 'Doe'
    user.country = 'france'
    user.email = 'pC0gQ@example.com'
    user.role = 'admin'

    await user.save()

    assert.isTrue(hash.isValidHash(user.password))
    assert.isTrue(await hash.verify(user.password, 'secret'))
    assert.isTrue(user.role !== 'user')
    assert.isTrue(user.role === 'admin')
  })
})
