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
        Wake &mdash; the overnight layer of the morning handoff
      </h1>
      <p style={paragraph}>
        <strong style={sectionLabel}>Background.</strong> The morning assignment list is built from the patients still on the service &mdash; who is here, and who covers them. But some patients leave overnight: they pass away, transfer to inpatient hospice, leave AMA, transfer to another facility, or are admitted and discharged before morning. By the time the day team rounds, those patients are off the list, and the list is silent on them. The assignments show who is present; they cannot show who left, or why, or what they left unfinished.
      </p>
      <p style={paragraph}>
        There is also a second kind of overnight loose end: the patient who was already discharged, days ago, when a lab calls at 3 a.m. with a positive culture and someone has to reach them. They are not on any list either. These are the things the morning handoff has no place for, because the patient who generated them is no longer on it.
      </p>
      <p style={paragraph}>
        <strong style={sectionLabel}>Hypothesis.</strong> The clinician who worked the night is the one who knows what happened on it &mdash; so that clinician should produce the handoff, not reconstruct it later from a list that has already moved on. Wake is the overnight layer of that handoff: it reads the night&apos;s departures directly from the chart, lets the clinician annotate them and track any open loops, and folds the result into the morning assignment sheet that the day team already reads. One person produces it; the lock hands it over.
      </p>
      <p style={paragraph}>
        <strong style={sectionLabel}>Method.</strong> Wake adds nothing the chart does not already record. A clinician starts a night shift. Every patient discharged during the shift &mdash; to hospice, AMA, a transfer, a routine discharge, or expired &mdash; appears automatically as a departure, read from the chart&apos;s own discharge events and scoped to the shift&apos;s window. The clinician can add a short note to any of them for the day team. Departures are derived, never re-entered.
      </p>
      <p style={paragraph}>
        The one thing the chart cannot otherwise carry is an open loop on a patient who is already gone. Wake stores exactly that: a follow-up thread &mdash; a note and a status (open, reached, unable to reach, handed off) on an already-discharged patient &mdash; opened by the night clinician and closed by whoever resolves it. It is the only clinical content Wake originates from nothing. The shift boundary and the optional departure note are its only other writes, and none of them touch the chart.
      </p>
      <p style={paragraph}>
        <strong style={sectionLabel}>Generate and lock.</strong> At the end of the night, one action generates the morning sheet: it runs the assignment algorithm and freezes the overnight section &mdash; departures and open follow-ups &mdash; into a single working draft. The clinician reviews it, adjusts an assignment if someone is sicker than the load model knows, then locks it. Locking stamps the sheet with the time and the author and makes it read-only; the lock is the handoff. The day team reads the locked sheet and picks up patients as they assume care. The structured sheet is the handoff. A language model can, on request, render it into prose, but it is never on the path: it writes language only, invents no fact, and the sheet is complete without it.
      </p>
      <p style={paragraph}>
        <strong style={sectionLabel}>Integration.</strong> Wake runs against the synthetic patients in Keel and shares its chart with the morning assignment room. Because departures are read from the same discharge events the worklist and the discharged view already use, the three never disagree about who is on service: a patient who left is absent from the assignments, present in the overnight section, and on the discharged list &mdash; one fact, three views. The assignments account for who is here; the overnight layer accounts for everyone who is not.
      </p>
      <p style={paragraph}>
        <strong style={sectionLabel}>Status.</strong> Live. Deployed against the synthetic patients in Keel, producing the morning sheet &mdash; assignments plus the overnight layer &mdash; as one locked handoff.
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
