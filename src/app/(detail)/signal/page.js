export const metadata = {
  title: "Send a signal — Floviken",
  description: "Working on something nearby in clinical AI? Let's talk.",
};

export default function Signal() {
  return (
    <article>
      <h1 style={{
        fontFamily: '"Georgia", serif',
        fontSize: '2rem',
        fontWeight: 400,
        color: '#2a2a2a',
        marginTop: 0,
        marginBottom: '2rem',
      }}>
        Send a signal
      </h1>

      <div style={{
        fontFamily: '"Georgia", "Times New Roman", serif',
        fontSize: '1.0625rem',
        lineHeight: '1.7',
        color: '#3a3a3a',
      }}>
        <p style={{ margin: 0 }}>
          I&apos;m interested in hearing from clinicians, researchers, and builders working at the intersection of medicine and AI &mdash; particularly hospitalist workflow, clinical decision support, and drug discovery. If something here resonates with what you&apos;re doing, send a signal.
        </p>
      </div>
    </article>
  );
}
