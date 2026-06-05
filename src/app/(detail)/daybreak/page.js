import { tileMetadata } from "@/app/_components/tile-data";
import { BackLink } from "@/app/_components/ActionTile";

export const metadata = tileMetadata("daybreak");

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

export default function Daybreak() {
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
        Daybreak
      </p>
      <h1 style={{
        fontFamily: '"Georgia", serif',
        fontSize: '1.75rem',
        fontWeight: 400,
        color: '#2a2a2a',
        marginBottom: '1.5rem',
        marginTop: 0,
      }}>
        Daybreak: the morning half of the handoff
      </h1>
      <p style={paragraph}>
        <strong style={sectionLabel}>Background.</strong> Every morning in hospital medicine, before the day team arrives, the patient list has to be redistributed. Overnight admissions and consults need to be folded into the existing service, the prior day&apos;s discharges removed, and patients carried over kept, where possible, with the hospitalist who already knows them. The result has to be balanced not by patient count but by clinical load, and it has to be out before the day starts, because nurses, pharmacists, consultants, and families all depend on knowing whose name is next to whose patient. In most hospitals this is done by hand: someone comes in early, reads through charts, and makes judgment calls about which patient is heavier than which. The clinical day cannot start until it is done.
      </p>
      <p style={paragraph}>
        <strong style={sectionLabel}>Hypothesis.</strong> Given a synthetic patient pool and a list of working hospitalists, a small piece of software could produce a balanced morning assignment in about a second (with its reasoning visible) that a clinician can accept, adjust, or override. The arithmetic is the machine&apos;s to do; the judgment stays with the person.
      </p>
      <p style={paragraph}>
        <strong style={sectionLabel}>Method.</strong> Each patient gets a load score from four factors a chart can answer: number of active problems, level of care, disposition status, and primary versus consult role. ICU patients carry more weight than floor patients; patients being discharged today and new admits carry more than known mid-stay patients; consults carry less than primary. The scores are summed across hospitalists, and the optimizer balances total load (not patient count) while preserving continuity from the prior day where it can. The commitment is legibility: every patient&apos;s load is the sum of four numbers anyone can read, and every assignment can be explained in one sentence. A hospitalist looking at her list can ask &ldquo;why did I get this patient?&rdquo; and get an honest answer.
      </p>
      <p style={paragraph}>
        <strong style={sectionLabel}>Generate and lock.</strong> The distribution arrives as three columns, one per hospitalist, each patient&apos;s score broken into its parts so the operator can see why a number is what it is. Drag a patient between columns to override; pin one with a lock so re-proposing leaves it in place. The sheet is then produced in two deliberate steps. The first writes an unlocked working draft: the assignments, and when the morning followed a night shift, the overnight layer frozen alongside them. The clinician reviews and adjusts; locking stamps the sheet with the time and the author and makes it read-only. The lock is the handoff: the day team reads the locked sheet and picks up patients as they assume care. Both the algorithmic baseline and the human-edited final state are kept, so the difference between what the model proposed and what a clinician chose is preserved.
      </p>
      <p style={paragraph}>
        <strong style={sectionLabel}>Integration.</strong> Daybreak is the morning half of a single handoff whose overnight half is Wake. When a night clinician ends their shift, the morning sheet is produced in one act (the assignment distribution and the night&apos;s overnight layer frozen into the same document), and the sheet opens with what happened overnight, then lists who covers whom today. The two halves answer different questions: the overnight layer accounts for everyone who left, the assignments account for everyone still here, and together they are the whole service on one page. Daybreak also stands on its own: a morning distribution can be built from the worklist with no shift behind it at all.
      </p>
      <p style={paragraph}>
        <strong style={sectionLabel}>Status.</strong> Live. Synthetic patients only, no EHR integration: a prototype, not a clinical tool. The point is to show that an hour of pre-shift labor could be a button.
      </p>

      <div style={buttonRow}>
        <a
          href="https://keel.floviken.se/worklist"
          target="_blank"
          rel="noopener noreferrer"
          style={buttonStyle}
        >
          View the live worklist on Keel &rarr;
        </a>
      </div>

      <div style={statusLine}>07 &middot; Live</div>

      <BackLink />
    </article>
  );
}
