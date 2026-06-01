<template>
  <footer>
    <div class="container footer">
      <div>
        <h3>Pokal Kamnik</h3>
        <p>Trail in gorski teki v Kamniku.</p>
      </div>

      <div>
        <h4>Linki</h4>
        <a href="#tekme">Tekme</a>
        <a href="#">Kontakt</a>
      </div>

      <div>
        <h4>Organizatorji</h4>
        <p>KGT Papež</p>
        <p>TPD Ultra</p>
      </div>
    </div>

    <div class="bottom">
      © 2026 Tekaški Pokal Občine Kamnik.
      <a href="https://nejc-ursic.netlify.app">
        Avtor
      </a>
    </div>
  </footer>
</template>

<style scoped>
footer {
  border-top: 1px solid rgba(255,255,255,0.1);
  padding-top: 60px;
}

.footer {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  padding-bottom: 40px;
}



.bottom {
  text-align: center;
  padding: 20px;
  color: var(--text-soft);
  border-top: 1px solid var(--border);
  padding: 1.25rem 1.5rem;
  
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  flex-wrap: wrap;
  text-align: center;
  font-size: 0.85rem;
}


@media (max-width: 768px) {
  .footer {
    grid-template-columns: 1fr;
  }
}
</style>