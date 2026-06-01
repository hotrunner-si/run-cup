<template>
  <RaceSection
    id="raceday"
    title="Dan tekme"
    :open="open"
    @toggle="$emit('toggle')"
  >
    <div class="info-grid">
      <div>
          <h4>Parkiranje</h4>
          <p>{{ race.raceDayInfo.parking }}</p>
      </div>

      <div>
          <h4>Štartne številke</h4>
          <p>{{ race.raceDayInfo.bibPickup }}</p>
      </div>

      <div>
          <h4>Garderoba</h4>
          <p>{{ race.raceDayInfo.wardrobe }}</p>
      </div>

      <div>
          <h4>Nagrade</h4>
          <p>{{ race.raceDayInfo.awards }}</p>
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

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.info-grid h4 {
  margin-bottom: 0.3rem;
}

</style>