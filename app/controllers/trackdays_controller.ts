import Trackday from '#models/trackday'
import type { HttpContext } from '@adonisjs/core/http'

export default class TrackDaysController {
  async index({ inertia }: HttpContext) {
    return inertia.render('trackdays/index')
  }

  /**
   * Show trackday filtering on track
   */
  async showTrackdaysForTrack({ inertia, params }: HttpContext) {
    console.log(params)
    // Trackday.findBy('slug', params.slug)
    return inertia.render('trackdays/track')
  }

  /**
   * Show specific trackday details
   */
  async showTrackday({ inertia, params }: HttpContext) {
    console.log(params)
    // Trackday.findBy('id', params.id)
    return inertia.render('trackdays/trackday')
  }
}
