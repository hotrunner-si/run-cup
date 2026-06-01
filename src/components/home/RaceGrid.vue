<template>
  <section id="tekme" class="container section">
    <h2>Tekme 2026</h2>

    <div class="grid grid-3">
      <RaceCard v-for="r in kamnik_races" :key="r.slug" :race="r" />
    </div>
  </section>
</template>

<script setup>
import RaceCard from '@/components/home/RaceCard.vue'
import { kamnik_races } from '@/data/races'
</script>

<style scoped>
.section {
  padding: var(--space-8) 0;
}

h2 {
  text-align: center;
  font-size: 42px;
  margin-bottom: var(--space-7);
}
</style>