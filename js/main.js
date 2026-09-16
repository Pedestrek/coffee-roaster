/* Torrador de café automatizado: comportamento de scroll.
   Sem dependências obrigatórias. O Lenis, se carregar, dá a rolagem suave
   contínua; se não carregar, a página funciona com a rolagem nativa. */

(function () {
  'use strict';

  var reduz = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- rolagem suave (opcional) ---- */
  function iniciaLenis() {
    if (reduz || typeof window.Lenis !== 'function') return;
    var lenis = new window.Lenis({ duration: 1.1, smoothWheel: true });
    function raf(t) { lenis.raf(t); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var alvo = document.querySelector(a.getAttribute('href'));
        if (alvo) { e.preventDefault(); lenis.scrollTo(alvo); }
      });
    });
  }

  /* ---- revelar elementos ao entrar na viewport ---- */
  function revelar() {
    var itens = document.querySelectorAll('.rev');
    if (!('IntersectionObserver' in window)) {
      itens.forEach(function (el) { el.classList.add('visivel'); });
      return;
    }
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('visivel'); obs.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.1 });
    itens.forEach(function (el) { obs.observe(el); });

    // Rede de segurança: o que já está na viewport aparece de imediato, sem
    // depender do observer, e nada fica invisível se ele não disparar.
    function jaVisiveis() {
      itens.forEach(function (el) {
        if (el.classList.contains('visivel')) return;
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('visivel');
      });
    }
    jaVisiveis();
    window.setTimeout(jaVisiveis, 400);
  }

  /* ---- sequência fixada: destaca o passo ativo e troca o número ---- */
  function passos() {
    var lista = document.querySelectorAll('.passo');
    if (!lista.length || !('IntersectionObserver' in window)) return;
    var num = document.querySelector('.passos-fixo .num');
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (e.isIntersecting) {
          lista.forEach(function (p) { p.classList.remove('ativo'); });
          e.target.classList.add('ativo');
          if (num) num.textContent = e.target.dataset.num || '';
        }
      });
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });
    lista.forEach(function (p) { obs.observe(p); });
  }

  /* ---- barra de progresso e estado do menu ---- */
  function scrollUI() {
    var barra = document.querySelector('.progresso');
    var nav = document.querySelector('.nav');
    var pendente = false;
    function atualiza() {
      pendente = false;
      var h = document.documentElement.scrollHeight - window.innerHeight;
      var y = window.scrollY || window.pageYOffset;
      if (barra) barra.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
      if (nav) nav.classList.toggle('solido', y > 40);
    }
    window.addEventListener('scroll', function () {
      if (!pendente) { pendente = true; requestAnimationFrame(atualiza); }
    }, { passive: true });
    atualiza();
  }

  /* ---- parallax leve na foto do hero ---- */
  function parallax() {
    var alvo = document.querySelector('[data-parallax]');
    if (!alvo || reduz) return;
    var pendente = false;
    function move() {
      pendente = false;
      var y = window.scrollY || window.pageYOffset;
      if (y < window.innerHeight * 1.2) alvo.style.transform = 'translate3d(0,' + (y * 0.12) + 'px,0)';
    }
    window.addEventListener('scroll', function () {
      if (!pendente) { pendente = true; requestAnimationFrame(move); }
    }, { passive: true });
  }

  function inicia() { iniciaLenis(); revelar(); passos(); scrollUI(); parallax(); }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', inicia);
  else inicia();
})();
