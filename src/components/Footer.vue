<script setup>
const socials = [
  { label: 'GitHub', href: 'https://github.com/naubass', external: true },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/naufal-najmi-kardiansyah-a11908271/', external: true },
  { label: 'Email', href: 'mailto:naufalnajmi04@gmail.com', external: false },
]
</script>

<template>
  <footer class="border-t-2 border-dashed border-ink/15 mt-10">
    <div class="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
      <p class="font-mono text-xs text-ink/50">© {{ new Date().getFullYear() }} Naufal. Dibuat dengan Vue &amp; Tailwind.</p>
      <div class="flex gap-5 font-mono text-sm">
        <a
          v-for="s in socials"
          :key="s.label"
          :href="s.href"
          :target="s.external ? '_blank' : undefined"
          :rel="s.external ? 'noopener noreferrer' : undefined"
          class="marker-link"
        >{{ s.label }}</a>
      </div>
    </div>
  </footer>
</template>