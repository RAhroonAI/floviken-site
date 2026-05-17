import { tileMetadata } from "@/app/_components/tile-data";
import { ClosingTile, BackLink } from "@/app/_components/ActionTile";

export const metadata = tileMetadata("lowfire");

const paragraph = {
  fontFamily: '"Georgia", serif',
  fontSize: '1rem',
  lineHeight: '1.7',
  color: '#4a4a4a',
  marginBottom: '1rem',
  marginTop: 0,
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
        The 60-minute window
      </h1>
      <p style={paragraph}>
        Neutropenic fever is defined as an absolute neutrophil count below 500 paired with fever, and it has a 60-minute window for empiric antibiotics. Every hour of delay correlates with worse outcomes. The decision tree for which antibiotic class to start is well-defined and has been for years in the IDSA guidelines.
      </p>
      <p style={paragraph}>
        Most EHRs surface the lab abnormality. Most stop there. The clinician still has to recognize the pattern, recall the guideline, and translate it into orders, often under time pressure during a busy admission.
      </p>
      <p style={paragraph}>
        Lowfire is a small experiment in what comes after the alert. A deterministic algorithm encodes the IDSA / ASCO guideline and produces the orders &mdash; antibiotic class, cultures, ancillary, monitoring. An AI then voices the recommendation as a hospitalist colleague would. The clinician signs or overrides.
      </p>
      <p style={paragraph}>
        The architectural commitment is that the recommendation never comes from the AI. The algorithm is the source of truth. Claude only handles the language. Antibiotic names are redacted to drug class with no dosing recommendations, so there can be no confusion that this is anything but a prototype. Same shape as Foldspace, applied to actionable orders this time.
      </p>
      <p style={{
        fontFamily: '"Georgia", serif',
        fontSize: '0.875rem',
        fontStyle: 'italic',
        color: '#8a8a8a',
        marginTop: 0,
        marginBottom: 0,
      }}>
        Demonstration only.
      </p>

      <ClosingTile slug="lowfire" />
      <BackLink />
    </article>
  );
}
