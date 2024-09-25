import Chrono from '#models/chrono'
import Track from '#models/track'
import Trackday from '#models/trackday'
import { createTrackdayValidator } from '#validators/trackday_validator'
import type { HttpContext } from '@adonisjs/core/http'
import type { Trackday as TrackdayType } from '#types/trackday'
import type { Chrono as ChronoType } from '#types/chrono'

export default class TrackDaysController {
  async index({ inertia, auth }: HttpContext) {
    if (!auth.user) {
      return inertia.render('errors/unauthorized')
    }

    const trackDays = await Trackday.query()
      .where('userId', auth.user.id)
      .orderBy('date', 'desc')
      .preload('track') // Charger la piste associée
      .preload('chronos')
      .paginate(1, 10)
    if (!trackDays) {
      return inertia.render('trackdays/trackdays')
    }

    const paginationJSON = trackDays.serialize()

    return inertia.render('trackdays/trackdays', { trackdays: paginationJSON.data })
  }

  /**
   * Show form to create/edit trackday
   */
  async createOrEdit({ inertia, params }: HttpContext) {
    const tracks = await Track.all()

    if (params.id) {
      const trackday = await Trackday.query()
        .preload('track')
        .preload('chronos')
        .where('id', params.id)
        .firstOrFail()

      return inertia.render('trackdays/[id]', { trackday, tracks })
    }
    return inertia.render('trackdays/[id]', { tracks })
  }

  /**
   * Show specific trackday details
   */
  async showTrackday({ inertia, params }: HttpContext) {
    const trackday = await Trackday.query()
      .preload('track')
      .preload('chronos')
      .where('id', params.id)
      .firstOrFail()

    return inertia.render('trackdays/trackday', { trackday })
  }

  async create({ request, response, auth, session }: HttpContext) {
    try {
      const trackDayData = request.all() as TrackdayType

      const user = auth.user
      if (!user) {
        return response.unauthorized({ message: 'User not authenticated' })
      }

      // Créer ou trouver le Track
      let track = await Track.findOrFail(trackDayData.track)
      if (!track) {
        return response.unauthorized({ message: 'Track not found' })
      }

      trackDayData.date = new Date(trackDayData.date).toISOString()

      await createTrackdayValidator.validate({
        date: trackDayData.date,
        trackId: track.id,
      })

      // Créer le TrackDay
      const trackDay = await Trackday.create(
        Object.fromEntries(
          Object.entries({
            date: trackDayData.date,
            trackId: track.id,
            weather: trackDayData.weather,
            tirePressureFront: trackDayData.tirePressureFront,
            tirePressureBack: trackDayData.tirePressureBack,
            details: trackDayData.details,
            userId: user.id,
          }).filter(([_key, value]) => value !== null && value !== undefined && value !== '') // Filtrer les valeurs nulles ou undefined
        )
      )

      // Créer les Chronos pour ce TrackDay
      if (trackDayData.chronos && trackDayData.chronos.length > 0) {
        const chronosData = trackDayData.chronos.map((chrono: ChronoType) => ({
          lapTime: chrono.lapTime,
          trackdayId: trackDay.id,
        }))

        await Chrono.createMany(chronosData)
      }

      session.flash('success', `TrackDay created successfully`)
      return response.redirect('/trackdays')
    } catch (error) {
      return response.badRequest({
        message: 'Failed to create TrackDay',
        error: error.message,
      })
    }
  }

  async read({ response, params, request }: HttpContext) {
    const getParams = request.qs() as { page?: number; limit?: number; relations?: string[] }
    const page = getParams.page ?? 1
    const limit = getParams.limit ?? 10

    if (params.id) {
      const trackDay = await Trackday.query()
        .where('userId', params.user)
        .where('id', params.id)
        .preload('chronos')
        .preload('track')
        .firstOrFail()

      return response.json(trackDay)
    }

    const trackDays = await Trackday.query()
      .where('userId', params.user)
      .preload('track')
      .preload('chronos')
      .paginate(page, limit)

    const paginationJSON = trackDays.serialize()

    return response.json(paginationJSON)
  }

  async update({ request, response, params, session, i18n }: HttpContext) {
    try {
      const trackDayData = request.all() as TrackdayType
      const trackDay = await Trackday.findByOrFail('id', params.id)

      const formatedDate = new Date(trackDayData.date).toISOString()

      await createTrackdayValidator.validate({
        date: formatedDate,
        trackId: trackDayData.trackId,
      })

      // they are required so always updated
      trackDay.trackId = trackDayData.trackId
      trackDay.date = formatedDate

      if (trackDayData.weather) {
        trackDay.weather = trackDayData.weather
      }

      if (trackDayData.tirePressureFront) {
        trackDay.tirePressureFront = trackDayData.tirePressureFront
      }

      if (trackDayData.tirePressureBack) {
        trackDay.tirePressureBack = trackDayData.tirePressureBack
      }

      if (trackDayData.details) {
        trackDay.details = trackDayData.details
      }

      await trackDay.save()

      // update chronos
      if (trackDayData.chronos && trackDayData.chronos.length > 0) {
        await trackDay.related('chronos').query().delete()

        const chronosData = trackDayData.chronos.map((chrono: ChronoType) => ({
          lapTime: chrono as unknown as string,
          trackdayId: trackDay.id,
        }))

        console.log(chronosData)
        await trackDay.related('chronos').createMany(chronosData)
      }

      session.flash('success', i18n.t('success.trackdayUpdated'))
      return response.redirect(`/trackdays/${trackDay.id}/edit`)
    } catch (error) {
      session.flash('error', i18n.t('error_updating_trackday') + error.message)
      console.error(error)
      return response.redirect(`/trackdays/${params.id}/edit`)
    }
  }

  async delete({ params, response, session, i18n }: HttpContext) {
    const id = params.id
    try {
      const trackday = await Trackday.findByOrFail('id', id)
      await trackday.delete()
      session.flash('success', i18n.t('success.trackdayDeleted'))
      return response.redirect('/trackdays')
    } catch (error) {
      session.flash('error', i18n.t('error.deleteTrackday'))
      console.error(error)
      return response.redirect('/trackdays/' + id)
    }
  }
}
