<template>
  <div class="wrap">
    <div class="card">
      <h1>Payment canceled</h1>
      <p class="muted">
        No worries — you can try again anytime.
      </p>

      <div class="actions">
        <NuxtLink class="btn primary" to="/dashboard/account">Back to billing</NuxtLink>
        <NuxtLink class="btn" to="/dashboard">Dashboard</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
})
</script>

<style scoped>
.wrap {
  min-height: 70vh;
  display: grid;
  place-items: center;
  padding: 24px;
}
.card {
  width: 100%;
  max-width: 720px;
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 14px;
  padding: 20px;
  background: rgba(0,0,0,0.25);
}
h1 { font-size: 22px; margin: 0 0 12px 0; }
.muted { opacity: 0.75; }
.actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 14px;
}
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  padding: 0 14px;
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.18);
  background: transparent;
  color: inherit;
  text-decoration: none;
}
.btn.primary {
  background: #007acc;
  border-color: #007acc;
  color: white;
}
</style>
