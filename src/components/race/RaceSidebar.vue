<template>
  <aside class="sidebar">
    <div class="sticky">

      <a class="btn primary" :href="race.links.pdfInfo" target="_blank">
        Uradni razpis
      </a>

      <a class="btn" :href="race.links.registration">
        Prijavim.se
      </a>

      <nav class="race-nav">
        <a href="#info">Pregled</a>
        <a href="#registration">Prijave</a>
        <a href="#raceday">Dan tekme</a>
        <a href="#schedule">Časovnica</a>
        <a href="#courses">Proge</a>
        <a href="#gallery">Galerija</a>
      </nav>

      <div class="box">
        <h4>Hitre informacije</h4>
        <p><strong>Datum:</strong> {{ race.hero.date }}</p>
        <p><strong>Start:</strong> {{ race.hero.startTime }}</p>
        <p><strong>Kraj:</strong> {{ race.hero.location }}</p>
      </div>

    </div>
  </aside>
</template>

<script setup>
  defineProps({
    race: Object
  })

</script>

<style scoped>

.sidebar {
  position: relative;
  color: var(--text);
}

.sticky {
  position: sticky;
  top: 100px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.race-nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  background: var(--bg-card);
  border-radius: 12px;
}

.race-nav a {
  color: var(--text);
  text-decoration: none;
  font-size: 0.9rem;
  padding: 0.3rem 0;
  border-left: 2px solid transparent;
  padding-left: 0.5rem;
}

.race-nav a:hover {
  border-left: 2px solid #3b82f6;
}

.btn {
  padding: 0.8rem 1rem;
  border-radius: 10px;
  background: var(--bg-card);
  color: var(--text);
  text-decoration: none;
  text-align: center;
}

.btn.primary {
  background: var(--secondary);
}

.btn.primary:hover {
  background: var(--secondary-hover);
}

.box {
  background: var(--bg-card);
  padding: 1rem;
  border-radius: 12px;
}

@media (max-width: 900px) {
  .sidebar {
    display: none;
  }
}

</style>