import { test } from '@japa/runner'

test.group('Tracks list', () => {
  test('get a list of tracks', async ({ client }) => {
    const response = await client.get('/api/v1/tracks')

    response.assertStatus(200)
    response.assertBody({
      data: [
        {
          id: 1,
          email: 'foo@bar.com',
        },
      ],
    })
  })
})
