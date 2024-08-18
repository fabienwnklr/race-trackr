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
const MaintenancesController = () => import('#controllers/maintenances_controller')
const ChronosController = () => import('#controllers/chronos_controller')

router.group(() => {
  router.get('/', [AuthController, 'index']).use(middleware.guest())
})

// Logged access view
router
  .group(() => {
    router.get('/dashboard', [DashboardController, 'index']).as('dashboard')
    router.get('/trackdays', [TrackDaysController, 'index']).as('trackdays')
    router.get('/maintenances', [MaintenancesController, 'index']).as('maintenances')
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
