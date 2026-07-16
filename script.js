const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  revealItems.forEach((item) => item.classList.add('ready'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => observer.observe(item));
}
