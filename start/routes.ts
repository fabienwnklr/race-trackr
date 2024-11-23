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

const VehiclesController = () => import('#controllers/vehicles_controller')
const TrackController = () => import('#controllers/track_controller')
const AuthController = () => import('#controllers/auth_controller')
const DashboardController = () => import('#controllers/dashboard_controller')
const TrackDaysController = () => import('#controllers/trackdays_controller')
const MaintenancesController = () => import('#controllers/maintenances_controller')
const ChronosController = () => import('#controllers/chronos_controller')
const HealthChecksController = () => import('#controllers/health_checks_controller')
const UserVehiclesController = () => import('#controllers/user_vehicles_controller')

router.get('/health', [HealthChecksController]).use(({ request, response }, next) => {
  if (request.header('x-monitoring-secret') === 'some_secret_value') {
    return next()
  }
  response.unauthorized({ message: 'Unauthorized access' })
})

router.group(() => {
  router.get('/', [AuthController, 'index']).use(middleware.guest())
})

// Logged access
router
  .group(() => {
    // Views
    router.get('/dashboard', [DashboardController, 'index']).as('dashboard')

    // Trackdays
    router.get('/trackdays', [TrackDaysController, 'index'])
    router.get('/trackdays/create', [TrackDaysController, 'createOrEdit'])
    router.get('/trackdays/:id', [TrackDaysController, 'showTrackday'])
    router.get('/trackdays/:id/edit', [TrackDaysController, 'createOrEdit'])
    router.post('/trackdays/create', [TrackDaysController, 'create'])
    router.post('/trackdays/:id/update', [TrackDaysController, 'update'])
    router.delete('/trackdays/:id', [TrackDaysController, 'delete'])

    // Vehicle maintenance
    // GET
    router.get('/maintenances', [MaintenancesController, 'index'])
    router.get('/maintenances/create', [MaintenancesController, 'createOrEdit'])
    router.get('/maintenances/:id', [MaintenancesController, 'show'])
    router.get('/maintenances/:id/edit', [MaintenancesController, 'createOrEdit'])
    // POST
    router.post('/maintenances/create', [MaintenancesController, 'create'])
    router.post('/maintenances/:id/update', [MaintenancesController, 'update'])
    // DELETE
    router.delete('/maintenances/:id', [MaintenancesController, 'delete'])

    // User vehicles
    router.get('/user-vehicles', [UserVehiclesController, 'index'])
    router.post('/user-vehicles/create', [UserVehiclesController, 'create'])

    // Chronos
    router.get('/chronos', [ChronosController, 'index'])
    // Api key
    // Api key
    router.get('/tokens', [AuthController, 'readTokens'])
    router.post('/tokens/create', [AuthController, 'createToken'])

    // Admin pages
    router
      .group(() => {
        // Track views
        router.get('/tracks', [TrackController, 'indexAdmin'])
        router.get('/tracks/create', [TrackController, 'createOrEditTrack'])
        router.get('/tracks/:slug/edit', [TrackController, 'createOrEditTrack'])
        // Track CRUD
        router.post('/tracks/create', [TrackController, 'create'])
        router.post('/tracks/:slug/update', [TrackController, 'update'])
        router.delete('/tracks/:slug/delete', [TrackController, 'delete'])

        // Vehicle views
        router.get('/vehicles', [VehiclesController, 'indexAdmin'])
      })
      .prefix('admin')
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
