// Home: project + about cards filtered by two rows of pills.
//  ≥ 800px  one horizontal strip that loops; the wheel, a drag or the arrow keys move it sideways.
//  < 800px  a vertical list that scrolls with the page; filters live in the menu.
// Content comes from content/content.js (window.CONTENT).

const C = window.CONTENT;
const strip = document.getElementById('strip');
const inner = document.getElementById('stripInner');
const filterRows = [...document.querySelectorAll('.filter-row[data-group]')];
const statusEl = document.getElementById('filtersStatus');
const column = matchMedia('(max-width: 799px)');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

const bySlug = Object.fromEntries(C.projects.map(p => [p.slug, p]));
const byAboutId = Object.fromEntries(C.about.map(a => [a.id, a]));

// Strip entries resolved to { key, kind, data, tags }
const items = C.strip.map(key => {
  if (key.startsWith('about:')) {
    const a = byAboutId[key];
    return a && { key, kind: a.statement ? 'statement' : 'rows', data: a, tags: [a.tag] };
  }
  const p = bySlug[key];
  return p && { key, kind: 'project', data: p, tags: p.tags };
}).filter(Boolean);

// Only filters that match at least one card get a pill, so a filter can never empty the strip.
const usedTags = new Set(items.flatMap(i => i.tags));
const groups = {
  projects: C.filters.projects.filter(f => usedTags.has(f.id)),
  about: C.filters.about.filter(f => usedTags.has(f.id)),
};
const groupIds = { projects: groups.projects.map(f => f.id), about: groups.about.map(f => f.id) };

const COPIES = 3;           // copy 1 is the "real" one; 0 and 2 make the loop seamless
const ratios = {};          // cover aspect ratios by project slug

const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const isVideo = src => /\.(mp4|webm|mov)$/i.test(src);
const posterFor = src => 'assets/posters/' + src.split('/').pop().replace(/\.\w+$/, '.jpg');

// ---------- Rendering ----------

function coverHtml(d, hidden) {
  const pos = d.focus ? ` style="object-position:${esc(d.focus)}"` : '';
  if (isVideo(d.cover)) {
    // Silent loop; plays only while on screen (see watchVideos).
    return `<video src="${esc(d.cover)}" poster="${esc(d.poster || posterFor(d.cover))}" muted loop playsinline preload="metadata"${pos} aria-hidden="true"></video>`;
  }
  return `<img src="${esc(d.cover)}" alt="${hidden ? '' : esc(d.title)}" draggable="false"${pos}>`;
}

function cardHtml(item, copy) {
  const hidden = copy !== 1;
  const tab = hidden ? ' tabindex="-1"' : '';
  const d = item.data;
  if (item.kind === 'project') {
    return `
      <a class="card card-project" data-key="${item.key}" href="project.html?p=${encodeURIComponent(d.slug)}"${tab}
         style="--ratio:${ratios[item.key] || 16 / 9};--ratio-col:${Math.max(ratios[item.key] || 16 / 9, 0.8)}">
        <div class="card-body">
          <div class="card-media">${coverHtml(d, hidden)}</div>
          <div class="card-info">
            <p class="card-title">${esc(d.title)}</p>
            <p class="card-sub">${esc(d.client)}</p>
          </div>
        </div>
      </a>`;
  }
  if (item.kind === 'statement') {
    return `
      <section class="card card-about" data-key="${item.key}">
        <div class="card-body">
          <h2 class="card-label">${esc(d.label)}</h2>
          <p class="card-statement">${esc(d.statement)}</p>
        </div>
      </section>`;
  }
  // Rows card: a small table, one rounded block like a spreadsheet: a header row, then one row per
  // entry split by hairlines; the first column is filled in ink like a spreadsheet's row headers.
  const [h1, h2, h3] = d.columns || ['When', 'Where', 'What'];
  return `
    <section class="card card-about card-rows" data-key="${item.key}">
      <div class="card-body">
        <h2 class="card-label">${esc(d.label)}</h2>
        <div class="cv-table" role="table" aria-label="${esc(d.label)}">
          <div class="cv-row cv-head" role="row">
            <span class="cv-when" role="columnheader">${esc(h1)}</span>
            <span class="cv-where" role="columnheader">${esc(h2)}<span class="cv-head-what"> / ${esc(h3)}</span></span>
            <span class="cv-what" role="columnheader">${esc(h3)}</span>
          </div>
          ${d.rows.map(r => `
            <div class="cv-row" role="row">
              <span class="cv-when" role="cell">${esc(r.when).replace(/\s*-\s*/g, '–')}</span>
              <span class="cv-where" role="rowheader">${esc(r.where)}</span>
              <span class="cv-what" role="cell">${esc(r.what)}</span>
            </div>`).join('')}
        </div>
      </div>
    </section>`;
}

function renderStrip() {
  inner.innerHTML = Array.from({ length: COPIES }, (_, copy) => `
    <div class="strip-copy" data-copy="${copy}"${copy !== 1 ? ' aria-hidden="true"' : ''}>
      ${items.map(it => cardHtml(it, copy)).join('')}
    </div>`).join('');
}

function renderFilters() {
  for (const row of filterRows) {
    const group = row.dataset.group;
    row.innerHTML = groups[group].map(f =>
      `<button class="filter" type="button" data-group="${group}" data-id="${f.id}" aria-pressed="false">${esc(f.label)}</button>`
    ).join('');
  }
}

// ---------- Videos: play only what is on screen ----------

const videoObserver = new IntersectionObserver(entries => {
  for (const e of entries) {
    const v = e.target;
    if (e.isIntersecting && !reducedMotion.matches) v.play().catch(() => {});
    else v.pause();
  }
}, { threshold: 0.15 });

function watchVideos() {
  inner.querySelectorAll('video').forEach(v => videoObserver.observe(v));
}

// ---------- Sizing (horizontal mode) ----------
// Every card gets an explicit pixel width so filtering can animate it closed.

const css = name => parseFloat(getComputedStyle(document.documentElement).getPropertyValue(name));
let widths = {};

function clearSizes() {
  for (const el of inner.querySelectorAll('.card')) {
    el.style.width = '';
    const media = el.querySelector('.card-media');
    if (media) media.style.width = '';
  }
  inner.querySelectorAll('.card-statement').forEach(el => { el.style.fontSize = ''; });
  inner.querySelectorAll('.card-rows').forEach(el => { el.style.removeProperty('--row-pad'); });
}

function probeOf(sample, item, width) {
  const probe = sample.querySelector(`[data-key="${CSS.escape(item.key)}"]`).cloneNode(true);
  probe.classList.remove('is-hidden');
  probe.style.cssText = `position:absolute;visibility:hidden;width:${width};transition:none`;
  strip.appendChild(probe);
  return probe;
}

function measure() {
  const stripH = strip.clientHeight;
  const cardH = Math.max(320, Math.min(500, stripH - 12));
  document.documentElement.style.setProperty('--card-h', cardH + 'px');

  const pad = css('--card-pad');
  const maxCardW = strip.clientWidth - css('--gutter') * 2;
  const sample = inner.querySelector('.strip-copy[data-copy="1"]');

  widths = {};
  for (const item of items) {
    const el = sample.querySelector(`[data-key="${CSS.escape(item.key)}"]`);
    let w;
    if (item.kind === 'project') {
      const mediaH = el.querySelector('.card-media').clientHeight;
      const mediaW = Math.round(Math.min(mediaH * (ratios[item.key] || 16 / 9), maxCardW - pad * 2));
      const infoW = Math.max(...[...el.querySelectorAll('.card-info > *')].map(n => n.scrollWidth));
      w = Math.max(mediaW, infoW) + pad * 2;
      widths[item.key + ':media'] = mediaW;
    } else if (item.kind === 'statement') {
      w = Math.min(item.data.width || 384, maxCardW);
    } else {
      // Measured on an unsized copy: the table's last column stretches to whatever width it is given.
      const probe = probeOf(sample, item, 'auto');
      w = Math.min(Math.max(probe.querySelector('.cv-table').scrollWidth, 320) + pad * 2, maxCardW);
      probe.remove();
    }
    widths[item.key] = Math.ceil(w);
  }

  // Long statements shrink (down to 20px) instead of being cut off.
  // Measured on an off-screen copy, since a filtered-out card has no width to measure in.
  const display = css('--display');
  for (const item of items.filter(i => i.kind === 'statement')) {
    const probe = probeOf(sample, item, widths[item.key] + 'px');
    const st = probe.querySelector('.card-statement');
    const body = probe.querySelector('.card-body');
    st.style.fontSize = '';
    let size = display;
    while (size > 20 && body.scrollHeight > body.clientHeight) st.style.fontSize = (size -= 2) + 'px';
    probe.remove();
    for (const el of inner.querySelectorAll(`[data-key="${CSS.escape(item.key)}"] .card-statement`)) {
      el.style.fontSize = size < display ? size + 'px' : '';
    }
  }

  // Tables on short screens: rows tighten (down to 6px padding) until they fit the card.
  for (const item of items.filter(i => i.kind === 'rows')) {
    const probe = probeOf(sample, item, widths[item.key] + 'px');
    const body = probe.querySelector('.card-body');
    let pad = 19;
    probe.style.removeProperty('--row-pad');
    while (pad > 6 && body.scrollHeight > body.clientHeight) probe.style.setProperty('--row-pad', (pad -= 1) + 'px');
    probe.remove();
    for (const el of inner.querySelectorAll(`[data-key="${CSS.escape(item.key)}"]`)) {
      if (pad < 19) el.style.setProperty('--row-pad', pad + 'px'); else el.style.removeProperty('--row-pad');
    }
  }

  // The open footer covers the whole filter block, so its edge never cuts through a line of text.
  const filtersEl = document.getElementById('filters');
  // (The cards are centred in the strip, so it also covers the strip's few pixels below them.)
  document.documentElement.style.setProperty('--footer-open', filtersEl.offsetHeight + css('--footer-h') + Math.floor((stripH - cardH) / 2) + 'px');

  for (const el of inner.querySelectorAll('.card')) {
    el.style.width = widths[el.dataset.key] + 'px';
    const media = el.querySelector('.card-media');
    if (media) media.style.width = widths[el.dataset.key + ':media'] + 'px';
  }
}

// ---------- Filter state ----------
// Empty set = nothing selected = everything shown (the page is never empty).

let active = new Set();

function isVisible(item) {
  return active.size === 0 || item.tags.some(t => active.has(t));
}

function setActive(next, animate = true) {
  active = next;
  for (const b of document.querySelectorAll('.filter')) {
    b.setAttribute('aria-pressed', String(active.has(b.dataset.id)));
  }
  // A nav pill is on exactly when its whole group is on and nothing else is.
  const only = ids => ids.length > 0 && active.size === ids.length && ids.every(id => active.has(id));
  for (const p of document.querySelectorAll('[data-view]')) {
    p.setAttribute('aria-pressed', String(only(groupIds[p.dataset.view])));
  }

  const shown = items.filter(isVisible).length;
  statusEl.textContent = active.size ? `Showing ${shown} of ${items.length}` : `Showing all ${items.length}`;
  // Number of filters on, shown only while some (not all) are on: none on means everything is shown.
  const total = groupIds.projects.length + groupIds.about.length;
  const partial = active.size > 0 && active.size < total;
  document.querySelectorAll('.explore-count').forEach(el => { el.textContent = String(active.size); el.hidden = !partial; });
  document.querySelectorAll('.explore-pill').forEach(el => el.setAttribute('aria-label', partial
    ? `Explore: ${active.size} ${active.size === 1 ? 'filter' : 'filters'} on, ${shown} ${shown === 1 ? 'result' : 'results'}`
    : 'Explore: all filters'));

  applyVisibility(animate);
}

function toggleFilter(id) {
  const next = active.size === 0 ? new Set([id]) : new Set(active);
  if (active.size !== 0) next.has(id) ? next.delete(id) : next.add(id);
  setActive(next);
}

function selectView(view) {
  const ids = groupIds[view];
  const already = active.size === ids.length && ids.every(id => active.has(id));
  setActive(already ? new Set() : new Set(ids));
}

// ---------- Strip motion (horizontal mode) ----------

let W = 0;            // width of one copy (visible cards + their gaps)
let loop = true;
let target = 0, current = 0;
let raf = 0;

const mod = (n, m) => ((n % m) + m) % m;

function copyWidth() {
  return items.reduce((sum, it) => sum + (isVisible(it) ? widths[it.key] + css('--card-gap') : 0), 0);
}

function render() {
  if (column.matches) { inner.style.transform = ''; return; }
  // The strip runs edge to edge. At rest the first card sits on the gutter line, in line with
  // the filters, and the copy to its left is hidden so nothing peeks into the gutter.
  const x = loop ? mod(current, W) : 0;
  inner.style.transform = `translate3d(${css('--gutter') - (W + x)}px,0,0)`;
  strip.classList.toggle('at-start', x === 0);
}

function tick() {
  const d = target - current;
  current = Math.abs(d) < 0.3 ? target : current + d * 0.16;
  render();
  raf = current !== target ? requestAnimationFrame(tick) : 0;
}

function nudge(dx) {
  if (!loop || column.matches) return;
  target += dx;
  if (!raf) raf = requestAnimationFrame(tick);
}

function applyVisibility(animate) {
  for (const el of inner.querySelectorAll('.card')) {
    const item = items.find(i => i.key === el.dataset.key);
    el.classList.toggle('is-hidden', !isVisible(item));
    if (el.closest('[data-copy="1"]')) el.toggleAttribute('inert', !isVisible(item));
  }

  if (column.matches) {
    // Vertical list: the remaining cards fade in from the top of the list.
    if (animate && !reducedMotion.matches) {
      inner.animate([{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }], { duration: 300, easing: 'ease-out' });
    }
    return;
  }

  const newW = copyWidth();
  const newLoop = newW - css('--card-gap') > strip.clientWidth - css('--gutter');

  cancelAnimationFrame(raf); raf = 0;
  // Copy 0 collapses from W to newW while the row slides from -(W+x) to -newW with the same easing,
  // so the first visible card glides back to the gutter line instead of jumping.
  if (animate) {
    inner.style.transition = `transform var(--t-filter) var(--ease-move)`;
    clearTimeout(applyVisibility.t);
    applyVisibility.t = setTimeout(() => { inner.style.transition = ''; }, css('--t-filter') + 60);
  }
  W = newW;
  loop = newLoop;
  strip.classList.toggle('no-loop', !loop);
  target = current = 0;
  render();
}

// After a swipe or a wheel scroll, settle with a card's left edge on the gutter line.
function snap() {
  if (!loop) return;
  const x = mod(target, W);
  let best = 0, edge = 0;
  for (const it of items) {
    if (!isVisible(it)) continue;
    if (Math.abs(edge - x) < Math.abs(best - x)) best = edge;
    edge += widths[it.key] + css('--card-gap');
  }
  if (Math.abs(W - x) < Math.abs(best - x)) best = W;
  target += best - x;
  if (!raf) raf = requestAnimationFrame(tick);
}

let wheelIdle;
function onWheel(e) {
  if (column.matches || document.body.classList.contains('menu-open')) return;
  if (e.target.closest('.site-footer')) return;
  e.preventDefault();
  const k = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? strip.clientWidth : 1;
  nudge((Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY) * k);
  clearTimeout(wheelIdle);
  wheelIdle = setTimeout(snap, 180);
}

// Drag (mouse) and swipe (touch) with a little momentum
let drag = null;
function onPointerDown(e) {
  if (e.button !== 0 || column.matches) return;
  drag = { x: e.clientX, last: e.clientX, t: performance.now(), v: 0, moved: 0, id: e.pointerId };
}
function onPointerMove(e) {
  if (!drag || e.pointerId !== drag.id) return;
  const dx = e.clientX - drag.last;
  const now = performance.now();
  drag.v = dx / Math.max(1, now - drag.t);
  drag.last = e.clientX; drag.t = now;
  drag.moved = Math.max(drag.moved, Math.abs(e.clientX - drag.x));
  if (drag.moved > 5) {
    if (!strip.classList.contains('is-dragging')) {
      strip.classList.add('is-dragging');
      strip.setPointerCapture(e.pointerId);
    }
    if (loop) { target -= dx; current = target; render(); }
  }
}
function onPointerUp() {
  if (!drag) return;
  if (drag.moved > 5) {
    nudge(-drag.v * 280);
    snap();
    // swallow the click that follows a drag
    strip.addEventListener('click', ev => { ev.preventDefault(); ev.stopPropagation(); }, { capture: true, once: true });
  }
  strip.classList.remove('is-dragging');
  drag = null;
}

function onKey(e) {
  if (column.matches || e.target.closest('input, textarea, .site-footer')) return;
  if (e.key === 'ArrowRight') { nudge(320); clearTimeout(wheelIdle); wheelIdle = setTimeout(snap, 180); e.preventDefault(); }
  if (e.key === 'ArrowLeft') { nudge(-320); clearTimeout(wheelIdle); wheelIdle = setTimeout(snap, 180); e.preventDefault(); }
}

// ---------- Boot ----------

function loadRatios() {
  return Promise.all(C.projects.map(p => new Promise(res => {
    const done = (w, h) => { if (w && h) ratios[p.slug] = w / h; res(); };
    if (isVideo(p.cover)) {
      const v = document.createElement('video');
      v.preload = 'metadata';
      v.onloadedmetadata = () => done(v.videoWidth, v.videoHeight);
      v.onerror = () => res();
      v.src = p.cover;
    } else {
      const img = new Image();
      img.onload = () => done(img.naturalWidth, img.naturalHeight);
      img.onerror = () => res();
      img.src = p.cover;
    }
  })));
}

function relayout() {
  if (column.matches) {
    clearSizes();
    inner.style.transform = '';
    strip.classList.remove('no-loop', 'at-start');
  } else {
    measure();
  }
  applyVisibility(false);
}

async function boot() {
  await Promise.race([Promise.all([loadRatios(), document.fonts.ready]), new Promise(r => setTimeout(r, 2500))]);
  renderFilters();
  renderStrip();
  watchVideos();
  relayout();

  // Phones: a pill at the bottom of the screen opens the filters in the menu.
  document.body.insertAdjacentHTML('beforeend',
    `<button class="explore-pill explore-button" type="button" aria-controls="menu">explore <span class="explore-count" hidden></span></button>`);
  document.querySelector('.explore-button').addEventListener('click', () => window.SITE?.scrollMenuTo('.menu-filters'));

  const view = new URLSearchParams(location.search).get('view');
  setActive(view === 'about' || view === 'projects' ? new Set(groupIds[view]) : new Set(), false);
  strip.classList.add('is-ready');

  document.addEventListener('click', e => {
    const f = e.target.closest('.filter');
    if (f) return toggleFilter(f.dataset.id);
    const v = e.target.closest('button[data-view]');
    if (v) {
      selectView(v.dataset.view);
      if (v.closest('.menu')) window.SITE?.closeMenu();
      return;
    }
    if (e.target.closest('.menu-show')) { window.SITE?.closeMenu(); window.scrollTo({ top: 0 }); }
  });

  window.addEventListener('wheel', onWheel, { passive: false });
  strip.addEventListener('pointerdown', onPointerDown);
  window.addEventListener('pointermove', onPointerMove);
  window.addEventListener('pointerup', onPointerUp);
  window.addEventListener('pointercancel', onPointerUp);
  window.addEventListener('keydown', onKey);
  let rt;
  window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(relayout, 120); });
  column.addEventListener('change', relayout);
}

boot();
