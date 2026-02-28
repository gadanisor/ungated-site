// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    '@vueuse/nuxt',
    'nuxt-og-image'
  ],

  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  // Recomandat: Nuxt ia automat din env NUXT_PUBLIC_*
  runtimeConfig: {
    public: {
      supabaseUrl: '',        // setat din NUXT_PUBLIC_SUPABASE_URL
      supabaseAnonKey: ''     // setat din NUXT_PUBLIC_SUPABASE_ANON_KEY
    }
  },

  routeRules: {
    '/docs': { redirect: '/docs/getting-started', prerender: false },
    '/docs/**': { prerender: false } // ca să nu încerce să prerender-uiască sub-rutele
  },

  compatibilityDate: '2024-07-11',

  nitro: {
    preset: 'netlify',
    prerender: {
      routes: ['/'],
      crawlLinks: false
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})