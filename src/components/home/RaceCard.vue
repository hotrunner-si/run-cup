<template>
  <RouterLink :to="`/tekma/${race.slug}`" class="card">
    <img :src="race.hero.image" />

    <div class="info">
      <div class="date">{{ race.hero.date }}</div>
      <h3>{{ race.hero.title }}</h3>
      <p>{{ race.hero.location }}</p>
    </div>
  </RouterLink>
</template>

<script setup>
defineProps({
  race: Object,
})
</script>

<style scoped>
.card {
  display: block;
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  overflow: hidden;
  text-decoration: none;
  color: var(--text);
  transition: var(--transition);
  box-shadow: var(--shadow-sm);
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-md);
}

img {
  width: 100%;
  height: 260px;
  object-fit: cover;
  transition: 0.5s;
}

.card:hover img {
  transform: scale(1.1);
}

.info {
  padding: 16px;
}

.date {
  color: var(--primary);
  font-weight: 600;
  font-size: 14px;
}

h3 {
  margin-top: 8px;
  font-size: 20px;
}

p {
  margin-top: 6px;
  opacity: 0.7;
}
</style>