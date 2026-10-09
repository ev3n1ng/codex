'use strict';
/* albi prime — all content comes from catalogue.json (clips) and site.json (rows + nav). No build step. */
let catalogue = [], site = { rows: [], nav: [] }, query = '';

const $ = s => document.querySelector(s);
const hero = $('#hero'), rowsEl = $('#rows'), browse = $('#browse'), grid = $('#grid'), dialog = $('#detail');
const search = $('#search'), searchForm = $('#search-form');
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');

const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const size = b => b >= 1e9 ? `${(b / 1e9).toFixed(2)} GB` : `${Math.round(b / 1e6)} MB`;
const resolution = c => c.width >= 7680 ? '8K' : c.width >= 3840 ? '4K' : c.width >= 2560 ? '1440p' : c.width >= 1920 ? '1080p' : `${c.height}p`;
const isHdr = c => Boolean(c.dynamicRange && c.dynamicRange !== 'SDR');
const duration = c => { const t = Math.round(c.duration); return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')}`; };
const title = c => c.displayTitle || c.title;
const fps = c => Math.round(Number(c.fps));
const channels = c => c.audioChannels === 2 ? 'Stereo' : c.audioChannels ? `${c.audioChannels} channels` : 'Unknown';
const codec = c => {
  const v = c.videoCodec || '';
  return v.startsWith('av01') ? 'AV1' : /^vp0?9/.test(v) ? 'VP9' : v.startsWith('avc') ? 'H.264' : v || 'Unknown';
};
const downloadLink = c => { try { const u = new URL(c.downloadUrl); return u.protocol === 'https:' ? u.href : null; } catch { return null; } };

const filters = {
  all: () => true,
  home: () => true,
  featured: c => c.featured,
  '8k': c => c.width >= 7680,
  '4k': c => c.width >= 3840 && c.width < 7680,
  hdr: isHdr,
  '60fps': c => fps(c) >= 59,
};
const pick = key => catalogue.filter(filters[key] || filters.all);
const matchesQuery = c => `${title(c)} ${c.title} ${c.channel}`.toLowerCase().includes(query);

function badges(c, withFps = true) {
  const out = [`<span class="badge badge-res">${esc(resolution(c))}</span>`];
  if (isHdr(c)) out.push(`<span class="badge badge-hdr">${esc(c.dynamicRange)}</span>`);
  if (withFps) out.push(`<span class="badge">${esc(fps(c))} fps</span>`);
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

/* ---------- Hero (static branded header; stats come from the catalogue) ---------- */
function renderHero() {
  const stats = [[catalogue.length, 'clips'], [pick('8k').length, 'in 8K'], [pick('hdr').length, 'HDR'], [pick('60fps').length, '60 fps']].filter(([n]) => n);
  $('#stats').innerHTML = stats.map(([n, l]) => `<li><b>${n}</b> ${esc(l)}</li>`).join('');
}

/* ---------- Rows ---------- */
function renderRows() {
  rowsEl.replaceChildren(...site.rows.map(r => {
    const items = pick(r.filter);
    if (!items.length) return document.createComment('');
    const sec = document.createElement('section');
    sec.className = 'row';
    const id = 'row-' + r.title.toLowerCase().replace(/\W+/g, '-');
    sec.setAttribute('aria-labelledby', id);
    const target = r.filter === 'featured' || r.filter === 'all' ? '' : `<a class="row-link" href="#/${esc(r.filter)}">See more<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg></a>`;
    sec.innerHTML = `<div class="row-head"><h2 id="${id}">${esc(r.title)}</h2>${target}</div>
      <div class="rail"><button class="arrow left" type="button" aria-label="Scroll left" tabindex="-1"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
      <div class="track"></div>
      <button class="arrow right" type="button" aria-label="Scroll right" tabindex="-1"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg></button></div>`;
    const track = sec.querySelector('.track');
    track.append(...items.map(card));
    const scrollBy = dir => track.scrollBy({ left: dir * track.clientWidth * 0.85, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
    sec.querySelector('.left').addEventListener('click', () => scrollBy(-1));
    sec.querySelector('.right').addEventListener('click', () => scrollBy(1));
    return sec;
  }));
}

/* ---------- Routing: #/ (home), #/8k, #/4k, #/hdr, #/60fps, #/search ---------- */
function route() {
  const key = (location.hash.replace(/^#\/?/, '') || 'home').toLowerCase();
  const isHome = key === 'home' && !query;
  hero.hidden = !isHome; rowsEl.hidden = !isHome; browse.hidden = isHome;
  document.querySelectorAll('#tabs a').forEach(a => {
    const on = !query && a.dataset.filter === key;
    a.classList.toggle('on', on);
    on ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current');
  });
  if (!isHome) {
    const nav = site.nav.find(n => n.filter === key);
    const list = pick(query ? 'all' : key in filters ? key : 'all').filter(matchesQuery);
    $('#browse-title').textContent = query ? `Results for “${search.value.trim()}”` : (nav ? nav.label : 'All clips');
    $('#results').textContent = `${list.length} ${list.length === 1 ? 'title' : 'titles'}`;
    grid.replaceChildren(...list.map(card));
    $('#empty').hidden = list.length > 0;
  }
}

function renderTabs() {
  $('#tabs').innerHTML = site.nav.map(n => `<a href="#/${n.filter === 'home' ? '' : esc(n.filter)}" data-filter="${esc(n.filter)}">${esc(n.label)}</a>`).join('');
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
    ['Resolution', `${c.width} × ${c.height}`],
    ['Dynamic range', c.dynamicRange || 'Not verified'],
    ['Video', `${codec(c)} · ${fps(c)} fps${c.videoBitrateKbps ? ' · ≈ ' + (c.videoBitrateKbps / 1000).toFixed(1) + ' Mbps' : ''}`],
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
  dialog.showModal();
  dialog.scrollTop = 0;
}
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
  site = cfg || { rows: [{ title: 'All clips', filter: 'all' }], nav: [{ label: 'Home', filter: 'home' }] };
  renderTabs(); renderHero(); renderRows(); route();
}).catch(() => { $('#error').hidden = false; });
