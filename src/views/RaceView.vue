<template>
  <div v-if="race" class="race-page">

    <RaceHero :race="race" />

    <div class="page-container">
      <div class="layout">

        <main class="content">

          <RaceQuickInfo :race="race" />

          <RaceRegistration
            :race="race"
            :open="openSection === 'registration'"
            @toggle="toggleSection('registration')"
          />

          <RaceCategories 
            :race="race"
            :open="openSection === 'categories'"
            @toggle="toggleSection('categories')"
          />

          <RaceDay 
            :race="race"
            :open="openSection === 'day'"
            @toggle="toggleSection('day')"
          />

          <RaceSchedule 
            :race="race"
            :open="openSection === 'schedule'"
            @toggle="toggleSection('schedule')"
          />

          <RaceCourses 
            :race="race" 
            :open="openSection === 'courses'"
            @toggle="toggleSection('courses')"
          />

          <RaceGallery 
            :race="race"
          />

        </main>

        <RaceSidebar :race="race" />

      </div>
    </div>
  </div>

  <div v-else class="not-found">
    Tekma ne obstaja.
  </div>

</template>


<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { kamnik_races } from '@/data/races'
import RaceHero from '@/components/race/RaceHero.vue'
import RaceQuickInfo from '@/components/race/RaceQuickInfo.vue'
import RaceRegistration from '@/components/race/RaceRegistration.vue'
import RaceCategories from '@/components/race/RaceCategories.vue'
import RaceDay from '@/components/race/RaceDay.vue'
import RaceSchedule from '@/components/race/RaceSchedule.vue'
import RaceCourses from '@/components/race/RaceCourses.vue'
import RaceGallery from '@/components/race/RaceGallery.vue'
import RaceSidebar from '@/components/race/RaceSidebar.vue'

const route = useRoute()

const race = computed(() =>
  kamnik_races.find(r => r.slug === route.params.slug)
)

// MOBILE ACCORDION STATE
const openSection = ref(null)

function toggleSection(name) {
  openSection.value = openSection.value === name ? null : name
}
</script>

<style scoped>
.race-page {
  color: var(--text);
  background: var(--bg);
}

.layout {
  display: grid;
  grid-template-columns: 1fr clamp(180px, 18vw, 260px);
  gap: 3rem;
  padding-block: 3rem;
}

@media (max-width: 900px) {
  .layout {
    grid-template-columns: 1fr;
  }
}

.section {
  margin-bottom: 4rem;
}

.section h2 {
  color: var(--text);
  font-size: 1.6rem;
  margin-bottom: 1.5rem;
}

/* COLLAPSIBLE (MOBILE) */
.section-title {
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}

.mobile-toggle {
  display: none;
}

/* desktop = vedno odprto */
.collapsible {
  display: block;
}

/* MOBILE */
@media (max-width: 900px) {

  .mobile-toggle {
    display: inline;
  }

  .collapsible {
    display: none;
  }

  .collapsible.open {
    display: block;
  }
}

@media (max-width: 900px) {

  .layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .layout {
    display: block;
    padding: 1.5rem;
  }
}


</style>