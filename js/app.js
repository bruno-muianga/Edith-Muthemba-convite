/**
 * CONVITE DIGITAL DE GRADUAÇÃO — MOTOR INTERACTIVO
 * Implementação das 12 funcionalidades e integração das regras de negócio.
 */

document.addEventListener("DOMContentLoaded", () => {
  initGraduateData();
  initCoverAndAudio();
  initCountdown();
  initMenuAccordions();
  initCopyButtons();
  initRSVPForm();
  initNavigation();
  initScrollAnimations();
  initShareButton();
});

/* --------------------------------------------------------------------------
   1. INICIALIZAÇÃO E APLICAÇÃO DOS DADOS DA GRADUADA (CFG)
   -------------------------------------------------------------------------- */
function initGraduateData() {
  const nameDisplays = document.querySelectorAll(".graduate-name-display");
  const defaultPlaceholder = "[NOME DA GRADUADA]";

  nameDisplays.forEach((el) => {
    if (CFG.name && CFG.name.trim() !== "") {
      el.textContent = CFG.name.trim();
    } else {
      el.textContent = defaultPlaceholder;
      el.title = "Configure o nome no arquivo js/config.js";
    }
  });

  // Imagens de Dress Code
  const frameF = document.getElementById("dress-frame-female");
  if (frameF) {
    if (CFG.dressF && CFG.dressF.trim() !== "") {
      frameF.innerHTML = `<img src="${CFG.dressF}" alt="Inspiração Casual Chic Feminino" loading="lazy" />`;
    }
  }

  const frameM = document.getElementById("dress-frame-male");
  if (frameM) {
    if (CFG.dressM && CFG.dressM.trim() !== "") {
      frameM.innerHTML = `<img src="${CFG.dressM}" alt="Inspiração Casual Chic Masculino" loading="lazy" />`;
    }
  }

  // Botão de Maps
  const btnMaps = document.getElementById("btn-open-maps");
  if (btnMaps) {
    btnMaps.addEventListener("click", (e) => {
      e.preventDefault();
      if (CFG.maps && CFG.maps.trim() !== "") {
        window.open(CFG.maps.trim(), "_blank", "noopener,noreferrer");
      } else {
        showToast("Aviso: A localização no Google Maps ainda não foi configurada.");
      }
    });
  }
}

/* --------------------------------------------------------------------------
   2. CAPA / ABERTURA DO CONVITE & ÁUDIO AMBIENTE
   -------------------------------------------------------------------------- */
let bgAudio = null;
let isAudioPlaying = false;

function initCoverAndAudio() {
  const cover = document.getElementById("hero-cover");
  const btnOpen = document.getElementById("btn-open-invite");
  const btnSeal = document.getElementById("btn-wax-seal");
  const envelopeOuter = document.getElementById("envelope-outer");
  const mainNav = document.getElementById("main-nav");
  const musicToggle = document.getElementById("btn-music-toggle");

  // Bloqueia scroll enquanto a capa estiver fechada
  document.body.classList.add("scroll-locked");

  // Preparar elemento de áudio se houver URL configurada
  if (CFG.music && CFG.music.trim() !== "") {
    bgAudio = new Audio(CFG.music.trim());
    bgAudio.loop = true;
    bgAudio.preload = "auto";
  }

  function handleOpenInvite() {
    if (cover.classList.contains("cover-opened")) return;

    // 1. Iniciar efeito 3D de abertura da aba e lacre do envelope
    if (envelopeOuter) {
      envelopeOuter.classList.add("is-opening");
    }

    // 2. Iniciar música se configurada (interação autorizada pelo clique)
    playAudioIfAvailable();

    // 3. Transição suave que revela o convite em página única
    setTimeout(() => {
      cover.classList.add("cover-opened");
      document.body.classList.remove("scroll-locked");

      // Revela cabeçalho minimalista discreto
      setTimeout(() => {
        if (mainNav) {
          mainNav.classList.add("nav-visible");
        }
      }, 400);

      // Scroll inicial suave para a abertura do convite
      const firstSection = document.getElementById("abertura") || document.getElementById("mensagem");
      if (firstSection) {
        firstSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 400);
  }

  if (btnOpen) {
    btnOpen.addEventListener("click", handleOpenInvite);
    btnOpen.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleOpenInvite();
      }
    });
  }

  if (btnSeal) {
    btnSeal.addEventListener("click", handleOpenInvite);
  }

  if (musicToggle) {
    musicToggle.title = "Vokalani — Moya Wanga Khensa";
    musicToggle.addEventListener("click", () => {
      if (!CFG.music || CFG.music.trim() === "") {
        showToast("Aviso: Nenhuma música de fundo foi configurada.");
        return;
      }
      toggleAudio();
    });
  }
}

function playAudioIfAvailable() {
  if (bgAudio) {
    bgAudio.play().then(() => {
      isAudioPlaying = true;
      updateMusicButtonState(true);
      showToast("A tocar: Vokalani — Moya Wanga Khensa");
    }).catch((err) => {
      console.warn("Reprodução automática bloqueada pelo navegador:", err);
      isAudioPlaying = false;
      updateMusicButtonState(false);
    });
  }
}

function toggleAudio() {
  if (!bgAudio) return;

  if (isAudioPlaying) {
    bgAudio.pause();
    isAudioPlaying = false;
    updateMusicButtonState(false);
    showToast("Música pausada");
  } else {
    bgAudio.play().then(() => {
      isAudioPlaying = true;
      updateMusicButtonState(true);
      showToast("A tocar: Vokalani — Moya Wanga Khensa");
    }).catch((err) => {
      console.error(err);
    });
  }
}

function updateMusicButtonState(playing) {
  const toggleBtn = document.getElementById("btn-music-toggle");
  if (!toggleBtn) return;

  const iconPlaying = toggleBtn.querySelector(".icon-music-on");
  const iconPaused = toggleBtn.querySelector(".icon-music-off");

  if (playing) {
    if (iconPlaying) iconPlaying.style.display = "block";
    if (iconPaused) iconPaused.style.display = "none";
    toggleBtn.setAttribute("aria-label", "Pausar música ambiente");
    toggleBtn.classList.add("is-playing");
  } else {
    if (iconPlaying) iconPlaying.style.display = "none";
    if (iconPaused) iconPaused.style.display = "block";
    toggleBtn.setAttribute("aria-label", "Reproduzir música ambiente");
    toggleBtn.classList.remove("is-playing");
  }
}

/* --------------------------------------------------------------------------
   3. CONTAGEM DECRESCENTE
   -------------------------------------------------------------------------- */
function initCountdown() {
  const daysEl = document.getElementById("countdown-days");
  const hoursEl = document.getElementById("countdown-hours");
  const minutesEl = document.getElementById("countdown-minutes");
  const secondsEl = document.getElementById("countdown-seconds");
  const container = document.getElementById("countdown-container");

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  // Data alvo: 19 de Dezembro de 2026
  const targetDate = CFG.date ? new Date(CFG.date).getTime() : new Date(2026, 11, 19, 12, 0, 0).getTime();

  function updateTimer() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      if (container) {
        container.innerHTML = `
          <div style="font-family: var(--font-serif); font-size: 1.5rem; color: var(--color-gold); padding: 1rem 0;">
            O grande dia chegou! Vamos celebrar!
          </div>
        `;
      }
      return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, "0");
    hoursEl.textContent = String(hours).padStart(2, "0");
    minutesEl.textContent = String(minutes).padStart(2, "0");
    secondsEl.textContent = String(seconds).padStart(2, "0");
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

/* --------------------------------------------------------------------------
   4. MENU DA CELEBRAÇÃO (EXPOSIÇÃO CLARA E ABERTA)
   -------------------------------------------------------------------------- */
function initMenuAccordions() {
  // Os pratos estão agora expostos de forma clara e aberta no cardápio de luxo,
  // sem necessidade de clique ou recolha, proporcionando leitura imediata.
}

/* --------------------------------------------------------------------------
   5. BOTÕES DE CÓPIA COM FALLBACK ROBUSTO
   -------------------------------------------------------------------------- */
function initCopyButtons() {
  const copyBtns = document.querySelectorAll("[data-copy-target]");

  copyBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const rawValue = btn.getAttribute("data-copy-target");
      if (!rawValue) return;

      copyTextToClipboard(rawValue, () => {
        const originalText = btn.innerHTML;
        btn.classList.add("copied");
        btn.innerHTML = `
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          Copiado
        `;
        showToast("Valor copiado com sucesso!");

        setTimeout(() => {
          btn.classList.remove("copied");
          btn.innerHTML = originalText;
        }, 2500);
      });
    });
  });
}

function copyTextToClipboard(text, onSuccess) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(onSuccess).catch(() => {
      fallbackCopy(text, onSuccess);
    });
  } else {
    fallbackCopy(text, onSuccess);
  }
}

function fallbackCopy(text, onSuccess) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.top = "-9999px";
  textArea.style.left = "-9999px";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    const successful = document.execCommand("copy");
    if (successful && typeof onSuccess === "function") {
      onSuccess();
    } else {
      showToast("Não foi possível copiar automaticamente.");
    }
  } catch (err) {
    showToast("Erro ao copiar o valor.");
  } finally {
    document.body.removeChild(textArea);
  }
}

/* --------------------------------------------------------------------------
   6. CONFIRMAÇÃO DE PRESENÇA (RSVP: WHATSAPP + SUPABASE OPCIONAL)
   -------------------------------------------------------------------------- */
function initRSVPForm() {
  const form = document.getElementById("rsvp-form");
  const feedbackEl = document.getElementById("rsvp-feedback");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nameInput = document.getElementById("rsvp-name");
    const phoneInput = document.getElementById("rsvp-phone");
    const attendanceInput = form.querySelector('input[name="presence"]:checked');
    const messageInput = document.getElementById("rsvp-message");

    const nameVal = nameInput ? nameInput.value.trim() : "";
    const phoneVal = phoneInput ? phoneInput.value.trim() : "";
    const attendanceVal = attendanceInput ? attendanceInput.value : "";
    const messageVal = messageInput ? messageInput.value.trim() : "";

    if (!nameVal || !phoneVal || !attendanceVal) {
      showFeedback(feedbackEl, "Por favor, preencha todos os campos do formulário.", "warning");
      return;
    }

    // 1. Gravação opcional no Supabase se configurado
    if (SUPABASE_CONFIG && SUPABASE_CONFIG.url && SUPABASE_CONFIG.anonKey) {
      try {
        await saveToSupabase({
          name: nameVal,
          phone: phoneVal,
          attending: attendanceVal === "Sim",
          submitted_at: new Date().toISOString()
        });
      } catch (err) {
        console.warn("Integração Supabase não concluída:", err);
      }
    }

    // 2. Envio direto para o WhatsApp oficial (+258 84 677 2773)
    const isAttending = attendanceVal === "Sim";
    const statusPhrase = isAttending
      ? "Sim, estarei presente!"
      : "Infelizmente não poderei comparecer.";

    const message = `Olá Edith Muthemba! Confirmo a minha resposta ao convite para a celebração da sua graduação:
• Nome: ${nameVal}
• Telefone: ${phoneVal}
• Confirmação: ${statusPhrase}${messageVal ? `\n• Mensagem: ${messageVal}` : ""}`;

    if (!CFG.whatsapp || CFG.whatsapp.trim() === "") {
      showFeedback(
        feedbackEl,
        "Aviso: O número de WhatsApp para confirmação ainda não foi configurado pela graduada. A sua resposta foi preenchida localmente.",
        "warning"
      );
      return;
    }

    // Limpar caracteres não numéricos do WhatsApp
    const cleanNumber = CFG.whatsapp.replace(/\D/g, "");
    const waUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;

    showFeedback(
      feedbackEl,
      "Obrigado! A abrir o WhatsApp para enviar a sua confirmação...",
      "success"
    );

    setTimeout(() => {
      window.open(waUrl, "_blank", "noopener,noreferrer");
    }, 600);
  });
}

function showFeedback(el, message, type) {
  if (!el) return;
  el.className = `rsvp-feedback ${type}`;
  el.textContent = message;
  el.style.display = "block";
}

async function saveToSupabase(payload) {
  const endpoint = `${SUPABASE_CONFIG.url.replace(/\/$/, "")}/rest/v1/${SUPABASE_CONFIG.tableName}`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": SUPABASE_CONFIG.anonKey,
      "Authorization": `Bearer ${SUPABASE_CONFIG.anonKey}`,
      "Prefer": "return=minimal"
    },
    body: JSON.stringify(payload)
  });
  return response.ok;
}

/* --------------------------------------------------------------------------
   7. NAVEGAÇÃO & BOTÃO VOLTAR AO TOPO
   -------------------------------------------------------------------------- */
function initNavigation() {
  const backToTopBtn = document.getElementById("btn-back-to-top");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      if (backToTopBtn) backToTopBtn.classList.add("visible");
    } else {
      if (backToTopBtn) backToTopBtn.classList.remove("visible");
    }
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // Links internos com rolagem suave
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const targetElem = document.querySelector(targetId);
      if (targetElem) {
        e.preventDefault();
        targetElem.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

/* --------------------------------------------------------------------------
   8. ANIMAÇÕES SUAVES AO SCROLL (INTERSECTION OBSERVER)
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(".reveal-on-scroll");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: "0px 0px -40px 0px"
    });

    animatedElements.forEach((el) => observer.observe(el));
  } else {
    // Fallback simples para navegadores antigos
    animatedElements.forEach((el) => el.classList.add("revealed"));
  }
}

/* --------------------------------------------------------------------------
   9. PARTILHA DE CONVITE PELO WHATSAPP
   -------------------------------------------------------------------------- */
function initShareButton() {
  const shareBtn = document.getElementById("btn-share-invite");
  if (!shareBtn) return;

  shareBtn.addEventListener("click", async () => {
    const title = CFG.name ? `Convite de Graduação — ${CFG.name}` : "Convite de Graduação";
    const text = "Você está convidado para celebrar a minha graduação universitária! Confira o convite:";
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch (err) {
        // Se utilizador cancelou ou não suportou, faz fallback
      }
    }

    // Fallback WhatsApp direto
    const shareMessage = `${text} ${url}`;
    const waShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`;
    window.open(waShareUrl, "_blank", "noopener,noreferrer");
  });
}

/* --------------------------------------------------------------------------
   10. SISTEMA DE TOAST / NOTIFICAÇÃO DISCRETA
   -------------------------------------------------------------------------- */
let toastTimeout = null;
function showToast(message) {
  let toast = document.getElementById("toast-notification");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast-notification";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add("toast-active");

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("toast-active");
  }, 3200);
}

