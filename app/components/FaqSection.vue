<template>
    <section id="faq" aria-label="Frequently asked questions" class="py-15 md:py-16 bg-[#181818]">
      <div class="mx-auto max-w-[1200px] px-5">
        <h2 class="text-[clamp(26px,3.8vw,40px)] leading-[1.15]">FAQ</h2>
        <details class="rounded-[4px] border border-[#2b2b2b] bg-[#1e1e1e] p-4">
          <summary class="cursor-pointer font-bold">Is Ungated based on VS Code?</summary>
          <p class="mt-2 text-[#d4d4d4]">Ungated is built from scratch with Electron and a customized Monaco editor to focus on prose — not code. The design feels familiar but uses its own name, logo and assets.</p>
        </details>
        <details class="mt-3 rounded-[4px] border border-[#2b2b2b] bg-[#1e1e1e] p-4">
          <summary class="cursor-pointer font-bold">Will my work stay private?</summary>
          <p class="mt-2 text-[#d4d4d4]">Yes. Files live locally by default. You control sync and backups.</p>
        </details>
        <details class="mt-3 rounded-[4px] border border-[#2b2b2b] bg-[#1e1e1e] p-4">
          <summary class="cursor-pointer font-bold">Can I import existing material?</summary>
          <p class="mt-2 text-[#d4d4d4]">Yes. TXT/Markdown work great; DOCX import is planned for GA.</p>
        </details>
        <details class="mt-3 rounded-[4px] border border-[#2b2b2b] bg-[#1e1e1e] p-4">
          <summary class="cursor-pointer font-bold">What platforms are supported?</summary>
          <p class="mt-2 text-[#d4d4d4]">macOS (Apple Silicon & Intel), Windows, and major Linux distros.</p>
        </details>
      </div>
    </section>
</template>