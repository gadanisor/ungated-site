<template>
  <div class="wrap">
    <div class="card">
      <h1>Payment successful ✅</h1>

      <p class="muted" v-if="sessionId">
        Session: <code>{{ sessionId }}</code>
      </p>

      <div class="notice">
        <p><strong>Activating your plan…</strong></p>
        <p class="muted">
          This may take a few seconds while Stripe confirms the payment.
        </p>

        <div class="statusRow">
          <span>Status:</span>
          <span class="pill" :class="pillClass">
            {{ displayStatus }}
          </span>
        </div>

        <p v-if="error" class="error">{{ error }}</p>

        <div class="actions">
          <a class="btn primary" :href="openAppUrl">Open the app</a>
          <button class="btn" @click="manualRefresh" :disabled="loading">
            {{ loading ? 'Checking…' : 'Refresh' }}
          </button>
          <NuxtLink class="btn" to="/dashboard">Back to dashboard</NuxtLink>
        </div>

        <p class="muted small">
          If the app doesn’t open, make sure it’s installed. You can also close this tab and return to the app manually.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

definePageMeta({ layout: 'default' })

const route = useRoute()

const sessionId = computed(() => {
  const v = route.query.session_id
  return typeof v === 'string' ? v : ''
})

const loading = ref(false)
const error = ref('')

const plan = ref<'free' | 'pro'>('free')
const billing = ref<'inactive' | 'active' | 'canceled'>('inactive')

const isActivePro = computed(() => billing.value === 'active' && plan.value === 'pro')

const displayStatus = computed(() => {
  if (isActivePro.value) return 'Pro active'
  if (billing.value === 'canceled') return 'Canceled'
  return loading.value ? 'Checking…' : 'Pending'
})

const pillClass = computed(() => {
  if (isActivePro.value) return 'ok'
  if (billing.value === 'canceled') return 'bad'
  return 'pending'
})

const openAppUrl = computed(() => {
  const sid = sessionId.value ? `?session_id=${encodeURIComponent(sessionId.value)}` : ''
  return `ungated://billing/success${sid}`
})

async function fetchStatusOnce() {
  if (!sessionId.value) {
    error.value = 'Missing session_id in URL.'
    return
  }

  loading.value = true
  error.value = ''

  try {
    const res = await fetch(
      `${import.meta.env.NUXT_PUBLIC_SUPABASE_UR}/functions/v1/verify-checkout-session`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId.value }),
      }
    )

    const data = await res.json().catch(() => null)

    if (!res.ok) {
      error.value = data?.error || data?.message || `Verify failed (${res.status})`
      return
    }

    plan.value = data?.plan === 'pro' ? 'pro' : 'free'
    billing.value =
      data?.billing_status === 'active' || data?.billing_status === 'canceled'
        ? data.billing_status
        : 'inactive'
  } catch (e: any) {
    error.value = e?.message || String(e)
  } finally {
    loading.value = false
  }
}

async function pollUntilActive() {
  // max ~25s
  const start = Date.now()
  const timeoutMs = 25000
  const intervalMs = 1500

  while (Date.now() - start < timeoutMs) {
    await fetchStatusOnce()
    if (isActivePro.value) return true
    await new Promise((r) => setTimeout(r, intervalMs))
  }
  return isActivePro.value
}

async function manualRefresh() {
  await fetchStatusOnce()
  if (isActivePro.value) {
    // user clicked refresh and it's ready -> open app
    window.location.href = openAppUrl.value
  }
}

onMounted(async () => {
  // 1) get status
  const ok = await pollUntilActive()

  // 2) if active, deep link to app
  if (ok) {
    window.location.href = openAppUrl.value
  }
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
h1 {
  font-size: 22px;
  margin: 0 0 12px 0;
}
.muted { opacity: 0.75; }
.small { font-size: 12px; }
.notice {
  margin-top: 14px;
  padding: 14px;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.12);
}
.notice.warning {
  border-color: rgba(255, 180, 80, 0.35);
}
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
  cursor: pointer;
}
.btn.primary {
  background: #007acc;
  border-color: #007acc;
  color: white;
}
.btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}
.statusRow {
  margin-top: 12px;
  display: flex;
  gap: 10px;
  align-items: center;
}
.pill {
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  border: 1px solid rgba(255,255,255,0.18);
}
.pill.ok { border-color: rgba(80, 220, 140, 0.6); }
.pill.pending { border-color: rgba(255, 200, 80, 0.6); }
.pill.bad { border-color: rgba(255, 80, 80, 0.6); }
.error {
  margin-top: 10px;
  color: #ff6b6b;
}
code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-size: 12px;
}
</style>
