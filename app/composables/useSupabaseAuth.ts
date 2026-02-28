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
        }
      }
    })

    if (error) throw error

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

      if (profileError) throw profileError
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

  return {
    signUp,
    signIn,
    signInWithOAuth,
    signOut,
    getUser,
    getProfile,
    updateProfile,
    supabase
  }
}
