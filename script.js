// Theme toggle
const root = document.documentElement;
const key = 'theme';
function apply(mode){ root.classList.toggle('light', mode==='light'); }
apply(localStorage.getItem(key) || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light':'dark'));
document.getElementById('themeToggle').addEventListener('click',()=>{
  const mode = root.classList.contains('light') ? 'dark' : 'light';
  apply(mode); localStorage.setItem(key, mode);
});
// Year
document.getElementById('year').textContent = new Date().getFullYear();
// Projects data & filter
const projects = [
  {title:'MEPA Light · Agentforce headless', desc:'Widget chat integrato, MuleSoft, nessun dato su Salesforce.', tags:['ai','integration'], links:[{href:'#',label:'Case study'},{href:'#',label:'Demo'}]},
  {title:'Assist Zen · Clustering & Classificazione', desc:'Automazione AMS con GenAI, KPI migliorati.', tags:['ai'], links:[{href:'#',label:'Repo'},{href:'#',label:'Note'}]},
  {title:'Piattaforma integrazioni Azure', desc:'API-first, sicurezza, monitoraggio.', tags:['cloud','integration'], links:[{href:'#',label:'Architecture'}]},
];
const grid = document.getElementById('projectGrid');
function render(filter='all'){
  grid.innerHTML = '';
  projects.filter(p => filter==='all' || p.tags.includes(filter)).forEach(p=>{
    const el = document.createElement('article');
    el.className = 'card';
    el.innerHTML = `<h3>${p.title}</h3><p>${p.desc}</p>
      <div class="meta">${p.tags.map(t=>`<span class='pill'>#${t}</span>`).join('')}</div>
      <div class="links">${(p.links||[]).map(l=>`<a class='btn small' href='${l.href}' target='_blank' rel='noreferrer'>${l.label}</a>`).join('')}</div>`;
    grid.appendChild(el);
  });
}
render();

document.querySelectorAll('.chip').forEach(ch=>{
  ch.addEventListener('click',()=>{
    document.querySelectorAll('.chip').forEach(x=>x.classList.remove('active'));
    ch.classList.add('active');
    render(ch.dataset.filter);
  });
});
// Contact placeholder
const form = document.getElementById('contactForm');
form.addEventListener('submit', e=>{
  e.preventDefault();
  alert('Configura un endpoint (Formspree/Azure Functions) e imposta l\'action del form.');
});
