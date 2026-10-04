const navbar=document.getElementById('navbar');
const slides=[...document.querySelectorAll('.hero-slide')];
const currentSlide=document.getElementById('current-slide');
const progressBar=document.getElementById('slide-progress-bar');
const menuToggle=document.querySelector('.menu-toggle');
const navMenu=document.querySelector('.nav-menu');
const navLinks=[...document.querySelectorAll('.nav-menu a')];
const typingTitle=document.getElementById('typing-title');

const slideDuration=3000;
let index=0;
let timer;
let progressTimer;

function preload(src){return new Promise(resolve=>{const img=new Image();img.onload=resolve;img.onerror=resolve;img.src=src;});}
function resetProgress(){
  if(!progressBar)return;
  progressBar.style.transition='none'; progressBar.style.width='0%';
  requestAnimationFrame(()=>{requestAnimationFrame(()=>{progressBar.style.transition=`width ${slideDuration}ms linear`;progressBar.style.width='100%';});});
}
function showSlide(next){
  if(!slides.length)return;
  const old=slides[index];
  index=(next+slides.length)%slides.length;
  const current=slides[index];
  old.classList.remove('active');
  current.classList.add('active');
  if(currentSlide)currentSlide.textContent=String(index+1).padStart(2,'0');
  resetProgress();
}
function startSlideshow(){
  clearInterval(timer); index=0; slides.forEach((s,i)=>s.classList.toggle('active',i===0));
  if(currentSlide)currentSlide.textContent='01'; resetProgress();
  timer=setInterval(()=>showSlide(index+1),slideDuration);
}
Promise.all(slides.map(s=>preload(s.src))).finally(startSlideshow);

function updateNavbar(){navbar?.classList.toggle('scrolled',window.scrollY>30)}
window.addEventListener('scroll',updateNavbar,{passive:true}); updateNavbar();

menuToggle?.addEventListener('click',()=>{const open=navMenu.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(open));});
navLinks.forEach(link=>link.addEventListener('click',()=>{navMenu.classList.remove('open');menuToggle?.setAttribute('aria-expanded','false');}));

const title='KENARI ART EXHIBITION'; let char=0;
function typeTitle(){if(!typingTitle)return;typingTitle.textContent=title.slice(0,char++);if(char<=title.length)setTimeout(typeTitle,85)}
typeTitle();

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const sections=[...document.querySelectorAll('main section[id]')];
const sectionObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${entry.target.id}`))}}),{rootMargin:'-35% 0px -55% 0px'});
sections.forEach(s=>sectionObserver.observe(s));
