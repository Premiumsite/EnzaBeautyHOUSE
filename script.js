
const nav = document.getElementById('nav');
const links = document.getElementById('links');
const menuBtn = document.getElementById('menuBtn');
const particles = document.getElementById('particles');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

menuBtn.addEventListener('click', () => {
  links.classList.toggle('open');
});

document.querySelectorAll('.links a').forEach(a => {
  a.addEventListener('click', () => links.classList.remove('open'));
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('show');
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

for (let i = 0; i < 120; i++) {
  const p = document.createElement('span');
  p.className = 'particle';
  p.style.left = Math.random() * 100 + '%';
  p.style.animationDuration = (8 + Math.random() * 14) + 's';
  p.style.animationDelay = (-Math.random() * 18) + 's';
  p.style.opacity = (0.25 + Math.random() * 0.75).toFixed(2);
  const size = 2 + Math.random() * 4;
  p.style.width = size + 'px';
  p.style.height = size + 'px';
  particles.appendChild(p);
}

const counters = document.querySelectorAll('[data-count]');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseFloat(el.dataset.count);
    let current = 0;
    const step = target / 55;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = target % 1 ? current.toFixed(1) : Math.round(current);
    }, 22);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.7 });

counters.forEach(c => counterObserver.observe(c));
