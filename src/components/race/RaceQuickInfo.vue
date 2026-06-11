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
  <section class="section">
    <div class="mobile-actions">
      <a
        v-if="race.links?.pdfInfo"
        class="btn primary"
        :href="race.links.pdfInfo"
        target="_blank"
        rel="noopener"
      >
        Uradni razpis
      </a>

      <a
        v-if="race.links?.registration"
        class="btn"
        :href="race.links.registration"
        target="_blank"
        rel="noopener"
      >
        Prijavim.se
      </a>
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

.mobile-actions {
  display: none;
}

@media (max-width: 900px) {
  .mobile-actions {
    display: grid;
    margin: -0.5rem 0 2rem;
  }

  .mobile-actions .btn {
    border-radius: 10px;
    background: var(--bg-card);
    color: var(--text);
    text-decoration: none;
    text-align: center;
    font-weight: 600;
  }

  .mobile-actions .btn.primary {
    background: var(--secondary);
  }
}
</style>