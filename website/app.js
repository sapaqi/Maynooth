'use strict';
const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
document.documentElement.classList.add('js');

// Use the original map illustrations, placed at the Figma coordinates.
const stickers = [['bee',95,163,53],['bee',651,379,53],['tree',584,12,51],['tree',34,38,51],['train',477,289,71],['chicken',624,110,53],['house',278,136,51],['house',422,82,51],['house',137,352,51],['house',409,405,51]];
$$('.map-stickers').forEach(layer => {
  stickers.forEach(([name,x,y,w],index) => {
    const img = document.createElement('img');
    img.src = `assets/${name}.webp`; img.alt = ''; img.className = name;
    img.style.cssText = `left:${x/721*100}%;top:${y/485*100}%;width:${w/721*100}%;--delay:${-index*.65}s`;
    layer.append(img);
  });
});

const menuButton = $('.menu-toggle');
const navigation = $('#navigation');
function closeMenu() { menuButton.setAttribute('aria-expanded','false'); menuButton.setAttribute('aria-label','Open menu'); navigation.classList.remove('open'); }
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded',String(open)); menuButton.setAttribute('aria-label',open ? 'Close menu' : 'Open menu'); navigation.classList.toggle('open',open);
});
$$('a,button',navigation).forEach(link => link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event => { if(event.key === 'Escape') closeMenu(); });
document.addEventListener('click',event => { if(!event.target.closest('.site-header')) closeMenu(); });
matchMedia('(min-width:951px)').addEventListener('change',closeMenu);

function setupCarousel(carousel) {
  if(!carousel)return ()=>{};
  const track = $('.track',carousel);
  const controls = carousel.dataset.carousel === 'action' ? $('[data-controls="action"]') : $('.carousel-controls',carousel);
  const previous = $('.previous',controls), next = $('.next',controls), progress = $('.scroll-progress span',controls);
  const scrollByCard = direction => {
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const amount = track.firstElementChild.getBoundingClientRect().width + gap;
    track.scrollBy({left:direction*amount,behavior:reducedMotion.matches?'instant':'smooth'});
  };
  const update = () => {
    const maximum = track.scrollWidth - track.clientWidth;
    previous.disabled = track.scrollLeft < 2;
    next.disabled = maximum < 2 || track.scrollLeft >= maximum - 2;
    progress.style.setProperty('--progress',`${maximum > 0 ? Math.max(0,Math.min(1,track.scrollLeft/maximum))*300 : 0}%`);
  };
  previous.addEventListener('click',()=>scrollByCard(-1)); next.addEventListener('click',()=>scrollByCard(1));
  track.addEventListener('scroll',update,{passive:true});
  track.addEventListener('keydown',e=>{if(e.target !== track)return;if(['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();scrollByCard(e.key==='ArrowLeft'?-1:1)}if(e.key==='Home'){e.preventDefault();track.scrollTo({left:0,behavior:'smooth'})}if(e.key==='End'){e.preventDefault();track.scrollTo({left:track.scrollWidth,behavior:'smooth'})}});
  let startX=0,startScroll=0,active=false,dragged=false;
  track.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse'||e.button!==0)return;active=true;dragged=false;startX=e.clientX;startScroll=track.scrollLeft});
  track.addEventListener('pointermove',e=>{if(!active)return;const dx=e.clientX-startX;if(Math.abs(dx)>5){dragged=true;track.classList.add('dragging');track.setPointerCapture(e.pointerId);track.scrollLeft=startScroll-dx;e.preventDefault()}});
  function endDrag(){active=false;track.classList.remove('dragging')}
  track.addEventListener('pointerup',endDrag);track.addEventListener('pointercancel',endDrag);track.addEventListener('lostpointercapture',endDrag);
  window.addEventListener('pointerup',endDrag);
  track.addEventListener('click',e=>{if(dragged){e.preventDefault();e.stopPropagation();dragged=false}},true);
  track.addEventListener('dragstart',e=>e.preventDefault());
  new ResizeObserver(update).observe(track); update();
  return update;
}
const updateProjects = setupCarousel($('.project-carousel'));

$('#browse-projects')?.addEventListener('click',e=>{
  const expanded = $('.project-carousel').classList.toggle('expanded');
  e.currentTarget.setAttribute('aria-expanded',String(expanded));
  e.currentTarget.textContent = expanded ? 'Back to carousel →' : 'Browse all projects →'; updateProjects();
});

function countUp(element) {
  if(element.dataset.counted)return;
  element.dataset.counted='true';
  if(reducedMotion.matches)return;
  const end=Number(element.dataset.count), decimals=Number(element.dataset.decimals||0), suffix=element.dataset.suffix||'', start=performance.now();
  const frame = now => { const t=Math.min(1,(now-start)/1450);const value=end*(1-Math.pow(1-t,3));element.textContent=value.toLocaleString('en-IE',{minimumFractionDigits:decimals,maximumFractionDigits:decimals})+suffix;if(t<1)requestAnimationFrame(frame) };
  requestAnimationFrame(frame);
}
if('IntersectionObserver' in window){
  const observer = new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');$$('[data-count]',entry.target).forEach(countUp);observer.unobserve(entry.target)}}),{threshold:.12});
  $$('.reveal').forEach(el=>observer.observe(el));
}else{$$('.reveal').forEach(el=>el.classList.add('visible'))}
let ticking=false;
function updateScroll(){
  const y=window.scrollY;$('.site-header').classList.toggle('scrolled',y>20);
  if(!reducedMotion.matches && innerWidth>640 && $('.hero-map')){$('.hero-map').style.setProperty('--map-shift',`${Math.min(y*.075,28)}px`);const rect=$('#about').getBoundingClientRect();$('.brand-watermark').style.setProperty('--watermark-shift',`${Math.max(-35,Math.min(35,(innerHeight/2-rect.top)*.06))}px`)}
  ticking=false;
}
addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(updateScroll)}},{passive:true});updateScroll();

const footerGroups = [
 ['Map','#map',['Energy','Retrofit','Transport','Biodiversity & resilience','Community action','Public realm','Education awareness','Sustainable practices','Circular economy','Water & nature-based solutions']],
 ['About','#about',['Resources','Why Maynooth','What is the Maynooth DZ','Climate action explained']],
 ['Projects','#projects',['Community garden harbour field','Climate champions','Together for sustainable future podcast','Kildare demohouse','Picnic in the park','Solar PV Meitheal Moyglare hall']],
 ['Take Action','#action',['Retrofit your home','Travel sustainably','Start a community project','Business and school actions']],
 ['Community','#community',['Events','Updates','Add an event or update']]
];
footerGroups.forEach(([title,href,links])=>{
  const details=document.createElement('details');details.className='footer-group';
  const summary=document.createElement('summary');summary.textContent=title;details.append(summary);
  const list=document.createElement('ul');
  links.forEach(label=>{const li=document.createElement('li'),a=document.createElement('a');a.textContent=label;a.href=label==='Resources'?'resources.html':title==='Community'?'community.html'+(label==='Events'?'#events':label==='Updates'?'#updates':'#join'):title==='Take Action'&&label==='Retrofit your home'?'take-action.html':title==='Map'?'map.html':title==='Projects'?'projects.html':(document.body.classList.contains('directory-page')?'index.html'+href:href);li.append(a);list.append(li)});
  details.append(list);$('#sitemap').append(details);
  summary.addEventListener('click',e=>{if(innerWidth>640)e.preventDefault()});
});
const mobile=matchMedia('(max-width:640px)');
function footerMode(){$$('.footer-group').forEach(el=>el.open=!mobile.matches)}footerMode();mobile.addEventListener('change',footerMode);
$('#sitemap-link').addEventListener('click',()=>$$('.footer-group').forEach(el=>el.open=true));

const mapDialog=$('#map-dialog'),infoDialog=$('#info-dialog');let zoom=1;
function setZoom(next){zoom=Math.max(1,Math.min(3,next));$('.large-map').style.width=`${zoom*100}%`;$('#zoom-level').textContent=`${Math.round(zoom*100)}%`;$('#zoom-out').disabled=zoom<=1;$('#zoom-in').disabled=zoom>=3}
function openDialog(dialog){closeMenu();dialog.showModal();document.body.classList.add('modal-open')}
$$('.map-open').forEach(button=>button.addEventListener('click',()=>{location.href='map.html'}));
$('#zoom-in').addEventListener('click',()=>setZoom(zoom+.25));$('#zoom-out').addEventListener('click',()=>setZoom(zoom-.25));$('#zoom-reset').addEventListener('click',()=>{setZoom(1);$('.map-viewport').scrollTo(0,0)});
$$('dialog').forEach(dialog=>{
  $('.close-dialog',dialog).addEventListener('click',()=>dialog.close());
  dialog.addEventListener('close',()=>document.body.classList.remove('modal-open'));
  dialog.addEventListener('click',e=>{const r=dialog.getBoundingClientRect();if(e.target===dialog&&(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom))dialog.close()});
});
const mapViewport=$('.map-viewport');let mapDrag;
mapViewport.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse')return;mapDrag={x:e.clientX,y:e.clientY,left:mapViewport.scrollLeft,top:mapViewport.scrollTop};mapViewport.setPointerCapture(e.pointerId);e.preventDefault()});
mapViewport.addEventListener('pointermove',e=>{if(mapDrag){mapViewport.scrollLeft=mapDrag.left+mapDrag.x-e.clientX;mapViewport.scrollTop=mapDrag.top+mapDrag.y-e.clientY}});
mapViewport.addEventListener('pointerup',()=>mapDrag=null);mapViewport.addEventListener('pointercancel',()=>mapDrag=null);
const information={
 accessibility:['Accessibility','You can navigate this homepage with a keyboard, use the arrow controls to browse cards, and reduce animation through your device settings. For assistance or accessibility feedback, contact climateaction@kildarecoco.ie.'],
 privacy:['Privacy & cookies','This prototype does not include analytics or advertising cookies. Forms prepare email requests in your browser; entries are not saved by this website and no automatic newsletter subscription is created. Email links open your own email application; information you choose to send is handled by the recipient. The hosting service may process technical information needed to serve this page.'],
 cookies:['Cookie settings','This homepage does not set optional analytics or advertising cookies. There are no optional cookie preferences to configure.']
};
$$('[data-info]').forEach(button=>button.addEventListener('click',()=>{const [title,copy]=information[button.dataset.info];$('#info-title').textContent=title;$('#info-copy').textContent=copy;openDialog(infoDialog)}));
