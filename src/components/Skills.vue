<script setup>
import { skillGroups } from '../data/skills'

const rotations = ['-rotate-3', 'rotate-2', '-rotate-1', 'rotate-3', 'rotate-1', '-rotate-2']
</script>

<template>
  <section id="skills" class="relative max-w-6xl mx-auto px-6 py-24">
    <div class="mb-14 text-center" v-reveal>
      <p class="font-mono text-sm text-grape mb-2">// sticker collection</p>
      <h2 class="font-display font-bold text-3xl md:text-5xl">Tools yang sering saya pakai</h2>
    </div>

    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
      <div v-for="g in skillGroups" :key="g.label" class="text-center" v-reveal>
        <h3
          class="font-mono text-xs uppercase tracking-widest mb-5 inline-block px-3 py-1 rounded-full"
          :class="`bg-${g.color}/15 text-${g.color === 'sun' ? 'ink' : g.color}`"
        >{{ g.label }}</h3>
        <div class="flex flex-wrap justify-center gap-3">
          <span
            v-for="(item, i) in g.items"
            :key="item"
            class="sticker pin-card font-body font-semibold text-sm px-4 py-2 cursor-default"
            :class="rotations[i % rotations.length]"
          >{{ item }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
