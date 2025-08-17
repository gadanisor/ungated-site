<template>
  <section id="showcase" class="py-15 md:py-16">
    <div class="mx-auto grid max-w-[1300px] grid-cols-1 items-start gap-7 px-5 lg:grid-cols-[2fr_1fr]">
      <!-- left side -->
      <div>
        <h2 class="text-[clamp(26px,3.8vw,40px)] leading-[1.15]">
          Built with creative writing in mind
        </h2>
        <p class="mb-6 text-[#9a9a9a]">
          A clean grid of highlights — each card has an icon, title, and short description.
        </p>

        <!-- grid of cards -->
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <article
            v-for="(item, idx) in features"
            :key="idx"
            class="group rounded-[8px] border border-[#2b2b2b] bg-[#1e1e1e] p-5 cursor-pointer transition-transform duration-200 hover:scale-[1.03] hover:shadow-lg hover:shadow-black/30"
          >
            <div class="mb-3 flex items-center gap-2">
              <i
                :class="['codicon', item.icon, 'text-[20px]']"
                style="color:#007ACC"
                aria-hidden="true"
              ></i>
              <h3 class="text-[17px] font-semibold">{{ item.title }}</h3>
            </div>
            <p class="text-[#9a9a9a]">{{ item.desc }}</p>
          </article>
        </div>
      </div>

      <!-- right side -->
      <aside class="grid content-start gap-[14px]">
        <div class="rounded-[4px] border border-[#2b2b2b] bg-[#1e1e1e] p-[22px]">
          <div
            class="inline-flex items-center gap-2 rounded-[4px] border border-[#2b2b2b] bg-[#2b2b2b] px-2.5 py-1 text-[12px] font-semibold uppercase tracking-[.04em]"
          >
            Why Ungated?
          </div>
          <h3 class="mt-2.5 mb-1.5 text-lg font-semibold">Stay in flow</h3>
          <p class="text-[#9a9a9a]">
            Everything you need is one keystroke away. Customizable keymap and command palette. No clutter, no tabsplosion.
          </p>
          <div
            class="mt-2 inline-flex items-center gap-2 rounded-[4px] border border-dashed border-[#2b2b2b] px-2.5 py-1 text-[12px]"
          >
            <span
              class="rounded-[4px] border border-[#2b2b2b] bg-[#2b2b2b] px-1.5 py-0.5 font-semibold"
              >⌘</span
            >
            <span
              class="rounded-[4px] border border-[#2b2b2b] bg-[#2b2b2b] px-1.5 py-0.5 font-semibold"
              >K</span
            >
            Command Palette
          </div>
        </div>
        <div class="rounded-[4px] border border-[#2b2b2b] bg-[#1e1e1e] p-[22px]">
          <h3 class="m-0 text-lg font-semibold">Your words are yours</h3>
          <p class="text-[#9a9a9a]">
            Files live on your disk. Works offline. You choose if/when to sync or back up.
          </p>
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

<script setup>
const features = [
  { icon: "codicon-markdown", title: "Markdown", desc: "Write with plain text power and preview instantly." },
  { icon: "codicon-notebook", title: "Notebook", desc: "Mix prose with snippets and keep everything organized." },
  { icon: "codicon-archive", title: "Archive", desc: "Store finished work safely, retrieve when needed." },
  { icon: "codicon-type-hierarchy", title: "Hierarchy", desc: "Explore structured writing with outlines." },
  { icon: "codicon-type-hierarchy-super", title: "Super", desc: "Link and reference parent structures." },
  { icon: "codicon-type-hierarchy-sub", title: "Sub", desc: "Manage nested sections and subtopics." },
  { icon: "codicon-symbol-class", title: "Classes", desc: "Group your concepts cleanly." },
  { icon: "codicon-symbol-string", title: "String", desc: "Polish details down to characters." }
];
</script>

<style>
@import "https://cdn.jsdelivr.net/npm/@vscode/codicons/dist/codicon.css";
</style>
