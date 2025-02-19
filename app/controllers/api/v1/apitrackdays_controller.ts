import Chrono from '#models/chrono'
import Track from '#models/track'
import Trackday from '#models/trackday'
import { createTrackdayValidator } from '#validators/trackday_validator'
import type { HttpContext } from '@adonisjs/core/http'
import type { Trackday as TrackdayType } from '#types/trackday'
import type { Chrono as ChronoType } from '#types/chrono'

export default class TrackDaysController {
  async create({ request, response, auth, session, i18n }: HttpContext) {
    try {
      const trackDayData = request.all() as TrackdayType

      const user = auth.user
      if (!user) {
        return response.unauthorized({ message: 'User not authenticated' })
      }

      // Créer ou trouver le Track
      let track = await Track.findOrFail(trackDayData.trackId)
      if (!track) {
        return response.unauthorized({ message: 'Track not found' })
      }

      trackDayData.date = new Date(trackDayData.date).toISOString()

      await createTrackdayValidator.validate({
        date: trackDayData.date,
        trackId: track.id,
        userId: user.id,
      })

      // Créer le TrackDay
      const trackDay = await Trackday.create(
        Object.fromEntries(
          Object.entries({
            date: trackDayData.date,
            trackId: track.id,
            weather: trackDayData.weather,
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

      session.flash('success', i18n.t('success.trackdayCreated'))
      return response.json(trackDay)
    } catch (error) {
      console.log(error)
      session.flash('error', `Error creating TrackDay $`)
      return response.status(500).json({ error: error })
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

        await trackDay.related('chronos').createMany(chronosData)
      }

      return response.json(trackDay)
    } catch (error) {
      return response.status(500).json({ error: error })
    }
  }

  async delete({ params, response, session, i18n }: HttpContext) {
    const id = params.id
    try {
      const trackday = await Trackday.findByOrFail('id', id)
      await trackday.delete()
      return response.json({ message: i18n.t('success.trackdayDeleted') })
    } catch (error) {
      return response.status(500).json({ error: error })
    }
  }
}
