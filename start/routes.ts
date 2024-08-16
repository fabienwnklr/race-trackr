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
const DashboardController = () => import('#controllers/dashboard_controller')
const AuthController = () => import('#controllers/auth_controller')

router.group(() => {
  router.get('/', [AuthController, 'index']).use(middleware.guest())
})

// View logged group
router
  .group(() => {
    router.get('/dashboard', [DashboardController, 'index']).as('dashboard')
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
