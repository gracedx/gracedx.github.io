// Minimal JS: highlight active nav link based on URL
document.addEventListener('DOMContentLoaded',function(){
  var links=document.querySelectorAll('.site-nav a');
  links.forEach(function(a){
    if(location.pathname.endsWith(a.getAttribute('href')) || (location.pathname.endsWith('/') && a.getAttribute('href')==='index.html')){
      a.classList.add('active');
    }
  });
});
