<template>
  <RaceSection
    id="categories"
    title="Kategorije"
    :open="open"
    @toggle="$emit('toggle')"
  >
    <div class="chips">
      <span
        v-for="c in race.categories"
        :key="c"
        class="chip"
      >
        {{ c }}
      </span>
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

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.chip {
  background: var(--bg-soft);
  padding: 0.4rem 0.8rem;
  border-radius: 999px;
}


</style>