<script setup lang="ts">
const { data: page } = await useAsyncData('pricing', () => queryCollection('pricing').first())

const title = page.value?.seo?.title || page.value?.title
const description = page.value?.seo?.description || page.value?.description

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})

defineOgImageComponent('Saas')

const isYearly = ref('0')

const items = ref([
  { label: 'Monthly', value: '0' },
  { label: 'Yearly', value: '1' }
])

// ✅ Toggle central pentru moment
const paymentsEnabled = ref(false)

const planButton = (plan: any) => {
  // dacă plățile sunt active, folosește butonul original
  if (paymentsEnabled.value) return plan.button

  // altfel: dezactivează și schimbă labelul
  return {
    ...plan.button,
    label: 'Coming soon',
    disabled: true,
    to: plan.button?.to || '#'
  }
}
</script>

<template>
  <div v-if="page">
       <!-- ✅ Early beta / payments disabled banner -->
    <UContainer class="mt-6">
      <UAlert
        icon="i-lucide-flask-conical"
        color="warning"
        variant="soft"
        class="items-center"
        :ui="{
          wrapper: 'items-center'
        }"
        :title="page.betaNotice?.title || 'Early beta: payments are disabled for now'"
        :description="page.betaNotice?.description || 'We\'re not processing payments yet. The app is in early beta and all plans/features are unlocked for free.'"
      />
    </UContainer>
    <UPageHero
      :title="page.title"
      :description="page.description"
    >
      <template #links>
        <UTabs
          v-model="isYearly"
          :items="items"
          color="neutral"
          size="xs"
          class="w-48"
          :ui="{
            list: 'ring ring-accented rounded-full',
            indicator: 'rounded-full',
            trigger: 'w-1/2'
          }"
        />
      </template>
    </UPageHero>

    <UContainer class="mt-6">
      <UPricingPlans scale>
        <UPricingPlan
          v-for="(plan, index) in page.plans"
          :key="index"
          v-bind="plan"
          :button="planButton(plan)"
          :price="isYearly === '1' ? plan.price.year : plan.price.month"
          :billing-cycle="isYearly === '1' ? '/year' : '/month'"
        />
      </UPricingPlans>
    </UContainer>

    <UPageSection
      :title="page.faq.title"
      :description="page.faq.description"
    >
      <UAccordion
        :items="page.faq.items"
        :unmount-on-hide="false"
        :default-value="['0']"
        type="multiple"
        class="max-w-3xl mx-auto"
        :ui="{
          trigger: 'text-base text-highlighted',
          body: 'text-base text-muted'
        }"
      />
    </UPageSection>
  </div>
</template>