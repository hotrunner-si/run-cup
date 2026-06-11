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
  min-height: 70vh;
  overflow: hidden;
}

.hero-img {
  width: 100%;
  height: 100%;
  min-height: 70vh;
  object-fit: cover;
}

.hero-content {
  position: absolute;
  left: clamp(1rem, 5vw, 3rem);
  right: 1rem;
  bottom: clamp(2rem, 8vw, 3rem);
  max-width: 700px;
}

.hero h1 {
  font-size: clamp(2rem, 7vw, 3rem);
  line-height: 1.05;
  margin: 0.5rem 0;
  color: white;
}

.hero p {
  font-size: clamp(0.95rem, 3vw, 1.1rem);
  opacity: 0.9;
  margin-bottom: 1rem;
  color: rgb(221, 221, 221);
}

.hero-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
}

.hero-meta span {
  margin-right: 0;
  opacity: 0.85;
  color: rgb(196, 209, 221);
}

@media (max-width: 600px) {
  .hero {
    min-height: 62vh;
  }

  .hero-img {
    min-height: 62vh;
  }

  .desc {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}
</style>