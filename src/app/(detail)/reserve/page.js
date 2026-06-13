import { tileMetadata } from "@/app/_components/tile-data";
import { BackLink } from "@/app/_components/ActionTile";
import { ReserveLoopDiagram } from "@/components/reserve/ReserveLoopDiagram";
import Link from "next/link";

export const metadata = tileMetadata("reserve");

const paragraph = {
  fontFamily: '"Georgia", serif',
  fontSize: "1rem",
  lineHeight: "1.7",
  color: "#4a4a4a",
  marginBottom: "1rem",
  marginTop: 0,
};

const sectionLabel = {
  fontWeight: 700,
  color: "#2a2a2a",
};

const statusLine = {
  fontFamily: '"Inter", -apple-system, sans-serif',
  fontSize: "0.75rem",
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "#8a8a8a",
  textAlign: "center",
  marginTop: "1.25rem",
  marginBottom: "1rem",
};

export default function Reserve() {
  return (
    <article>
      <p style={{
        fontFamily: '"Inter", -apple-system, sans-serif',
        fontSize: "0.75rem",
        letterSpacing: "0.15em",
        color: "#8a8a8a",
        textTransform: "uppercase",
        margin: "0 0 0.5rem 0",
      }}>
        Reserve
      </p>
      <h1 style={{
        fontFamily: '"Georgia", serif',
        fontSize: "1.75rem",
        fontWeight: 400,
        color: "#2a2a2a",
        marginBottom: "1.5rem",
        marginTop: 0,
      }}>
        Reserve &mdash; the red blood cell as a control loop
      </h1>

      <p style={paragraph}>
        This is one clean example of a broader principle. Pharmacogenomics is the
        idea that a person&apos;s genetics shape which drugs help them and which
        cause harm. Reserve takes a single, well-understood case and makes it
        something you can watch.
      </p>

      <p style={paragraph}>
        <strong style={sectionLabel}>Background.</strong> A red blood cell spends
        its whole life holding one variable steady: its redox state. Oxidants keep
        arriving &mdash; from the oxygen it carries, from infections, from drugs
        &mdash; and each one would damage the cell if left unchecked. The defense
        is a feedback loop. Reduced glutathione neutralizes the oxidant; the
        pentose phosphate pathway spends NADPH to recharge the glutathione; and
        the enzyme G6PD sets how hard that pathway can push. NADPH is the reserve
        the whole loop draws on. Most of the time this runs silently. Then a drug
        arrives that raises the oxidant load &mdash; an antimalarial, dapsone,
        rasburicase, even fava beans &mdash; and two people on the same dose can
        diverge: one clears it without noticing, the other hemolyzes. The same
        drug, a different outcome. The difference is G6PD activity.
      </p>

      <p style={paragraph}>
        <strong style={sectionLabel}>Hypothesis.</strong> If you model the cell as
        a control loop with two independent knobs &mdash; the loop gain (G6PD
        activity) and the disturbance (the oxidant load) &mdash; the clinical
        split should fall out without being written in. A high-gain cell rejects
        the disturbance and returns to its setpoint. A low-gain cell looks
        identical at rest, but past a large enough disturbance it cannot make
        NADPH fast enough: the reserve runs down, glutathione collapses behind it,
        and the cell tips into hemolysis. Severity should be a property of the
        loop, not an entry in a lookup table. The deficiency stays silent until
        the day it is challenged.
      </p>

      <p style={paragraph}>
        <strong style={sectionLabel}>How it&apos;s modeled.</strong> Each key
        substance in the cell gets an equation describing how fast it rises and
        falls. The computer steps them forward in time, so you watch the cell
        behave as it would in motion, not as a snapshot. The G6PD step uses
        kinetics from published patient data; the surrounding chemistry is
        simplified, enough to show the behavior honestly, not enough to be a
        complete model of the cell. On top of that, the cell is treated as a
        control system: a reserve it holds steady, a stress that spends it, a loop
        that refills it. The genetic deficiency is a weak point in that loop,
        where the refill cannot keep pace. That reframes vulnerability as a
        property of the loop rather than a fact to memorize.
      </p>

      <p style={paragraph}>
        <strong style={sectionLabel}>Method.</strong> A deterministic system of
        rate equations for the coupled redox and glycolytic state &mdash; NADPH
        and NADP+, the glutathione couple, ATP, 2,3-BPG, and a cumulative damage
        marker &mdash; integrated with a fixed-step Runge&ndash;Kutta solver. The
        G6PD step uses the published competitive product- and effector-inhibition
        rate law of Shimo, Nishino &amp; Tomita (2011), driven by their
        per-patient parameters. The surrounding enzymes and the absolute
        concentration scales are reduced and illustrative &mdash; flagged as such
        in the source &mdash; pending the paper&apos;s full supplement. Damage
        keys off the NADPH reserve, not the glutathione that drains visibly ahead
        of it. There is no randomness: identical inputs produce an identical
        trajectory, every run.
      </p>

      <p style={paragraph}>
        <strong style={sectionLabel}>Integration.</strong> The interactive page
        runs that engine in your browser &mdash; the same code, no server, no
        recorded video. Compare a healthy cell with a real documented patient
        under one shared oxidant, or drive a single cell: pick a genotype to set
        the loop gain, set an oxidant challenge, and watch the four reserves drain
        and either recover or give out.
      </p>

      <p style={paragraph}>
        <strong style={sectionLabel}>Status.</strong> In progress. The engine and
        this room are built and the model is deterministic, but the surrounding
        network and the absolute scales are still illustrative, not yet grounded
        against the full published model. A reasoning tool for thinking about the
        loop &mdash; not a clinical instrument, and nothing here is a patient
        prediction.
      </p>

      <p style={paragraph}>
        <strong style={sectionLabel}>Why this matters.</strong> Matching drugs to
        a person&apos;s genetics is already changing how some medicines are
        prescribed, and G6PD deficiency is one of the clearest cases. A single
        inherited variant flips an ordinary drug from safe to dangerous. Reserve
        models just this one pathway, qualitatively, as a way to see the principle
        at work. Predicting drug safety from a whole genome is a vast, validated,
        regulated field. This is the small case example that makes the idea
        tangible, not a tool for any decision about a real person.
      </p>

      <ReserveLoopDiagram />

      <div style={{ textAlign: "center", marginTop: "2.5rem", marginBottom: "0.5rem" }}>
        <Link
          href="/reserve/run"
          style={{
            display: "inline-block",
            fontFamily: '"Inter", -apple-system, sans-serif',
            fontSize: "0.9375rem",
            letterSpacing: "0.03em",
            color: "#7a1f2b",
            textDecoration: "none",
            border: "1px solid #7a1f2b",
            borderRadius: "4px",
            padding: "12px 26px",
          }}
        >
          Run the experiment &rarr;
        </Link>
      </div>

      <div style={statusLine}>09 &middot; In progress</div>

      <BackLink />
    </article>
  );
}
