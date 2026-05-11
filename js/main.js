document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('nav')) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  }

  // Reveal animation
  const reveals = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        entry.target.classList.add("vis");
      }
    });
  }, { threshold: 0.08 });

  reveals.forEach(el => observer.observe(el));

  // Parallax scroll effect
  const plxLayers = document.querySelectorAll('.plx-layer');

  function handleScroll() {
    plxLayers.forEach(layer => {
      const speed = parseFloat(layer.getAttribute('data-speed')) || 0.5;
      const yOffset = window.pageYOffset;
      const svg = layer.querySelector('svg');
      if (svg) {
        svg.style.transform = `translateY(${yOffset * speed * 0.4}px)`;
      }
    });
  }

  window.addEventListener("scroll", handleScroll, { passive: true });

  // Gift logic interaction
  const steps = [
    { btn: "Ver número de cuenta", hint: null, dots: "○○○" },
    { btn: "Insiste un poco más…", hint: "Sabemos lo que estás pensando. Qué pereza el sobre… Pero piénsalo bien: el sobre tiene su encanto. Si aún quieres verlo, vuelve a pulsar el botón.", dots: "●○○" },
    { btn: "Acho, qué me enseñes el número de cuenta", hint: "Muy bien. Respetamos tu decisión. A caballo regalao' no le mires el dentao'. Dale una última vez al botón y aparece.", dots: "●●○" }
  ];

  let clickCount = 0;
  const giftBtn = document.getElementById("gift-btn");
  const giftHint = document.getElementById("gift-hint");
  const giftSection = document.getElementById("gift-section");
  const giftProgress = document.getElementById("gift-progress");
  const ibanContainer = document.getElementById("iban-container");

  if (giftBtn) {
    giftBtn.addEventListener("click", () => {
      clickCount++;
      if (clickCount >= steps.length) {
        giftSection.style.display = "none";
        ibanContainer.style.display = "block";
      } else {
        giftBtn.textContent = steps[clickCount].btn;
        giftBtn.setAttribute("aria-label", steps[clickCount].btn + " – paso " + (clickCount + 1) + " de 3");
        if (giftProgress) giftProgress.textContent = steps[clickCount].dots;
        if (steps[clickCount].hint) {
          giftHint.style.display = "block";
          giftHint.textContent = steps[clickCount].hint;
        }
      }
    });
  }

  // IBAN copy logic
  const copyBtn = document.getElementById("copy-iban");
  if (copyBtn) {
    copyBtn.addEventListener("click", function() {
      navigator.clipboard.writeText("ES58 1563 2626 3932 6620 6515");
      this.textContent = "Copiado ✓";
      setTimeout(() => {
        this.textContent = "Copiar IBAN";
      }, 2000);
    });
  }

  // Countdown injection
  const WEDDING = new Date('2026-09-19T18:00:00+02:00');
  function tick() {
    const diff = WEDDING - new Date();
    const dElement = document.getElementById('cd-d');
    const hElement = document.getElementById('cd-h');
    const mElement = document.getElementById('cd-m');
    const sElement = document.getElementById('cd-s');

    if (diff <= 0) {
      if (dElement) dElement.textContent = '0';
      if (hElement) hElement.textContent = '0';
      if (mElement) mElement.textContent = '0';
      if (sElement) sElement.textContent = '0';
      return;
    }

    if (dElement) dElement.textContent = Math.floor(diff / 864e5);
    if (hElement) hElement.textContent = String(Math.floor(diff % 864e5 / 36e5)).padStart(2, '0');
    if (mElement) mElement.textContent = String(Math.floor(diff % 36e5 / 6e4)).padStart(2, '0');
    if (sElement) sElement.textContent = String(Math.floor(diff % 6e4 / 1e3)).padStart(2, '0');
  }

  tick();
  setInterval(tick, 1000);
});
