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
  
  (function () {
    const KEY_ONBOARDING = "moodmap_onboarding_seen";
    const KEY_EMAIL = "moodmap_user_email";
    const KEY_NAME = "moodmap_user_name";
  
    // NUEVO: moods por fecha
    const KEY_MOODS = "moodmap_moods_by_date";
  
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
  
    // ======== Mood data helpers ========
    function todayKey() {
      // YYYY-MM-DD
      const d = new Date();
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${y}-${m}-${day}`;
    }
  
    function safeParse(json, fallback) {
      try { return JSON.parse(json); } catch { return fallback; }
    }
  
    function getAllMoods() {
      const raw = localStorage.getItem(KEY_MOODS);
      return raw ? safeParse(raw, {}) : {};
    }
  
    function saveAllMoods(obj) {
      localStorage.setItem(KEY_MOODS, JSON.stringify(obj));
    }
  
    function getMoodByDate(dateStr) {
      const all = getAllMoods();
      return all[dateStr] || null;
    }
  
    function setMoodForDate(dateStr, mood) {
      const all = getAllMoods();
      all[dateStr] = { ...(all[dateStr] || {}), ...mood };
      saveAllMoods(all);
    }
  
    function setTodayMood({ moodIndex, moodLabel }) {
      const dateStr = todayKey();
      setMoodForDate(dateStr, {
        date: dateStr,
        moodIndex,
        moodLabel,
        updatedAt: new Date().toISOString(),
      });
      return dateStr;
    }
  
    function getTodayMood() {
      return getMoodByDate(todayKey());
    }
  
    function setTodayDetails(details) {
      const dateStr = todayKey();
      const current = getMoodByDate(dateStr) || { date: dateStr };
      setMoodForDate(dateStr, {
        ...current,
        details: {
          ...(current.details || {}),
          ...details,
        },
        updatedAt: new Date().toISOString(),
      });
      return dateStr;
    }
  
    window.MoodMapStorage = {
      // onboarding + user
      hasSeenOnboarding,
      setSeenOnboarding,
      resetOnboarding,
      setEmail,
      getEmail,
      setName,
      getName,
      clearUser,
  
      // moods
      todayKey,
      getAllMoods,
      getMoodByDate,
      setTodayMood,
      getTodayMood,
      setTodayDetails,
    };
  })();
  