<template>
  <section
    id="top"
    class="relative flex flex-col items-center justify-center min-h-screen px-5 py-16 md:py-20 overflow-hidden"
  >
    <!-- BACKGROUND -->
    <div aria-hidden="true" class="bg-anim"></div>
    <div aria-hidden="true" class="bg-grid"></div>
    <div aria-hidden="true" class="bg-vignette"></div>

    <!-- Titlu + subtitlu + CTA -->
    <div class="text-center max-w-4xl relative z-10">

      <h1 class="m-0 mb-10 text-balance text-[clamp(38px,5.5vw,64px)] leading-[1.05] tracking-[-.02em] font-extrabold">
        The toolbox worthy of your imagination.
      </h1>

      <div class="flex flex-wrap justify-center gap-4">
        <a href="#download" class="inline-flex select-none items-center justify-center rounded-[6px] bg-[#007acc] px-6 py-4 font-bold text-white shadow-sm transition-colors hover:bg-[#1fa3ff] focus:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(51,153,255,.35)]">Download Ungated</a>
        <a href="#features" aria-label="See Ungated features" class="inline-flex select-none items-center justify-center rounded-[6px] border border-[#2b2b2b] px-6 py-4 font-bold text-inherit transition-colors hover:border-[#3399ff] focus:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(51,153,255,.35)]">See features</a>
      </div>
    </div>

    <!-- Imagine (sub titlu) -->
    <div class="relative mt-12 w-full max-w-[1200px] z-10">
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
/* --- Animated, professional background --- */
.bg-anim {
  position: absolute;
  inset: 0;
  z-index: 0;
  /* +1 nor albastru în stânga-jos */
  background:
    radial-gradient(48vmax 32vmax at -8% 105%, rgba(51,153,255,0.12), transparent 60%),
    radial-gradient(60vmax 40vmax at 12% -10%, rgba(51,153,255,0.14), transparent 60%),
    radial-gradient(50vmax 30vmax at 90% 110%, rgba(124,77,255,0.12), transparent 60%),
    radial-gradient(40vmax 30vmax at 60% 40%, rgba(0,212,255,0.10), transparent 60%);
  background-repeat: no-repeat;
  animation: bg-pan 36s ease-in-out infinite;
  will-change: background-position;
}
@keyframes bg-pan {
  /* 4 straturi -> 4 poziții în fiecare etapă */
  0%   { background-position: 0% 0%,   0% 0%,    0% 0%,    0% 0%; }
  33%  { background-position: -4% 3%,  6% 3%,   -4% -3%,  3% -6%; }
  66%  { background-position: 5% -2%, -3% 5%,   5% 4%,   -5% 3%; }
  100% { background-position: 0% 0%,   0% 0%,    0% 0%,    0% 0%; }
}

/* grid fin peste, foarte discret */
.bg-grid {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: 0.3;
  background-image:
    linear-gradient(to right, rgba(255,255,255,0.10) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255,255,255,0.10) 1px, transparent 1px);
  background-size: 40px 40px;
}

/* vignette ușor întunecată spre margini */
.bg-vignette {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background: radial-gradient(120% 80% at 50% 35%, transparent 0%, rgba(0,0,0,0.28) 100%);
}

/* Respectă preferința de “reduced motion” */
@media (prefers-reduced-motion: reduce) {
  .bg-anim { animation: none; }
}
</style>
