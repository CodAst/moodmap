(function () {
    // Si alguien entra directo a bienvenida sin haber visto slides,
    // lo mandamos a slides (opcional, pero recomendado).
    if (!window.MoodMapStorage?.hasSeenOnboarding()) {
      window.location.replace("slides.html");
    }
  })();
  