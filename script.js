// Dark mode toggle
const toggle = document.getElementById("theme-toggle");
const body = document.body;
const hero = document.getElementById("hero");

const lightGradient = [
  [0, 63, 136], // #003f88
  [0, 87, 184], // #0057b8
  [0, 119, 255], // #0077ff
];
const darkGradient = [
  [10, 25, 47], // #0a192f
  [17, 34, 64], // #112240
  [30, 58, 138], // #1e3a8a
];

toggle.addEventListener("click", () => {
  const dark = body.classList.toggle("dark");
  toggle.textContent = dark ? "☀️" : "🌙";
  animateGradient(hero, dark ? darkGradient : lightGradient);
});

/* -------- Gradient morph animation -------- */
function animateGradient(element, targetColors, duration = 800) {
  const startColors = getCurrentGradientColors(element);
  const steps = 30;
  let frame = 0;

  const interval = setInterval(() => {
    frame++;
    const progress = frame / steps;
    const blended = startColors.map((start, i) =>
      interpolateColor(start, targetColors[i], progress)
    );
    element.style.background = `linear-gradient(135deg,
      rgb(${blended[0].join(",")}),
      rgb(${blended[1].join(",")}),
      rgb(${blended[2].join(",")})
    )`;
    if (frame >= steps) clearInterval(interval);
  }, duration / steps);
}

/* -------- Helpers -------- */
function interpolateColor(start, end, t) {
  return start.map((s, i) => Math.round(s + (end[i] - s) * t));
}

function getCurrentGradientColors(element) {
  const style = getComputedStyle(element).backgroundImage;
  const matches = [...style.matchAll(/rgb[a]?\(([^)]+)\)/g)];
  return matches.map((m) => m[1].split(",").map((n) => parseInt(n.trim())));
}

const typingElement = document.getElementById("typing-text");
const cursor = document.querySelector(".typing-cursor");

const phrases = [
  "Hi, I'm Pham Gia Huy",
  "You might know me as Wolflieu"
];

let currentPhrase = 0;
let currentChar = 0;
let isDeleting = false;

const typingSpeed = 100;
const deletingSpeed = 60;
const pauseBetween = 1500;

function colorizeProgressively(text) {
  // Highlight your name and alias progressively as they appear
  if (text.includes("Pham Gia Huy")) {
    const parts = text.split("Pham Gia Huy");
    const typedPart = parts[0] + `<span style="color:#fff89a;">Pham Gia Huy</span>`;
    return typedPart;
  } else if (text.includes("Wolflieu")) {
    const parts = text.split("Wolflieu");
    const typedPart = parts[0] + `<span style="color:#fff89a;">Wolflieu</span>`;
    return typedPart;
  }
  return text;
}

function typeEffect() {
  const phrase = phrases[currentPhrase];
  if (isDeleting) {
    currentChar--;
  } else {
    currentChar++;
  }

  let partial = phrase.substring(0, currentChar);
  typingElement.innerHTML = colorizeProgressively(partial);

  if (!isDeleting && currentChar === phrase.length) {
    setTimeout(() => (isDeleting = true), pauseBetween);
  } else if (isDeleting && currentChar === 0) {
    isDeleting = false;
    currentPhrase = (currentPhrase + 1) % phrases.length;
  }

  const speed = isDeleting ? deletingSpeed : typingSpeed;
  setTimeout(typeEffect, speed);
}

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(typeEffect, 800);
});