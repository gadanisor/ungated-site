<script setup lang="ts">

const client = useSupabaseClient()
const user = useSupabaseUser()

const status = ref<'loading' | 'success' | 'error'>('loading')
const message = ref('Confirming your email…')
const errorMsg = ref<string | null>(null)

async function finalize() {
  status.value = 'loading'
  message.value = 'Confirming your email…'
  errorMsg.value = null

  try {
    // Forțează Supabase să proceseze token-urile din URL
    const { data, error } = await client.auth.getSession()

    if (error) {
      status.value = 'error'
      message.value = 'Could not confirm your email.'
      errorMsg.value = error.message
      return
    }

    if (data.session || user.value) {
      status.value = 'success'
      message.value = 'Your email has been confirmed.'
      return
    }

    status.value = 'error'
    message.value = 'No active session found.'
    errorMsg.value = 'The confirmation link may be invalid or expired.'
  } catch (e: any) {
    status.value = 'error'
    message.value = 'Could not confirm your email.'
    errorMsg.value = e?.message || 'Unknown error'
  }
}

onMounted(() => {
  finalize()
})

const dotClass = computed(() => {
  if (status.value === 'success') return 'bg-[#22c55e]'
  if (status.value === 'error') return 'bg-[#ef4444]'
  return 'bg-[#007acc]'
})
</script>

<template>
  <div class="min-h-[calc(100vh-120px)] px-5 py-10">
    <div class="mx-auto w-full max-w-[980px]">
      <div class="grid gap-10 lg:grid-cols-2 lg:items-center">
        <!-- Left -->
        <section class="space-y-4">
          <div
            class="inline-flex items-center gap-2 rounded-full border border-[#2b2b2b] bg-[#181818] px-3 py-1 text-xs text-[#9aa4b2]"
          >
            <span class="h-2 w-2 rounded-full" :class="dotClass" />
            Email verification
          </div>

          <h1 class="text-3xl font-semibold tracking-tight text-[#d4d4d4]">
            {{
              status === 'success'
                ? 'Email confirmed.'
                : status === 'error'
                ? 'Something went wrong.'
                : 'Confirming…'
            }}
          </h1>

          <p class="max-w-[52ch] text-[#a6a6a6]">
            {{ message }}
          </p>

          <div v-if="status === 'error'" class="text-sm text-[#9a9a9a] space-y-2">
            <ul class="list-disc pl-5 space-y-1">
              <li>The link may have expired.</li>
              <li>The link may already have been used.</li>
              <li>You may be signed in already.</li>
            </ul>
          </div>
        </section>

        <!-- Right -->
        <section class="rounded-[10px] border border-[#2b2b2b] bg-[#181818] shadow-lg">
          <div class="border-b border-[#2b2b2b] px-6 py-4">
            <h2 class="text-lg font-semibold">Confirmation</h2>
            <p class="mt-1 text-sm text-[#9a9a9a]">
              {{
                status === 'loading'
                  ? 'Processing the link…'
                  : status === 'success'
                  ? 'You can continue.'
                  : 'Action required.'
              }}
            </p>
          </div>

          <div class="space-y-4 px-6 py-6">
            <div
              v-if="status === 'error' && errorMsg"
              class="rounded-[6px] border border-[rgba(255,80,80,.35)] bg-[rgba(255,80,80,.08)] px-3 py-2 text-sm text-[#ffb4b4]"
            >
              {{ errorMsg }}
            </div>

            <NuxtLink
              v-if="status === 'success'"
              to="/dashboard"
              class="inline-flex w-full items-center justify-center rounded-[6px] bg-[#007acc] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#1fa3ff]"
            >
              Go to dashboard
            </NuxtLink>

            <button
              v-else
              type="button"
              @click="finalize"
              :disabled="status === 'loading'"
              class="inline-flex w-full items-center justify-center rounded-[6px] bg-[#007acc] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#1fa3ff] disabled:opacity-60"
            >
              {{ status === 'loading' ? 'Confirming…' : 'Try again' }}
            </button>

            <div class="flex items-center justify-between text-sm text-[#9a9a9a]">
              <NuxtLink to="/login" class="font-semibold text-[#3399ff] hover:underline">
                Sign in
              </NuxtLink>
              <NuxtLink to="/" class="font-semibold text-[#3399ff] hover:underline">
                Back to website
              </NuxtLink>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
