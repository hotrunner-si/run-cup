<template>
  <footer>
    <div class="container footer">
      <div>
        <h3>Tekaški Pokal Občine Kamnik</h3>
        <p>Trail tek, gorski tek in kros.</p>
      </div>

      <div class="footer-links">
        <RouterLink to="/#tekme">Tekme</RouterLink>
        <RouterLink to="/rezultati">Rezultati</RouterLink>
      </div>

      <div>
        <h3>Občina Kamnik</h3>
        
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

.footer {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  padding-bottom: var(--space-4);
  border-top: 1px solid var(--border);
  padding-top: 60px;
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.footer :deep(a) {
  color: var(--text);
  text-decoration: none;
}
.footer :deep(a):hover {
  color: var(--text);
  text-decoration: underline;
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
.bottom a {
  color: var(--text);
  text-decoration: none;
}
.bottom a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .footer {
    grid-template-columns: 1fr;
  }
}

</style>