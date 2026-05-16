export const metadata = {
  title: "Ghost Signout — Floviken",
  description: "The morning handoff, and what it doesn't see.",
};

const paragraph = {
  fontFamily: '"Georgia", serif',
  fontSize: '1rem',
  lineHeight: '1.7',
  color: '#4a4a4a',
  marginBottom: '1rem',
  marginTop: 0,
};

export default function GhostSignout() {
  return (
    <article>
      <p style={{
        fontFamily: '"Inter", -apple-system, sans-serif',
        fontSize: '0.75rem',
        letterSpacing: '0.15em',
        color: '#8a8a8a',
        textTransform: 'uppercase',
        margin: '0 0 0.5rem 0',
      }}>
        Ghost Signout
      </p>
      <h1 style={{
        fontFamily: '"Georgia", serif',
        fontSize: '1.75rem',
        fontWeight: 400,
        color: '#2a2a2a',
        marginBottom: '1.5rem',
        marginTop: 0,
      }}>
        What the morning handoff doesn&apos;t capture
      </h1>
      <p style={paragraph}>
        Morning handoff documents are written for the patients still on the inpatient service. In some cases, patients come off the service overnight. They leave against medical advice (AMA), transfer to a higher-level facility, or get admitted and discharged before sunrise. Those patients don&apos;t appear on the morning list the day team sees.
      </p>
      <p style={paragraph}>
        That&apos;s a clinical visibility gap. The patient who left AMA and still needs a follow-up call. The overnight lab result that needs day-team action. The middle-of-the-night transfer where the family couldn&apos;t be reached overnight and still needs to be contacted in the morning.
      </p>
      <p style={paragraph}>
        Ghost Signout is a small prototype I built that captures these events using structured fields during a hypothetical shift, then generates a clean morning document a day team could scan in 30 seconds. The categories are the ones that actually disappear: Expired, Inpatient Hospice, AMA, Transfer Out, Admit &amp; Discharge, and Critical Follow-up.
      </p>
      <p style={{ ...paragraph, marginBottom: '1.25rem' }}>
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
    </article>
  );
}
