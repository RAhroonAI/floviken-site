// Generate per-experiment Open Graph PNGs into public/og/<slug>.png.
// Usage: node scripts/generate-og.mjs
// Re-run whenever tile palette / glyph / copy changes.

import sharp from "sharp";
import path from "node:path";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";

import { tiles } from "../src/app/_components/tile-data.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, "..", "public", "og");

const WIDTH = 1200;
const HEIGHT = 627;

function escapeXml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildOgSvg(t) {
  // Glyph occupies a 440x440 region on the right side.
  // The glyph data uses viewBox 0 0 400 400, so we scale it 1.1× to fill 440px.
  const glyphX = 700;
  const glyphY = 94;
  const glyphSize = 440;

  // Left text block: name + oneLiner. Padding 72px from the left.
  const padX = 72;
  const padTop = 110;

  const nameSize = 76;
  const oneSize = 30;
  const tagSize = 18;

  const name = escapeXml(t.name);
  const oneLiner = escapeXml(t.oneLiner);
  const tagText = escapeXml(t.tag);
  const wordmark = "FLOVIKEN";

  // Heuristic wrap for one-liner so it fits ~580px wide column.
  const wrappedLines = wrapText(t.oneLiner, 36);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <rect width="${WIDTH}" height="${HEIGHT}" fill="${t.bg}"/>

  <!-- Glyph layer (scaled from 0 0 400 400 to ${glyphSize}px square) -->
  <g transform="translate(${glyphX}, ${glyphY}) scale(${glyphSize / 400})">
    ${t.glyph}
  </g>

  <!-- Tag chip top-left -->
  <text x="${padX}" y="${padTop - 50}" font-family="'Helvetica Neue', Inter, Arial, sans-serif" font-size="${tagSize}" letter-spacing="3.5" fill="${t.tagColor || t.color}" opacity="0.72">${tagText}</text>

  <!-- Wordmark FLOVIKEN small caps -->
  <text x="${padX}" y="${HEIGHT - 56}" font-family="'Helvetica Neue', Inter, Arial, sans-serif" font-size="16" letter-spacing="4" fill="${t.color}" opacity="0.55">${wordmark}</text>

  <!-- Big experiment name -->
  <text x="${padX}" y="${padTop + nameSize}" font-family="Georgia, 'Times New Roman', serif" font-size="${nameSize}" fill="${t.color}">${name}</text>

  <!-- One-liner, italic, possibly wrapped -->
  ${wrappedLines
    .map(
      (line, i) =>
        `<text x="${padX}" y="${padTop + nameSize + 56 + i * (oneSize + 10)}" font-family="Georgia, 'Times New Roman', serif" font-style="italic" font-size="${oneSize}" fill="${t.color}" opacity="0.88">${escapeXml(line)}</text>`
    )
    .join("\n  ")}

  <!-- floviken.se bottom-right -->
  <text x="${WIDTH - 72}" y="${HEIGHT - 56}" text-anchor="end" font-family="'Helvetica Neue', Inter, Arial, sans-serif" font-size="18" fill="${t.color}" opacity="0.55">floviken.se</text>
</svg>`;
}

function wrapText(text, maxChars) {
  const words = text.split(/\s+/);
  const lines = [];
  let current = "";
  for (const word of words) {
    if ((current + " " + word).trim().length > maxChars && current) {
      lines.push(current.trim());
      current = word;
    } else {
      current = (current + " " + word).trim();
    }
  }
  if (current) lines.push(current);
  return lines;
}

async function main() {
  await fs.mkdir(outDir, { recursive: true });
  const slugs = Object.keys(tiles);
  for (const slug of slugs) {
    const t = tiles[slug];
    const svg = buildOgSvg(t);
    const outPath = path.join(outDir, `${slug}.png`);
    await sharp(Buffer.from(svg), { density: 144 })
      .resize(WIDTH, HEIGHT, { fit: "contain" })
      .png({ compressionLevel: 9 })
      .toFile(outPath);
    console.log(`✓ ${slug}.png`);
  }
  console.log(`\nGenerated ${slugs.length} OG images into ${outDir}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
