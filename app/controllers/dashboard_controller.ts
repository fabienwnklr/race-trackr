import type { HttpContext } from '@adonisjs/core/http'

export default class DashboardController {
  async index({ inertia }: HttpContext) {
    // if (await bouncer.allows('readDashboard')) {
    return inertia.render('dashboard')
    // } else {
    // redirect to unhautorized
    // }
  }
}
