'use strict';
(()=>{
 const header=document.querySelector('.site-header'),nav=document.querySelector('#navigation');
 if(!header||!nav)return;
 const desktop=matchMedia('(min-width:951px)');
 const copy={About:['About the Zone','Get to know Maynooth’s journey towards a lower-carbon future.'],Map:['Explore by theme','Discover the places and ideas shaping a greener Maynooth.'],Projects:['Local projects','See climate action taking shape across the town.'],'Take Action':['Make a difference','Find your next step — at home, on the move or together.'],Community:['Together in Maynooth','Local stories, shared ideas and ways to get involved.'],Contact:['Get in touch','Connect with the Climate Action Office.']};
 const icons={Map:'map',About:'leaf',Projects:'all-projects','Take Action':'home',Community:'community',Contact:'community'};
 const panel=document.createElement('div');panel.className='mega-menu container';panel.id='desktop-mega-menu';panel.hidden=true;
 panel.innerHTML='<div class="mega-glass"><div class="mega-intro"><span class="mega-icon"><img alt=""></span><h2 id="mega-title"></h2><p></p></div><ul class="mega-items"></ul></div>';
 panel.setAttribute('role','region');panel.setAttribute('aria-labelledby','mega-title');header.append(panel);
 let active=null,timer;
 const close=()=>{clearTimeout(timer);panel.hidden=true;active?.setAttribute('aria-expanded','false');active=null;};
 const open=link=>{if(!desktop.matches)return;clearTimeout(timer);const title=link.textContent.trim(),group=footerGroups.find(g=>g[0]===title);if(!copy[title])return;active?.setAttribute('aria-expanded','false');active=link;link.setAttribute('aria-expanded','true');panel.querySelector('h2').textContent=copy[title][0];panel.querySelector('.mega-intro p').textContent=copy[title][1];panel.querySelector('img').src='assets/'+icons[title]+'-icon.svg';const list=panel.querySelector('ul');list.replaceChildren(...(group?group[2]:['Climate Action Office','Kildare County Council','climateaction@kildarecoco.ie']).map(label=>{const li=document.createElement('li');li.textContent=label;return li;}));panel.hidden=false;};
 [...nav.children].filter(e=>e.tagName==='A').forEach(link=>{link.setAttribute('aria-controls',panel.id);link.addEventListener('pointerenter',e=>{if(e.pointerType!=='touch')open(link)});link.addEventListener('focus',()=>open(link));link.addEventListener('click',close);});
 header.addEventListener('pointerleave',()=>{timer=setTimeout(close,160)});header.addEventListener('pointerenter',()=>clearTimeout(timer));
 document.addEventListener('focusin',e=>{if(!nav.contains(e.target)&&!panel.contains(e.target))close()});
 document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});document.addEventListener('pointerdown',e=>{if(!header.contains(e.target))close()});
 desktop.addEventListener('change',()=>{close();if(!desktop.matches)[...nav.children].forEach(link=>link.removeAttribute('aria-expanded'))});
})();
