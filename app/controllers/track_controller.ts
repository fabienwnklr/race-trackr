import Track from '#models/track'
import { createTrackValidator } from '#validators/track_validators'
import { errors } from '@vinejs/vine'
import { slugify } from '../../utils/index.js'

import type { ColumnType } from 'antd/es/table'
import type { HttpContext } from '@adonisjs/core/http'
import { defaultData } from '../../constants/index.js'

export default class TrackController {
  async index({ inertia }: HttpContext) {
    return inertia.render('tracks')
  }

  async indexAdmin({ inertia, i18n }: HttpContext) {
    const tracks = await Track.query().orderBy('name', 'asc').paginate(1, 10)

    if (!tracks) {
      return inertia.render('admin/tracks/index')
    }

    const paginationJSON = tracks.serialize({
      fields: [
        'name',
        'slug',
        'country',
        'city',
        'adress',
        'distance',
        'bestLapTime',
        'bestLapTimePilote',
        'infos',
      ],
    })
    const columns: ColumnType<Track>[] = Object.keys(paginationJSON.data[0]).map((key) => {
      return {
        title: i18n.t(`common.${key}`),
        dataIndex: key,
        key: key,
      }
    })

    const data = []

    for (const track of paginationJSON.data as Track[]) {
      data.push({
        key: track.slug ?? defaultData,
        name: track.name ?? defaultData,
        slug: track.slug ?? defaultData,
        country: track.country ?? defaultData,
        city: track.city ?? defaultData,
        adress: track.adress ?? defaultData,
        distance: track.distance ?? defaultData,
        bestLapTime: track.bestLapTime ?? defaultData,
        bestLapTimePilote: track.bestLapTimePilote ?? defaultData,
        infos: track.infos ?? defaultData,
      })
    }

    return inertia.render('admin/tracks/index', {
      columns,
      data,
    })
  }

  async createOrEditTrack({ inertia, params }: HttpContext) {
    if (params.slug) {
      return inertia.render('admin/tracks/[slug]', {
        track: await Track.findByOrFail('slug', params.slug),
      })
    }
    return inertia.render('admin/tracks/[slug]')
  }

  async read({ response, params }: HttpContext) {
    if (params.slug) {
      const track = await Track.findByOrFail('slug', params.slug)
      return response.json(track)
    }

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
      return response.redirect(`/admin/tracks/${track.slug}/edit`)
    } catch (error) {
      session.flash('error', 'Something went wrong while creating track')
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return response.json({ error: error.messages[0] })
      } else {
        return response.json({ error: error })
      }
    }
  }

  async update({ request, response, session, params }: HttpContext) {
    try {
      const data = request.all() as Track
      const slug = params.slug ?? data.slug
      await createTrackValidator.validate(data)
      const track = await Track.findByOrFail('slug', slug)

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

  async delete({ request, response, session }: HttpContext) {
    try {
      const slug = request.params().slug
      const track = await Track.findByOrFail('slug', slug)
      await track.delete()
      session.flash('success', 'Track deleted')
      return response.redirect('/admin/tracks')
    } catch (error) {
      session.flash('error', 'Something went wrong while deleting track')
      return response.json({ error: error })
    }
  }
}
