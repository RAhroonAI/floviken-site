// Shared per-experiment palette, copy, and SVG glyph strings.
// Used by detail-page action tiles AND the OG image generator (scripts/generate-og.mjs).
// Glyphs are stored as raw inner-SVG markup (no <svg> wrapper, no JSX).

export const tiles = {
  about: {
    name: "About",
    oneLiner: "The lab and the clinician behind it.",
    tag: "00 · ABOUT",
    verb: "Send a note.",
    sub: "richard@floviken.se",
    href: "mailto:richard@floviken.se",
    external: false,
    bg: "#F1ECDE",
    color: "#2C2C2A",
    tagColor: "#5A5142",
    subColor: "#5A5142",
    glyph: `
      <rect x="100" y="130" width="200" height="160" fill="none" stroke="#5A5142" stroke-width="2"/>
      <line x1="100" y1="130" x2="200" y2="210" stroke="#5A5142" stroke-width="2"/>
      <line x1="300" y1="130" x2="200" y2="210" stroke="#5A5142" stroke-width="2"/>
      <line x1="125" y1="232" x2="275" y2="232" stroke="#5A5142" stroke-width="1.2" opacity="0.4"/>
      <line x1="125" y1="252" x2="275" y2="252" stroke="#5A5142" stroke-width="1.2" opacity="0.32"/>
      <line x1="125" y1="272" x2="255" y2="272" stroke="#5A5142" stroke-width="1.2" opacity="0.25"/>
    `,
  },

  "ghost-signout": {
    name: "Ghost Signout",
    oneLiner: "The morning handoff, and what it doesn’t see.",
    tag: "01 · LIVE",
    verb: "See what was missed.",
    sub: "ghost-signout.vercel.app",
    href: "https://ghost-signout.vercel.app/capture",
    external: true,
    bg: "#1a2533",
    color: "#d8e3ef",
    tagColor: "#d8e3ef",
    subColor: "#9ab1c4",
    glyph: `
      <rect x="0" y="320" width="400" height="80" fill="#0f1822"/>
      <rect x="150" y="80" width="100" height="240" fill="#c8d6e6" opacity="0.18"/>
      <line x1="170" y1="160" x2="230" y2="160" stroke="#c8d6e6" stroke-width="1.5" opacity="0.35"/>
      <line x1="170" y1="195" x2="230" y2="195" stroke="#c8d6e6" stroke-width="1.5" opacity="0.3"/>
      <line x1="170" y1="230" x2="220" y2="230" stroke="#c8d6e6" stroke-width="1.5" opacity="0.25"/>
      <circle cx="200" cy="200" r="5" fill="#c8d6e6" opacity="0.65"/>
    `,
  },

  foldspace: {
    name: "Foldspace",
    oneLiner: "A drug-target briefing in 60 seconds.",
    tag: "02 · LIVE",
    verb: "Open the briefing.",
    sub: "foldspace.floviken.se",
    href: "https://foldspace.floviken.se",
    external: true,
    bg: "#15212e",
    color: "#b8e6d3",
    tagColor: "#b8e6d3",
    subColor: "#7eb39d",
    glyph: `
      <line x1="115" y1="135" x2="205" y2="200" stroke="#5dcaa5" stroke-width="1.4" opacity="0.5"/>
      <line x1="205" y1="200" x2="285" y2="135" stroke="#5dcaa5" stroke-width="1.4" opacity="0.5"/>
      <line x1="205" y1="200" x2="305" y2="265" stroke="#5dcaa5" stroke-width="1.4" opacity="0.45"/>
      <line x1="205" y1="200" x2="125" y2="260" stroke="#5dcaa5" stroke-width="1.4" opacity="0.45"/>
      <line x1="285" y1="135" x2="305" y2="265" stroke="#5dcaa5" stroke-width="1.2" opacity="0.35"/>
      <line x1="115" y1="135" x2="125" y2="260" stroke="#5dcaa5" stroke-width="1.2" opacity="0.3"/>
      <circle cx="115" cy="135" r="22" fill="#5dcaa5" opacity="0.5"/>
      <circle cx="205" cy="200" r="18" fill="#9fe1cb" opacity="0.6"/>
      <circle cx="285" cy="135" r="20" fill="#5dcaa5" opacity="0.45"/>
      <circle cx="305" cy="265" r="16" fill="#9fe1cb" opacity="0.55"/>
      <circle cx="125" cy="260" r="14" fill="#5dcaa5" opacity="0.5"/>
    `,
  },

  lowfire: {
    name: "Lowfire",
    oneLiner: "The 60-minute window.",
    tag: "03 · LIVE",
    verb: "Start the clock.",
    sub: "lowfire.floviken.se",
    href: "https://lowfire.floviken.se",
    external: true,
    bg: "#2a1812",
    color: "#f5c4b3",
    tagColor: "#f5c4b3",
    subColor: "#c6907e",
    glyph: `
      <circle cx="200" cy="200" r="140" fill="none" stroke="#d85a30" stroke-width="1.6" opacity="0.35"/>
      <line x1="200" y1="60" x2="200" y2="80" stroke="#f5c4b3" stroke-width="2"/>
      <line x1="340" y1="200" x2="320" y2="200" stroke="#f5c4b3" stroke-width="2"/>
      <line x1="200" y1="340" x2="200" y2="320" stroke="#f5c4b3" stroke-width="2"/>
      <line x1="60" y1="200" x2="80" y2="200" stroke="#f5c4b3" stroke-width="2"/>
      <line x1="200" y1="200" x2="200" y2="95" stroke="#f5c4b3" stroke-width="2.5"/>
      <line x1="200" y1="200" x2="305" y2="140" stroke="#d85a30" stroke-width="3.5" opacity="0.9"/>
      <circle cx="200" cy="200" r="5" fill="#f5c4b3"/>
    `,
  },

  doorstep: {
    name: "Doorstep",
    oneLiner: "A safer way to work through the AMA discharge.",
    tag: "04 · LIVE",
    verb: "Step through.",
    sub: "doorstep.floviken.se",
    href: "https://doorstep.floviken.se",
    external: true,
    bg: "#2B2520",
    color: "#F2EEDF",
    tagColor: "#F2D88A",
    subColor: "#C9B97A",
    glyph: `
      <ellipse cx="200" cy="200" rx="170" ry="190" fill="#F2D88A" opacity="0.07"/>
      <rect x="170" y="100" width="60" height="210" fill="#F2D88A" opacity="0.92"/>
      <rect x="166" y="96" width="68" height="218" fill="none" stroke="#0E0C0A" stroke-width="2.5"/>
      <polygon points="170,310 230,310 290,400 110,400" fill="#F2D88A" opacity="0.22"/>
    `,
  },

  sundown: {
    name: "Sundown",
    oneLiner: "Cross-cover at midnight.",
    tag: "05 · IN PROGRESS",
    verb: "After dusk.",
    sub: "This room is being built.",
    href: null,
    external: false,
    bg: "#2a1f3a",
    color: "#d4c8e8",
    tagColor: "#d4c8e8",
    subColor: "#9c8eb5",
    glyph: `
      <rect x="0" y="260" width="400" height="140" fill="#1a1326"/>
      <line x1="0" y1="260" x2="400" y2="260" stroke="#EF9F27" stroke-width="1" opacity="0.5"/>
      <circle cx="200" cy="260" r="72" fill="none" stroke="#EF9F27" stroke-width="2.5" opacity="0.45"/>
      <circle cx="200" cy="260" r="48" fill="none" stroke="#EF9F27" stroke-width="2" opacity="0.3"/>
    `,
  },

  margin: {
    name: "Margin",
    oneLiner: "What the radiologist flagged. What discharge missed.",
    tag: "06 · IN PROGRESS",
    verb: "In the margin.",
    sub: "This room is being built.",
    href: null,
    external: false,
    bg: "#f1ede3",
    color: "#2c2c2a",
    tagColor: "#5f5e5a",
    subColor: "#5f5e5a",
    glyph: `
      <line x1="80" y1="130" x2="290" y2="130" stroke="#5f5e5a" stroke-width="1.2" opacity="0.5"/>
      <line x1="80" y1="170" x2="290" y2="170" stroke="#5f5e5a" stroke-width="1.2" opacity="0.5"/>
      <line x1="80" y1="210" x2="290" y2="210" stroke="#5f5e5a" stroke-width="1.2" opacity="0.5"/>
      <line x1="80" y1="250" x2="290" y2="250" stroke="#5f5e5a" stroke-width="1.2" opacity="0.5"/>
      <line x1="80" y1="290" x2="260" y2="290" stroke="#5f5e5a" stroke-width="1.2" opacity="0.5"/>
      <circle cx="335" cy="220" r="12" fill="none" stroke="#A32D2D" stroke-width="2.5" opacity="0.55"/>
      <line x1="335" y1="220" x2="358" y2="195" stroke="#A32D2D" stroke-width="2.5" stroke-linecap="round" opacity="0.55"/>
    `,
  },

  daybreak: {
    name: "Daybreak",
    oneLiner: "The hour before rounds.",
    tag: "07 · IN PROGRESS",
    verb: "Before sunrise.",
    sub: "This room is being built.",
    href: null,
    external: false,
    bg: "#d8e3ef",
    color: "#2c3e50",
    tagColor: "#5f6e7d",
    subColor: "#5f6e7d",
    glyph: `
      <rect x="0" y="260" width="400" height="140" fill="#b8c9d9"/>
      <line x1="0" y1="260" x2="400" y2="260" stroke="#7a8fa3" stroke-width="1"/>
      <circle cx="200" cy="260" r="64" fill="none" stroke="#FAEEDA" stroke-width="2.5"/>
      <circle cx="200" cy="260" r="42" fill="none" stroke="#FAEEDA" stroke-width="2"/>
    `,
  },

  signal: {
    name: "Send a signal",
    oneLiner: "Working on something nearby? Let’s talk.",
    tag: "· SIGNAL",
    verb: "Send the signal.",
    sub: "richard@floviken.se",
    href: "mailto:richard@floviken.se",
    external: false,
    bg: "#14323A",
    color: "#D6E3E6",
    tagColor: "#F2D88A",
    subColor: "#9CB6BC",
    glyph: `
      <rect x="0" y="310" width="400" height="90" fill="#0B2228"/>
      <line x1="0" y1="310" x2="400" y2="310" stroke="#1E4750" stroke-width="0.8"/>
      <polygon points="60,310 100,310 110,360 50,360" fill="#0B2228" stroke="#5D8189" stroke-width="1.1"/>
      <rect x="68" y="190" width="24" height="120" fill="#0B2228" stroke="#5D8189" stroke-width="1.1"/>
      <rect x="62" y="170" width="36" height="20" fill="#0B2228" stroke="#5D8189" stroke-width="1"/>
      <polygon points="62,170 98,170 80,148" fill="#0B2228" stroke="#5D8189" stroke-width="1"/>
      <circle cx="80" cy="180" r="4" fill="#F2D88A" opacity="0.98"/>
      <circle cx="80" cy="180" r="10" fill="#F2D88A" opacity="0.35"/>
      <circle cx="80" cy="180" r="20" fill="#F2D88A" opacity="0.12"/>
      <polygon points="86,176 400,80 400,200 86,184" fill="#F2D88A" opacity="0.18"/>
      <polygon points="86,180 400,200 400,150 86,182" fill="#F2D88A" opacity="0.1"/>
      <line x1="0" y1="328" x2="400" y2="328" stroke="#1E4750" stroke-width="0.6" opacity="0.6"/>
      <line x1="0" y1="350" x2="400" y2="350" stroke="#1E4750" stroke-width="0.6" opacity="0.45"/>
      <line x1="0" y1="372" x2="400" y2="372" stroke="#1E4750" stroke-width="0.6" opacity="0.3"/>
    `,
  },
};

export function tileMetadata(slug) {
  const t = tiles[slug];
  if (!t) return null;
  const url = `https://floviken.se/${slug}`;
  const ogImage = `https://floviken.se/og/${slug}.png`;
  const title = `${t.name} — Floviken`;
  return {
    title,
    description: t.oneLiner,
    openGraph: {
      title,
      description: t.oneLiner,
      url,
      siteName: "Floviken",
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 627, alt: t.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: t.oneLiner,
      images: [ogImage],
    },
  };
}
