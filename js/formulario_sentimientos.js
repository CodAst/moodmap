(function () {
    if (!window.MoodMapStorage?.hasSeenOnboarding()) {
      window.location.replace("slides.html");
      return;
    }
    if (!window.MoodMapStorage?.getEmail?.()) {
      window.location.replace("inicio.html");
      return;
    }
    if (!window.MoodMapStorage?.getName?.()) {
      window.location.replace("nombre.html");
      return;
    }
  
    const summaryEmoji = document.getElementById("summaryEmoji");
    const summarySub = document.getElementById("summarySub");
  
    const intensity = document.getElementById("intensity");
    const intensityValue = document.getElementById("intensityValue");
  
    const chipsWrap = document.getElementById("chips");
    const note = document.getElementById("note");
    const media = document.getElementById("media");
    const form = document.getElementById("detailForm");
  
    const moodsMap = {
      "Very sad": "😢",
      "Sad": "🙁",
      "Okay": "🙂",
      "Happy": "😊",
      "Very happy": "😁",
    };
  
    // Asegurar que exista mood de hoy
    const todayMood = window.MoodMapStorage?.getTodayMood?.();
    if (!todayMood || !todayMood.moodLabel) {
      window.location.replace("sentimiento.html");
      return;
    }
  
    const label = todayMood.moodLabel;
    summaryEmoji.textContent = moodsMap[label] || "🙂";
    summarySub.innerHTML = `Hoy te sientes: <b>${label}</b>`;
  
    // Preload si ya había detalles
    if (todayMood.details) {
      if (todayMood.details.intensity) {
        intensity.value = String(todayMood.details.intensity);
        intensityValue.textContent = String(todayMood.details.intensity);
      }
      if (Array.isArray(todayMood.details.tags)) {
        const set = new Set(todayMood.details.tags);
        Array.from(chipsWrap.querySelectorAll(".chip")).forEach((b) => {
          const tag = b.dataset.tag;
          if (set.has(tag)) b.classList.add("is-active");
        });
      }
      if (todayMood.details.note) note.value = todayMood.details.note;
    }
  
    intensity.addEventListener("input", () => {
      intensityValue.textContent = String(intensity.value);
    });
  
    function getSelectedTags() {
      return Array.from(chipsWrap.querySelectorAll(".chip.is-active"))
        .map((b) => b.dataset.tag)
        .filter(Boolean);
    }
  
    chipsWrap.addEventListener("click", (e) => {
      const btn = e.target.closest(".chip");
      if (!btn) return;
      btn.classList.toggle("is-active");
    });
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const details = {
        intensity: Number(intensity.value),
        tags: getSelectedTags(),
        note: String(note.value || "").trim(),
        mediaName: media.files?.[0]?.name || "",
      };
  
      window.MoodMapStorage?.setTodayDetails?.(details);
      window.location.href = "principal.html";
    });
  
    // Init intensity value
    intensityValue.textContent = String(intensity.value);
  })();
  