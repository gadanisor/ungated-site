<template>
    <section id="showcase" class="py-15 md:py-16">
      <div class="mx-auto grid max-w-[1200px] grid-cols-1 items-start gap-7 px-5 lg:grid-cols-[2fr_1fr]">
        <div>
          <h2 class="text-[clamp(26px,3.8vw,40px)] leading-[1.15]">Screenshots</h2>
          <p class="mb-3 text-[#9a9a9a]">A familiar three-pane layout with a dedicated writer’s center. Replace these placeholders with your real shots before launch.</p>
          <div class="mb-3 aspect-[16/9] overflow-hidden rounded-[4px] border border-[#2b2b2b] bg-[#1e1e1e]">
            <img src="/images/Capture.PNG" alt="Main editor screenshot" class="h-full w-full object-cover" />
          </div>
          <div class="aspect-[16/9] overflow-hidden rounded-[4px] border border-[#2b2b2b] bg-[#1e1e1e]">
            <img src="/images/Capture2.PNG" alt="World bible screenshot" class="h-full w-full object-cover" />
          </div>
        </div>
        <aside class="grid content-start gap-[14px]">
          <div class="rounded-[4px] border border-[#2b2b2b] bg-[#1e1e1e] p-[22px]">
            <div class="inline-flex items-center gap-2 rounded-[4px] border border-[#2b2b2b] bg-[#2b2b2b] px-2.5 py-1 text-[12px] font-semibold uppercase tracking-[.04em]">Why Ungated?</div>
            <h3 class="mt-2.5 mb-1.5 text-lg font-semibold">Stay in flow</h3>
            <p class="text-[#9a9a9a]">Everything you need is one keystroke away. Customizable keymap and command palette. No clutter, no tabsplosion.</p>
            <div class="mt-2 inline-flex items-center gap-2 rounded-[4px] border border-dashed border-[#2b2b2b] px-2.5 py-1 text-[12px]"><span class="rounded-[4px] border border-[#2b2b2b] bg-[#2b2b2b] px-1.5 py-0.5 font-semibold">⌘</span><span class="rounded-[4px] border border-[#2b2b2b] bg-[#2b2b2b] px-1.5 py-0.5 font-semibold">K</span> Command Palette</div>
          </div>
          <div class="rounded-[4px] border border-[#2b2b2b] bg-[#1e1e1e] p-[22px]">
            <h3 class="m-0 text-lg font-semibold">Your words are yours</h3>
            <p class="text-[#9a9a9a]">Files live on your disk. Works offline. You choose if/when to sync or back up.</p>
            <ul class="list-disc pl-5 text-[#d4d4d4]">
              <li>Plain text / Markdown projects</li>
              <li>Imports from .docx, .txt</li>
              <li>Per-project settings</li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
</template>