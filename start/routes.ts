/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const AuthController = () => import('#controllers/auth_controller')
const DashboardController = () => import('#controllers/dashboard_controller')
const TrackDaysController = () => import('#controllers/trackdays_controller')
// const TrackController = () => import('#controllers/track_controller')
const MaintenancesController = () => import('#controllers/maintenances_controller')
const ChronosController = () => import('#controllers/chronos_controller')

router.group(() => {
  router.get('/', [AuthController, 'index']).use(middleware.guest())
})

// Logged access view
router
  .group(() => {
    router.get('/dashboard', [DashboardController, 'index']).as('dashboard')
    // Trackdays
    router.get('/trackdays', [TrackDaysController, 'index']).as('trackdays')
    router.get('/trackdays/create', [TrackDaysController, 'showCreateForm']).as('create-trackday')
    router.get('/trackdays/:slug', [TrackDaysController, 'showTrackdaysForTrack']).as('track')
    router.get('/trackdays/:slug/:id', [TrackDaysController, 'showTrackday']).as('trackday')
    // Vehicle maintenance
    router.get('/maintenances', [MaintenancesController, 'index']).as('maintenances')
    router
      .get('/maintenances/:slug', [MaintenancesController, 'showMaintenanceForVehicle'])
      .as('maintenance')
    // Chronos
    router.get('/chronos', [ChronosController, 'index']).as('chronos')
  })
  .use(middleware.auth())
// Auth group
router
  .group(() => {
    router.post('/register', [AuthController, 'register'])
    router.post('/login', [AuthController, 'login'])
    router.post('/logout', [AuthController, 'logout']).use(middleware.auth())
  })
  .prefix('/auth')
