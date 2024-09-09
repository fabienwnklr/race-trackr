import { slugify } from '#utils/index'
import { test } from '@japa/runner'

test.group('Utils', () => {
  test('slugify simple text', async ({ assert }) => {
    const textToSlugify = 'Hello World'

    assert.equal(slugify(textToSlugify), 'hello-world')
  })

  test('slugify complex text', async ({ assert }) => {
    const textToSlugify = "It's complexe with àccéènts and symbols €"

    assert.equal(slugify(textToSlugify), 'its-complexe-with-acceents-and-symbols')
  })
})
