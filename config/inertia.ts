import { defineConfig } from '@adonisjs/inertia'
import type { InferSharedProps } from '@adonisjs/inertia/types'

const inertiaConfig = defineConfig({
  /**
   * Path to the Edge view that will be used as the root view for Inertia responses
   */
  rootView: 'inertia_layout',

  /**
   * Data that should be shared with all rendered pages
   */
  sharedData: {
    errors: (ctx) => ctx.session.flashMessages.get('error'),
    success: (ctx) => ctx.session.flashMessages.get('success'),
    infos: (ctx) => ctx.session.flashMessages.get('infos'),
    neutral: (ctx) => ctx.session.flashMessages.get('neutral'),
    user: (ctx) => ctx.auth.user,
    locale: (ctx) => ctx.request.header('accept-language')?.split(',')[0] || 'fr',
  },

  /**
   * Options for the server-side rendering
   */
  ssr: {
    enabled: false,
  },
})

export default inertiaConfig

declare module '@adonisjs/inertia/types' {
  export interface SharedProps extends InferSharedProps<typeof inertiaConfig> {}
}
