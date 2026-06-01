<template>
  <RaceSection
    id="registration"
    title="Prijave"
    :open="open"
    @toggle="$emit('toggle')"
  >
    <div class="grid-2">
      <div>
        <p><strong>Odprtje:</strong> {{ race.registration.opens }}</p>
        <p><strong>Zaključek:</strong> {{ race.registration.closes }}</p>
      </div>
    </div>

    <div class="pricing">
      <div
        v-for="(p, i) in race.registration.pricing"
        :key="i"
        class="price-row"
      >
        <span>{{ p.until }}</span>
        <strong>{{ p.price }}</strong>
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

.pricing {
  margin-top: 1rem;
}

.price-row {
  display: flex;
  justify-content: space-between;
  padding: 0.6rem 0;
  border-bottom: 1px solid #1d2635;
}


</style>