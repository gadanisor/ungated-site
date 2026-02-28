import { defineNuxtPlugin } from '#app'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig().public
  const supabase: SupabaseClient = createClient(
    config.supabaseUrl as string,
    config.supabaseAnonKey as string
  )

  // subscribe to auth changes on the client. The default
  // `detectSessionInUrl: true` option will automatically parse the hash when
  // the client initializes, so we don’t need to manually examine
  // `window.location`. We wait for the SIGNED_IN event before navigating,
  // ensuring the session has been persisted.
  if (process.client) {
    supabase.auth.onAuthStateChange((event, session) => {
      // debug logging (remove or disable in production)
      // eslint-disable-next-line no-console
      console.debug('[supabase] auth event', event, session)

      const router = nuxtApp.$router as import('vue-router').Router
      const path = router.currentRoute.value.fullPath

      if (event === 'SIGNED_IN') {
        if (path === '/' || path === '/login') {
          router.replace('/dashboard')
        }
      }
      if (event === 'SIGNED_OUT') {
        if (path !== '/') {
          router.replace('/')
        }
      }
    })
  }

  return {
    provide: {
      supabase
    }
  }
})
