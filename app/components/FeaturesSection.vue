<template>
  <section id="features" class="py-15 md:py-16 bg-[#181818]">
    <div class="mx-auto max-w-[1300px] px-5">
      <h2 class="mb-2 text-[clamp(26px,3.8vw,40px)] leading-[1.15]">
        Built with creative writing and world-building in mind
      </h2>
      <p class="mb-7 text-[#9a9a9a]">
        Familiar layout, purpose-built tools. Keep the comfort of a code editor — minus the code — plus everything you need to grow worlds and stories.
      </p>

      <ul class="divide-y divide-[#2b2b2b]">
        <li v-for="(f, i) in features" :key="i" class="py-7">
          <!-- GRID: 3 coloane; imaginea 2/3, textul 1/3 (centrat vertical) -->
          <div class="md:grid md:grid-cols-3 gap-6">
            <!-- text (centrat vertical în track-ul Grid) -->
            <div class="md:col-span-1 min-w-0 md:self-center">
              <h4 class="feature-title m-0 flex items-center gap-3 font-semibold">
                {{ f.title }}
              </h4>
              <p class="mt-2 text-[#9a9a9a]">
                {{ f.text }}
              </p>
            </div>

            <!-- imagine -->
            <div class="md:col-span-2">
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
      'Beyond spellcheck. It reviews grammar, style, voice, pacing, and readability; flags clichés, filler, adverbs, and passive constructions; and suggests line-level rewrites—purpose-built for creative writing.',
    img: '/images/problems1.png',
    alt: 'Analyzer and quality panels'
  },
  {
    title: 'Rich Metadata & Tasking',
    text:
      'Every document carries a Synopsis, Notes, Tasks, and Tags. All tasks roll up into a central Task Manager. Link pages to plot beats, threads, character arcs, and locations so you always know what’s next—and where it belongs.',
    img: '/images/metadata.png',
    alt: 'Synopsis, notes, tags, and task rollups'
  },
  {
    title: 'Component System',
    text:
      'Everything is a component—scenes, chapters, plot points, characters, locations, magic systems, items, factions, and more. Components understand their relationships and come with swappable templates you can tailor per project.',
    img: '/images/component.png',
    alt: 'Component graph and templates'
  },
  {
    title: 'Reading Mode',
    text:
      'Turn drafts into an immersive, book-like reading view. Adjustable type and spacing, light/dark/custom themes, inline comments and highlights, plus shareable read-only previews for clean feedback.',
    img: '/images/reading-dark.png',
    alt: 'Reader and theme previews'
  },
  {
    title: 'Search that understands prose',
    text:
      'Find ideas, not just keywords. Blend semantic and exact search across drafts, notes, and metadata; filter by characters, locations, beats, threads, or tags; save smart collections; jump straight to every reference.',
    img: 'https://placehold.co/800x600?text=Search',
    alt: 'Search UI with filters'
  }
]
</script>


<style>
@import url('https://cdn.jsdelivr.net/npm/@vscode/codicons/dist/codicon.css');

.feature-title {
  font-size: clamp(26px, 3.8vw, 40px);
  line-height: 1.15;
}
.feature-title {
  font-size: clamp(34px, 4.6vw, 34px) !important;
  line-height: 1;
  position: relative;
  top: 0.04em;
}
.feature-title { color: inherit; }
</style>
