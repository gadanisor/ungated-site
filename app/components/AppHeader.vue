<script setup lang="ts">
const route = useRoute()
const { supabase } = useSupabaseAuth()

const isAuthenticated = ref(false)
const user = ref<any>(null)

const items = computed(() => [{
  label: 'Docs',
  to: '/docs',
  active: route.path.startsWith('/docs')
}, {
  label: 'Pricing',
  to: '/pricing'
}, {
  label: 'Blog',
  to: '/blog'
}, {
  label: 'Changelog',
  to: '/changelog'
}])

onMounted(async () => {
  // check if there's a current session
  const { data: { session } } = await supabase.auth.getSession()
  if (session?.user) {
    isAuthenticated.value = true
    user.value = session.user
  }

  // listen for auth changes
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN' && session?.user) {
      isAuthenticated.value = true
      user.value = session.user
    } else if (event === 'SIGNED_OUT') {
      isAuthenticated.value = false
      user.value = null
    }
  })
})
</script>

<template>
  <UHeader>
    <template #left>
      <NuxtLink to="/">
        <AppLogo class="w-auto h-6 shrink-0" />
      </NuxtLink>
      <TemplateMenu />
    </template>

    <UNavigationMenu
      :items="items"
      variant="link"
    />

    <template #right>
      <UColorModeButton />

      <!-- Mobile login icon button (hidden when authenticated) -->
      <UButton
        v-if="!isAuthenticated"
        icon="i-lucide-log-in"
        color="neutral"
        variant="ghost"
        to="/login"
        class="lg:hidden"
      />

      <!-- Mobile account button (visible when authenticated) -->
      <UButton
        v-if="isAuthenticated"
        icon="i-lucide-user"
        color="neutral"
        variant="ghost"
        to="/dashboard"
        class="lg:hidden"
      />

      <!-- Desktop sign in / sign up buttons (hidden when authenticated) -->
      <template v-if="!isAuthenticated">
        <UButton
          label="Sign in"
          color="neutral"
          variant="outline"
          to="/login"
          class="hidden lg:inline-flex"
        />

        <UButton
          label="Sign up"
          color="neutral"
          trailing-icon="i-lucide-arrow-right"
          class="hidden lg:inline-flex"
          to="/signup"
        />
      </template>

      <!-- Desktop account button (visible when authenticated) -->
      <UButton
        v-if="isAuthenticated"
        icon="i-lucide-user"
        label="Account"
        color="primary"
        class="hidden lg:inline-flex"
        to="/dashboard"
      />
    </template>

    <template #body>
      <UNavigationMenu
        :items="items"
        orientation="vertical"
        class="-mx-2.5"
      />

      <USeparator class="my-6" />

      <!-- Mobile menu auth buttons -->
      <template v-if="!isAuthenticated">
        <UButton
          label="Sign in"
          color="neutral"
          variant="subtle"
          to="/login"
          block
          class="mb-3"
        />
        <UButton
          label="Sign up"
          color="neutral"
          to="/signup"
          block
        />
      </template>

      <UButton
        v-if="isAuthenticated"
        label="Account"
        color="primary"
        to="/dashboard"
        block
      />
    </template>
  </UHeader>
</template>
