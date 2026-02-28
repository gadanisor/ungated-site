import { defineNuxtPlugin } from '#app'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig().public
  const supabase: SupabaseClient = createClient(
    config.supabaseUrl as string,
    config.supabaseAnonKey as string
  )

  // handle OAuth callback fragment on client.  Note: the official
  // client already sets `detectSessionInUrl: true` by default, which will
  // parse the hash during initialization, but we keep this branch as a
  // safety-net and to perform an immediate redirect.
  if (process.client && window.location.hash.includes('access_token')) {
    // `getSessionFromUrl` is not publicly typed in @supabase/auth-js, so force
    // a cast to any and type the result ourselves.
    ;(supabase.auth as any)
      .getSessionFromUrl({ storeSession: true } as any)
      .then((result: any) => {
        const { data, error }: { data: any; error: any } = result

        // remove the fragment so it doesn't stick around in the address bar
        const cleanUrl = window.location.origin + window.location.pathname
        window.history.replaceState({}, '', cleanUrl)

        if (error) {
          // nothing fatal, just log
          // eslint-disable-next-line no-console
          console.error('Supabase OAuth callback error', error)
          return
        }

        // once the session is stored we can optionally redirect
        // to dashboard if the user landed at site root or login
        const router = nuxtApp.$router as import('vue-router').Router
        const current = window.location.pathname
        if (current === '/' || current === '/login') {
          router.replace('/dashboard')
        }
      })
  }

  return {
    provide: {
      supabase
    }
  }
})
