import router from '@adonisjs/core/services/router'
import { middleware } from '../../kernel.js'

const APITrackController = () => import('#controllers/api/v1/api.track_controller')

router
  .group(() => {
    // Publick route api
    router.get('/tracks', [APITrackController, 'read'])
  })
  .prefix('/api/v1')
