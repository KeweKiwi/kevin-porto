import { spawnSync } from "node:child_process";
import { writeFileSync, unlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const WIDTH = 720;
const HEIGHT = 1020;
const SEED = 0x4b5746;

function mulberry32(seed) {
  return function random() {
    let value = (seed += 0x6d2b79f5);
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

const random = mulberry32(SEED);
const pixels = Buffer.alloc(WIDTH * HEIGHT * 4);

for (let index = 0; index < WIDTH * HEIGHT; index += 1) {
  const offset = index * 4;
  pixels[offset] = 255;
  pixels[offset + 1] = 255;
  pixels[offset + 2] = 255;
}

function randomBetween(minimum, maximum) {
  return minimum + random() * (maximum - minimum);
}

function gaussian() {
  const first = Math.max(random(), Number.EPSILON);
  const second = random();
  return Math.sqrt(-2 * Math.log(first)) * Math.cos(2 * Math.PI * second);
}

const densityGridWidth = 18;
const densityGridHeight = 22;
const densityGrid = Array.from(
  { length: densityGridWidth * densityGridHeight },
  () => randomBetween(0.08, 1),
);

function densityAt(x, y) {
  const gridX = (x / (WIDTH - 1)) * (densityGridWidth - 1);
  const gridY = (y / (HEIGHT - 1)) * (densityGridHeight - 1);
  const left = Math.floor(gridX);
  const top = Math.floor(gridY);
  const right = Math.min(left + 1, densityGridWidth - 1);
  const bottom = Math.min(top + 1, densityGridHeight - 1);
  const mixX = gridX - left;
  const mixY = gridY - top;
  const topValue =
    densityGrid[top * densityGridWidth + left] * (1 - mixX) +
    densityGrid[top * densityGridWidth + right] * mixX;
  const bottomValue =
    densityGrid[bottom * densityGridWidth + left] * (1 - mixX) +
    densityGrid[bottom * densityGridWidth + right] * mixX;
  return topValue * (1 - mixY) + bottomValue * mixY;
}

const dropoutFields = Array.from({ length: 38 }, () => ({
  x: randomBetween(0, WIDTH),
  y: randomBetween(0, HEIGHT),
  radiusX: randomBetween(24, 92),
  radiusY: randomBetween(18, 76),
  strength: randomBetween(0.12, 0.58),
}));

function dropoutAt(x, y) {
  let factor = 1;

  for (const field of dropoutFields) {
    const normalizedX = (x - field.x) / field.radiusX;
    const normalizedY = (y - field.y) / field.radiusY;
    const distance = normalizedX * normalizedX + normalizedY * normalizedY;

    if (distance < 1) {
      factor *= field.strength + (1 - field.strength) * distance;
    }
  }

  return factor;
}

function plotParticle(x, y, alpha, size = 1) {
  const startX = Math.round(x);
  const startY = Math.round(y);

  for (let offsetY = 0; offsetY < size; offsetY += 1) {
    for (let offsetX = 0; offsetX < size; offsetX += 1) {
      const pixelX = startX + offsetX;
      const pixelY = startY + offsetY;

      if (pixelX < 0 || pixelX >= WIDTH || pixelY < 0 || pixelY >= HEIGHT) {
        continue;
      }

      const index = (pixelY * WIDTH + pixelX) * 4 + 3;
      const edgeFactor = size === 1 || (offsetX === 0 && offsetY === 0) ? 1 : 0.78;
      const nextAlpha = Math.round(alpha * edgeFactor);
      const currentAlpha = pixels[index];
      pixels[index] = Math.min(
        255,
        Math.round(255 - ((255 - currentAlpha) * (255 - nextAlpha)) / 255),
      );
    }
  }
}

function placeDistributedParticle(alphaMinimum, alphaMaximum, sizeChance) {
  const x = randomBetween(0, WIDTH);
  const y = randomBetween(0, HEIGHT);
  const density = densityAt(x, y);
  const dropout = dropoutAt(x, y);

  if (random() > (0.28 + density * 0.72) * dropout) {
    return;
  }

  const alpha = randomBetween(alphaMinimum, alphaMaximum) * (0.62 + density * 0.5);
  plotParticle(x, y, Math.min(alpha, 255), random() < sizeChance ? 2 : 1);
}

for (let index = 0; index < 130000; index += 1) {
  placeDistributedParticle(176, 255, 0.08);
}

for (let index = 0; index < 36000; index += 1) {
  placeDistributedParticle(68, 164, 0.025);
}

for (let clusterIndex = 0; clusterIndex < 600; clusterIndex += 1) {
  const centerX = randomBetween(0, WIDTH);
  const centerY = randomBetween(0, HEIGHT);
  const spreadX = randomBetween(5, 34);
  const spreadY = randomBetween(4, 27);
  const count = Math.round(randomBetween(18, 62));

  for (let particleIndex = 0; particleIndex < count; particleIndex += 1) {
    const x = centerX + gaussian() * spreadX;
    const y = centerY + gaussian() * spreadY;
    const alpha = randomBetween(188, 255) * dropoutAt(x, y);
    plotParticle(x, y, alpha, random() < 0.16 ? 2 : 1);
  }
}

for (let index = 0; index < 6200; index += 1) {
  const x = randomBetween(0, WIDTH);
  const y = randomBetween(0, HEIGHT);
  plotParticle(x, y, randomBetween(220, 255), random() < 0.22 ? 2 : 1);
}

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const outputPath = resolve(scriptDirectory, "../public/assets/profile/holo-particles.webp");
const temporaryPath = join(tmpdir(), `kwf-holo-particles-${SEED}.pam`);
const header = Buffer.from(
  `P7\nWIDTH ${WIDTH}\nHEIGHT ${HEIGHT}\nDEPTH 4\nMAXVAL 255\nTUPLTYPE RGB_ALPHA\nENDHDR\n`,
  "ascii",
);

writeFileSync(temporaryPath, Buffer.concat([header, pixels]));

const conversion = spawnSync(
  "magick",
  [temporaryPath, "-define", "webp:lossless=true", "-quality", "100", outputPath],
  { encoding: "utf8" },
);

unlinkSync(temporaryPath);

if (conversion.status !== 0) {
  throw new Error(conversion.stderr || "ImageMagick failed to generate the particle texture.");
}

console.log(`Generated ${outputPath} (${WIDTH}x${HEIGHT}, seed ${SEED}).`);
