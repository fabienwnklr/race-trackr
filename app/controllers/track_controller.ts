import Track from '#models/track'
import { createTrackValidator } from '#validators/track_validators'
import { errors } from '@vinejs/vine'
import type { HttpContext } from '@adonisjs/core/http'
import { slugify } from '../../utils/index.js'

export default class TrackController {
  async index({ inertia }: HttpContext) {
    return inertia.render('tracks')
  }

  async indexAdmin({ inertia }: HttpContext) {
    return inertia.render('admin/tracks/index')
  }

  async createOrEditTrack({ inertia, params }: HttpContext) {
    if (params.slug) {
      return inertia.render('admin/tracks/[id]', {
        track: await Track.findByOrFail('slug', params.slug),
      })
    }
    return inertia.render('admin/tracks/[id]')
  }

  async all({ response }: HttpContext) {
    const tracks = await Track.all()

    return response.json(tracks)
  }

  async create({ request, response, session }: HttpContext) {
    try {
      const data = request.all() as Track

      await createTrackValidator.validate(data)

      data.slug = slugify(data.name)

      const track = await Track.create(data)
      session.flash('success', 'Track created')
      return response.json(track)
    } catch (error) {
      session.flash('error', 'Something went wrong while creating track')
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return response.json({ error: error.messages[0] })
      } else {
        return response.json({ error: error })
      }
    }
  }

  async update({ request, response, session }: HttpContext) {
    try {
      const data = request.all() as Track
      console.log(data)
      await createTrackValidator.validate(data)
      const track = await Track.findByOrFail('slug', data.slug)

      data.slug = slugify(data.name)

      await track.merge(data).save()

      session.flash('success', 'Track updated')
      return response.redirect(`/admin/tracks/${track.slug}/edit`)
    } catch (error) {
      session.flash('error', 'Something went wrong while updating track')
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return response.json({ error: error.messages[0] })
      } else {
        return response.json({ error: error })
      }
    }
  }
}
