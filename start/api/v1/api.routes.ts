import router from '@adonisjs/core/services/router'
import { middleware } from '../../kernel.js'

const TrackController = () => import('#controllers/api/v1/api.track_controller')

router
  .group(() => {
    // Publick route api
    router.get('/tracks', [TrackController, 'read'])
  })
  .prefix('/api/v1')
  .middleware(middleware.guest())
