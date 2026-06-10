<template>
  <section class="hero">
    <div class="overlay"></div>

    <div class="content">
      <h1>Doživite Kamnik po tekaških poteh</h1>
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
  background: var(--overlay);
  z-index: 1;
}

.content {
  position: relative;
  max-width: 800px;
  z-index: 2;
}

h1 {
  font-size: 64px;
  color: rgb(255, 255, 255);
}

p {
  margin-top: var(--space-4);
  font-size: 20px;
  color: rgb(219, 238, 247);
}

@media (max-width: 768px) {
  h1 {
    font-size: 38px;
  }
}
</style>