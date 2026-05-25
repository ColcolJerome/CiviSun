/*
 * main.js — Script condiviso CiviSun
 * Moduli:
 *   1. Loader splash screen
 *   2. Gestione lingua IT/EN
 *   3. Scroll reveal (IntersectionObserver)
 *   4. Progress bar & back-to-top
 *   5. Navbar hide-on-scroll + active page
 *   6. Menu hamburger mobile
 *   7. FAQ accordion
 *   8. Cookie banner
 *   9. Animated counters
 *  10. Post-it hover tilt
 */

/* ── 1. LOADER ─────────────────────────────────────────────────
   Prima visita (sessionStorage vuoto): mostra splash completo.
   Navigazioni successive all'interno del sito: skip immediato,
   nessuna attesa — la pagina appare subito.
──────────────────────────────────────────────────────────────── */
function initLoader() {
  const loader = document.getElementById('loader');
  const site   = document.getElementById('site');
  if (!loader) { if (site) site.style.opacity = '1'; return; }

  const firstVisit = !sessionStorage.getItem('cs_visited');
  sessionStorage.setItem('cs_visited', '1');

  if (!firstVisit) {
    loader.style.display = 'none';
    if (site) { site.style.transition = 'opacity .25s'; site.style.opacity = '1'; }
    return;
  }

  const ring  = document.getElementById('loader-ring');
  const img   = document.getElementById('loader-logo-img');
  const brand = document.getElementById('loader-brand');
  const tag   = document.getElementById('loader-tagline');

  setTimeout(() => ring  && ring.classList.add('show'),   80);
  setTimeout(() => img   && img.classList.add('show'),   150);
  setTimeout(() => brand && brand.classList.add('show'), 700);
  setTimeout(() => tag   && tag.classList.add('show'),   900);

  const minTime = 2200;
  const hideLoader = () => {
    loader.classList.add('hide');
    if (site) site.style.opacity = '1';
    setTimeout(() => loader.remove(), 800);
  };

  if (document.readyState === 'complete') {
    setTimeout(hideLoader, minTime);
  } else {
    let loaded = false, timedOut = false;
    window.addEventListener('load', () => { loaded = true; if (timedOut) hideLoader(); });
    setTimeout(() => { timedOut = true; if (loaded) hideLoader(); else setTimeout(hideLoader, 400); }, minTime);
  }
}

/* ── 2. LINGUA IT/EN ───────────────────────────────────────── */
let LANG = localStorage.getItem('civisun_lang') || 'it';

function applyLang(l) {
  LANG = l;
  localStorage.setItem('civisun_lang', l);
  document.documentElement.lang = l;

  // Bottoni toggle
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === l);
  });

  // Elementi con data-it / data-en
  document.querySelectorAll('[data-it]').forEach(el => {
    const txt = el.getAttribute(`data-${l}`);
    if (txt !== null) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') el.placeholder = txt;
      // Se il testo tradotto contiene HTML (es. <span class="hl-yellow">), usa innerHTML
      else if (txt.includes('<')) el.innerHTML = txt;
      else el.textContent = txt;
    }
  });

  // Elementi con data-key (usano translations.js)
  const T = window.CIVISUN_TRANSLATIONS;
  if (T && T[l]) {
    document.querySelectorAll('[data-key]').forEach(el => {
      const val = T[l][el.dataset.key];
      if (val !== undefined) {
        if (val.includes('<')) el.innerHTML = val;
        else el.textContent = val;
      }
    });
  }
}

function setLang(l) { applyLang(l); }

function initLang() {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });
  applyLang(LANG);
}

/* ── 3. SCROLL REVEAL ─────────────────────────────────────── */
function initReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const delay = parseFloat(e.target.dataset.delay || 0) * 1000;
        setTimeout(() => e.target.classList.add('visible'), delay);
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
    .forEach(el => observer.observe(el));
}

/* ── 4. PROGRESS BAR & BACK-TO-TOP ───────────────────────── */
function initScroll() {
  const bar = document.getElementById('progress-bar');
  const btt = document.getElementById('back-top');

  window.addEventListener('scroll', () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    if (bar) bar.style.width = (window.scrollY / h * 100) + '%';
    if (btt) btt.classList.toggle('show', window.scrollY > 400);
  }, { passive: true });

  if (btt) btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ── 5. NAVBAR ────────────────────────────────────────────── */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  let lastY = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y > lastY && y > 200) navbar.classList.add('hidden');
    else navbar.classList.remove('hidden');
    lastY = y;
  }, { passive: true });

  // Active page link
  const path = window.location.pathname.split('/').pop() || 'index.html';
  navbar.querySelectorAll('a[data-page]').forEach(a => {
    if (a.dataset.page === path) a.classList.add('active');
  });
}

/* ── 6. HAMBURGER MOBILE ──────────────────────────────────── */
function initMobileMenu() {
  const ham  = document.getElementById('hamburger');
  const menu = document.getElementById('mobile-menu');
  if (!ham || !menu) return;

  ham.addEventListener('click', () => {
    ham.classList.toggle('open');
    menu.classList.toggle('open');
  });

  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      ham.classList.remove('open');
      menu.classList.remove('open');
    });
  });
}

/* ── 7. FAQ ACCORDION ────────────────────────────────────── */
function initFaq() {
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      const ans  = item.querySelector('.faq-answer');
      const open = item.classList.contains('open');

      // Chiudi tutti
      document.querySelectorAll('.faq-item.open').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-answer').classList.remove('open');
      });

      if (!open) { item.classList.add('open'); ans.classList.add('open'); }
    });
  });
}

/* ── 8. COOKIE BANNER ────────────────────────────────────── */
function initCookie() {
  const banner = document.getElementById('cookie-banner');
  if (!banner) return;
  if (localStorage.getItem('cs_cookie')) { banner.classList.add('hide'); return; }

  banner.querySelector('.ck-accept')?.addEventListener('click', () => {
    localStorage.setItem('cs_cookie', '1');
    banner.classList.add('hide');
  });
  banner.querySelector('.ck-reject')?.addEventListener('click', () => {
    banner.classList.add('hide');
  });
}

/* ── 9. ANIMATED COUNTERS ────────────────────────────────── */
function animateCounter(el, target, duration, prefix, suffix) {
  const start = Date.now();
  const run = () => {
    const p = Math.min((Date.now() - start) / duration, 1);
    const e = 1 - Math.pow(1 - p, 3); // ease-out cubic
    const v = Math.round(e * target);
    el.textContent = (prefix || '') + v.toLocaleString('it-IT') + (suffix || '');
    if (p < 1) requestAnimationFrame(run);
  };
  requestAnimationFrame(run);
}

function initCounters() {
  const section = document.getElementById('stats-section');
  if (!section) return;

  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      section.querySelectorAll('[data-counter]').forEach(el => {
        const target   = parseFloat(el.dataset.counter);
        const duration = parseInt(el.dataset.duration || 1800);
        const suffix   = el.dataset.suffix || '';
        const prefix   = el.dataset.prefix || '';
        animateCounter(el, target, duration, prefix, suffix);
      });
      obs.disconnect();
    }
  }, { threshold: 0.3 });

  obs.observe(section);
}

/* ── 10. POST-IT HOVER TILT ──────────────────────────────── */
function initTilt() {
  document.querySelectorAll('.postit, .stat-postit').forEach(el => {
    const r = parseFloat(getComputedStyle(el).getPropertyValue('--r') || '-1deg');
    el.addEventListener('mouseenter', () => {
      el.style.transform = 'rotate(0deg) scale(1.04) translateY(-4px)';
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = `rotate(${r}deg)`;
    });
  });
}

/* ── INIT GLOBALE ────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initLang();
  initReveal();
  initScroll();
  initNavbar();
  initMobileMenu();
  initFaq();
  initCookie();
  initCounters();
  initTilt();
});
