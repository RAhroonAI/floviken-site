import { tileMetadata } from "@/app/_components/tile-data";
import { BackLink } from "@/app/_components/ActionTile";
import { ReserveSimulator } from "@/components/reserve/ReserveSimulator";
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
        <strong style={sectionLabel}>Integration.</strong> The simulator below
        runs that engine in your browser &mdash; the same code, no server, no
        recorded video. Pick a genotype to set the loop gain, set an oxidant
        challenge, and watch the four reserves drain and either recover or give
        out. It opens on a severe G6PD cell under a moderate oxidant, which tips
        into failure on its own; switch to a healthy cell and the same
        disturbance is absorbed.
      </p>

      <p style={paragraph}>
        <strong style={sectionLabel}>Status.</strong> In progress. The engine and
        this room are built and the model is deterministic, but the surrounding
        network and the absolute scales are still illustrative, not yet grounded
        against the full published model. A reasoning tool for thinking about the
        loop &mdash; not a clinical instrument, and nothing here is a patient
        prediction.
      </p>

      <div style={{ marginTop: "2.25rem", marginBottom: "0.5rem" }}>
        <ReserveSimulator />
      </div>

      <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
        <Link
          href="/reserve/compare"
          style={{
            fontFamily: '"Inter", -apple-system, sans-serif',
            fontSize: "0.8125rem",
            letterSpacing: "0.02em",
            color: "#7a1f2b",
            textDecoration: "none",
            borderBottom: "1px solid #e0c6c0",
            paddingBottom: "1px",
          }}
        >
          See the threshold window &rarr;
        </Link>
      </div>

      <div style={statusLine}>09 &middot; In progress</div>

      <BackLink />
    </article>
  );
}
