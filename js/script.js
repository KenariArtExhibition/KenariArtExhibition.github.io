/* =========================================
   KENARI ART — MAIN SCRIPT
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* =========================================
     1. MENU MOBILE
     ========================================= */
  const menu = document.querySelector('.menu-btn');
  const nav = document.querySelector('.main-nav');

  if (menu && nav) {
    menu.addEventListener('click', () => nav.classList.toggle('show'));
    document.querySelectorAll('.main-nav a').forEach(a => {
      a.addEventListener('click', () => nav.classList.remove('show'));
    });
  }

  /* =========================================
     2. TAHUN OTOMATIS DI FOOTER
     ========================================= */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* =========================================
     3. FILTER PROJECTS
     ========================================= */
  document.querySelectorAll('.filters button').forEach(btn => {
    btn.addEventListener('click', () => {
      const activeBtn = document.querySelector('.filters .active');
      if (activeBtn) activeBtn.classList.remove('active');
      btn.classList.add('active');

      const f = btn.dataset.filter;
      document.querySelectorAll('.project').forEach(p => {
        p.style.display = (f === 'all' || p.classList.contains(f)) ? 'block' : 'none';
      });
    });
  });

  /* =========================================
     4. FORM SUBMIT (DEMO)
     ========================================= */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      alert('Terima kasih. Inquiry demo berhasil dikirim.');
      e.target.reset();
    });
  }

  /* =========================================
     5. HERO SLIDER + TYPEWRITER (LOOPING)
     ========================================= */
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.slide-indicators .dot');
  const typewriterEl = document.getElementById('typewriter-text');
  const heroTitle = document.querySelector('.hero-title');
  const heroCopy = document.querySelector('.hero-copy');

  if (!slides.length || !typewriterEl) return;

  const SLIDE_DURATION = 3000;    // 3 detik per slide
  const TEXT_HOLD_DURATION = 3500; // teks bertahan 3.5 detik sebelum hilang
  const TYPE_SPEED = 120;         // kecepatan mengetik (ms)

  let currentSlide = 0;
  let slideTimer = null;
  let typeTimer = null;
  let isPaused = false;

  /* ---------- Pindah slide ---------- */
  function goToSlide(index) {
    slides.forEach((s, i) => s.classList.toggle('active', i === index));
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
    currentSlide = index;
  }

  /* ---------- Reset teks ---------- */
  function resetText() {
    typewriterEl.innerHTML = '';
    heroTitle.classList.remove('show-text', 'fade-out');
    if (typeTimer) clearTimeout(typeTimer);
  }

  /* ---------- Mulai efek mengetik ---------- */
  function startTypewriter() {
    const text = 'KENARI ART\nEXHIBITION';
    let i = 0;
    typewriterEl.innerHTML = '';
    heroTitle.classList.add('show-text');
    heroTitle.classList.remove('fade-out');

    function type() {
      if (i < text.length) {
        const char = text.charAt(i);
        if (char === '\n') {
          typewriterEl.innerHTML += '<br>';
        } else {
          typewriterEl.innerHTML += char;
        }
        i++;
        typeTimer = setTimeout(type, TYPE_SPEED);
      } else {
        // Setelah selesai mengetik, tahan sebentar lalu fade out
        typeTimer = setTimeout(() => {
          heroTitle.classList.add('fade-out');

          // Setelah fade out, mulai ulang slider dari slide pertama
          typeTimer = setTimeout(() => {
            resetText();
            goToSlide(0);
            startSlider();
          }, 900);
        }, TEXT_HOLD_DURATION);
      }
    }
    type();
  }

  /* ---------- Jalankan slider ---------- */
  function startSlider() {
    if (slideTimer) clearInterval(slideTimer);

    slideTimer = setInterval(() => {
      if (isPaused) return;

      const nextSlide = (currentSlide + 1) % slides.length;

      // Jika sudah kembali ke slide pertama → teks mulai mengetik
      if (nextSlide === 0) {
        clearInterval(slideTimer);
        slideTimer = null;
        goToSlide(0);
        // Delay agar transisi slide terakhir selesai dulu
        typeTimer = setTimeout(startTypewriter, 900);
        return;
      }

      goToSlide(nextSlide);
    }, SLIDE_DURATION);
  }

  /* ---------- Klik dot indikator ---------- */
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      // Reset semua dan mulai dari slide yang diklik
      if (slideTimer) clearInterval(slideTimer);
      if (typeTimer) clearTimeout(typeTimer);
      resetText();
      goToSlide(i);
      // Mulai slider lanjut dari slide yang dipilih
      slideTimer = setInterval(() => {
        const nextSlide = (currentSlide + 1) % slides.length;
        if (nextSlide === 0) {
          clearInterval(slideTimer);
          slideTimer = null;
          goToSlide(0);
          typeTimer = setTimeout(startTypewriter, 900);
          return;
        }
        goToSlide(nextSlide);
      }, SLIDE_DURATION);
    });
  });

  /* ---------- Mulai semuanya ---------- */
  goToSlide(0);
  startSlider();

});