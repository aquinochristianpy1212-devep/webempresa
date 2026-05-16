const navLinks = document.querySelectorAll('.nav-links a');
const allScrollLinks = document.querySelectorAll('a[href^="#"]');

allScrollLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');
    if (!targetId || targetId.length <= 1) return;
    const target = document.querySelector(targetId);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // Si es un link del navbar, marcarlo como activo inmediatamente
    if (link.closest('.nav-links')) {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
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
};
window.addEventListener('scroll', setActiveLink);
setActiveLink();

const cards = document.querySelectorAll('.service-card, .stat-item, .talk-btn, .primary-btn, .ghost-btn, .project-grid article, .contact-action, .contact-form button');
cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    card.style.setProperty('--my', `${e.clientY - rect.top}px`);
  });
});

const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');
form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const name = data.get('name')?.trim();
  const contact = data.get('contact')?.trim();
  const message = data.get('message')?.trim();
  const text = `Hola NOVARY, soy ${name}. Mi contacto es ${contact}. Quiero consultar: ${message}`;
  status.textContent = 'Mensaje listo. Se abrirá WhatsApp para enviarlo.';
  window.open(`https://wa.me/595972983029?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
});
