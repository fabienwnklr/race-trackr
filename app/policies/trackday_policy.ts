import User from '#models/user'
import Trackday from '#models/trackday'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class TrackdayPolicy extends BasePolicy {
  async before(user: User | null, _action: string, ..._params: any[]) {
    /**
     * Always allow an admin user without performing any check
     */
    if (user && user.role === 'admin') {
      return true
    }
  }
  /**
   * Every logged-in user can create a trackday
   */
  create(_user: User): AuthorizerResponse {
    return true
  }

  /**
   * Only the trackday creator can edit the post
   */
  edit(user: User, trackday: Trackday): AuthorizerResponse {
    return user.id === trackday.userId
  }

  /**
   * Only the trackday creator can delete the post
   */
  delete(user: User, trackday: Trackday): AuthorizerResponse {
    return user.id === trackday.userId
  }
}
