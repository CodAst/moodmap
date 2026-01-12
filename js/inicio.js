(function () {
    // Si alguien entra directo sin onboarding, lo mandamos a slides
    if (!window.MoodMapStorage?.hasSeenOnboarding()) {
      window.location.replace("slides.html");
      return;
    }
  
    const form = document.getElementById("loginForm");
    const emailInput = document.getElementById("email");
    const emailError = document.getElementById("emailError");
    const btnClear = document.getElementById("btnClear");
  
    // Si ya había email guardado, lo precargamos
    const savedEmail = window.MoodMapStorage?.getEmail?.() || "";
    if (savedEmail) emailInput.value = savedEmail;
  
    function setError(on) {
      emailInput.classList.toggle("is-error", on);
      emailError.style.display = on ? "block" : "none";
    }
  
    function isValidUpsEmail(email) {
      const v = String(email || "").trim();
      // Acepta usuario@est.ups.edu.ec
      return /^[^\s@]+@est\.ups\.edu\.ec$/i.test(v);
    }
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const email = emailInput.value;
      if (!isValidUpsEmail(email)) {
        setError(true);
        emailInput.focus();
        return;
      }
  
      setError(false);
      window.MoodMapStorage?.setEmail?.(email);
      window.location.href = "nombre.html";
    });
  
    emailInput.addEventListener("input", () => setError(false));
  
    btnClear.addEventListener("click", () => {
      emailInput.value = "";
      setError(false);
      emailInput.focus();
    });
  })();
  