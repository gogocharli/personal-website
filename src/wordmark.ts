// Interactive wordmark: the letters of the wordmark image are sampled into dots
// that scatter away from the pointer and spring back home. Plain Canvas 2D.

interface WordmarkConfig {
  // distance between sampled dots, in CSS pixels
  spacing: number;
  // pointer influence radius, in CSS pixels
  radius: number;
  // pull back towards the home position, per frame
  stiffness: number;
  // velocity kept from one frame to the next
  damping: number;
}

const DEFAULTS: WordmarkConfig = {
  spacing: 5,
  radius: 90,
  stiffness: 0.06,
  damping: 0.82,
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

// Keep every setting inside a range that renders and settles correctly,
// so a bad value can't freeze the page or make the dots fly off.
function resolveConfig(config: Partial<WordmarkConfig> = {}): WordmarkConfig {
  const merged = { ...DEFAULTS, ...config };
  return {
    spacing: clamp(merged.spacing, 3, 16),
    radius: clamp(merged.radius, 20, 240),
    stiffness: clamp(merged.stiffness, 0.01, 0.3),
    damping: clamp(merged.damping, 0.5, 0.95),
  };
}

// The shader blended the image 50/50 with a near-white grey
const GREY = [217, 217, 217];
const SAMPLE_SIZE = 512;
const LETTER_THRESHOLD = 200;
const PUSH = 6;
const REST = 0.05;

const config = resolveConfig();
const canvas = document.querySelector<HTMLCanvasElement>('canvas#wordmark')!;
const container = document.querySelector<HTMLElement>('.shader-container')!;
const context = canvas.getContext('2d')!;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
// Below this breakpoint (see index.astro) the canvas sits behind the content
const wideScreen = window.matchMedia('(min-width: 768px)');

const ground = document.createElement('canvas');
const groundContext = ground.getContext('2d')!;

let pixels: ImageData | undefined;
let width = 0;
let height = 0;
let count = 0;
let homeX = new Float32Array(0);
let homeY = new Float32Array(0);
let posX = new Float32Array(0);
let posY = new Float32Array(0);
let velX = new Float32Array(0);
let velY = new Float32Array(0);
// --color-white
const dotColor = 'rgb(252, 250, 247)';
let dotRadius = 1;

const pointer = { x: 0, y: 0, active: false };
let frame = 0;
let inView = true;

const blend = (channel: number, index: number) =>
  Math.round((channel + GREY[index]) / 2);

function loadPixels(image: HTMLImageElement) {
  const sample = document.createElement('canvas');
  sample.width = SAMPLE_SIZE;
  sample.height = SAMPLE_SIZE;
  const sampleContext = sample.getContext('2d', { willReadFrequently: true })!;
  sampleContext.drawImage(image, 0, 0, SAMPLE_SIZE, SAMPLE_SIZE);
  return sampleContext.getImageData(0, 0, SAMPLE_SIZE, SAMPLE_SIZE);
}

function readPixel(data: ImageData, x: number, y: number) {
  const index = (Math.floor(y) * data.width + Math.floor(x)) * 4;
  return [data.data[index], data.data[index + 1], data.data[index + 2]];
}

// Draw the static layer once: the blended ground colour plus a light grain
function paintGround(data: ImageData, ratio: number) {
  ground.width = canvas.width;
  ground.height = canvas.height;

  const [r, g, b] = readPixel(data, 2, 2).map(blend);
  groundContext.fillStyle = `rgb(137, 20, 71)`;
  groundContext.fillRect(0, 0, ground.width, ground.height);

  const grain = Math.round((ground.width * ground.height) / 900);
  for (let i = 0; i < grain; i++) {
    groundContext.fillStyle = Math.random() > 0.5
      ? 'rgba(255, 255, 255, 0.07)'
      : 'rgba(13, 3, 7, 0.05)';
    groundContext.fillRect(
      Math.random() * ground.width,
      Math.random() * ground.height,
      ratio,
      ratio,
    );
  }
}

// Cover-fit the image to the container (like fitToAspect in the old shader)
// and turn every bright sample into a dot.
function sampleDots(data: ImageData) {
  const scale = Math.max(width / data.width, height / data.height);
  const offsetX = (width - data.width * scale) / 2;
  const offsetY = (height - data.height * scale) / 2;

  const xs: number[] = [];
  const ys: number[] = [];
  for (let y = config.spacing / 2; y < height; y += config.spacing) {
    for (let x = config.spacing / 2; x < width; x += config.spacing) {
      const imageX = (x - offsetX) / scale;
      const imageY = (y - offsetY) / scale;
      if (imageX < 0 || imageY < 0 || imageX >= data.width || imageY >= data.height) {
        continue;
      }
      const [r, g, b] = readPixel(data, imageX, imageY);
      if ((r + g + b) / 3 > LETTER_THRESHOLD) {
        xs.push(x);
        ys.push(y);
      }
    }
  }

  count = xs.length;
  homeX = Float32Array.from(xs);
  homeY = Float32Array.from(ys);
  posX = Float32Array.from(xs);
  posY = Float32Array.from(ys);
  velX = new Float32Array(count);
  velY = new Float32Array(count);
  dotRadius = config.spacing * 0.42;
}

function draw() {
  context.setTransform(1, 0, 0, 1, 0, 0);
  context.drawImage(ground, 0, 0);

  const ratio = canvas.width / width;
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  context.fillStyle = dotColor;
  context.beginPath();
  for (let i = 0; i < count; i++) {
    context.moveTo(posX[i] + dotRadius, posY[i]);
    context.arc(posX[i], posY[i], dotRadius, 0, Math.PI * 2);
  }
  context.fill();
}

// Advance every dot one frame; returns whether anything is still moving
function step() {
  const radiusSquared = config.radius * config.radius;
  let moving = false;

  for (let i = 0; i < count; i++) {
    let forceX = (homeX[i] - posX[i]) * config.stiffness;
    let forceY = (homeY[i] - posY[i]) * config.stiffness;

    if (pointer.active) {
      const dx = posX[i] - pointer.x;
      const dy = posY[i] - pointer.y;
      const distanceSquared = dx * dx + dy * dy;
      if (distanceSquared < radiusSquared && distanceSquared > 0.01) {
        const distance = Math.sqrt(distanceSquared);
        const strength = (1 - distance / config.radius) * PUSH;
        forceX += (dx / distance) * strength;
        forceY += (dy / distance) * strength;
      }
    }

    velX[i] = (velX[i] + forceX) * config.damping;
    velY[i] = (velY[i] + forceY) * config.damping;
    posX[i] += velX[i];
    posY[i] += velY[i];

    // While the pointer rests, dots settle away from home; otherwise they
    // aren't done until they're back home
    if (
      !moving &&
      (Math.abs(velX[i]) > REST ||
        Math.abs(velY[i]) > REST ||
        (!pointer.active &&
          (Math.abs(homeX[i] - posX[i]) > REST ||
            Math.abs(homeY[i] - posY[i]) > REST)))
    ) {
      moving = true;
    }
  }

  return moving;
}

function tick() {
  const moving = step();
  draw();
  // Sleep once everything has settled; the next pointer move wakes the loop
  frame = moving ? requestAnimationFrame(tick) : 0;
}

function wake() {
  if (
    frame ||
    !inView ||
    document.hidden ||
    reduceMotion.matches ||
    !wideScreen.matches
  ) {
    return;
  }
  frame = requestAnimationFrame(tick);
}

function sleep() {
  cancelAnimationFrame(frame);
  frame = 0;
}

function layout() {
  if (!pixels) return;
  const rect = container.getBoundingClientRect();
  width = rect.width;
  height = rect.height;
  if (!width || !height) return;

  const ratio = Math.min(window.devicePixelRatio, 2);
  canvas.width = Math.round(width * ratio);
  canvas.height = Math.round(height * ratio);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  paintGround(pixels, ratio);
  sampleDots(pixels);
  draw();
}

function onPointerMove(event: PointerEvent) {
  const rect = canvas.getBoundingClientRect();
  // Use the latest coalesced position so fast moves aren't skipped
  const latest = event.getCoalescedEvents?.().at(-1) ?? event;
  const x = latest.clientX - rect.left;
  const y = latest.clientY - rect.top;
  const wasActive = pointer.active;
  pointer.active = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
  pointer.x = x;
  pointer.y = y;
  // Wake on any move over the canvas, and when leaving so dots spring home
  if (pointer.active || wasActive) wake();
}

function onPointerEnd() {
  pointer.active = false;
  wake();
}

const image = new Image();
image.src = '/gogocharli-wordmark.jpg';
image.decode().then(() => {
  pixels = loadPixels(image);
  layout();

  let pending = 0;
  new ResizeObserver(() => {
    cancelAnimationFrame(pending);
    pending = requestAnimationFrame(layout);
  }).observe(container);

  new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    if (!inView) sleep();
  }).observe(container);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) sleep();
  });

  window.addEventListener('pointermove', onPointerMove, { passive: true });
  window.addEventListener('pointerup', (event) => {
    if (event.pointerType !== 'mouse') onPointerEnd();
  });
  window.addEventListener('pointercancel', onPointerEnd);
  document.documentElement.addEventListener('pointerleave', onPointerEnd);
});
