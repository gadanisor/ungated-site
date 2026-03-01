import { defineNuxtPlugin } from '#app'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig().public
  // Validate public runtime config values and log masked versions for debugging
  const supabaseUrl = config.supabaseUrl as string | undefined
  const supabaseAnonKey = config.supabaseAnonKey as string | undefined

  const mask = (s: string | undefined) => {
    if (!s) return 'missing'
    if (s.length <= 10) return `${s.slice(0, 3)}...${s.slice(-3)}`
    return `${s.slice(0, 6)}...${s.slice(-6)}`
  }

  if (!supabaseUrl || !supabaseAnonKey) {
    // eslint-disable-next-line no-console
    console.error('[supabase] Missing NUXT_PUBLIC_SUPABASE_URL or NUXT_PUBLIC_SUPABASE_ANON_KEY')
    // throw here would crash SSR; keep it non-fatal but obvious in logs
  } else {
    // eslint-disable-next-line no-console
    console.debug('[supabase] supabaseUrl=', mask(supabaseUrl), 'anonKey=', mask(supabaseAnonKey))
  }

  const supabase: SupabaseClient = createClient(supabaseUrl || '', supabaseAnonKey || '')

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
