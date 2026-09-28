'use strict';
(()=>{
const tabs=[...document.querySelectorAll('.pathway-tabs [data-step]')],accordions=[...document.querySelectorAll('.accordion-heading [data-step]')],panels=[...document.querySelectorAll('.step-panel')],sections=[...document.querySelectorAll('.pathway-step')],mobile=matchMedia('(max-width:800px)');
const n=Number(new URLSearchParams(location.search).get('step'));let active=Number.isInteger(n)&&n>=1&&n<=6?n:1,expanded=true;
function update(focus=false){
 tabs.forEach((b,i)=>{b.setAttribute('aria-selected',String(i+1===active));b.tabIndex=i+1===active?0:-1});
 accordions.forEach((b,i)=>b.setAttribute('aria-expanded',String(i+1===active&&expanded)));
 panels.forEach((p,i)=>{p.hidden=i+1!==active||(mobile.matches&&!expanded);p.setAttribute('role',mobile.matches?'region':'tabpanel');p.setAttribute('aria-labelledby',mobile.matches?`step-accordion-${i+1}`:`step-tab-${i+1}`)});
 sections.forEach((s,i)=>s.classList.toggle('is-open',i+1===active&&expanded));
 const q=new URLSearchParams(location.search);if(active===1)q.delete('step');else q.set('step',active);history.replaceState(null,'',location.pathname+(q.size?'?'+q:'')+location.hash);
 if(focus){const b=(mobile.matches?accordions:tabs)[active-1];b.focus({preventScroll:true});if(mobile.matches)b.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth',block:'nearest'})}
}
tabs.forEach((b,i)=>{b.addEventListener('click',()=>{active=i+1;expanded=true;update()});b.addEventListener('keydown',e=>{let j=i;if(e.key==='ArrowRight')j=(i+1)%6;else if(e.key==='ArrowLeft')j=(i+5)%6;else if(e.key==='Home')j=0;else if(e.key==='End')j=5;else return;e.preventDefault();active=j+1;expanded=true;update(true)})});
accordions.forEach((b,i)=>b.addEventListener('click',()=>{expanded=active===i+1?!expanded:true;active=i+1;update()}));
document.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>{active=Number(b.dataset.go);expanded=true;update(true)}));
mobile.addEventListener('change',()=>{expanded=true;update()});update();
})();

 document.querySelector('#video-consent').addEventListener('click',function(){document.querySelector('#video-status').textContent='Consent granted. Add an approved video URL when connecting this block to the CMS.';document.querySelector('#video-status').setAttribute('role','status');this.textContent='Reset video example';this.onclick=()=>location.reload();},{once:true});
