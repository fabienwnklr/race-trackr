/*
|--------------------------------------------------------------------------
| Bouncer abilities
|--------------------------------------------------------------------------
|
| You may export multiple abilities from this file and pre-register them
| when creating the Bouncer instance.
|
| Pre-registered policies and abilities can be referenced as a string by their
| name. Also they are must if want to perform authorization inside Edge
| templates.
|
*/

import Track from '#models/track'
import Trackday from '#models/trackday'
import User from '#models/user'
import { Bouncer } from '@adonisjs/bouncer'

/**
 * Delete the following ability to start from
 * scratch
 */
export const editTrackday = Bouncer.ability((user: User, trackday: Trackday) => {
  return user.id === trackday.userId
})

export const editTrack = Bouncer.ability((user: User, _track: Track) => {
  return user.role === 'admin'
})
