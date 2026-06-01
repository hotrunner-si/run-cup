<template>
  <section class="section" id="gallery">
    <h2>Galerija</h2>

    <div class="gallery">
      <img
        v-for="img in race.gallery"
        :key="img"
        :src="img"
      />
    </div>
  </section>
</template>

<script setup>
  defineProps({
    race: Object
  })

</script>

<style scoped>

.gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
}

.gallery img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 10px;
}

</style>