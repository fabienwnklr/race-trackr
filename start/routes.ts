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
import User from '#models/user'

const VehiclesController = () => import('#controllers/vehicles_controller')
const TrackController = () => import('#controllers/track_controller')
const AuthController = () => import('#controllers/auth_controller')
const DashboardController = () => import('#controllers/dashboard_controller')
const TrackDaysController = () => import('#controllers/trackdays_controller')
const MaintenancesController = () => import('#controllers/maintenances_controller')
const ChronosController = () => import('#controllers/chronos_controller')
const HealthChecksController = () => import('#controllers/health_checks_controller')

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
    router.get('/dashboard', [DashboardController, 'index'])
    // Trackdays
    router.get('/trackdays', [TrackDaysController, 'index'])
    router.get('/trackdays/create', [TrackDaysController, 'createOrEdit'])
    router.get('/trackdays/:id', [TrackDaysController, 'showTrackday'])
    router.get('/trackdays/:id/edit', [TrackDaysController, 'createOrEdit'])
    router.post('/trackdays/create', [TrackDaysController, 'create'])
    // Vehicle maintenance
    router.get('/maintenances', [MaintenancesController, 'index'])
    router.get('/maintenances/:slug', [MaintenancesController, 'showMaintenanceForVehicle'])
    // Chronos
    router.get('/chronos', [ChronosController, 'index'])

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

// Api endpoint
router
  .group(() => {
    // Track CRUD
    router.post('/tracks/create', [TrackController, 'create'])
    router.get('/tracks', [TrackController, 'read'])
    router.get('/tracks/:slug', [TrackController, 'read'])
    router.post('/tracks/:slug/update', [TrackController, 'update'])
    router.delete('/tracks/:slug/delete', [TrackController, 'delete'])

    // Trackday CRUD
    router.post('/trackdays/create', [TrackDaysController, 'create'])
    router.get('/trackdays/:user', [TrackDaysController, 'read'])
    router.get('/trackdays/:user/:id', [TrackDaysController, 'read'])

    // Vehicle CRUD
    router.get('/vehicles/types', [VehiclesController, 'readVehicleType'])
    router.get('/vehicles/:id/brands', [VehiclesController, 'readBrand'])
    router.get('/vehicles/:id/models', [VehiclesController, 'readModels'])
    router.get('/vehicles/:id/cylinders', [VehiclesController, 'readCylinders'])

    router.get('/users/:id/tokens', async ({ params }) => {
      const user = await User.findOrFail(params.id)
      const token = await User.accessTokens.create(user)

      return {
        type: 'bearer',
        value: token.value!.release(),
      }
    })
  })
  .prefix('api')
//.use(middleware.auth()) // Create api middleware instead use auth
