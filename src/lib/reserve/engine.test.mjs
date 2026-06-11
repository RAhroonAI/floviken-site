// Reserve — validation harness for the RBC metabolic engine.
//
// Run it:  node src/lib/reserve/engine.test.mjs
//
// floviken-site has no test runner; runnable scripts in this repo are plain
// .mjs run by Node (see scripts/*.mjs). This harness follows that convention:
// it is self-contained, asserts each of the nine validation cases, prints a
// PASS/FAIL line per case with the key metrics, and exits non-zero on any fail.
//
// The cases exist to prove the model's BEHAVIOUR EMERGES from the shared params
// and two independent knobs (gain = genotype, disturbance = oxidant). Nothing
// here special-cases a genotype; the harness only sets multipliers / kinetics
// and an oxidant level and reads the resulting trajectory.

import { simulate, simulateBolus } from "./engine.mjs";
import {
  HEALTHY,
  G6PD_SEVERE,
  PK_DEFICIENCY,
  OXIDANT_CHALLENGE,
  HEMOLYSIS_THRESHOLD,
  NADPH_CRIT,
  G6PD_PATIENTS,
  G6PD_SET_ORDER,
  BOLUS_DOSE,
  BOLUS_SETTLE,
  BOLUS_WINDOW,
  BOLUS_DT,
} from "./params.mjs";

// ---------------------------------------------------------------------------
// Tiny assertion + reporting harness.
// ---------------------------------------------------------------------------

const NO_OXIDANT = { level: 0, tOn: 0, tOff: 0 };
const DURATION = 240;
const DT = 0.1;

function f(x) {
  return Number.isFinite(x) ? x.toFixed(4) : String(x);
}

const reports = [];

// Run one case. `body` accumulates failures via `check`; returns the metric
// summary line printed alongside the verdict.
function runCase(n, title, body) {
  const failures = [];
  const check = (cond, msg) => {
    if (!cond) failures.push(msg);
  };
  let summary = "";
  try {
    summary = body(check);
  } catch (err) {
    failures.push(`threw: ${err && err.message ? err.message : String(err)}`);
  }
  reports.push({ n, title, pass: failures.length === 0, failures, summary });
}

// ---------------------------------------------------------------------------
// Case 1 — Healthy + oxidant load: GSH dips then recovers, ATP stable, damage
// stays below the hemolysis threshold.
// ---------------------------------------------------------------------------

runCase(1, "Healthy + oxidant → reject disturbance, recover", (check) => {
  const r = simulate({
    genotype: HEALTHY,
    oxidant: OXIDANT_CHALLENGE,
    duration: DURATION,
    dt: DT,
  });
  const m = r.metrics;
  const startGsh = r.trajectory[0].gsh;

  check(m.minGsh < startGsh - 0.02, "GSH should visibly dip under load");
  check(m.gshRecovered, "GSH should recover toward baseline after the challenge");
  check(!m.hemolyzed, "healthy cell must not hemolyze");
  check(m.maxDamage < HEMOLYSIS_THRESHOLD, "damage must stay below threshold");
  check(m.minNadph > NADPH_CRIT, "NADPH must stay above its critical line");
  // ATP arm is decoupled from the redox disturbance this session → stays stable.
  check(m.minAtp > 0.6, "ATP must stay stable (well above zero)");
  check(Math.abs(m.finalAtp - r.trajectory[0].atp) < 0.08, "ATP must end near baseline");

  return `minGSH=${f(m.minGsh)} (start ${f(startGsh)}), recovered=${m.gshRecovered}, minNADPH=${f(m.minNadph)}, minATP=${f(m.minAtp)}, maxDamage=${f(m.maxDamage)}`;
});

// ---------------------------------------------------------------------------
// Case 2 — Severe G6PD deficiency + the SAME oxidant load: NADPH cannot
// regenerate, GSH collapses, damage crosses the hemolysis threshold within run.
// (Same disturbance as case 1 — only the gain differs.)
// ---------------------------------------------------------------------------

runCase(2, "Severe G6PD + oxidant → runaway to hemolysis", (check) => {
  const r = simulate({
    genotype: G6PD_SEVERE,
    oxidant: OXIDANT_CHALLENGE,
    duration: DURATION,
    dt: DT,
  });
  const m = r.metrics;

  check(m.minNadph < NADPH_CRIT, "NADPH must collapse below its critical line");
  check(m.minGsh < 0.3, "GSH must collapse");
  check(m.hemolyzed, "must cross the hemolysis threshold");
  check(
    m.timeToHemolysis !== null && m.timeToHemolysis < DURATION,
    "hemolysis must occur within the run",
  );

  return `minNADPH=${f(m.minNadph)}, minGSH=${f(m.minGsh)}, maxGSSG=${f(m.maxGssg)}, finalDamage=${f(m.finalDamage)}, t_hemolysis=${m.timeToHemolysis === null ? "none" : f(m.timeToHemolysis)}`;
});

// ---------------------------------------------------------------------------
// Case 3 — Severe G6PD deficiency + NO oxidant: stable, no hemolysis.
// Clinically load-bearing: asymptomatic until challenged. Same low gain as
// case 2, disturbance removed → no failure.
// ---------------------------------------------------------------------------

runCase(3, "Severe G6PD + no oxidant → stable (asymptomatic)", (check) => {
  const r = simulate({
    genotype: G6PD_SEVERE,
    oxidant: NO_OXIDANT,
    duration: DURATION,
    dt: DT,
  });
  const m = r.metrics;

  check(!m.hemolyzed, "must not hemolyze without a disturbance");
  check(m.maxDamage < 1e-6, "no damage should accrue at rest");
  check(m.minNadph > NADPH_CRIT, "NADPH must stay above its critical line at rest");
  check(m.minGsh > 0.9, "GSH must stay near baseline at rest");

  return `minNADPH=${f(m.minNadph)}, minGSH=${f(m.minGsh)}, maxDamage=${f(m.maxDamage)}, hemolyzed=${m.hemolyzed}`;
});

// ---------------------------------------------------------------------------
// Case 4 — Pyruvate kinase deficiency + no oxidant: ATP depressed but non-zero;
// 2,3-BPG elevated above the healthy baseline. Compared against a healthy
// no-oxidant baseline run measured here, not against a hardcoded number.
// ---------------------------------------------------------------------------

runCase(4, "PK deficiency → low ATP, high 2,3-BPG", (check) => {
  const baseline = simulate({
    genotype: HEALTHY,
    oxidant: NO_OXIDANT,
    duration: DURATION,
    dt: DT,
  }).metrics;
  const r = simulate({
    genotype: PK_DEFICIENCY,
    oxidant: NO_OXIDANT,
    duration: DURATION,
    dt: DT,
  });
  const m = r.metrics;

  check(m.finalAtp < 0.6 * baseline.finalAtp, "ATP must be clearly depressed vs healthy");
  check(m.finalAtp > 0.05, "ATP must remain non-zero");
  check(m.finalBpg > 1.15 * baseline.finalBpg, "2,3-BPG must be elevated above healthy baseline");
  // No oxidant → redox arm must stay quiet (sanity: PK knob doesn't touch it).
  check(!m.hemolyzed, "PK deficiency alone must not hemolyze");

  return `ATP=${f(m.finalAtp)} (healthy ${f(baseline.finalAtp)}), BPG=${f(m.finalBpg)} (healthy ${f(baseline.finalBpg)}), hemolyzed=${m.hemolyzed}`;
});

// ---------------------------------------------------------------------------
// Case 5 — CAUSAL CHECK: damage sensitivity must track NADPH, not GSH.
//
// Both probes start from the runaway condition (severe G6PD + oxidant).
//   A: clamp GSH HIGH, leave NADPH free → NADPH still collapses → STILL
//      hemolyzes. Protecting the visible intermediate does not save the cell.
//   B: clamp NADPH HIGH, leave GSH free → no deficit → does NOT hemolyze (and
//      GSH stays healthy too, because the reductase has reserve to spend).
//
// If damage tracked GSH, the verdicts would invert (A rescued, B doomed). The
// pass condition is the asymmetry, so a future "simplification" that keys
// damage off GSH would fail this case rather than pass silently.
// ---------------------------------------------------------------------------

runCase(5, "Causal check: damage tracks NADPH, not GSH", (check) => {
  const base = {
    genotype: G6PD_SEVERE,
    oxidant: OXIDANT_CHALLENGE,
    duration: DURATION,
    dt: DT,
  };
  // A — pin GSH high; NADPH free to fall.
  const clampGsh = simulate({ ...base, clamps: { gsh: 0.98 } }).metrics;
  // B — pin NADPH high; GSH free.
  const clampNadph = simulate({ ...base, clamps: { nadph: 0.97 } }).metrics;

  check(
    clampGsh.hemolyzed,
    "clamping GSH high must NOT prevent hemolysis (NADPH still collapses)",
  );
  check(
    clampGsh.minNadph < NADPH_CRIT,
    "with GSH pinned, NADPH must still collapse below critical",
  );
  check(
    !clampNadph.hemolyzed,
    "restoring NADPH must prevent hemolysis",
  );
  check(
    clampNadph.maxDamage < 1e-6,
    "with NADPH held high, no damage should accrue",
  );
  // The discriminating asymmetry, stated explicitly.
  check(
    clampGsh.hemolyzed && !clampNadph.hemolyzed,
    "GSH is not the lever; NADPH is",
  );

  return `clamp-GSH: hemolyzed=${clampGsh.hemolyzed} minNADPH=${f(clampGsh.minNadph)} dmg=${f(clampGsh.finalDamage)} | clamp-NADPH: hemolyzed=${clampNadph.hemolyzed} minGSH=${f(clampNadph.minGsh)} dmg=${f(clampNadph.finalDamage)}`;
});

// ---------------------------------------------------------------------------
// Case 6 — Determinism: identical inputs → byte-identical trajectories.
// ---------------------------------------------------------------------------

runCase(6, "Determinism: identical inputs → identical trajectory", (check) => {
  const cfg = {
    genotype: G6PD_SEVERE,
    oxidant: OXIDANT_CHALLENGE,
    duration: DURATION,
    dt: DT,
  };
  const a = simulate(cfg);
  const b = simulate(cfg);
  const sa = JSON.stringify(a.trajectory);
  const sb = JSON.stringify(b.trajectory);

  check(a.trajectory.length === b.trajectory.length, "trajectory lengths must match");
  check(sa === sb, "trajectories must be byte-identical across runs");

  return `points=${a.trajectory.length}, identical=${sa === sb}, bytes=${sa.length}`;
});

// ---------------------------------------------------------------------------
// Session-2 bolus runs — all 11 published parameter sets through the H2O2
// perturbation protocol. Run ONCE here; cases 7–9 and the ranking table read
// these readouts. Nothing below special-cases a patient — each set is fed its
// six published parameters and the SAME bolus; the ordering emerges.
// ---------------------------------------------------------------------------

const bolus = {};
for (const name of G6PD_SET_ORDER) {
  bolus[name] = simulateBolus(name, {
    g6pd: G6PD_PATIENTS[name],
    dose: BOLUS_DOSE,
    settle: BOLUS_SETTLE,
    window: BOLUS_WINDOW,
    dt: BOLUS_DT,
  });
}

// null recovery (did not recover within the window) sorts as the longest.
const recVal = (r) =>
  r.recoveryTime === null ? Number.POSITIVE_INFINITY : r.recoveryTime;

// rank 1 = longest recovery (most severe). Ties share the lower rank count.
function recoveryRank(name) {
  const v = recVal(bolus[name]);
  return 1 + G6PD_SET_ORDER.filter((n) => recVal(bolus[n]) > v).length;
}
// rank 1 = lowest initial redox (most severe).
function initialRedoxRank(name) {
  const v = bolus[name].initialRedox;
  return 1 + G6PD_SET_ORDER.filter((n) => bolus[n].initialRedox < v).length;
}

const minRecovery = Math.min(...G6PD_SET_ORDER.map((n) => recVal(bolus[n])));
const maxInitialRedox = Math.max(...G6PD_SET_ORDER.map((n) => bolus[n].initialRedox));

// ---------------------------------------------------------------------------
// Case 7 — RECOVERY ORDERING. Control recovers fastest (or tied); patients 1,
// 4, 8 are among the slowest (top of the recovery-time ranking) with patient 1
// the single most extreme.
// ---------------------------------------------------------------------------

runCase(7, "Recovery ordering: control fastest, p1/4/8 slowest", (check) => {
  check(
    recVal(bolus.control) <= minRecovery + 0.1,
    "control must have the shortest (or tied-shortest) recovery time",
  );
  check(recoveryRank("patient1") === 1, "patient1 must be the single slowest (most extreme)");
  check(recoveryRank("patient4") <= 4, "patient4 must be among the slowest (top-4)");
  check(recoveryRank("patient8") <= 4, "patient8 must be among the slowest (top-4)");

  return `recovery(min)=${f(minRecovery)} control=${f(recVal(bolus.control))} | p1=${f(recVal(bolus.patient1))}(rank ${recoveryRank("patient1")}) p4=${f(recVal(bolus.patient4))}(rank ${recoveryRank("patient4")}) p8=${f(recVal(bolus.patient8))}(rank ${recoveryRank("patient8")})`;
});

// ---------------------------------------------------------------------------
// Case 8 — INITIAL-REDOX ORDERING. Control has the highest pre-bolus GSH/GSSG;
// patients 1, 4, 8 are among the lowest.
// ---------------------------------------------------------------------------

runCase(8, "Initial-redox ordering: control highest, p1/4/8 lowest", (check) => {
  check(
    bolus.control.initialRedox >= maxInitialRedox - 1e-9,
    "control must have the highest pre-bolus GSH/GSSG",
  );
  check(initialRedoxRank("patient1") <= 4, "patient1 must be among the lowest initial redox (bottom-4)");
  check(initialRedoxRank("patient4") <= 4, "patient4 must be among the lowest initial redox (bottom-4)");
  check(initialRedoxRank("patient8") <= 4, "patient8 must be among the lowest initial redox (bottom-4)");

  return `redox(max)=${f(maxInitialRedox)} control=${f(bolus.control.initialRedox)} | p1=${f(bolus.patient1.initialRedox)}(rank ${initialRedoxRank("patient1")}) p4=${f(bolus.patient4.initialRedox)}(rank ${initialRedoxRank("patient4")}) p8=${f(bolus.patient8.initialRedox)}(rank ${initialRedoxRank("patient8")})`;
});

// ---------------------------------------------------------------------------
// Case 9 — DIRECTIONAL. A low-Vmax + high-KmG6P set (patient1: Vmax 1.1,
// KmG6P 152) recovers more slowly than a high-Vmax + low-KmG6P set (control:
// Vmax 64, KmG6P 67).
// ---------------------------------------------------------------------------

runCase(9, "Directional: low-Vmax/high-Km slower than high-Vmax/low-Km", (check) => {
  check(
    recVal(bolus.patient1) > recVal(bolus.control),
    "patient1 (low Vmax, high KmG6P) must recover slower than control",
  );
  return `p1 recovery=${f(recVal(bolus.patient1))} > control recovery=${f(recVal(bolus.control))} (p1 Vmax=${G6PD_PATIENTS.patient1.vmax}/KmG6P=${G6PD_PATIENTS.patient1.kmG6P}, control Vmax=${G6PD_PATIENTS.control.vmax}/KmG6P=${G6PD_PATIENTS.control.kmG6P})`;
});

// ---------------------------------------------------------------------------
// Report.
// ---------------------------------------------------------------------------

console.log("\nReserve — RBC metabolic engine validation\n" + "=".repeat(60));
let failed = 0;
for (const r of reports) {
  const tag = r.pass ? "PASS" : "FAIL";
  console.log(`[${tag}] case ${r.n}: ${r.title}`);
  console.log(`        ${r.summary}`);
  if (!r.pass) {
    failed++;
    for (const msg of r.failures) console.log(`        ↳ ${msg}`);
  }
}
console.log("=".repeat(60));
console.log(
  `${reports.length - failed}/${reports.length} cases passed` +
    (failed ? ` — ${failed} FAILED` : " — all green"),
);

// 11-set ranking table — always printed (even when 7–9 pass) so the computed
// ordering is visible for diagnosis. Sorted by recovery time (slowest last).
console.log("\nG6PD bolus ranking (11 published sets) — sorted by recovery time:");
console.log("  set         recovery   initRedox   minRedox   recovered");
const ordered = [...G6PD_SET_ORDER].sort((a, b) => recVal(bolus[a]) - recVal(bolus[b]));
for (const name of ordered) {
  const b = bolus[name];
  const rec = b.recoveryTime === null ? "did-not-rec" : f(b.recoveryTime).padStart(11);
  console.log(
    `  ${name.padEnd(10)} ${rec} ${f(b.initialRedox).padStart(10)} ${f(b.minRedoxAfterBolus).padStart(10)}   ${b.recovered}`,
  );
}
console.log("");

process.exit(failed > 0 ? 1 : 0);
