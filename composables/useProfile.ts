import type { Database } from '../types/supabase'

type Profile = Database['public']['Tables']['profiles']['Row']
type ProfileInsert = Database['public']['Tables']['profiles']['Insert']

function toUsername(email: string) {
  return (email.split('@')[0] || 'user').toLowerCase().replace(/[^a-z0-9-_]/g, '')
}

export const useProfile = () => {
  const client = useSupabaseClient<Database>()
  const user = useSupabaseUser()

  const data = ref<Profile | null>(null)
  const pending = ref(false)
  const error = ref<unknown>(null)

  async function refresh() {
    error.value = null

    // așteaptă până există user (rehydration după refresh)
    if (!user.value) {
      data.value = null
      return null
    }

    pending.value = true
    try {
      // 1) select
      const { data: prof, error: e1 } = await client
        .from('profiles')
        .select('*')
        .eq('id', user.value.id)
        .maybeSingle()

      if (e1) throw e1
      if (prof) {
        data.value = prof
        return prof
      }

      // 2) dacă nu există -> creăm row
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

      const { error: e2 } = await client.from('profiles').upsert(payload, { onConflict: 'id' })
      if (e2) throw e2

      // 3) recitim
      const { data: prof2, error: e3 } = await client
        .from('profiles')
        .select('*')
        .eq('id', user.value.id)
        .maybeSingle()

      if (e3) throw e3
      data.value = prof2 ?? null
      return data.value
    } catch (e) {
      error.value = e
      data.value = null
      throw e
    } finally {
      pending.value = false
    }
  }

  // când apare/dispare userul, reîncarcă profilul
  watch(
    () => user.value?.id,
    async (id) => {
      if (!id) {
        data.value = null
        return
      }
      // mic delay ca să fie sigur că session e stabilă
      await nextTick()
      await refresh().catch(() => {})
    },
    { immediate: true }
  )

  return { data, pending, error, refresh }
}
