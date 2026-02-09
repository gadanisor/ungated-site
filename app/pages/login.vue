<script setup lang="ts">
definePageMeta({ middleware: 'guest' })

const client = useSupabaseClient()

const email = ref('')
const password = ref('')
const errorMsg = ref<string | null>(null)
const loading = ref(false)
const route = useRoute()
const redirectTo = computed(() => {
  const r = route.query.redirect
  return (typeof r === 'string' && r.startsWith('/')) ? r : '/dashboard'
})
async function signIn() {
  errorMsg.value = null
  loading.value = true
  try {
    const { error } = await client.auth.signInWithPassword({
      email: email.value,
      password: password.value
    })
    if (error) errorMsg.value = error.message
    else navigateTo(redirectTo.value)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-[calc(100vh-120px)] px-5 py-10">
    <div class="mx-auto w-full max-w-[980px]">
      <div class="grid gap-10 lg:grid-cols-2 lg:items-center">
        <!-- Left: marketing -->
        <section class="space-y-4">
          <div class="inline-flex items-center gap-2 rounded-full border border-[#2b2b2b] bg-[#181818] px-3 py-1 text-xs text-[#9aa4b2]">
            <span class="h-2 w-2 rounded-full bg-[#007acc]" />
            Ungated Cloud
          </div>

          <h1 class="text-3xl font-semibold tracking-tight text-[#d4d4d4]">
            Welcome back.
          </h1>
          <p class="max-w-[44ch] text-[#a6a6a6]">
            Sign in to sync projects, manage your plan, and access your writing workspace across devices.
          </p>

          <div class="mt-6 grid gap-3 text-sm text-[#a6a6a6]">
            <div class="flex items-start gap-3">
              <span class="mt-[3px] h-2 w-2 rounded-full bg-[#3399ff]" />
              <p><b class="text-[#d4d4d4]">Projects</b> with characters, timelines, and worlds.</p>
            </div>
            <div class="flex items-start gap-3">
              <span class="mt-[3px] h-2 w-2 rounded-full bg-[#3399ff]" />
              <p><b class="text-[#d4d4d4]">Sync</b> and subscription management in one place.</p>
            </div>
          </div>
        </section>

        <!-- Right: form -->
        <section class="rounded-[10px] border border-[#2b2b2b] bg-[#181818] shadow-lg">
          <div class="border-b border-[#2b2b2b] px-6 py-4">
            <h2 class="text-lg font-semibold">Sign in</h2>
            <p class="mt-1 text-sm text-[#9a9a9a]">Use the email you signed up with.</p>
          </div>

          <form class="space-y-4 px-6 py-6" @submit.prevent="signIn">
            <div class="space-y-1.5">
              <label class="text-sm font-semibold text-[#cfcfcf]">Email</label>
              <input
                v-model="email"
                type="email"
                autocomplete="email"
                placeholder="you@domain.com"
                required
                class="w-full rounded-[6px] border border-[#2b2b2b] bg-[#1f1f1f] px-3 py-2.5 text-sm text-[#d4d4d4] outline-none focus:border-[#3399ff] focus:ring-4 focus:ring-[rgba(51,153,255,.20)]"
              />
            </div>

            <div class="space-y-1.5">
              <label class="text-sm font-semibold text-[#cfcfcf]">Password</label>
              <input
                v-model="password"
                type="password"
                autocomplete="current-password"
                placeholder="••••••••"
                required
                class="w-full rounded-[6px] border border-[#2b2b2b] bg-[#1f1f1f] px-3 py-2.5 text-sm text-[#d4d4d4] outline-none focus:border-[#3399ff] focus:ring-4 focus:ring-[rgba(51,153,255,.20)]"
              />
            </div>

            <div
              v-if="errorMsg"
              class="rounded-[6px] border border-[rgba(255,80,80,.35)] bg-[rgba(255,80,80,.08)] px-3 py-2 text-sm text-[#ffb4b4]"
            >
              {{ errorMsg }}
            </div>

            <button
              type="submit"
              :disabled="loading"
              class="inline-flex w-full items-center justify-center rounded-[6px] bg-[#007acc] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#1fa3ff] disabled:opacity-60"
            >
              {{ loading ? 'Signing in…' : 'Sign in' }}
            </button>

            <p class="text-sm text-[#9a9a9a]">
              Don’t have an account?
              <NuxtLink to="/signup" class="font-semibold text-[#3399ff] hover:underline">Create one</NuxtLink>
            </p>
          </form>
        </section>
      </div>
    </div>
  </div>
</template>
