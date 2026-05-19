// Generate the homepage Open Graph PNG into public/og-image.png.
// Usage: node scripts/generate-home-og.mjs

import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.resolve(__dirname, "..", "public", "og-image.png");

const W = 1200;
const H = 630;

const serif = "Georgia, 'Times New Roman', serif";
const mono = "ui-monospace, 'SF Mono', Menlo, Consolas, monospace";

const padX = 88;
const wordmarkSize = 156;
const wordmarkBaseline = 430;
const subtitleSize = 32;
const subtitleBaseline = wordmarkBaseline + 68;
const footerSize = 12;
const footerBaseline = H - 72;

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bottomFade" x1="0" y1="${Math.round(H * 0.68)}" x2="0" y2="${H}" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#C4D2DF" stop-opacity="0"/>
      <stop offset="1" stop-color="#C4D2DF" stop-opacity="1"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="#D8E2EC"/>

  <circle cx="1280" cy="-200" r="435" fill="#F4E8C8"/>

  <rect x="0" y="${Math.round(H * 0.68)}" width="${W}" height="${Math.round(H * 0.32)}" fill="url(#bottomFade)"/>

  <text x="${padX}" y="${wordmarkBaseline}" font-family="${serif}" font-size="${wordmarkSize}" font-weight="400" letter-spacing="-3.9" fill="#1F3142">Floviken</text>

  <text x="${padX}" y="${subtitleBaseline}" font-family="${serif}" font-style="italic" font-size="${subtitleSize}" fill="#3D5570">Experiments in AI and medicine.</text>

  <text x="${padX}" y="${footerBaseline}" font-family="${mono}" font-size="${footerSize}" letter-spacing="3.36" fill="#5A7088">FLOVIKEN.SE</text>
  <text x="${W - padX}" y="${footerBaseline}" text-anchor="end" font-family="${mono}" font-size="${footerSize}" letter-spacing="3.36" fill="#5A7088">RICHARD AHROON · MD</text>
</svg>`;

await sharp(Buffer.from(svg), { density: 144 })
  .resize(W, H, { fit: "contain" })
  .png({ compressionLevel: 9 })
  .toFile(outPath);

console.log(`✓ generated ${outPath}`);
