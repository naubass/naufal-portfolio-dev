<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div class="min-h-screen font-body text-ink">
    <Navbar />
    <main>
      <RouterView />
    </main>
    <Footer />
  </div>
</template>
