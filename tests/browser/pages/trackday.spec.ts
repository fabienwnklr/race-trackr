import { test } from '@japa/runner'

test.group('Pages trackday', () => {
  test('example test', async ({ visit, route }) => {
    await visit(route('trackdays'))
  })
})
