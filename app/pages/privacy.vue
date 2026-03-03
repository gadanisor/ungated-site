<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData(route.path, () =>
  queryCollection('privacy').path(route.path).first()
)

watchEffect(() => {
  if (!page.value) return

  useSeoMeta({
    title: page.value.title,
    description: page.value.description,
    ogTitle: page.value.title,
    ogDescription: page.value.description
  })
})
</script>

<template>
  <UContainer>
    <template v-if="page">
      <UPageHeader v-bind="page" class="py-[50px]" />

      <UPageBody prose>
        <ContentRenderer :value="page" />
      </UPageBody>
    </template>

    <template v-else>
      <!-- fallback safe; poți pune și UAlert / skeleton -->
      <UPageHeader
        title="Privacy Policy"
        description="Page not found."
        class="py-[50px]"
      />
    </template>
  </UContainer>
</template>