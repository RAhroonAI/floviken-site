{/* #3 Lowfire */}
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
    The architectural commitment is that the recommendation never comes from the AI. The algorithm is the source of truth. Claude only handles the language. Same shape as Foldspace, applied to actionable orders this time.
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
    marginBottom: '0.5rem',
  }}>
    Demonstration only. All drug names redacted to class level. Live at lowfire.floviken.se.
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