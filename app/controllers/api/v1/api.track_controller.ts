import Track from '#models/track'
import type { HttpContext } from '@adonisjs/core/http'

export default class TrackController {
  async read({ response, request }: HttpContext) {
    const params = request.qs()
    if (params.slug) {
      const track = await Track.findByOrFail('slug', params.slug)
      return response.json(track)
    }

    const page = params.page ?? 1
    const limit = params.limit ?? 10
    const search = params.search?.replace(/[\[\]]/g, ' ') ?? ''

    if (search) {
      // if (search.includes('=')) {
      //   const column = search.split('=')[0]
      //   const value = search.split('=')[1]

      //   if (!column || !value) {
      //     return response.json({ error: 'Invalid search parameter' })
      //   }

      //   const tracks = await Track.query()
      //     .orderBy('name', 'asc')
      //     .where(column.trim(), '=', value.trim())
      //     .paginate(page, limit)
      //   return response.json(tracks)
      // } else {
      // = equal or ilike, != | <> different, >= greater or equal  > greater than, <= less or equal, < less than
      const tracks = await Track.query().where('name', 'ilike', `${search}%`).orderBy('name', 'asc')

      return response.json(tracks)
      // }
    }

    const tracks = await Track.query().orderBy('name', 'asc').paginate(page, limit)

    return response.json(tracks)
  }
}
