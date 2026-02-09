<script setup lang="ts">
import { useProfile } from '../../../composables/useProfile'
import { useMySubscription } from '../../../composables/useMySubscription'
import type { Database } from '../../../types/supabase'

definePageMeta({ middleware: 'auth' })

const client = useSupabaseClient<Database>()
const authUser = useSupabaseUser()

const { data: profile, refresh: refreshProfile } = await useProfile()
const { data: subscription } = await useMySubscription()

type ProfileInsert = Database['public']['Tables']['profiles']['Insert']
type ProfileUpdate = Database['public']['Tables']['profiles']['Update']

const form = reactive({
  name: '',
  username: '',
  avatar_url: '',
})

const saving = ref(false)
const saved = ref(false)
const errorMsg = ref<string | null>(null)

watch(
  profile,
  (p) => {
    if (!p) return
    form.name = p.name ?? ''
    form.username = p.username ?? ''
    form.avatar_url = p.avatar_url ?? ''
  },
  { immediate: true }
)

const email = computed(() => profile.value?.email ?? authUser.value?.email ?? '')
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
    // ✅ ia user-ul real (din token-ul curent)
    const { data: userRes, error: userErr } = await client.auth.getUser()
    if (userErr || !userRes.user) {
      errorMsg.value = 'Not authenticated (no session on client). Please re-login.'
      return
    }

    const uid = userRes.user.id
    const userEmail = userRes.user.email ?? ''

    const payload: ProfileInsert = {
      id: uid,
      email: userEmail,
      name: form.name.trim(),
      username: form.username.trim(),
      avatar_url: form.avatar_url.trim(),
      updated_at: new Date().toISOString(),
    }

    // ✅ upsert = insert dacă nu există, update dacă există
    const { error } = await client
      .from('profiles')
      .upsert(payload, { onConflict: 'id' })

    if (error) {
      errorMsg.value = error.message
      return
    }

    await refreshProfile()
    saved.value = true
    setTimeout(() => (saved.value = false), 1600)
  } finally {
    saving.value = false
  }
}

function resetForm() {
  const p = profile.value
  form.name = p?.name ?? ''
  form.username = p?.username ?? ''
  form.avatar_url = p?.avatar_url ?? ''
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
            <span class="text-[#d4d4d4] truncate max-w-[220px] text-right">{{ authUser?.id }}</span>
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
