import { tileMetadata } from "@/app/_components/tile-data";
import { BackLink } from "@/app/_components/ActionTile";

export const metadata = tileMetadata("margin");

const paragraph = {
  fontFamily: '"Georgia", serif',
  fontSize: '1rem',
  lineHeight: '1.7',
  color: '#4a4a4a',
  marginBottom: '1rem',
  marginTop: 0,
};

const sectionLabel = {
  fontWeight: 700,
  color: '#2a2a2a',
};

const buttonRow = {
  textAlign: 'center',
  marginTop: '2.5rem',
  marginBottom: '1.25rem',
};

const buttonStyle = {
  display: 'inline-block',
  fontFamily: '"Inter", -apple-system, sans-serif',
  fontSize: '0.875rem',
  letterSpacing: '0.04em',
  color: '#2a2a2a',
  textDecoration: 'none',
  border: '1px solid #c8c2b5',
  borderRadius: '4px',
  padding: '12px 22px',
};

const statusLine = {
  fontFamily: '"Inter", -apple-system, sans-serif',
  fontSize: '0.75rem',
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: '#8a8a8a',
  textAlign: 'center',
  marginTop: '1.25rem',
  marginBottom: '1rem',
};

export default function Margin() {
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
        Margin
      </p>
      <h1 style={{
        fontFamily: '"Georgia", serif',
        fontSize: '1.75rem',
        fontWeight: 400,
        color: '#2a2a2a',
        marginBottom: '1.5rem',
        marginTop: 0,
      }}>
        Margin &mdash; surfacing radiology findings to the problem list
      </h1>
      <p style={paragraph}>
        <strong style={sectionLabel}>Background.</strong> Radiology reports document findings beyond the primary indication. Some are acted on during the admission; many are not. The active problem list, the structured field that carries forward through encounters and discharge documents, frequently lags behind the radiology impression. Findings remain in free-text fields, accessible by chart review but not surfaced for prospective review.
      </p>
      <p style={paragraph}>
        <strong style={sectionLabel}>Hypothesis.</strong> A language model with appropriate guardrails can extract structured proposals from a radiology report, identify which findings are not already represented on the active problem list, and present them for clinician verification. The clinician retains sole authority over the problem list. The agent&apos;s role is restricted to extraction, comparison, and surfacing.
      </p>
      <p style={paragraph}>
        <strong style={sectionLabel}>Method.</strong> Margin reads the full text of a radiology report, identifies discrete findings, compares each finding&apos;s likely ICD-10 representation against the patient&apos;s active problem list, and outputs structured proposals for findings not already present. Each proposal contains a verbatim excerpt from the source report, the radiologist&apos;s hedging language, the documented recommendation when present, a suggested ICD-10 code, and an extraction confidence label. The source excerpt is verbatim-validated against the report text server-side; mismatches are rejected before the proposal reaches the clinician.
      </p>
      <p style={paragraph}>
        <strong style={sectionLabel}>Verification loop.</strong> The hospitalist reviews each proposal and selects an action: verify (the finding is added to the active problem list with a source badge linking to the originating report), reject (the proposal is discarded), or defer (the proposal remains pending). Every action is recorded in an append-only audit log with timestamp and acting clinician. Verified findings retain their source link permanently and can be removed if entered in error, in which case the original proposal returns to pending.
      </p>
      <p style={paragraph}>
        <strong style={sectionLabel}>Integration.</strong> Margin runs against radiology reports in the synthetic Keel EMR. Pending proposals appear on the AI tab of the affected patient&apos;s chart; verified findings appear in the Active Problems list with provenance preserved. Aggregated state across the dataset is visible on the Keel control panel.
      </p>
      <p style={paragraph}>
        <strong style={sectionLabel}>Status.</strong> Live. The experiment is deployed against the Keel synthetic dataset (18 patients, 6 of whom have Margin activity) and is observable at keel.floviken.se.
      </p>

      <div style={buttonRow}>
        <a
          href="https://keel.floviken.se/patients/1?section=ai"
          target="_blank"
          rel="noopener noreferrer"
          style={buttonStyle}
        >
          Open Margin in Keel &rarr;
        </a>
      </div>

      <div style={statusLine}>05 &middot; Live</div>

      <BackLink />
    </article>
  );
}
