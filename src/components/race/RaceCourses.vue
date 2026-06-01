<template>
  <RaceSection
    id="courses"
    title="Proge"
    :open="open"
    @toggle="$emit('toggle')"
  >

    <div
      v-for="course in race.courses"
      :key="course.name"
      class="course"
    >

      <div class="course-header">
        <h3>{{ course.name }}</h3>

        <div class="course-meta">
          <span>{{ course.distance }}</span>
          <span>{{ course.elevation }}</span>
          <span>{{ course.timeLimit }}</span>
        </div>
      </div>

      <p class="course-desc">{{ course.description }}</p>

      <div class="course-media">
        <img :src="course.mapImage" />
        <img :src="course.elevationProfile" />
      </div>

    </div>

  </RaceSection>
</template>

<script setup>
import RaceSection from './RaceSection.vue'

defineProps({
  race: Object,
  open: Boolean
})

defineEmits(['toggle'])
</script>
<style scoped>

.course {
  background: var(--bg-card);
  padding: 1.5rem;
  border-radius: 14px;
  margin-bottom: 1.5rem;
}

.course-meta {
  display: flex;
  gap: 1rem;
  opacity: 0.7;
}

.course-media img {
  width: 100%;
  margin-top: 1rem;
  border-radius: 10px;
}

</style>