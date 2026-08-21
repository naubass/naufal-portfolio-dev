<script setup>
import { computed, ref, reactive, onMounted, onUnmounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { projects } from '../data/projects'

const route = useRoute()
const project = computed(() =>
  projects.find((p) => String(p.id) === String(route.params.id))
)

const imgError = reactive({})
function onImgError(idx) {
  imgError[idx] = true
}

// Lightbox state
const lightboxIndex = ref(null)
function openLightbox(idx) {
  lightboxIndex.value = idx
}
function closeLightbox() {
  lightboxIndex.value = null
}
function nextImage() {
  if (lightboxIndex.value === null || !project.value) return
  lightboxIndex.value = (lightboxIndex.value + 1) % project.value.images.length
}
function prevImage() {
  if (lightboxIndex.value === null || !project.value) return
  const len = project.value.images.length
  lightboxIndex.value = (lightboxIndex.value - 1 + len) % len
}

function onKeydown(e) {
  if (lightboxIndex.value === null) return
  if (e.key === 'Escape') closeLightbox()
  if (e.key === 'ArrowRight') nextImage()
  if (e.key === 'ArrowLeft') prevImage()
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <section class="relative max-w-4xl mx-auto px-6 pt-32 pb-24">
    <div v-if="project">
      <RouterLink
        to="/"
        class="marker-link font-mono text-sm inline-flex items-center gap-1 mb-8"
      >
        ← Kembali ke semua project
      </RouterLink>

      <!-- Header -->
      <div class="relative pin-card p-6 md:p-8 -rotate-1 mb-8" v-reveal>
        <span class="tape bg-sun/70 -top-3 left-8 -rotate-6 rounded-sm z-10"></span>
        <span class="pin-dot" :class="`bg-${project.color}`" style="top: -0.5rem; right: 2rem"></span>

        <span
          class="font-mono text-xs px-2.5 py-1 rounded-full inline-block mb-4"
          :class="`bg-${project.color}/15 text-${project.color === 'sun' ? 'ink' : project.color}`"
        >{{ project.tag }}</span>

        <h1 class="font-display font-bold text-3xl md:text-5xl mb-4">{{ project.title }}</h1>
        <p class="font-body text-ink/70 leading-relaxed">{{ project.description }}</p>
      </div>

      <!-- Photo gallery -->
      <div class="relative pin-card p-6 md:p-8 rotate-1 mb-8" v-reveal>
        <h2 class="font-display font-semibold text-xl mb-4">Galeri</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <button
            v-for="(img, idx) in project.images"
            :key="img"
            type="button"
            class="relative aspect-video rounded overflow-hidden bg-ink/5 group"
            @click="openLightbox(idx)"
          >
            <img
              v-if="!imgError[idx]"
              :src="img"
              :alt="`${project.title} foto ${idx + 1}`"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
              @error="onImgError(idx)"
            />
            <div
              v-else
              class="w-full h-full flex items-center justify-center"
              :class="`bg-gradient-to-br from-${project.color}/30 via-${project.color}/10 to-transparent`"
            >
              <span class="font-mono text-[10px] text-ink/40">Foto {{ idx + 1 }}</span>
            </div>
            <div class="absolute inset-0 bg-ink/0 group-hover:bg-ink/10 transition-colors"></div>
          </button>
        </div>
      </div>

      <div class="grid md:grid-cols-[1.4fr,1fr] gap-8">
        <!-- Full story -->
        <div class="relative pin-card p-6 md:p-8 rotate-1" v-reveal>
          <h2 class="font-display font-semibold text-xl mb-3">Cerita di balik project ini</h2>
          <p class="font-body text-ink/70 leading-relaxed whitespace-pre-line">{{ project.fullDescription }}</p>

          <h2 class="font-display font-semibold text-xl mt-8 mb-3">Fitur utama</h2>
          <ul class="space-y-2">
            <li
              v-for="f in project.features"
              :key="f"
              class="font-body text-ink/70 text-sm flex items-start gap-2"
            >
              <span class="text-coral mt-1">✦</span>
              <span>{{ f }}</span>
            </li>
          </ul>
        </div>

        <!-- Side info card -->
        <div class="relative pin-card p-6 md:p-8 -rotate-1 h-fit" v-reveal>
          <span class="tape bg-sky/70 -top-3 right-8 rotate-6 rounded-sm z-10"></span>

          <h2 class="font-mono text-xs uppercase tracking-widest text-ink/50 mb-3">Tech stack</h2>
          <div class="flex flex-wrap gap-2 mb-8">
            <span
              v-for="t in project.stack"
              :key="t"
              class="font-mono text-[11px] border border-ink/15 px-2 py-1 rounded"
            >{{ t }}</span>
          </div>

          <div class="flex flex-col gap-3">
            <a
              :href="project.demoLink"
              class="inline-flex items-center justify-center gap-2 bg-coral text-paper font-body font-semibold px-5 py-3 rounded-full shadow-pin hover:shadow-pinHover hover:-translate-y-0.5 transition-all"
            >
              Lihat demo →
            </a>
            <a
              :href="project.githubLink"
              class="inline-flex items-center justify-center gap-2 border-2 border-ink font-body font-semibold px-5 py-3 rounded-full hover:bg-ink hover:text-paper transition-colors"
            >
              Lihat kode di GitHub
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Fallback when id doesn't match any project -->
    <div v-else class="relative pin-card p-10 text-center rotate-1" v-reveal>
      <p class="font-display font-semibold text-2xl mb-2">Project tidak ditemukan</p>
      <p class="font-body text-ink/60 mb-6">Sepertinya link ini salah atau project-nya sudah dihapus.</p>
      <RouterLink
        to="/"
        class="inline-flex items-center gap-2 bg-ink text-paper font-body font-semibold px-6 py-3 rounded-full hover:bg-coral transition-colors"
      >
        ← Kembali ke beranda
      </RouterLink>
    </div>
  </section>

  <!-- Lightbox overlay -->
  <div
    v-if="project && lightboxIndex !== null"
    class="fixed inset-0 z-[100] bg-ink/90 flex items-center justify-center px-4"
    @click.self="closeLightbox"
  >
    <button
      type="button"
      class="absolute top-5 right-5 text-paper font-mono text-sm border border-paper/30 rounded-full w-10 h-10 flex items-center justify-center hover:bg-paper/10 transition-colors"
      @click="closeLightbox"
      aria-label="Tutup"
    >✕</button>

    <button
      v-if="project.images.length > 1"
      type="button"
      class="absolute left-3 md:left-8 text-paper font-mono text-2xl border border-paper/30 rounded-full w-11 h-11 flex items-center justify-center hover:bg-paper/10 transition-colors"
      @click="prevImage"
      aria-label="Sebelumnya"
    >‹</button>

    <img
      :src="project.images[lightboxIndex]"
      :alt="`${project.title} foto ${lightboxIndex + 1}`"
      class="max-h-[85vh] max-w-full rounded shadow-2xl"
    />

    <button
      v-if="project.images.length > 1"
      type="button"
      class="absolute right-3 md:right-8 text-paper font-mono text-2xl border border-paper/30 rounded-full w-11 h-11 flex items-center justify-center hover:bg-paper/10 transition-colors"
      @click="nextImage"
      aria-label="Berikutnya"
    >›</button>

    <span class="absolute bottom-5 font-mono text-xs text-paper/70">
      {{ lightboxIndex + 1 }} / {{ project.images.length }}
    </span>
  </div>
</template>