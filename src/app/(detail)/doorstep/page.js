import { tileMetadata } from "@/app/_components/tile-data";
import { ClosingTile, BackLink } from "@/app/_components/ActionTile";

export const metadata = tileMetadata("doorstep");

const paragraph = {
  fontFamily: '"Georgia", serif',
  fontSize: '1rem',
  lineHeight: '1.7',
  color: '#4a4a4a',
  marginBottom: '1rem',
  marginTop: 0,
};

export default function Doorstep() {
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
        Doorstep
      </p>
      <h1 style={{
        fontFamily: '"Georgia", serif',
        fontSize: '1.75rem',
        fontWeight: 400,
        color: '#2a2a2a',
        marginBottom: '1.5rem',
        marginTop: 0,
      }}>
        A safer way to work through the AMA discharge
      </h1>
      <p style={paragraph}>
        A patient leaving against medical advice (AMA) is one of the highest-risk discharges in inpatient medicine, and one of the least supported. The widely held belief is that a signed AMA form closes the encounter safely. On its own, it doesn&apos;t. The form documents that the patient left. It doesn&apos;t establish that the patient could safely decide to.
      </p>
      <p style={paragraph}>
        What actually keeps the patient safe is the clinical work in front of the signature: assessing whether the patient has the capacity to refuse care, naming the specific risks of leaving, confirming the patient heard them, offering smaller steps they might accept, and looking for the reversible thing driving the decision &mdash; pain, intoxication, withdrawal, something fixable. That is the work that separates a patient who is refusing care from one who cannot currently consent to it.
      </p>
      <p style={paragraph}>
        Almost none of that gets captured fully in real time, especially in middle-of-the-night encounters where the patient is agitated or refusing to engage. The gap isn&apos;t physician knowledge. Most of us know what should be assessed. The gap is capture, because there&apos;s no structured prompt at the moment the encounter is actually happening.
      </p>
      <p style={paragraph}>
        Doorstep is a small documentation tool that walks a physician through the variables that matter for an AMA encounter, with structured fields, a curated risk library, and no language model in the stack. The output is a short chart-ready note a discharge summary can build on later &mdash; capturing what was actually assessed, not just that the form was signed. Built from public guidelines and synthetic cases. Not deployed in any clinical setting.
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

      <ClosingTile slug="doorstep" />
      <BackLink />
    </article>
  );
}
