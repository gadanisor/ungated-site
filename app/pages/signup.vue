<script setup lang="ts">
definePageMeta({ middleware: 'guest' })

const client = useSupabaseClient()
const email = ref('')
const password = ref('')
const errorMsg = ref<string | null>(null)
const loading = ref(false)

async function signUp() {
  errorMsg.value = null
  loading.value = true
  try {
    const { error } = await client.auth.signUp({
      email: email.value,
      password: password.value,
      options: { emailRedirectTo: `${window.location.origin}/confirm` }
    })
    if (error) errorMsg.value = error.message
    else navigateTo({ path: '/check-email', query: { email: email.value } })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-[calc(100vh-120px)] px-5 py-10">
    <div class="mx-auto w-full max-w-[980px]">
      <div class="grid gap-10 lg:grid-cols-2 lg:items-center">
        <section class="space-y-4">
          <div class="inline-flex items-center gap-2 rounded-full border border-[#2b2b2b] bg-[#181818] px-3 py-1 text-xs text-[#9aa4b2]">
            <span class="h-2 w-2 rounded-full bg-[#007acc]" />
            Start writing, stay organized
          </div>

          <h1 class="text-3xl font-semibold tracking-tight text-[#d4d4d4]">
            Create your account.
          </h1>
          <p class="max-w-[44ch] text-[#a6a6a6]">
            Get access to your dashboard, subscriptions, and future cloud sync for your worlds and drafts.
          </p>

          <p class="text-sm text-[#9a9a9a]">
            Already have an account?
            <NuxtLink to="/login" class="font-semibold text-[#3399ff] hover:underline">Sign in</NuxtLink>
          </p>
        </section>

        <section class="rounded-[10px] border border-[#2b2b2b] bg-[#181818] shadow-lg">
          <div class="border-b border-[#2b2b2b] px-6 py-4">
            <h2 class="text-lg font-semibold">Sign up</h2>
            <p class="mt-1 text-sm text-[#9a9a9a]">We’ll send a confirmation link to your email.</p>
          </div>

          <form class="space-y-4 px-6 py-6" @submit.prevent="signUp">
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
                autocomplete="new-password"
                minlength="8"
                placeholder="At least 8 characters"
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
              {{ loading ? 'Creating…' : 'Create account' }}
            </button>

            <p class="text-xs leading-relaxed text-[#8f8f8f]">
              By creating an account, you agree to the Terms and Privacy Policy.
            </p>
          </form>
        </section>
      </div>
    </div>
  </div>
</template>
