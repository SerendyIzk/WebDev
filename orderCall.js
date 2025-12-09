// Form validation and submission
callbackForm=document.getElementById('callbackForm');
successMessage=document.querySelector('.success-message');
formBody=document.querySelector('.form-body');

callbackForm.addEventListener('submit',function(event){
  event.preventDefault();
  
  // Validate form
  username=document.getElementById('name').value.trim();
  phone=document.getElementById('phone').value.trim();
  email=document.getElementById('email').value.trim();
  preferredTime=document.getElementById('preferredTime').value;
  
  let isValid=true;
  
  // Reset error messages
  document.querySelectorAll('.error-message').forEach(msg=>{
    msg.style.display='none';
    msg.previousElementSibling.classList.remove('error');});
  
  // Validate name
  if(!username){
    showError('nameError','Пожалуйста, введите ваше имя');
    isValid=false;}
  
  // Validate phone
  if(!phone||!/^\+?\d{10,15}$/.test(phone.replace(/\s+/g, ''))){
    showError('phoneError','Пожалуйста, введите корректный номер телефона');
    isValid=false;}
  
  // Validate email
  if(email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
    showError('emailError','Пожалуйста, введите корректный email');
    isValid=false;}
  
  // Validate preferred time
  if(!preferredTime){
    showError('timeError','Пожалуйста, выберите удобное время');
    isValid=false;}
  
  if(isValid){
    // Show success message
    callbackForm.style.display='none';
    successMessage.style.display='block';}});

function showError(elementId,message){
  errorElement=document.getElementById(elementId);
  errorElement.textContent=message;
  errorElement.style.display='block';
  errorElement.previousElementSibling.classList.add('error');}

// Format phone number
document.getElementById('phone').addEventListener('input',function(event){
  let value=event.target.value.replace(/\D/g,'');
    
  if(value.startsWith('358')){
    value='+'+value;} 
  else if(value.startsWith('8')){
    value='+358'+value.substring(1);}
  else if(value&&!value.startsWith('+')){
    value='+358'+value;}
    
  // Format Finnish phone numbers
  if(value.startsWith('+358')){
    value=value.replace('+358','+358 ');
    if(value.length>8&&value.indexOf(' ')==4){
      value=value.substring(0,8)+' '+value.substring(8);}
    if(value.length>12&&value.lastIndexOf(' ')==8){
      value=value.substring(0,12)+' '+value.substring(12);}}
  event.target.value=value;});