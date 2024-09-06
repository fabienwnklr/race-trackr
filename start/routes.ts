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
    router.get('/trackdays/create', [TrackDaysController, 'showCreateForm'])
    router.get('/trackdays/:slug', [TrackDaysController, 'showTrackdaysForTrack'])
    router.get('/trackdays/:slug/:id', [TrackDaysController, 'showTrackday'])
    // Vehicle maintenance
    router.get('/maintenances', [MaintenancesController, 'index'])
    router.get('/maintenances/:slug', [MaintenancesController, 'showMaintenanceForVehicle'])
    // Chronos
    router.get('/chronos', [ChronosController, 'index'])

    // Admin pages
    router
      .group(() => {
        router.get('/tracks', [TrackController, 'indexAdmin'])
        router.get('/tracks/create', [TrackController, 'createOrEditTrack'])
        router.get('/tracks/:slug/edit', [TrackController, 'createOrEditTrack'])
        router.get('/vehicles', [VehiclesController, 'indexAdmin'])
      })
      .prefix('admin')

    // Api endpoint
    router
      .group(() => {
        // Track CRUD
        router.post('/tracks/create', [TrackController, 'create'])
        router.get('/tracks/read', [TrackController, 'read'])
        router.get('/tracks/:slug/read', [TrackController, 'read'])
        router.post('/tracks/:slug/update', [TrackController, 'update'])
        router.delete('/tracks/:slug/delete', [TrackController, 'delete'])
      })
      .prefix('api')
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

router.get('/api/vehicles/types', [VehiclesController, 'readVehicleType'])
router.get('/api/vehicles/:id/brands', [VehiclesController, 'readBrand'])
router.get('/api/vehicles/:id/models', [VehiclesController, 'readModels'])
router.get('/api/vehicles/:id/cylinders', [VehiclesController, 'readCylinders'])
