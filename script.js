// 1. PARTICLES
tsParticles.load("tsparticles", {
  particles: {
    number: { value: 90 },
    color: { value: ["#7c5cfc", "#00d4aa", "#ffffff"] },
    opacity: { value: 0.3 },
    size: { value: { min: 1, max: 3 } },
    move: { enable: true, speed: 0.7 },
    links: {
      enable: true,
      distance: 130,
      color: "#7c5cfc",
      opacity: 0.12
    }
  },
  background: { color: "transparent" }
});

// 2. SCROLL ANIMATIONS
AOS.init({
  duration: 700,
  once: true,
  offset: 80
});

// 3. CARD 3D TILT
VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
  max: 12,
  speed: 400,
  glare: true,
  "max-glare": 0.1
});

// 4. TYPING EFFECT
const words = ["actually work.", "stand out.", "make money.", "get noticed.", "go viral."];
let wi = 0, ci = 0, deleting = false;
const el = document.getElementById("typed-text");

function type() {
  const word = words[wi];
  if (!deleting) {
    el.textContent = word.slice(0, ++ci);
    if (ci === word.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    el.textContent = word.slice(0, --ci);
    if (ci === 0) {
      deleting = false;
      wi = (wi + 1) % words.length;
    }
  }
  setTimeout(type, deleting ? 55 : 90);
}
type();

// 5. NUMBER COUNTER ANIMATION
const counters = document.querySelectorAll(".count");
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = +entry.target.getAttribute("data-target");
      let count = 0;
      const step = Math.ceil(target / 60);
      const timer = setInterval(() => {
        count += step;
        if (count >= target) {
          entry.target.textContent = target;
          clearInterval(timer);
        } else {
          entry.target.textContent = count;
        }
      }, 30);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach(c => observer.observe(c));