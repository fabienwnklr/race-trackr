import router from '@adonisjs/core/services/router'
import { middleware } from '../../kernel.js'

const APITrackController = () => import('#controllers/api/v1/api.track_controller')

// Publick route api
router
  .group(() => {
    /**
     * @openapi
     * /api/v1/tracks:
     *   get:
     *     description: Get all tracks
     *     tags:
     *       - Tracks
     *     summary: Get all tracks
     *     operationId: getTracks
     *     parameters:
     *       - name: id
     *         in: query
     *         description: The ID of the track
     *         required: false
     *         type: integer
     *       - name: name
     *         in: query
     *         description: The name of the track
     *         required: false
     *     responses:
     *       200:
     *         description: Successful response
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     */
    router.get('/tracks', [APITrackController, 'get'])
  })
  .prefix('/api/v1')

router
  .group(() => {
    // Private route api
    router.get('/trackays', [APITrackController, 'get'])
  })
  .prefix('/api/v1')
  .middleware(middleware.auth({ guards: ['api'] }))
