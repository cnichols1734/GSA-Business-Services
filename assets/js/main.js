/* GSA Business Services — main.js */

/* ── Loader ────────────────────────────────────────────────── */
const loader = document.getElementById('loader');
window.addEventListener('load', () => {
  setTimeout(() => loader?.classList.add('done'), 500);
});

document.addEventListener('DOMContentLoaded', () => {

  /* ── Header scroll state ─────────────────────────────────── */
  const siteHeader = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    siteHeader?.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  /* ── Mobile nav drawer ───────────────────────────────────── */
  const menuBtn    = document.querySelector('.menu-btn');
  const mobileNav  = document.getElementById('mobileNav');
  const mobileOver = document.querySelector('.mobile-overlay');
  const closeBtn   = document.querySelector('.mobile-close');

  function openMenu() {
    mobileNav.classList.add('open');
    mobileOver.classList.add('open');
    menuBtn.classList.add('open');
    menuBtn.setAttribute('aria-expanded', 'true');
    mobileNav.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    mobileNav.classList.remove('open');
    mobileOver.classList.remove('open');
    menuBtn.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    mobileNav.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  menuBtn?.addEventListener('click', openMenu);
  closeBtn?.addEventListener('click', closeMenu);
  mobileOver?.addEventListener('click', closeMenu);
  document.querySelectorAll('.mobile-link').forEach(l => l.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

  /* ── Smooth scroll ───────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const headerH = siteHeader ? siteHeader.getBoundingClientRect().height : 0;
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - headerH,
        behavior: 'smooth'
      });
    });
  });

  /* ── Scroll reveal ───────────────────────────────────────── */
  document.querySelectorAll('.services-list, .reviews-grid').forEach(parent => {
    parent.querySelectorAll('.reveal').forEach((el, i) => {
      el.style.transitionDelay = `${i * 0.09}s`;
    });
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ── Appointment form ────────────────────────────────────── */
  const form        = document.getElementById('appointmentForm');
  const formSuccess = document.getElementById('formSuccess');

  form?.addEventListener('submit', e => {
    e.preventDefault();
    form.style.display = 'none';
    formSuccess.classList.add('visible');
  });

});
