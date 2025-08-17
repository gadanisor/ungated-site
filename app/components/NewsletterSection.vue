<template>
    <section id="newsletter" class="py-15 md:py-16">
      <div class="mx-auto max-w-[1300px] px-5">
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
</template>