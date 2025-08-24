/* ====== Mobile menu ====== */
const burger = document.getElementById('burger');
const menu = document.getElementById('site-menu');

burger?.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  burger.setAttribute('aria-expanded', open ? 'true' : 'false');
});

/* ====== Sezioni on-demand (dal menu) ====== */
const sections = Array.from(document.querySelectorAll('.section'));

function cancelTTS(){
  try {
    window.speechSynthesis?.cancel();
  } catch {}
}

function showSection(id){
  // Stop eventuale lettura vocale quando si cambia sezione
  cancelTTS();

  // Nasconde tutte e mostra solo la richiesta
  sections.forEach(s => s.classList.add('hidden'));
  const el = document.getElementById(id);
  if (el) el.classList.remove('hidden');

  // Chiude il menu su mobile
  menu?.classList.remove('open');
  burger?.setAttribute('aria-expanded','false');

  // Scorre alla sezione
  if (el) el.scrollIntoView({behavior:'smooth', block:'start'});
}

menu?.querySelectorAll('a[data-section]')?.forEach(a => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    const id = a.getAttribute('data-section');
    if (id) {
      history.pushState(null, '', `#${id}`);
      showSection(id);
    }
  });
});

// All'avvio: se c'è hash mostra la sezione, altrimenti resta solo l'hero
window.addEventListener('DOMContentLoaded', () => {
  const hash = (location.hash || '').replace('#','');
  if (hash) showSection(hash);
});

/* ====== Visualizza CV (come sezione, non modale) ====== */
const viewCVBtn = document.getElementById('view-cv');
viewCVBtn?.addEventListener('click', () => {
  history.pushState(null, '', '#cv');
  showSection('cv');
});

/* ====== Sintesi vocale (Web Speech API) ====== */
const listenBtn = document.getElementById('btn-listen');
let speaking = false;

function speak(text){
  const synth = window.speechSynthesis;
  if(!synth){ alert('La sintesi vocale non è supportata su questo browser.'); return; }
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'it-IT';
  utter.rate = 1.05;
  synth.cancel();
  synth.speak(utter);
}

listenBtn?.addEventListener('click', () => {
  const synth = window.speechSynthesis;
  if (speaking) {
    synth.cancel();
    speaking = false;
    listenBtn.textContent = '▶️ Ascolta questo CV';
    return;
  }
  const blocks = Array.from(document.querySelectorAll('#cv .cv'))
    .map(s => s.innerText.replace(/\s+/g, ' ').trim())
    .join('\n');
  speaking = true;
  listenBtn.textContent = '⏸ Interrompi';
  speak(blocks);
});

/* ====== Chat agente AI (placeholder) ====== */
const openAgentBtn = document.getElementById('open-agent');
const agentModal = document.getElementById('agent-modal');
const closeAgentBtn = document.getElementById('close-agent');
const agentIframe = document.getElementById('agent-iframe');

const AGENT_URL = 'about:blank'; // es: 'https://your-agent.example/chat?theme=light'

function openAgent(){
  agentIframe.src = AGENT_URL;
  agentModal?.classList.remove('hidden');
}
function closeAgent(){
  agentModal?.classList.add('hidden');
  if (agentIframe) agentIframe.src = 'about:blank';
}

openAgentBtn?.addEventListener('click', openAgent);
closeAgentBtn?.addEventListener('click', closeAgent);
agentModal?.addEventListener('click', (e) => {
  if (e.target === agentModal) closeAgent();
});

