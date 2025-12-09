// Mobile menu
mobileMenuBtn=document.querySelector('.mobile-menu-btn');
navMenu=document.querySelector('.nav-menu');

mobileMenuBtn.addEventListener('click',function(){
  navMenu.classList.toggle('active');
  mobileMenuBtn.innerHTML=navMenu.classList.contains('active')?'✕':'☰';});

// Close mobile menu when clicking on links
document.querySelectorAll('.nav-link').forEach(link=>{link.addEventListener('click',function(){
  navMenu.classList.remove('active');
  mobileMenuBtn.innerHTML='☰';});});

// Animation on scroll
animateElements=document.querySelectorAll('.animate-fade-in-up');
observer=new IntersectionObserver((entries)=>{entries.forEach(entry=>{
  if(entry.isIntersecting){
    entry.target.style.opacity='1';
    entry.target.style.visibility='visible';}});},{threshold:0.1});

animateElements.forEach(element=>{
  element.style.opacity='0';
  element.style.visibility='hidden';
  element.style.transition='opacity 0.6s ease-out,transform 0.6s ease-out';
  observer.observe(element);});