const canvas = document.getElementById('barrierCanvas');
const ctx = canvas.getContext('2d');

const stripWidthInput = document.getElementById('stripWidth');
const generateBtn = document.getElementById('generateBtn');
const downloadBtn = document.getElementById('downloadBtn');

let barWidth = 10;
let animationTime = 0;
let animationFrameId = null;
let speed = 2; // Speed of animation

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
  
  // Create pulsing effect using sine wave
  const pulse = Math.sin(animationTime * speed * 0.05) * 0.4 + 0.6;
  const animatedBarWidth = barWidth * pulse;
  
  for (let x = 0; x < w; x += step) {
    ctx.fillRect(x, 0, animatedBarWidth, h);
  }
}

function animate(timestamp) {
  animationTime += 1;
  drawBarrier();
  animationFrameId = window.requestAnimationFrame(animate);
}

function startAnimation() {
  if (animationFrameId !== null) {
    window.cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
  animationTime = 0;
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
