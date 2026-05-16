export const metadata = {
  title: "Foldspace — Floviken",
  description: "A clinician's drug-target briefing in 60 seconds.",
};

const paragraph = {
  fontFamily: '"Georgia", serif',
  fontSize: '1rem',
  lineHeight: '1.7',
  color: '#4a4a4a',
  marginBottom: '1rem',
  marginTop: 0,
};

export default function Foldspace() {
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
        Foldspace
      </p>
      <h1 style={{
        fontFamily: '"Georgia", serif',
        fontSize: '1.75rem',
        fontWeight: 400,
        color: '#2a2a2a',
        marginBottom: '1.5rem',
        marginTop: 0,
      }}>
        A clinician&apos;s drug-target briefing in 60 seconds
      </h1>
      <p style={paragraph}>
        Foldspace is a small experiment in data integrity, run in one of the most exciting spaces in science right now &mdash; drug discovery, protein folding, and the molecular biology of human disease. AlphaFold has computed predicted structures for nearly every known protein. UniProt has curated the functional annotations. ChEMBL has logged decades of bioactivity data. The raw material is open and current.
      </p>
      <p style={paragraph}>
        The experiment: type a UniProt ID, get a one-page clinical briefing in 60 seconds &mdash; function, clinical relevance, approved drugs, structural confidence. The data comes from those three sources, fetched live every time. AI writes the language; the data is never recalled from training. The model isn&apos;t the source. It&apos;s the translator.
      </p>
      <p style={{ ...paragraph, marginBottom: '1.25rem' }}>
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
    </article>
  );
}
