<template>
  <section class="hero">
    <img :src="race.hero.image" class="hero-img" />

    <div class="hero-overlay" />

    <div class="hero-content">
      <p class="kicker">{{ race.hero.nav }}</p>
      <h1>{{ race.hero.title }}</h1>
      <p class="desc">{{ race.hero.description }}</p>

      <div class="hero-meta">
        <span>📅 {{ race.hero.date }}</span>
        <span>🕒 {{ race.hero.startTime }}</span>
        <span>📍 {{ race.hero.location }}</span>
      </div>
    </div>
  </section>
</template>

<script setup>
  defineProps({
    race: Object
  })

</script>

<style scoped>
  .hero {
    position: relative;
    height: 70vh;
    overflow: hidden;

  }

  .hero-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      rgba(0,0,0,0.45),
      rgba(0,0,0,0.1)
    );
  }

  .hero-content {
    position: absolute;
    bottom: 3rem;
    left: 3rem;
    max-width: 700px;
  }

  .kicker {
    text-transform: uppercase;
    opacity: 0.7;
    font-size: 0.9rem;
  }

  .hero h1 {
    font-size: 3rem;
    margin: 0.5rem 0;
    color: var(--secondary);
  }
  .hero p {
    font-size: 1.1rem;
    opacity: 0.9;
    margin-bottom: 1rem;
    color: rgb(196, 209, 221)
  }

  .hero-meta span {
    margin-right: 1rem;
    opacity: 0.85;
    color: rgb(196, 209, 221);
  }

</style>