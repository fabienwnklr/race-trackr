/// <reference path="../../adonisrc.ts" />
/// <reference path="../../config/inertia.ts" />

import '../css/app.css'
import { hydrateRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import { ConfigProvider } from 'antd'

const appName = import.meta.env.VITE_APP_NAME || 'Race-TrackR'

createInertiaApp({
  progress: { color: '#5468FF' },

  title: (title) => `${appName} - ${title}`,

  resolve: (name) => {
    return resolvePageComponent(`../pages/${name}.tsx`, import.meta.glob('../pages/**/*.tsx'))
  },

  setup({ el, App, props }) {
    hydrateRoot(
      el,
      <ConfigProvider theme={{ cssVar: true, hashed: false }}>
        <App {...props} />
      </ConfigProvider>
    )
  },
})
