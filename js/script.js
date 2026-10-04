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
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

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
     5. HERO SLIDER + TYPEWRITER
     ========================================= */
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.slide-indicators .dot');
  const typewriterEl = document.getElementById('typewriter-text');
  const heroTitle = document.querySelector('.hero-title');

  // Hentikan jika elemen hero tidak ditemukan (halaman lain)
  if (!slides.length || !typewriterEl) return;

  const SLIDE_DURATION = 3000; // 3 detik per slide
  let currentSlide = 0;
  let typewriterStarted = false;

  /* Pindah ke slide tertentu */
  function goToSlide(index) {
    slides.forEach((s, i) => s.classList.toggle('active', i === index));
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
    currentSlide = index;
  }

  /* Auto-slide setiap 3 detik */
  const slideInterval = setInterval(() => {
    const nextSlide = (currentSlide + 1) % slides.length;

    // Jika sudah kembali ke slide pertama (semua slide sudah tampil),
    // hentikan slider & mulai efek typewriter
    if (nextSlide === 0 && !typewriterStarted) {
      typewriterStarted = true;
      clearInterval(slideInterval);
      goToSlide(0);
      // Delay sedikit sebelum mengetik agar transisi slide selesai dulu
      setTimeout(startTypewriter, 800);
      return;
    }

    goToSlide(nextSlide);
  }, SLIDE_DURATION);

  /* Klik indikator dot untuk pindah slide manual */
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      if (typewriterStarted) return; // matikan manual saat typewriter jalan
      clearInterval(slideInterval);
      goToSlide(i);
    });
  });

  /* =========================================
     FUNGSI EFEK MENGETIK
     ========================================= */
  function startTypewriter() {
    const text = 'KENARI ART\nEXHIBITION';
    let i = 0;
    typewriterEl.textContent = '';

    // Tampilkan hero title dengan animasi fade in
    heroTitle.classList.add('show-text');

    function type() {
      if (i < text.length) {
        const char = text.charAt(i);
        if (char === '\n') {
          typewriterEl.innerHTML += '<br>';
        } else {
          typewriterEl.innerHTML += char;
        }
        i++;
        setTimeout(type, 120); // kecepatan mengetik (ms)
      }
    }
    type();
  }

});