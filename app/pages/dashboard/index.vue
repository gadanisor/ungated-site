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

    const { data: prof, error: e1 } = await client
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle()

    if (e1) throw e1

    if (!prof) {
      const email = user.email ?? ''
      const username = toUsername(email)
      const avatar = `https://api.dicebear.com/7.x/thumbs/svg?seed=${encodeURIComponent(
        username
      )}&backgroundColor=1e1e1e`

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

  const seed = (form.username || form.name || email.value || 'user').toString().trim().toLowerCase()
  return `https://api.dicebear.com/7.x/thumbs/svg?seed=${encodeURIComponent(seed)}&backgroundColor=1e1e1e`
})

const usernameHint = computed(() => {
  const v = (form.username || '').trim()
  if (!v) return 'Optional'
  if (v.length < 3) return 'Minumum 3 characters'
  if (v.length > 24) return 'Maximum 24 characters'
  if (!/^[a-z0-9-_]+$/.test(v)) return 'Only lowercase letters, digits, - and _'
})

const usernameInvalid = computed(() => {
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
    errorMsg.value = 'Invalid username. 3–24 charracters, only lowercase letters, digits, - and _.'
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
  if (editingProfile.value) cancelEditProfile()
})

const billingPill = computed(() => {
  return billingStatus.value === 'active'
    ? 'border-[rgba(34,197,94,.35)] bg-[rgba(34,197,94,.10)] text-[#22c55e]'
    : 'border-[#2b2b2b] bg-[#181818] text-[#9aa4b2]'
})

function tabBtn(key: TabKey) {
  return activeTab.value === key
    ? 'bg-[#181818] text-[#e6e6e6] border border-[#2b2b2b] shadow-[0_1px_0_rgba(255,255,255,.04)]'
    : 'text-[#a3a3a3] hover:text-[#e6e6e6] hover:bg-[#171717]'
}

// “Polished” helpers
const card =
  'rounded-[12px] border border-[#2b2b2b] bg-[#181818] shadow-[0_10px_30px_rgba(0,0,0,.25)]'
const cardInner = 'rounded-[10px] border border-[#2b2b2b] bg-[#1f1f1f]'
const sectionTitle = 'text-sm font-semibold text-[#d4d4d4]'
const sectionHint = 'text-xs text-[#9a9a9a]'
const divider = 'border-t border-[#2b2b2b]'
</script>

<template>
  <div class="min-h-[calc(100vh-120px)] px-5 py-10">
    <div class="mx-auto w-full max-w-[980px]">
      <!-- Top bar -->
      <div class="mb-8 flex flex-wrap items-center justify-between gap-3">
        <div class="space-y-1">
          <div
            class="inline-flex items-center gap-2 rounded-full border border-[#2b2b2b] bg-[#181818] px-3 py-1 text-xs text-[#9aa4b2]"
          >
            <span class="codicon codicon-settings text-[#007acc]" />
            <span>Settings</span>
          </div>

          <div class="text-2xl font-semibold tracking-tight text-[#d4d4d4]">
            Account settings
          </div>

          <div class="text-sm text-[#9a9a9a] flex items-center gap-2">
            <span class="inline-flex items-center gap-1">
              <span class="codicon codicon-account" />
              Profile
            </span>
            <span class="text-[#3a3a3a]">•</span>
            <span class="inline-flex items-center gap-1">
              <span class="codicon codicon-key" />
              Account
            </span>
            <span class="text-[#3a3a3a]">•</span>
            <span class="inline-flex items-center gap-1">
              <span class="codicon codicon-credit-card" />
              Billing
            </span>
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-2">
          <span
            class="rounded-full border border-[#2b2b2b] bg-[#181818] px-3 py-1 text-xs text-[#9aa4b2] inline-flex items-center gap-2"
          >
            <span class="codicon codicon-symbol-property text-[#9aa4b2]" />
            <span>
              Plan: <b class="text-[#d4d4d4]">{{ plan }}</b>
            </span>
          </span>

          <span class="rounded-full border px-3 py-1 text-xs inline-flex items-center gap-2" :class="billingPill">
            <span class="codicon codicon-verified" />
            <span>
              Billing: <b>{{ billingStatus }}</b>
            </span>
          </span>
        </div>
      </div>

      <div class="grid gap-6 lg:grid-cols-12">
        <!-- Left: profile summary -->
        <section class="lg:col-span-4" :class="card">
          <div class="border-b border-[#2b2b2b] px-6 py-5">
            <div class="flex items-center gap-4">
              <img
                :src="avatarSrc"
                alt="Avatar"
                class="h-14 w-14 rounded-full border border-[#2b2b2b] bg-[#1f1f1f] object-cover"
              />

              <div class="min-w-0 flex-1">
                <div class="flex items-center justify-between gap-3">
                  <div class="truncate text-sm font-semibold text-[#d4d4d4]">
                    {{ profile?.name || '—' }}
                  </div>
                  <span
                    class="inline-flex items-center gap-2 rounded-full border border-[#2b2b2b] bg-[#1f1f1f] px-2 py-1 text-[11px] text-[#9aa4b2]"
                  >
                    <span class="codicon codicon-person" />
                    {{ profile?.username ? `@${profile.username}` : '—' }}
                  </span>
                </div>

                <div class="mt-1 truncate text-sm text-[#9a9a9a] flex items-center gap-2">
                  <span class="codicon codicon-mail" />
                  <span class="truncate">{{ email || '—' }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="px-6 py-6 space-y-4">
            <div :class="cardInner" class="px-4 py-3">
              <div class="flex items-center justify-between gap-3 text-sm">
                <span class="text-[#a6a6a6] inline-flex items-center gap-2">
                  <span class="codicon codicon-mail" />
                  Email
                </span>
                <span class="text-[#d4d4d4] truncate max-w-[220px] text-right">
                  {{ email || '—' }}
                </span>
              </div>
            </div>

            <div :class="cardInner" class="px-4 py-3">
              <div class="flex items-center justify-between gap-3 text-sm">
                <span class="text-[#a6a6a6] inline-flex items-center gap-2">
                  <span class="codicon codicon-symbol-keyword" />
                  Plan
                </span>
                <span class="text-[#d4d4d4]">{{ plan }}</span>
              </div>
              <div class="mt-2 flex items-center justify-between gap-3 text-sm">
                <span class="text-[#a6a6a6] inline-flex items-center gap-2">
                  <span class="codicon codicon-credit-card" />
                  Billing
                </span>
                <span class="text-[#d4d4d4]">{{ billingStatus }}</span>
              </div>
            </div>

            <div v-if="lastUpdate" class="text-xs text-[#8f8f8f] inline-flex items-center gap-2">
              <span class="codicon codicon-history" />
              <span>Updated <span class="text-[#cfcfcf]">{{ lastUpdate }}</span></span>
            </div>
          </div>
        </section>

        <!-- Right: tabs + panels -->
        <section class="lg:col-span-8 overflow-hidden" :class="card">
          <!-- Header + Tabs -->
          <div class="border-b border-[#2b2b2b] px-6 py-4">
            <div class="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div class="text-lg font-semibold text-[#d4d4d4] flex items-center gap-2">
                  <span class="codicon codicon-settings-gear text-[#9aa4b2]" />
                  Settings
                </div>
                <div class="mt-1 text-sm text-[#9a9a9a]">
                  Manage your profile, account, and billing.
                </div>
              </div>

              <!-- Tabs (separate, normal) -->
              <nav
                class="inline-flex items-center gap-2 rounded-[10px] border border-[#2b2b2b] bg-[#141414] p-1.5"
                aria-label="Settings tabs"
              >
                <button
                  type="button"
                  class="group inline-flex items-center gap-2 rounded-[8px] px-3 py-2 text-sm font-semibold transition-all cursor-pointer border"
                  :class="tabBtn('profile')"
                  @click="activeTab = 'profile'"
                  :aria-selected="activeTab === 'profile'"
                >
                  <span class="codicon codicon-account" />
                  Profile
                </button>

                <button
                  type="button"
                  class="group inline-flex items-center gap-2 rounded-[8px] px-3 py-2 text-sm font-semibold transition-all cursor-pointer border"
                  :class="tabBtn('account')"
                  @click="activeTab = 'account'"
                  :aria-selected="activeTab === 'account'"
                >
                  <span class="codicon codicon-key" />
                  Account
                </button>

                <button
                  type="button"
                  class="group inline-flex items-center gap-2 rounded-[8px] px-3 py-2 text-sm font-semibold transition-all cursor-pointer border"
                  :class="tabBtn('billing')"
                  @click="activeTab = 'billing'"
                  :aria-selected="activeTab === 'billing'"
                >
                  <span class="codicon codicon-credit-card" />
                  Billing
                </button>
              </nav>
            </div>
          </div>

          <div class="px-6 py-6">
            <!-- Loading -->
            <div v-if="loading" class="space-y-4">
              <div class="h-5 w-40 rounded bg-[#1f1f1f] border border-[#2b2b2b]" />
              <div class="h-10 rounded bg-[#1f1f1f] border border-[#2b2b2b]" />
              <div class="h-10 rounded bg-[#1f1f1f] border border-[#2b2b2b]" />
              <div class="text-sm text-[#9a9a9a] inline-flex items-center gap-2">
                <span class="codicon codicon-loading codicon-modifier-spin" />
                Loading…
              </div>
            </div>

            <div v-else class="space-y-5">
              <!-- Error -->
              <div
                v-if="errorMsg"
                class="rounded-[10px] border border-[rgba(255,80,80,.35)] bg-[rgba(255,80,80,.08)] px-4 py-3 text-sm text-[#ffb4b4] inline-flex items-start gap-2"
              >
                <span class="codicon codicon-error" />
                <span>{{ errorMsg }}</span>
              </div>

              <!-- PROFILE TAB -->
              <section v-show="activeTab === 'profile'" class="space-y-5">
                <header class="flex items-start justify-between gap-4">
                  <div>
                    <div class="flex items-center gap-2" :class="sectionTitle">
                      <span class="codicon codicon-account" />
                      Profile
                    </div>
                    <div class="mt-1" :class="sectionHint">
                      Update your public profile info.
                    </div>
                  </div>

                  <!-- Actions -->
                  <div class="flex items-center gap-2">
                    <button
                      v-if="!editingProfile"
                      type="button"
                      @click="startEditProfile"
                      class="cursor-pointer inline-flex items-center justify-center gap-2 rounded-[10px] border border-[#2b2b2b] bg-[#1f1f1f] px-4 py-2.5 text-sm font-bold text-[#d4d4d4] transition-colors hover:bg-[#232323] hover:border-[#3399ff]"
                    >
                      <span class="codicon codicon-edit" />
                      Edit
                    </button>

                    <template v-else>
                      <button
                        type="button"
                        @click="cancelEditProfile"
                        :disabled="saving"
                        class="cursor-pointer inline-flex items-center justify-center gap-2 rounded-[10px] border border-[#2b2b2b] bg-transparent px-4 py-2.5 text-sm font-bold text-[#d4d4d4] transition-colors hover:bg-[#1f1f1f] disabled:opacity-60"
                      >
                        <span class="codicon codicon-close" />
                        Cancel
                      </button>

                      <button
                        type="button"
                        @click="saveAndExitProfile"
                        :disabled="saving || !hasChanges || usernameInvalid"
                        class="cursor-pointer inline-flex items-center justify-center gap-2 rounded-[10px] bg-[#007acc] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#1fa3ff] disabled:opacity-60"
                      >
                        <span v-if="saving" class="codicon codicon-loading codicon-modifier-spin" />
                        <span v-else class="codicon codicon-save" />
                        {{ saving ? 'Saving…' : 'Save' }}
                      </button>
                    </template>
                  </div>
                </header>

                <div class="rounded-[12px] border border-[#2b2b2b] bg-[#151515]">
                  <div class="px-5 py-4 border-b border-[#2b2b2b] flex items-center justify-between gap-3">
                    <div class="text-sm font-semibold text-[#d4d4d4] inline-flex items-center gap-2">
                      <span class="codicon codicon-symbol-field" />
                      Details
                    </div>
                    <div class="text-xs text-[#9a9a9a] inline-flex items-center gap-2">
                      <span class="codicon codicon-shield" />
                      Your changes are saved to your account
                    </div>
                  </div>

                  <div class="p-5 space-y-4">
                    <!-- Form -->
                    <form class="space-y-4" @submit.prevent>
                      <div class="grid gap-4 md:grid-cols-2">
                        <div class="space-y-1.5">
                          <label class="text-sm font-semibold text-[#cfcfcf] inline-flex items-center gap-2">
                            <span class="codicon codicon-person" />
                            Name
                          </label>
                          <input
                            v-model="form.name"
                            :disabled="!editingProfile || saving"
                            type="text"
                            placeholder="Billy..."
                            class="w-full rounded-[10px] border border-[#2b2b2b] bg-[#1f1f1f] px-3 py-2.5 text-sm text-[#d4d4d4] outline-none focus:border-[#3399ff] focus:ring-4 focus:ring-[rgba(51,153,255,.20)] disabled:opacity-70 disabled:cursor-not-allowed"
                          />
                        </div>

                        <div class="space-y-1.5">
                          <label class="text-sm font-semibold text-[#cfcfcf] inline-flex items-center gap-2">
                            <span class="codicon codicon-mention" />
                            Username
                          </label>
                          <div class="relative">
                            <span class="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#9a9a9a]">@</span>
                            <input
                              v-model="form.username"
                              :disabled="!editingProfile || saving"
                              type="text"
                              placeholder="billy123"
                              class="w-full rounded-[10px] border border-[#2b2b2b] bg-[#1f1f1f] pl-8 pr-3 py-2.5 text-sm text-[#d4d4d4] outline-none focus:border-[#3399ff] focus:ring-4 focus:ring-[rgba(51,153,255,.20)] disabled:opacity-70 disabled:cursor-not-allowed"
                              :class="
                                usernameInvalid
                                  ? 'border-[rgba(255,80,80,.55)] focus:border-[rgba(255,80,80,.75)] focus:ring-[rgba(255,80,80,.18)]'
                                  : ''
                              "
                            />
                          </div>
                          <div class="flex items-center justify-between text-xs">
                            <span :class="usernameInvalid ? 'text-[#ffb4b4]' : 'text-[#8f8f8f]'">
                              {{ usernameHint }}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div class="space-y-1.5">
                        <label class="text-sm font-semibold text-[#cfcfcf] inline-flex items-center gap-2">
                          <span class="codicon codicon-link" />
                          Avatar URL
                        </label>

                        <div class="flex flex-wrap items-center gap-3">
                          <input
                            v-model="form.avatar_url"
                            :disabled="!editingProfile || saving"
                            type="url"
                            placeholder="https://…"
                            class="flex-1 min-w-[240px] rounded-[10px] border border-[#2b2b2b] bg-[#1f1f1f] px-3 py-2.5 text-sm text-[#d4d4d4] outline-none focus:border-[#3399ff] focus:ring-4 focus:ring-[rgba(51,153,255,.20)] disabled:opacity-70 disabled:cursor-not-allowed"
                          />

                          <div class="flex items-center gap-2 rounded-[10px] border border-[#2b2b2b] bg-[#1f1f1f] px-3 py-2">
                            <img
                              :src="avatarSrc"
                              alt="Preview"
                              class="h-8 w-8 rounded-full border border-[#2b2b2b] object-cover bg-[#1a1a1a]"
                            />
                            <span class="text-xs text-[#9a9a9a] inline-flex items-center gap-2">
                              <span class="codicon codicon-eye" />
                              Preview
                            </span>
                          </div>
                        </div>
                      </div>

                      <div class="pt-1">
                        <div class="flex flex-wrap items-center gap-3">
                          <span v-if="saved" class="text-sm font-semibold text-[#22c55e] inline-flex items-center gap-2">
                            <span class="codicon codicon-check" />
                            Saved
                          </span>
                          <span v-else-if="editingProfile && !hasChanges" class="text-xs text-[#8f8f8f] inline-flex items-center gap-2">
                            <span class="codicon codicon-info" />
                            No changes
                          </span>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </section>

              <!-- ACCOUNT TAB -->
              <section v-show="activeTab === 'account'" class="space-y-5">
                <header>
                  <div class="flex items-center gap-2" :class="sectionTitle">
                    <span class="codicon codicon-key" />
                    Account
                  </div>
                  <div class="mt-1" :class="sectionHint">
                    Account status and security-related info.
                  </div>
                </header>

                <div class="rounded-[12px] border border-[#2b2b2b] bg-[#151515]">
                  <div class="px-5 py-4 border-b border-[#2b2b2b] flex items-center justify-between">
                    <div class="text-sm font-semibold text-[#d4d4d4] inline-flex items-center gap-2">
                      <span class="codicon codicon-shield" />
                      Overview
                    </div>
                    <div class="text-xs text-[#9a9a9a] inline-flex items-center gap-2">
                      <span class="codicon codicon-lock" />
                      Protected
                    </div>
                  </div>

                  <div class="p-5 space-y-4">
                    <div class="grid gap-4 md:grid-cols-2">
                      <div :class="cardInner" class="p-5">
                        <div class="text-xs text-[#9a9a9a] inline-flex items-center gap-2">
                          <span class="codicon codicon-mail" />
                          Email
                        </div>
                        <div class="mt-1 text-sm font-semibold text-[#d4d4d4] truncate">
                          {{ email || '—' }}
                        </div>
                      </div>

                      <div :class="cardInner" class="p-5">
                        <div class="text-xs text-[#9a9a9a] inline-flex items-center gap-2">
                          <span class="codicon codicon-organization" />
                          Profile
                        </div>
                        <div class="mt-1 text-sm font-semibold text-[#d4d4d4]">
                          {{ profile ? 'Active' : '—' }}
                        </div>
                        <div class="mt-2 text-xs text-[#8f8f8f] inline-flex items-center gap-2">
                          <span class="codicon codicon-history" />
                          <span>Updated <span class="text-[#cfcfcf]">{{ lastUpdate || '—' }}</span></span>
                        </div>
                      </div>
                    </div>

                    <div :class="divider" />
                    <div class="text-sm text-[#9a9a9a] inline-flex items-start gap-2">
                      <span class="codicon codicon-info" />
                      <span>
                        If you need to change your email/password, do it from your auth provider flow (depending on how you configured Supabase Auth).
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              <!-- BILLING TAB -->
              <section v-show="activeTab === 'billing'" class="space-y-5">
                <header>
                  <div class="flex items-center gap-2" :class="sectionTitle">
                    <span class="codicon codicon-credit-card" />
                    Billing
                  </div>
                  <div class="mt-1" :class="sectionHint">
                    Plan and billing status.
                  </div>
                </header>

                <div class="rounded-[12px] border border-[#2b2b2b] bg-[#151515]">
                  <div class="px-5 py-4 border-b border-[#2b2b2b] flex items-center justify-between">
                    <div class="text-sm font-semibold text-[#d4d4d4] inline-flex items-center gap-2">
                      <span class="codicon codicon-symbol-keyword" />
                      Subscription
                    </div>
                    <div class="text-xs text-[#9a9a9a] inline-flex items-center gap-2">
                      <span class="codicon codicon-tag" />
                      Manage
                    </div>
                  </div>

                  <div class="p-5 space-y-4">
                    <div class="grid gap-4 md:grid-cols-2">
                      <div :class="cardInner" class="p-5">
                        <div class="text-xs text-[#9a9a9a] inline-flex items-center gap-2">
                          <span class="codicon codicon-symbol-keyword" />
                          Plan
                        </div>
                        <div class="mt-1 text-lg font-semibold text-[#d4d4d4]">{{ plan }}</div>
                      </div>

                      <div :class="cardInner" class="p-5">
                        <div class="text-xs text-[#9a9a9a] inline-flex items-center gap-2">
                          <span class="codicon codicon-verified" />
                          Billing
                        </div>
                        <div
                          class="mt-1 text-lg font-semibold inline-flex items-center gap-2"
                          :class="billingStatus === 'active' ? 'text-[#22c55e]' : 'text-[#d4d4d4]'"
                        >
                          <span
                            class="h-2 w-2 rounded-full"
                            :class="billingStatus === 'active' ? 'bg-[#22c55e]' : 'bg-[#9aa4b2]'"
                          />
                          {{ billingStatus }}
                        </div>
                      </div>
                    </div>

                    <div :class="divider" />

                    <div class="flex flex-wrap gap-3 pt-1">
                      <NuxtLink
                        to="/#pricing"
                        class="inline-flex items-center justify-center gap-2 rounded-[10px] bg-[#007acc] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#1fa3ff]"
                      >
                        <span class="codicon codicon-tag" />
                        Pricing
                      </NuxtLink>

                      <NuxtLink
                        to="/#download"
                        class="inline-flex items-center justify-center gap-2 rounded-[10px] border border-[#2b2b2b] bg-[#1f1f1f] px-4 py-2.5 text-sm font-bold text-[#d4d4d4] transition-colors hover:bg-[#232323] hover:border-[#3399ff]"
                      >
                        <span class="codicon codicon-desktop-download" />
                        Download
                      </NuxtLink>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
