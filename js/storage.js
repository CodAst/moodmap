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
  
  (function () {
    const KEY_ONBOARDING = "moodmap_onboarding_seen";
    const KEY_EMAIL = "moodmap_user_email";
    const KEY_NAME = "moodmap_user_name";
  
    function hasSeenOnboarding() {
      return localStorage.getItem(KEY_ONBOARDING) === "1";
    }
  
    function setSeenOnboarding() {
      localStorage.setItem(KEY_ONBOARDING, "1");
    }
  
    function resetOnboarding() {
      localStorage.removeItem(KEY_ONBOARDING);
    }
  
    function setEmail(email) {
      localStorage.setItem(KEY_EMAIL, String(email || "").trim());
    }
  
    function getEmail() {
      return localStorage.getItem(KEY_EMAIL) || "";
    }
  
    function setName(name) {
      localStorage.setItem(KEY_NAME, String(name || "").trim());
    }
  
    function getName() {
      return localStorage.getItem(KEY_NAME) || "";
    }
  
    function clearUser() {
      localStorage.removeItem(KEY_EMAIL);
      localStorage.removeItem(KEY_NAME);
    }
  
    window.MoodMapStorage = {
      hasSeenOnboarding,
      setSeenOnboarding,
      resetOnboarding,
      setEmail,
      getEmail,
      setName,
      getName,
      clearUser,
    };
  })();
  