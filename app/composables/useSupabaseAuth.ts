import { createClient } from '@supabase/supabase-js'

export interface UserProfile {
  id: string
  email: string
  name: string
  username: string
  avatar_url: string
  plan: string
  billing_status: string
  updated_at: string
  settings: Record<string, any>
  settings_updated_at: string
}

export const useSupabaseAuth = () => {
  // use shared Supabase client provided by plugin (see ~/plugins/supabase.client.ts)
  const nuxtApp = useNuxtApp()
  const supabase = nuxtApp.$supabase
  if (!supabase) {
    // fallback if plugin didn't run for some reason
    const supabaseUrl = useRuntimeConfig().public.supabaseUrl as string
    const supabaseKey = useRuntimeConfig().public.supabaseAnonKey as string
    throw new Error('Supabase client not initialized')
  }

  const signUp = async (email: string, password: string, name: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name
        },
        emailRedirectTo: `${window.location.origin}/confirm`
      }
    })

    if (error) {
      // log the raw error for easier debugging in devtools / console
      // the message the user sees in the UI is just `error.message` so
      // capturing the full object helps diagnose issues such as missing
      // columns, permission problems or configuration mistakes.
      //
      // common messages from Supabase include "Database error saving new user"
      // when the underlying table is mis‑configured or an RLS policy blocks
      // the insert.  Check the network tab / Supabase logs for the
      // `auth.signUp` request if you see this in production.
      //
      // rethrow so the callers (e.g. signup.vue) can show the message.
      console.error('[useSupabaseAuth] signUp error', error)
      throw error
    }

    // Create profile after signup
    if (data.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: data.user.id,
          email,
          name,
          username: email.split('@')[0],
          avatar_url: '',
          plan: 'free',
          billing_status: 'inactive',
          settings: {}
        })

      if (profileError) {
        // Log the profile insert error but do not throw. During sign-up the
        // new user may not be authenticated yet which will cause RLS to
        // prevent the insert (resulting in "Database error saving new user").
        //
        // Recommended: create a DB trigger (see comment below) that inserts
        // into `profiles` after a new row is added to `auth.users`. That
        // server-side trigger avoids RLS/anon role issues and keeps the
        // client-side flow simple.
        console.error('[useSupabaseAuth] profile insert error', profileError)
        // don't throw — allow signUp to succeed even if the profile couldn't
        // be created from the client. The server trigger (recommended) will
        // create the profile instead.
      }
    }

    // Store email for check-email page
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('signup_email', email)
    }

    return data
  }

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) throw error
    return data
  }

  const signInWithOAuth = async (provider: 'github' | 'google') => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    })

    if (error) throw error
    return data
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  const getUser = async () => {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) throw error
    return user
  }

  const getProfile = async (userId: string): Promise<UserProfile | null> => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error && error.code !== 'PGRST116') throw error
    return data
  }

  const updateProfile = async (userId: string, updates: Partial<UserProfile>) => {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()

    if (error) throw error
    return data
  }

  const confirmEmail = async (token: string, type: 'email' = 'email') => {
    const { data, error } = await supabase.auth.verifyOtp({
      token_hash: token,
      type
    })

    if (error) throw error
    return data
  }

  const resendConfirmationEmail = async (email: string) => {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/confirm`
      }
    })

    if (error) throw error
  }

  return {
    signUp,
    signIn,
    signInWithOAuth,
    signOut,
    getUser,
    getProfile,
    updateProfile,
    confirmEmail,
    resendConfirmationEmail,
    supabase
  }
}
