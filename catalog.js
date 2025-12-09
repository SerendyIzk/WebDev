// Carousel functionality
class Carousel
{
  constructor(carouselId,dotsId){
    this.carousel=document.getElementById(carouselId);
    this.slides=this.carousel.querySelectorAll('.carousel-slide');
    this.dotsContainer=document.getElementById(dotsId);
    this.dots=this.dotsContainer.querySelectorAll('.dot');
    this.currentSlide=0;
    this.totalSlides=this.slides.length;
    this.slideWidth=this.slides[0].offsetWidth+(parseFloat(style.marginLeft)||0)+(parseFloat(style.marginRight)||0);
    
    // Initialize
    this.updateCarousel();
    this.setupEventListeners();
    this.touchStartX=0;
    this.touchEndX=0;
    
    // Auto slide every 8 seconds
    this.autoSlideInterval=setInterval(()=>this.nextSlide(),8000);}
    
  setupEventListeners(){
    // Navigation buttons
    const prevBtn=document.querySelector(`.prev-btn[data-target="${this.carousel.id}"]`);
    const nextBtn=document.querySelector(`.next-btn[data-target="${this.carousel.id}"]`);
    prevBtn.addEventListener('click',()=>this.prevSlide());
    nextBtn.addEventListener('click',()=>this.nextSlide());
    
    // Dot navigation
    this.dots.forEach((dot,index)=>{
      dot.addEventListener('click',()=>this.goToSlide(index));});
    
    // Pause auto slide on hover
    this.carousel.parentElement.addEventListener('mouseenter',()=>{
      clearInterval(this.autoSlideInterval);});
    
    this.carousel.parentElement.addEventListener('mouseleave',()=>{
      this.autoSlideInterval=setInterval(()=>this.nextSlide(),8000);});
    
    // Touch swipe functionality 
    this.carousel.addEventListener('touchstart',(event)=>{
      this.touchStartX=event.changedTouches[0].screenX;});
    
    this.carousel.addEventListener('touchend',(event)=>{
      this.touchEndX=event.changedTouches[0].screenX;
      this.handleSwipe();});}
      
  handleSwipe(){
    let swipeThreshold=50;
    if(this.touchStartX-this.touchEndX>swipeThreshold){
      this.nextSlide();}
    else if(this.touchEndX-this.touchStartX>swipeThreshold){
      this.prevSlide();}}
      
  goToSlide(slideIndex){
    if(slideIndex<0)slideIndex=this.totalSlides-1;
    if(slideIndex>=this.totalSlides)slideIndex=0;
    this.currentSlide=slideIndex;
    this.updateCarousel();}
    
  nextSlide(){
    this.goToSlide(this.currentSlide+1);}
      
  prevSlide(){
    this.goToSlide(this.currentSlide-1);}
      
  updateCarousel(){
    // Update transform
    this.carousel.style.transform=`translateX(-${this.currentSlide*this.slideWidth}px)`;  
    // Update dots
    this.dots.forEach((dot,index)=>{dot.classList.toggle('active',index==this.currentSlide);});}
}

// Initialize all carousels
document.addEventListener('DOMContentLoaded',function(){
    new Carousel('sofasCarousel','sofasDots');
    new Carousel('bedsCarousel','bedsDots');
    new Carousel('tablesCarousel','tablesDots');});

// Add CSS animation keyframes
style=document.createElement('style');
document.head.appendChild(style);