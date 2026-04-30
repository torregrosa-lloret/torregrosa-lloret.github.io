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
    { btn: "Ver número de cuenta", hint: null },
    { btn: "Ver número de cuenta", hint: "Sabemos lo que estás pensando. Es solo un par de clics, qué pereza el sobre… Pero piénsalo bien: el sobre tiene su encanto." },
    { btn: "Acho, qué me enseñes el número de cuenta", hint: "Muy bien. Allá tú. Hemos hecho todo lo posible para disuadirte y aun así vas a continuar. Respetamos tu decisión, aunque no la compartamos." }
  ];

  let clickCount = 0;
  const giftBtn = document.getElementById("gift-btn");
  const giftHint = document.getElementById("gift-hint");
  const giftSection = document.getElementById("gift-section");
  const ibanContainer = document.getElementById("iban-container");

  if (giftBtn) {
    giftBtn.addEventListener("click", () => {
      clickCount++;
      if (clickCount >= steps.length) {
        giftSection.style.display = "none";
        ibanContainer.style.display = "block";
      } else {
        giftBtn.textContent = steps[clickCount].btn;
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
      navigator.clipboard.writeText("ES12 3456 7890 1234 5678 9012");
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

  // ── Polaroid carousel: drag + lightbox ──
  (function () {
    const track = document.querySelector('.polaroid-track');
    if (!track) return;

    const SPEED = 0.5;
    let x = 0;
    let dragging = false;
    let dragStartX = 0;
    let dragStartPos = 0;
    let moved = false;

    function halfWidth() { return track.scrollWidth / 2; }

    function loop() {
      if (!dragging) {
        x += SPEED;
        if (x >= halfWidth()) x -= halfWidth();
        track.style.transform = `translateX(${-x}px)`;
      }
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);

    function dragStart(clientX) {
      dragging = true;
      moved = false;
      dragStartX = clientX;
      dragStartPos = x;
      track.style.cursor = 'grabbing';
    }
    function dragMove(clientX) {
      if (!dragging) return;
      const delta = dragStartX - clientX;
      if (Math.abs(delta) > 4) moved = true;
      const half = halfWidth();
      x = ((dragStartPos + delta) % half + half) % half;
      track.style.transform = `translateX(${-x}px)`;
    }
    function dragEnd() {
      dragging = false;
      track.style.cursor = 'grab';
    }

    track.addEventListener('mousedown', e => { e.preventDefault(); dragStart(e.clientX); });
    window.addEventListener('mousemove', e => dragMove(e.clientX));
    window.addEventListener('mouseup', dragEnd);
    track.addEventListener('touchstart', e => dragStart(e.touches[0].clientX), { passive: true });
    track.addEventListener('touchmove', e => dragMove(e.touches[0].clientX), { passive: true });
    track.addEventListener('touchend', dragEnd);

    // Lightbox
    const overlay = document.createElement('div');
    overlay.className = 'pm-lightbox';
    overlay.innerHTML = '<img class="pm-lightbox__img" alt=""><button class="pm-lightbox__close" aria-label="Cerrar">✕</button>';
    document.body.appendChild(overlay);
    const lbImg = overlay.querySelector('.pm-lightbox__img');

    function openLightbox(src, alt) {
      lbImg.src = src;
      lbImg.alt = alt;
      overlay.classList.add('pm-lightbox--open');
      document.body.style.overflow = 'hidden';
    }
    function closeLightbox() {
      overlay.classList.remove('pm-lightbox--open');
      document.body.style.overflow = '';
    }

    track.addEventListener('click', e => {
      if (moved) return;
      const slide = e.target.closest('img.pm-slide');
      if (slide) openLightbox(slide.src, slide.alt);
    });
    overlay.addEventListener('click', e => { if (e.target === overlay) closeLightbox(); });
    overlay.querySelector('.pm-lightbox__close').addEventListener('click', closeLightbox);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
  })();
});
