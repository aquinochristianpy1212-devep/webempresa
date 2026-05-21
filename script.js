// ===== NAV LINKS & SCROLL ACTIVE =====
const navLinks = document.querySelectorAll('.nav-links a');
const mobileLinks = document.querySelectorAll('.mobile-menu a');
const allScrollLinks = document.querySelectorAll('a[href^="#"]');

allScrollLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href');
    if (!targetId || targetId.length <= 1) return;
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (link.closest('.nav-links')) {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
    // close mobile menu on link click
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
  });
});

const sections = [...document.querySelectorAll('#inicio,#servicios,#nosotros,#proyectos,#tecnologias,#contacto')];
const setActiveLink = () => {
  let current = 'inicio';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 170) current = section.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
  mobileLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
};
window.addEventListener('scroll', setActiveLink);
setActiveLink();

// ===== NAVBAR STICKY GLASSMORPHISM =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

// ===== REVEAL ON SCROLL =====
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

// ===== HOVER GLOW CARDS =====
const cards = document.querySelectorAll('.service-card,.stat-item,.contact-action,.contact-form button,.value-card,.project-card');
cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    card.style.setProperty('--my', `${e.clientY - rect.top}px`);
  });
});

// ===== CONTACT FORM =====
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const name = data.get('name')?.trim();
  const contact = data.get('contact')?.trim();
  const message = data.get('message')?.trim();
  const text = `Hola NOVARY, soy ${name}. Mi contacto es ${contact}. Quiero consultar: ${message}`;
  status.textContent = 'Mensaje listo. Se abrirá WhatsApp para enviarlo.';
  window.open(`https://wa.me/595972983029?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
});

