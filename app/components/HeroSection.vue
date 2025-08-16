<template>
  <section
    id="top"
    class="relative flex flex-col items-center min-h-screen px-5 py-16 md:py-20 overflow-hidden"
  >

    <!-- Titlu + subtitlu + CTA -->
    <div class="text-center max-w-4xl relative z-10">

      <h1 class="m-0 mb-10 text-balance text-[clamp(38px,5.5vw,64px)] leading-[1.05] tracking-[-.02em] font-extrabold">
        The toolbox worthy of your imagination.
      </h1>

      <div class="flex flex-wrap justify-center gap-4">
        <a href="#download" class="inline-flex select-none items-center justify-center rounded-[6px] bg-[#007acc] px-6 py-4 font-bold text-white shadow-sm transition-colors hover:bg-[#1fa3ff] focus:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(51,153,255,.35)]">Download for Windows</a>
      </div>
    </div>

    <!-- Imagine (sub titlu) -->
    <div class="relative mt-12 w-full max-w-[1300px] z-10">
      <img
        src="/images/hero.PNG"
        alt="Ungated editor preview"
        class="w-full h-auto object-contain"
        loading="lazy"
        decoding="async"
      />
    </div>
  </section>
</template>

<style scoped>

</style>
