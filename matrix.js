const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const messages = [
  "0101010001101000011001010010000001000111011100100110010101100001011101000110010101110011001000000100100001100001011000110110101101100101011100100010000001101111011001100010000001000001011011000110110000101010011010010110110101100101",
  "010011000110010101100111011001010110111001100100011000010111001001111001",
  "010101000110100001100101001000000101001101100001011101100110100101101111011101010111001000100000011011110110011000100000010101000110100001100101001000000100111001100101011001010110010001100101011001000",
  "01000001011011000110110000100000010101000110100101101101011001010010000001000010011001010111001101110100"
];

const fontSize = 16;
let columns = Math.floor(canvas.width / fontSize);
let drops = Array(columns).fill(1);

let currentMessage = messages[Math.floor(Math.random() * messages.length)];
let msgIndex = 0;

function getCssVar(name) {
  return getComputedStyle(document.body).getPropertyValue(name).trim();
}

function draw() {
  // Use dynamic theme fade background
  ctx.fillStyle = getCssVar("--matrix-bg");
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Use dynamic text color
  ctx.fillStyle = getCssVar("--matrix-color");
  ctx.font = fontSize + "px monospace";

  drops.forEach((y, i) => {
    const text = currentMessage[msgIndex];
    ctx.fillText(text, i * fontSize, y * fontSize);

    msgIndex++;
    if (msgIndex >= currentMessage.length) {
      currentMessage = messages[Math.floor(Math.random() * messages.length)];
      msgIndex = 0;
    }

    if (y * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  });
}

setInterval(draw, 33);

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  columns = Math.floor(canvas.width / fontSize);
  drops = Array(columns).fill(1);
});

/* Overlay for spotlight effect */
const overlay = document.getElementById('matrix-overlay');
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateOverlay() {
  if (document.body.classList.contains('dark')) {
    // Dark mode → reveal circle
    overlay.style.maskImage = `radial-gradient(circle 200px at ${mouseX}px ${mouseY}px, transparent 60%, black 100%)`;
    overlay.style.webkitMaskImage = `radial-gradient(circle 200px at ${mouseX}px ${mouseY}px, transparent 60%, black 100%)`;
  } else {
    // Light mode → hide circle
    overlay.style.maskImage = `radial-gradient(circle 200px at ${mouseX}px ${mouseY}px, black 60%, transparent 100%)`;
    overlay.style.webkitMaskImage = `radial-gradient(circle 200px at ${mouseX}px ${mouseY}px, black 60%, transparent 100%)`;
  }

  requestAnimationFrame(animateOverlay);
}

animateOverlay();

