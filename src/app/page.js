export const metadata = {
  alternates: { canonical: "https://floviken.se/" },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Richard Ahroon",
  jobTitle: "Hospitalist and biomedical engineer",
  url: "https://floviken.se",
  description: "A physician building small AI tools for clinical problems.",
  sameAs: ["https://www.linkedin.com/in/richard-ahroon-md/"],
};

const tileBase = {
  aspectRatio: '1 / 1',
  borderRadius: '12px',
  overflow: 'hidden',
  position: 'relative',
  cursor: 'pointer',
  fontFamily: 'Georgia, serif',
  textDecoration: 'none',
  display: 'block',
};

const innerBase = {
  width: '100%',
  height: '100%',
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  position: 'relative',
  boxSizing: 'border-box',
};

const tagStyle = { fontSize: '10px', letterSpacing: '1.8px', opacity: 0.7, textTransform: 'uppercase' };
const nameStyle = { fontSize: '18px', fontWeight: 500, letterSpacing: '0.3px', marginTop: '4px' };
const lineStyle = { fontStyle: 'italic', fontSize: '12px', opacity: 0.85, lineHeight: 1.35 };
const statusBase = {
  position: 'absolute',
  top: '12px',
  right: '12px',
  fontSize: '9px',
  letterSpacing: '1.5px',
  opacity: 0.55,
  textTransform: 'uppercase',
};
const artBase = { position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' };

export default function Home() {
  return (
    <main style={{
      minHeight: '100vh',
      backgroundColor: '#faf7f2',
    }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '12px',
        padding: '2rem',
        maxWidth: '1400px',
        margin: '0 auto',
        minHeight: '100vh',
        alignContent: 'center',
        boxSizing: 'border-box',
      }}>

        <a className="tile" href="/about" style={{ ...tileBase, background: '#F1ECDE' }}>
          <div style={artBase}>
            <svg width="100%" height="100%" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
              <g transform="translate(0, -8)">
                <rect x="34" y="58" width="132" height="100" fill="none" stroke="#5A5142" strokeWidth="1.2" />
                <line x1="34" y1="90" x2="166" y2="90" stroke="#5A5142" strokeWidth="0.7" />
                <line x1="90" y1="90" x2="90" y2="158" stroke="#5A5142" strokeWidth="0.7" />
                <line x1="130" y1="90" x2="130" y2="158" stroke="#5A5142" strokeWidth="0.7" />
                <line x1="34" y1="125" x2="90" y2="125" stroke="#5A5142" strokeWidth="0.7" />
                <line x1="60" y1="158" x2="68" y2="158" stroke="#F1ECDE" strokeWidth="2.5" />
                <line x1="60" y1="158" x2="68" y2="150" stroke="#5A5142" strokeWidth="0.6" />
                <circle cx="62" cy="74" r="1.4" fill="#5A5142" />
                <text x="62" y="80" fontFamily="Georgia, serif" fontStyle="italic" fontSize="7" fill="#5A5142" textAnchor="middle">desk</text>
                <text x="62" y="111" fontFamily="Georgia, serif" fontStyle="italic" fontSize="6.5" fill="#5A5142" textAnchor="middle">notes</text>
                <text x="62" y="143" fontFamily="Georgia, serif" fontStyle="italic" fontSize="6.5" fill="#5A5142" textAnchor="middle">archive</text>
                <text x="110" y="125" fontFamily="Georgia, serif" fontStyle="italic" fontSize="6.5" fill="#5A5142" textAnchor="middle">bench</text>
                <text x="148" y="125" fontFamily="Georgia, serif" fontStyle="italic" fontSize="6.5" fill="#5A5142" textAnchor="middle">stack</text>
                <text x="100" y="50" fontFamily="Georgia, serif" fontStyle="italic" fontSize="9" fill="#5A5142" textAnchor="middle" letterSpacing="1.5">plan</text>
                <line x1="80" y1="54" x2="120" y2="54" stroke="#5A5142" strokeWidth="0.3" />
              </g>
            </svg>
          </div>
          <div style={{ ...innerBase, color: '#2C2C2A' }}>
            <div>
              <div style={{ ...tagStyle, color: '#5A5142' }}>00</div>
              <div style={nameStyle}>About</div>
            </div>
            <div style={{ ...lineStyle, color: '#5A5142' }}>The lab and the clinician behind it.</div>
          </div>
        </a>

        <a className="tile" href="https://keel.floviken.se" style={{ ...tileBase, background: '#c8d5d7' }}>
          <div style={artBase}>
            <svg width="100%" height="100%" viewBox="0 0 160 130" preserveAspectRatio="xMidYMid meet" aria-label="A sailboat heeled to port with a fin keel below the waterline">
              <line x1="0" y1="76" x2="160" y2="76" stroke="#2d4346" strokeWidth="0.4" strokeDasharray="3 3" />
              <path d="M 0 88 Q 22 82 44 88 T 88 86 T 132 90 T 160 88" fill="none" stroke="#2d4346" strokeWidth="0.4" opacity="0.8" />
              <path d="M 0 104 Q 35 98 70 104 T 140 102 T 160 106" fill="none" stroke="#2d4346" strokeWidth="0.3" opacity="0.55" />
              <path d="M 0 118 Q 40 114 80 118 T 160 116" fill="none" stroke="#2d4346" strokeWidth="0.25" opacity="0.4" />
              <g transform="translate(92 76) rotate(-8)">
                <line x1="0" y1="-70" x2="0" y2="0" stroke="#2d4346" strokeWidth="1" />
                <path d="M 2 -56 Q 22 -40 24 -16 L 2 -16 Z" fill="#2d4346" />
                <path d="M -30 -8 Q -28 0 -22 4 L 22 4 Q 28 0 30 -8 Z" fill="#2d4346" />
                <path d="M -3 4 L -4.5 13 Q -4 16 0 16 Q 4 16 4.5 13 L 3 4 Z" fill="#2d4346" />
              </g>
            </svg>
          </div>
          <div style={{ ...innerBase, color: '#2d4346' }}>
            <div>
              <div style={nameStyle}>Keel</div>
            </div>
            <div style={{ ...lineStyle, color: '#2d4346' }}>The chart underneath the rooms.</div>
          </div>
          <div style={{ ...statusBase, color: '#2d4346' }}>EMR</div>
        </a>

        <a className="tile" href="/ghost-signout" style={{ ...tileBase, background: '#1a2533' }}>
          <div style={artBase}>
            <svg width="100%" height="100%" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
              <rect x="0" y="120" width="200" height="80" fill="#0f1822" />
              <rect x="80" y="60" width="40" height="80" fill="#c8d6e6" opacity="0.12" />
              <circle cx="100" cy="100" r="4" fill="#c8d6e6" opacity="0.5" />
            </svg>
          </div>
          <div style={{ ...innerBase, color: '#d8e3ef' }}>
            <div>
              <div style={tagStyle}>01</div>
              <div style={nameStyle}>Ghost Signout</div>
            </div>
            <div style={lineStyle}>The morning handoff, and what it doesn&apos;t see.</div>
          </div>
          <div style={{ ...statusBase, color: '#d8e3ef' }}>Live</div>
        </a>

        <a className="tile" href="/foldspace" style={{ ...tileBase, background: '#15212e' }}>
          <div style={artBase}>
            <svg width="100%" height="100%" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
              <circle cx="60" cy="80" r="14" fill="#5dcaa5" opacity="0.4" />
              <circle cx="100" cy="110" r="10" fill="#9fe1cb" opacity="0.5" />
              <circle cx="135" cy="75" r="12" fill="#5dcaa5" opacity="0.35" />
              <circle cx="155" cy="125" r="8" fill="#9fe1cb" opacity="0.45" />
              <line x1="60" y1="80" x2="100" y2="110" stroke="#5dcaa5" strokeWidth="1" opacity="0.5" />
              <line x1="100" y1="110" x2="135" y2="75" stroke="#5dcaa5" strokeWidth="1" opacity="0.5" />
              <line x1="100" y1="110" x2="155" y2="125" stroke="#5dcaa5" strokeWidth="1" opacity="0.5" />
              <line x1="135" y1="75" x2="155" y2="125" stroke="#5dcaa5" strokeWidth="1" opacity="0.4" />
            </svg>
          </div>
          <div style={{ ...innerBase, color: '#b8e6d3' }}>
            <div>
              <div style={tagStyle}>02</div>
              <div style={nameStyle}>Foldspace</div>
            </div>
            <div style={lineStyle}>A drug-target briefing in 60 seconds.</div>
          </div>
          <div style={{ ...statusBase, color: '#b8e6d3' }}>Live</div>
        </a>

        <a className="tile" href="/lowfire" style={{ ...tileBase, background: '#2a1812' }}>
          <div style={artBase}>
            <svg width="100%" height="100%" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
              <circle cx="100" cy="100" r="70" fill="none" stroke="#d85a30" strokeWidth="0.5" opacity="0.4" />
              <line x1="100" y1="100" x2="100" y2="40" stroke="#f5c4b3" strokeWidth="1" opacity="0.7" />
              <line x1="100" y1="100" x2="155" y2="120" stroke="#d85a30" strokeWidth="1.5" opacity="0.85" />
              <circle cx="100" cy="100" r="3" fill="#f5c4b3" />
            </svg>
          </div>
          <div style={{ ...innerBase, color: '#f5c4b3' }}>
            <div>
              <div style={tagStyle}>03</div>
              <div style={nameStyle}>Lowfire</div>
            </div>
            <div style={lineStyle}>The 60-minute window.</div>
          </div>
          <div style={{ ...statusBase, color: '#f5c4b3' }}>Live</div>
        </a>

        <a className="tile" href="/doorstep" style={{ ...tileBase, background: '#2B2520' }}>
          <div style={artBase}>
            <svg width="100%" height="100%" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
              <rect x="115" y="50" width="50" height="120" fill="#F2D88A" opacity="0.85" />
              <rect x="113" y="48" width="2" height="124" fill="#0E0C0A" />
              <rect x="165" y="48" width="2" height="124" fill="#0E0C0A" />
              <rect x="113" y="48" width="54" height="2" fill="#0E0C0A" />
              <polygon points="115,170 165,170 185,200 95,200" fill="#F2D88A" opacity="0.25" />
            </svg>
          </div>
          <div style={{ ...innerBase, color: '#F2EEDF' }}>
            <div>
              <div style={tagStyle}>04</div>
              <div style={nameStyle}>Doorstep</div>
            </div>
            <div style={lineStyle}>A safer way to work through the AMA discharge.</div>
          </div>
          <div style={{ ...statusBase, color: '#F2D88A' }}>Live</div>
        </a>

        <a className="tile" href="/sundown" style={{ ...tileBase, background: '#2a1f3a' }}>
          <div style={artBase}>
            <svg width="100%" height="100%" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
              <rect x="0" y="130" width="200" height="70" fill="#1a1326" />
              <circle cx="100" cy="130" r="36" fill="#EF9F27" opacity="0.55" />
              <line x1="0" y1="130" x2="200" y2="130" stroke="#EF9F27" strokeWidth="0.5" opacity="0.4" />
            </svg>
          </div>
          <div style={{ ...innerBase, color: '#d4c8e8' }}>
            <div>
              <div style={tagStyle}>05</div>
              <div style={nameStyle}>Sundown</div>
            </div>
            <div style={lineStyle}>Cross-cover at midnight.</div>
          </div>
          <div style={{ ...statusBase, color: '#d4c8e8' }}>In progress</div>
        </a>

        <a className="tile" href="/margin" style={{ ...tileBase, background: '#f1ede3' }}>
          <div style={artBase}>
            <svg width="100%" height="100%" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
              <line x1="40" y1="80" x2="170" y2="80" stroke="#5f5e5a" strokeWidth="0.4" opacity="0.5" />
              <line x1="40" y1="100" x2="170" y2="100" stroke="#5f5e5a" strokeWidth="0.4" opacity="0.5" />
              <line x1="40" y1="120" x2="170" y2="120" stroke="#5f5e5a" strokeWidth="0.4" opacity="0.5" />
              <line x1="40" y1="140" x2="140" y2="140" stroke="#5f5e5a" strokeWidth="0.4" opacity="0.5" />
              <circle cx="160" cy="115" r="6" fill="none" stroke="#A32D2D" strokeWidth="1.5" />
              <line x1="160" y1="115" x2="175" y2="100" stroke="#A32D2D" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <div style={{ ...innerBase, color: '#2c2c2a' }}>
            <div>
              <div style={tagStyle}>06</div>
              <div style={nameStyle}>Margin</div>
            </div>
            <div style={lineStyle}>What the radiologist flagged. What discharge missed.</div>
          </div>
          <div style={{ ...statusBase, color: '#5f5e5a' }}>In progress</div>
        </a>

        <a className="tile" href="/daybreak" style={{ ...tileBase, background: '#d8e3ef' }}>
          <div style={artBase}>
            <svg width="100%" height="100%" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
              <rect x="0" y="140" width="200" height="60" fill="#b8c9d9" />
              <circle cx="160" cy="140" r="22" fill="#FAEEDA" opacity="0.9" />
              <line x1="0" y1="140" x2="200" y2="140" stroke="#7a8fa3" strokeWidth="0.4" />
            </svg>
          </div>
          <div style={{ ...innerBase, color: '#2c3e50' }}>
            <div>
              <div style={tagStyle}>07</div>
              <div style={nameStyle}>Daybreak</div>
            </div>
            <div style={lineStyle}>The hour before rounds.</div>
          </div>
          <div style={{ ...statusBase, color: '#5f6e7d' }}>In progress</div>
        </a>

        <a className="tile" href="/scribe" style={{ ...tileBase, background: '#B8C2B0' }}>
          <div style={artBase}>
            <svg width="100%" height="100%" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
              <g transform="rotate(-8 115 110)">
                <ellipse cx="115" cy="95" rx="26" ry="36" fill="#2A2E26" stroke="#2A2E26" strokeWidth="1.2" />
                <line x1="95" y1="82" x2="135" y2="82" stroke="#B8C2B0" strokeWidth="0.9" />
                <line x1="93" y1="92" x2="137" y2="92" stroke="#B8C2B0" strokeWidth="0.9" />
                <line x1="93" y1="102" x2="137" y2="102" stroke="#B8C2B0" strokeWidth="0.9" />
                <line x1="93" y1="112" x2="137" y2="112" stroke="#B8C2B0" strokeWidth="0.9" />
                <line x1="95" y1="122" x2="135" y2="122" stroke="#B8C2B0" strokeWidth="0.9" />
                <circle cx="115" cy="132" r="2" fill="#C25A3B" />
                <rect x="106" y="138" width="18" height="7" fill="#2A2E26" />
                <line x1="115" y1="145" x2="115" y2="178" stroke="#2A2E26" strokeWidth="1.5" strokeLinecap="round" />
              </g>
              <line x1="78" y1="183" x2="152" y2="183" stroke="#2A2E26" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <div style={{ ...innerBase, color: '#2A2E26' }}>
            <div>
              <div style={{ ...tagStyle, color: '#4A5448' }}>08</div>
              <div style={nameStyle}>Scribe</div>
            </div>
            <div style={{ ...lineStyle, color: '#4A5448' }}>The second view.</div>
          </div>
          <div style={{ ...statusBase, color: '#4A5448' }}>Position</div>
        </a>

        <a className="tile" href="/signal" style={{ ...tileBase, background: '#14323A' }}>
          <div style={artBase}>
            <svg width="100%" height="100%" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
              <rect x="0" y="135" width="200" height="65" fill="#0B2228" />
              <line x1="0" y1="135" x2="200" y2="135" stroke="#1E4750" strokeWidth="0.4" />
              <polygon points="44,135 50,75 60,75 66,135" fill="#0B2228" stroke="#5D8189" strokeWidth="0.6" />
              <rect x="48" y="55" width="14" height="22" fill="#0B2228" stroke="#5D8189" strokeWidth="0.6" />
              <rect x="46" y="50" width="18" height="5" fill="#0B2228" stroke="#5D8189" strokeWidth="0.5" />
              <polygon points="46,50 55,40 64,50" fill="#0B2228" stroke="#5D8189" strokeWidth="0.5" />
              <circle cx="55" cy="65" r="3" fill="#F2D88A" opacity="0.95" />
              <circle cx="55" cy="65" r="6" fill="#F2D88A" opacity="0.35" />
              <circle cx="55" cy="65" r="11" fill="#F2D88A" opacity="0.12" />
              <polygon points="58,62 200,30 200,98 58,68" fill="#F2D88A" opacity="0.18" />
              <polygon points="58,63 200,45 200,85 58,67" fill="#F2D88A" opacity="0.1" />
              <line x1="0" y1="145" x2="200" y2="145" stroke="#1E4750" strokeWidth="0.3" opacity="0.6" />
              <line x1="0" y1="158" x2="200" y2="158" stroke="#1E4750" strokeWidth="0.3" opacity="0.5" />
              <line x1="0" y1="172" x2="200" y2="172" stroke="#1E4750" strokeWidth="0.3" opacity="0.4" />
              <line x1="0" y1="186" x2="200" y2="186" stroke="#1E4750" strokeWidth="0.3" opacity="0.3" />
            </svg>
          </div>
          <div style={{ ...innerBase, color: '#D6E3E6' }}>
            <div>
              <div style={{ ...tagStyle, color: '#F2D88A' }}>&middot;</div>
              <div style={nameStyle}>Send a signal</div>
            </div>
            <div style={{ ...lineStyle, color: '#B8CDD1' }}>Working on something nearby? Let&apos;s talk.</div>
          </div>
        </a>

      </div>
    </main>
  );
}
