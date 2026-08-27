const menuBtn=document.getElementById('menuBtn');
const nav=document.getElementById('nav');
menuBtn?.addEventListener('click',()=>nav.classList.toggle('open'));
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const observer=new IntersectionObserver((entries)=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const filters=document.querySelectorAll('.filter');
const projects=document.querySelectorAll('.project');
filters.forEach(btn=>btn.addEventListener('click',()=>{
  filters.forEach(b=>b.classList.remove('active'));btn.classList.add('active');
  const f=btn.dataset.filter;
  projects.forEach(p=>p.classList.toggle('hidden',f!=='all'&&!p.classList.contains(f)));
}));

const rates={
  flat:{base:12000,comfort:18000,premium:30000},
  house:{base:28000,comfort:42000,premium:65000},
  commercial:{base:10000,comfort:16000,premium:26000}
};
const type=document.getElementById('type'),area=document.getElementById('area'),level=document.getElementById('level');
const estimateValue=document.getElementById('estimateValue'),estimateNote=document.getElementById('estimateNote');
function calc(){const a=Math.max(10,Number(area.value)||10);const r=rates[type.value][level.value];estimateValue.textContent='от '+new Intl.NumberFormat('ru-RU').format(a*r)+' ₽';estimateNote.textContent='≈ '+new Intl.NumberFormat('ru-RU').format(r)+' ₽/м²';}
[type,area,level].forEach(el=>el.addEventListener('input',calc));calc();

document.getElementById('leadForm')?.addEventListener('submit',e=>{
  e.preventDefault();
  const status=document.getElementById('formStatus');
  status.textContent='Заявка заполнена. Для боевого сайта подключим отправку в Telegram или на почту.';
  e.target.reset();
});
