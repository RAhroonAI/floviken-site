import { tileMetadata } from "@/app/_components/tile-data";
import { BackLink } from "@/app/_components/ActionTile";

export const metadata = tileMetadata("wake", {
  description: "The morning handoff, and what it doesn't see.",
});

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
  marginBottom: '0.75rem',
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

const secondaryRow = {
  textAlign: 'center',
  marginTop: 0,
  marginBottom: '1.25rem',
};

const secondaryLinkStyle = {
  fontFamily: '"Inter", -apple-system, sans-serif',
  fontSize: '0.8125rem',
  letterSpacing: '0.02em',
  color: '#8a8a8a',
  textDecoration: 'none',
  borderBottom: '1px solid #d8d2c5',
  paddingBottom: '1px',
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

export default function Wake() {
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
        Wake
      </p>
      <h1 style={{
        fontFamily: '"Georgia", serif',
        fontSize: '1.75rem',
        fontWeight: 400,
        color: '#2a2a2a',
        marginBottom: '1.5rem',
        marginTop: 0,
      }}>
        Wake &mdash; surfacing overnight departures and reconciling them with the chart
      </h1>
      <p style={paragraph}>
        <strong style={sectionLabel}>Background.</strong> Morning handoff documents are written for the patients still on the service. But some patients come off the service overnight &mdash; they die, transfer to hospice, leave against medical advice, transfer to a higher-level facility, or are admitted and discharged before morning. By the time the day team rounds, those patients are gone from the active list. The census shows who is in the beds; it is silent on what happened to the people who are not.
      </p>
      <p style={paragraph}>
        That silence is a clinical visibility gap. The patient who left AMA and still needs a follow-up call. The overnight result that needs day-team action. The transfer where the family could not be reached and still has to be contacted in the morning. And the EMR&apos;s own status fields cannot always express what happened &mdash; there is no state to mark a patient as deceased &mdash; so a patient who died overnight can still appear active on the morning list.
      </p>
      <p style={paragraph}>
        <strong style={sectionLabel}>Hypothesis.</strong> A language model can take the disposition events a clinician captures across a shift and synthesize them into a handoff the day team can scan in thirty seconds &mdash; while the structured fields behind each event, not the model, decide what is still outstanding. And because each disposition names a real patient, the same event can reconcile the chart: move the patient off the active list to where they belong. The clinician confirms each reconciliation. The agent never changes the chart on its own, and the model only writes language &mdash; it never invents a clinical fact and never judges clinical state.
      </p>
      <p style={paragraph}>
        <strong style={sectionLabel}>Method.</strong> Wake captures six categories &mdash; the dispositions that actually remove a patient from the list:
      </p>
      <ul style={bulletList}>
        <li style={bulletItem}>Critical Follow-up</li>
        <li style={bulletItem}>Expired</li>
        <li style={bulletItem}>Inpatient Hospice</li>
        <li style={bulletItem}>AMA</li>
        <li style={bulletItem}>Transfer Out</li>
        <li style={bulletItem}>Admit &amp; Discharge</li>
      </ul>
      <p style={paragraph}>
        During a shift, each event is logged in a few taps: the category, the patient, the time, a free-text note, and &mdash; for the dispositions that carry an unfinished task &mdash; structured fields (death certificate signed, family notified, transfer destination, capacity assessed). At sign-off, the model assembles the events into a categorized morning document. Two rules hold the boundary:
      </p>
      <ul style={bulletList}>
        <li style={bulletItem}>
          The structured fields, evaluated in code, decide every PENDING flag &mdash; the unfinished items the day team must pick up. The model renders those flags; it never infers them.
        </li>
        <li style={bulletItem}>
          The summary contains nothing the clinician did not enter. The model tightens language; it does not add clinical fact.
        </li>
      </ul>
      <p style={paragraph}>
        <strong style={sectionLabel}>Reconciliation loop.</strong> Each captured departure can be reconciled into the chart, and the clinician decides each one. The action depends on the disposition:
      </p>
      <ul style={bulletList}>
        <li style={bulletItem}>
          <strong style={sectionLabel}>Transfer Out, Inpatient Hospice, Admit &amp; Discharge.</strong> The patient is discharged through Keel&apos;s own discharge path: the status moves, the encounter closes, medications reconcile, and a discharge event is recorded.
        </li>
        <li style={bulletItem}>
          <strong style={sectionLabel}>Expired.</strong> The patient moves to a deceased state. Keel had no way to represent a death; Wake adds one. The patient leaves the active list and does not appear on the discharged list either.
        </li>
        <li style={bulletItem}>
          <strong style={sectionLabel}>AMA.</strong> Wake does not close it. An against-medical-advice discharge has to clear a capacity-and-risk gate first, so Wake hands the patient to that workflow and leaves them on the list until it is complete.
        </li>
        <li style={bulletItem}>
          <strong style={sectionLabel}>Critical Follow-up.</strong> The patient is still admitted. Nothing in the chart changes.
        </li>
      </ul>
      <p style={paragraph}>
        Until a departure is reconciled, Wake flags that the chart still lists the patient as active &mdash; so the capture list doubles as a checklist of what the EMR has not caught up on yet.
      </p>
      <p style={paragraph}>
        <strong style={sectionLabel}>Integration.</strong> Wake runs against the 18 synthetic patients in the Keel EMR. The morning handoff is generated from the shift&apos;s captured events; the reconciliations write through the same canonical path the chart&apos;s own controls use, so the worklist, the morning assignment list, and the discharged view stop disagreeing about who is still on service. Generated sign-outs appear on the Keel activity log.
      </p>
      <p style={paragraph}>
        <strong style={sectionLabel}>Status.</strong> Live. Deployed against the 18 synthetic patients in Keel, with one illustrative overnight shift recorded across all six categories.
      </p>

      <div style={buttonRow}>
        <a
          href="https://keel.floviken.se/wake"
          target="_blank"
          rel="noopener noreferrer"
          style={buttonStyle}
        >
          Open Wake in Keel &rarr;
        </a>
      </div>
      <div style={secondaryRow}>
        <a
          href="https://ghost-signout.vercel.app/capture"
          target="_blank"
          rel="noopener noreferrer"
          style={secondaryLinkStyle}
        >
          The original prototype, Ghost Signout &rarr;
        </a>
      </div>

      <div style={statusLine}>01 &middot; Live</div>

      <BackLink />
    </article>
  );
}
