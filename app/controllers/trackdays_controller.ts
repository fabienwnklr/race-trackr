import Chrono from '#models/chrono'
import Track from '#models/track'
import Trackday from '#models/trackday'
import { createTrackdayValidator } from '#validators/trackday_validator'
import dayjs from 'dayjs'
import type { HttpContext } from '@adonisjs/core/http'
import type { Trackday as TrackdayType } from '#types/trackday'
import type { Chrono as ChronoType } from '#types/chrono'

export default class TrackDaysController {
  async index({ inertia, auth }: HttpContext) {
    if (!auth.user) {
      return inertia.render('errors/unauthorized')
    }

    const trackDays = await Trackday.query()
      .where('user_id', auth.user.id)
      .orderBy('date', 'desc')
      .preload('track') // Charger la piste associée
      .preload('chronos') // Charger tous les chronos liés
      .paginate(1, 10)
    if (!trackDays) {
      return inertia.render('trackdays/index')
    }

    const paginationJSON = trackDays.serialize()

    return inertia.render('trackdays/index', { trackdays: paginationJSON.data })
  }

  /**
   * Show form to create/edit trackday
   */
  async createOrEdit({ inertia, params }: HttpContext) {
    const tracks = await Track.all()

    if (params.id) {
      const trackday = await Trackday.findByOrFail('id', params.id)

      return inertia.render('trackdays/[id]', { trackday, tracks })
    }
    return inertia.render('trackdays/[id]', { tracks })
  }
  /**
   * Show trackday filtering on track
   */
  async showTrackdaysForTrack({ inertia, params }: HttpContext) {
    // Trackday.findBy('slug', params.slug)
    return inertia.render('trackdays/track')
  }

  /**
   * Show specific trackday details
   */
  async showTrackday({ inertia, params, response }: HttpContext) {
    const trackday = await Trackday.findBy('id', params.id)

    if (trackday) {
      return inertia.render('trackdays/trackday', { trackday })
    }
    return inertia.render('errors/not_found')
  }

  // ---- CRUD ---- //

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

      trackDayData.date = dayjs(trackDayData.date).format('DD/MM/YYYY')

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
            tire_pressure_front: trackDayData.tire_pressure_front,
            tire_pressure_back: trackDayData.tire_pressure_back,
            details: trackDayData.details,
            userId: user.id,
          }).filter(([key, value]) => value !== null && value !== undefined && value !== '') // Filtrer les valeurs nulles ou undefined
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

  async read({ inertia, auth, params }: HttpContext) {
    if (!auth.user) {
      return inertia.render('errors/unauthorized')
    }
    if (params.id) {
      const trackDay = await Trackday.query()
        .where('user_id', auth.user.id)
        .where('id', params.id)
        .preload('chronos') // Charger tous les chronos liés
        .preload('track') // Charger la piste associée
        .firstOrFail()
      return inertia.render('trackdays/[id]', { trackDay })
    }

    const trackDays = await Trackday.query()
      .where('user_id', auth.user.id)
      .preload('track') // Charger la piste associée
      .preload('chronos') // Charger tous les chronos liés
      .paginate(1, 10)
    if (!trackDays) {
      return inertia.render('trackdays/index')
    }

    const paginationJSON = trackDays.serialize()

    return inertia.render('trackdays/index', { trackDays: paginationJSON.data })
  }
}
