import User from '#models/user'
import Track from '#models/track'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class TrackPolicy extends BasePolicy {
  async before(user: User | null, _action: string, ..._params: any[]) {
    /**
     * Always allow an admin user without performing any check
     */
    if (user && user.role === 'admin') {
      return true
    }
  }
  /**
   * Every logged-in user can create a track
   */
  create(user: User): AuthorizerResponse {
    return user.role === 'admin'
  }

  /**
   * Only the trackday creator can edit the post
   */
  edit(user: User, _track: Track): AuthorizerResponse {
    return user.role === 'admin'
  }

  /**
   * Only the trackday creator can delete the post
   */
  delete(user: User, _trackday: Track): AuthorizerResponse {
    return user.role === 'admin'
  }
}
