// Project page: Datalands-style case study, built from content/content.js.

const C = window.CONTENT;
const { t, href } = window.I18N;
const root = document.getElementById('project');
const slug = new URLSearchParams(location.search).get('p');

// Projects in the order they appear on the home strip, so "next project" follows the strip.
const ordered = C.strip.filter(k => !k.startsWith('about:')).map(k => C.projects.find(p => p.slug === k)).filter(Boolean);
const index = ordered.findIndex(p => p.slug === slug);
const project = ordered[index];
const next = project && ordered[(index + 1) % ordered.length];

const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const isVideo = src => /\.(mp4|webm|mov)$/i.test(src);

// Videos show a still until they play: assets/posters/<same file name>.jpg, or an explicit `poster`.
const posterFor = src => 'assets/posters/' + src.split('/').pop().replace(/\.\w+$/, '.jpg');

function media(src, alt, poster, eager) {
  return isVideo(src)
    ? `<video src="${esc(src)}" poster="${esc(poster || posterFor(src))}" autoplay muted loop playsinline preload="metadata" aria-label="${esc(alt || '')}"></video>`
    : `<img src="${esc(src)}" alt="${esc(alt || '')}"${eager ? '' : ' loading="lazy"'}>`;
}

// Body: keep the content order, but never let two text blocks touch.
function body(blocks) {
  return blocks.map((b, i) => {
    if (Array.isArray(b.media)) {
      return `<div class="block-pair">${b.media.map(m => `<figure class="block-media">${media(m, b.alt)}</figure>`).join('')}</div>`;
    }
    if (b.media) {
      return `<figure class="block-media">${media(b.media, b.alt, b.poster)}${b.caption ? `<figcaption>${esc(b.caption)}</figcaption>` : ''}</figure>`;
    }
    if (i > 0 && !blocks[i - 1].media) console.warn(`content.js: "${project.slug}" has two text blocks in a row at #${i}`);
    return `<section class="block-text"><h2>${esc(b.title)}</h2><p>${esc(b.text)}</p></section>`;
  }).join('');
}

function renderNotFound() {
  document.title = `${t('Not found')} — ${C.site.name}`;
  console.warn(`content.js: no project with slug "${slug}"`);
  root.innerHTML = `
    <div class="project-head">
      <h1 class="project-title">${t('Not found')}</h1>
      <p class="project-intro">${t('There is no project called')} “${esc(slug || '')}”.</p>
    </div>
    <a class="next-project" href="${href('index.html')}">
      <span class="card-label">${t('back to')}</span>
      <span class="next-title">${t('All projects')} →</span>
    </a>`;
}

function renderProject() {
  // The hero is the first block if it's media; the body continues after it.
  const [first, ...rest] = project.blocks;
  const heroFirst = first && typeof first.media === 'string';
  const hero = heroFirst ? first : { media: project.cover, alt: project.title };
  const blocks = heroFirst ? rest : project.blocks;

  document.title = `${project.title} — ${C.site.name}`;
  document.getElementById('crumbTitle').textContent = project.title;

  root.innerHTML = `
    <div class="project-head">
      <h1 class="project-title">${esc(project.title)}</h1>
      <dl class="project-meta">
        <div><dt>${t('year')}</dt><dd class="pill">${esc(project.year)}</dd></div>
        <div><dt>${t('client')}</dt><dd class="pill">${esc(project.client)}</dd></div>
        <div><dt>${t('discipline')}</dt><dd class="pill">${esc(project.discipline)}</dd></div>
      </dl>
      <p class="project-intro">${esc(project.intro)}</p>
    </div>
    <div class="project-hero" id="projectHero">${media(hero.media, hero.alt, hero.poster, true)}</div>
    <div class="project-body">${body(blocks)}</div>
    ${next !== project ? `
      <a class="next-project" href="${href(`project.html?p=${encodeURIComponent(next.slug)}`)}">
        <span class="card-label">${t('next project')}</span>
        <span class="next-title">${esc(next.title)}&nbsp;→</span>
      </a>` : ''}
  `;
}

if (project) renderProject(); else renderNotFound();

// Portrait media (taller than wide, like phone-format motion pieces) would leave half the column
// empty, so it moves beside the text section that follows it. With no text after it, it stays at a
// readable width instead of full width.
function placePortrait(fig) {
  const m = fig.querySelector('img, video');
  const check = () => {
    const w = m.videoWidth || m.naturalWidth, h = m.videoHeight || m.naturalHeight;
    if (!w || !h || h <= w || fig.closest('.block-split')) return;
    const text = fig.id === 'projectHero'
      ? fig.nextElementSibling?.firstElementChild
      : fig.nextElementSibling;
    if (text?.classList.contains('block-text')) {
      const split = document.createElement('div');
      split.className = 'block-split' + (fig.id === 'projectHero' ? ' is-hero' : '');
      fig.before(split);
      split.append(fig, text);
    } else {
      fig.classList.add('is-portrait');
    }
  };
  m.addEventListener('loadedmetadata', check);
  m.addEventListener('load', check);
  check();
}
document.querySelectorAll('#projectHero, .project-body > .block-media').forEach(placePortrait);
