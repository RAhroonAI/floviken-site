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
        Wake &mdash; surfacing overnight departures, reconciling the chart
      </h1>
      <p style={paragraph}>
        <strong style={sectionLabel}>Background.</strong> The morning handoff is written for the patients still on the service. But some leave overnight &mdash; they pass away, transfer to inpatient hospice, leave AMA, transfer to another facility, or are admitted and discharged before morning. By the time the day team rounds, those patients are off the active list. The census shows who is in the beds, not what happened to everyone who is no longer in one.
      </p>
      <p style={paragraph}>
        That gap is about what the day team never learns. The AMA departure that should be on the record. The overnight result no one has acted on. The family that still has not been reached. The patient who generated each of these is no longer on the list, so neither is the thing they left behind.
      </p>
      <p style={paragraph}>
        <strong style={sectionLabel}>Hypothesis.</strong> A clinician captures each disposition as it happens; at sign-off a language model turns them into a handoff the day team can read in thirty seconds. Structured fields, not the model, decide what is still outstanding. And because each event names a real patient, it can also reconcile the chart &mdash; moving the patient off the active list to where they belong. The clinician confirms every reconciliation. The model only writes language; it never invents a fact, judges clinical state, or changes the chart on its own.
      </p>
      <p style={paragraph}>
        <strong style={sectionLabel}>Method.</strong> Wake captures the six dispositions that remove a patient from the list:
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
        Each event is logged in a few taps &mdash; category, patient, time, a note, and for the ones carrying an unfinished task, structured fields (death certificate signed, family notified, transfer destination, capacity assessed). At sign-off the model assembles them into a categorized document, under two rules:
      </p>
      <ul style={bulletList}>
        <li style={bulletItem}>
          Structured fields, evaluated in code, decide every PENDING flag. The model renders them; it never infers them.
        </li>
        <li style={bulletItem}>
          The summary contains nothing the clinician did not enter. The model tightens language; it does not add fact.
        </li>
      </ul>
      <p style={paragraph}>
        <strong style={sectionLabel}>Reconciliation loop.</strong> Five of the six are discharges; the clinician confirms each one.
      </p>
      <ul style={bulletList}>
        <li style={bulletItem}>
          <strong style={sectionLabel}>Transfer Out, Inpatient Hospice, Admit &amp; Discharge, Expired</strong> &mdash; discharged through Keel&apos;s own path with the matching disposition: the status moves, the encounter closes, medications reconcile, and the disposition is recorded, so the chart shows not just that the patient left but how.
        </li>
        <li style={bulletItem}>
          <strong style={sectionLabel}>AMA</strong> &mdash; also a discharge, but not Wake&apos;s to close. It has to clear a capacity-and-risk gate first, so Wake hands it off and leaves the patient on the list until that is done.
        </li>
        <li style={bulletItem}>
          <strong style={sectionLabel}>Critical Follow-up</strong> &mdash; not a discharge. The patient is still admitted; nothing changes.
        </li>
      </ul>
      <p style={paragraph}>
        Until a departure is reconciled, Wake flags the patient as still active in the chart &mdash; so the capture list doubles as a checklist of what the EMR has not caught up on.
      </p>
      <p style={paragraph}>
        <strong style={sectionLabel}>Integration.</strong> Wake runs against the 18 synthetic patients in Keel. Reconciliations write through the same path the chart&apos;s own controls use, so the worklist, the morning assignment list, and the discharged view stop disagreeing about who is still on service. Generated sign-outs appear on the Keel activity log.
      </p>
      <p style={paragraph}>
        <strong style={sectionLabel}>Status.</strong> Live. Deployed against the 18 synthetic patients, with one overnight shift recorded across all six categories.
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
