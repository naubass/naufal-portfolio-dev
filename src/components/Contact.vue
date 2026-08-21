<script setup>
import { ref } from 'vue'

// GANTI dengan endpoint Formspree kamu, contoh: 'https://formspree.io/f/xxxxxxxx'
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xyegobbg'

const form = ref({ name: '', email: '', message: '' })
const sent = ref(false)
const sending = ref(false)
const error = ref(false)

async function handleSubmit() {
  sending.value = true
  error.value = false

  try {
    const res = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: JSON.stringify({
        name: form.value.name,
        email: form.value.email,
        message: form.value.message,
      }),
    })

    if (res.ok) {
      sent.value = true
    } else {
      error.value = true
    }
  } catch (e) {
    error.value = true
  } finally {
    sending.value = false
  }
}
</script>

<template>
  <section id="contact" class="relative max-w-3xl mx-auto px-6 py-24">
    <div class="mb-10 text-center" v-reveal>
      <p class="font-mono text-sm text-coral mb-2">// kirim kartu pos</p>
      <h2 class="font-display font-bold text-3xl md:text-5xl">Yuk ngobrol</h2>
      <p class="font-body text-ink/60 mt-3">Ada project atau ide? Kabari saya lewat form di bawah.</p>
    </div>

    <form
      v-if="!sent"
      class="relative pin-card p-8 md:p-10 rotate-1"
      v-reveal
      @submit.prevent="handleSubmit"
    >
      <span class="tape bg-coral/80 -top-3 left-1/2 -translate-x-1/2 -rotate-2 rounded-sm"></span>

      <div class="grid sm:grid-cols-2 gap-5 mb-5">
        <div>
          <label class="font-mono text-xs text-ink/60 block mb-1.5">Nama</label>
          <input
            v-model="form.name"
            type="text"
            required
            placeholder="Nama kamu"
            class="w-full bg-paper border-2 border-ink/15 rounded-lg px-4 py-2.5 focus:border-coral focus:outline-none transition-colors"
          />
        </div>
        <div>
          <label class="font-mono text-xs text-ink/60 block mb-1.5">Email</label>
          <input
            v-model="form.email"
            type="email"
            required
            placeholder="kamu@email.com"
            class="w-full bg-paper border-2 border-ink/15 rounded-lg px-4 py-2.5 focus:border-coral focus:outline-none transition-colors"
          />
        </div>
      </div>

      <div class="mb-6">
        <label class="font-mono text-xs text-ink/60 block mb-1.5">Pesan</label>
        <textarea
          v-model="form.message"
          required
          rows="4"
          placeholder="Ceritakan project atau ide kamu..."
          class="w-full bg-paper border-2 border-ink/15 rounded-lg px-4 py-2.5 focus:border-coral focus:outline-none transition-colors resize-none"
        ></textarea>
      </div>

      <p v-if="error" class="font-mono text-xs text-coral mb-4">
        Gagal mengirim. Coba lagi atau email langsung ya.
      </p>

      <button
        type="submit"
        :disabled="sending"
        class="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-ink text-paper font-body font-semibold px-8 py-3 rounded-full hover:bg-coral transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ sending ? 'Mengirim...' : 'Kirim terbang ✈️' }}
      </button>
    </form>

    <div v-else class="relative pin-card p-10 text-center rotate-1" v-reveal>
      <span class="pin-dot bg-sun -top-2 left-1/2 -translate-x-1/2"></span>
      <p class="font-display font-semibold text-2xl mb-2">Terkirim! 🎉</p>
      <p class="font-body text-ink/60">Terima kasih, saya akan balas secepatnya.</p>
    </div>
  </section>
</template>