<template>
  <div class="flex min-h-screen flex-col bg-[#1e1e1e] text-[#d4d4d4]">
    <!-- HEADER -->
    <header
      :class="[
        'sticky top-0 z-50 border-b',
        isLight
          ? 'bg-white text-[#1e1e1e] border-[#e2e8f0]'
          : 'bg-[#1e1e1e] text-[#d4d4d4] border-[#2b2b2b]'
      ]"
    >
      <div class="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-4 px-5 py-3">
        <a class="flex items-center gap-2 no-underline text-inherit" href="#top" aria-label="Ungated home">
          <img src="/images/logo.svg" alt="Ungated logo" class="h-[30px] w-[30px]" />
          <b class="text-[18px]">Ungated</b>
        </a>

        <!-- Desktop nav -->
        <nav
          class="hidden md:flex items-center gap-[18px] font-semibold"
          aria-label="Primary"
        >
          <a class="opacity-[.85] hover:opacity-100" href="#features">Features</a>
          <a class="opacity-[.85] hover:opacity-100" href="#showcase">Screenshots</a>
          <a class="opacity-[.85] hover:opacity-100" href="#pricing">Pricing</a>
          <a class="opacity-[.85] hover:opacity-100" href="#faq">FAQ</a>
          <a
            href="#download"
            class="inline-flex items-center justify-center rounded-[4px] border border-transparent bg-[#007acc] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[#1fa3ff] focus:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(51,153,255,.35)]"
            >Download</a
          >
        </nav>

        <!-- Mobile toggle -->
        <button
          type="button"
          :aria-expanded="open ? 'true' : 'false'"
          aria-controls="mobileNav"
          @click="toggleMenu"
          class="inline-flex md:hidden items-center justify-center rounded-[4px] border px-3 py-2 text-sm font-semibold"
          :class="isLight ? 'border-[#e2e8f0] text-[#1e1e1e]' : 'border-[#2b2b2b] text-[#d4d4d4] hover:border-[#3399ff]'"
        >
          Menu
        </button>
      </div>

      <!-- Mobile nav -->
      <div id="mobileNav" v-show="open" :class="isLight ? 'border-t-[#e2e8f0] bg-white text-[#1e1e1e]' : 'border-t-[#2b2b2b] bg-[#1e1e1e] text-[#d4d4d4]'" class="md:hidden border-t">
        <div class="mx-auto w-full max-w-[1200px] px-5 pb-3">
          <div class="grid gap-3 pt-3">
            <a href="#features" class="opacity-[.95] hover:opacity-100">Features</a>
            <a href="#showcase" class="opacity-[.95] hover:opacity-100">Screenshots</a>
            <a href="#pricing" class="opacity-[.95] hover:opacity-100">Pricing</a>
            <a href="#faq" class="opacity-[.95] hover:opacity-100">FAQ</a>
            <a
              href="#download"
              class="inline-flex w-max items-center justify-center rounded-[4px] border border-transparent bg-[#007acc] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[#1fa3ff] focus:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(51,153,255,.35)]"
              >Download</a
            >
          </div>
        </div>
      </div>
    </header>

    <!-- PAGE CONTENT -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- FOOTER -->
    <footer
      :class="[
        'mt-10 border-t',
        isLight
          ? 'bg-white text-[#5f5f5f] border-[#e2e8f0]'
          : 'bg-[#1e1e1e] text-[#9a9a9a] border-[#2b2b2b]'
      ]"
    >
      <div class="mx-auto flex w-full max-w-[1200px] flex-wrap items-center justify-between gap-4 px-5 py-7">
        <small>© {{ year }} Ungated. All rights reserved.</small>
        <div class="flex items-center gap-4">
          <a href="#privacy" class="hover:opacity-100 opacity-[.9]">Privacy</a>
          <a href="#terms" class="hover:opacity-100 opacity-[.9]">Terms</a>
          <button
            type="button"
            @click="toggleTheme"
            class="rounded-[4px] border px-3 py-1.5 text-sm font-semibold focus:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(51,153,255,.35)]"
            :class="isLight ? 'border-[#e2e8f0] text-[#1e1e1e]' : 'border-[#2b2b2b] text-[#d4d4d4] hover:border-[#3399ff]'"
            aria-label="Toggle theme"
          >Toggle theme</button>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const open = ref(false)
const isLight = ref(false) // default dark, toggled to light

const toggleMenu = () => {
  open.value = !open.value
}

const toggleTheme = () => {
  isLight.value = !isLight.value
  localStorage.setItem('ungated-theme', isLight.value ? 'light' : 'dark')
}

const year = new Date().getFullYear()

onMounted(() => {
  const saved = localStorage.getItem('ungated-theme')
  if (saved) {
    isLight.value = saved === 'light'
  }
})
</script>
