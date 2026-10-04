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

const projects=[
 {category:'EXHIBITION CONTRACTOR',title:'KENARI ART — PROJECT 01',image:'assets/slide-1.jpg',text:'Selected exhibition work by Kenari Art. A project space for showcasing products, branding and visitor experience from concept through installation.'},
 {category:'CUSTOM DESIGN',title:'KENARI ART — PROJECT 02',image:'assets/slide-2.jpg',text:'Custom booth and brand space developed around the client identity, exhibition footprint and practical visitor flow.'},
 {category:'EVENT MANAGEMENT',title:'KENARI ART — PROJECT 03',image:'assets/slide-3.jpg',text:'Event production support focused on preparation, coordination and smooth execution on show day.'},
 {category:'EXHIBITION CONTRACTOR',title:'KENARI ART — PROJECT 04',image:'assets/slide-4.jpg',text:'Exhibition installation with attention to finishing, presentation and readiness before the event opens.'}
];
function openProject(index){const p=projects[index];modalImage.src=p.image;modalImage.alt=p.title;modalCategory.textContent=p.category;modalTitle.textContent=p.title;modalText.textContent=p.text;modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');history.replaceState(null,'',`#projects-${index+1}`);}
function closeProject(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open');if(location.hash.startsWith('#projects-'))history.replaceState(null,'',location.pathname+location.search);}
document.querySelectorAll('.project-card').forEach(card=>{const open=()=>openProject(Number(card.dataset.project));card.addEventListener('click',open);card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open();}});});
modalClose.addEventListener('click',closeProject);document.querySelectorAll('[data-close-modal]').forEach(el=>el.addEventListener('click',closeProject));document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal.classList.contains('open'))closeProject();});

const contactForm=document.getElementById('contactForm');const formMessage=document.getElementById('formMessage');contactForm.addEventListener('submit',e=>{e.preventDefault();formMessage.textContent='Terima kasih. Pesanmu sudah siap dikirim. Hubungkan form ini ke email/WhatsApp Kenari Art untuk menerima pesan secara nyata.';contactForm.reset();});

const sections=[...document.querySelectorAll('main section[id]')];const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${entry.target.id}`));}}),{rootMargin:'-40% 0px -50% 0px'});sections.forEach(s=>observer.observe(s));
