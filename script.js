const header=document.querySelector('.site-header');
window.addEventListener('scroll',()=>header.classList.toggle('scrolled',window.scrollY>20),{passive:true});
const menu=document.querySelector('.menu-toggle');const nav=document.querySelector('.nav');
menu?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',open)});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu?.setAttribute('aria-expanded','false')}));

document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const target=document.querySelector(a.getAttribute('href'));if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth'})}}));

const cursor=document.querySelector('.cursor');let mx=window.innerWidth/2,my=window.innerHeight/2,cx=mx,cy=my;
if(cursor && matchMedia('(pointer:fine)').matches){document.body.classList.add('cursor-active');window.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY},{passive:true});const loop=()=>{cx+=(mx-cx)*.18;cy+=(my-cy)*.18;cursor.style.left=cx+'px';cursor.style.top=cy+'px';requestAnimationFrame(loop)};loop();document.querySelectorAll('[data-cursor]').forEach(el=>{el.addEventListener('mouseenter',()=>{cursor.classList.add('hover');cursor.querySelector('.cursor-label').textContent=el.dataset.cursor});el.addEventListener('mouseleave',()=>cursor.classList.remove('hover'))});window.addEventListener('mousedown',()=>cursor.classList.add('click'));window.addEventListener('mouseup',()=>cursor.classList.remove('click'))}else{cursor?.remove()}

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const lightbox=document.getElementById('lightbox'),lbImg=document.getElementById('lightbox-img'),lbTitle=document.getElementById('lightbox-title');
function openBox(src,title){lbImg.src=src;lbImg.alt=title;lbTitle.textContent=title;lightbox.classList.add('open');lightbox.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'}
function closeBox(){lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true');document.body.style.overflow=''}
document.querySelectorAll('[data-lightbox]').forEach(el=>el.addEventListener('click',()=>openBox(el.dataset.lightbox,el.dataset.title||'Project image')));document.querySelector('.lightbox-close').addEventListener('click',closeBox);lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeBox()});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeBox()});
