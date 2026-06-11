// Reserve — parameters for the RBC metabolic engine.
//
// EVERY tunable number lives here. The engine (engine.mjs) reads from this file
// and contains no magic constants of its own, so the model's behaviour can be
// audited and re-grounded in one place.
//
// PROVENANCE DISCIPLINE
// ---------------------
// Each value is tagged exactly one of:
//
//   sourced          — a QUALITATIVE fact taken from the literature (e.g.
//                      "the resting NADP couple is almost fully reduced",
//                      "PK deficiency elevates 2,3-BPG"). The citation names
//                      where the fact comes from. The fact is sourced; the
//                      exact normalized number is still a modeling choice.
//
//   illustrative-TODO — a magnitude chosen so the reduced model reproduces the
//                      right qualitative behaviour. NOT literature-derived.
//                      The TODO names the grounding target: re-fit against a
//                      published kinetic RBC model.
//
// SESSION 2 — the G6PD reaction is now genuinely sourced. The rate law and its
// six per-patient parameters (G6PD_CONTROL_KINETICS, G6PD_PATIENTS) come from:
//
//   Shimo H, Nishino T, Tomita M. "Predicting the Kinetic Properties Associated
//   with Redox Imbalance after Oxidative Crisis in G6PD-Deficient Erythrocytes:
//   A Simulation Study." Advances in Hematology 2011, 398945.
//   DOI 10.1155/2011/398945.  (Table 1 = 10 patients + control.)
//
// EVERYTHING ELSE remains reduced/illustrative this session — glycolysis,
// glutathione reductase/peroxidase, catalase, transport, AND the absolute
// concentration scales that bridge normalized state to the µM the G6PD rate
// law expects. Those need the paper's supplement (the full network's rate
// constants and initial concentrations), which we do not have yet. So:
//
//   - Only the G6PD reaction (its rate law + 6 parameters) is "sourced".
//   - The concentration scales, the lumped flux scale, the basal/peroxidase
//     constants, and the genotype multipliers stay "illustrative-TODO: ground
//     vs Shimo supplement".
//
// Remaining grounding targets:
//   - Shimo et al. supplement — refit the concentration scales, GR/GPx/catalase
//     constants, and the glycolytic arm against the full published network.
//   - Jacobasch G, Rapoport SM. "Hemolytic anemias due to erythrocyte enzyme
//     deficiencies." Mol Aspects Med 1996 — ground the abstract genotype
//     activity ranges (G6PD WHO classes, PK residual activity) + 2,3-BPG.
//
// Treat the ABSOLUTE non-G6PD numbers as illustrative; only the QUALITATIVE
// structure (which way things move, and why) and the SOURCED G6PD kinetics are
// load-bearing. The session-2 validation checks ORDERING, not absolute values.

// ---------------------------------------------------------------------------
// Conserved pool totals (normalized units).
// ---------------------------------------------------------------------------

// NADP redox couple total: nadph + nadp.
// sourced — the erythrocyte NADP couple is held almost fully reduced at rest
// (NADPH/NADP+ strongly favors NADPH); normalized to 1.0 here.
// [Jacobasch & Rapoport 1996; standard RBC redox physiology]
export const NADP_TOTAL = 1.0;

// Glutathione couple total in GSH-equivalents: gsh + 2*gssg.
// sourced — RBC glutathione sits ~98–99% reduced (GSH) at rest; the factor of
// two reflects one GSSG carrying two glutathione units. Normalized to 1.0.
// [standard RBC glutathione physiology]
export const GSH_TOTAL = 1.0;

// Adenine couple total: atp + adp.
// illustrative-TODO: ground vs Shimo (adenine nucleotide pool). Normalized 1.0.
export const ADENINE_TOTAL = 1.0;

// ---------------------------------------------------------------------------
// Healthy resting state (initial conditions; also the regulation setpoint).
// ---------------------------------------------------------------------------

// These ARE the healthy fixed point of the shared ODE (an undisturbed healthy
// cell sits here and does not drift), so a simulation starts at a real steady
// state rather than relaxing through a spurious startup transient. The values
// were read off a long no-oxidant healthy run and pinned here.
//
// sourced (qualitative) — resting couples are highly reduced (NADPH and GSH
// dominate their pools) and resting ATP is a large, sub-maximal fraction of the
// adenine pool. The reduced model carries no resting GSH turnover, so the
// glutathione couple sits fully reduced (gssg = 0) at rest; a future revision
// could add a small baseline GSH oxidation to seat it at the ~99% of real RBCs.
// illustrative-TODO: ground the exact splits vs Shimo steady state.
// Re-derived for the session-2 rate law (read off a long no-oxidant healthy
// control run; see the probe in the sign-out). nadp/nadph and gssg are no longer
// near-zero because a small basal oxidant (K_BASAL_OXIDANT) now gives the cell a
// continuous resting redox job — which is what makes the resting GSH/GSSG finite
// and G6PD-dependent (the basis for the initial-redox ordering).
export const RESTING = {
  nadph: 0.995801,
  nadp: 0.004199, // nadph + nadp = 1.0
  gsh: 0.994737,
  gssg: 0.002631, // gsh + 2*gssg = 1.0
  atp: 0.765134,
  adp: 0.234866, // atp + adp = 1.0
  bpg: 1.0, // healthy baseline 2,3-BPG, normalized to 1.0
  h2o2: 0,
  damage: 0,
};

// ---------------------------------------------------------------------------
// Substrate supply (glycolytic entry / hexokinase gate).
// ---------------------------------------------------------------------------

// Glucose availability, normalized. Treated as an abundant, ~constant substrate
// this session.
// illustrative-TODO: ground vs Shimo (glucose transport / HK).
export const GLUCOSE = 1.0;

// Half-saturation for glucose at the hexokinase step. Small relative to GLUCOSE
// so supply is near-saturating at rest (HK is gated mainly by its multiplier).
// illustrative-TODO: ground vs Shimo (HK Km for glucose).
export const KM_GLUCOSE = 0.1;

// ---------------------------------------------------------------------------
// Concentration scales — bridge normalized state <-> µM for the G6PD rate law.
// ---------------------------------------------------------------------------
//
// The integrated state is normalized (pools sum to 1); the published G6PD rate
// law's K's are in µM. These scales convert a normalized pool fraction to a µM
// concentration before the rate law sees it. They are NOT the paper's values —
// they are representative RBC magnitudes chosen so the inhibition terms land in
// a sensitive regime. The whole point of the session-2 validation is that the
// SEVERITY ORDERING is robust to these scales (only the rate-law parameters
// differ between patients), so absolute calibration is deferred.
// illustrative-TODO: ground all four vs Shimo supplement (pool sizes).
export const NADP_POOL_UM = 50; // total NADP + NADPH, µM
export const G6P_UM = 40; // glucose-6-phosphate seen by G6PD, µM
export const ADENINE_POOL_UM = 1500; // total ATP + ADP, µM
export const BPG_POOL_UM = 4500; // 2,3-BPG at normalized 1.0, µM

// Lumped scale converting the rate law's output (paper Vmax units) into the
// normalized NADPH-production rate per unit model-time. Absorbs the unit
// ambiguity between M/s and abstract model time, and sets the overall loop gain
// in model units. Tuned so a healthy control cell rests with NADPH near the top
// of its pool and rejects the windowed challenge (session-1 cases).
// illustrative-TODO: ground vs Shimo supplement (PPP flux in real units + time).
export const G6PD_FLUX_SCALE = 0.45;

// Baseline NADPH drain unrelated to the oxidant disturbance (biosynthesis,
// NADPH-dependent systems other than glutathione). Small direct NADPH->NADP+
// leak. Kept tiny so even the lowest-Vmax patient covers it at rest.
// illustrative-TODO: ground vs Shimo (resting non-GR NADPH turnover).
export const K_BASELINE_OXIDATION = 0.002;

// ---------------------------------------------------------------------------
// Glutathione reductase — the ACTUATOR (spends NADPH to recharge GSH).
// ---------------------------------------------------------------------------

// Max glutathione-reductase rate.
// illustrative-TODO: ground vs Shimo (GR module).
export const VMAX_GR = 1.0;

// GR half-saturation in NADPH. As NADPH collapses, GR stalls — so a cell that
// loses its NADPH reserve can no longer recharge GSH even with GSSG present.
// This coupling is why GSH collapse FOLLOWS NADPH collapse, not the reverse.
// illustrative-TODO: ground vs Shimo (GR Km for NADPH).
export const KM_NADPH_GR = 0.1;

// GR half-saturation in GSSG. Small, so GR responds to modest oxidized load.
// illustrative-TODO: ground vs Shimo (GR Km for GSSG).
export const KM_GSSG = 0.05;

// ---------------------------------------------------------------------------
// Oxidant load — the DISTURBANCE (consumes GSH via glutathione peroxidase).
// ---------------------------------------------------------------------------

// Half-saturation in GSH for oxidant consumption (2 GSH -> GSSG per turn).
// illustrative-TODO: ground vs Shimo (GPx module).
export const KM_GSH_OX = 0.1;

// Basal oxidant load — a small constant background ROS leak that continuously
// oxidizes GSH (2 GSH -> GSSG). This is what gives the resting cell a steady,
// finite GSH/GSSG instead of a fully-reduced couple: a cell with weak G6PD must
// sit at a more-oxidized steady state to clear the same basal load, so its
// resting GSH/GSSG is lower. That G6PD-dependence is the basis of the
// initial-redox ordering. Kept small enough that even the lowest-Vmax patient
// reaches a stable (if oxidized) baseline rather than running away at rest.
// illustrative-TODO: ground vs Shimo supplement (basal H2O2 / GPx turnover).
export const K_BASAL_OXIDANT = 0.05;

// Glutathione-peroxidase rate constant for consuming bolus H2O2 (it oxidizes
// GSH as it goes). Because GPx scales with GSH, a cell that cannot keep GSH up
// consumes the bolus more slowly, so the insult lingers — amplifying severity
// for weak cells, as the paper's crisis protocol intends.
// illustrative-TODO: ground vs Shimo supplement (GPx kcat / [GPx]).
export const K_GPX = 2.0;

// ---------------------------------------------------------------------------
// Bolus perturbation protocol (Shimo et al.: 0.1 mM H2O2 at t=0, observe ~30
// min). Model-time units are treated as minutes here.
// ---------------------------------------------------------------------------

// Total glutathione pool in GSH-equivalents (µM), used only to convert the
// H2O2 bolus dose into normalized units.
// illustrative-TODO: ground vs Shimo supplement (glutathione pool).
export const GSH_POOL_UM = 3000;

// The paper's bolus: 0.1 mM = 100 µM H2O2. One H2O2 oxidizes 2 GSH -> 1 GSSG,
// so in normalized units it can produce (100 / GSH_POOL_UM) of GSSG.
// sourced (protocol) — 0.1 mM H2O2 at t=0. [Shimo et al. 2011]
export const BOLUS_H2O2_UM = 100;
export const BOLUS_DOSE = BOLUS_H2O2_UM / GSH_POOL_UM; // normalized

// Settle time before the bolus (reach the pre-bolus steady state) and the
// post-bolus observation window (recovery-time search cap). 30 = "~30 minutes".
// illustrative-TODO: settle long enough for the slowest patient to equilibrate.
export const BOLUS_SETTLE = 400;
export const BOLUS_WINDOW = 30;
export const BOLUS_DT = 0.02;

// GSH/GSSG counts as "recovered" when it returns within this fractional
// tolerance of the pre-bolus steady state.
// illustrative-TODO: convention, not a measured value.
export const REDOX_RECOVERY_TOL = 0.05;

// Default windowed oxidant challenge used by the session-1 harness. The SAME
// level is applied to the healthy and the G6PD-deficient cell — only the gain
// (genotype) differs. The level sits in the window where a high-gain cell
// rejects it and a low-gain cell cannot.
// illustrative-TODO: ground vs Jacobasch (oxidant exposure dose-response).
export const OXIDANT_CHALLENGE = {
  level: 0.6,
  tOn: 10,
  tOff: 130,
};

// ---------------------------------------------------------------------------
// Glycolytic ATP arm (pyruvate-kinase-gated) + 2,3-BPG shunt.
// These run independent of the redox loop this session.
// ---------------------------------------------------------------------------

// Max pyruvate-kinase ATP-production rate (at full PK activity, saturating
// supply and ADP). Tuned with K_ATPASE so healthy ATP rests at RESTING.atp.
// illustrative-TODO: ground vs Shimo (PK module + net glycolytic ATP yield).
export const VMAX_PK = 0.72;

// PK half-saturation in ADP (ATP production needs ADP to phosphorylate; this
// makes production self-limiting and gives ATP a stable equilibrium).
// illustrative-TODO: ground vs Shimo (PK Km for ADP).
export const KM_ADP = 0.1;

// First-order ATP consumption (membrane pumps and housekeeping). Falls as ATP
// falls, so a low-supply (PK-deficient) cell settles at a depressed but
// non-zero ATP rather than running to zero.
// illustrative-TODO: ground vs Shimo (ATPase load).
export const K_ATPASE = 0.6;

// 2,3-BPG synthesis rate constant (Rapoport–Luebering shunt off 1,3-BPG).
// illustrative-TODO: ground vs Shimo (BPG mutase).
export const K_BPG_SYN = 1.0;

// 2,3-BPG degradation rate constant (BPG phosphatase back into glycolysis).
// Set so the healthy fixed point lands at RESTING.bpg (1.0): at healthy supply
// and diversion, synthesis = K_BPG_SYN * (GLUCOSE/(GLUCOSE+KM_GLUCOSE)) * 0.5 =
// 0.454545, and bpg_ss = synthesis / K_BPG_DEG = 1.0.
// illustrative-TODO: ground vs Shimo (BPG phosphatase).
export const K_BPG_DEG = 0.454545;

// Diversion half-constant: the fraction of upstream glycolytic flux shunted into
// 2,3-BPG is KM_PK_DIVERSION / (KM_PK_DIVERSION + pk). When PK pull-through
// falls (low pk), upstream intermediates back up and divert into 2,3-BPG, so
// 2,3-BPG RISES as PK activity falls.
// sourced (qualitative) — PK deficiency elevates 2,3-BPG (a clinically
// load-bearing fact: it right-shifts O2 delivery and softens the anemia).
// [Jacobasch & Rapoport 1996]
// illustrative-TODO: ground the numeric diversion vs Shimo.
export const KM_PK_DIVERSION = 1.0;

// ---------------------------------------------------------------------------
// Damage / hemolysis — keyed to NADPH, the cell's true reducing RESERVE.
// ---------------------------------------------------------------------------

// Critical NADPH level. Below this the cell can no longer protect itself
// (catalase / peroxiredoxin / thioredoxin and hemoglobin all depend on NADPH,
// not on GSH directly). Damage accrues in proportion to the NADPH DEFICIT below
// this line — and on nothing else. This is the module's central claim: GSH is
// the visible intermediate, NADPH is the reserve that determines survival.
// sourced (qualitative) — NADPH, not GSH per se, is the limiting reductant
// whose exhaustion precedes oxidative hemolysis. [RBC oxidative-stress
// physiology; Jacobasch & Rapoport 1996]
// illustrative-TODO: ground the numeric threshold vs a kinetic model.
export const NADPH_CRIT = 0.5;

// Damage accrual gain (damage per unit NADPH deficit per unit time).
// illustrative-TODO: ground vs a hemolysis time-course.
export const K_DAMAGE = 0.5;

// Cumulative damage at which the cell is considered hemolyzed (irreversible).
// illustrative-TODO: ground vs a hemolysis endpoint.
export const HEMOLYSIS_THRESHOLD = 1.0;

// GSH fraction of its starting value that counts as "recovered" by end of run
// (used to distinguish a dip-then-recover from a collapse in the harness).
// illustrative-TODO: convention, not a measured value.
export const GSH_RECOVERY_FRACTION = 0.9;

// ---------------------------------------------------------------------------
// Published G6PD kinetics — Shimo, Nishino & Tomita 2011, Table 1 (SOURCED).
// ---------------------------------------------------------------------------
//
// The six parameters of the competitive product/effector-inhibition rate law
// (see engine.mjs for the equation). Vmax in M/s (paper units; treated as a
// relative magnitude bridged to model time by G6PD_FLUX_SCALE); all K's in µM.
//
// NOTE: the paper's Table 1 column labeled "KiNADP" is the NADPH inhibition
// constant per its equation and text — it is mapped to `kiNADPH` here.
//
// These are the ONLY sourced rate constants in the model. The 10 patients span
// a wide severity range; "control" is the non-deficient reference.

// Display/iteration order for the 11 sets (patients 1–10 then control).
export const G6PD_SET_ORDER = [
  "patient1",
  "patient2",
  "patient3",
  "patient4",
  "patient5",
  "patient6",
  "patient7",
  "patient8",
  "patient9",
  "patient10",
  "control",
];

// Table 1, verbatim. Columns: Vmax, KmG6P, KmNADP, KiNADPH (paper "KiNADP"),
// KiATP, Ki2,3BPG.
export const G6PD_PATIENTS = {
  patient1: { vmax: 1.1, kmG6P: 152, kmNADP: 3.8, kiNADPH: 0.62, kiATP: 180, ki23BPG: 520 },
  patient2: { vmax: 36.7, kmG6P: 140, kmNADP: 115, kiNADPH: 33.6, kiATP: 4687, ki23BPG: 8515 },
  patient3: { vmax: 0.8, kmG6P: 7, kmNADP: 4.1, kiNADPH: 8.9, kiATP: 952, ki23BPG: 1071 },
  patient4: { vmax: 0.8, kmG6P: 43, kmNADP: 155, kiNADPH: 56, kiATP: 11000, ki23BPG: 35000 },
  patient5: { vmax: 37.1, kmG6P: 57, kmNADP: 30.5, kiNADPH: 3.7, kiATP: 5016, ki23BPG: 5507 },
  patient6: { vmax: 14.5, kmG6P: 66, kmNADP: 3.5, kiNADPH: 1.1, kiATP: 212, ki23BPG: 532 },
  patient7: { vmax: 8.9, kmG6P: 80, kmNADP: 3.6, kiNADPH: 1.0, kiATP: 125, ki23BPG: 586 },
  patient8: { vmax: 0.8, kmG6P: 68, kmNADP: 1.4, kiNADPH: 0.9, kiATP: 500, ki23BPG: 2000 },
  patient9: { vmax: 0.6, kmG6P: 40, kmNADP: 4.8, kiNADPH: 6.9, kiATP: 314, ki23BPG: 3784 },
  patient10: { vmax: 18.9, kmG6P: 79, kmNADP: 3.0, kiNADPH: 4.1, kiATP: 407, ki23BPG: 2200 },
  control: { vmax: 64.0, kmG6P: 67, kmNADP: 3.7, kiNADPH: 3.1, kiATP: 749, ki23BPG: 2289 },
};

// The control set is the default kinetics for genotype mode: the abstract
// `Genotype.g6pd` multiplier scales this Vmax when no explicit set is supplied,
// so the session-1 genotype-driven cases reuse the published rate-law shape.
export const G6PD_CONTROL_KINETICS = G6PD_PATIENTS.control;

// ---------------------------------------------------------------------------
// Genotypes — the abstract loop GAIN. Enzyme-activity multipliers.
// ---------------------------------------------------------------------------
//
// A genotype is three multipliers (g6pd, pk, hk) and nothing else. No genotype
// carries an outcome; outcomes emerge from gain × disturbance in the engine.
// In session 2, `g6pd` scales the control-set Vmax of the published rate law.

// Wild-type: 100% activity across the board.
// sourced — reference point by definition.
export const HEALTHY = { g6pd: 1.0, pk: 1.0, hk: 1.0 };

// Severe G6PD deficiency. WHO Class I/II G6PD variants run at well under 10% of
// normal activity (often only a few percent); 4% is a representative severe
// value. This is LOW LOOP GAIN — the cell cannot ramp NADPH production to meet
// a large oxidant disturbance.
// sourced (qualitative) — severe G6PD variants have <10% residual activity.
// [WHO classification; Jacobasch & Rapoport 1996]
// illustrative-TODO: the exact 4% is representative, not a specific variant.
export const G6PD_SEVERE = { g6pd: 0.04, pk: 1.0, hk: 1.0 };

// Pyruvate kinase deficiency. Symptomatic PK deficiency typically runs at
// roughly 5–25% residual activity; 25% is a representative value. Affects the
// ATP / 2,3-BPG arm; redox gain (G6PD) is normal.
// sourced (qualitative) — PK-deficient residual activity is a low fraction of
// normal and depresses ATP while elevating 2,3-BPG. [Jacobasch & Rapoport 1996]
// illustrative-TODO: the exact 25% is representative, not a specific variant.
export const PK_DEFICIENCY = { g6pd: 1.0, pk: 0.25, hk: 1.0 };
