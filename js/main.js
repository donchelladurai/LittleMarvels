/* Little Marvels — main.js
 * Nav toggle, sticky-header scroll state, reveal-on-scroll.
 */
(function () {
  'use strict';

  // -------- Nav toggle --------
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
      if (!nav.classList.contains('is-open')) return;
      if (nav.contains(e.target) || toggle.contains(e.target)) return;
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });

    // Close on Esc
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  // -------- Header scrolled state --------
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // -------- Reveal-on-scroll --------
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  // -------- Gallery filter (only runs on gallery page) --------
  const filters = document.querySelectorAll('.gallery-filter');
  const items = document.querySelectorAll('.gallery-grid > [data-category]');
  if (filters.length && items.length) {
    filters.forEach((btn) => {
      btn.addEventListener('click', () => {
        filters.forEach((b) => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        const cat = btn.dataset.filter;
        items.forEach((item) => {
          const show = cat === 'all' || item.dataset.category === cat;
          item.style.display = show ? '' : 'none';
        });
      });
    });
  }

  // -------- Living Canopy hero (only on home page) --------
  const canopy = document.querySelector('.canopy-hero');
  if (canopy) {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Trigger bloom-in once initial styles have applied
    requestAnimationFrame(() => {
      requestAnimationFrame(() => canopy.classList.add('is-bloomed'));
    });

    // Cursor parallax — set --mx, --my as -1..1 from canopy center
    if (!reduceMotion) {
      let raf = null, mx = 0, my = 0;
      const apply = () => {
        canopy.style.setProperty('--mx', mx.toFixed(3));
        canopy.style.setProperty('--my', my.toFixed(3));
        raf = null;
      };
      canopy.addEventListener('mousemove', (e) => {
        const r = canopy.getBoundingClientRect();
        mx = ((e.clientX - r.left) / r.width  - 0.5) * 2;
        my = ((e.clientY - r.top)  / r.height - 0.5) * 2;
        if (!raf) raf = requestAnimationFrame(apply);
      });
      canopy.addEventListener('mouseleave', () => {
        mx = 0; my = 0;
        if (!raf) raf = requestAnimationFrame(apply);
      });
    }

    // Marvel leaf interactions — reveal value card
    const card = canopy.querySelector('.value-card');
    const cardTitle = card?.querySelector('.value-card__title');
    const cardBody  = card?.querySelector('.value-card__body');
    const cardClose = card?.querySelector('.value-card__close');
    let activeMarvel = null;

    function positionCard(marvelEl) {
      const heroRect = canopy.getBoundingClientRect();
      const leafRect = marvelEl.getBoundingClientRect();
      const cardW = card.offsetWidth || 280;
      const cardH = card.offsetHeight || 140;
      const leafCx = leafRect.left + leafRect.width  / 2 - heroRect.left;
      const leafCy = leafRect.top  + leafRect.height / 2 - heroRect.top;

      // Prefer placing the card below the leaf; flip above if it would overflow
      let y = leafCy + leafRect.height / 2 + 18;
      if (y + cardH > heroRect.height - 16) {
        y = leafCy - leafRect.height / 2 - cardH - 18;
      }
      // Center horizontally on leaf, clamp to hero edges
      let x = leafCx - cardW / 2;
      x = Math.max(16, Math.min(heroRect.width - cardW - 16, x));

      card.style.left = x + 'px';
      card.style.top  = Math.max(16, y) + 'px';
    }

    function showCard(marvelEl) {
      if (!card) return;
      cardTitle.textContent = marvelEl.dataset.value || '';
      cardBody.textContent  = marvelEl.dataset.tagline || '';
      card.hidden = false;
      // ensure layout for measurement, then position + animate
      requestAnimationFrame(() => {
        positionCard(marvelEl);
        requestAnimationFrame(() => card.classList.add('is-visible'));
      });
      if (activeMarvel && activeMarvel !== marvelEl) activeMarvel.classList.remove('is-active');
      marvelEl.classList.add('is-active');
      activeMarvel = marvelEl;
    }

    function hideCard() {
      if (!card) return;
      card.classList.remove('is-visible');
      window.setTimeout(() => { card.hidden = true; }, 240);
      if (activeMarvel) {
        activeMarvel.classList.remove('is-active');
        activeMarvel = null;
      }
    }

    canopy.addEventListener('click', (e) => {
      const marvel = e.target.closest('.marvel');
      if (marvel) {
        showCard(marvel);
        return;
      }
      // click outside both card and a marvel closes
      if (activeMarvel && !card.contains(e.target)) hideCard();
    });

    canopy.addEventListener('keydown', (e) => {
      const marvel = e.target.closest && e.target.closest('.marvel');
      if (marvel && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        showCard(marvel);
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && activeMarvel) {
        const last = activeMarvel;
        hideCard();
        last.focus();
      }
    });

    if (cardClose) {
      cardClose.addEventListener('click', (e) => {
        e.stopPropagation();
        const last = activeMarvel;
        hideCard();
        last && last.focus();
      });
    }

    // Re-position card on viewport resize while open
    window.addEventListener('resize', () => {
      if (activeMarvel && !card.hidden) positionCard(activeMarvel);
    }, { passive: true });
  }
})();
