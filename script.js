// ===== ELEMENT SELECTIONS & CHECKS =====
const navbar = document.getElementById('navbar');
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
const reveals = document.querySelectorAll('.reveal');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

// ===== MOBILE MENU =====
if (burger && mobileMenu) {
  // toggle mobile menu + update aria-expanded for accessibility
  burger.setAttribute('aria-expanded', 'false');
  burger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(isOpen));
  });
}

function closeMobile() {
  if (mobileMenu) mobileMenu.classList.remove('open');
}

// close mobile menu when resizing to desktop
window.addEventListener('resize', () => {
  if (window.innerWidth > 900 && mobileMenu && mobileMenu.classList.contains('open')) {
    mobileMenu.classList.remove('open');
    if (burger) burger.setAttribute('aria-expanded', 'false');
  }
});

// ===== COMBINED & OPTIMIZED SCROLL EVENTS =====
// Menggabungkan navbar toggle dan active link ke satu listener
window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY;

  // 1. Navbar Scroll Toggle
  if (navbar) {
    navbar.classList.toggle('scrolled', scrollPos > 40);
  }

  // 2. Active Nav Link
  let current = '';
  sections.forEach(section => {
    // Menggunakan getBoundingClientRect().top + scrollY agar nilainya lebih konsisten dibanding offsetTop
    const sectionTop = section.offsetTop - 120; 
    if (scrollPos >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    if (current && link.getAttribute('href') === `#${current}`) {
      link.style.color = 'var(--gold)';
    } else {
      link.style.color = '';
    }
  });
});

// ===== REVEAL ON SCROLL =====
if (reveals.length > 0) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(el => observer.observe(el));
}

// ===== SMOOTH ANCHOR SCROLL =====
// :not([href="#"]) memastikan href="#" biasa tidak ikut memicu script ini
document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    const target = document.querySelector(targetId);
    
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===== FIVERR REDIRECT =====
function openFiverr() {
  window.open("https://fiverr.com/hen_forger", "_blank");
}