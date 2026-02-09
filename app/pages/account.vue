<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

const client = useSupabaseClient()
const user = useSupabaseUser()

async function signOut() {
  await client.auth.signOut()
  await navigateTo('/')
}
</script>

<template>
  <div style="max-width: 720px; margin: 48px auto;">
    <h1>Account</h1>

    <div v-if="user">
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>User ID:</strong> {{ user.id }}</p>
      <p><strong>Provider:</strong> {{ user.app_metadata?.provider }}</p>
    </div>

    <button @click="signOut" style="margin-top: 16px;">
      Sign out
    </button>
  </div>
</template>
