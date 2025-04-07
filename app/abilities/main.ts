import Maintenance from '#models/maintenance'
import Track from '#models/track'
import Trackday from '#models/trackday'
import User from '#models/user'
import { can } from '#utils/permissions'
import { Bouncer } from '@adonisjs/bouncer'

export const editTrackday = Bouncer.ability((user: User, trackday: Trackday) => {
  return user.id === trackday.userId
})

export const editTrack = Bouncer.ability((user: User, _track: Track) => {
  return user.role.name === 'admin'
})

export const editUser = Bouncer.ability((user: User, _user: User) => {
  return user.id === _user.id
})

export const editMaintenance = Bouncer.ability((user: User, maintenance: Maintenance) => {
  return user.id === maintenance.userId
})

export const readDashboard = Bouncer.ability((user: User) => {
  user.load('roles', (query) => query.preload('permissions'))
  const permissions = user.transformedPermissions
  return can(permissions, 'dashboard', 'view')
})
