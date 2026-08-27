(function () {
  'use strict';

  /* ── Número de WhatsApp del despacho ──
     Lic. Antonio Cesar Olvera Ferretiz — 55 1820 5296 */
  var WHATSAPP_NUMBER = '5215518205296';

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
    if (window.scrollY > 30) navbar.classList.add('scrolled');
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
     FAQ — accordion
  ══════════════════════════════════ */
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    var btn = item.querySelector('.faq-q');
    var ans = item.querySelector('.faq-a');
    if (!btn || !ans) return;
    btn.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      faqItems.forEach(function (other) {
        other.classList.remove('open');
        var oa = other.querySelector('.faq-a');
        var ob = other.querySelector('.faq-q');
        if (oa) oa.style.maxHeight = null;
        if (ob) ob.setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        ans.style.maxHeight = ans.scrollHeight + 'px';
      }
    });
  });

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
