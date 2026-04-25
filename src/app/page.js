export default function Home() {
  return (
    <main style={{
      minHeight: '100vh',
      backgroundColor: '#faf7f2',
      padding: '3rem 1.5rem',
      display: 'flex',
      justifyContent: 'center',
    }}>
      <div style={{
        maxWidth: '640px',
        width: '100%',
      }}>

        <div style={{ marginBottom: '3rem', marginTop: '2rem' }}>
          <svg
            viewBox="0 0 680 340"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: '100%', height: 'auto', display: 'block' }}
            aria-label="Atmospheric Swedish landscape"
          >
            <defs>
              <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#e8e4dd" />
                <stop offset="100%" stopColor="#f5f2ec" />
              </linearGradient>
            </defs>
            <rect x="0" y="0" width="680" height="340" fill="url(#sky)" />
            <circle cx="540" cy="80" r="30" fill="#f5eacc" opacity="0.7" />
            <path d="M 0 175 L 80 160 L 140 170 L 220 155 L 300 165 L 380 158 L 460 168 L 540 155 L 620 165 L 680 160 L 680 200 L 0 200 Z" fill="#b5bdc4" opacity="0.6" />
            <path d="M 0 195 L 50 180 L 120 190 L 180 175 L 260 188 L 340 178 L 420 188 L 500 175 L 580 185 L 680 180 L 680 220 L 0 220 Z" fill="#8a95a0" opacity="0.7" />
            <g fill="#3d4a3d">
              <polygon points="0,215 15,195 25,210 35,190 45,205 55,195 70,215 70,230 0,230" />
              <polygon points="70,220 85,200 95,218 110,195 125,212 140,200 155,218 170,205 185,220 200,208 215,220 70,230" />
              <polygon points="215,218 230,200 245,215 260,195 275,212 290,200 305,218 320,205 335,218 350,200 365,215 380,210 380,225 215,225" />
              <polygon points="380,220 395,205 410,218 425,198 440,212 455,202 470,218 485,205 500,218 515,200 530,215 380,225" />
              <polygon points="530,215 545,200 560,215 575,195 590,210 605,198 620,215 640,205 660,215 680,210 680,230 530,230" />
            </g>
            <g fill="#2a332a">
              <polygon points="40,240 55,218 65,238 75,215 85,235 95,220 110,240 40,255" />
              <polygon points="110,240 125,215 140,238 155,210 170,232 185,218 200,240 215,220 230,238 240,225 110,255" />
              <polygon points="240,238 255,212 270,235 285,208 300,230 315,218 330,238 345,215 360,235 375,220 390,238 240,252" />
              <polygon points="390,238 405,213 420,235 435,210 450,232 465,215 480,238 495,218 510,235 525,208 540,230 390,252" />
              <polygon points="540,235 555,210 570,232 585,208 600,230 615,215 630,238 645,215 660,235 680,228 680,252 540,252" />
            </g>
            <rect x="0" y="252" width="680" height="88" fill="#7a8995" opacity="0.35" />
            <rect x="0" y="252" width="680" height="88" fill="#6d7c88" opacity="0.3" />
            <g stroke="#fff" strokeWidth="0.4" fill="none" opacity="0.6" strokeLinecap="round">
              <line x1="40" y1="268" x2="180" y2="268" />
              <line x1="220" y1="272" x2="340" y2="272" />
              <line x1="380" y1="268" x2="500" y2="268" />
              <line x1="540" y1="270" x2="640" y2="270" />
              <line x1="60" y1="282" x2="280" y2="282" />
              <line x1="320" y1="286" x2="520" y2="286" />
              <line x1="540" y1="284" x2="660" y2="284" />
              <line x1="100" y1="296" x2="380" y2="296" />
              <line x1="420" y1="300" x2="620" y2="300" />
              <line x1="40" y1="312" x2="300" y2="312" />
              <line x1="340" y1="316" x2="560" y2="316" />
              <line x1="80" y1="326" x2="420" y2="326" />
            </g>
            <g opacity="0.25" fill="#2a332a">
              <polygon points="280,252 285,265 295,258 310,268 325,262 330,252" />
              <polygon points="120,252 130,260 145,255 160,262 170,252" />
              <polygon points="400,252 415,258 430,252 445,260 460,252" />
            </g>
          </svg>
        </div>

        <h1 style={{
          fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
          fontSize: '2.25rem',
          fontWeight: 300,
          letterSpacing: '0.18em',
          color: '#2a2a2a',
          textAlign: 'center',
          marginBottom: '0.75rem',
          marginTop: 0,
        }}>
          Floviken
        </h1>

        <p style={{
          fontFamily: '"Georgia", "Times New Roman", serif',
          fontSize: '1.125rem',
          fontStyle: 'italic',
          color: '#5a5a5a',
          textAlign: 'center',
          marginBottom: '4rem',
          marginTop: 0,
        }}>
          Experiments in AI and medicine
        </p>

        <div style={{
          fontFamily: '"Georgia", "Times New Roman", serif',
          fontSize: '1.0625rem',
          lineHeight: '1.7',
          color: '#3a3a3a',
          marginBottom: '4rem',
          textAlign: 'left',
          maxWidth: '540px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          <p style={{ margin: 0 }}>
            I&apos;m Richard Ahroon &mdash; a US board-certified physician based in Karlstad, Sweden, working part-time in the United States. I can feel the clinical landscape changing as AI tools mature. I&apos;m trying to stay close to both sides &mdash; practicing clinically and building small experiments &mdash; to see what actually helps at the bedside, and what doesn&apos;t.
          </p>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '2.5rem',
        }}>
          <div style={{ height: '1px', backgroundColor: '#d8d2c5', flex: 1 }} />
          <p style={{
            fontFamily: '"Inter", -apple-system, sans-serif',
            fontSize: '0.75rem',
            letterSpacing: '0.2em',
            color: '#8a8a8a',
            textTransform: 'uppercase',
            margin: 0,
          }}>
            Experiments
          </p>
          <div style={{ height: '1px', backgroundColor: '#d8d2c5', flex: 1 }} />
        </div>

        <div style={{
          borderTop: '1px solid #e8e2d5',
          borderBottom: '1px solid #e8e2d5',
          padding: '2rem 0',
          marginBottom: '1.5rem',
        }}>
          <p style={{
            fontFamily: '"Inter", -apple-system, sans-serif',
            fontSize: '0.75rem',
            letterSpacing: '0.15em',
            color: '#8a8a8a',
            textTransform: 'uppercase',
            margin: '0 0 0.5rem 0',
          }}>
            #1 &middot; Svenska
          </p>
          <h2 style={{
            fontFamily: '"Georgia", serif',
            fontSize: '1.375rem',
            fontWeight: 400,
            color: '#2a2a2a',
            marginBottom: '0.75rem',
            marginTop: 0,
          }}>
            AI-generated Swedish learning, A1 to C1
          </h2>
          <p style={{
            fontFamily: '"Georgia", serif',
            fontSize: '1rem',
            lineHeight: '1.7',
            color: '#4a4a4a',
            marginBottom: '1.25rem',
            marginTop: 0,
          }}>
            I built this to prepare for the Swedish language proficiency exam required for foreign-trained physicians. Existing tools didn&apos;t match how I study or where my gaps were, so I made one that does. AI generates the questions, grades the essays, and adapts to my actual weaknesses.
          </p>
          <a href="https://swedish-learning-app-beta.vercel.app" target="_blank" rel="noopener noreferrer" style={{
            fontFamily: '"Inter", -apple-system, sans-serif',
            fontSize: '0.9375rem',
            color: '#2a332a',
            textDecoration: 'none',
            borderBottom: '1px solid #2a332a',
            paddingBottom: '1px',
          }}>
            Try it &rarr;
          </a>
        </div>

        <div style={{
          borderBottom: '1px solid #e8e2d5',
          padding: '2rem 0',
          marginBottom: '4rem',
          opacity: 0.85,
        }}>
          <p style={{
            fontFamily: '"Inter", -apple-system, sans-serif',
            fontSize: '0.75rem',
            letterSpacing: '0.15em',
            color: '#8a8a8a',
            textTransform: 'uppercase',
            margin: '0 0 0.5rem 0',
          }}>
            #2 &middot; Ghost Signout
          </p>
          <h2 style={{
            fontFamily: '"Georgia", serif',
            fontSize: '1.375rem',
            fontWeight: 400,
            color: '#2a2a2a',
            marginBottom: '0.5rem',
            marginTop: 0,
          }}>
            What the morning handoff doesn&apos;t capture
          </h2>
          <p style={{
            fontFamily: '"Inter", -apple-system, sans-serif',
            fontSize: '0.875rem',
            fontStyle: 'italic',
            color: '#8a8a8a',
            marginBottom: '1rem',
            marginTop: 0,
          }}>
            In development.
          </p>
          <p style={{
            fontFamily: '"Georgia", serif',
            fontSize: '1rem',
            lineHeight: '1.7',
            color: '#4a4a4a',
            marginBottom: '1rem',
            marginTop: 0,
          }}>
            I work solo overnight shifts. A lot of what I do at night doesn&apos;t fit into the regular morning handoff &mdash; patients who leave against medical advice, are transferred to tertiary centers, or are admitted and discharged before dawn. They drop off the handoff list before the day team sees them. I&apos;m building a tool to capture these events during the shift and produce a clean morning document for the group.
          </p>
          <p style={{
            fontFamily: '"Inter", -apple-system, sans-serif',
            fontSize: '0.875rem',
            color: '#8a8a8a',
            marginBottom: 0,
            marginTop: 0,
          }}>
            Coming soon
          </p>
        </div>

        <footer style={{
          fontFamily: '"Inter", -apple-system, sans-serif',
          fontSize: '0.875rem',
          color: '#8a8a8a',
          textAlign: 'center',
          marginTop: '2rem',
          marginBottom: '2rem',
        }}>
          <a href="mailto:richard@floviken.se" style={{ color: '#5a5a5a', textDecoration: 'none', borderBottom: '1px solid #d8d2c5', paddingBottom: '1px' }}>
            richard@floviken.se
          </a>
          <span style={{ margin: '0 0.75rem', color: '#c8c2b5' }}>&middot;</span>
          <a href="https://linkedin.com/in/richard-ahroon" target="_blank" rel="noopener noreferrer" style={{ color: '#5a5a5a', textDecoration: 'none', borderBottom: '1px solid #d8d2c5', paddingBottom: '1px' }}>
            LinkedIn
          </a>
        </footer>

      </div>
    </main>
  );
}
