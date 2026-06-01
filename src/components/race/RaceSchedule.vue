<template>
  <RaceSection
    id="schedule"
    title="Časovnica"
    :open="open"
    @toggle="$emit('toggle')"
  >

    <div class="timeline">
      <div
        v-for="(item, i) in race.schedule"
        :key="i"
        class="timeline-item"
      >
        <span class="time">{{ item.time }}</span>
        <span class="event">{{ item.event }}</span>
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

.timeline-item {
  display: flex;
  gap: 1rem;
  padding: 0.5rem 0;
  border-left: 2px solid var(--border);
  padding-left: 1rem;
}

.time {
  width: 70px;
  opacity: 0.7;
}

</style>