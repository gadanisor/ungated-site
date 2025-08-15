<template>
  <div class="bg-[#181818] text-[#d4d4d4]">
    <!-- HERO -->
    <section id="top" class="py-16 md:py-20">
      <div class="mx-auto grid max-w-[1200px] grid-cols-1 gap-9 px-5 md:grid-cols-[1.1fr_.9fr] md:items-center">
        <div>
          <div class="mb-3 flex flex-wrap items-center gap-2">
            <span class="inline-flex items-center gap-2 rounded-[4px] border border-[#2b2b2b] bg-[#2b2b2b] px-2.5 py-1 text-[12px] font-semibold uppercase tracking-[.04em]">New</span>
            <span class="inline-flex items-center gap-2 rounded-[4px] border border-dashed border-[#2b2b2b] px-2.5 py-1 text-[12px]">Desktop • Electron • Offline-first</span>
          </div>

          <h1 class="m-0 text-balance text-[clamp(34px,5vw,60px)] leading-[1.05] tracking-[-.02em]">The toolbox worthy of your imagination.</h1>

          <p class="mt-4 mb-5 text-[clamp(16px,2vw,20px)] text-[#9a9a9a]">Ungated is a calm, powerful workspace for writers and world-builders. Draft in a blazing-fast editor, weave characters and places, plot arcs on timelines, and keep your universe coherent — without leaving your flow.</p>

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

        <div class="relative aspect-[16/10] overflow-hidden rounded-[4px] border border-[#2b2b2b] bg-[#1e1e1e] shadow-[0_4px_12px_rgba(0,0,0,.3)]">
          <img src="/images/Capture.PNG" alt="Ungated editor preview" class="h-full w-full object-cover" />
        </div>
      </div>
    </section>

    <!-- FEATURES -->
    <section id="features" class="py-15 md:py-16">
      <div class="mx-auto max-w-[1200px] px-5">
        <h2 class="mb-2 text-[clamp(26px,3.8vw,40px)] leading-[1.15]">Built for creative writing & world-building</h2>
        <p class="mb-7 text-[#9a9a9a]">Familiar layout, purpose-built tools. Keep the comfort of a code editor — minus the code — plus everything you need to grow worlds and stories.</p>

        <div class="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          <div class="rounded-[4px] border border-[#2b2b2b] bg-[#1e1e1e] p-5">
            <div class="inline-grid h-[26px] w-[26px] place-items-center rounded-[4px] bg-[#007acc] font-black text-white">✍️</div>
            <h3 class="mt-2.5 mb-2 text-[18px] font-semibold">Frictionless drafting</h3>
            <p class="m-0 text-[#9a9a9a]">Modified Monaco for prose: typewriter mode, soft-wrap, scene separators, inline word/char counts, focus ranges.</p>
          </div>
          <div class="rounded-[4px] border border-[#2b2b2b] bg-[#1e1e1e] p-5">
            <div class="inline-grid h-[26px] w-[26px] place-items-center rounded-[4px] bg-[#007acc] font-black text-white">🧭</div>
            <h3 class="mt-2.5 mb-2 text-[18px] font-semibold">World bible</h3>
            <p class="m-0 text-[#9a9a9a]">Quick panels for characters, locations, factions, items — linked references keep continuity tight.</p>
          </div>
          <div class="rounded-[4px] border border-[#2b2b2b] bg-[#1e1e1e] p-5">
            <div class="inline-grid h-[26px] w-[26px] place-items-center rounded-[4px] bg-[#007acc] font-black text-white">🕰️</div>
            <h3 class="mt-2.5 mb-2 text-[18px] font-semibold">Timelines & arcs</h3>
            <p class="m-0 text-[#9a9a9a]">Plot arcs and chronology; jump to scenes; prevent paradoxes with conflict hints.</p>
          </div>
          <div class="rounded-[4px] border border-[#2b2b2b] bg-[#1e1e1e] p-5">
            <div class="inline-grid h-[26px] w-[26px] place-items-center rounded-[4px] bg-[#007acc] font-black text-white">🧩</div>
            <h3 class="mt-2.5 mb-2 text-[18px] font-semibold">Cards & corkboard</h3>
            <p class="m-0 text-[#9a9a9a]">Outline with draggable cards; rearrange beats until the structure snaps into place.</p>
          </div>
          <div class="rounded-[4px] border border-[#2b2b2b] bg-[#1e1e1e] p-5">
            <div class="inline-grid h-[26px] w-[26px] place-items-center rounded-[4px] bg-[#007acc] font-black text-white">🌗</div>
            <h3 class="mt-2.5 mb-2 text-[18px] font-semibold">Themeable</h3>
            <p class="m-0 text-[#9a9a9a]">Light/dark + custom palettes. Import/export themes; per-project overrides.</p>
          </div>
          <div class="rounded-[4px] border border-[#2b2b2b] bg-[#1e1e1e] p-5">
            <div class="inline-grid h-[26px] w-[26px] place-items-center rounded-[4px] bg-[#007acc] font-black text-white">🔎</div>
            <h3 class="mt-2.5 mb-2 text-[18px] font-semibold">Search that understands prose</h3>
            <p class="m-0 text-[#9a9a9a]">Smart find across scenes, notes, and metadata. Save filters and collections.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- SHOWCASE -->
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

    <!-- DOWNLOAD -->
    <section id="download" aria-label="Download Ungated" class="py-15 md:py-16">
      <div class="mx-auto max-w-[1200px] px-5">
        <h2 class="text-[clamp(26px,3.8vw,40px)] leading-[1.15]">Download</h2>
        <p class="mb-5 text-[#9a9a9a]">Universal installers. Optimized builds for Apple Silicon, Intel, Windows and major Linux distros.</p>
        <div class="flex flex-wrap gap-3">
          <a data-os="mac" href="#" rel="nofollow" class="inline-flex items-center justify-center rounded-[4px] bg-[#007acc] px-4 py-3 font-bold text-white hover:bg-[#1fa3ff] focus:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(51,153,255,.35)]">macOS (.dmg)</a>
          <a data-os="win" href="#" class="inline-flex items-center justify-center rounded-[4px] border border-[#2b2b2b] px-4 py-3 font-bold hover:border-[#3399ff] focus:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(51,153,255,.35)]">Windows (.exe)</a>
          <a data-os="linux" href="#" class="inline-flex items-center justify-center rounded-[4px] border border-[#2b2b2b] px-4 py-3 font-bold hover:border-[#3399ff] focus:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(51,153,255,.35)]">Linux (.AppImage)</a>
          <a href="#changelog" class="inline-flex items-center justify-center rounded-[4px] border border-[#2b2b2b] px-4 py-3 font-bold hover:border-[#3399ff] focus:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(51,153,255,.35)]">Changelog</a>
        </div>
        <p class="mt-2 text-[#9a9a9a]">Requires macOS 12+, Windows 10+, or Ubuntu 22.04+/equivalent.</p>
      </div>
    </section>

    <!-- PRICING -->
    <section id="pricing" class="py-15 md:py-16">
      <div class="mx-auto max-w-[1200px] px-5">
        <h2 class="text-[clamp(26px,3.8vw,40px)] leading-[1.15]">Pricing</h2>
        <p class="mb-6 text-[#9a9a9a]">Start free. Upgrade when you’re ready — simple and transparent.</p>
        <div class="grid gap-6 lg:grid-cols-3">
          <div class="rounded-[4px] border border-[#2b2b2b] bg-[#1e1e1e] p-[22px]">
            <div class="inline-flex items-center gap-2 rounded-[4px] border border-[#2b2b2b] bg-[#2b2b2b] px-2.5 py-1 text-[12px] font-semibold uppercase tracking-[.04em]">Beta</div>
            <h3 class="mt-2 text-lg font-semibold">Free</h3>
            <div class="my-2 text-[34px] font-black">$0</div>
            <ul class="list-disc pl-5 text-[#d4d4d4]">
              <li>Core editor + themes</li>
              <li>Projects & folders</li>
              <li>Character/Location sheets</li>
            </ul>
            <a href="#download" class="mt-3 inline-flex items-center justify-center rounded-[4px] bg-[#007acc] px-4 py-3 font-bold text-white hover:bg-[#1fa3ff] focus:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(51,153,255,.35)]">Get Ungated</a>
          </div>

          <div class="rounded-[4px] border border-[#2b2b2b] bg-[#1e1e1e] p-[22px]">
            <div class="inline-flex items-center gap-2 rounded-[4px] border border-[#2b2b2b] bg-[#2b2b2b] px-2.5 py-1 text-[12px] font-semibold uppercase tracking-[.04em]">Writer</div>
            <h3 class="mt-2 text-lg font-semibold">One-time license</h3>
            <div class="my-2 text-[34px] font-black">$39</div>
            <ul class="list-disc pl-5 text-[#d4d4d4]">
              <li>Timelines & corkboard</li>
              <li>Custom templates</li>
              <li>Priority updates</li>
            </ul>
            <a href="#download" class="mt-3 inline-flex items-center justify-center rounded-[4px] border border-[#2b2b2b] px-4 py-3 font-bold hover:border-[#3399ff] focus:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(51,153,255,.35)]">Buy at launch</a>
          </div>

          <div class="rounded-[4px] border border-[#2b2b2b] bg-[#1e1e1e] p-[22px]">
            <div class="inline-flex items-center gap-2 rounded-[4px] border border-[#2b2b2b] bg-[#2b2b2b] px-2.5 py-1 text-[12px] font-semibold uppercase tracking-[.04em]">Studio</div>
            <h3 class="mt-2 text-lg font-semibold">Teams</h3>
            <div class="my-2 text-[34px] font-black">$99</div>
            <ul class="list-disc pl-5 text-[#d4d4d4]">
              <li>Multi-seat keys</li>
              <li>Project sharing</li>
              <li>Email support</li>
            </ul>
            <a href="#contact" class="mt-3 inline-flex items-center justify-center rounded-[4px] border border-[#2b2b2b] px-4 py-3 font-bold hover:border-[#3399ff] focus:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(51,153,255,.35)]">Contact sales</a>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section id="faq" aria-label="Frequently asked questions" class="py-15 md:py-16">
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

    <!-- NEWSLETTER -->
    <section id="newsletter" class="py-15 md:py-16">
      <div class="mx-auto max-w-[1200px] px-5">
        <h2 class="text-[clamp(26px,3.8vw,40px)] leading-[1.15]">Get launch updates</h2>
        <p class="mb-4 text-[#9a9a9a]">No spam. Only major releases, tips, and themes.</p>
        <form class="flex flex-wrap gap-2" method="post" action="https://formspree.io/f/your-id">
          <label class="sr-only" for="email">Email</label>
          <input id="email" name="email" type="email" placeholder="you@yourdomain.com" required inputmode="email" autocomplete="email" class="min-w-[220px] flex-1 rounded-[4px] border border-[#2b2b2b] bg-[#2b2b2b] px-3 py-3 text-[#d4d4d4] placeholder:text-[#9a9a9a] focus:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(51,153,255,.35)]" />
          <button type="submit" class="inline-flex items-center justify-center rounded-[4px] bg-[#007acc] px-4 py-3 font-bold text-white hover:bg-[#1fa3ff] focus:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(51,153,255,.35)]">Subscribe</button>
        </form>
        <p class="mt-2 text-[#9a9a9a]">By subscribing you agree to receive product emails. Unsubscribe anytime.</p>
      </div>
    </section>
  </div>
</template>
