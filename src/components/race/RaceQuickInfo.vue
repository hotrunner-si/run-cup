<template>
  <section class="section cards" id="info">
    <div class="card">
      <div class="label">Datum</div>
      <div class="value">{{ race.hero.date }}</div>
    </div>

    <div class="card">
      <div class="label">Start</div>
      <div class="value">{{ race.hero.startTime }}</div>
    </div>

    <div class="card">
      <div class="label">Organizator</div>
      <div class="value">{{ race.hero.organizer }}</div>
    </div>
  </section>
</template>

<script setup>
  defineProps({
    race: Object
  })

</script>

<style scoped>
.cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.card {
  background: var(--bg-elevated);
  padding: 1rem;
  border-radius: var(--radius-md);
}

.label {
  opacity: 0.6;
  font-size: 0.8rem;
}

.value {
  font-size: 1.1rem;
  margin-top: 0.3rem;
}

</style>