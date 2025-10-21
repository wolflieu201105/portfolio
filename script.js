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
