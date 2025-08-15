// nuxt.config.ts
import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  compatibilityDate: '2025-08-16',

  // Static SPA build → conținutul final ajunge în .output/public
  ssr: false,

  // (opțional) păstrat presetul Netlify; pentru generate e ok
  nitro: { preset: 'netlify' },

  // Încarcă stilurile tale + Tailwind
  css: [
    fileURLToPath(new URL('./assets/css/tailwind.css', import.meta.url)),
  ],

  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
      autoprefixer: {}
    }
  },

  app: {
    head: {
      title: 'Ungated — The IDE for writers',
      meta: [
        { name: 'description', content: 'Ungated is a focused desktop app for creative writing and world-building. Draft, organize, map your worlds, and ship your stories without friction.' },
        { name: 'theme-color', content: '#181818' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'Ungated — The toolbox worthy of your imagination' },
        { property: 'og:description', content: 'A beautifully minimal writer’s workspace with tools for characters, timelines, and world maps — all in one.' },
        { property: 'og:image', content: '/images/Capture2.png' },
        { property: 'og:url', content: 'https://ungated.net' },
        { name: 'twitter:card', content: 'summary_large_image' }
      ],
      link: [
        { rel: 'icon', href: '/images/logo.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }
      ]
    }
  }
})
