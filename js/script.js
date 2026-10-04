const header=document.getElementById('siteHeader');
const nav=document.getElementById('mainNav');
const menu=document.getElementById('menuToggle');
const navLinks=[...document.querySelectorAll('.main-nav a')];
const slides=[...document.querySelectorAll('.hero-slide')];
const progress=document.getElementById('heroProgress');
const typedTitle=document.getElementById('typedTitle');
const modal=document.getElementById('projectModal');
const modalImage=document.getElementById('modalImage');
const modalCategory=document.getElementById('modalCategory');
const modalTitle=document.getElementById('modalTitle');
const modalText=document.getElementById('modalText');
const modalClose=document.getElementById('modalClose');

window.addEventListener('scroll',()=>header.classList.toggle('scrolled',window.scrollY>30),{passive:true});
menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});
navLinks.forEach(link=>link.addEventListener('click',()=>nav.classList.remove('open')));

let current=0;const slideDuration=3000;
function showSlide(index){slides.forEach((s,i)=>s.classList.toggle('active',i===index));current=index;progress.style.transition='none';progress.style.width='0%';requestAnimationFrame(()=>{progress.style.transition=`width ${slideDuration}ms linear`;progress.style.width='100%';});}
showSlide(0);setInterval(()=>showSlide((current+1)%slides.length),slideDuration);

const title='KENARI ART EXHIBITION';let ti=0;
function typeTitle(){if(ti<=title.length){typedTitle.textContent=title.slice(0,ti++);setTimeout(typeTitle,90);}else{setTimeout(()=>{ti=0;typeTitle();},2200);}}typeTitle();

const projectCards=[...document.querySelectorAll('.project-card')];
projectCards.forEach(card=>{const open=()=>{const id=card.dataset.project; window.location.href=`project-detail.html?project=${id}`;};card.addEventListener('click',open);card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open();}});});

const contactForm=document.getElementById('contactForm');const formMessage=document.getElementById('formMessage');contactForm.addEventListener('submit',e=>{e.preventDefault();formMessage.textContent='Terima kasih. Pesanmu sudah siap dikirim. Hubungkan form ini ke email/WhatsApp Kenari Art untuk menerima pesan secara nyata.';contactForm.reset();});

const sections=[...document.querySelectorAll('main section[id]')];const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${entry.target.id}`));}}),{rootMargin:'-40% 0px -50% 0px'});sections.forEach(s=>observer.observe(s));
