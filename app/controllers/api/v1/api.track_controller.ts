import Track from '#models/track'
import type { HttpContext } from '@adonisjs/core/http'

export default class TrackController {
  async read({ response, request }: HttpContext) {
    const params = request.qs()
    console.log(params)
    if (params.slug) {
      const track = await Track.findByOrFail('slug', params.slug)
      return response.json(track)
    }

    const page = params.page ?? 1
    const limit = params.limit ?? 10
    const search = params.search?.replace(/[\[\]]/g, ' ') ?? ''

    if (search) {
      if (search.includes('=')) {
        const column = search.split('=')[0]
        const value = search.split('=')[1]

        if (!column || !value) {
          return response.json({ error: 'Invalid search parameter' })
        }

        const tracks = await Track.query()
          .orderBy('name', 'asc')
          .where(column.trim(), '=', value.trim())
          .paginate(page, limit)
        return response.json(tracks)
      } else {
        const tracks = await Track.query()
          .orderBy('name', 'asc')
          .where('name', 'like', `%${search}%`)

        return response.json(tracks)
      }
    }

    const tracks = await Track.query()
      .orderBy('name', 'asc')
      .where('name', 'like', `%${search}%`)
      .paginate(page, limit)

    return response.json(tracks)
  }
}
