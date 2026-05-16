export const metadata = {
  title: "Sundown — Floviken",
  description: "Cross-cover at midnight: a one-screen workup for overnight delirium pages.",
};

const paragraph = {
  fontFamily: '"Georgia", serif',
  fontSize: '1rem',
  lineHeight: '1.7',
  color: '#4a4a4a',
  marginBottom: '1rem',
  marginTop: 0,
};

export default function Sundown() {
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
        Sundown
      </p>
      <h1 style={{
        fontFamily: '"Georgia", serif',
        fontSize: '1.75rem',
        fontWeight: 400,
        color: '#2a2a2a',
        marginBottom: '1.5rem',
        marginTop: 0,
      }}>
        Cross-cover at midnight
      </h1>
      <p style={paragraph}>
        Agitated and delirious patients are a familiar overnight page for any hospitalist, and the answer is rarely straightforward. The night clinician is often cross-covering dozens of patients they haven&apos;t personally admitted, and the differential is wide &mdash; it could be a life-threatening cause that needs work-up now, or a patient who needs reorientation and a calm presence at the bedside. Delirium affects roughly one in five hospitalized older adults and is independently associated with longer length of stay, higher in-hospital mortality, falls, sitter requirements, and post-discharge cognitive decline.
      </p>
      <p style={paragraph}>
        In most modern hospitals, the page arrives through a HIPAA-protected secure-messaging app on the clinician&apos;s phone. The standard-of-care workup is well-established. The difficulty is not knowledge. It&apos;s assembly under load. A thorough chart review at the moment of the page &mdash; the anticholinergic burden, the recent deliriogenic exposures, the missed urinalysis, the untouched bowel regimen, the QTc that matters if antipsychotics are considered &mdash; takes longer than the minute or two the hospitalist has before walking to the bedside, especially on a night when the emergency room is also calling.
      </p>
      <p style={paragraph}>
        Sundown is a small experiment in what could happen in that minute. In the prototype, when a simulated secure message contains a delirium or agitation signal, a deterministic chart review runs against an evidence-anchored set of items &mdash; recent deliriogenic medications, anticholinergic burden, Foley status, last bowel movement, electrolytes, QTc, baseline cognitive status, sensory aids, recent procedures. Items that should be present but aren&apos;t are surfaced as gaps. The hospitalist reads one screen on the way to the bedside, walks in with the differential already narrowing, and gets to the assessment faster.
      </p>
      <p style={paragraph}>
        Same shape as Lowfire and Foldspace. The chart and the references are the source of truth &mdash; Beers criteria, the anticholinergic burden calculator, AAFP and StatPearls workup standards. AI handles the language only. The clinician examines the patient and decides what matters.
      </p>
      <p style={{
        fontFamily: '"Inter", -apple-system, sans-serif',
        fontSize: '0.875rem',
        color: '#8a8a8a',
        marginBottom: 0,
        marginTop: 0,
      }}>
        In progress
      </p>
    </article>
  );
}
