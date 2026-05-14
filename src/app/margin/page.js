export const metadata = {
  title: "Margin — Floviken",
  description: "An experiment in chart review for incidental findings.",
};

export default function Margin() {
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
          <a href="/" style={{
            fontFamily: '"Inter", -apple-system, sans-serif',
            fontSize: '0.875rem',
            letterSpacing: '0.05em',
            color: '#5a5a5a',
            textDecoration: 'none',
            borderBottom: '1px solid #d8d2c5',
            paddingBottom: '1px',
          }}>
            &larr; Floviken
          </a>
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
          Margin
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
          An experiment in chart review for incidental findings
        </p>

        <div style={{
          fontFamily: '"Georgia", "Times New Roman", serif',
          fontSize: '1.0625rem',
          lineHeight: '1.7',
          color: '#3a3a3a',
          marginBottom: '3rem',
          textAlign: 'left',
          maxWidth: '540px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          <p style={{ margin: '0 0 1rem 0' }}>
            Incidental findings on inpatient imaging &mdash; pulmonary nodules, adrenal masses, thyroid lesions &mdash; are routinely documented by radiologists and routinely lost in the focus on the acute problem. Published follow-up rates for clinically significant incidentals frequently sit between thirty and sixty percent.
          </p>
          <p style={{ margin: '0 0 1rem 0' }}>
            Margin asks a narrow question. Given a chest CT report and a discharge summary, can a language model reliably identify whether a documented pulmonary nodule was appropriately addressed in the discharge plan?
          </p>
          <p style={{ margin: '0 0 1rem 0' }}>
            The experiment uses thirty fully synthetic charts, generated and locked to known ground truth, then reviewed by a separate model session with no memory of the construction. The point is not a statistically rigorous finding. The point is a reusable methodology: a prompt, a set of cases, a scoring approach, and an honest report of where the model succeeded and where it failed. A recipe, not a result.
          </p>
          <p style={{ margin: 0 }}>
            All synthetic cases, prompts, and code will be published openly when the room ships.
          </p>
        </div>

        <div style={{
          maxWidth: '540px',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginBottom: '4rem',
        }}>
          <p style={{
            fontFamily: '"Inter", -apple-system, sans-serif',
            fontSize: '0.875rem',
            color: '#8a8a8a',
            margin: 0,
          }}>
            In progress.
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
