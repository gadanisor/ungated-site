<script setup lang="ts">
import { useMySubscription } from '../../../composables/useMySubscription'
import type { Database } from '../../../types/supabase'

definePageMeta({
  middleware: 'auth',
  ssr: false,
})

const client = useSupabaseClient<Database>()

type ProfileRow = Database['public']['Tables']['profiles']['Row']
type ProfileInsert = Database['public']['Tables']['profiles']['Insert']

const profile = ref<ProfileRow | null>(null)

const form = reactive({
  name: '',
  username: '',
  avatar_url: '',
})

const saving = ref(false)
const saved = ref(false)
const errorMsg = ref<string | null>(null)

const { data: subscription } = await useMySubscription()

function toUsername(email: string) {
  return (email.split('@')[0] || 'user').toLowerCase().replace(/[^a-z0-9-_]/g, '')
}
const userId = ref<string>('')
async function loadProfile() {
  errorMsg.value = null

  const { data: ures, error: uerr } = await client.auth.getUser()
  if (uerr) throw uerr
  const user = ures.user
  userId.value = user?.id ?? ''
  if (!user) {
    profile.value = null
    return
  }

  // 1) try select
  const { data: prof, error: e1 } = await client
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .maybeSingle()

  if (e1) throw e1

  // 2) dacă nu există row, îl creăm (exact ca în app)
  if (!prof) {
    const email = user.email ?? ''
    const username = toUsername(email)
    const avatar = `https://api.dicebear.com/7.x/thumbs/svg?seed=${encodeURIComponent(username)}`

    const payload: ProfileInsert = {
      id: user.id,
      email,
      name: email,
      username,
      avatar_url: avatar,
      plan: 'free',
      billing_status: 'inactive',
      updated_at: new Date().toISOString(),
    }

    const { error: e2 } = await client.from('profiles').insert(payload)
    if (e2) throw e2

    const { data: prof2, error: e3 } = await client
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle()

    if (e3) throw e3
    profile.value = prof2 ?? null
  } else {
    profile.value = prof
  }

  // populate form
  form.name = profile.value?.name ?? ''
  form.username = profile.value?.username ?? ''
  form.avatar_url = profile.value?.avatar_url ?? ''
}

onMounted(() => {
  loadProfile().catch((e: any) => {
    errorMsg.value = e?.message ?? String(e)
  })
})

const email = computed(() => profile.value?.email ?? '')
const plan = computed(() => (profile.value as any)?.plan ?? subscription.value?.plan ?? 'free')
const billingStatus = computed(() => (profile.value as any)?.billing_status ?? 'inactive')

const avatarSrc = computed(() => {
  const url = (form.avatar_url || '').trim()
  if (url) return url

  const initials =
    (form.name || email.value || 'U')
      .toString()
      .trim()
      .split(/\s+/)
      .map((s) => s[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'U'

  return `https://placehold.co/96x96/2a2a2e/d7d7d7?text=${encodeURIComponent(initials)}`
})

const hasChanges = computed(() => {
  const p = profile.value
  const norm = (v: string | null | undefined) => (v ?? '').trim()

  if (!p) return !!(norm(form.name) || norm(form.username) || norm(form.avatar_url))

  return (
    norm(form.name) !== norm(p.name) ||
    norm(form.username) !== norm(p.username) ||
    norm(form.avatar_url) !== norm(p.avatar_url)
  )
})

async function saveProfile() {
  errorMsg.value = null
  saved.value = false
  saving.value = true

  try {
    const { data: ures } = await client.auth.getUser()
    const user = ures.user
    if (!user) return

    const payload: Database['public']['Tables']['profiles']['Update'] = {
      name: form.name.trim() || undefined,
      username: form.username.trim() || undefined,
      avatar_url: form.avatar_url.trim() || undefined,
      updated_at: new Date().toISOString(),
    }

    const { error } = await client.from('profiles').update(payload).eq('id', user.id)
    if (error) throw error

    await loadProfile()
    saved.value = true
    setTimeout(() => (saved.value = false), 1600)
  } catch (e: any) {
    errorMsg.value = e?.message ?? String(e)
  } finally {
    saving.value = false
  }
}

function resetForm() {
  form.name = profile.value?.name ?? ''
  form.username = profile.value?.username ?? ''
  form.avatar_url = profile.value?.avatar_url ?? ''
  errorMsg.value = null
  saved.value = false
}
</script>



<template>
  <div class="mx-auto w-full max-w-5xl px-5 py-8">
    <!-- Header -->
    <header class="mb-8">
      <h1 class="text-2xl font-semibold text-[#d4d4d4]">Dashboard</h1>
      <p class="mt-1 text-sm text-[#9a9a9a]">Profile, plan, and account settings.</p>
    </header>

    <div class="grid gap-6 lg:grid-cols-3">
      <!-- Left: profile summary -->
      <section class="rounded-[10px] border border-[#2b2b2b] bg-[#181818] p-6 lg:col-span-1">
        <div class="flex items-center gap-4">
          <img
            :src="avatarSrc"
            alt="Avatar"
            class="h-16 w-16 rounded-full border border-[#2b2b2b] object-cover bg-[#1f1f1f]"
          />
          <div class="min-w-0">
            <div class="truncate text-base font-semibold text-[#d4d4d4]">
              {{ profile?.name || 'Your profile' }}
            </div>
            <div class="truncate text-sm text-[#9a9a9a]">{{ email }}</div>

            <div class="mt-2 flex flex-wrap gap-2">
              <span class="rounded-full border border-[#2b2b2b] bg-[#1f1f1f] px-3 py-1 text-xs text-[#a6a6a6]">
                Plan: <b class="text-[#d4d4d4]">{{ plan }}</b>
              </span>
              <span
                class="rounded-full border px-3 py-1 text-xs"
                :class="billingStatus === 'active'
                  ? 'border-[rgba(34,197,94,.35)] bg-[rgba(34,197,94,.10)] text-[#22c55e]'
                  : 'border-[#2b2b2b] bg-[#1f1f1f] text-[#94a3b8]'"
              >
                Billing: <b>{{ billingStatus }}</b>
              </span>
            </div>
          </div>
        </div>

        <div class="mt-6 border-t border-[#2b2b2b] pt-5 text-sm text-[#9a9a9a] space-y-1.5">
          <div class="flex items-center justify-between">
            <span>User ID</span>
            <span class="text-[#d4d4d4] truncate max-w-[220px] text-right">{{ userId }}</span>
          </div>
          <div class="flex items-center justify-between" v-if="profile?.updated_at">
            <span>Last update</span>
            <span class="text-[#d4d4d4]">{{ new Date(profile.updated_at).toLocaleString() }}</span>
          </div>
        </div>
      </section>

      <!-- Right: edit form -->
      <section class="rounded-[10px] border border-[#2b2b2b] bg-[#181818] lg:col-span-2">
        <div class="border-b border-[#2b2b2b] px-6 py-4">
          <h2 class="text-lg font-semibold text-[#d4d4d4]">Profile settings</h2>
          <p class="mt-1 text-sm text-[#9a9a9a]">Update how your account appears in Ungated Cloud.</p>
        </div>

        <form class="space-y-4 px-6 py-6" @submit.prevent="saveProfile">
          <div class="grid gap-4 md:grid-cols-2">
            <div class="space-y-1.5">
              <label class="text-sm font-semibold text-[#cfcfcf]">Display name</label>
              <input
                v-model="form.name"
                type="text"
                placeholder="Alexandru…"
                class="w-full rounded-[6px] border border-[#2b2b2b] bg-[#1f1f1f] px-3 py-2.5 text-sm text-[#d4d4d4] outline-none focus:border-[#3399ff] focus:ring-4 focus:ring-[rgba(51,153,255,.20)]"
              />
            </div>

            <div class="space-y-1.5">
              <label class="text-sm font-semibold text-[#cfcfcf]">Username</label>
              <input
                v-model="form.username"
                type="text"
                placeholder="gadanisor"
                class="w-full rounded-[6px] border border-[#2b2b2b] bg-[#1f1f1f] px-3 py-2.5 text-sm text-[#d4d4d4] outline-none focus:border-[#3399ff] focus:ring-4 focus:ring-[rgba(51,153,255,.20)]"
              />
              <p class="text-xs text-[#8f8f8f]">Optional. Keep it short and unique.</p>
            </div>
          </div>

          <div class="space-y-1.5">
            <label class="text-sm font-semibold text-[#cfcfcf]">Avatar URL</label>
            <input
              v-model="form.avatar_url"
              type="url"
              placeholder="https://…"
              class="w-full rounded-[6px] border border-[#2b2b2b] bg-[#1f1f1f] px-3 py-2.5 text-sm text-[#d4d4d4] outline-none focus:border-[#3399ff] focus:ring-4 focus:ring-[rgba(51,153,255,.20)]"
            />
            <p class="text-xs text-[#8f8f8f]">Paste a public image URL. (Upload flow can come later.)</p>
          </div>

          <div
            v-if="errorMsg"
            class="rounded-[6px] border border-[rgba(255,80,80,.35)] bg-[rgba(255,80,80,.08)] px-3 py-2 text-sm text-[#ffb4b4]"
          >
            {{ errorMsg }}
          </div>

          <div class="flex flex-wrap items-center gap-3">
            <button
              type="submit"
              :disabled="saving || !hasChanges"
              class="inline-flex items-center justify-center rounded-[6px] bg-[#007acc] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#1fa3ff] disabled:opacity-60"
            >
              {{ saving ? 'Saving…' : 'Save changes' }}
            </button>

            <button
              type="button"
              @click="resetForm"
              :disabled="saving || !hasChanges"
              class="inline-flex items-center justify-center rounded-[6px] border border-[#2b2b2b] px-4 py-2.5 text-sm font-bold text-[#d4d4d4] hover:border-[#3399ff] disabled:opacity-60"
            >
              Discard
            </button>

            <span v-if="saved" class="text-sm font-semibold text-[#22c55e]">
              Saved ✓
            </span>
          </div>
        </form>
      </section>
    </div>

    <!-- Optional: next steps -->
    <section class="mt-10 rounded-[10px] border border-[#2b2b2b] bg-[#181818] p-6">
      <h2 class="text-lg font-semibold text-[#d4d4d4]">Next</h2>
      <p class="mt-1 text-sm text-[#9a9a9a]">
        Want the desktop app? Head to downloads. Plan upgrades are handled on the pricing page for now.
      </p>

      <div class="mt-5 flex flex-wrap gap-3">
        <NuxtLink
          to="/#download"
          class="inline-flex items-center justify-center rounded-[6px] bg-[#007acc] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#1fa3ff]"
        >
          Download
        </NuxtLink>

        <NuxtLink
          to="/#pricing"
          class="inline-flex items-center justify-center rounded-[6px] border border-[#2b2b2b] px-4 py-2.5 text-sm font-bold text-[#d4d4d4] hover:border-[#3399ff]"
        >
          Pricing
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
