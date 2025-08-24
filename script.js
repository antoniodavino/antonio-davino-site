/* ====== Mobile menu ====== */
const burger = document.getElementById('burger');
const menu = document.getElementById('site-menu');

burger?.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  burger.setAttribute('aria-expanded', open ? 'true' : 'false');
});

/* ====== Sezioni on-demand (dal menu) ====== */
const sections = Array.from(document.querySelectorAll('.section'));
function showSection(id){
  // Chiudi eventuali modali aperte
  closeCV(); closeAgent();

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

/* ====== CV interattivo (modale) ====== */
const openCVBtn = document.getElementById('open-cv');
const cvModal = document.getElementById('cv-modal');
const closeCVBtn = document.getElementById('close-cv');

function openCV(){ cvModal?.classList.remove('hidden'); }
function closeCV(){ cvModal?.classList.add('hidden'); }

openCVBtn?.addEventListener('click', openCV);
closeCVBtn?.addEventListener('click', closeCV);

// Chiudi modale cliccando fuori dal contenuto
cvModal?.addEventListener('click', (e) => {
  if (e.target === cvModal) closeCV();
});

/* ====== Sintesi vocale (dal CV allegato) ====== */
// Mantengo la tua UX “Ascolta questo CV” con Web Speech API. [2](https://myoffice.accenture.com/personal/antonio_davino_accenture_com/_layouts/15/download.aspx?UniqueId=6320a520-211d-4635-b10d-45a83aee9eaa&Translate=false&tempauth=v1.eyJzaXRlaWQiOiIwMmY4ZWUxMi0yMzI4LTQxNTAtYmE2Zi0wNGFlZGE3YWM5NGIiLCJhcHBfZGlzcGxheW5hbWUiOiJPZmZpY2UgMzY1IFNlYXJjaCBTZXJ2aWNlIiwiYXBwaWQiOiI2NmE4ODc1Ny0yNThjLTRjNzItODkzYy0zZThiZWQ0ZDY4OTkiLCJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvbXlvZmZpY2UuYWNjZW50dXJlLmNvbUBlMDc5M2QzOS0wOTM5LTQ5NmQtYjEyOS0xOThlZGQ5MTZmZWIiLCJleHAiOiIxNzU2MDgwNjA5In0.CgoKBGFjcnMSAmMyCkAKDGVudHJhX2NsYWltcxIwQ0lXWnJzVUdFQUFhRms5bVpETmZPR05WTWpCUFNXaFROV3R0ZUdsSlFVRXFBQT09CjIKCmFjdG9yYXBwaWQSJDAwMDAwMDAzLTAwMDAtMDAwMC1jMDAwLTAwMDAwMDAwMDAwMAoKCgRzbmlkEgI2NBILCLygn_ys27E-EAUaDjIwLjE5MC4xMzIuMTA2Kiw2TldBZ09VMm84Sk91RHo5WmxvMlRkOW9ucnNjZVhDSldQZVE4UVV1T253PTCcATgBQhChvwhYPTAAoACAJ4maByjFShBoYXNoZWRwcm9vZnRva2VuUhJbImttc2kiLCJkdmNfY21wIl1aC1siYXBwX3JlcyJdaiRmMmU0OWJlZi04YjZjLTQzNDMtOWQwZi0yM2NhOTkwZmU0NjJyKTBoLmZ8bWVtYmVyc2hpcHwxMDAzN2ZmZThkM2UxOWExQGxpdmUuY29tegEyggESCTk9eeA5CW1JEbEpGY7dkW_rkgEHQW50b25pb5oBB0QnQXZpbm-iARxhbnRvbmlvLmRhdmlub0BhY2NlbnR1cmUuY29tqgEQMTAwMzdGRkU4RDNFMTlBMbIBOmdyb3VwLnJlYWQgYWxsZmlsZXMucmVhZCBhbGxwcm9maWxlcy5yZWFkIGFsbHByb2ZpbGVzLnJlYWTIAQE.YerkbUX1_pek8V7Q6ZzPYWp5HzT4a6OUmbam88Z6xdQ&ApiVersion=2.0&web=1)
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
  const blocks = Array.from(document.querySelectorAll('#cv-modal .cv'))
    .map(s => s.innerText.replace(/\s+/g, ' ').trim())
    .join('\n');
  speaking = true;
  listenBtn.textContent = '⏸ Interrompi';
  speak(blocks);
});

/* ====== Chat agente AI (placeholder) ====== */
// Reimpiego la tua struttura di modale con iframe come placeholder per integrazione (Agentforce/Azure). [2](https://myoffice.accenture.com/personal/antonio_davino_accenture_com/_layouts/15/download.aspx?UniqueId=6320a520-211d-4635-b10d-45a83aee9eaa&Translate=false&tempauth=v1.eyJzaXRlaWQiOiIwMmY4ZWUxMi0yMzI4LTQxNTAtYmE2Zi0wNGFlZGE3YWM5NGIiLCJhcHBfZGlzcGxheW5hbWUiOiJPZmZpY2UgMzY1IFNlYXJjaCBTZXJ2aWNlIiwiYXBwaWQiOiI2NmE4ODc1Ny0yNThjLTRjNzItODkzYy0zZThiZWQ0ZDY4OTkiLCJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvbXlvZmZpY2UuYWNjZW50dXJlLmNvbUBlMDc5M2QzOS0wOTM5LTQ5NmQtYjEyOS0xOThlZGQ5MTZmZWIiLCJleHAiOiIxNzU2MDgwNjA5In0.CgoKBGFjcnMSAmMyCkAKDGVudHJhX2NsYWltcxIwQ0lXWnJzVUdFQUFhRms5bVpETmZPR05WTWpCUFNXaFROV3R0ZUdsSlFVRXFBQT09CjIKCmFjdG9yYXBwaWQSJDAwMDAwMDAzLTAwMDAtMDAwMC1jMDAwLTAwMDAwMDAwMDAwMAoKCgRzbmlkEgI2NBILCLygn_ys27E-EAUaDjIwLjE5MC4xMzIuMTA2Kiw2TldBZ09VMm84Sk91RHo5WmxvMlRkOW9ucnNjZVhDSldQZVE4UVV1T253PTCcATgBQhChvwhYPTAAoACAJ4maByjFShBoYXNoZWRwcm9vZnRva2VuUhJbImttc2kiLCJkdmNfY21wIl1aC1siYXBwX3JlcyJdaiRmMmU0OWJlZi04YjZjLTQzNDMtOWQwZi0yM2NhOTkwZmU0NjJyKTBoLmZ8bWVtYmVyc2hpcHwxMDAzN2ZmZThkM2UxOWExQGxpdmUuY29tegEyggESCTk9eeA5CW1JEbEpGY7dkW_rkgEHQW50b25pb5oBB0QnQXZpbm-iARxhbnRvbmlvLmRhdmlub0BhY2NlbnR1cmUuY29tqgEQMTAwMzdGRkU4RDNFMTlBMbIBOmdyb3VwLnJlYWQgYWxsZmlsZXMucmVhZCBhbGxwcm9maWxlcy5yZWFkIGFsbHByb2ZpbGVzLnJlYWTIAQE.YerkbUX1_pek8V7Q6ZzPYWp5HzT4a6OUmbam88Z6xdQ&ApiVersion=2.0&web=1)
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

