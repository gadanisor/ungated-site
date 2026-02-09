import type { Database } from '../types/supabase' // ajustează dacă path-ul diferă

type Profile = {
  id: string
  email: string | null
  name: string | null
  username: string | null
  avatar_url: string | null
  plan: string | null
  billing_status: string | null
  updated_at: string | null
}

type ProfileInsert = Database['public']['Tables']['profiles']['Insert']

function toUsername(email: string) {
  return (email.split('@')[0] || 'user')
    .toLowerCase()
    .replace(/[^a-z0-9-_]/g, '')
}

export const useProfile = () => {
  const client = useSupabaseClient<Database>()
  const user = useSupabaseUser()

  return useAsyncData<Profile | null>(
    // 🔑 key dependent de user → NU se mai lipește cache-ul
    () => (user.value?.id ? `profile:${user.value.id}` : 'profile:anon'),

    async () => {
      if (!user.value) return null

      // 1️⃣ încercăm să citim profilul
      const { data, error } = await client
        .from('profiles')
        .select('id,email,name,username,avatar_url,plan,billing_status,updated_at')
        .eq('id', user.value.id)
        .maybeSingle()

      if (error) throw error
      if (data) return data as Profile

      // 2️⃣ NU există → îl creăm (exact ca în aplicație)
      const email = user.value.email ?? ''
      const username = toUsername(email)
      const avatar = `https://api.dicebear.com/7.x/thumbs/svg?seed=${encodeURIComponent(username)}`

      const payload: ProfileInsert = {
        id: user.value.id,
        email,
        name: email,
        username,
        avatar_url: avatar,
        plan: 'free',
        billing_status: 'inactive',
        updated_at: new Date().toISOString(),
      }

      const { error: insertError } = await client
        .from('profiles')
        .upsert(payload, { onConflict: 'id' })

      if (insertError) throw insertError

      // 3️⃣ recitim profilul
      const { data: data2, error: error2 } = await client
        .from('profiles')
        .select('id,email,name,username,avatar_url,plan,billing_status,updated_at')
        .eq('id', user.value.id)
        .maybeSingle()

      if (error2) throw error2
      return (data2 ?? null) as Profile | null
    },
    {
      server: false, // 🚨 cheia: nu SSR → are session → RLS OK
      watch: [user],
    }
  )
}
