(function () {
  'use strict';

  /* ── Número de WhatsApp del despacho ──
     TODO: reemplazar por el número real con lada (ej. 5215512345678) */
  var WHATSAPP_NUMBER = '521XXXXXXXXXX';

  /* ══════════════════════════════════
     LOADER
  ══════════════════════════════════ */
  window.addEventListener('load', function () {
    var loader = document.getElementById('loader');
    if (loader) {
      setTimeout(function () { loader.classList.add('loaded'); }, 500);
    }
  });

  /* ══════════════════════════════════
     NAVBAR — scroll state
  ══════════════════════════════════ */
  var navbar = document.getElementById('navbar');
  function onScroll() {
    if (!navbar) return;
    if (window.scrollY > 40) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ══════════════════════════════════
     MOBILE MENU
  ══════════════════════════════════ */
  var hamburger = document.getElementById('hamburger');
  var mobMenu = document.getElementById('mob-menu');
  if (hamburger && mobMenu) {
    hamburger.addEventListener('click', function () {
      var isOpen = mobMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    mobMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ══════════════════════════════════
     MARQUEE — build ticker content
  ══════════════════════════════════ */
  var marqueeItems = [
    'Visas de Trabajo', 'Residencia Temporal', 'Residencia Permanente',
    'Regularización Migratoria', 'Naturalización', 'INM', 'SRE', 'Aduanas',
    'Aeropuertos CDMX T1 · T2', 'Estaciones Migratorias'
  ];
  var marqueeEl = document.getElementById('marquee');
  if (marqueeEl) {
    var buildSet = function () {
      return marqueeItems.map(function (txt) {
        return '<span class="marquee-item">' + txt + ' <i class="fa-solid fa-circle"></i></span>';
      }).join('');
    };
    marqueeEl.innerHTML = buildSet() + buildSet();
  }

  /* ══════════════════════════════════
     REVEAL ON SCROLL
  ══════════════════════════════════ */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  }

  /* ══════════════════════════════════
     STAT COUNTERS
  ══════════════════════════════════ */
  var statEls = document.querySelectorAll('.stat-num');
  var animateCount = function (el) {
    var target = parseInt(el.getAttribute('data-count'), 10) || 0;
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1600;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target).toLocaleString('es-MX') + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString('es-MX') + suffix;
    }
    requestAnimationFrame(step);
  };
  if (statEls.length && 'IntersectionObserver' in window) {
    var statIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          statIo.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    statEls.forEach(function (el) { statIo.observe(el); });
  }

  /* ══════════════════════════════════
     HERO CANVAS — floating particles
  ══════════════════════════════════ */
  var canvas = document.getElementById('hero-canvas');
  if (canvas && canvas.getContext) {
    var ctx = canvas.getContext('2d');
    var particles = [];
    var PARTICLE_COUNT = 46;
    var w, h;

    function resize() {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    }
    function createParticles() {
      particles = [];
      for (var i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.6 + 0.6,
          vy: Math.random() * 0.35 + 0.08,
          vx: (Math.random() - 0.5) * 0.15,
          o: Math.random() * 0.5 + 0.15
        });
      }
    }
    function draw() {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(function (p) {
        p.y -= p.vy;
        p.x += p.vx;
        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(201, 162, 75, ' + p.o + ')';
        ctx.fill();
      });
      requestAnimationFrame(draw);
    }
    resize();
    createParticles();
    draw();
    window.addEventListener('resize', function () {
      resize();
      createParticles();
    });
  }

  /* ══════════════════════════════════
     FOOTER YEAR
  ══════════════════════════════════ */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ══════════════════════════════════
     CONTACT FORM → WHATSAPP
  ══════════════════════════════════ */
  var waForm = document.getElementById('wa-form');
  if (waForm) {
    waForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = (document.getElementById('f-name') || {}).value || '';
      var interest = (document.getElementById('f-interest') || {}).value || '';
      var msg = (document.getElementById('f-msg') || {}).value || '';

      var text = 'Hola, mi nombre es ' + name + '. ' +
        'Estoy interesado(a) en: ' + interest + '. ' +
        'Detalle: ' + msg;

      var url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(text);
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  }
})();
