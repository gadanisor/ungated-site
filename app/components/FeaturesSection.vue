<template>
  <section id="features" class="py-15 md:py-16 bg-[#181818]">
    <div class="mx-auto max-w-[1300px] px-5">
      <h2 class="text-[clamp(26px,3.8vw,40px)] leading-[1.15]">
          Features - The IDE built with writers in mind
        </h2>
        <p class="mb-6 text-[#9a9a9a]">
          
        </p>
      <ul class="divide-y divide-[#2b2b2b]">
        <li v-for="(f, i) in features" :key="i" class="py-7">
          <!-- GRID: 4 coloane; textul 1/4, imaginea 3/4 (textul centrat vertical) -->
          <div class="md:grid md:grid-cols-4 gap-6">
            <!-- text -->
            <div class="md:col-span-1 min-w-0 md:self-center">
              <h4 class="feature-title m-0 flex items-center gap-3 font-semibold">
                {{ f.title }}
              </h4>

              <!-- paragrafe cu titlu inline -->
              <div class="mt-2 text-[#9a9a9a] text-justify space-y-2">
                <p
                  v-for="(p, j) in getParagraphs(f)"
                  :key="j"
                  class="leading-relaxed"
                >
                  <template v-if="p.title">
                    <span
                      class="inline underline decoration-[#5b5b5b] underline-offset-[3px] font-medium mr-2"
                    >
                      {{ p.title }}
                    </span>
                  </template>
                  <span>{{ p.body }}</span>
                </p>
              </div>
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
// 1) Recomandat: folosește features[].paragraphs = [{ title, body }, ...]
// 2) Back-compat: dacă există doar `text`, îl împărțim pe \n\n și încercăm să extragem "Titlu - Body"

const features = [
{
  "title": "Powerful Drafting",
  "paragraphs": [
    {
      "body": "Write at the speed of thought in a familiar, fast, keyboard-centric editor. Selections, multi-cursor editing, and project-wide search help you reshape chapters, fix patterns across files, and stay in flow without lifting your hands from the keys."
    },
    {
      "body": "Go beyond spellcheck with real-time guidance on grammar, style, voice, pacing, and readability. It flags clichés, filler, overused adverbs, and passive constructions, then offers crisp, line-level rewrites so your prose stays clear, consistent, and true to your intent."
    }
  ],
  "img": "/images/problems1.png",
  "alt": "Analyzer and quality panels"
},
  {
  "title": "Rich Metadata",
  "paragraphs": [
    {
      "body": "Understand any document at a glance with a clear synopsis. Rich metadata also connects with plotting tools, linking files to plot points, threads, and character arcs so you can see and manage story structure as you write."
    },
    {
      "body": "Keep everything organized and actionable: notes live in one centralized view, tags let you filter work intelligently, and tasks roll up into a single dashboard so you always focus on what matters."
    }
  ],
    img: '/images/metadata.png',
    alt: 'Synopsis, notes, tags, and task rollups'
  },
  {
  "title": "Component System",
  "paragraphs": [
    {
      "body": "Everything in your story becomes a component — scenes, chapters, plot points, characters, locations, items, factions, magic systems, and more. The components you create understand their relationships, making it easy to see who appears where, what influences what, and how threads evolve across the work."
    },
    {
      "body": "Kick off with swappable templates tailored per project, then adapt and expand as your world grows. With 40+ component types (and counting), you can model the right level of detail, reuse structures across drafts, and keep worldbuilding, plot, and revisions perfectly aligned."
    }
  ],
  "img": "/images/component.png",
  "alt": "Component graph and templates"
},
  {
  "title": "Reading Mode",
  "paragraphs": [
    {
      "body": "Turn drafts into an immersive, book-like reading view with adjustable typography, spacing, and margins. Switch instantly between light, dark, or custom themes to match your eyes and environment."
    },
    {
      "body": "Review with clarity: inline comments and highlights stay anchored to the text, while shareable read-only previews invite clean, distraction-free feedback from collaborators and beta readers."
    }
  ],
  "img": "/images/reading.png",
  "alt": "Reader and theme previews"
}
]

// helper: returnează [{ title, body }, ...] indiferent dacă ai paragraphs sau doar text
const getParagraphs = (f) => {
  if (Array.isArray(f.paragraphs)) return f.paragraphs

  if (typeof f.text === 'string' && f.text.trim()) {
    // split pe paragrafe duble
    const chunks = f.text.split(/\n{2,}/)

    return chunks.map((raw) => {
      const chunk = raw.trim()

      // încearcă formatele: "Titlu - Body" sau "Titlu — Body" sau "Titlu: Body"
      const m = chunk.match(/^\s*(.+?)\s*[-–—:]\s+(.+)$/)
      if (m) {
        return { title: m[1].trim(), body: m[2].trim() }
      }

      // fallback: fără titlu, doar text
      return { title: '', body: chunk }
    })
  }

  return []
}
</script>

<style>
.feature-title {
  font-size: clamp(26px, 3.6vw, 30px) !important; /* scale icons with the smaller title */
  line-height: 1;
  position: relative;
  top: 0.04em;
  color: inherit;
}
</style>
