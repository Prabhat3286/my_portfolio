// Portfolio interactions — plain JavaScript (no framework)
if (window.lucide) lucide.createIcons();

// Typing headline
const typedText = document.getElementById('typedText');
const phrases = ['web experiences.', 'useful applications.', 'clean interfaces.', 'creative solutions.'];
let phraseIndex = 0, charIndex = 0, deleting = false;
function typeLoop() {
  if (!typedText) return;
  const phrase = phrases[phraseIndex];
  typedText.textContent = phrase.slice(0, charIndex);
  if (!deleting && charIndex < phrase.length) { charIndex++; setTimeout(typeLoop, 85); }
  else if (deleting && charIndex > 0) { charIndex--; setTimeout(typeLoop, 42); }
  else { deleting = !deleting; if (!deleting) phraseIndex = (phraseIndex + 1) % phrases.length; setTimeout(typeLoop, deleting ? 1300 : 300); }
}
typeLoop();

// Reveal elements as they enter the viewport
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Scroll progress + active navigation link
const progress = document.getElementById('progress');
const navLinks = [...document.querySelectorAll('.nav a')];
const sections = [...document.querySelectorAll('main section[id], main section.hero')];
function onScroll() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0}%`;
  let current = 'home';
  document.querySelectorAll('main section[id]').forEach(section => {
    if (window.scrollY >= section.offsetTop - 150) current = section.id;
  });
  navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${current}`));
}
window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

// Mobile navigation
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');
menuBtn?.addEventListener('click', () => {
  nav.classList.toggle('open');
  menuBtn.innerHTML = nav.classList.contains('open') ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
  if (window.lucide) lucide.createIcons();
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));

// Subtle cursor glow on desktop
const cursorGlow = document.getElementById('cursorGlow');
if (window.matchMedia('(pointer:fine)').matches) {
  window.addEventListener('mousemove', event => {
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
  }, { passive: true });
}

// Gentle 3D tilt on the code card
const tiltCard = document.querySelector('.tilt-card');
if (tiltCard && window.matchMedia('(pointer:fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  tiltCard.addEventListener('mousemove', event => {
    const rect = tiltCard.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    tiltCard.style.transform = `rotateY(${x * 9 + 5}deg) rotateX(${-y * 8}deg)`;
  });
  tiltCard.addEventListener('mouseleave', () => tiltCard.style.transform = 'rotate(5deg)');
}
