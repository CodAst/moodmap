(function () {
    // Si no hay onboarding, vuelve a slides
    if (!window.MoodMapStorage?.hasSeenOnboarding()) {
      window.location.replace("slides.html");
      return;
    }
  
    // Si no hay email guardado, volver al login
    const email = window.MoodMapStorage?.getEmail?.() || "";
    if (!email) {
      window.location.replace("inicio.html");
      return;
    }
  
    const form = document.getElementById("nameForm");
    const nameInput = document.getElementById("fullName");
    const nameError = document.getElementById("nameError");
    const btnFill = document.getElementById("btnFill");
  
    // precargar nombre si existía
    const savedName = window.MoodMapStorage?.getName?.() || "";
    if (savedName) nameInput.value = savedName;
  
    function setError(on) {
      nameInput.classList.toggle("is-error", on);
      nameError.style.display = on ? "block" : "none";
    }
  
    function isValidName(name) {
      const v = String(name || "").trim();
      return v.length >= 3;
    }
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = nameInput.value;
  
      if (!isValidName(name)) {
        setError(true);
        nameInput.focus();
        return;
      }
  
      setError(false);
      window.MoodMapStorage?.setName?.(name);
  
      // Próxima pantalla (la haremos luego)
      window.location.href = "sentimiento.html";
    });
  
    nameInput.addEventListener("input", () => setError(false));
  
    btnFill.addEventListener("click", () => {
      // demo: relleno rápido
      nameInput.value = nameInput.value || "Melanie";
      setError(false);
      nameInput.focus();
    });
  })();
  