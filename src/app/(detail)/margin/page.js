import { tileMetadata } from "@/app/_components/tile-data";
import { ClosingTile, BackLink } from "@/app/_components/ActionTile";

export const metadata = tileMetadata("margin");

const paragraph = {
  fontFamily: '"Georgia", serif',
  fontSize: '1rem',
  lineHeight: '1.7',
  color: '#4a4a4a',
  marginBottom: '1rem',
  marginTop: 0,
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
        An experiment in surfacing imaging follow-up at discharge
      </h1>
      <p style={paragraph}>
        Most clinical AI work in imaging focuses on detection &mdash; helping radiologists identify findings on the scan itself. Far less attention goes to what happens after the radiologist documents an incidental finding. The recommendation is often right there in the report. It just doesn&apos;t always make it into the discharge plan, the problem list, or the follow-up loop.
      </p>
      <p style={paragraph}>
        Incidental findings on inpatient imaging &mdash; pulmonary nodules, adrenal masses, thyroid lesions &mdash; are routinely documented and routinely lost in the focus on the acute problem. Published follow-up rates for clinically significant incidentals frequently sit between thirty and sixty percent. Even when the radiologist explicitly recommends follow-up in the report, the recommendation often fails to reach the discharge plan. Chart review tends to focus on missed primary diagnoses, the findings that move billing and quality metrics. Incidental findings that won&apos;t change the index admission, but will matter six months later, get less scrutiny.
      </p>
      <p style={paragraph}>
        Margin asks a narrow question. Could a language model reliably extract the radiologist&apos;s documented follow-up recommendations from a CT report, so a hospitalist could see them as a checklist at the moment of discharge?
      </p>
      <p style={paragraph}>
        The clinician decides what to do with each finding. The model only surfaces what the radiologist already flagged.
      </p>
      <p style={paragraph}>
        This room is a concept under development. The intended build evaluates the extraction layer against a corpus of publicly available CT reports with annotated ground truth, then wraps the validated extraction in a simple interface. A prototype, not a clinical tool. A recipe for what such a tool could be.
      </p>

      <ClosingTile slug="margin" />
      <BackLink />
    </article>
  );
}
