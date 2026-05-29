import { tileMetadata } from "@/app/_components/tile-data";
import { BackLink } from "@/app/_components/ActionTile";

export const metadata = tileMetadata("lowfire");

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

const closingLine = {
  fontFamily: '"Georgia", serif',
  fontSize: '1rem',
  lineHeight: '1.7',
  textAlign: 'center',
  marginTop: '2.5rem',
  marginBottom: '1.25rem',
};

const closingLink = {
  color: '#2a2a2a',
  textDecoration: 'underline',
  textUnderlineOffset: '3px',
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

export default function Lowfire() {
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
        Lowfire
      </p>
      <h1 style={{
        fontFamily: '"Georgia", serif',
        fontSize: '1.75rem',
        fontWeight: 400,
        color: '#2a2a2a',
        marginBottom: '1.5rem',
        marginTop: 0,
      }}>
        Lowfire &mdash; the 60-minute window
      </h1>
      <p style={paragraph}>
        <strong style={sectionLabel}>Background.</strong> Neutropenic fever is an oncologic emergency. An absolute neutrophil count below 500 paired with a temperature of 38.3&deg;C or higher carries a 60-minute window for empiric antibiotics, and every hour of delay correlates with worse outcomes. The IDSA and ASCO decision trees for which antibiotic class to start are well-defined and have been for years.
      </p>
      <p style={paragraph}>
        Most EHRs surface the lab abnormality. Most stop there. The clinician still has to recognize the pattern, recall the guideline, and translate it into orders, often under time pressure during a busy admission.
      </p>
      <p style={paragraph}>
        <strong style={sectionLabel}>Hypothesis.</strong> A deterministic algorithm can encode the IDSA / ASCO empiric coverage decision and present it as orders for the clinician to sign or override. The recommendation never comes from the model. The algorithm is the source of truth. Claude only voices the recommendation in colleague register.
      </p>
      <p style={paragraph}>
        <strong style={sectionLabel}>Method.</strong> Lowfire watches the chart for an ANC below 500 paired with a temperature of 38.3&deg;C or higher. When the criteria are met, it runs the deterministic algorithm against chart values:
      </p>
      <ul style={bulletList}>
        <li style={bulletItem}>Renal function, MDR colonization history, central-line presence, and hemodynamic stability are read from the chart where present and defaulted where silent</li>
        <li style={bulletItem}>The algorithm produces a bundle &mdash; antibiotic class, cultures, ancillary labs, monitoring and nursing actions</li>
        <li style={bulletItem}>The bundle is redacted to drug-class level with no dosing before any text is sent to the model</li>
        <li style={bulletItem}>Claude voices the recommendation as a hospitalist colleague would</li>
      </ul>
      <p style={paragraph}>
        Same shape as Foldspace, applied to actionable orders this time.
      </p>
      <p style={paragraph}>
        <strong style={sectionLabel}>Verification loop.</strong> The clinician signs or overrides. A signature writes the class-level antibiotics to the patient&apos;s inpatient medication list and adds &ldquo;Neutropenic fever&rdquo; to the active problem list, through the same gated chart-write path Margin uses. An override writes nothing. Because the data are synthetic and the orders never leave Keel, this is a demonstration of the loop, not clinical care.
      </p>
      <p style={paragraph}>
        <strong style={sectionLabel}>Integration.</strong> Lowfire runs against the Keel synthetic EMR and triggers on any patient meeting the criteria. The recommendation surfaces as a second-opinion panel on the affected chart. Lowfire was first shipped as a standalone tool at <a href="https://lowfire.floviken.se" target="_blank" rel="noopener noreferrer" style={closingLink}>lowfire.floviken.se</a>; the canonical version now lives as an agent inside Keel. The antibiotics it starts are inpatient medications, so the existing discharge reconciliation discontinues them at discharge &mdash; the experiments compose.
      </p>
      <p style={paragraph}>
        <strong style={sectionLabel}>Status.</strong> Live. Deployed against the 18 synthetic patients in Keel, plus the two seeded neutropenic-fever patients &mdash; Volkov and Karenin &mdash; in the Emergency Room.
      </p>

      <p style={closingLine}>
        <a
          href="https://keel.floviken.se/patients/25"
          target="_blank"
          rel="noopener noreferrer"
          style={closingLink}
        >
          Open Lowfire in Keel &rarr;
        </a>
      </p>

      <div style={statusLine}>03 &middot; Live</div>

      <BackLink />
    </article>
  );
}
