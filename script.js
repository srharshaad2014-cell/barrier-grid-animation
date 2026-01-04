const canvas = document.getElementById('barrierCanvas');
const ctx = canvas.getContext('2d');

const stripWidthInput = document.getElementById('stripWidth');
const generateBtn = document.getElementById('generateBtn');
const downloadBtn = document.getElementById('downloadBtn');

let barWidth = 10;
let offset = 0;
let lastTimestamp = 0;
let speed = 60;
let animationFrameId = null;

function resizeCanvasToDisplaySize() {
  const rect = canvas.getBoundingClientRect();
  const { width, height } = rect;

  const devicePixelRatio = window.devicePixelRatio || 1;
  const displayWidth = Math.round(width * devicePixelRatio);
  const displayHeight = Math.round(height * devicePixelRatio);

  if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
    canvas.width = displayWidth;
    canvas.height = displayHeight;
  }
}

function drawBarrier() {
  resizeCanvasToDisplaySize();

  const w = canvas.width;
  const h = canvas.height;

  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, w, h);

  ctx.fillStyle = '#000000';

  const step = barWidth * 2;
  let x = -offset;

  while (x < w) {
    ctx.fillRect(Math.round(x), 0, barWidth, h);
    x += step;
  }
}

function animate(timestamp) {
  if (!lastTimestamp) lastTimestamp = timestamp;
  const delta = (timestamp - lastTimestamp) / 1000;
  lastTimestamp = timestamp;

  offset += speed * delta;

  const cycle = barWidth * 2;
  offset = offset % cycle;

  drawBarrier();
  animationFrameId = window.requestAnimationFrame(animate);
}

function startAnimation() {
  if (animationFrameId !== null) {
    window.cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
  lastTimestamp = 0;
  offset = 0;
  animationFrameId = window.requestAnimationFrame(animate);
}

function onGenerate() {
  const value = parseInt(stripWidthInput.value, 10);
  if (Number.isNaN(value) || value <= 0) {
    alert('Please enter a positive strip width (in pixels).');
    return;
  }
  barWidth = value;
  startAnimation();
}

function downloadCurrentFrame() {
  drawBarrier();

  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `barrier-grid-${barWidth}px.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 'image/png');
}

generateBtn.addEventListener('click', onGenerate);
downloadBtn.addEventListener('click', downloadCurrentFrame);

window.addEventListener('resize', () => {
  drawBarrier();
});

startAnimation();
