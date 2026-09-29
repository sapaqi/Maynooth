'use strict';
(()=>{
const {categories,categoryIcons,projects}=window.MaynoothProjects;
const params=new URLSearchParams(location.search);if(window.MaynoothProjects.categoryAliases[params.get('category')])params.set('category',window.MaynoothProjects.categoryAliases[params.get('category')]);
const state={query:params.get('q')||'',category:Object.hasOwn(categories,params.get('category'))?params.get('category'):'All projects',sort:['newest','oldest','az'].includes(params.get('sort'))?params.get('sort'):'newest',view:params.get('view')==='list'?'list':'cards',page:Math.max(1,Math.floor(Number(params.get('page')))||1)};
const search=document.querySelector('#search-projects'),sort=document.querySelector('#project-sort'),results=document.querySelector('#project-results'),count=document.querySelector('#result-count'),empty=document.querySelector('#empty-results'),clear=document.querySelector('#clear-search');
const esc=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const filters=document.querySelector('.category-filters');
const toggle=document.querySelector('#filter-toggle'),pagination=document.querySelector('#project-pagination');
const pageSize=9;
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));filters.hidden=!open;});
filters.addEventListener('keydown',e=>{if(e.key==='Escape'){filters.hidden=true;toggle.setAttribute('aria-expanded','false');toggle.focus();}});

for(const [category,color] of Object.entries(categories)){const b=document.createElement('button');b.type='button';b.className='category-filter';b.innerHTML=`<img src="assets/${categoryIcons[category]}-icon.svg" alt=""><span>${category}</span>`;b.style.setProperty('--category',color);b.setAttribute('aria-pressed',String(state.category===category));b.addEventListener('click',()=>{state.category=category;state.page=1;render()});filters.append(b)}
function render(){
 search.value=state.query;sort.value=state.sort;clear.hidden=!state.query;
 filters.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.textContent===state.category)));
 document.querySelectorAll('[data-view]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.view===state.view)));
 const terms=state.query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
 const found=projects.filter(p=>(state.category==='All projects'||p.category===state.category)&&terms.every(t=>p.title.toLocaleLowerCase().includes(t)));
 found.sort((a,b)=>state.sort==='az'?a.title.localeCompare(b.title,'en'):state.sort==='oldest'?a.date-b.date:b.date-a.date);
 const pages=Math.max(1,Math.ceil(found.length/pageSize));state.page=Math.min(state.page,pages);
 const next=new URLSearchParams();if(state.query)next.set('q',state.query);if(state.category!=='All projects')next.set('category',state.category);if(state.sort!=='newest')next.set('sort',state.sort);if(state.view!=='cards')next.set('view',state.view);if(state.page>1)next.set('page',state.page);
 history.replaceState(null,'',location.pathname+(next.size?'?'+next:'')+location.hash);
 document.querySelector('#active-filter-count').hidden=state.category==='All projects';
 toggle.setAttribute('aria-label',state.category==='All projects'?'Filter by category':`Filter by category: ${state.category}`);
 count.textContent=`${found.length} ${found.length===1?'project':'projects'}`;
 results.classList.toggle('list-view',state.view==='list');results.hidden=!found.length;empty.hidden=!!found.length;
 document.querySelector('#empty-title').textContent=state.query.trim()?'No projects match your search':`No ${state.category==='All projects'?'':state.category.toLowerCase()+' '}projects yet`;
 results.innerHTML=found.slice((state.page-1)*pageSize,state.page*pageSize).map(p=>`<article class="directory-card"><img class="directory-photo" src="assets/${p.image}" alt="" loading="lazy" width="600" height="400"><div class="directory-card-content"><div class="card-labels"><span class="directory-category" style="--category:${categories[p.category]}"><img src="assets/${categoryIcons[p.category]}-icon.svg" alt="">${p.category}</span><span class="status ${p.status.toLowerCase()}">${p.status}</span></div><h2><a class="project-link" href="project.html?id=${p.id}&amp;return=${encodeURIComponent(location.search)}">${esc(p.title)}</a></h2><p>${esc(p.description)}</p></div></article>`).join('');
 pagination.hidden=pages<=1;pagination.replaceChildren();
 const addPage=(label,page,disabled=false,current=false)=>{const b=document.createElement('button');b.type='button';b.textContent=label;b.disabled=disabled;if(current)b.setAttribute('aria-current','page');b.setAttribute('aria-label',/^\d+$/.test(label)?`Page ${label}`:label+' page');b.addEventListener('click',()=>{state.page=page;render();pagination.querySelector('[aria-current="page"]').focus({preventScroll:true});results.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});});pagination.append(b);};
 addPage('Previous',state.page-1,state.page===1);for(let i=1;i<=pages;i++)addPage(String(i),i,false,state.page===i);addPage('Next',state.page+1,state.page===pages);

}
let debounce;search.addEventListener('input',()=>{clearTimeout(debounce);state.query=search.value;state.page=1;debounce=setTimeout(render,180)});
document.querySelector('#project-search').addEventListener('submit',e=>{e.preventDefault();clearTimeout(debounce);state.query=search.value;state.page=1;render()});
clear.addEventListener('click',()=>{clearTimeout(debounce);state.query='';state.page=1;render();search.focus()});
sort.addEventListener('change',()=>{state.sort=sort.value;state.page=1;render()});
document.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',()=>{state.view=b.dataset.view;render()}));
document.querySelector('#reset-filters').addEventListener('click',()=>{clearTimeout(debounce);state.query='';state.page=1;state.category='All projects';render();search.focus()});
render();
})();
