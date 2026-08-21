<script setup>
import { ref } from 'vue'

const skillsPreview = ['TensorFlow', 'Pytorch', 'Express', 'Laravel', 'Vue', 'FastAPI', 'Tailwind', 'Scikit-learn']
const photoError = ref(false)
</script>

<template>
  <section id="about" class="relative max-w-6xl mx-auto px-6 pt-32 pb-24 md:pt-40 md:pb-32">
    <div class="grid md:grid-cols-[1.3fr,1fr] gap-10 items-start">
      <!-- Main intro pinned card -->
      <div class="relative pin-card p-8 md:p-10 -rotate-1" v-reveal>
        <span class="tape bg-sun/80 -top-3 left-8 -rotate-6 rounded-sm"></span>
        <span class="pin-dot bg-coral -top-2 right-10"></span>

        <p class="font-mono text-sm text-coral mb-3">Halo, perkenalkan 👋</p>
        <h1 class="font-display font-bold text-4xl md:text-6xl leading-[1.05] mb-5">
          Saya Naufal -<br />
          <span class="text-coral">Full-Stack</span> &amp;
          <span class="text-sky">AI</span> Developer.
        </h1>
        <p class="font-body text-ink/70 text-base md:text-lg max-w-xl leading-relaxed mb-6">
          Programmer dengan minat besar dalam pengembangan aplikasi berbasis web dan kecerdasan buatan. 
          Memiliki keterampilan pada Laravel, Express, Vue, serta Git/GitHub untuk membangun serta 
          mengelola aplikasi berbasis web. Mendalami untuk membangun project Machine Learning, Deep Learning, 
          dan Large Language Model (LLM)
        </p>

        <div class="flex flex-wrap gap-3 mb-8">
          <span
            v-for="s in skillsPreview"
            :key="s"
            class="font-mono text-xs bg-paper border border-ink/15 px-3 py-1.5 rounded-full"
          >{{ s }}</span>
        </div>

        <div class="flex flex-wrap gap-4">
          <a
            href="#projects"
            class="inline-flex items-center gap-2 bg-coral text-paper font-body font-semibold px-6 py-3 rounded-full shadow-pin hover:shadow-pinHover hover:-translate-y-0.5 transition-all"
          >
            Lihat project saya
          </a>
          <a
            href="#contact"
            class="inline-flex items-center gap-2 border-2 border-ink font-body font-semibold px-6 py-3 rounded-full hover:bg-ink hover:text-paper transition-colors"
          >
            Say hi ✉️
          </a>
        </div>
      </div>

      <!-- Polaroid-style photo -->
      <div class="relative pin-card p-4 pb-14 rotate-3 max-w-xs mx-auto md:mx-0 md:mt-8" v-reveal>
        <span class="tape bg-sky/80 -top-3 -right-4 rotate-12 rounded-sm"></span>
        <div class="aspect-[4/5] rounded overflow-hidden bg-ink/5">
          <img
            v-if="!photoError"
            src="/naufal.jpeg"
            alt="Foto Naufal"
            class="w-full h-full object-cover"
            @error="photoError = true"
          />
          <div
            v-else
            class="w-full h-full bg-gradient-to-br from-sun/40 via-coral/20 to-sky/30 flex items-center justify-center"
          >
            <span class="font-display font-semibold text-ink/40 text-sm">Foto kamu disini</span>
          </div>
        </div>
        <p class="font-mono text-xs text-center mt-4 text-ink/60">est. {{ new Date().getFullYear() }}</p>
      </div>
    </div>
  </section>
</template>
