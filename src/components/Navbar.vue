<template>
  <div v-if="isMenuOpen" class="overlay" @click="closeMenu" />

  <nav class="navbar">
    <div class="logo">
      <RouterLink :to="{ name: 'home' }">
            Tekaški Pokal Občine Kamnik
          </RouterLink>
    </div>

    <button
      class="hamburger"
      :class="{ open: isMenuOpen }"
      @click="toggleMenu"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>

    <div class="menu" :class="{ open: isMenuOpen }">

      <ul class="nav-links">

        <li>
          <RouterLink :to="{ name: 'home' }">
            Domov
          </RouterLink>
        </li>

        <li class="dropdown" ref="dropdownRef">
          <button
            class="dropdown-btn"
            @click="toggleTekme"
          >
            Tekme
            <span
              class="dropdown-icon"
              :class="{ open: tekmeOpen }"
            >
              ▼
            </span>
          </button>

          <ul
            class="dropdown-menu"
            :class="{ open: tekmeOpen }"
          >
            <li
              v-for="race in kamnik_races"
              :key="race.slug"
            >
              <RouterLink
                :to="{
                  name: 'race',
                  params: { slug: race.slug }
                }"
                @click="closeMenu"
              >
                {{ race.nav }}
              </RouterLink>
            </li>
          </ul>
        </li>

        <li>
          <RouterLink :to="{ name: 'results' }">
            Rezultati
          </RouterLink>
        </li>

        <li>
          <RouterLink :to="{ name: 'sponsors' }">
            Sponzorji
          </RouterLink>
        </li>

      </ul>

    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { kamnik_races } from '@/data/races'

const isMenuOpen = ref(false)
const tekmeOpen = ref(false)
const dropdownRef = ref(null)

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function closeMenu() {
  isMenuOpen.value = false
  tekmeOpen.value = false
}

function toggleTekme() {
  tekmeOpen.value = !tekmeOpen.value
}
function handleClickOutside(event) {
  if (
    dropdownRef.value &&
    !dropdownRef.value.contains(event.target)
  ) {
    tekmeOpen.value = false
  }
}

let scrollTimeout = null

function handleUserScroll() {
  if (!isMenuOpen.value) return

  clearTimeout(scrollTimeout)

  scrollTimeout = setTimeout(() => {
    closeMenu()
  }, 80)
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('scroll', handleUserScroll)
  window.addEventListener('touchmove', handleUserScroll)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('scroll', handleUserScroll)
  window.removeEventListener('touchmove', handleUserScroll)
})

</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding-inline: clamp(1.5rem, 4vw, 5rem);

  background: rgba(0,0,0,0.35);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);

  z-index: 1000;
}

.logo a {
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 800;
  transition: color 0.2s ease;
}

.menu {
  display: flex;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 2rem;

  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-links a,
.dropdown-btn {
  color: white;
  background: none;
  border: none;
  text-decoration: none;
  cursor: pointer;
  font-size: 1rem;
  transition: color 0.2s ease;
}
.logo a:hover,
.nav-links a:hover,
.dropdown-btn:hover {
  color: var(--primary-hover);
}

.dropdown {
  position: relative;
}

.dropdown-icon {
  display: inline-block;
  margin-left: 0.5rem;
  transition: transform 0.25s ease;
}

.dropdown-icon.open {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 0.75rem);
  left: 0;
  list-style: none;

  min-width: 260px;

  display: none;
  flex-direction: column;

  background: rgba(0,0,0,0.35);
  backdrop-filter: blur(12px);

  border: 1px solid var(--border);
  border-radius: 12px;

  padding: 0.5rem;

  box-shadow:
    0 10px 30px rgba(0,0,0,0.25);
}

.dropdown-menu.open {
  display: flex;
}

.dropdown-menu a {
  color: white;
  border-radius: 8px;
  transition:
    color 0.2s ease,
    background 0.2s ease;
}

.dropdown-menu a:hover {
  color: var(--primary-hover);
  background: rgba(255,255,255,0.05);
}

.hamburger {
  display: none;

  width: 28px;
  height: 22px;

  position: relative;

  background: none;
  border: none;
  cursor: pointer;
}

.hamburger span {
  position: absolute;
  width: 100%;
  height: 2px;
  background: rgb(255, 255, 255);
  left: 0;
  transition: 0.3s;
}

.hamburger span:nth-child(1) {
  top: 0;
}

.hamburger span:nth-child(2) {
  top: 10px;
}

.hamburger span:nth-child(3) {
  top: 20px;
}

.hamburger.open span:nth-child(1) {
  top: 10px;
  transform: rotate(45deg);
}

.hamburger.open span:nth-child(2) {
  opacity: 0;
}

.hamburger.open span:nth-child(3) {
  top: 10px;
  transform: rotate(-45deg);
}

.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.3);
  z-index: 999;
}

@media (max-width: 768px) {

  .hamburger {
    display: block;
    z-index: 1200;
  }

  .menu {
    position: fixed;
    top: 0;
    right: 0;

    width: 280px;
    height: 100vh;

    background: rgba(38, 38, 38, 0.75);

    transform: translateX(100%);
    transition: 0.3s;

    padding-top: 5rem;
  }

  .menu.open {
    transform: translateX(0);
  }

  .nav-links {
    width: 100%;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
  }

  .nav-links li {
    width: 100%;
  }

  .nav-links a,
  .dropdown-btn {
    width: 100%;
    display: block;
    padding: 1rem 1.5rem;
    text-align: left;
  }
  .dropdown-btn {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  .dropdown {
    width: 100%;
  }

  .dropdown-menu {
    position: static;
    display: none;
    background: rgba(38, 38, 38, 0.75);
    border-radius: 0;
    padding: 0;
  }

  .dropdown-menu.open {
    display: flex;
  }

  .dropdown-menu a {
    padding-left: 3rem;
  }
}
</style>