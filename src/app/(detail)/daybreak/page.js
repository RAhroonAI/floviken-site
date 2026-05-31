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
        <strong style={sectionLabel}>Background.</strong> Every morning before rounds, the patient list is redistributed by hand. Patients picked up overnight by the swing and night shifts are folded in. The prior day&apos;s discharges are removed. An oncoming hospitalist may take over a service for a colleague signing off, and patients are kept, where possible, with the doctor who already knows them. The list is balanced by clinical load, not by headcount.
      </p>
      <p style={paragraph}>
        Every patient needs a responsible name before the day starts, because the hospital, the patient, and the family all depend on knowing who is responsible. This is done manually, every day, in nearly every group.
      </p>
      <p style={paragraph}>
        <strong style={sectionLabel}>Hypothesis.</strong> A model could produce a balanced morning assignment in seconds, with the reasoning visible, that a clinician can accept, adjust, or override. The model does the mechanical balancing. The soft judgment a doctor carries &mdash; the difficult family, the patient who looks stable but isn&apos;t &mdash; stays with the human.
      </p>
      <p style={paragraph}>
        <strong style={sectionLabel}>Method.</strong> Each patient gets a load score from four factors a chart can answer:
      </p>
      <ul style={bulletList}>
        <li style={bulletItem}>Active problems</li>
        <li style={bulletItem}>Level of care</li>
        <li style={bulletItem}>Day of stay</li>
        <li style={bulletItem}>Primary versus consult</li>
      </ul>
      <p style={paragraph}>
        The factors carry the weight of clinical reality: an ICU patient outweighs a floor patient, a new admission outweighs a known one, and a consult counts for less than a primary. The scores are summed across the working hospitalists, and an optimizer balances total load &mdash; not patient count &mdash; while preserving continuity from the prior day where possible.
      </p>
      <p style={paragraph}>
        Because each score is the product of four readable numbers, every assignment can be explained in one sentence. The model does not hide its reasoning behind a black box.
      </p>
      <p style={paragraph}>
        <strong style={sectionLabel}>Verification loop.</strong> The proposal arrives as columns, one per hospitalist, with each patient&apos;s load score broken into its parts, so the operator can see exactly why a number is what it is. The operator acts on it:
      </p>
      <ul style={bulletList}>
        <li style={bulletItem}>
          <strong style={sectionLabel}>Override.</strong> Drag a patient between columns to move them off the proposed assignment.
        </li>
        <li style={bulletItem}>
          <strong style={sectionLabel}>Pin.</strong> Lock a patient so re-proposing leaves them in place while the rest rebalances.
        </li>
        <li style={bulletItem}>
          <strong style={sectionLabel}>Commit.</strong> Accept the list when it is right.
        </li>
      </ul>
      <p style={paragraph}>
        On commit, both the algorithmic baseline and the human-edited final state are written to an audit row, preserving the difference between what the model proposed and what the clinician actually chose.
      </p>
      <p style={paragraph}>
        <strong style={sectionLabel}>Integration.</strong> Daybreak runs against the synthetic patient pool in Keel. The morning proposal appears as columns on the Keel worklist, where the operator overrides and commits it, and every committed run is stored with the algorithmic baseline it started from.
      </p>
      <p style={paragraph}>
        <strong style={sectionLabel}>Status.</strong> Live. The experiment is deployed against the Keel synthetic patient pool.
      </p>

      <div style={buttonRow}>
        <a
          href="https://keel.floviken.se/worklist"
          target="_blank"
          rel="noopener noreferrer"
          style={buttonStyle}
        >
          Open Daybreak in Keel &rarr;
        </a>
      </div>

      <div style={statusLine}>07 &middot; Live</div>

      <BackLink />
    </article>
  );
}
