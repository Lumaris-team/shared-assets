const ICONS = {
  home: 'https://shared-assets.lumaris.fr.eu.org/icons/home.svg',
  grid: 'https://shared-assets.lumaris.fr.eu.org/icons/grid.svg',
  sparkles: 'https://shared-assets.lumaris.fr.eu.org/icons/sparkles.svg',
  notes: 'https://shared-assets.lumaris.fr.eu.org/icons/study-notes.svg',
  web: 'https://shared-assets.lumaris.fr.eu.org/icons/web.svg',
  files: 'https://shared-assets.lumaris.fr.eu.org/icons/database.svg',
  tools: 'https://shared-assets.lumaris.fr.eu.org/icons/wrench.svg',
  settings: 'https://shared-assets.lumaris.fr.eu.org/icons/settings.svg',
  refresh: 'https://shared-assets.lumaris.fr.eu.org/icons/refresh.svg',
  logout: 'https://shared-assets.lumaris.fr.eu.org/icons/logout.svg',
  more: 'https://shared-assets.lumaris.fr.eu.org/icons/more.svg',
};

const NAVBAR_STYLE = `
  :host { position: fixed; inset: 10px 14px auto; z-index: 1200; display: block; box-sizing: border-box; color: #edf5f2; pointer-events: none; }
  .bar { position: relative; min-height: 42px; padding: 6px 12px; overflow: hidden; border: 1px solid transparent; border-radius: 24px; background: rgba(8, 9, 18, .28); box-shadow: 0 10px 40px rgba(0, 0, 0, .18), 0 0 34px rgba(146, 116, 255, .08), inset 0 0 0 1px rgba(255, 255, 255, .04), inset 0 1px 0 rgba(255, 255, 255, .08); backdrop-filter: blur(22px) saturate(1.15); -webkit-backdrop-filter: blur(22px) saturate(1.15); pointer-events: auto; }
  .inner { position: relative; z-index: 1; display: grid; grid-template-columns: auto minmax(0, 1fr) auto; align-items: center; gap: 8px; }
  .brand, .feature, .quick, .cta { display: inline-flex; align-items: center; border: 1px solid transparent; border-radius: 999px; background: transparent; color: inherit; cursor: pointer; text-decoration: none; transition: transform 180ms ease, color 180ms ease, background 180ms ease; }
  .brand { grid-column: 1; padding: 4px 0; }
  .brand-icon-wrap { display: inline-grid; place-items: center; width: 60px; height: 44px; overflow: hidden; border-radius: 999px; }
  .brand-icon { width: 52px; height: 44px; object-fit: contain; border-radius: 999px; }
  .center { grid-column: 2; min-width: 0; overflow: hidden; }
  .center-scroll { overflow-x: auto; scrollbar-width: none; }
  .center-scroll::-webkit-scrollbar { display: none; }
  .feature-list { display: flex; gap: 8px; width: max-content; }
  .feature { position: relative; z-index: 1; gap: 10px; padding: 8px 12px; color: rgba(237, 245, 242, .82); white-space: nowrap; }
  .feature[data-active="true"] { color: #f4fbf8; }
  .feature-icon, .action-icon { display: inline-grid; place-items: center; flex: 0 0 auto; width: 32px; height: 32px; overflow: hidden; border-radius: 999px; }
  .feature-icon svg, .action-icon svg { width: 20px; height: 20px; stroke: currentColor; }
  .feature-label, .cta { font-size: .85rem; }
  .right { grid-column: 3; display: flex; align-items: center; gap: 8px; justify-content: flex-end; min-width: 42px; }
  .quick { justify-content: center; padding: 8px 10px; color: rgba(237, 245, 242, .82); }
  .cta { gap: 10px; padding: 8px 12px; color: rgba(237, 245, 242, .9); white-space: nowrap; }
  .cta span { color: #8cecff; font-size: 16px; }
  .brand:hover, .feature:hover, .quick:hover, .cta:hover { color: #f4fbf8; background: rgba(255, 255, 255, .05); }
  .brand:active, .feature:active, .quick:active, .cta:active { transform: translateY(1px); }
  .nav-indicator { position: absolute; top: 0; left: 0; z-index: 0; width: 0; height: 0; border-radius: 999px; background: rgba(140, 236, 255, .16); box-shadow: 0 0 26px rgba(140, 236, 255, .14), inset 0 0 0 1px rgba(140, 236, 255, .04); opacity: 0; pointer-events: none; transform: translate3d(0, 0, 0); transition: transform 360ms cubic-bezier(.22, 1, .36, 1), width 360ms cubic-bezier(.22, 1, .36, 1), height 360ms cubic-bezier(.22, 1, .36, 1), opacity 180ms ease; }
  .nav-indicator[data-hovering="true"], .nav-indicator[data-hovering="false"] { opacity: 1; }
  @media (max-width: 640px) { :host { inset: 8px 10px auto; } .bar { min-height: 48px; padding: 10px; border-radius: 20px; } .feature-label { display: none; } .feature { padding: 8px 10px; } .quick:not(.more) { display: none; } }
`;

function navbar(site) {
  const isApp = site === 'client-worker';
  if (isApp) {
    return {
      items: [
        ['home', 'Home', '/pages/home', 'home'],
        ['workspace', 'Workspace', '/pages/workspace', 'grid'],
        ['ai', 'AI', '/pages/ai', 'sparkles'],
        ['study-notes', 'Study Notes', '/pages/study-notes', 'notes'],
        ['websites', 'Websites', '/pages/websites', 'web'],
        ['files', 'Files', '/pages/files', 'files'],
        ['tools', 'Tools', '/pages/tools', 'tools'],
      ],
      action: 'app',
    };
  }
  return {
    items: [
      ['top', 'Accueil', '#top', 'home'],
      ['platform', 'Plateforme', '#platform', 'grid'],
      ['intelligence', 'Intelligence', '#intelligence', 'sparkles'],
      ['workspace', 'Espace', '#workspace', 'files'],
      ['focus', 'Focus', '#focus', 'tools'],
    ],
    action: 'landing',
  };
}

function templateFor(config) {
  const items = config.items.map(([slug, label, href, icon]) => `
    <a class="feature" data-route="${slug}" href="${href}">
      <span class="feature-icon" data-icon="${ICONS[icon]}"></span><span class="feature-label">${label}</span>
    </a>`).join('');
  const action = config.action === 'app'
     ? `<button class="quick" data-action="refresh" aria-label="Refresh page"><span class="action-icon" data-icon="${ICONS.refresh}"></span></button>
       <a class="quick" href="/pages/settings" aria-label="Open settings"><span class="action-icon" data-icon="${ICONS.settings}"></span></a>`
    : '<a class="cta" href="#platform">Explorer <span aria-hidden="true">↗</span></a>';
  return `<div class="bar"><div class="inner">
    <a class="brand" href="${config.action === 'app' ? '/pages/home' : '#top'}" aria-label="Lumaris, accueil"><span class="brand-icon-wrap"><img class="brand-icon" src="https://shared-assets.lumaris.fr.eu.org/logo/logo.png" alt="Lumaris"></span></a>
    <div class="center" role="navigation" aria-label="Navigation principale"><div class="center-scroll" tabindex="0"><div class="feature-list">${items}</div></div></div>
    <div class="right">${action}</div>
  </div><span class="nav-indicator" data-hovering="false" aria-hidden="true"></span></div>`;
}

class SiteNavbar extends HTMLElement {
  connectedCallback() {
    if (this.shadowRoot) return;
    const config = navbar(this.getAttribute('site'));
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `<style>${NAVBAR_STYLE}</style>${templateFor(config)}`;
    this.loadIcons();
    this.setupIndicator();
    this.shadowRoot.querySelector('[data-action="refresh"]')?.addEventListener('click', () => {
      const pending = [];
      const detail = {
        current: window.location.pathname.split('/').filter(Boolean).pop() || 'home',
        waitUntil: (promise) => { if (promise) pending.push(Promise.resolve(promise)); },
      };
      window.dispatchEvent(new CustomEvent('site-navbar:refresh', { detail }));
      document.dispatchEvent(new CustomEvent('site-navbar:refresh', { detail }));
      Promise.allSettled(pending);
    });
  }

  async loadIcons() {
    const icons = this.shadowRoot.querySelectorAll('[data-icon]');
    await Promise.all([...icons].map(async (icon) => {
      try {
        const response = await fetch(icon.dataset.icon);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        icon.innerHTML = await response.text();
      } catch (error) {
        console.error('Unable to load navbar icon', icon.dataset.icon, error);
      }
    }));
  }

  setupIndicator() {
    const root = this.shadowRoot;
    const bar = root.querySelector('.bar');
    const indicator = root.querySelector('.nav-indicator');
    const links = [...root.querySelectorAll('[data-route]')];
    const move = (link, hovering) => {
      if (!link) return;
      const barRect = bar.getBoundingClientRect();
      const linkRect = link.getBoundingClientRect();
      indicator.dataset.hovering = String(hovering);
      indicator.style.width = `${linkRect.width}px`;
      indicator.style.height = `${linkRect.height}px`;
      indicator.style.transform = `translate3d(${linkRect.left - barRect.left}px, ${linkRect.top - barRect.top}px, 0)`;
    };
    const active = () => {
      const key = window.location.hash.slice(1) || window.location.pathname.split('/').filter(Boolean).pop() || 'home';
      const selected = links.find((link) => link.dataset.route === key) || links[0];
      links.forEach((link) => { link.dataset.active = String(link === selected); });
      move(selected, false);
    };
    links.forEach((link) => link.addEventListener('pointerenter', () => move(link, true)));
    bar.addEventListener('pointerleave', active);
    window.addEventListener('hashchange', active);
    window.addEventListener('resize', active);
    requestAnimationFrame(active);
  }
}

if (!customElements.get('site-navbar')) customElements.define('site-navbar', SiteNavbar);