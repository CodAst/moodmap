(function () {
    const KEY_ONBOARDING = "moodmap_onboarding_seen";
  
    function hasSeenOnboarding() {
      return localStorage.getItem(KEY_ONBOARDING) === "1";
    }
  
    function setSeenOnboarding() {
      localStorage.setItem(KEY_ONBOARDING, "1");
    }
  
    // (Opcional) para reiniciar demo desde consola:
    // MoodMapStorage.resetOnboarding()
    function resetOnboarding() {
      localStorage.removeItem(KEY_ONBOARDING);
    }
  
    window.MoodMapStorage = {
      hasSeenOnboarding,
      setSeenOnboarding,
      resetOnboarding,
    };
  })();
  