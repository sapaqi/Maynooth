'use strict';
if(new URLSearchParams(location.search).get('id')==='map'){
 document.querySelector('.breadcrumbs [aria-current=page]').textContent='Projects on the map';
 document.title='Explore the Zone’s projects | Maynooth DZ';
 document.querySelector('#article-title').textContent='Explore the Zone’s projects on the map';
 document.querySelector('#article-group').innerHTML='<span class="group-avatar" aria-hidden="true">CA</span>Climate Action Office';
 document.querySelector('#article-group').classList.add('council');
 document.querySelector('#article-date').innerHTML='Published <time datetime="2026-09-02">2 September 2026</time>';
 const photo=document.querySelector('#article-photo');photo.src='assets/map.webp';photo.alt='Illustrated view of Maynooth';
 document.querySelector('#article-copy').innerHTML='<p class="article-intro">Find projects by theme, explore the places behind them and choose your own next step.</p><h2>Local action, all in one place</h2><p>The project map brings together themes including retrofit, transport, biodiversity, energy, community and public spaces. It offers a starting point for discovering how local action can help shape the Decarbonising Zone.</p><h3>Find a project that interests you</h3><p>Choose a theme, select a pin and open the project to find out more. You can also browse the <a href="projects.html">project directory</a> and filter the results by category or status.</p><h3>Explore the demonstration</h3><p>The current map contains 18 demonstration projects. Sample projects and illustrative pin locations show how the directory and map work together.</p><p><a href="map.html">Explore the map ↗</a></p>';
 document.querySelector('#article-author').innerHTML='<span class="group-avatar" aria-hidden="true">CA</span><div><strong>Written by the Climate Action Office</strong><span>Kildare County Council</span></div>';
 document.querySelector('#article-event').hidden=true;
 const related=document.querySelector('#related-article');related.href='article.html?id=picnic';related.innerHTML='<span class="group-avatar">MT</span><div><h3>Picnic in the Park brought 300 neighbours together</h3><p>Maynooth Tidy Towns · 14 August 2026</p></div><span aria-hidden="true">↗</span>';
}
