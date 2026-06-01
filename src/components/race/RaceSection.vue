<template>
  <section
    class="section"
    :id="id"
  >

    <h2
      class="section-title"
      @click="$emit('toggle')"
    >
      {{ title }}

      <span class="mobile-toggle">
        {{ open ? '–' : '+' }}
      </span>
    </h2>

    <div
      class="collapsible"
      :class="{ open }"
    >
      <slot />
    </div>

  </section>
</template>

<script setup>
defineProps({
  title: String,
  open: Boolean,
  id: String
})

defineEmits(['toggle'])
</script>

<style scoped>
.section {
  margin-bottom: 4rem;
}

.section-title {
  display: flex;
  justify-content: space-between;
  align-items: center;

  cursor: pointer;

  color: var(--text);
  font-size: 1.6rem;
  margin-bottom: 1.5rem;
}

.mobile-toggle {
  display: none;
}

/* desktop */
.collapsible {
  display: block;
}

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
</style>