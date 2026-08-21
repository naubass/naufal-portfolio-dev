<script setup>
import { reactive } from 'vue'
import { RouterLink } from 'vue-router'
import { projects } from '../data/projects'

const imgError = reactive({})
function onImgError(id) {
  imgError[id] = true
}
</script>

<template>
  <section id="projects" class="relative max-w-6xl mx-auto px-6 py-24">
    <div class="mb-14 text-center" v-reveal>
      <p class="font-mono text-sm text-sky mb-2">// papan project</p>
      <h2 class="font-display font-bold text-3xl md:text-5xl">Beberapa hal yang sudah saya bangun</h2>
    </div>

    <div class="grid sm:grid-cols-2 gap-8">
      <article
        v-for="p in projects"
        :key="p.id"
        class="relative pin-card p-6 md:p-7"
        :class="p.rotate"
        v-reveal
      >
        <span class="pin-dot" :class="`bg-${p.color}`" style="top: -0.5rem; left: 1.5rem"></span>

        <!-- Project photo (thumbnail = foto pertama), taped like a pinned snapshot -->
        <div class="relative mb-5 -mt-2">
          <span class="tape bg-sun/70 -top-2 left-6 -rotate-3 rounded-sm z-10"></span>
          <div class="relative aspect-video rounded overflow-hidden bg-ink/5">
            <img
              v-if="!imgError[p.id]"
              :src="p.images[0]"
              :alt="`Screenshot ${p.title}`"
              class="w-full h-full object-cover"
              loading="lazy"
              @error="onImgError(p.id)"
            />
            <div
              v-else
              class="w-full h-full flex items-center justify-center"
              :class="`bg-gradient-to-br from-${p.color}/30 via-${p.color}/10 to-transparent`"
            >
              <span class="font-mono text-xs text-ink/40">Tambahkan screenshot disini</span>
            </div>
            <span
              v-if="p.images.length > 1"
              class="absolute bottom-2 right-2 font-mono text-[10px] bg-ink/70 text-paper px-2 py-0.5 rounded-full"
            >+{{ p.images.length - 1 }} foto</span>
          </div>
        </div>

        <span
          class="font-mono text-xs px-2.5 py-1 rounded-full inline-block mb-4"
          :class="`bg-${p.color}/15 text-${p.color === 'sun' ? 'ink' : p.color}`"
        >{{ p.tag }}</span>

        <h3 class="font-display font-semibold text-xl md:text-2xl mb-2">{{ p.title }}</h3>
        <p class="font-body text-ink/70 text-sm leading-relaxed mb-5">{{ p.description }}</p>

        <div class="flex flex-wrap gap-2 mb-5">
          <span
            v-for="t in p.stack"
            :key="t"
            class="font-mono text-[11px] border border-ink/15 px-2 py-1 rounded"
          >{{ t }}</span>
        </div>

        <RouterLink :to="`/project/${p.id}`" class="marker-link font-body font-semibold text-sm inline-flex items-center gap-1">
          Lihat detail →
        </RouterLink>
      </article>
    </div>
  </section>
</template>