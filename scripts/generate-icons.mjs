// Rasterize public/icon-source.svg into the PNG sizes required for PWA + favicons.
// Usage: node scripts/generate-icons.mjs
//
// Outputs:
//   public/icon-192.png       (Android home screen)
//   public/icon-512.png       (Android splash, large surfaces)
//   public/icon-180.png       (apple-touch-icon)
//   public/icon-maskable.png  (Android adaptive icon, with 20% safe-zone padding)
//   public/favicon-32.png     (tab favicon)
//   public/favicon-16.png     (small tab favicon)

import sharp from "sharp";
import path from "node:path";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, "..", "public");
const sourceSvgPath = path.join(publicDir, "icon-source.svg");

// Simplified glyph for favicon sizes — outer rectangle + two main interior lines only.
// 200x200 viewBox to match the source so coordinates line up.
const simplifiedSvg = `<svg width="64" height="64" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" fill="#F1ECDE"/>
  <rect x="36" y="56" width="128" height="92" fill="none" stroke="#5A5142" stroke-width="5"/>
  <line x1="36" y1="88" x2="164" y2="88" stroke="#5A5142" stroke-width="4"/>
  <line x1="92" y1="88" x2="92" y2="148" stroke="#5A5142" stroke-width="4"/>
</svg>`;

// Maskable wrapper: place the glyph at 80% scale, centered, on a full #F1ECDE field.
// Android crops maskable icons to various shapes (circle, squircle, rounded square), so
// the visual must sit inside an inner 80% safe zone.
const maskableSvg = `<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" fill="#F1ECDE"/>
  <g transform="translate(51.2 51.2) scale(2.048)">
    <rect width="200" height="200" fill="#F1ECDE"/>
    <rect x="36" y="56" width="128" height="92" fill="none" stroke="#5A5142" stroke-width="2.2"/>
    <line x1="36" y1="88" x2="164" y2="88" stroke="#5A5142" stroke-width="1.6"/>
    <line x1="92" y1="88" x2="92" y2="148" stroke="#5A5142" stroke-width="1.6"/>
    <line x1="128" y1="88" x2="128" y2="148" stroke="#5A5142" stroke-width="1.6"/>
    <line x1="36" y1="122" x2="92" y2="122" stroke="#5A5142" stroke-width="1.6"/>
    <line x1="62" y1="148" x2="70" y2="148" stroke="#F1ECDE" stroke-width="4"/>
    <line x1="62" y1="148" x2="70" y2="140" stroke="#5A5142" stroke-width="1.4"/>
    <circle cx="64" cy="72" r="2" fill="#5A5142"/>
  </g>
</svg>`;

async function main() {
  const sourceSvg = await fs.readFile(sourceSvgPath);

  // Full-bleed icons at native sizes.
  const targets = [
    { name: "icon-192.png", size: 192, svg: sourceSvg },
    { name: "icon-512.png", size: 512, svg: sourceSvg },
    { name: "icon-180.png", size: 180, svg: sourceSvg },
    { name: "icon-maskable.png", size: 512, svg: Buffer.from(maskableSvg) },
    { name: "favicon-32.png", size: 32, svg: Buffer.from(simplifiedSvg) },
    { name: "favicon-16.png", size: 16, svg: Buffer.from(simplifiedSvg) },
  ];

  for (const t of targets) {
    const outPath = path.join(publicDir, t.name);
    await sharp(t.svg, { density: 384 })
      .resize(t.size, t.size, { fit: "contain" })
      .png({ compressionLevel: 9 })
      .toFile(outPath);
    console.log(`✓ ${t.name} (${t.size}×${t.size})`);
  }

  console.log(`\nWrote ${targets.length} icons into ${publicDir}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
