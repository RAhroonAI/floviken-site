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
        The hour before rounds
      </h1>
      <p style={paragraph}>
        Every morning in hospital medicine, before the day team arrives, the patient list has to be redistributed. Overnight admissions and consults from the swing and night shifts need to be folded into the existing service. Discharges from the prior day need to be removed. Patients carried over from yesterday need to stay, where possible, with the hospitalist who already knows them. The result has to be balanced &mdash; not by patient count, but by clinical load &mdash; and it has to be out before the day starts, because nurses, pharmacists, consultants, and families all depend on knowing whose name is next to whose patient.
      </p>
      <p style={paragraph}>
        In most hospitals, this work is done by hand. Someone comes in early &mdash; sometimes a nurse, sometimes a physician &mdash; reads through charts, and makes judgment calls about which patient is heavier than which. The work is skilled, repetitive, and time-consuming. The clinical day cannot start until it is done.
      </p>
      <p style={paragraph}>
        Daybreak asks a narrow question. Could a small piece of software, given a synthetic patient pool and a list of working hospitalists, produce a balanced morning assignment in about a second &mdash; with the reasoning visible &mdash; that a human could accept, adjust, or override?
      </p>
      <p style={paragraph}>
        The model is simple. Each patient gets a load score from four factors a chart can answer: number of active problems, level of care, disposition status, and primary versus consult role. ICU patients carry more weight than floor patients. Patients being discharged today and new admits carry more weight than known mid-stay patients. Consults carry less than primary. The scores are summed across hospitalists, and the optimizer balances total load &mdash; not patient count &mdash; while preserving continuity from the prior day where possible.
      </p>
      <p style={paragraph}>
        The architectural commitment is that the model is legible. Every patient&apos;s load is the sum of four numbers anyone can read. Every assignment can be explained in one sentence. The tool does not hide its reasoning behind a black box. A hospitalist looking at her list should be able to ask &ldquo;why did I get this patient?&rdquo; and get an honest answer.
      </p>
      <p style={paragraph}>
        Synthetic data only. No EHR integration. A prototype, not a clinical tool. The point is to show that an hour of pre-shift labor could be a button.
      </p>
      <p style={paragraph}>
        <strong style={sectionLabel}>The morning sheet, and the night before it.</strong> Daybreak is the morning half of a single handoff. The night before, in Wake, the clinician on the overnight shift accumulates what happened &mdash; who left the service and why, and any open loops on patients already discharged. When that clinician generates the morning sheet, Daybreak runs the assignment algorithm and freezes the night&apos;s overnight layer into the same document: the sheet opens with what happened overnight, then lists who covers whom today. The two halves answer different questions &mdash; the overnight layer accounts for everyone who left, the assignments account for everyone still here &mdash; and together they are the whole service on one page.
      </p>
      <p style={paragraph}>
        <strong style={sectionLabel}>What Daybreak does in practice.</strong> Daybreak reads yesterday&apos;s roster, scores each patient on four factors, and proposes a balanced distribution across the working hospitalists in about a second. The proposal arrives as three columns, one per hospitalist, with every patient&apos;s load score broken out into its parts &mdash; active problems, level of care, disposition, and role &mdash; so the operator can see exactly why a number is what it is. Drag a patient between columns to override the proposal. Pin a patient with a lock so re-proposing leaves them where they are. When the sheet is right, it is produced in two deliberate steps. Generating it writes an unlocked working draft &mdash; the assignments plus the frozen overnight layer &mdash; that the clinician can still review and adjust. Locking it stamps the sheet with the time and the author and makes it read-only: the lock is the handoff. The day team reads the locked sheet and picks up patients as they assume care. For the day&apos;s locked sheet, both the algorithmic baseline and the human-edited final state are written to an audit row, so the difference between what the model proposed and what a clinician actually chose is preserved.
      </p>
      <p style={paragraph}>
        <strong style={sectionLabel}>What Daybreak doesn&apos;t do.</strong> Daybreak does not read real patient records. The roster, the prior assignments, and the load factors all come from a synthetic chart substrate. Nothing it computes touches a production system.
      </p>
      <p style={paragraph}>
        Daybreak does not make clinical decisions. It balances workload. It does not decide who needs to be seen first, whether a patient is sick enough to escalate, or which hospitalist should keep which kind of case. Those are still human calls, made by the people on the list.
      </p>
      <p style={paragraph}>
        Daybreak does not replace the operator. Every assignment can be moved. Every proposal can be re-run. The final state is whatever the operator locks, not whatever the algorithm proposed. The tool exists to do the arithmetic so the operator can spend their attention on the judgment calls.
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
