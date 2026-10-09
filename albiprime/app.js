'use strict';
/* albi prime — clips come from catalogue.json (each has a `category` slug); categories, hero settings in site.json. No build step. */
let catalogue = [], site = { categories: [] }, query = '', quality = 'all';

const $ = s => document.querySelector(s);
const hero = $('#hero'), rowsEl = $('#rows'), browse = $('#browse'), grid = $('#grid'), dialog = $('#detail');
const search = $('#search'), searchForm = $('#search-form');
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');

const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const size = b => b >= 1e9 ? `${(b / 1e9).toFixed(2)} GB` : `${Math.round(b / 1e6)} MB`;
const isAudio = c => !c.width;
const resolution = c => isAudio(c) ? 'Audio' : c.width >= 7680 ? '8K' : c.width >= 3840 ? '4K' : c.width >= 2560 ? '1440p' : c.width >= 1920 ? '1080p' : `${c.height}p`;
const isHdr = c => Boolean(c.dynamicRange && c.dynamicRange !== 'SDR');
const duration = c => { const t = Math.round(c.duration); return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')}`; };
const title = c => c.displayTitle || c.title;
const fps = c => Math.round(Number(c.fps));
const catLabel = slug => site.categories.find(k => k.slug === slug)?.label || slug;
const channels = c => c.audioChannels === 2 ? 'Stereo' : c.audioChannels ? `${c.audioChannels} channels` : 'Unknown';
const codec = c => {
  const v = c.videoCodec || '';
  return v.startsWith('av01') ? 'AV1' : /^vp0?9/.test(v) ? 'VP9' : v.startsWith('avc') ? 'H.264' : v || 'Unknown';
};
const downloadLink = c => { try { const u = new URL(c.downloadUrl); return u.protocol === 'https:' ? u.href : null; } catch { return null; } };

const matchesQuery = c => `${title(c)} ${c.title} ${c.channel}`.toLowerCase().includes(query);

function badges(c, withFps = true) {
  const out = [`<span class="badge badge-res">${esc(resolution(c))}</span>`];
  if (isHdr(c)) out.push(`<span class="badge badge-hdr">${esc(c.dynamicRange)}</span>`);
  if (withFps && !isAudio(c)) out.push(`<span class="badge">${esc(fps(c))} fps</span>`);
  out.push(`<span class="badge">${esc(duration(c))}</span>`);
  return out.join('');
}

const tick = '<svg class="tick" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12.5l5 5L20 6.5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const dlIcon = '<svg class="btn-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11m0 0l-5-5m5 5l5-5M5 20h14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';

function card(c) {
  const b = document.createElement('button');
  b.className = 'card';
  b.type = 'button';
  b.setAttribute('aria-label', `${title(c)}, ${resolution(c)}${isHdr(c) ? ' ' + c.dynamicRange : ''}. View details`);
  b.innerHTML = `<span class="card-art"><img src="${esc(c.thumbnail)}" alt="" loading="lazy"><span class="card-tag">${esc(resolution(c))}${isHdr(c) ? ' · HDR' : ''}</span></span>
    <span class="card-info"><span class="card-title">${esc(title(c))}</span><span class="card-sub">${downloadLink(c) ? tick + 'Free download' : 'Coming soon'} · ${esc(duration(c))}</span></span>`;
  b.addEventListener('click', () => openDetail(c));
  return b;
}

/* ---------- Hero carousel (thumbnails; order = featured first, then the rest; settings in site.json "hero") ---------- */
let heroIndex = 0, heroTimer = null, heroPaused = false;
const pauseIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14M16 5v14" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>';
const playIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5l11 7-11 7z" fill="currentColor"/></svg>';
function renderHero() {
  const max = site.hero?.max || 14;
  const items = [...catalogue.filter(c => c.featured), ...catalogue.filter(c => !c.featured)].slice(0, max);
  heroIndex = 0;
  hero.innerHTML = `${items.map((c, i) => `
    <article class="slide${i === 0 ? ' on' : ''}" aria-hidden="${i === 0 ? 'false' : 'true'}" aria-label="${i + 1} of ${items.length}">
      <img class="slide-img" src="${esc(c.thumbnail)}" alt="" ${i ? 'loading="lazy"' : 'fetchpriority="high"'}>
      <div class="slide-copy">
        <p class="kicker">${tick}Free with albi prime</p>
        <h2>${esc(title(c))}</h2>
        <div class="badges">${badges(c)}</div>
        <p class="synopsis">${esc(c.synopsis || `${resolution(c)} ${isHdr(c) ? c.dynamicRange + ' ' : ''}demo · ${codec(c)} · ${size(c.bytes)}`)}</p>
        <div class="actions">
          ${downloadLink(c) ? `<a class="btn btn-primary" href="${esc(downloadLink(c))}" target="_blank" rel="noopener" tabindex="${i ? -1 : 0}">${dlIcon}Download</a>` : ''}
          <button class="btn btn-ghost" type="button" data-id="${esc(c.id)}" tabindex="${i ? -1 : 0}">More details</button>
        </div>
      </div>
    </article>`).join('')}
    <div class="hero-ctrl">
      <button type="button" class="pause" aria-label="Pause slideshow">${pauseIcon}</button>
      <div class="dots" role="tablist" aria-label="Choose slide">${items.map((_, i) => `<button type="button" role="tab" class="${i === 0 ? 'on' : ''}" aria-selected="${i === 0}" aria-label="Slide ${i + 1}" data-i="${i}"></button>`).join('')}</div>
    </div>`;
  hero.querySelectorAll('[data-id]').forEach(b => b.addEventListener('click', () => openDetail(catalogue.find(c => c.id === b.dataset.id))));
  hero.querySelectorAll('.dots button').forEach(b => b.addEventListener('click', () => { goHero(+b.dataset.i); startHero(); }));
  hero.querySelector('.pause').addEventListener('click', e => {
    heroPaused = !heroPaused;
    e.currentTarget.innerHTML = heroPaused ? playIcon : pauseIcon;
    e.currentTarget.setAttribute('aria-label', heroPaused ? 'Play slideshow' : 'Pause slideshow');
    heroPaused ? stopHero() : startHero();
  });
  startHero();
}
function goHero(i) {
  const slides = hero.querySelectorAll('.slide'), dots = hero.querySelectorAll('.dots button');
  if (!slides.length) return;
  heroIndex = (i + slides.length) % slides.length;
  slides.forEach((s, n) => {
    const on = n === heroIndex;
    s.classList.toggle('on', on); s.setAttribute('aria-hidden', String(!on));
    s.querySelectorAll('a,button').forEach(el => el.tabIndex = on ? 0 : -1);
  });
  dots.forEach((d, n) => { d.classList.toggle('on', n === heroIndex); d.setAttribute('aria-selected', String(n === heroIndex)); });
}
function startHero() {
  stopHero();
  if (heroPaused || hero.hidden || hero.querySelectorAll('.slide').length < 2) return;
  heroTimer = setInterval(() => goHero(heroIndex + 1), site.hero?.interval || 4000);
}
function stopHero() { clearInterval(heroTimer); heroTimer = null; }
document.addEventListener('visibilitychange', () => document.hidden ? stopHero() : startHero());

/* ---------- Rows (Featured, then one row per category; empty rows are skipped) ---------- */
const chev = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
function renderRows() {
  const rows = [{ title: 'Featured', items: catalogue.filter(c => c.featured) },
    ...site.categories.map(k => ({ title: k.label, slug: k.slug, items: catalogue.filter(c => c.category === k.slug) }))];
  rowsEl.replaceChildren(...rows.map(r => {
    if (!r.items.length) return document.createComment('');
    const sec = document.createElement('section');
    sec.className = 'row';
    const id = 'row-' + r.title.toLowerCase().replace(/\W+/g, '-');
    sec.setAttribute('aria-labelledby', id);
    sec.innerHTML = `<div class="row-head"><h2 id="${id}">${esc(r.title)}</h2>${r.slug ? `<a class="row-link" href="#/${esc(r.slug)}">See all ${r.items.length}${chev}</a>` : ''}</div>
      <div class="rail"><button class="arrow left" type="button" aria-label="Scroll left" tabindex="-1"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
      <div class="track"></div>
      <button class="arrow right" type="button" aria-label="Scroll right" tabindex="-1">${chev}</button></div>`;
    const track = sec.querySelector('.track');
    track.append(...r.items.map(card));
    const scrollBy = dir => track.scrollBy({ left: dir * track.clientWidth * 0.85, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
    sec.querySelector('.left').addEventListener('click', () => scrollBy(-1));
    sec.querySelector('.right').addEventListener('click', () => scrollBy(1));
    return sec;
  }));
}

/* ---------- Routing: #/ (home), #/<category-slug>, #/all (search results) ---------- */
const qualityFilters = [['all', 'All', () => true], ['8k', '8K', c => c.width >= 7680], ['4k', '4K', c => c.width >= 3840 && c.width < 7680],
  ['hdr', 'HDR', isHdr], ['60fps', '60 fps', c => fps(c) >= 59]];
let lastKey = null;
function route() {
  const key = (location.hash.replace(/^#\/?/, '') || 'home').toLowerCase();
  if (key !== lastKey) { quality = 'all'; lastKey = key; }
  const isHome = key === 'home' && !query;
  hero.hidden = !isHome; rowsEl.hidden = !isHome; browse.hidden = isHome;
  isHome ? startHero() : stopHero();
  document.querySelectorAll('#tabs a').forEach(a => {
    const on = !query && a.dataset.filter === key;
    a.classList.toggle('on', on);
    on ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current');
  });
  if (isHome) return;
  const cat = site.categories.find(k => k.slug === key);
  const searching = Boolean(query);
  const base = searching || !cat ? catalogue : catalogue.filter(c => c.category === cat.slug);
  const q = qualityFilters.find(f => f[0] === quality)[2];
  const list = base.filter(c => (searching || isAudio(c) || q(c)) && (!searching || matchesQuery(c)));
  $('#browse-title').textContent = searching ? `Results for “${search.value.trim()}”` : cat ? cat.label : 'All clips';
  $('#browse-blurb').textContent = !searching && cat?.blurb || '';
  const showChips = !searching && cat && base.some(c => !isAudio(c));
  const chips = $('#chips');
  chips.hidden = !showChips;
  chips.innerHTML = showChips ? qualityFilters.map(([k, label]) => `<button type="button" class="chip${k === quality ? ' on' : ''}" aria-pressed="${k === quality}" data-q="${k}">${label}</button>`).join('') : '';
  $('#results').textContent = `${list.length} ${list.length === 1 ? 'title' : 'titles'}`;
  grid.replaceChildren(...list.map(card));
  const empty = $('#empty');
  empty.hidden = list.length > 0;
  $('#empty-msg').textContent = searching ? 'No results found.' : cat && !base.length ? `Nothing in ${cat.label} yet — check back soon.` : 'No clips match this filter.';
}
$('#chips').addEventListener('click', e => { const b = e.target.closest('[data-q]'); if (b) { quality = b.dataset.q; route(); } });

function renderTabs() {
  const tabs = [{ slug: '', label: 'Home', key: 'home' }, ...site.categories.map(k => ({ slug: k.slug, label: k.label, key: k.slug }))];
  $('#tabs').innerHTML = tabs.map(t => `<a href="#/${esc(t.slug)}" data-filter="${esc(t.key)}">${esc(t.label)}</a>`).join('');
}

/* ---------- Search ---------- */
function setSearchOpen(open) {
  searchForm.classList.toggle('open', open);
  $('#search-toggle').setAttribute('aria-expanded', String(open));
  if (open) search.focus();
}
$('#search-toggle').addEventListener('click', () => setSearchOpen(!searchForm.classList.contains('open')));
searchForm.addEventListener('submit', e => e.preventDefault());
search.addEventListener('input', () => {
  query = search.value.trim().toLowerCase();
  if (query && (location.hash === '' || location.hash === '#/')) { location.hash = '#/all'; return; }
  route();
});
search.addEventListener('keydown', e => { if (e.key === 'Escape') { search.value = ''; query = ''; setSearchOpen(false); route(); } });
search.addEventListener('blur', () => { if (!search.value) setSearchOpen(false); });
window.addEventListener('hashchange', route);

/* ---------- Detail ---------- */
function openDetail(c) {
  $('#detail-img').src = c.thumbnail;
  $('#detail-title').textContent = title(c);
  $('#detail-badges').innerHTML = badges(c);
  $('#detail-synopsis').textContent = c.synopsis || '';
  const specs = [
    ['Category', catLabel(c.category)],
    ...(isAudio(c) ? [] : [
      ['Resolution', `${c.width} × ${c.height}`],
      ['Dynamic range', c.dynamicRange || 'Not verified'],
      ['Video', `${codec(c)} · ${fps(c)} fps${c.videoBitrateKbps ? ' · ≈ ' + (c.videoBitrateKbps / 1000).toFixed(1) + ' Mbps' : ''}`]]),
    ['Audio', `${c.audioCodec || 'Unknown'} · ${channels(c)}`],
    ['File', `${(c.container || 'mkv').toUpperCase()} · ${size(c.bytes)}`],
    ['Runtime', duration(c)],
    ['TV compatibility', c.playbackTestedModels?.length ? c.playbackTestedModels.join(', ') : 'Not tested'],
  ];
  dialog.querySelector('dl').replaceChildren(...specs.map(([k, v]) => {
    const row = document.createElement('div'), dt = document.createElement('dt'), dd = document.createElement('dd');
    dt.textContent = k; dd.textContent = v; row.append(dt, dd); return row;
  }));
  const link = downloadLink(c), a = dialog.querySelector('.download-link');
  a.hidden = !link; dialog.querySelector('.pending').hidden = Boolean(link);
  if (link) { a.href = link; a.innerHTML = `${dlIcon}Download · ${esc(size(c.bytes))}`; }
  const src = dialog.querySelector('.source-link');
  src.href = c.sourceUrl; src.textContent = 'YouTube source';
  stopHero();
  dialog.showModal();
  dialog.scrollTop = 0;
}
dialog.addEventListener('close', startHero);
dialog.querySelector('.close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', e => {
  if (e.target !== dialog) return;
  const r = dialog.getBoundingClientRect();
  if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close();
});

/* ---------- Boot ---------- */
Promise.all([
  fetch('catalogue.json').then(r => { if (!r.ok) throw Error('catalogue'); return r.json(); }),
  fetch('site.json').then(r => r.ok ? r.json() : null).catch(() => null),
]).then(([data, cfg]) => {
  catalogue = data;
  site = cfg || { categories: [{ slug: 'other', label: 'Other' }] };
  renderTabs(); renderHero(); renderRows(); route();
}).catch(() => { $('#error').hidden = false; });
