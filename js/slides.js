(function () {
    const slides = Array.from(document.querySelectorAll(".slide"));
    const dots = Array.from(document.querySelectorAll(".dot"));
  
    const btnPrev = document.getElementById("btnPrev");
    const btnNext = document.getElementById("btnNext");
    const btnSkip = document.getElementById("btnSkip");
    const btnStart = document.getElementById("btnStart");
    const srStatus = document.getElementById("srStatus");
  
    let current = 0;
  
    function setActive(index) {
      current = Math.max(0, Math.min(slides.length - 1, index));
  
      slides.forEach((s, i) => {
        const active = i === current;
        s.classList.toggle("is-active", active);
        s.setAttribute("aria-hidden", active ? "false" : "true");
      });
  
      dots.forEach((d, i) => {
        const active = i === current;
        d.classList.toggle("is-active", active);
        d.setAttribute("aria-selected", active ? "true" : "false");
      });
  
      // Accesibilidad: anunciar slide actual
      if (srStatus) srStatus.textContent = `Slide ${current + 1} de ${slides.length}`;
  
      // Ajuste de botones
      btnPrev.disabled = current === 0;
      btnNext.disabled = current === slides.length - 1;
  
      // Mostrar botón Empezar solo en el último slide (por si lo quieres ocultar)
      if (btnStart) {
        btnStart.style.display = (current === slides.length - 1) ? "inline-flex" : "none";
      }
    }
  
    function goNext() {
      if (current >= slides.length - 1) return;
      setActive(current + 1);
    }
  
    function goPrev() {
      if (current <= 0) return;
      setActive(current - 1);
    }
  
    function finish() {
      window.MoodMapStorage?.setSeenOnboarding();
      window.location.href = "bienvenida.html";
    }
  
    // Eventos
    btnNext?.addEventListener("click", goNext);
    btnPrev?.addEventListener("click", goPrev);
    btnSkip?.addEventListener("click", finish);
    btnStart?.addEventListener("click", finish);
  
    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        const idx = Number(dot.dataset.dot);
        if (!Number.isNaN(idx)) setActive(idx);
      });
    });
  
    // Teclado
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "Escape") finish();
    });
  
    // Swipe móvil (simple)
    let xStart = null;
    const container = document.querySelector(".slides");
    container?.addEventListener("touchstart", (e) => {
      xStart = e.touches?.[0]?.clientX ?? null;
    }, { passive: true });
  
    container?.addEventListener("touchend", (e) => {
      if (xStart === null) return;
      const xEnd = e.changedTouches?.[0]?.clientX ?? xStart;
      const diff = xEnd - xStart;
  
      if (Math.abs(diff) > 50) {
        if (diff < 0) goNext();
        else goPrev();
      }
      xStart = null;
    });
  
    // Init
    setActive(0);
  })();
  