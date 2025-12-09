// Slider functionality
slider=document.getElementById('promotionsSlider');
prevBtn=document.getElementById('prevBtn');
nextBtn=document.getElementById('nextBtn');
dots=document.querySelectorAll('.dot');
let currentSlide=0;
totalSlides=document.querySelectorAll('.slide').length;

function goToSlide(slideIndex){
    if(slideIndex<0)slideIndex=totalSlides-1;
    if(slideIndex>=totalSlides)slideIndex=0;
    
    currentSlide=slideIndex;
    slider.style.transform=`translateX(-${currentSlide * 100}%)`;
    
    // Update dots
    dots.forEach((dot,index)=>{
      dot.classList.toggle('active',index==currentSlide);});}

function nextSlide(){
  goToSlide(currentSlide+1);}

function prevSlide(){
  goToSlide(currentSlide-1);}

// Event listeners
nextBtn.addEventListener('click',nextSlide);
prevBtn.addEventListener('click',prevSlide);

// Dot navigation
dots.forEach((dot,index)=>{
  dot.addEventListener('click',()=>goToSlide(index));});

// Auto slide every 5 seconds
let autoSlideInterval=setInterval(nextSlide,5000);

// Pause auto slide on hover
slider.addEventListener('mouseenter',()=>{
  clearInterval(autoSlideInterval);});

slider.addEventListener('mouseleave',()=>{
  autoSlideInterval = setInterval(nextSlide, 5000);});

// Touch swipe functionality for mobile
let touchStartX=0;
let touchEndX=0;

slider.addEventListener('touchstart',(event)=>{
  touchStartX=event.changedTouches[0].screenX;});

slider.addEventListener('touchend',(event)=>{
  touchEndX=event.changedTouches[0].screenX;
  handleSwipe();});

function handleSwipe(){
    swipeThreshold=50; // Minimum distance for swipe
    if(touchStartX-touchEndX>swipeThreshold){
      nextSlide();} 
    else if (touchEndX-touchStartX>swipeThreshold){
      prevSlide();}}
goToSlide(0);