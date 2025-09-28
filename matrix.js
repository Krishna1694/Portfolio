const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

let fontSize = 16;
let columns;
let drops;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  columns = Math.floor(canvas.width / fontSize);
  drops = Array(columns).fill(0);
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function getMatrixColor() {
  return getComputedStyle(document.body).getPropertyValue("--matrix-color").trim();
}

function draw() {
  ctx.fillStyle = "rgba(0,0,0,0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = getMatrixColor();
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = Math.random() > 0.5 ? "1" : "0";
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }

  requestAnimationFrame(draw);
}
draw();
