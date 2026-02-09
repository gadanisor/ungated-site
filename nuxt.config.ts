// nuxt.config.ts
import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  compatibilityDate: '2025-08-16',

  // Website SPA (no SSR)
  ssr: false,

  // Build target (ok pentru Netlify SPA)
  nitro: {
    preset: 'netlify'
  },

  // Modules
  modules: [
    '@nuxtjs/supabase'
  ],
  supabase: {
  url: process.env.NUXT_PUBLIC_SUPABASE_URL,
  key: process.env.NUXT_PUBLIC_SUPABASE_KEY,
  redirect: false
},
runtimeConfig: {
  public: {
    supabaseUrl: process.env.NUXT_PUBLIC_SUPABASE_URL,
    supabaseKey: process.env.NUXT_PUBLIC_SUPABASE_KEY
  }
},
  // Global CSS (Tailwind entry)
  css: [
    fileURLToPath(new URL('./assets/css/tailwind.css', import.meta.url))
  ],

  // PostCSS (Tailwind v4)
  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
      autoprefixer: {}
    }
  },

  // App / head meta
  app: {
    head: {
      title: 'Ungated — The IDE for writers',
      meta: [
        {
          name: 'description',
          content:
            'Ungated is a focused desktop app for creative writing and world-building. Draft, organize, map your worlds, and ship your stories without friction.'
        },
        { name: 'theme-color', content: '#181818' },

        // Open Graph
        { property: 'og:type', content: 'website' },
        {
          property: 'og:title',
          content: 'Ungated — The toolbox worthy of your imagination'
        },
        {
          property: 'og:description',
          content:
            'A beautifully minimal writer’s workspace with tools for characters, timelines, and world maps — all in one.'
        },
        { property: 'og:image', content: '/images/Capture2.png' },
        { property: 'og:url', content: 'https://ungated.net' },

        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' }
      ],
      link: [
        { rel: 'icon', href: '/images/logo.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }
      ]
    }
  },

  // (opțional) nu-ți mai curăță consola la rebuild
  vite: {
    clearScreen: false
  }
})
