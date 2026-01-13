(function () {
  // Espera a que el DOM esté listo (por si moviste scripts al <head>)
  document.addEventListener("DOMContentLoaded", () => {
    // Guard rails
    if (!window.MoodMapStorage?.hasSeenOnboarding()) {
      window.location.replace("slides.html");
      return;
    }
    if (!window.MoodMapStorage?.getEmail?.()) {
      window.location.replace("inicio.html");
      return;
    }
    const name = window.MoodMapStorage?.getName?.();
    if (!name) {
      window.location.replace("nombre.html");
      return;
    }

    // ✅ OJO: estos IDs deben existir en tu HTML:
    // slider: id="moodRange"
    // carita: id="moodEmoji"
    const titleHello = document.getElementById("titleHello");
    const moodEmojiEl = document.getElementById("moodEmoji");
    const moodLabelEl = document.getElementById("moodLabel");
    const moodDescEl = document.getElementById("moodDesc");

    const moodRange = document.getElementById("moodRange");
    const btnSaveMood = document.getElementById("btnSaveMood");
    const btnReset = document.getElementById("btnReset");

    const modalOverlay = document.getElementById("modalOverlay");
    const btnMaybeLater = document.getElementById("btnMaybeLater");
    const btnAddDetails = document.getElementById("btnAddDetails");

    // Si algo no existe, no seguimos (evita fallos silenciosos)
    if (!moodRange || !moodEmojiEl || !moodLabelEl || !moodDescEl) {
      console.error("Faltan elementos en el HTML. Revisa IDs: moodRange, moodEmoji, moodLabel, moodDesc");
      return;
    }

    titleHello.textContent = `Hola, ${name}. ¿Cómo te sientes hoy?`;

    const moods = [
      { label: "Very sad",   emoji: "😢", desc: "Respira. Hoy puede ser un día difícil, y está bien sentirlo." },
      { label: "Sad",       emoji: "🙁", desc: "Vas con calma. Identificarlo ya es un avance." },
      { label: "Okay",      emoji: "🙂", desc: "Un día normal. Puedes cuidar pequeños detalles." },
      { label: "Happy",     emoji: "😊", desc: "¡Qué bien! Aprovecha esa energía en algo que te guste." },
      { label: "Very happy",emoji: "😁", desc: "¡Excelente! Guarda este momento como un logro." },
    ];

    // Asegura que el slider tenga el rango correcto
    moodRange.min = "0";
    moodRange.max = String(moods.length - 1);
    moodRange.step = "1";

    function setEmoji(el, emoji) {
      // Si por error cambiaste a <img>, no se verá emoji con textContent.
      // Esto mantiene compatibilidad:
      if (el.tagName === "IMG") {
        el.alt = emoji;
        // Si quieres usar imágenes en vez de emojis, aquí podrías setear el src.
        // el.src = `../assets/img/moods/${emoji}.png`
      } else {
        el.textContent = emoji;
      }
    }

    function setUI(index) {
      const i = Math.max(0, Math.min(moods.length - 1, index));
      const m = moods[i];
      setEmoji(moodEmojiEl, m.emoji);
      moodLabelEl.textContent = m.label;
      moodDescEl.textContent = m.desc;
    }

    function syncFromSlider() {
      const idx = parseInt(moodRange.value, 10);
      setUI(Number.isNaN(idx) ? 2 : idx);
    }

    // Precargar si ya guardó hoy
    const today = window.MoodMapStorage?.getTodayMood?.();
    if (today && typeof today.moodIndex === "number") {
      moodRange.value = String(today.moodIndex);
    } else {
      moodRange.value = moodRange.value || "2";
    }

    // ✅ Importante: escuchar input + change
    moodRange.addEventListener("input", syncFromSlider);
    moodRange.addEventListener("change", syncFromSlider);

    // Init (para que se actualice apenas carga)
    syncFromSlider();

    function openModal() {
      modalOverlay?.classList.add("is-open");
    }
    function closeModal() {
      modalOverlay?.classList.remove("is-open");
    }

    btnSaveMood?.addEventListener("click", () => {
      const idx = parseInt(moodRange.value, 10);
      const m = moods[Number.isNaN(idx) ? 2 : idx];

      window.MoodMapStorage?.setTodayMood?.({
        moodIndex: Number.isNaN(idx) ? 2 : idx,
        moodLabel: m.label,
      });

      openModal();
    });

    btnReset?.addEventListener("click", () => {
      moodRange.value = "2";
      syncFromSlider();
    });

    btnMaybeLater?.addEventListener("click", () => {
      closeModal();
      window.location.href = "principal.html";
    });

    btnAddDetails?.addEventListener("click", () => {
      closeModal();
      window.location.href = "formulario_sentimientos.html";
    });

    modalOverlay?.addEventListener("click", (e) => {
      if (e.target === modalOverlay) closeModal();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModal();
    });
  });
})();
