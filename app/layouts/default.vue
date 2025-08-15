<template>
  <div>
    <!-- HEADER -->
    <header class="nav">
      <div class="wrap nav-inner">
        <a class="brand" href="#top" aria-label="Ungated home">
          <img src="/images/logo.svg" height="30" alt="Ungated logo" />
          <b>Ungated</b>
        </a>
        <nav class="nav-links" aria-label="Primary">
          <a href="#features">Features</a>
          <a href="#showcase">Screenshots</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
          <a href="#download" class="btn small primary">Download</a>
        </nav>
        <button class="btn small mobile-toggle" id="menu" aria-expanded="false" aria-controls="mobileNav">Menu</button>
      </div>
      <div id="mobileNav" hidden>
        <div class="wrap" style="padding-bottom:12px">
          <div class="grid">
            <a href="#features">Features</a>
            <a href="#showcase">Screenshots</a>
            <a href="#pricing">Pricing</a>
            <a href="#faq">FAQ</a>
            <a href="#download" class="btn small primary">Download</a>
          </div>
        </div>
      </div>
    </header>

    <!-- PAGE -->
    <main>
      <slot />
    </main>

    <!-- FOOTER -->
    <footer class="footer">
      <div class="wrap footer-flex">
        <small>© <span id="year"></span> Ungated. All rights reserved.</small>
        <div class="footer-links">
          <a href="#privacy">Privacy</a>
          <a href="#terms">Terms</a>
          <button class="btn small" id="themeToggle" aria-label="Toggle theme">Toggle theme</button>
        </div>
      </div>
    </footer>
  </div>
</template>
