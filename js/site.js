// Shared by every page: content checks, drafts, languages, footer, and the phone/tablet menu.
// Runs after content/content.js (and content/content.<lang>.js on translated pages), before the page script.

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
    box.innerHTML = `<p class="card-label">content needs a fix</p><ul>${problems.map(p => `<li>${esc(p)}</li>`).join('')}</ul>`;
    document.body.appendChild(box);
  }

  let C = window.CONTENT;
  if (!C) {
    // A syntax error (missing comma, quote or bracket) stops content.js from loading at all.
    problems.push('content.js could not be read. Usually this is a missing comma, quote or bracket. Undo your last change, or open the browser console (right-click → Inspect → Console) to see the line number.');
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

  // ---------- languages ----------
  // English is the original (content.js, pages at the top level). Every other language has its
  // pages in a folder (/bg/) and its text in content/content.<lang>.js. Text missing there
  // falls back to English and is listed in the corner box while editing locally.
  const NAMES = { en: 'English', bg: 'Български', it: 'Italiano' };
  const LANG = document.documentElement.lang || 'en';
  const languages = (S.languages || ['en']).filter(l => NAMES[l]);
  const TR = LANG === 'en' ? null : (window.TRANSLATIONS || {})[LANG];
  const missing = new Set();
  if (LANG !== 'en' && !TR) problems.push(`content.${LANG}.js could not be read. Usually this is a missing comma, quote or bracket.`);
  const tr = TR || {};

  // Interface text: the English wording is the key, e.g. t('next project').
  const t = s => {
    if (LANG === 'en') return s;
    const v = tr.ui && tr.ui[s];
    if (v == null) { missing.add(`ui: “${s}”`); return s; }
    return v;
  };
  const prefixOf = l => (l === 'en' ? '' : l + '/');
  // Links inside the site stay in the current language. (Pages in /bg/ have <base href="../">.)
  const href = path => prefixOf(LANG) + path;
  // The same page in another language.
  const file = location.pathname.split('/').pop();
  const pageIn = l => new URL(prefixOf(l) + file + location.search, document.baseURI).href;

  if (TR) {
    const take = (obj, from, fields, where) => {
      for (const f of fields) {
        if (obj[f] == null || obj[f] === '') continue;
        if (from && from[f] != null) obj[f] = from[f]; else missing.add(`${where}: ${f}`);
      }
    };
    if (tr.site?.name) S.name = tr.site.name;  // optional: without it the name stays as in content.js
    if (S.location) tr.site?.location ? (S.location = tr.site.location) : missing.add('site: location');
    if (S.legal?.address) tr.site?.address ? (S.legal.address = tr.site.address) : missing.add('site: address');
    for (const f of [...C.filters.projects, ...C.filters.about]) {
      tr.filters?.[f.id] ? (f.label = tr.filters[f.id]) : missing.add(`filters: ${f.id}`);
    }
    for (const a of C.about) {
      const x = tr.about?.[a.id];
      if (!x) { missing.add(`about: ${a.id}`); continue; }
      take(a, x, ['label', 'statement', 'columns'], a.id);
      (a.rows || []).forEach((r, i) => {
        const xr = x.rows?.[i];
        if (!xr) return missing.add(`${a.id}: row ${i + 1}`);
        for (const f of ['when', 'where', 'what']) if (xr[f] != null) r[f] = xr[f];
      });
    }
    for (const p of C.projects) {
      const x = tr.projects?.[p.slug];
      if (!x) { missing.add(`project: ${p.slug}`); continue; }
      take(p, x, ['title', 'client', 'discipline', 'intro'], p.slug);
      if (x.year) p.year = x.year;
      const xb = x.blocks || [];
      if (xb.length !== p.blocks.length) missing.add(`${p.slug}: blocks don’t match (English has ${p.blocks.length}, translation ${xb.length})`);
      p.blocks.forEach((b, i) => {
        if (!xb[i]) return;
        if (!!b.media !== !xb[i].title) missing.add(`${p.slug}: block ${i + 1} is ${b.media ? 'media' : 'text'} in English but not in the translation`);
        take(b, xb[i], b.media ? ['alt', 'caption'] : ['title', 'text'], `${p.slug} block ${i + 1}`);
      });
    }
  }

  window.I18N = { lang: LANG, t, href, pageIn };

  // The name in the top bar comes from the content, so each language can write it its own way.
  document.querySelectorAll('.site-name').forEach(a => { a.textContent = S.name; });

  // Fixed text in the page shells: <span data-t>projects</span>, <meta data-t-content content="…">.
  if (LANG !== 'en') {
    // <base href="../"> would send in-page links (#project) to the top-level page; keep them here.
    document.querySelectorAll('a[href^="#"]').forEach(a => a.setAttribute('href', location.pathname + location.search + a.getAttribute('href')));
    document.querySelectorAll('[data-t]').forEach(el => { el.textContent = t(el.textContent.trim()); });
    document.querySelectorAll('[data-t-content]').forEach(el => el.setAttribute('content', t(el.getAttribute('content'))));
    document.querySelectorAll('[data-t-label]').forEach(el => el.setAttribute('aria-label', t(el.getAttribute('aria-label'))));
  }

  // Search engines: every language version of this page points to the others.
  if (languages.length > 1) {
    for (const l of [...languages, 'x-default']) {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = l;
      link.href = pageIn(l === 'x-default' ? 'en' : l);
      document.head.appendChild(link);
    }
  }

  // ---------- shared markup ----------
  const isHome = document.body.classList.contains('home');

  const legalLinks = `<a href="${href('privacy.html')}">${t('Privacy Policy')}</a><a href="${href('terms.html')}">${t('Terms of Use')}</a>`;
  const contactLinks = `<a href="mailto:${esc(S.email)}">${t('email')}</a><a href="${esc(S.instagram)}" target="_blank" rel="noopener">instagram</a>`;
  // EN · BG · IT, the current one in bold. Each links to this same page in that language.
  const langSwitch = () => languages.length < 2 ? '' : `
    <nav class="lang-switch" aria-label="${t('Language')}">${languages.map(l =>
      `<a href="${esc(pageIn(l))}" lang="${l}" hreflang="${l}" title="${NAMES[l]}"${l === LANG ? ' aria-current="true"' : ''}>${l}</a>`).join('')}</nav>`;

  // Footer (Figma: footer + its hover frame): one line in a paper bar: headline and contact on
  // the left, the language switch on the right. On hover or keyboard focus the bar grows upwards
  // over the filters; the location and legal links then appear above the switch, one per line.
  const footer = document.getElementById('siteFooter');
  if (footer) {
    footer.innerHTML = `
      <div class="footer-panel">
        <div class="footer-main">
          <a class="cta" href="mailto:${esc(S.email)}">${t('Let’s work together!')}</a>
          <nav class="footer-links" aria-label="${t('Contact')}">${contactLinks}</nav>
          ${langSwitch()}
          <nav class="footer-legal" aria-label="${t('Legal')}">${S.location ? `<span>${esc(S.location)}</span>` : ''}${legalLinks}</nav>
        </div>
      </div>`;
  }

  // Phone/tablet menu (< 800px, Figma: menu frame): name + hamburger; the menu holds
  // the filters under their projects/about pill (home), the language switch and the footer.
  const header = document.getElementById('siteHeader');
  if (header) {
    const pill = view => isHome
      ? `<button class="menu-pill" type="button" data-view="${view}" aria-pressed="false">${t(view)}</button>`
      : `<a class="menu-pill" href="${href(`index.html?view=${view}`)}" data-view="${view}">${t(view)}</a>`;
    const group = view => `
      <div class="menu-group">
        ${pill(view)}
        ${isHome ? `<div class="filter-row" data-group="${view}" role="group" aria-label="${t(view)}"></div>` : ''}
      </div>`;

    header.insertAdjacentHTML('beforeend', `
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="menu" aria-label="${t('Open menu')}">
        <svg class="icon-open" width="40" height="8" viewBox="0 0 40 8" aria-hidden="true"><path d="M0 .5h40M0 7.5h40" stroke="currentColor"/></svg>
        <svg class="icon-close" width="35" height="21" viewBox="0 0 35.05 20.82" aria-hidden="true"><path d="M.25.43l34.55 19.95M.25 20.38L34.8.43" stroke="currentColor"/></svg>
      </button>`);
    header.insertAdjacentHTML('afterend', `
      <div class="menu" id="menu" hidden>
        <section class="menu-filters" aria-labelledby="menuFiltersLabel">
          <h2 class="filters-label" id="menuFiltersLabel">${t(isHome ? 'What would you like to explore?' : 'Explore')}</h2>
          ${group('projects')}
          ${group('about')}
          ${isHome ? `<button class="explore-pill menu-show" type="button">${t('explore')} <span class="explore-count" hidden></span></button>` : ''}
        </section>
        <div class="menu-lang">${langSwitch() || `<span lang="${LANG}">${LANG}</span>`}</div>
        <div class="menu-footer">
          <a class="cta" href="mailto:${esc(S.email)}">${t('Let’s work together!')}</a>
          <nav class="footer-links" aria-label="${t('Contact')}">${contactLinks}</nav>
          <nav class="footer-legal" aria-label="${t('Legal')}">${legalLinks}</nav>
          ${S.location ? `<p class="menu-location">${esc(S.location)}</p>` : ''}
        </div>
      </div>`);

    const menu = document.getElementById('menu');
    const btn = header.querySelector('.menu-toggle');
    const setMenu = open => {
      menu.hidden = !open;
      document.body.classList.toggle('menu-open', open);
      btn.setAttribute('aria-expanded', String(open));
      btn.setAttribute('aria-label', t(open ? 'Close menu' : 'Open menu'));
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

  // Report after the page script has run, so its missing interface text is included too.
  document.addEventListener('DOMContentLoaded', () => {
    for (const m of missing) problems.push(`content.${LANG}.js is missing ${m} (shown in English)`);
    problems.forEach(p => console.warn(p));
    if (local) showProblems();
  });
})();
