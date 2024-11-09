import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const TrackController = () => import('#controllers/track_controller')

router
  .group(() => {
    // Publick route api
    router.get('/tracks', [TrackController, 'read'])
  })
  .prefix('/api')
