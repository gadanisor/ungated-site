<script setup lang="ts">
definePageMeta({ middleware: 'guest' })

const route = useRoute()

const emailFromQuery = computed(() => {
  const e = route.query.email
  return typeof e === 'string' ? e : ''
})
</script>

<template>
  <div class="min-h-[calc(100vh-120px)] px-5 py-10">
    <div class="mx-auto w-full max-w-[980px]">
      <div class="grid gap-10 lg:grid-cols-2 lg:items-center">
        <!-- Left: info -->
        <section class="space-y-4">
          <div
            class="inline-flex items-center gap-2 rounded-full border border-[#2b2b2b] bg-[#181818] px-3 py-1 text-xs text-[#9aa4b2]"
          >
            <span class="h-2 w-2 rounded-full bg-[#007acc]" />
            Confirm your email
          </div>

          <h1 class="text-3xl font-semibold tracking-tight text-[#d4d4d4]">
            Check your inbox.
          </h1>

          <p class="max-w-[46ch] text-[#a6a6a6]">
            We just sent you a confirmation link. Click it to activate your account and finish sign-in.
          </p>

          <div class="mt-6 grid gap-3 text-sm text-[#a6a6a6]">
            <div class="flex items-start gap-3">
              <span class="mt-[3px] h-2 w-2 rounded-full bg-[#3399ff]" />
              <p>
                If you don’t see it, check <b class="text-[#d4d4d4]">Spam</b> / <b class="text-[#d4d4d4]">Promotions</b>.
              </p>
            </div>
            <div class="flex items-start gap-3">
              <span class="mt-[3px] h-2 w-2 rounded-full bg-[#3399ff]" />
              <p>
                The link will bring you back to <b class="text-[#d4d4d4]">/confirm</b> and then to your dashboard.
              </p>
            </div>
          </div>

          <p class="text-sm text-[#9a9a9a]">
            Already confirmed?
            <NuxtLink to="/login" class="font-semibold text-[#3399ff] hover:underline">
              Sign in
            </NuxtLink>
          </p>
        </section>

        <!-- Right: card -->
        <section class="rounded-[10px] border border-[#2b2b2b] bg-[#181818] shadow-lg">
          <div class="border-b border-[#2b2b2b] px-6 py-4">
            <h2 class="text-lg font-semibold">Email sent</h2>
            <p class="mt-1 text-sm text-[#9a9a9a]">
              {{ emailFromQuery ? `We sent it to ${emailFromQuery}.` : 'Open your email inbox to continue.' }}
            </p>
          </div>

          <div class="space-y-4 px-6 py-6">
            <div class="rounded-[8px] border border-[#2b2b2b] bg-[#1f1f1f] px-4 py-3">
              <p class="text-sm text-[#cfcfcf] font-semibold">Next steps</p>
              <ol class="mt-2 list-decimal pl-5 text-sm text-[#a6a6a6] space-y-1.5">
                <li>Open the email from Ungated.</li>
                <li>Click <span class="text-[#d4d4d4] font-semibold">Confirm email</span>.</li>
                <li>You’ll be redirected to your dashboard.</li>
              </ol>
            </div>

            <div class="flex flex-col gap-2">
              <NuxtLink
                to="/signup"
                class="inline-flex w-full items-center justify-center rounded-[6px] border border-[#2b2b2b] bg-[#1f1f1f] px-4 py-2.5 text-sm font-bold text-[#d4d4d4] transition-colors hover:bg-[#232323] hover:border-[#3399ff]"
              >
                Use a different email
              </NuxtLink>

              <NuxtLink
                to="/"
                class="inline-flex w-full items-center justify-center rounded-[6px] border border-transparent px-4 py-2.5 text-sm font-bold text-[#9a9a9a] transition-colors hover:text-[#d4d4d4]"
              >
                Back to website
              </NuxtLink>
            </div>

            <p class="text-xs leading-relaxed text-[#8f8f8f]">
              Didn’t get anything after a few minutes? Try signing up again or double-check the email address.
            </p>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
