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
const loading = ref(true)
const errorMsg = ref<string | null>(null)

/** Toggle edit for Profile tab (default: read-only) */
const editingProfile = ref(false)

const { data: subscription } = await useMySubscription()

function toUsername(email: string) {
  return (email.split('@')[0] || 'user')
    .toLowerCase()
    .replace(/[^a-z0-9-_]/g, '')
    .slice(0, 24)
}

function slugifyUsername(v: string) {
  return (v || '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-_]/g, '')
    .replace(/-+/g, '-')
    .slice(0, 24)
}

async function loadProfile() {
  errorMsg.value = null
  loading.value = true

  try {
    const { data: ures, error: uerr } = await client.auth.getUser()
    if (uerr) throw uerr
    const user = ures.user
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

    // 2) dacă nu există row, îl creăm
    if (!prof) {
      const email = user.email ?? ''
      const username = toUsername(email)
      const avatar = `https://api.dicebear.com/7.x/thumbs/svg?seed=${encodeURIComponent(username)}&backgroundColor=1e1e1e`

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
    resetForm()
  } catch (e: any) {
    errorMsg.value = e?.message ?? String(e)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadProfile()
})

const email = computed(() => profile.value?.email ?? '')
const plan = computed(() => (profile.value as any)?.plan ?? subscription.value?.plan ?? 'free')
const billingStatus = computed(() => (profile.value as any)?.billing_status ?? 'inactive')

const lastUpdate = computed(() => {
  const ts = profile.value?.updated_at
  if (!ts) return ''
  try {
    return new Date(ts).toLocaleString()
  } catch {
    return ''
  }
})

const avatarSrc = computed(() => {
  const url = (form.avatar_url || '').trim()
  if (url) return url

  const seed =
    (form.username ||
      form.name ||
      email.value ||
      'user')
      .toString()
      .trim()
      .toLowerCase()

  return `https://api.dicebear.com/7.x/thumbs/svg?seed=${encodeURIComponent(seed)}&backgroundColor=1e1e1e`
})

const usernameHint = computed(() => {
  const v = (form.username || '').trim()
  if (!v) return 'Opțional. Poate fi afișat public.'
  if (v.length < 3) return 'Cam scurt. Recomand minim 3 caractere.'
  if (v.length > 24) return 'Maxim 24 caractere.'
  if (!/^[a-z0-9-_]+$/.test(v)) return 'Folosește doar litere mici, cifre, - și _.'
  return 'Arată bine.'
})

const usernameInvalid = computed(() => {
  // validăm strict doar când editezi (altfel nu “țipă” UI-ul)
  if (!editingProfile.value) return false

  const v = (form.username || '').trim()
  if (!v) return false
  if (v.length < 3) return true
  if (v.length > 24) return true
  return !/^[a-z0-9-_]+$/.test(v)
})

watch(
  () => form.username,
  (v, prev) => {
    if (!editingProfile.value) return
    if (v === prev) return
    const normalized = slugifyUsername(v)
    if (normalized !== v) form.username = normalized
  }
)

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

  if (usernameInvalid.value) {
    errorMsg.value = 'Username invalid. Folosește doar litere mici, cifre, - și _. (3–24 caractere)'
    return
  }

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

/** Profile edit controls */
function startEditProfile() {
  errorMsg.value = null
  saved.value = false
  editingProfile.value = true
}

function cancelEditProfile() {
  resetForm()
  editingProfile.value = false
}

async function saveAndExitProfile() {
  await saveProfile()
  if (!errorMsg.value) editingProfile.value = false
}

// Tabs
type TabKey = 'profile' | 'account' | 'billing'
const activeTab = ref<TabKey>('profile')

watch(activeTab, () => {
  // dacă schimbi tab-ul în timp ce editezi, reset + exit edit
  if (editingProfile.value) cancelEditProfile()
})

const billingPill = computed(() => {
  return billingStatus.value === 'active'
    ? 'border-[rgba(34,197,94,.35)] bg-[rgba(34,197,94,.10)] text-[#22c55e]'
    : 'border-[#2b2b2b] bg-[#1f1f1f] text-[#94a3b8]'
})
</script>

<template>
  <div class="mx-auto w-full max-w-6xl px-5 py-8">
    <!-- Header -->
    <header class="mb-8">
      <div class="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 class="text-2xl font-semibold text-[#d4d4d4]">Settings</h1>
          <p class="mt-1 text-sm text-[#9a9a9a]">Manage your profile, account, and subscription.</p>
        </div>

        <div class="flex items-center gap-2">
          <span
            class="rounded-full border border-[#2b2b2b] bg-[#1f1f1f] px-3 py-1 text-xs text-[#a6a6a6]"
          >
            Plan: <b class="text-[#d4d4d4]">{{ plan }}</b>
          </span>
          <span class="rounded-full border px-3 py-1 text-xs" :class="billingPill">
            Billing: <b>{{ billingStatus }}</b>
          </span>
        </div>
      </div>
    </header>

    <div class="grid gap-6 lg:grid-cols-12">
      <!-- Left: summary card -->
      <section class="lg:col-span-4 rounded-[12px] border border-[#2b2b2b] bg-[#181818] overflow-hidden">
        <div class="px-6 py-5 border-b border-[#2b2b2b] bg-[#151515]">
          <div class="flex items-center gap-4">
            <div class="relative">
              <img
                :src="avatarSrc"
                alt="Avatar"
                class="h-16 w-16 rounded-full border border-[#2b2b2b] object-cover bg-[#1f1f1f]"
              />
              <span
                class="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border border-[#181818]"
                :class="billingStatus === 'active' ? 'bg-[#22c55e]' : 'bg-[#3b3b3b]'"
              />
            </div>

            <div class="min-w-0">
              <div class="truncate text-base font-semibold text-[#d4d4d4]">
                {{ profile?.name || 'Your profile' }}
              </div>
              <div class="truncate text-sm text-[#9a9a9a]">{{ email || '—' }}</div>
              <div class="mt-1 text-xs text-[#8f8f8f] truncate">
                {{ profile?.username ? `@${profile.username}` : 'No public username set' }}
              </div>
            </div>
          </div>
        </div>

        <div class="px-6 py-5 space-y-3 text-sm">
          <div class="rounded-[10px] border border-[#2b2b2b] bg-[#1a1a1a] p-4">
            <div class="text-xs text-[#8f8f8f]">Account</div>
            <div class="mt-1 flex items-center justify-between gap-3">
              <span class="text-[#9a9a9a]">Email</span>
              <span class="text-[#d4d4d4] truncate max-w-[230px] text-right">{{ email || '—' }}</span>
            </div>
          </div>

          <div class="rounded-[10px] border border-[#2b2b2b] bg-[#1a1a1a] p-4">
            <div class="text-xs text-[#8f8f8f]">Subscription</div>
            <div class="mt-1 flex items-center justify-between gap-3">
              <span class="text-[#9a9a9a]">Plan</span>
              <span class="text-[#d4d4d4]">{{ plan }}</span>
            </div>
            <div class="mt-1 flex items-center justify-between gap-3">
              <span class="text-[#9a9a9a]">Billing</span>
              <span class="text-[#d4d4d4]">{{ billingStatus }}</span>
            </div>
          </div>

          <div v-if="lastUpdate" class="text-xs text-[#8f8f8f]">
            Last update: <span class="text-[#bdbdbd]">{{ lastUpdate }}</span>
          </div>
        </div>
      </section>

      <!-- Right: tabs + panels -->
      <section class="lg:col-span-8 rounded-[12px] border border-[#2b2b2b] bg-[#181818] overflow-hidden">
        <!-- Tabs -->
        <div class="border-b border-[#2b2b2b] bg-[#151515] px-3">
          <div class="flex flex-wrap gap-1 py-2">
            <button
              type="button"
              @click="activeTab = 'profile'"
              class="px-4 py-2 text-sm font-semibold rounded-[8px] transition-colors"
              :class="activeTab === 'profile'
                ? 'bg-[#1f1f1f] text-[#d4d4d4] border border-[#2b2b2b]'
                : 'text-[#9a9a9a] hover:text-[#d4d4d4] hover:bg-[#1b1b1b]'"
            >
              Profile
            </button>

            <button
              type="button"
              @click="activeTab = 'account'"
              class="px-4 py-2 text-sm font-semibold rounded-[8px] transition-colors"
              :class="activeTab === 'account'
                ? 'bg-[#1f1f1f] text-[#d4d4d4] border border-[#2b2b2b]'
                : 'text-[#9a9a9a] hover:text-[#d4d4d4] hover:bg-[#1b1b1b]'"
            >
              Account
            </button>

            <button
              type="button"
              @click="activeTab = 'billing'"
              class="px-4 py-2 text-sm font-semibold rounded-[8px] transition-colors"
              :class="activeTab === 'billing'
                ? 'bg-[#1f1f1f] text-[#d4d4d4] border border-[#2b2b2b]'
                : 'text-[#9a9a9a] hover:text-[#d4d4d4] hover:bg-[#1b1b1b]'"
            >
              Billing
            </button>
          </div>
        </div>

        <!-- Content -->
        <div class="px-6 py-6">
          <!-- Global states -->
          <div v-if="loading" class="space-y-4">
            <div class="h-5 w-44 rounded bg-[#1f1f1f] border border-[#2b2b2b]" />
            <div class="h-10 rounded bg-[#1f1f1f] border border-[#2b2b2b]" />
            <div class="h-10 rounded bg-[#1f1f1f] border border-[#2b2b2b]" />
            <div class="h-10 rounded bg-[#1f1f1f] border border-[#2b2b2b]" />
            <div class="text-sm text-[#8f8f8f]">Loading settings…</div>
          </div>

          <div v-else>
            <!-- Error -->
            <div
              v-if="errorMsg"
              class="mb-5 rounded-[10px] border border-[rgba(255,80,80,.35)] bg-[rgba(255,80,80,.08)] px-4 py-3 text-sm text-[#ffb4b4]"
            >
              {{ errorMsg }}
            </div>

            <!-- PROFILE TAB -->
            <div v-show="activeTab === 'profile'" class="space-y-6">
              <div class="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 class="text-lg font-semibold text-[#d4d4d4]">Profile</h2>
                  <p class="mt-1 text-sm text-[#9a9a9a]">
                    View your details. Click <span class="text-[#d4d4d4] font-semibold">Edit profile</span> to make changes.
                  </p>
                </div>

                <!-- Toolbar -->
                <div class="flex items-center gap-2">
                  <button
                    v-if="!editingProfile"
                    type="button"
                    @click="startEditProfile"
                    class="inline-flex items-center justify-center rounded-[10px] border border-[#2b2b2b] bg-[#1f1f1f] px-4 py-2.5 text-sm font-bold text-[#d4d4d4] hover:border-[#3399ff]"
                  >
                    Edit profile
                  </button>

                  <template v-else>
                    <button
                      type="button"
                      @click="cancelEditProfile"
                      :disabled="saving"
                      class="inline-flex items-center justify-center rounded-[10px] border border-[#2b2b2b] px-4 py-2.5 text-sm font-bold text-[#d4d4d4] hover:border-[#3399ff] disabled:opacity-60"
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      @click="saveAndExitProfile"
                      :disabled="saving || !hasChanges || usernameInvalid"
                      class="inline-flex items-center justify-center rounded-[10px] bg-[#007acc] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#1fa3ff] disabled:opacity-60"
                    >
                      {{ saving ? 'Saving…' : 'Save' }}
                    </button>
                  </template>
                </div>
              </div>

              <!-- Read-only hint -->
              <div
                v-if="!editingProfile"
                class="rounded-[12px] border border-[#2b2b2b] bg-[#151515] px-4 py-3 text-sm text-[#9a9a9a]"
              >
                Editing is disabled. Click <span class="text-[#d4d4d4] font-semibold">Edit profile</span> to update details.
              </div>

              <form class="space-y-4" @submit.prevent>
                <div class="grid gap-4 md:grid-cols-2">
                  <div class="space-y-1.5">
                    <label class="text-sm font-semibold text-[#cfcfcf]">Display name</label>
                    <input
                      v-model="form.name"
                      :disabled="!editingProfile || saving"
                      type="text"
                      placeholder="Alexandru…"
                      class="w-full rounded-[10px] border border-[#2b2b2b] bg-[#1f1f1f] px-3 py-2.5 text-sm text-[#d4d4d4] outline-none focus:border-[#3399ff] focus:ring-4 focus:ring-[rgba(51,153,255,.20)] disabled:opacity-70 disabled:cursor-not-allowed"
                    />
                  </div>

                  <div class="space-y-1.5">
                    <label class="text-sm font-semibold text-[#cfcfcf]">
                      Username <span class="text-[#8f8f8f] font-normal">(optional)</span>
                    </label>
                    <div class="relative">
                      <span class="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#8f8f8f]">@</span>
                      <input
                        v-model="form.username"
                        :disabled="!editingProfile || saving"
                        type="text"
                        placeholder="gadanisor"
                        class="w-full rounded-[10px] border border-[#2b2b2b] bg-[#1f1f1f] pl-8 pr-3 py-2.5 text-sm text-[#d4d4d4] outline-none focus:border-[#3399ff] focus:ring-4 focus:ring-[rgba(51,153,255,.20)] disabled:opacity-70 disabled:cursor-not-allowed"
                        :class="usernameInvalid
                          ? 'border-[rgba(255,80,80,.50)] focus:border-[rgba(255,80,80,.70)] focus:ring-[rgba(255,80,80,.20)]'
                          : ''"
                      />
                    </div>
                    <p class="text-xs" :class="usernameInvalid ? 'text-[#ffb4b4]' : 'text-[#8f8f8f]'">
                      {{ usernameHint }}
                    </p>
                  </div>
                </div>

                <div class="space-y-1.5">
                  <label class="text-sm font-semibold text-[#cfcfcf]">Avatar URL</label>
                  <div class="flex flex-wrap items-center gap-3">
                    <input
                      v-model="form.avatar_url"
                      :disabled="!editingProfile || saving"
                      type="url"
                      placeholder="https://…"
                      class="flex-1 min-w-[240px] rounded-[10px] border border-[#2b2b2b] bg-[#1f1f1f] px-3 py-2.5 text-sm text-[#d4d4d4] outline-none focus:border-[#3399ff] focus:ring-4 focus:ring-[rgba(51,153,255,.20)] disabled:opacity-70 disabled:cursor-not-allowed"
                    />
                    <div class="flex items-center gap-2 rounded-[10px] border border-[#2b2b2b] bg-[#1a1a1a] px-3 py-2">
                      <img :src="avatarSrc" alt="Preview" class="h-8 w-8 rounded-full border border-[#2b2b2b] object-cover" />
                      <span class="text-xs text-[#8f8f8f]">Preview</span>
                    </div>
                  </div>
                  <p class="text-xs text-[#8f8f8f]">
                    Public image URL. (Upload flow can come later.)
                  </p>
                </div>

                <div class="flex flex-wrap items-center gap-3 pt-2">
                  <span v-if="saved" class="text-sm font-semibold text-[#22c55e]">
                    Saved ✓
                  </span>

                  <span v-if="editingProfile && !hasChanges" class="text-xs text-[#8f8f8f]">
                    No unsaved changes
                  </span>
                </div>
              </form>
            </div>

            <!-- ACCOUNT TAB -->
            <div v-show="activeTab === 'account'" class="space-y-6">
              <div>
                <h2 class="text-lg font-semibold text-[#d4d4d4]">Account</h2>
                <p class="mt-1 text-sm text-[#9a9a9a]">
                  Account identifiers are read-only here. Security-related actions are handled elsewhere.
                </p>
              </div>

              <div class="grid gap-4 md:grid-cols-2">
                <div class="rounded-[12px] border border-[#2b2b2b] bg-[#1a1a1a] p-5">
                  <div class="text-xs text-[#8f8f8f]">Email</div>
                  <div class="mt-1 text-sm font-semibold text-[#d4d4d4] truncate">{{ email || '—' }}</div>
                  <div class="mt-2 text-xs text-[#8f8f8f]">
                    Email is managed by your auth provider.
                  </div>
                </div>

                <div class="rounded-[12px] border border-[#2b2b2b] bg-[#1a1a1a] p-5">
                  <div class="text-xs text-[#8f8f8f]">Profile status</div>
                  <div class="mt-1 text-sm font-semibold text-[#d4d4d4]">
                    {{ profile ? 'Active' : 'Not loaded' }}
                  </div>
                  <div class="mt-2 text-xs text-[#8f8f8f]">
                    Last update: <span class="text-[#bdbdbd]">{{ lastUpdate || '—' }}</span>
                  </div>
                </div>
              </div>

              <div class="rounded-[12px] border border-[#2b2b2b] bg-[#1a1a1a] p-5">
                <div class="text-sm font-semibold text-[#d4d4d4]">Tips</div>
                <ul class="mt-2 space-y-1 text-sm text-[#9a9a9a] list-disc pl-5">
                  <li>Nu afișăm User ID în UI.</li>
                  <li>Dacă vrei “Change password / Delete account”, fă-le pe o pagină separată cu confirmări.</li>
                </ul>
              </div>
            </div>

            <!-- BILLING TAB -->
            <div v-show="activeTab === 'billing'" class="space-y-6">
              <div>
                <h2 class="text-lg font-semibold text-[#d4d4d4]">Billing</h2>
                <p class="mt-1 text-sm text-[#9a9a9a]">View plan and billing status (read-only).</p>
              </div>

              <div class="grid gap-4 md:grid-cols-2">
                <div class="rounded-[12px] border border-[#2b2b2b] bg-[#1a1a1a] p-5">
                  <div class="text-xs text-[#8f8f8f]">Current plan</div>
                  <div class="mt-1 text-xl font-semibold text-[#d4d4d4]">{{ plan }}</div>
                  <div class="mt-2 text-xs text-[#8f8f8f]">
                    Upgrades are handled on the pricing page for now.
                  </div>
                </div>

                <div class="rounded-[12px] border border-[#2b2b2b] bg-[#1a1a1a] p-5">
                  <div class="text-xs text-[#8f8f8f]">Billing status</div>
                  <div
                    class="mt-1 text-xl font-semibold"
                    :class="billingStatus === 'active' ? 'text-[#22c55e]' : 'text-[#d4d4d4]'"
                  >
                    {{ billingStatus }}
                  </div>
                  <div class="mt-2 text-xs text-[#8f8f8f]">
                    If you think this is wrong, contact support.
                  </div>
                </div>
              </div>

              <div class="flex flex-wrap gap-3">
                <NuxtLink
                  to="/#pricing"
                  class="inline-flex items-center justify-center rounded-[10px] bg-[#007acc] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#1fa3ff]"
                >
                  Pricing
                </NuxtLink>

                <NuxtLink
                  to="/#download"
                  class="inline-flex items-center justify-center rounded-[10px] border border-[#2b2b2b] px-4 py-2.5 text-sm font-bold text-[#d4d4d4] hover:border-[#3399ff]"
                >
                  Download
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
