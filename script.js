// Scroll spy - highlight nav links based on scroll position
const navLinks = document.querySelectorAll('.nav-wrapper nav a');
const sections = document.querySelectorAll('section[id], header');

function highlightNavOnScroll() {
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 150;
    const sectionId = section.getAttribute('id');

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });

  // If at the very top, highlight 'About'
  if (scrollY < 300) {
    navLinks.forEach(link => link.classList.remove('active'));
    const aboutLink = document.querySelector('.nav-wrapper nav a[href="#about"]');
    if (aboutLink) aboutLink.classList.add('active');
  }
}

window.addEventListener('scroll', highlightNavOnScroll);
highlightNavOnScroll();

// Smooth scroll — desktop nav
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
      window.scrollTo({ top: targetSection.offsetTop - 100, behavior: 'smooth' });
    }
  });
});

// Mobile nav — scroll spy + click with lock
const mobileSections = document.querySelectorAll('section[id]');
const mobileNavItems = document.querySelectorAll('.mobile-nav-item');

function setMobileActive(id) {
  mobileNavItems.forEach(i => i.classList.remove('active'));
  const el = document.querySelector(`.mobile-nav-item[href="#${id}"]`);
  if (el) el.classList.add('active');
}

let scrollLocked = false;

mobileNavItems.forEach(item => {
  item.addEventListener('click', e => {
    e.preventDefault();
    const targetId = item.getAttribute('href').replace('#', '');
    const target = document.getElementById(targetId);
    if (!target) return;
    setMobileActive(targetId);
    scrollLocked = true;
    clearTimeout(window._navLock);
    const offset = target.offsetTop - (window.innerHeight / 2) + (target.offsetHeight / 2);
    window.scrollTo({ top: Math.max(0, offset), behavior: 'smooth' });
    window._navLock = setTimeout(() => { scrollLocked = false; }, 750);
  });
});

window.addEventListener('scroll', () => {
  if (scrollLocked || window.innerWidth > 600) return;
  const y = window.pageYOffset;
  const pageBottom = document.body.scrollHeight - window.innerHeight;
  if (y >= pageBottom - 20) { setMobileActive('contact'); return; }
  const viewCenter = y + window.innerHeight / 2;
  let best = null, bestDist = Infinity;
  mobileSections.forEach(s => {
    const dist = Math.abs((s.offsetTop + s.offsetHeight / 2) - viewCenter);
    if (dist < bestDist) { bestDist = dist; best = s.id; }
  });
  if (best) setMobileActive(best);
});

// CTA button press state
const ctaBtn = document.querySelector('.cta-button');
if (ctaBtn) {
  ctaBtn.addEventListener('touchstart', () => ctaBtn.classList.add('pressed'), { passive: true });
  ctaBtn.addEventListener('touchend', () => setTimeout(() => ctaBtn.classList.remove('pressed'), 150), { passive: true });
}

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
const toggleWrapper = document.getElementById('toggle-wrapper');

function applyTheme(t) {
  document.body.setAttribute('data-theme', t);
  document.documentElement.setAttribute('data-theme', t);
  localStorage.setItem('theme', t);
}

const savedTheme = localStorage.getItem('theme') || 'dark';
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const t = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(t);
});

// Hide toggle on scroll down, show on scroll up (mobile only)
let lastScrollY = 0;
window.addEventListener('scroll', () => {
  if (window.innerWidth > 600 || !toggleWrapper) return;
  const y = window.pageYOffset;
  if (y > lastScrollY && y > 80) toggleWrapper.classList.add('hidden');
  else toggleWrapper.classList.remove('hidden');
  lastScrollY = y;
});
