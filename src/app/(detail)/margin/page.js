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

const bulletList = {
  fontFamily: '"Georgia", serif',
  fontSize: '1rem',
  lineHeight: '1.7',
  color: '#4a4a4a',
  marginTop: 0,
  marginBottom: '1rem',
  paddingLeft: '1.5rem',
};

const bulletItem = {
  marginBottom: '0.25rem',
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
        <strong style={sectionLabel}>Background.</strong> When a patient is admitted with an acute problem &mdash; heart failure, pneumonia, a bowel obstruction &mdash; the hospitalist&apos;s attention is pulled to that problem. Stabilizing the patient, managing complications, planning the discharge. Imaging gets ordered for the acute issue. The radiologist reads the study and may document additional findings unrelated to the reason for admission. A small adrenal nodule. Hepatic steatosis. A pulmonary nodule. These findings are real and clinically meaningful, but they&apos;re not the reason the patient is in the hospital.
      </p>
      <p style={paragraph}>
        The hospitalist has to notice them. They have to decide whether to add them to the active problem list so the outpatient team knows. Under the pressure of the acute admission and the volume of incoming data, this step can be missed. The finding stays in the radiology report. It never becomes a problem the chart carries forward.
      </p>
      <p style={paragraph}>
        <strong style={sectionLabel}>Hypothesis.</strong> A language model can read a radiology report, identify findings that are not already on the problem list, and propose them for the hospitalist to verify. The clinician adds them, rejects them, or leaves them pending. The agent never edits the chart on its own.
      </p>
      <p style={paragraph}>
        <strong style={sectionLabel}>Method.</strong> Margin reads the full text of each radiology report. For every finding the agent identifies, it generates a proposal containing five fields:
      </p>
      <ul style={bulletList}>
        <li style={bulletItem}>A verbatim excerpt from the report</li>
        <li style={bulletItem}>The radiologist&apos;s hedging language</li>
        <li style={bulletItem}>The radiologist&apos;s recommendation (if one is documented)</li>
        <li style={bulletItem}>A suggested ICD-10 code</li>
        <li style={bulletItem}>An extraction confidence label</li>
      </ul>
      <p style={paragraph}>
        The excerpt is verbatim-validated against the source report on the server. Proposals with mismatched excerpts are rejected before they reach the clinician.
      </p>
      <p style={paragraph}>
        <strong style={sectionLabel}>Verification loop.</strong> The hospitalist sees each proposal and acts on it. Three actions are possible:
      </p>
      <ul style={bulletList}>
        <li style={bulletItem}>
          <strong style={sectionLabel}>Verify.</strong> The finding is added to the active problem list. It carries a source badge linking back to the original report.
        </li>
        <li style={bulletItem}>
          <strong style={sectionLabel}>Reject.</strong> The proposal is discarded.
        </li>
        <li style={bulletItem}>
          <strong style={sectionLabel}>Defer.</strong> The proposal stays pending for later review.
        </li>
      </ul>
      <p style={paragraph}>
        Verified findings remain on the problem list indefinitely. If a finding was added in error, the hospitalist can remove it. The original proposal returns to pending in case it needs to be re-reviewed.
      </p>
      <p style={paragraph}>
        Every action &mdash; verify, reject, defer, remove &mdash; is recorded in an append-only audit log with timestamp and clinician name.
      </p>
      <p style={paragraph}>
        <strong style={sectionLabel}>Integration.</strong> Margin runs against the radiology reports in the Keel synthetic EMR. Pending proposals appear on the AI tab of the affected patient&apos;s chart. Verified findings appear on the Active Problems list with the source link preserved. Aggregated activity across the dataset is visible on the Keel control panel.
      </p>
      <p style={paragraph}>
        <strong style={sectionLabel}>Status.</strong> Live. The experiment is deployed against 18 synthetic patients. Margin has activity on 6 imaging studies.
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
