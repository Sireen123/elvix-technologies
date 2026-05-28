// 1. LOADER
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hide');
  }, 2600);
});

// 2. PAGE TRANSITION
document.querySelectorAll('a[href^="http"]').forEach(link => {
  link.addEventListener('click', e => {
    const pt = document.querySelector('.page-transition');
    pt.classList.add('active');
    setTimeout(() => pt.classList.remove('active'), 600);
  });
});

// 3. CUSTOM CURSOR + TRAIL
const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');
const TRAIL_COUNT = 10;
const trails = [];

for (let i = 0; i < TRAIL_COUNT; i++) {
  const t = document.createElement('div');
  t.classList.add('cursor-trail');
  const size = 6 - i * 0.4;
  t.style.cssText = `width:${size}px;height:${size}px;background:${i % 2 === 0 ? '#7c5cfc' : '#00d4aa'};opacity:${0.5 - i * 0.04};`;
  document.body.appendChild(t);
  trails.push({ el: t, x: window.innerWidth / 2, y: window.innerHeight / 2 });
}

let mx = window.innerWidth / 2, my = window.innerHeight / 2;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  dot.style.left = mx + 'px';
  dot.style.top = my + 'px';
  ring.style.left = mx + 'px';
  ring.style.top = my + 'px';
});

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    ring.style.transform = 'translate(-50%,-50%) scale(2)';
    ring.style.borderColor = 'rgba(0,212,170,0.9)';
    ring.style.background = 'rgba(0,212,170,0.05)';
  });
  el.addEventListener('mouseleave', () => {
    ring.style.transform = 'translate(-50%,-50%) scale(1)';
    ring.style.borderColor = 'rgba(124,92,252,0.7)';
    ring.style.background = 'transparent';
  });
});

function animateTrails() {
  let px = mx, py = my;
  trails.forEach(t => {
    t.x += (px - t.x) * 0.55;
    t.y += (py - t.y) * 0.55;
    t.el.style.left = t.x + 'px';
    t.el.style.top = t.y + 'px';
    px = t.x; py = t.y;
  });
  requestAnimationFrame(animateTrails);
}
animateTrails();

// 4. CLICK RIPPLE
document.addEventListener('click', e => {
  const r = document.createElement('div');
  r.classList.add('ripple');
  r.style.left = e.clientX + 'px';
  r.style.top = e.clientY + 'px';
  r.style.width = r.style.height = '60px';
  document.body.appendChild(r);
  setTimeout(() => r.remove(), 800);
});

// 5. SHOOTING STARS
function createStar() {
  const star = document.createElement('div');
  star.classList.add('shooting-star');
  star.style.cssText = `
    top: ${Math.random() * 60}%;
    left: ${Math.random() * 100}%;
    animation: shoot ${1.5 + Math.random()}s linear forwards;
  `;
  document.body.appendChild(star);
  setTimeout(() => star.remove(), 2500);
}

const style = document.createElement('style');
style.textContent = `
  @keyframes shoot {
    0% { transform: translateX(0) translateY(0) rotate(-45deg); opacity: 1; }
    100% { transform: translateX(-300px) translateY(300px) rotate(-45deg); opacity: 0; }
  }
`;
document.head.appendChild(style);
setInterval(createStar, 2000);

// 6. PARTICLES
tsParticles.load("tsparticles", {
  particles: {
    number: { value: 60 },
    color: { value: ["#7c5cfc", "#00d4aa", "#ff6b9d"] },
    opacity: { value: 0.2 },
    size: { value: { min: 1, max: 2.5 } },
    move: { enable: true, speed: 0.5 },
    links: { enable: true, distance: 120, color: "#7c5cfc", opacity: 0.08 }
  },
  background: { color: "transparent" }
});

// 7. SCROLL ANIMATIONS
AOS.init({ duration: 800, once: true, offset: 80 });

// 8. TYPING EFFECT
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

// 9. COUNTER
const counters = document.querySelectorAll(".count");
const counterObs = new IntersectionObserver(entries => {
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
      counterObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
counters.forEach(c => counterObs.observe(c));

// 10. SKILL BARS
const skillFills = document.querySelectorAll('.skill-fill');
const skillObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const w = entry.target.getAttribute('data-width');
      entry.target.style.width = w + '%';
      skillObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
skillFills.forEach(s => skillObs.observe(s));

// 11. NAV SCROLL
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
});

// 12. SPLIT TEXT
document.querySelectorAll('.split-text').forEach(el => {
  const text = el.innerHTML;
  if (!el.querySelector('.char')) {
    el.innerHTML = el.textContent.split('').map(c =>
      c === ' ' ? ' ' : `<span class="char">${c}</span>`
    ).join('');
  }
});
