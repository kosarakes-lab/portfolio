// Shared by every page: content checks, drafts, footer, and the phone/tablet menu.
// Runs after content/content.js and before the page script.

(function () {
  // "Local" = the site is open on your own computer while you edit it. Visitors never see the notices.
  const local = location.protocol === 'file:' || /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);
  const problems = [];
  const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  function showProblems() {
    if (!problems.length) return;
    const box = document.createElement('aside');
    box.className = 'content-notice';
    box.setAttribute('role', 'alert');
    box.innerHTML = `<p class="card-label">content.js needs a fix</p><ul>${problems.map(p => `<li>${esc(p)}</li>`).join('')}</ul>`;
    document.body.appendChild(box);
  }

  let C = window.CONTENT;
  if (!C) {
    // A syntax error (missing comma, quote or bracket) stops content.js from loading at all.
    problems.push('The file could not be read. Usually this is a missing comma, quote or bracket. Undo your last change, or open the browser console (right-click → Inspect → Console) to see the line number.');
    C = window.CONTENT = { site: { legal: {} }, filters: { projects: [], about: [] }, strip: [], about: [], projects: [] };
  }
  const S = C.site || {};

  // Drafts are visible only while editing locally.
  if (!local) C.projects = C.projects.filter(p => !p.draft);

  // ---------- content checks ----------
  const tags = new Set([...C.filters.projects, ...C.filters.about].map(f => f.id));
  const slugs = new Set(C.projects.map(p => p.slug));
  const aboutIds = new Set(C.about.map(a => a.id));
  for (const key of C.strip) {
    const known = key.startsWith('about:') ? aboutIds.has(key) : slugs.has(key);
    if (!known && (local || key.startsWith('about:'))) problems.push(`strip: “${key}” doesn’t match any project slug or about id.`);
  }
  for (const p of C.projects) {
    if (!C.strip.includes(p.slug)) problems.push(`project “${p.slug}” isn’t in strip, so it has no card.`);
    for (const t of p.tags || []) if (!tags.has(t)) problems.push(`project “${p.slug}”: unknown tag “${t}”.`);
    if (p.draft) console.info(`content.js: “${p.slug}” is a draft: visible here, hidden on the live site.`);
  }
  for (const a of C.about) {
    if (!tags.has(a.tag)) problems.push(`about card “${a.id}”: unknown tag “${a.tag}”.`);
  }
  problems.forEach(p => console.warn('content.js: ' + p));
  if (local) document.addEventListener('DOMContentLoaded', showProblems);

  // ---------- shared markup ----------
  const isHome = document.body.classList.contains('home');

  const legalLinks = `<a href="privacy.html">Privacy Policy</a><a href="terms.html">Terms of Use</a>`;
  const contactLinks = `<a href="mailto:${esc(S.email)}">email</a><a href="${esc(S.instagram)}" target="_blank" rel="noopener">instagram</a>`;

  // Footer (Figma: footer + its hover frame): one line in a paper bar (headline and contact
  // on the left, location and legal links on the right); on hover or keyboard focus the bar
  // grows upwards over the filters, and the line stays where it is.
  const footer = document.getElementById('siteFooter');
  if (footer) {
    footer.innerHTML = `
      <div class="footer-panel">
        <div class="footer-main">
          <a class="cta" href="mailto:${esc(S.email)}">Let’s work together!</a>
          <nav class="footer-links" aria-label="Contact">${contactLinks}</nav>
          <nav class="footer-legal" aria-label="Legal">${S.location ? `<span>${esc(S.location)}</span>` : ''}${legalLinks}</nav>
        </div>
      </div>`;
  }

  // Phone/tablet menu (< 800px, Figma: menu frame): name + hamburger; the menu holds
  // the filters under their projects/about pill (home), the language and the footer.
  const header = document.getElementById('siteHeader');
  if (header) {
    const pill = view => isHome
      ? `<button class="menu-pill" type="button" data-view="${view}" aria-pressed="false">${view}</button>`
      : `<a class="menu-pill" href="index.html?view=${view}" data-view="${view}">${view}</a>`;
    const group = view => `
      <div class="menu-group">
        ${pill(view)}
        ${isHome ? `<div class="filter-row" data-group="${view}" role="group" aria-label="${view[0].toUpperCase() + view.slice(1)}"></div>` : ''}
      </div>`;

    header.insertAdjacentHTML('beforeend', `
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="menu" aria-label="Open menu">
        <svg class="icon-open" width="40" height="8" viewBox="0 0 40 8" aria-hidden="true"><path d="M0 .5h40M0 7.5h40" stroke="currentColor"/></svg>
        <svg class="icon-close" width="35" height="21" viewBox="0 0 35.05 20.82" aria-hidden="true"><path d="M.25.43l34.55 19.95M.25 20.38L34.8.43" stroke="currentColor"/></svg>
      </button>`);
    header.insertAdjacentHTML('afterend', `
      <div class="menu" id="menu" hidden>
        <section class="menu-filters" aria-labelledby="menuFiltersLabel">
          <h2 class="filters-label" id="menuFiltersLabel">${isHome ? 'What would you like to explore?' : 'Explore'}</h2>
          ${group('projects')}
          ${group('about')}
          ${isHome ? `<button class="explore-pill menu-show" type="button">explore <span class="explore-count" hidden></span></button>` : ''}
        </section>
        <p class="menu-lang"><span lang="en">en</span></p>
        <div class="menu-footer">
          <a class="cta" href="mailto:${esc(S.email)}">Let’s work together!</a>
          <nav class="footer-links" aria-label="Contact">${contactLinks}</nav>
          <nav class="footer-legal" aria-label="Legal">${legalLinks}</nav>
          ${S.location ? `<p class="menu-location">${esc(S.location)}</p>` : ''}
        </div>
      </div>`);

    const menu = document.getElementById('menu');
    const btn = header.querySelector('.menu-toggle');
    const setMenu = open => {
      menu.hidden = !open;
      document.body.classList.toggle('menu-open', open);
      btn.setAttribute('aria-expanded', String(open));
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      if (open) (menu.querySelector('.menu-pill') || menu).focus();
    };
    btn.addEventListener('click', () => setMenu(menu.hidden));
    menu.addEventListener('keydown', e => { if (e.key === 'Escape') { setMenu(false); btn.focus(); } });
    matchMedia('(min-width: 800px)').addEventListener('change', e => { if (e.matches) setMenu(false); });
    window.SITE = {
      openMenu: () => setMenu(true),
      closeMenu: () => setMenu(false),
      scrollMenuTo: sel => { setMenu(true); menu.querySelector(sel)?.scrollIntoView({ block: 'start' }); },
    };
  }
})();
