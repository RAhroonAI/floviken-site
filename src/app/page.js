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
            I&apos;m Richard Ahroon &mdash; board-certified internist, US/Swedish dual citizen based in Sweden, with active clinical practice in the United States. Trained in biomedical engineering &mdash; a long-standing interest in where clinical medicine meets technology.
          </p>
          <p style={{ margin: '0 0 1rem 0' }}>
            My day-to-day work spans inpatient hospital medicine, critical care, and AI-enabled tools &mdash; ambient documentation, clinical decision support, alert systems for sepsis and deterioration. I&apos;ve seen firsthand where these tools help and where they fall short.
          </p>
          <p style={{ margin: '0 0 1rem 0' }}>
            I build small clinical AI experiments aimed at workflow gaps I see in real shifts &mdash; handoff visibility, time-critical decision support, high-risk encounter documentation. Independent projects, not deployed in any clinical setting.
          </p>
          <p style={{ margin: 0 }}>
            If you&apos;re working on clinical AI and want a clinician&apos;s perspective &mdash; or you&apos;re a clinician thinking about getting closer to the tech side &mdash; I&apos;d like to hear from you.
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

        {/* #1 Svenska */}
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
            I built this to prepare for the Swedish language proficiency exam required for foreign-trained physicians. The existing tools weren&apos;t built around how I study or where my actual gaps were &mdash; so I made one that is. AI generates the questions, grades the essays, and adapts to the things I keep getting wrong.
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

        {/* #2 Ghost Signout */}
        <div style={{
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
            #2 &middot; Ghost Signout
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
            Morning handoff documents are written for the patients still on the inpatient service. In some cases, patients come off the service overnight &mdash; they leave against medical advice (AMA), transfer to a higher-level facility, or get admitted and discharged before sunrise &mdash; and those patients don&apos;t appear on the morning list the day team sees.
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
            Ghost Signout is a small tool I built to capture these events as they happen during a shift, then generate a clean morning document the day team can scan in 30 seconds. The categories are the ones that actually disappear: Expired, Inpatient Hospice, AMA, Transfer Out, Admit &amp; Discharge, and Critical Follow-up.
          </p>
          <p style={{
            fontFamily: '"Georgia", serif',
            fontSize: '1rem',
            lineHeight: '1.7',
            color: '#4a4a4a',
            marginBottom: '1.25rem',
            marginTop: 0,
          }}>
            The capture pattern is intentionally simple &mdash; six taps, structured fields, AI-generated summary &mdash; so it could live as a standalone tool or as a module inside an existing EHR workflow.
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
            marginBottom: '0.5rem',
          }}>
            Synthetic data only &mdash; currently a single-user prototype.
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

        {/* #3 Neutropenic Fever */}
        <div style={{
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
            #3 &middot; Neutropenic Fever Decision Support
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
            Neutropenic fever &mdash; an absolute neutrophil count below 500 paired with fever &mdash; has a 60-minute window for empiric antibiotics. Every hour of delay correlates with worse outcomes. The decision tree for which antibiotic class to start is well-defined and has been for years in the IDSA guidelines.
          </p>
          <p style={{
            fontFamily: '"Georgia", serif',
            fontSize: '1rem',
            lineHeight: '1.7',
            color: '#4a4a4a',
            marginBottom: '1rem',
            marginTop: 0,
          }}>
            Most EHRs surface the lab abnormality. Most stop there. The clinician still has to recognize the pattern, recall the guideline, and translate it into orders &mdash; under time pressure, often during a busy admission.
          </p>
          <p style={{
            fontFamily: '"Georgia", serif',
            fontSize: '1rem',
            lineHeight: '1.7',
            color: '#4a4a4a',
            marginBottom: '1rem',
            marginTop: 0,
          }}>
            This is a proof of concept for what surfacing the recommendation alongside the lab could look like. The tool takes a small set of inputs &mdash; ANC, temperature, allergies, renal function, prior multidrug-resistant organisms, severe sepsis features &mdash; and walks visibly through the IDSA decision tree, ending with a guideline-grounded antibiotic class recommendation and the reasoning that produced it. Most clinical AI shows you an answer. This one shows you how it got there &mdash; so the clinician can confirm each step, not just trust the output.
          </p>
          <p style={{
            fontFamily: '"Georgia", serif',
            fontSize: '0.875rem',
            fontStyle: 'italic',
            color: '#8a8a8a',
            marginBottom: '0.5rem',
            marginTop: 0,
          }}>
            Demonstration only &mdash; not a clinical tool, not deployed in any real workflow.
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

        {/* #4 AMA Documentation */}
        <div style={{
          borderBottom: '1px solid #e8e2d5',
          padding: '2rem 0',
          marginBottom: '4rem',
        }}>
          <p style={{
            fontFamily: '"Inter", -apple-system, sans-serif',
            fontSize: '0.75rem',
            letterSpacing: '0.15em',
            color: '#8a8a8a',
            textTransform: 'uppercase',
            margin: '0 0 0.5rem 0',
          }}>
            #4 &middot; AMA Documentation
          </p>
          <h2 style={{
            fontFamily: '"Georgia", serif',
            fontSize: '1.375rem',
            fontWeight: 400,
            color: '#2a2a2a',
            marginBottom: '0.75rem',
            marginTop: 0,
          }}>
            Where &ldquo;patient signed AMA&rdquo; stops being protection
          </h2>
          <p style={{
            fontFamily: '"Georgia", serif',
            fontSize: '1rem',
            lineHeight: '1.7',
            color: '#4a4a4a',
            marginBottom: '1rem',
            marginTop: 0,
          }}>
            A patient leaving against medical advice &mdash; AMA &mdash; is one of the highest-risk discharges in inpatient medicine. The widely held belief is that a signed AMA form is sufficient legal and clinical protection. It isn&apos;t. The signed form is one of the least important pieces. What actually matters is whether the chart shows the physician assessed decision-making capacity, named the specific risks (often including death), confirmed the patient&apos;s understanding, offered alternatives, and addressed reversible factors &mdash; pain, intoxication, undertreated psychiatric symptoms.
          </p>
          <p style={{
            fontFamily: '"Georgia", serif',
            fontSize: '1rem',
            lineHeight: '1.7',
            color: '#4a4a4a',
            marginBottom: '1rem',
            marginTop: 0,
          }}>
            Almost none of that gets captured fully in real time, especially at 2 a.m. with a hostile patient. The gap isn&apos;t physician knowledge &mdash; most of us know what should be documented. The gap is capture: there&apos;s no structured prompt at the moment the encounter is actually happening.
          </p>
          <p style={{
            fontFamily: '"Georgia", serif',
            fontSize: '1rem',
            lineHeight: '1.7',
            color: '#4a4a4a',
            marginBottom: '1rem',
            marginTop: 0,
          }}>
            I&apos;m building a small documentation checklist tool that walks a physician through the variables that matter for an AMA encounter &mdash; structured fields, evidence-grounded prompts, AI-assisted summary generation. The output is a chart-ready note that captures what was actually assessed, not just that the form was signed.
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
          <a href="https://linkedin.com/in/richard-ahroon" target="_blank" rel="noopener noreferrer" style={{ color: '#5a5a5a', textDecoration: 'none', borderBottom: '1px solid #d8d2c5', paddingBottom: '1px' }}>
            LinkedIn
          </a>
        </footer>

      </div>
    </main>
  );
}