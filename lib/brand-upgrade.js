/* brand-upgrade.js · rail toggle + viewport meta injection · 2026-05-07 */
(function() {
  'use strict';

  // Inject viewport meta if missing (ensures mobile doesn't zoom out)
  if (!document.querySelector('meta[name="viewport"]')) {
    const m = document.createElement('meta');
    m.name = 'viewport';
    m.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0';
    document.head.prepend(m);
  }

  function init() {
    // Only add toggle if rail-left exists and viewport is small
    const railLeft = document.querySelector('.rail-left');
    if (!railLeft) return;

    // Create toggle button
    const btn = document.createElement('button');
    btn.className = 'rail-toggle-btn';
    btn.setAttribute('aria-label', 'Toggle navigation');
    btn.textContent = '☰';
    document.body.appendChild(btn);

    // Toggle state
    btn.addEventListener('click', () => {
      const isOpen = document.body.dataset.railLeft === 'open';
      document.body.dataset.railLeft = isOpen ? '' : 'open';
      btn.textContent = isOpen ? '☰' : '✕';
    });

    // Close on slate click when open
    const slate = document.querySelector('.slate-area');
    if (slate) {
      slate.addEventListener('click', () => {
        if (document.body.dataset.railLeft === 'open') {
          document.body.dataset.railLeft = '';
          btn.textContent = '☰';
        }
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
