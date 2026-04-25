cat > src/app/page.js << 'ENDOFFILE'
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
          <img
            src="/landscape.svg"
            alt="Floviken landscape"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
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
ENDOFFILE