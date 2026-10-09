'use strict';
let catalogue=[], selected='all';
const cards=document.querySelector('#cards'),search=document.querySelector('#search'),dialog=document.querySelector('#detail');
const names={'WCtJ_EZQQBM':'Top Gun: Maverick — Target','-0XHjDBTXyc':'Arcane — Opening Scene','bXmqj3GbNxs':'Tron: Ares — Enhanced Trailer','tyHkrDqxyXQ':'Tron: Legacy — HDR Demo','0JlMjgqduVw':'House of the Dragon — Season 3','Ej_kZi6qX9w':'Avatar: Fire and Ash','6I5nor_880M':'Top Gun: Maverick — Trailer','3gAlCLVpePk':'Spider-Man: Brand New Day','YShVEXb7-ic':'Tron: Ares — Official Trailer','fSGpAQPtGoc':'Doctor Strange — Mirror Dimension','PhAsdlmY0o8':'Avengers Assemble','m08TxIsFTRI':'Project Hail Mary','-u5CTkgJVgA':'Transformers — Devastator','L_Cb1OepkY8':'The Fast and the Furious — Final Race'};
const escapeHTML=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const size=b=>b>=1e9?`${(b/1e9).toFixed(2)} GB`:`${Math.round(b/1e6)} MB`;
const resolution=c=>c.width>=7680?'8K':c.width>=3840?'4K':c.width>=2560?'1440p':c.width>=1920?'1080p':`${c.height}p`;
const hdr=c=>Boolean(c.dynamicRange&&c.dynamicRange!=='SDR');
const duration=c=>`${Math.floor(c.duration/60)}:${String(Math.round(c.duration%60)).padStart(2,'0')}`;
const title=c=>names[c.id]||c.title;
function downloadLink(c){try{const u=new URL(c.downloadUrl);return u.protocol==='https:'?u.href:null;}catch{return null;}}
function render(){
const query=search.value.trim().toLowerCase();
const matches=catalogue.filter(c=>(selected==='all'||selected==='4k'&&c.width>=3840&&c.width<7680||selected==='8k'&&c.width>=7680||selected==='hdr'&&hdr(c)||selected==='60fps'&&c.fps>=59)&&`${title(c)} ${c.title} ${c.channel}`.toLowerCase().includes(query));
cards.replaceChildren(...matches.map(clip=>{
const article=document.createElement('article');article.className='card';
article.innerHTML=`<div class="study film-art"><img src="${escapeHTML(clip.thumbnail)}" alt="${escapeHTML(title(clip))} — source thumbnail" loading="lazy"><span class="number">${escapeHTML(resolution(clip))}${hdr(clip)?' · '+escapeHTML(clip.dynamicRange):''}</span><span class="label">${escapeHTML(duration(clip))}</span></div><div class="card-meta"><span>${escapeHTML(clip.fps)} FPS · ${escapeHTML(size(clip.bytes))}</span></div><h3>${escapeHTML(title(clip))}</h3><p>${escapeHTML(codec(clip))} · ${clip.audioChannels===2?'Stereo':escapeHTML(clip.audioChannels||'Unknown')+' channels'} · MKV</p><div class="card-bottom"><span>${downloadLink(clip)?'':'Upload pending'}</span><button class="text-button" aria-label="View details for ${escapeHTML(title(clip))}">Details ↗</button></div>`;
article.querySelector('button').addEventListener('click',()=>openDetail(clip));return article;
}));
const ready=catalogue.filter(downloadLink).length;
document.querySelector('#results').textContent=`${matches.length} ${matches.length===1?'video':'videos'} · ${ready?ready+' available':'Uploads pending'}`;
document.querySelector('#empty').hidden=matches.length>0;
}
function codec(c){return c.videoCodec?.startsWith('av01')?'AV1':(c.videoCodec?.startsWith('vp9')||c.videoCodec?.startsWith('vp09'))?'VP9':c.videoCodec?.startsWith('avc')?'H.264':c.videoCodec||'Unknown';}
function openDetail(c){
document.querySelector('#detail-category').textContent=`${resolution(c)} / ${c.dynamicRange||'HDR NOT VERIFIED'} / ${c.fps} FPS`;
document.querySelector('#detail-title').textContent=title(c);
const specs=[['Resolution',`${c.width} × ${c.height}`],['Dynamic range',c.dynamicRange||'Not verified'],['Video',`${codec(c)} · ${c.fps} fps${c.videoBitrateKbps?' · ≈ '+(c.videoBitrateKbps/1000).toFixed(1)+' Mbps':''}`],['Audio',`${c.audioCodec||'Unknown'} · ${c.audioChannels===2?'stereo':(c.audioChannels||'Unknown')+' channels'}`],['File',`MKV · ${size(c.bytes)} · ${duration(c)}`],['TV compatibility','Not tested']];
dialog.querySelector('dl').replaceChildren(...specs.map(([key,value])=>{const row=document.createElement('div'),dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=key;dd.textContent=value;row.append(dt,dd);return row;}));
const link=downloadLink(c);const hostLink=dialog.querySelector('.download-link');hostLink.hidden=!link;if(link){hostLink.href=link;hostLink.textContent=`Download · ${size(c.bytes)} ↗`;}
dialog.querySelector('.detail-note').textContent=link?'':'Upload pending.';
const source=dialog.querySelector('.source-link');source.href=c.sourceUrl;source.textContent='YouTube source ↗';
dialog.showModal();
}
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{selected=button.dataset.filter;document.querySelectorAll('[data-filter]').forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});render();}));
search.addEventListener('input',render);document.querySelector('#reset').addEventListener('click',()=>{search.value='';document.querySelector('[data-filter="all"]').click();search.focus();});
dialog.querySelectorAll('.close,.dismiss').forEach(b=>b.addEventListener('click',()=>dialog.close()));
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
fetch('catalogue.json').then(r=>{if(!r.ok)throw Error('Catalogue unavailable');return r.json();}).then(data=>{catalogue=data;render();}).catch(()=>{document.querySelector('#results').textContent='The collection could not be loaded. Please refresh to try again.';document.querySelector('#empty').hidden=true;});
