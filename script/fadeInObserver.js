document.addEventListener('DOMContentLoaded', function() {
    console.log('=====observers')
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-myproject');
          observer.unobserve(entry.target); // Stop observing once faded in
        }
      });
    });
  
    const fadeElements = document.querySelectorAll('.myProject');
    console.log(fadeElements)
    fadeElements.forEach(element => {
      observer.observe(element);
    });
  });