<template>
  <section id="top" class="py-16 md:py-20">
    <div class="mx-auto grid max-w-[1200px] grid-cols-1 gap-9 px-5 md:grid-cols-[1.1fr_.9fr] md:items-center">
      <!-- TEXT (deasupra imaginii în overlap) -->
      <div class="relative z-10">
        <div class="mb-3 flex flex-wrap items-center gap-2">
          <span class="inline-flex items-center gap-2 rounded-[4px] border border-[#2b2b2b] bg-[#2b2b2b] px-2.5 py-1 text-[12px] font-semibold uppercase tracking-[.04em]">New</span>
          <span class="inline-flex items-center gap-2 rounded-[4px] border border-dashed border-[#2b2b2b] px-2.5 py-1 text-[12px]">Desktop • Electron • Offline-first</span>
        </div>

        <h1 class="m-0 text-balance text-[clamp(34px,5vw,60px)] leading-[1.05] tracking-[-.02em]">
          The toolbox worthy of your imagination.
        </h1>

        <p class="mt-4 mb-5 text-[clamp(16px,2vw,20px)] text-[#9a9a9a] text-justify">
          Ungated is a calm, powerful workspace for writers and world-builders. Draft in a blazing-fast editor, weave characters and places, plot arcs on timelines, and keep your universe coherent — without leaving your flow.
        </p>

        <div class="flex flex-wrap gap-3">
          <a href="#download" class="inline-flex select-none items-center justify-center rounded-[4px] bg-[#007acc] px-4 py-3 font-bold text-white shadow-sm transition-colors hover:bg-[#1fa3ff] focus:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(51,153,255,.35)]">Download Ungated</a>
          <a href="#features" aria-label="See Ungated features" class="inline-flex select-none items-center justify-center rounded-[4px] border border-[#2b2b2b] px-4 py-3 font-bold text-inherit transition-colors hover:border-[#3399ff] focus:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(51,153,255,.35)]">See features</a>
        </div>

        <div class="mt-3 flex flex-wrap gap-2">
          <span class="inline-flex items-center gap-2 rounded-[4px] border border-dashed border-[#2b2b2b] px-2.5 py-1 text-[12px]">No ads</span>
          <span class="inline-flex items-center gap-2 rounded-[4px] border border-dashed border-[#2b2b2b] px-2.5 py-1 text-[12px]">Local files</span>
          <span class="inline-flex items-center gap-2 rounded-[4px] border border-dashed border-[#2b2b2b] px-2.5 py-1 text-[12px]">Themeable</span>
        </div>
      </div>

      <!-- IMAGINE: înălțime = înălțimea rândului, lățime completă vizibilă (fără crop), poate ieși sub text -->
      <div
        class="relative aspect-[16/10] overflow-visible rounded-[4px] border border-[#2b2b2b] bg-[#1e1e1e] shadow-[0_4px_12px_rgba(0,0,0,.3)]
               md:aspect-auto md:self-stretch md:h-full md:border-0 md:rounded-none md:bg-transparent md:shadow-none"
      >
        <img
          src="/images/hero.PNG"
          alt="Ungated editor preview"
          class="h-full w-full object-cover
                 md:absolute md:top-0 md:right-0 md:h-full md:w-auto md:max-w-none md:object-contain"
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  </section>
</template>
