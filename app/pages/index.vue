<template>
  <div>
    <!-- HERO -->
    <section class="hero" id="top">
      <div class="wrap">
        <div>
          <div class="eyebrow">
            <span class="tag">New</span>
            <span class="pill">Desktop • Electron • Offline-first</span>
          </div>
          <h1>The toolbox worthy of your imagination.</h1>
          <p>Ungated is a calm, powerful workspace for writers and world-builders. Draft in a blazing-fast editor, weave characters and places, plot arcs on timelines, and keep your universe coherent — without leaving your flow.</p>
          <div class="hero-cta">
            <a class="btn primary" href="#download">Download Ungated</a>
            <a class="btn ghost" href="#features" aria-label="See Ungated features">See features</a>
          </div>
          <div class="mini-badges">
            <span class="pill">No ads</span>
            <span class="pill">Local files</span>
            <span class="pill">Themeable</span>
          </div>
        </div>
        <div class="shot card" aria-label="App preview">
          <img src="/images/Capture.PNG" alt="Ungated editor preview" />
        </div>
      </div>
    </section>

    <!-- FEATURES -->
    <section class="section" id="features">
      <div class="wrap">
        <h2>Built for creative writing & world-building</h2>
        <p class="lead">Familiar layout, purpose-built tools. Keep the comfort of a code editor — minus the code — plus everything you need to grow worlds and stories.</p>

        <div class="grid features">
          <div class="feature">
            <div class="ico">✍️</div>
            <h3>Frictionless drafting</h3>
            <p>Modified Monaco for prose: typewriter mode, soft-wrap, scene separators, inline word/char counts, focus ranges.</p>
          </div>
          <div class="feature">
            <div class="ico">🧭</div>
            <h3>World bible</h3>
            <p>Quick panels for characters, locations, factions, items — linked references keep continuity tight.</p>
          </div>
          <div class="feature">
            <div class="ico">🕰️</div>
            <h3>Timelines & arcs</h3>
            <p>Plot arcs and chronology; jump to scenes; prevent paradoxes with conflict hints.</p>
          </div>
          <div class="feature">
            <div class="ico">🧩</div>
            <h3>Cards & corkboard</h3>
            <p>Outline with draggable cards; rearrange beats until the structure snaps into place.</p>
          </div>
          <div class="feature">
            <div class="ico">🌗</div>
            <h3>Themeable</h3>
            <p>Light/dark + custom palettes. Import/export themes; per-project overrides.</p>
          </div>
          <div class="feature">
            <div class="ico">🔎</div>
            <h3>Search that understands prose</h3>
            <p>Smart find across scenes, notes, and metadata. Save filters and collections.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- SHOWCASE -->
    <section class="section" id="showcase">
      <div class="wrap grid showcase">
        <div>
          <h2>Screenshots</h2>
          <p class="lead">A familiar three-pane layout with a dedicated writer’s center. Replace these placeholders with your real shots before launch.</p>
          <div class="mock" style="margin-bottom:14px">
            <img src="/images/Capture.PNG" alt="Main editor screenshot" style="width:100%;height:100%;object-fit:cover" />
          </div>
          <div class="mock">
            <img src="/images/Capture2.PNG" alt="World bible screenshot" style="width:100%;height:100%;object-fit:cover" />
          </div>
        </div>
        <aside class="grid" style="gap:14px">
          <div class="price-card">
            <div class="tag">Why Ungated?</div>
            <h3 style="margin:10px 0 6px">Stay in flow</h3>
            <p class="muted">Everything you need is one keystroke away. Customizable keymap and command palette. No clutter, no tabsplosion.</p>
            <div style="margin-top:10px" class="pill"><span class="kbd">⌘</span><span class="kbd">K</span> Command Palette</div>
          </div>
          <div class="price-card">
            <h3 style="margin:0">Your words are yours</h3>
            <p class="muted">Files live on your disk. Works offline. You choose if/when to sync or back up.</p>
            <ul>
              <li>Plain text / Markdown projects</li>
              <li>Imports from .docx, .txt</li>
              <li>Per-project settings</li>
            </ul>
          </div>
        </aside>
      </div>
    </section>

    <!-- DOWNLOAD -->
    <section class="section" id="download" aria-label="Download Ungated">
      <div class="wrap">
        <h2>Download</h2>
        <p class="lead">Universal installers. Optimized builds for Apple Silicon, Intel, Windows and major Linux distros.</p>
        <div class="download">
          <a class="btn primary" data-os="mac" href="#" rel="nofollow">macOS (.dmg)</a>
          <a class="btn ghost" data-os="win" href="#">Windows (.exe)</a>
          <a class="btn ghost" data-os="linux" href="#">Linux (.AppImage)</a>
          <a class="btn ghost" href="#changelog">Changelog</a>
        </div>
        <p class="muted" style="margin-top:10px">Requires macOS 12+, Windows 10+, or Ubuntu 22.04+/equivalent.</p>
      </div>
    </section>

    <!-- PRICING -->
    <section class="section" id="pricing">
      <div class="wrap">
        <h2>Pricing</h2>
        <p class="lead">Start free. Upgrade when you’re ready — simple and transparent.</p>
        <div class="grid pricing">
          <div class="price-card">
            <div class="tag">Beta</div>
            <h3>Free</h3>
            <div class="price">$0</div>
            <ul>
              <li>Core editor + themes</li>
              <li>Projects & folders</li>
              <li>Character/Location sheets</li>
            </ul>
            <a class="btn primary" href="#download">Get Ungated</a>
          </div>

          <div class="price-card">
            <div class="tag">Writer</div>
            <h3>One-time license</h3>
            <div class="price">$39</div>
            <ul>
              <li>Timelines & corkboard</li>
              <li>Custom templates</li>
              <li>Priority updates</li>
            </ul>
            <a class="btn ghost" href="#download">Buy at launch</a>
          </div>

          <div class="price-card">
            <div class="tag">Studio</div>
            <h3>Teams</h3>
            <div class="price">$99</div>
            <ul>
              <li>Multi-seat keys</li>
              <li>Project sharing</li>
              <li>Email support</li>
            </ul>
            <a class="btn ghost" href="#contact">Contact sales</a>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="section" id="faq" aria-label="Frequently asked questions">
      <div class="wrap">
        <h2>FAQ</h2>
        <details>
          <summary>Is Ungated based on VS Code?</summary>
          <p>Ungated is built from scratch with Electron and a customized Monaco editor to focus on prose — not code. The design feels familiar but uses its own name, logo and assets.</p>
        </details>
        <details>
          <summary>Will my work stay private?</summary>
          <p>Yes. Files live locally by default. You control sync and backups.</p>
        </details>
        <details>
          <summary>Can I import existing material?</summary>
          <p>Yes. TXT/Markdown work great; DOCX import is planned for GA.</p>
        </details>
        <details>
          <summary>What platforms are supported?</summary>
          <p>macOS (Apple Silicon & Intel), Windows, and major Linux distros.</p>
        </details>
      </div>
    </section>

    <!-- NEWSLETTER -->
    <section class="section" id="newsletter">
      <div class="wrap">
        <h2>Get launch updates</h2>
        <p class="lead">No spam. Only major releases, tips, and themes.</p>
        <form class="news" method="post" action="https://formspree.io/f/your-id">
          <label class="visually-hidden" for="email">Email</label>
          <input id="email" name="email" type="email" placeholder="you@yourdomain.com" required inputmode="email" autocomplete="email" />
          <button class="btn primary" type="submit">Subscribe</button>
        </form>
        <p class="muted" style="margin-top:10px">By subscribing you agree to receive product emails. Unsubscribe anytime.</p>
      </div>
    </section>
  </div>
</template>
