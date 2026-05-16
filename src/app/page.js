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

      </div>
    </main>
  );
}
