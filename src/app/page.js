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
          <p style={{ margin: '0 0 1rem 0' }}>
            I&apos;m Richard Ahroon, a board-certified internist and US/Swedish dual citizen, with active clinical practice in the United States. I trained in biomedical engineering before medicine, and that background has shaped a long-standing interest in where clinical medicine meets technology.
          </p>
          <p style={{ margin: '0 0 1rem 0' }}>
            My day-to-day work is inpatient hospital medicine, including ICU-level care, increasingly mediated by AI-enabled tools &mdash; ambient documentation, clinical decision support, and alert systems for sepsis and deterioration. I&apos;ve seen firsthand where these tools help and where they fall short.
          </p>
          <p style={{ margin: '0 0 1rem 0' }}>
            I build small clinical AI experiments exploring common hospitalist workflow questions &mdash; handoff structure, time-critical decision support, high-risk encounter documentation. Built from public guidelines and synthetic cases. Independent projects, not deployed in any clinical setting.
          </p>
          <p style={{ margin: 0 }}>
            If you&apos;re working on clinical AI and want a clinician&apos;s perspective, or you&apos;re a clinician thinking about getting closer to the tech side, I&apos;d like to hear from you at <a href="mailto:richard@floviken.se" style={{ color: '#3a3a3a', textDecoration: 'none', borderBottom: '1px solid #d8d2c5', paddingBottom: '1px' }}>richard@floviken.se</a>.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '12px',
          padding: '2rem 0',
          marginBottom: '1.5rem',
        }}>

          <a className="lab-tile" href="#ghost-signout" style={{
            aspectRatio: '1 / 1',
            borderRadius: '12px',
            overflow: 'hidden',
            position: 'relative',
            cursor: 'pointer',
            fontFamily: 'Georgia, serif',
            textDecoration: 'none',
            display: 'block',
            background: '#1a2533',
          }}>
            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
              <svg width="100%" height="100%" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
                <rect x="0" y="120" width="200" height="80" fill="#0f1822" />
                <rect x="80" y="60" width="40" height="80" fill="#c8d6e6" opacity="0.12" />
                <circle cx="100" cy="100" r="4" fill="#c8d6e6" opacity="0.5" />
              </svg>
            </div>
            <div style={{
              width: '100%', height: '100%', padding: '16px',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              position: 'relative', boxSizing: 'border-box', color: '#d8e3ef',
            }}>
              <div>
                <div style={{ fontSize: '10px', letterSpacing: '1.8px', opacity: 0.7, textTransform: 'uppercase' }}>01</div>
                <div style={{ fontSize: '18px', fontWeight: 500, letterSpacing: '0.3px', marginTop: '4px' }}>Ghost Signout</div>
              </div>
              <div style={{ fontStyle: 'italic', fontSize: '12px', opacity: 0.85, lineHeight: 1.35 }}>
                The morning handoff, and what it doesn&apos;t see.
              </div>
            </div>
            <div style={{
              position: 'absolute', top: '12px', right: '12px',
              fontSize: '9px', letterSpacing: '1.5px', opacity: 0.55,
              textTransform: 'uppercase', color: '#d8e3ef',
            }}>Live</div>
          </a>

          <a className="lab-tile" href="#foldspace" style={{
            aspectRatio: '1 / 1',
            borderRadius: '12px',
            overflow: 'hidden',
            position: 'relative',
            cursor: 'pointer',
            fontFamily: 'Georgia, serif',
            textDecoration: 'none',
            display: 'block',
            background: '#15212e',
          }}>
            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
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
            <div style={{
              width: '100%', height: '100%', padding: '16px',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              position: 'relative', boxSizing: 'border-box', color: '#b8e6d3',
            }}>
              <div>
                <div style={{ fontSize: '10px', letterSpacing: '1.8px', opacity: 0.7, textTransform: 'uppercase' }}>02</div>
                <div style={{ fontSize: '18px', fontWeight: 500, letterSpacing: '0.3px', marginTop: '4px' }}>Foldspace</div>
              </div>
              <div style={{ fontStyle: 'italic', fontSize: '12px', opacity: 0.85, lineHeight: 1.35 }}>
                A drug-target briefing in 60 seconds.
              </div>
            </div>
            <div style={{
              position: 'absolute', top: '12px', right: '12px',
              fontSize: '9px', letterSpacing: '1.5px', opacity: 0.55,
              textTransform: 'uppercase', color: '#b8e6d3',
            }}>Live</div>
          </a>

          <a className="lab-tile" href="#lowfire" style={{
            aspectRatio: '1 / 1',
            borderRadius: '12px',
            overflow: 'hidden',
            position: 'relative',
            cursor: 'pointer',
            fontFamily: 'Georgia, serif',
            textDecoration: 'none',
            display: 'block',
            background: '#2a1812',
          }}>
            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
              <svg width="100%" height="100%" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
                <circle cx="100" cy="100" r="70" fill="none" stroke="#d85a30" strokeWidth="0.5" opacity="0.4" />
                <line x1="100" y1="100" x2="100" y2="40" stroke="#f5c4b3" strokeWidth="1" opacity="0.7" />
                <line x1="100" y1="100" x2="155" y2="120" stroke="#d85a30" strokeWidth="1.5" opacity="0.85" />
                <circle cx="100" cy="100" r="3" fill="#f5c4b3" />
              </svg>
            </div>
            <div style={{
              width: '100%', height: '100%', padding: '16px',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              position: 'relative', boxSizing: 'border-box', color: '#f5c4b3',
            }}>
              <div>
                <div style={{ fontSize: '10px', letterSpacing: '1.8px', opacity: 0.7, textTransform: 'uppercase' }}>03</div>
                <div style={{ fontSize: '18px', fontWeight: 500, letterSpacing: '0.3px', marginTop: '4px' }}>Lowfire</div>
              </div>
              <div style={{ fontStyle: 'italic', fontSize: '12px', opacity: 0.85, lineHeight: 1.35 }}>
                The 60-minute window.
              </div>
            </div>
            <div style={{
              position: 'absolute', top: '12px', right: '12px',
              fontSize: '9px', letterSpacing: '1.5px', opacity: 0.55,
              textTransform: 'uppercase', color: '#f5c4b3',
            }}>Live</div>
          </a>

          <a className="lab-tile" href="#doorstep" style={{
            aspectRatio: '1 / 1',
            borderRadius: '12px',
            overflow: 'hidden',
            position: 'relative',
            cursor: 'pointer',
            fontFamily: 'Georgia, serif',
            textDecoration: 'none',
            display: 'block',
            background: '#2B2520',
          }}>
            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
              <svg width="100%" height="100%" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
                <rect x="115" y="50" width="50" height="120" fill="#F2D88A" opacity="0.85" />
                <rect x="113" y="48" width="2" height="124" fill="#0E0C0A" />
                <rect x="165" y="48" width="2" height="124" fill="#0E0C0A" />
                <rect x="113" y="48" width="54" height="2" fill="#0E0C0A" />
                <polygon points="115,170 165,170 185,200 95,200" fill="#F2D88A" opacity="0.25" />
              </svg>
            </div>
            <div style={{
              width: '100%', height: '100%', padding: '16px',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              position: 'relative', boxSizing: 'border-box', color: '#F2EEDF',
            }}>
              <div>
                <div style={{ fontSize: '10px', letterSpacing: '1.8px', opacity: 0.7, textTransform: 'uppercase' }}>04</div>
                <div style={{ fontSize: '18px', fontWeight: 500, letterSpacing: '0.3px', marginTop: '4px' }}>Doorstep</div>
              </div>
              <div style={{ fontStyle: 'italic', fontSize: '12px', opacity: 0.85, lineHeight: 1.35 }}>
                A safer way to work through the AMA discharge.
              </div>
            </div>
            <div style={{
              position: 'absolute', top: '12px', right: '12px',
              fontSize: '9px', letterSpacing: '1.5px', opacity: 0.55,
              textTransform: 'uppercase', color: '#F2D88A',
            }}>Live</div>
          </a>

          <a className="lab-tile" href="#sundown" style={{
            aspectRatio: '1 / 1',
            borderRadius: '12px',
            overflow: 'hidden',
            position: 'relative',
            cursor: 'pointer',
            fontFamily: 'Georgia, serif',
            textDecoration: 'none',
            display: 'block',
            background: '#2a1f3a',
          }}>
            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
              <svg width="100%" height="100%" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
                <rect x="0" y="130" width="200" height="70" fill="#1a1326" />
                <circle cx="100" cy="130" r="36" fill="#EF9F27" opacity="0.55" />
                <line x1="0" y1="130" x2="200" y2="130" stroke="#EF9F27" strokeWidth="0.5" opacity="0.4" />
              </svg>
            </div>
            <div style={{
              width: '100%', height: '100%', padding: '16px',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              position: 'relative', boxSizing: 'border-box', color: '#d4c8e8',
            }}>
              <div>
                <div style={{ fontSize: '10px', letterSpacing: '1.8px', opacity: 0.7, textTransform: 'uppercase' }}>05</div>
                <div style={{ fontSize: '18px', fontWeight: 500, letterSpacing: '0.3px', marginTop: '4px' }}>Sundown</div>
              </div>
              <div style={{ fontStyle: 'italic', fontSize: '12px', opacity: 0.85, lineHeight: 1.35 }}>
                Cross-cover at midnight.
              </div>
            </div>
            <div style={{
              position: 'absolute', top: '12px', right: '12px',
              fontSize: '9px', letterSpacing: '1.5px', opacity: 0.55,
              textTransform: 'uppercase', color: '#d4c8e8',
            }}>In progress</div>
          </a>

          <a className="lab-tile" href="#margin" style={{
            aspectRatio: '1 / 1',
            borderRadius: '12px',
            overflow: 'hidden',
            position: 'relative',
            cursor: 'pointer',
            fontFamily: 'Georgia, serif',
            textDecoration: 'none',
            display: 'block',
            background: '#f1ede3',
          }}>
            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
              <svg width="100%" height="100%" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
                <line x1="40" y1="80" x2="170" y2="80" stroke="#5f5e5a" strokeWidth="0.4" opacity="0.5" />
                <line x1="40" y1="100" x2="170" y2="100" stroke="#5f5e5a" strokeWidth="0.4" opacity="0.5" />
                <line x1="40" y1="120" x2="170" y2="120" stroke="#5f5e5a" strokeWidth="0.4" opacity="0.5" />
                <line x1="40" y1="140" x2="140" y2="140" stroke="#5f5e5a" strokeWidth="0.4" opacity="0.5" />
                <circle cx="160" cy="115" r="6" fill="none" stroke="#A32D2D" strokeWidth="1.5" />
                <line x1="160" y1="115" x2="175" y2="100" stroke="#A32D2D" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div style={{
              width: '100%', height: '100%', padding: '16px',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              position: 'relative', boxSizing: 'border-box', color: '#2c2c2a',
            }}>
              <div>
                <div style={{ fontSize: '10px', letterSpacing: '1.8px', opacity: 0.7, textTransform: 'uppercase' }}>06</div>
                <div style={{ fontSize: '18px', fontWeight: 500, letterSpacing: '0.3px', marginTop: '4px' }}>Margin</div>
              </div>
              <div style={{ fontStyle: 'italic', fontSize: '12px', opacity: 0.85, lineHeight: 1.35 }}>
                What the radiologist flagged. What discharge missed.
              </div>
            </div>
            <div style={{
              position: 'absolute', top: '12px', right: '12px',
              fontSize: '9px', letterSpacing: '1.5px', opacity: 0.55,
              textTransform: 'uppercase', color: '#5f5e5a',
            }}>In progress</div>
          </a>

          <a className="lab-tile" href="#daybreak" style={{
            aspectRatio: '1 / 1',
            borderRadius: '12px',
            overflow: 'hidden',
            position: 'relative',
            cursor: 'pointer',
            fontFamily: 'Georgia, serif',
            textDecoration: 'none',
            display: 'block',
            background: '#d8e3ef',
          }}>
            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
              <svg width="100%" height="100%" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
                <rect x="0" y="140" width="200" height="60" fill="#b8c9d9" />
                <circle cx="160" cy="140" r="22" fill="#FAEEDA" opacity="0.9" />
                <line x1="0" y1="140" x2="200" y2="140" stroke="#7a8fa3" strokeWidth="0.4" />
              </svg>
            </div>
            <div style={{
              width: '100%', height: '100%', padding: '16px',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              position: 'relative', boxSizing: 'border-box', color: '#2c3e50',
            }}>
              <div>
                <div style={{ fontSize: '10px', letterSpacing: '1.8px', opacity: 0.7, textTransform: 'uppercase' }}>07</div>
                <div style={{ fontSize: '18px', fontWeight: 500, letterSpacing: '0.3px', marginTop: '4px' }}>Daybreak</div>
              </div>
              <div style={{ fontStyle: 'italic', fontSize: '12px', opacity: 0.85, lineHeight: 1.35 }}>
                The hour before rounds.
              </div>
            </div>
            <div style={{
              position: 'absolute', top: '12px', right: '12px',
              fontSize: '9px', letterSpacing: '1.5px', opacity: 0.55,
              textTransform: 'uppercase', color: '#5f6e7d',
            }}>In progress</div>
          </a>

        </div>

        {/* #1 Ghost Signout */}
        <div id="ghost-signout" style={{
          borderTop: '1px solid #e8e2d5',
          borderBottom: '1px solid #e8e2d5',
          padding: '2rem 0',
          marginBottom: '1.5rem',
          scrollMarginTop: '1.5rem',
        }}>
          <p style={{
            fontFamily: '"Inter", -apple-system, sans-serif',
            fontSize: '0.75rem',
            letterSpacing: '0.15em',
            color: '#8a8a8a',
            textTransform: 'uppercase',
            margin: '0 0 0.5rem 0',
          }}>
            #1 &middot; Ghost Signout
          </p>
          <h2 style={{
            fontFamily: '"Georgia", serif',
            fontSize: '1.375rem',
            fontWeight: 400,
            color: '#2a2a2a',
            marginBottom: '0.75rem',
            marginTop: 0,
          }}>
            What the morning handoff doesn&apos;t capture
          </h2>
          <p style={{
            fontFamily: '"Georgia", serif',
            fontSize: '1rem',
            lineHeight: '1.7',
            color: '#4a4a4a',
            marginBottom: '1rem',
            marginTop: 0,
          }}>
            Morning handoff documents are written for the patients still on the inpatient service. In some cases, patients come off the service overnight. They leave against medical advice (AMA), transfer to a higher-level facility, or get admitted and discharged before sunrise. Those patients don&apos;t appear on the morning list the day team sees.
          </p>
          <p style={{
            fontFamily: '"Georgia", serif',
            fontSize: '1rem',
            lineHeight: '1.7',
            color: '#4a4a4a',
            marginBottom: '1rem',
            marginTop: 0,
          }}>
            That&apos;s a clinical visibility gap. The patient who left AMA and still needs a follow-up call. The overnight lab result that needs day-team action. The middle-of-the-night transfer where the family couldn&apos;t be reached overnight and still needs to be contacted in the morning.
          </p>
          <p style={{
            fontFamily: '"Georgia", serif',
            fontSize: '1rem',
            lineHeight: '1.7',
            color: '#4a4a4a',
            marginBottom: '1rem',
            marginTop: 0,
          }}>
            Ghost Signout is a small prototype I built that captures these events using structured fields during a hypothetical shift, then generates a clean morning document a day team could scan in 30 seconds. The categories are the ones that actually disappear: Expired, Inpatient Hospice, AMA, Transfer Out, Admit &amp; Discharge, and Critical Follow-up.
          </p>
          <p style={{
            fontFamily: '"Georgia", serif',
            fontSize: '1rem',
            lineHeight: '1.7',
            color: '#4a4a4a',
            marginBottom: '1.25rem',
            marginTop: 0,
          }}>
            The capture pattern is intentionally simple, with six taps, structured fields, and an AI-generated summary, so it could live as a standalone tool or as a module inside an existing EHR workflow.
          </p>
          <a href="https://ghost-signout.vercel.app/capture" target="_blank" rel="noopener noreferrer" style={{
            fontFamily: '"Inter", -apple-system, sans-serif',
            fontSize: '0.9375rem',
            color: '#2a332a',
            textDecoration: 'none',
            borderBottom: '1px solid #2a332a',
            paddingBottom: '1px',
          }}>
            Try it &rarr;
          </a>
          <p style={{
            fontFamily: '"Georgia", serif',
            fontSize: '0.875rem',
            fontStyle: 'italic',
            color: '#8a8a8a',
            marginTop: '0.75rem',
            marginBottom: 0,
          }}>
            Synthetic data only. Currently a single-user prototype. Live at ghost-signout.vercel.app/capture.
          </p>
        </div>

        {/* #2 Foldspace */}
        <div id="foldspace" style={{
          borderBottom: '1px solid #e8e2d5',
          padding: '2rem 0',
          marginBottom: '1.5rem',
          scrollMarginTop: '1.5rem',
        }}>
          <p style={{
            fontFamily: '"Inter", -apple-system, sans-serif',
            fontSize: '0.75rem',
            letterSpacing: '0.15em',
            color: '#8a8a8a',
            textTransform: 'uppercase',
            margin: '0 0 0.5rem 0',
          }}>
            #2 &middot; Foldspace
          </p>
          <h2 style={{
            fontFamily: '"Georgia", serif',
            fontSize: '1.375rem',
            fontWeight: 400,
            color: '#2a2a2a',
            marginBottom: '0.75rem',
            marginTop: 0,
          }}>
            A clinician&apos;s drug-target briefing in 60 seconds
          </h2>
          <p style={{
            fontFamily: '"Georgia", serif',
            fontSize: '1rem',
            lineHeight: '1.7',
            color: '#4a4a4a',
            marginBottom: '1rem',
            marginTop: 0,
          }}>
            Foldspace is a small experiment in data integrity, run in one of the most exciting spaces in science right now &mdash; drug discovery, protein folding, and the molecular biology of human disease. AlphaFold has computed predicted structures for nearly every known protein. UniProt has curated the functional annotations. ChEMBL has logged decades of bioactivity data. The raw material is open and current.
          </p>
          <p style={{
            fontFamily: '"Georgia", serif',
            fontSize: '1rem',
            lineHeight: '1.7',
            color: '#4a4a4a',
            marginBottom: '1rem',
            marginTop: 0,
          }}>
            The experiment: type a UniProt ID, get a one-page clinical briefing in 60 seconds &mdash; function, clinical relevance, approved drugs, structural confidence. The data comes from those three sources, fetched live every time. AI writes the language; the data is never recalled from training. The model isn&apos;t the source. It&apos;s the translator.
          </p>
          <p style={{
            fontFamily: '"Georgia", serif',
            fontSize: '1rem',
            lineHeight: '1.7',
            color: '#4a4a4a',
            marginBottom: '1.25rem',
            marginTop: 0,
          }}>
            It&apos;s a small attempt at what data integrity might look like as AI enters clinical and pharmacological workflows.
          </p>
          <a href="https://foldspace.floviken.se" target="_blank" rel="noopener noreferrer" style={{
            fontFamily: '"Inter", -apple-system, sans-serif',
            fontSize: '0.9375rem',
            color: '#2a332a',
            textDecoration: 'none',
            borderBottom: '1px solid #2a332a',
            paddingBottom: '1px',
          }}>
            Try it &rarr;
          </a>
          <p style={{
            fontFamily: '"Georgia", serif',
            fontSize: '0.875rem',
            fontStyle: 'italic',
            color: '#8a8a8a',
            marginTop: '0.75rem',
            marginBottom: 0,
          }}>
            Demonstration only. Live at foldspace.floviken.se.
          </p>
        </div>

        {/* #3 Lowfire */}
        <div id="lowfire" style={{
          borderBottom: '1px solid #e8e2d5',
          padding: '2rem 0',
          marginBottom: '1.5rem',
          scrollMarginTop: '1.5rem',
        }}>
          <p style={{
            fontFamily: '"Inter", -apple-system, sans-serif',
            fontSize: '0.75rem',
            letterSpacing: '0.15em',
            color: '#8a8a8a',
            textTransform: 'uppercase',
            margin: '0 0 0.5rem 0',
          }}>
            #3 &middot; Lowfire
          </p>
          <h2 style={{
            fontFamily: '"Georgia", serif',
            fontSize: '1.375rem',
            fontWeight: 400,
            color: '#2a2a2a',
            marginBottom: '0.75rem',
            marginTop: 0,
          }}>
            The 60-minute window
          </h2>
          <p style={{
            fontFamily: '"Georgia", serif',
            fontSize: '1rem',
            lineHeight: '1.7',
            color: '#4a4a4a',
            marginBottom: '1rem',
            marginTop: 0,
          }}>
            Neutropenic fever is defined as an absolute neutrophil count below 500 paired with fever, and it has a 60-minute window for empiric antibiotics. Every hour of delay correlates with worse outcomes. The decision tree for which antibiotic class to start is well-defined and has been for years in the IDSA guidelines.
          </p>
          <p style={{
            fontFamily: '"Georgia", serif',
            fontSize: '1rem',
            lineHeight: '1.7',
            color: '#4a4a4a',
            marginBottom: '1rem',
            marginTop: 0,
          }}>
            Most EHRs surface the lab abnormality. Most stop there. The clinician still has to recognize the pattern, recall the guideline, and translate it into orders, often under time pressure during a busy admission.
          </p>
          <p style={{
            fontFamily: '"Georgia", serif',
            fontSize: '1rem',
            lineHeight: '1.7',
            color: '#4a4a4a',
            marginBottom: '1rem',
            marginTop: 0,
          }}>
            Lowfire is a small experiment in what comes after the alert. A deterministic algorithm encodes the IDSA / ASCO guideline and produces the orders &mdash; antibiotic class, cultures, ancillary, monitoring. An AI then voices the recommendation as a hospitalist colleague would. The clinician signs or overrides.
          </p>
          <p style={{
            fontFamily: '"Georgia", serif',
            fontSize: '1rem',
            lineHeight: '1.7',
            color: '#4a4a4a',
            marginBottom: '1.25rem',
            marginTop: 0,
          }}>
            The architectural commitment is that the recommendation never comes from the AI. The algorithm is the source of truth. Claude only handles the language. Antibiotic names are redacted to drug class with no dosing recommendations, so there can be no confusion that this is anything but a prototype. Same shape as Foldspace, applied to actionable orders this time.
          </p>
          <a href="https://lowfire.floviken.se" target="_blank" rel="noopener noreferrer" style={{
            fontFamily: '"Inter", -apple-system, sans-serif',
            fontSize: '0.9375rem',
            color: '#2a332a',
            textDecoration: 'none',
            borderBottom: '1px solid #2a332a',
            paddingBottom: '1px',
          }}>
            Try it &rarr;
          </a>
          <p style={{
            fontFamily: '"Georgia", serif',
            fontSize: '0.875rem',
            fontStyle: 'italic',
            color: '#8a8a8a',
            marginTop: '0.75rem',
            marginBottom: 0,
          }}>
            Demonstration only. Live at lowfire.floviken.se.
          </p>
        </div>

        {/* #4 Doorstep */}
        <div id="doorstep" style={{
          borderBottom: '1px solid #e8e2d5',
          padding: '2rem 0',
          marginBottom: '1.5rem',
          scrollMarginTop: '1.5rem',
        }}>
          <p style={{
            fontFamily: '"Inter", -apple-system, sans-serif',
            fontSize: '0.75rem',
            letterSpacing: '0.15em',
            color: '#8a8a8a',
            textTransform: 'uppercase',
            margin: '0 0 0.5rem 0',
          }}>
            #4 &middot; Doorstep
          </p>
          <h2 style={{
            fontFamily: '"Georgia", serif',
            fontSize: '1.375rem',
            fontWeight: 400,
            color: '#2a2a2a',
            marginBottom: '0.75rem',
            marginTop: 0,
          }}>
            A safer way to work through the AMA discharge
          </h2>
          <p style={{
            fontFamily: '"Georgia", serif',
            fontSize: '1rem',
            lineHeight: '1.7',
            color: '#4a4a4a',
            marginBottom: '1rem',
            marginTop: 0,
          }}>
            A patient leaving against medical advice (AMA) is one of the highest-risk discharges in inpatient medicine, and one of the least supported. The widely held belief is that a signed AMA form closes the encounter safely. On its own, it doesn&apos;t. The form documents that the patient left. It doesn&apos;t establish that the patient could safely decide to.
          </p>
          <p style={{
            fontFamily: '"Georgia", serif',
            fontSize: '1rem',
            lineHeight: '1.7',
            color: '#4a4a4a',
            marginBottom: '1rem',
            marginTop: 0,
          }}>
            What actually keeps the patient safe is the clinical work in front of the signature: deciding whether the patient has the capacity to refuse care, naming the specific risks of leaving, confirming the patient heard them, offering smaller steps they might accept, and looking for the reversible thing driving the decision &mdash; pain, intoxication, withdrawal, something fixable. That is the work that separates a patient who is refusing care from one who cannot currently consent to it.
          </p>
          <p style={{
            fontFamily: '"Georgia", serif',
            fontSize: '1rem',
            lineHeight: '1.7',
            color: '#4a4a4a',
            marginBottom: '1rem',
            marginTop: 0,
          }}>
            Almost none of that gets captured fully in real time, especially in middle-of-the-night encounters where the patient is agitated or refusing to engage. The gap isn&apos;t physician knowledge. Most of us know what should be assessed. The gap is capture, because there&apos;s no structured prompt at the moment the encounter is actually happening.
          </p>
          <p style={{
            fontFamily: '"Georgia", serif',
            fontSize: '1rem',
            lineHeight: '1.7',
            color: '#4a4a4a',
            marginBottom: '1.25rem',
            marginTop: 0,
          }}>
            Doorstep is a small documentation tool that walks a physician through the variables that matter for an AMA encounter, with structured fields, a curated risk library, and no language model in the stack. The output is a short chart-ready note a discharge summary can build on later &mdash; capturing what was actually assessed, not just that the form was signed. Built from public guidelines and synthetic cases. Not deployed in any clinical setting.
          </p>
          <a href="https://doorstep.floviken.se" target="_blank" rel="noopener noreferrer" style={{
            fontFamily: '"Inter", -apple-system, sans-serif',
            fontSize: '0.9375rem',
            color: '#2a332a',
            textDecoration: 'none',
            borderBottom: '1px solid #2a332a',
            paddingBottom: '1px',
          }}>
            Try it &rarr;
          </a>
          <p style={{
            fontFamily: '"Georgia", serif',
            fontSize: '0.875rem',
            fontStyle: 'italic',
            color: '#8a8a8a',
            marginTop: '0.75rem',
            marginBottom: 0,
          }}>
            Demonstration only. Live at doorstep.floviken.se.
          </p>
        </div>

        {/* #5 Sundown */}
        <div id="sundown" style={{
          borderBottom: '1px solid #e8e2d5',
          padding: '2rem 0',
          marginBottom: '1.5rem',
          scrollMarginTop: '1.5rem',
        }}>
          <p style={{
            fontFamily: '"Inter", -apple-system, sans-serif',
            fontSize: '0.75rem',
            letterSpacing: '0.15em',
            color: '#8a8a8a',
            textTransform: 'uppercase',
            margin: '0 0 0.5rem 0',
          }}>
            #5 &middot; Sundown
          </p>
          <h2 style={{
            fontFamily: '"Georgia", serif',
            fontSize: '1.375rem',
            fontWeight: 400,
            color: '#2a2a2a',
            marginBottom: '0.75rem',
            marginTop: 0,
          }}>
            Cross-cover at midnight
          </h2>
          <p style={{
            fontFamily: '"Georgia", serif',
            fontSize: '1rem',
            lineHeight: '1.7',
            color: '#4a4a4a',
            marginBottom: '1rem',
            marginTop: 0,
          }}>
            Agitated and delirious patients are a familiar overnight page for any hospitalist, and the answer is rarely straightforward. The night clinician is often cross-covering dozens of patients they haven&apos;t personally admitted, and the differential is wide &mdash; it could be a life-threatening cause that needs work-up now, or a patient who needs reorientation and a calm presence at the bedside. Delirium affects roughly one in five hospitalized older adults and is independently associated with longer length of stay, higher in-hospital mortality, falls, sitter requirements, and post-discharge cognitive decline.
          </p>
          <p style={{
            fontFamily: '"Georgia", serif',
            fontSize: '1rem',
            lineHeight: '1.7',
            color: '#4a4a4a',
            marginBottom: '1rem',
            marginTop: 0,
          }}>
            In most modern hospitals, the page arrives through a HIPAA-protected secure-messaging app on the clinician&apos;s phone. The standard-of-care workup is well-established. The difficulty is not knowledge. It&apos;s assembly under load. A thorough chart review at the moment of the page &mdash; the anticholinergic burden, the recent deliriogenic exposures, the missed urinalysis, the untouched bowel regimen, the QTc that matters if antipsychotics are considered &mdash; takes longer than the minute or two the hospitalist has before walking to the bedside, especially on a night when the emergency room is also calling.
          </p>
          <p style={{
            fontFamily: '"Georgia", serif',
            fontSize: '1rem',
            lineHeight: '1.7',
            color: '#4a4a4a',
            marginBottom: '1rem',
            marginTop: 0,
          }}>
            Sundown is a small experiment in what could happen in that minute. In the prototype, when a simulated secure message contains a delirium or agitation signal, a deterministic chart review runs against an evidence-anchored set of items &mdash; recent deliriogenic medications, anticholinergic burden, Foley status, last bowel movement, electrolytes, QTc, baseline cognitive status, sensory aids, recent procedures. Items that should be present but aren&apos;t are surfaced as gaps. The hospitalist reads one screen on the way to the bedside, walks in with the differential already narrowing, and gets to the assessment faster.
          </p>
          <p style={{
            fontFamily: '"Georgia", serif',
            fontSize: '1rem',
            lineHeight: '1.7',
            color: '#4a4a4a',
            marginBottom: '1rem',
            marginTop: 0,
          }}>
            Same shape as Lowfire and Foldspace. The chart and the references are the source of truth &mdash; Beers criteria, the anticholinergic burden calculator, AAFP and StatPearls workup standards. AI handles the language only. The clinician examines the patient and decides what matters.
          </p>
          <p style={{
            fontFamily: '"Inter", -apple-system, sans-serif',
            fontSize: '0.875rem',
            color: '#8a8a8a',
            marginBottom: 0,
            marginTop: 0,
          }}>
            In progress
          </p>
        </div>

        {/* #6 Margin */}
        <div id="margin" style={{
          borderBottom: '1px solid #e8e2d5',
          padding: '2rem 0',
          marginBottom: '1.5rem',
          scrollMarginTop: '1.5rem',
        }}>
          <p style={{
            fontFamily: '"Inter", -apple-system, sans-serif',
            fontSize: '0.75rem',
            letterSpacing: '0.15em',
            color: '#8a8a8a',
            textTransform: 'uppercase',
            margin: '0 0 0.5rem 0',
          }}>
            #6 &middot; Margin
          </p>
          <h2 style={{
            fontFamily: '"Georgia", serif',
            fontSize: '1.375rem',
            fontWeight: 400,
            color: '#2a2a2a',
            marginBottom: '0.75rem',
            marginTop: 0,
          }}>
            An experiment in surfacing imaging follow-up at discharge
          </h2>
          <p style={{
            fontFamily: '"Georgia", serif',
            fontSize: '1rem',
            lineHeight: '1.7',
            color: '#4a4a4a',
            marginBottom: '1rem',
            marginTop: 0,
          }}>
            Most clinical AI work in imaging focuses on detection &mdash; helping radiologists identify findings on the scan itself. Far less attention goes to what happens after the radiologist documents an incidental finding. The recommendation is often right there in the report. It just doesn&apos;t always make it into the discharge plan, the problem list, or the follow-up loop.
          </p>
          <p style={{
            fontFamily: '"Georgia", serif',
            fontSize: '1rem',
            lineHeight: '1.7',
            color: '#4a4a4a',
            marginBottom: '1rem',
            marginTop: 0,
          }}>
            Incidental findings on inpatient imaging &mdash; pulmonary nodules, adrenal masses, thyroid lesions &mdash; are routinely documented and routinely lost in the focus on the acute problem. Published follow-up rates for clinically significant incidentals frequently sit between thirty and sixty percent. Even when the radiologist explicitly recommends follow-up in the report, the recommendation often fails to reach the discharge plan. Chart review tends to focus on missed primary diagnoses, the findings that move billing and quality metrics. Incidental findings that won&apos;t change the index admission, but will matter six months later, get less scrutiny.
          </p>
          <p style={{
            fontFamily: '"Georgia", serif',
            fontSize: '1rem',
            lineHeight: '1.7',
            color: '#4a4a4a',
            marginBottom: '1rem',
            marginTop: 0,
          }}>
            Margin asks a narrow question. Could a language model reliably extract the radiologist&apos;s documented follow-up recommendations from a CT report, so a hospitalist could see them as a checklist at the moment of discharge?
          </p>
          <p style={{
            fontFamily: '"Georgia", serif',
            fontSize: '1rem',
            lineHeight: '1.7',
            color: '#4a4a4a',
            marginBottom: '1rem',
            marginTop: 0,
          }}>
            The clinician decides what to do with each finding. The model only surfaces what the radiologist already flagged.
          </p>
          <p style={{
            fontFamily: '"Georgia", serif',
            fontSize: '1rem',
            lineHeight: '1.7',
            color: '#4a4a4a',
            marginBottom: '1rem',
            marginTop: 0,
          }}>
            This room is a concept under development. The intended build evaluates the extraction layer against a corpus of publicly available CT reports with annotated ground truth, then wraps the validated extraction in a simple interface. A prototype, not a clinical tool. A recipe for what such a tool could be.
          </p>
          <p style={{
            fontFamily: '"Inter", -apple-system, sans-serif',
            fontSize: '0.875rem',
            color: '#8a8a8a',
            marginBottom: 0,
            marginTop: 0,
          }}>
            In progress
          </p>
        </div>

        {/* #7 Daybreak */}
        <div id="daybreak" style={{
          borderBottom: '1px solid #e8e2d5',
          padding: '2rem 0',
          marginBottom: '4rem',
          scrollMarginTop: '1.5rem',
        }}>
          <p style={{
            fontFamily: '"Inter", -apple-system, sans-serif',
            fontSize: '0.75rem',
            letterSpacing: '0.15em',
            color: '#8a8a8a',
            textTransform: 'uppercase',
            margin: '0 0 0.5rem 0',
          }}>
            #7 &middot; Daybreak
          </p>
          <h2 style={{
            fontFamily: '"Georgia", serif',
            fontSize: '1.375rem',
            fontWeight: 400,
            color: '#2a2a2a',
            marginBottom: '0.75rem',
            marginTop: 0,
          }}>
            The hour before rounds
          </h2>
          <p style={{
            fontFamily: '"Georgia", serif',
            fontSize: '1rem',
            lineHeight: '1.7',
            color: '#4a4a4a',
            marginBottom: '1rem',
            marginTop: 0,
          }}>
            Every morning in hospital medicine, before the day team arrives, the patient list has to be redistributed. Overnight admissions and consults from the swing and night shifts need to be folded into the existing service. Discharges from the prior day need to be removed. Patients carried over from yesterday need to stay, where possible, with the hospitalist who already knows them. The result has to be balanced &mdash; not by patient count, but by clinical load &mdash; and it has to be out before the day starts, because nurses, pharmacists, consultants, and families all depend on knowing whose name is next to whose patient.
          </p>
          <p style={{
            fontFamily: '"Georgia", serif',
            fontSize: '1rem',
            lineHeight: '1.7',
            color: '#4a4a4a',
            marginBottom: '1rem',
            marginTop: 0,
          }}>
            In most hospitals, this work is done by hand. Someone comes in early &mdash; sometimes a nurse, sometimes a physician &mdash; reads through charts, and makes judgment calls about which patient is heavier than which. The work is skilled, repetitive, and time-consuming. The clinical day cannot start until it is done.
          </p>
          <p style={{
            fontFamily: '"Georgia", serif',
            fontSize: '1rem',
            lineHeight: '1.7',
            color: '#4a4a4a',
            marginBottom: '1rem',
            marginTop: 0,
          }}>
            Daybreak asks a narrow question. Could a small piece of software, given a synthetic patient pool and a list of working hospitalists, produce a balanced morning assignment in two seconds &mdash; with the reasoning visible &mdash; that a human could accept, adjust, or override?
          </p>
          <p style={{
            fontFamily: '"Georgia", serif',
            fontSize: '1rem',
            lineHeight: '1.7',
            color: '#4a4a4a',
            marginBottom: '1rem',
            marginTop: 0,
          }}>
            The model is simple. Each patient gets a load score from four factors a chart can answer: number of active problems, level of care, day of stay, and primary versus consult status. ICU patients carry more weight than floor patients. New admits carry more weight than known patients. Consults carry less than primary. The scores are summed across hospitalists, and the optimizer balances total load &mdash; not patient count &mdash; while preserving continuity from the prior day where possible.
          </p>
          <p style={{
            fontFamily: '"Georgia", serif',
            fontSize: '1rem',
            lineHeight: '1.7',
            color: '#4a4a4a',
            marginBottom: '1rem',
            marginTop: 0,
          }}>
            The architectural commitment is that the model is legible. Every patient&apos;s load is the product of four numbers anyone can read. Every assignment can be explained in one sentence. The tool does not hide its reasoning behind a black box. A hospitalist looking at her list should be able to ask &ldquo;why did I get this patient?&rdquo; and get an honest answer.
          </p>
          <p style={{
            fontFamily: '"Georgia", serif',
            fontSize: '1rem',
            lineHeight: '1.7',
            color: '#4a4a4a',
            marginBottom: '1rem',
            marginTop: 0,
          }}>
            Synthetic data only. No EHR integration. A prototype, not a clinical tool. The point is to show that an hour of pre-shift labor could be a button.
          </p>
          <p style={{
            fontFamily: '"Inter", -apple-system, sans-serif',
            fontSize: '0.875rem',
            color: '#8a8a8a',
            marginBottom: 0,
            marginTop: 0,
          }}>
            In progress
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
          <a href="https://www.linkedin.com/in/richard-ahroon-md/" target="_blank" rel="noopener noreferrer" style={{ color: '#5a5a5a', textDecoration: 'none', borderBottom: '1px solid #d8d2c5', paddingBottom: '1px' }}>
            LinkedIn
          </a>
        </footer>

      </div>
    </main>
  );
}