// 1. LOADER
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hide');
  }, 2500);
});

// 2. CUSTOM CURSOR + TRAIL
const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');
const trails = [];
const TRAIL_COUNT = 8;

for (let i = 0; i < TRAIL_COUNT; i++) {
  const t = document.createElement('div');
  t.classList.add('cursor-trail');
  t.style.opacity = (1 - i / TRAIL_COUNT) * 0.4;
  t.style.width = t.style.height = (6 - i * 0.5) + 'px';
  document.body.appendChild(t);
  trails.push({ el: t, x: 0, y: 0 });
}

let mx = 0, my = 0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  dot.style.left = mx + 'px';
  dot.style.top = my + 'px';
  ring.style.left = mx + 'px';
  ring.style.top = my + 'px';
});

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    ring.style.transform = 'translate(-50%,-50%) scale(1.8)';
    ring.style.borderColor = 'rgba(0,212,170,0.8)';
  });
  el.addEventListener('mouseleave', () => {
    ring.style.transform = 'translate(-50%,-50%) scale(1)';
    ring.style.borderColor = 'rgba(124,92,252,0.6)';
  });
});

function animateTrails() {
  let px = mx, py = my;
  trails.forEach((t, i) => {
    const delay = 0.6;
    t.x += (px - t.x) * delay;
    t.y += (py - t.y) * delay;
    t.el.style.left = t.x + 'px';
    t.el.style.top = t.y + 'px';
    px = t.x; py = t.y;
  });
  requestAnimationFrame(animateTrails);
}
animateTrails();

// 3. PARTICLES
tsParticles.load("tsparticles", {
  particles: {
    number: { value: 70 },
    color: { value: ["#7c5cfc", "#00d4aa", "#ff6b9d"] },
    opacity: { value: 0.25 },
    size: { value: { min: 1, max: 3 } },
    move: { enable: true, speed: 0.6 },
    links: { enable: true, distance: 120, color: "#7c5cfc", opacity: 0.1 }
  },
  background: { color: "transparent" }
});

// 4. SCROLL ANIMATIONS
AOS.init({ duration: 800, once: true, offset: 80 });

// 5. TYPING EFFECT
const words = ["actually work.", "stand out.", "make money.", "get noticed.", "go viral."];
let wi = 0, ci = 0, deleting = false;
const el = document.getElementById("typed-text");

function type() {
  const word = words[wi];
  if (!deleting) {
    el.textContent = word.slice(0, ++ci);
    if (ci === word.length) { deleting = true; setTimeout(type, 2000); return; }
  } else {
    el.textContent = word.slice(0, --ci);
    if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; }
  }
  setTimeout(type, deleting ? 50 : 85);
}
type();

// 6. COUNTER ANIMATION
const counters = document.querySelectorAll(".count");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = +entry.target.getAttribute("data-target");
      let count = 0;
      const step = Math.ceil(target / 60);
      const timer = setInterval(() => {
        count += step;
        if (count >= target) { entry.target.textContent = target; clearInterval(timer); }
        else entry.target.textContent = count;
      }, 30);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
counters.forEach(c => observer.observe(c));

// 7. NAV SCROLL EFFECT
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
});

// 8. SPLIT TEXT EFFECT
document.querySelectorAll('.split-text').forEach(el => {
  const text = el.textContent;
  el.innerHTML = text.split('').map(c =>
    c === ' ' ? ' ' : `<span class="char">${c}</span>`
  ).join('');
});
