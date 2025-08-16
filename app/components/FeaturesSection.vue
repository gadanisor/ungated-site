<template>
  <section id="features" class="py-15 md:py-16 bg-[#181818]">
    <div class="mx-auto max-w-[1300px] px-5">
      <h2 class="mb-2 text-[clamp(26px,3.8vw,40px)] leading-[1.15]">
        Built with creative writing and world-building in mind
      </h2>
      <p class="mb-7 text-[#9a9a9a]">
        Familiar layout, purpose-built tools. Keep the comfort of a code editor — minus the code — plus everything you need to grow worlds and stories.
      </p>

      <ul>
        <li v-for="(f, i) in features" :key="i" class="py-7">
          <!-- GRID: 4 coloane; textul 1/4, imaginea 3/4 (textul centrat vertical) -->
          <div class="md:grid md:grid-cols-4 gap-6">
            <!-- text -->
            <div class="md:col-span-1 min-w-0 md:self-center">
              <h4 class="feature-title m-0 flex items-center gap-3 font-semibold">
                {{ f.title }}
              </h4>
              <p class="mt-2 text-[#9a9a9a] text-justify">
                {{ f.text }}
              </p>
            </div>

            <!-- imagine -->
            <div class="md:col-span-3">
              <img
                :src="f.img"
                :alt="f.alt"
                class="mt-4 md:mt-0 w-full md:max-w-none aspect-[3/2] object-cover bg-[#101010]"
                loading="lazy"
              />
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
const features = [
  {
    title: 'Frictionless Drafting',
    text:
      'Write at the speed of thought. Typewriter scrolling, soft wrap, scene separators, inline word/character counts, and focus ranges—everything tuned for long-form flow with zero friction.',
    img: '/images/hero.png',
    alt: 'Drafting interface preview'
  },
  {
    title: 'Powerful Analyzer',
    text:
      'Beyond spellcheck. It reviews grammar, style, voice, pacing, and readability; flags clichés, filler, adverbs, and passive constructions; and suggests line-level rewrites — purpose-built for creative writing.',
    img: '/images/problems1.png',
    alt: 'Analyzer and quality panels'
  },
  {
    title: 'Rich Metadata',
    text:
      'Every document carries a Synopsis, Notes, Tasks, and Tags. All tasks roll up into a central Task Manager. Link pages to plot beats, threads, character arcs, and locations so you always know what’s next—and where it belongs.',
    img: '/images/metadata.png',
    alt: 'Synopsis, notes, tags, and task rollups'
  },
  {
    title: 'Component System',
    text:
      'Everything is a component — scenes, chapters, plot points, characters, locations, magic systems, items, factions, and more. Components understand their relationships and come with swappable templates you can tailor per project. There are over 40 types of components and more are coming.',
    img: '/images/component.png',
    alt: 'Component graph and templates'
  },
  {
    title: 'Reading Mode',
    text:
      'Turn drafts into an immersive, book-like reading view. Adjustable type and spacing, light/dark/custom themes, inline comments and highlights, plus shareable read-only previews for clean feedback.',
    img: '/images/reading.png',
    alt: 'Reader and theme previews'
  }
]
</script>

<style>
.feature-title {
  font-size: clamp(22px, 3.2vw, 32px); /* was 26px–40px */
  line-height: 1.12;
}
.feature-title {
  font-size: clamp(26px, 3.6vw, 30px) !important; /* scale icons with the smaller title */
  line-height: 1;
  position: relative;
  top: 0.04em;
  color: inherit;
}
</style>
