<template>
  <section class="hero">
    <div class="overlay"></div>

    <div class="content">
      <h1>Tekaški pokal Kamnik 2026</h1>
      <p>Gorski teki, traili in krosi v Kamniških Alpah</p>
      <a href="#tekme" class="btn">Poglej tekme</a>
    </div>
  </section>
</template>

<style scoped>
.hero {
  height: 100vh;
  background: url("/images/trail-vp-gore.jpg");
  background-size: cover;
  background-position: center;
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.overlay {
  position: absolute;
  inset: 0;
  background: var(--bg-overlay);
}

.content {
  position: relative;
  max-width: 800px;
}

h1 {
  font-size: 64px;
  color: rgb(238, 238, 238);
}

p {
  margin-top: var(--space-4);
  font-size: 20px;
  color: var(--text-soft);
}

@media (max-width: 768px) {
  h1 {
    font-size: 38px;
  }
}
</style>