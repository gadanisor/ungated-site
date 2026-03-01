<script setup lang="ts">
defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: 'Section image'
  },
  rounded: {
    type: String,
    default: 'sm'
  }
})
</script>

<template>
  <UPageCard
    variant="naked"
  >
    <div
      :class="`rounded-${rounded} overflow-hidden border border-solid border-[#1E1E1E]`"
    >
      <NuxtImg
        :src="src"
        :alt="alt"
        class="w-full object-fit-cover"
        loading="lazy"
        format="webp"
      />
    </div>
  </UPageCard>
</template>
