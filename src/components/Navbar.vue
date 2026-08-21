<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'

const scrolled = ref(false)
const menuOpen = ref(false)

const links = [
  { href: '/#about', label: 'Tentang' },
  { href: '/#projects', label: 'Project' },
  { href: '/#skills', label: 'Skills' },
  { href: '/#contact', label: 'Kontak' },
]

function onScroll() {
  scrolled.value = window.scrollY > 12
}

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header
    class="fixed top-0 inset-x-0 z-50 transition-all duration-300"
    :class="scrolled ? 'bg-paper/90 backdrop-blur shadow-sm' : ''"
  >
    <nav class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
      <RouterLink to="/" class="flex items-center gap-2 group">
        <span
          class="w-9 h-9 rounded-full bg-coral text-paper font-display font-bold flex items-center justify-center rotate-[-6deg] shadow-pin group-hover:rotate-0 transition-transform"
        >N</span>
        <span class="font-display font-semibold text-lg tracking-tight">Naufal Najmi Kardiansyah</span>
      </RouterLink>

      <ul class="hidden md:flex items-center gap-8 font-mono text-sm">
        <li v-for="l in links" :key="l.href">
          <RouterLink :to="l.href" class="marker-link text-ink/80 hover:text-ink">{{ l.label }}</RouterLink>
        </li>
      </ul>

      <RouterLink
        to="/#contact"
        class="hidden md:inline-flex items-center gap-2 bg-ink text-paper font-body font-semibold text-sm px-4 py-2 rounded-full hover:bg-coral transition-colors"
      >
        Hire me →
      </RouterLink>

      <button
        class="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
        @click="menuOpen = !menuOpen"
        aria-label="Buka menu"
      >
        <span class="w-6 h-0.5 bg-ink transition-transform" :class="menuOpen && 'rotate-45 translate-y-2'" />
        <span class="w-6 h-0.5 bg-ink transition-opacity" :class="menuOpen && 'opacity-0'" />
        <span class="w-6 h-0.5 bg-ink transition-transform" :class="menuOpen && '-rotate-45 -translate-y-2'" />
      </button>
    </nav>

    <ul v-if="menuOpen" class="md:hidden bg-paper border-t border-ink/10 px-6 py-4 flex flex-col gap-4 font-mono text-sm">
      <li v-for="l in links" :key="l.href">
        <RouterLink :to="l.href" class="block" @click="menuOpen = false">{{ l.label }}</RouterLink>
      </li>
    </ul>
  </header>
</template>
