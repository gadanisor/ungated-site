<template>
  <section id="pricing" class="py-15 md:py-16">
    <div class="mx-auto max-w-[1300px] px-5">
      <h2 class="text-[clamp(26px,3.8vw,40px)] leading-[1.15]">Subscription Plans</h2>
      <p class="mb-6 text-[#9a9a9a]">Start free. Upgrade when you’re ready — simple and transparent.</p>

      <!-- Subscription Plans -->
      <div class="grid gap-6 lg:grid-cols-2">
        <!-- Apprentice -->
        <div class="rounded-[4px] border border-[#2b2b2b] bg-[#1e1e1e] p-[22px]">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold">Apprentice</h3>
            <span class="text-sm font-semibold text-[#49a8ff]">Free</span>
          </div>
          <ul class="mt-3 space-y-2 text-[#d4d4d4]">
            <li>✓ Basic usage</li>
            <li>✓ Community support</li>
            <li>✓ Up to 3 projects</li>
            <li>✓ 1000 words/story</li>
          </ul>
          <a href="#" class="mt-4 inline-flex w-full items-center justify-center rounded-[4px] bg-[#007acc] px-4 py-3 font-bold text-white hover:bg-[#1fa3ff] focus:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(51,153,255,.35)]">
            Current Plan
          </a>
        </div>

        <!-- Traveler -->
        <div class="rounded-[4px] border border-[#2b2b2b] bg-[#1e1e1e] p-[22px]">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold">Traveler</h3>
            <span class="text-sm font-semibold text-[#49a8ff]">$4.99/mo</span>
          </div>
          <ul class="mt-3 space-y-2 text-[#d4d4d4]">
            <li>✓ All Apprentice features</li>
            <li>✓ Up to 10 projects</li>
            <li>✓ 5000 words/story</li>
            <li>✓ Basic templates</li>
          </ul>
          <a href="#" class="mt-4 inline-flex w-full items-center justify-center rounded-[4px] bg-[#007acc] px-4 py-3 font-bold text-white hover:bg-[#1fa3ff] focus:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(51,153,255,.35)]">
            Subscribe
          </a>
        </div>

        <!-- Storyteller -->
        <div class="rounded-[4px] border border-[#2b2b2b] bg-[#1e1e1e] p-[22px]">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold">Storyteller</h3>
            <span class="text-sm font-semibold text-[#49a8ff]">$9.99/mo</span>
          </div>
          <ul class="mt-3 space-y-2 text-[#d4d4d4]">
            <li>✓ Unlimited stories</li>
            <li>✓ Advanced templates</li>
            <li>✓ Priority support</li>
            <li>✓ Community features</li>
          </ul>
          <a href="#" class="mt-4 inline-flex w-full items-center justify-center rounded-[4px] bg-[#007acc] px-4 py-3 font-bold text-white hover:bg-[#1fa3ff] focus:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(51,153,255,.35)]">
            Subscribe
          </a>
        </div>

        <!-- Architect -->
        <div class="rounded-[4px] border border-[#2b2b2b] bg-[#1e1e1e] p-[22px]">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold">Architect</h3>
            <span class="text-sm font-semibold text-[#49a8ff]">$99.99/yr</span>
          </div>
          <ul class="mt-3 space-y-2 text-[#d4d4d4]">
            <li>✓ All Storyteller features</li>
            <li>✓ Dedicated cloud storage</li>
            <li>✓ Early access to new tools</li>
            <li>✓ Custom branding</li>
          </ul>
          <a href="#" class="mt-4 inline-flex w-full items-center justify-center rounded-[4px] bg-[#007acc] px-4 py-3 font-bold text-white hover:bg-[#1fa3ff] focus:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(51,153,255,.35)]">
            Subscribe
          </a>
        </div>
      </div>

      <!-- Buy License Keys -->
      <h3 class="mt-10 text-[clamp(22px,3vw,28px)] leading-[1.2]">Buy License Keys</h3>
      <div class="mt-4 grid gap-6 lg:grid-cols-2">
        <!-- Guild Pass -->
        <div class="rounded-[4px] border border-[#2b2b2b] bg-[#1e1e1e] p-[22px]">
          <div class="flex items-center justify-between">
            <h4 class="text-lg font-semibold">Guild Pass</h4>
            <span class="text-sm text-[#9a9a9a]">1-Year License</span>
          </div>
          <div class="my-2 text-[28px] font-black">$49.99</div>
          <a href="#" class="mt-1 inline-flex w-full items-center justify-center rounded-[4px] bg-[#007acc] px-4 py-3 font-bold text-white hover:bg-[#1fa3ff] focus:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(51,153,255,.35)]">
            Purchase
          </a>
        </div>

        <!-- Master Key -->
        <div class="rounded-[4px] border border-[#2b2b2b] bg-[#1e1e1e] p-[22px]">
          <div class="flex items-center justify-between">
            <h4 class="text-lg font-semibold">Master Key</h4>
            <span class="text-sm text-[#9a9a9a]">Lifetime License</span>
          </div>
          <div class="my-2 text-[28px] font-black">$199.99</div>
          <a href="#" class="mt-1 inline-flex w-full items-center justify-center rounded-[4px] bg-[#007acc] px-4 py-3 font-bold text-white hover:bg-[#1fa3ff] focus:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(51,153,255,.35)]">
            Purchase
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
