import { tileMetadata } from "@/app/_components/tile-data";
import { ClosingTile, BackLink } from "@/app/_components/ActionTile";

export const metadata = tileMetadata("daybreak");

const paragraph = {
  fontFamily: '"Georgia", serif',
  fontSize: '1rem',
  lineHeight: '1.7',
  color: '#4a4a4a',
  marginBottom: '1rem',
  marginTop: 0,
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
        Daybreak asks a narrow question. Could a small piece of software, given a synthetic patient pool and a list of working hospitalists, produce a balanced morning assignment in two seconds &mdash; with the reasoning visible &mdash; that a human could accept, adjust, or override?
      </p>
      <p style={paragraph}>
        The model is simple. Each patient gets a load score from four factors a chart can answer: number of active problems, level of care, day of stay, and primary versus consult status. ICU patients carry more weight than floor patients. New admits carry more weight than known patients. Consults carry less than primary. The scores are summed across hospitalists, and the optimizer balances total load &mdash; not patient count &mdash; while preserving continuity from the prior day where possible.
      </p>
      <p style={paragraph}>
        The architectural commitment is that the model is legible. Every patient&apos;s load is the product of four numbers anyone can read. Every assignment can be explained in one sentence. The tool does not hide its reasoning behind a black box. A hospitalist looking at her list should be able to ask &ldquo;why did I get this patient?&rdquo; and get an honest answer.
      </p>
      <p style={paragraph}>
        Synthetic data only. No EHR integration. A prototype, not a clinical tool. The point is to show that an hour of pre-shift labor could be a button.
      </p>

      <ClosingTile slug="daybreak" />
      <BackLink />
    </article>
  );
}
