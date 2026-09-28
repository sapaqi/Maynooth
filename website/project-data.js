'use strict';
window.MaynoothProjects=(()=>{
const categories={'All projects':'#203129',Retrofit:'#d9684f',Transport:'#02a59f',Biodiversity:'#1b853f',Energy:'#a47b13',Community:'#8562a5','Public realm':'#258d78'};
const categoryIcons={'All projects':'all-projects',Retrofit:'home',Transport:'travel',Biodiversity:'leaf',Energy:'energy',Community:'community','Public realm':'public-realm'};
const rows=[
 ['DemoHouse Retrofit','Retrofit','Complete','retrofit.webp','A Maynooth home upgraded to A-rating — open for the town to learn from.'],
 ['Royal Canal Greenway Links','Transport','Underway','canal.webp','Safer walking and cycling connections from the Greenway into town.'],
 ['Harbour Field for Pollinators','Biodiversity','Planned','pollinators.webp','Turning the Harbour Field into a haven for bees and wildflowers.'],
 ['Solar on the Community Hall','Energy','Underway','town-centre.webp','A sample rooftop solar project to help a shared community building use cleaner energy.'],
 ['Picnic in the Park','Community','Complete','community.webp','A sample neighbourhood gathering to share food, ideas and practical climate actions.'],
 ['Main Street Greening','Public realm','Planned','town-centre.webp','A sample approach to bringing more trees, shade and planting into the town centre.'],
 ['Warm Homes, Lower Bills','Retrofit','Underway','retrofit.webp','A sample insulation programme helping neighbours explore warmer, more efficient homes.'],
 ['Cycle to School Together','Transport','Planned','maynooth.webp','A sample cycle-bus initiative supporting safer journeys to school with local volunteers.'],
 ['Canal-side Nature Corridors','Biodiversity','Underway','canal-nature.webp','A sample habitat project linking waterside planting and wildlife-friendly green spaces.'],
 ['Shared Solar for Neighbours','Energy','Planned','retrofit.webp','A sample group-buy scheme making it easier to learn about solar panels and installation.'],
 ['Maynooth Repair Café','Community','Underway','community.webp','A sample monthly meetup where neighbours share skills and give everyday items a second life.'],
 ['Greener Town Square','Public realm','Underway','maynooth.webp','A sample public-space project combining seating, shade and rain-friendly planting.'],
 ['Open Doors: Retrofit Stories','Retrofit','Complete','town-centre.webp','A sample open-home event sharing what local households learned from their energy upgrades.'],
 ['Walk the Last Kilometre','Transport','Complete','canal.webp','A sample walking initiative helping residents discover pleasant routes for everyday journeys.'],
 ['Community Orchard','Biodiversity','Planned','pollinators.webp','A sample orchard with native planting, seasonal fruit and opportunities to learn together.'],
 ['Community Energy Check-in','Energy','Complete','maynooth.webp','A sample energy-awareness programme sharing practical ways to reduce unnecessary energy use.'],
 ['Climate Skills Swap','Community','Planned','community.webp','A sample series of workshops on growing food, repairing possessions and reducing waste.'],
 ['Rain Gardens for Maynooth','Public realm','Planned','canal-nature.webp','A sample planting scheme showing how green spaces can absorb rainwater and support nature.']
];
const projects=rows.map(([title,category,status,image,description],i)=>({id:title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,''),title,category,status,image,description,date:Date.UTC(2026,8,24-i*6)}));
const locations=[[67,65],[40,73],[52,58],[35,38],[23,52],[58,43],[72,53],[82,63],[29,77],[42,28],[62,32],[50,39],[76,76],[47,67],[19,32],[31,61],[70,25],[58,81]];
projects.forEach((p,i)=>{p.location={x:locations[i][0],y:locations[i][1]};});
return {categories,categoryIcons,projects};
})();