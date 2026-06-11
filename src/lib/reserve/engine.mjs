// Reserve — the RBC metabolic engine.
//
// A reduced metabolic ODE system integrated with a fixed-step RK4 solver. The
// model is a CONTROL LOOP (see types.mjs for the framing):
//
//   disturbance        oxidant load consumes GSH  ->  GSSG accumulates
//   actuator           glutathione reductase spends NADPH to recharge GSH
//   error signal       GSSG/GSH drain raises NADP+ (the oxidized fraction)
//   controller         G6PD (the PPP entry step) makes NADPH from NADP+
//   gain               the G6PD reaction's capacity
//   reserve            NADPH — when it is exhausted, damage accrues
//
// SESSION 2: the controller's rate law is now the published G6PD kinetics
// (Shimo, Nishino & Tomita 2011). The surrounding enzymes stay reduced.
//
// A high-capacity (control) cell rejects the disturbance; a low-capacity
// (deficient) cell under a large enough disturbance cannot make NADPH fast
// enough, GSH collapses behind it, and damage crosses the hemolysis threshold.
//
// The ATP / 2,3-BPG arm runs independent of the redox loop this session.
//
// Determinism: pure arithmetic, fixed step, fixed evaluation order, no clocks
// or RNG. Identical config -> identical trajectory, every run.

import * as P from "./params.mjs";

// Michaelis–Menten saturation, guarded at/below zero.
function mm(x, km) {
  return x <= 0 ? 0 : x / (x + km);
}

// Rectified deficit: how far `x` sits below `threshold`, never negative.
function deficit(threshold, x) {
  const d = threshold - x;
  return d > 0 ? d : 0;
}

const NO_OXIDANT = { level: 0, tOn: 0, tOff: 0 };

// ---------------------------------------------------------------------------
// The G6PD rate law — SOURCED (Shimo, Nishino & Tomita 2011, Adv Hematol,
// DOI 10.1155/2011/398945). Competitive product/effector inhibition by NADPH,
// ATP and 2,3-BPG:
//
//   v = Vmax * ( [NADP][G6P] / (KmNADP·KmG6P) )
//       / ( 1
//           + ([NADP]/KmNADP)·(1 + [G6P]/KmG6P)
//           + [NADPH]/KiNADPH
//           + [ATP]/KiATP
//           + [2,3BPG]/Ki2,3BPG )
//
// The integrated state is normalized; this law needs µM. The params.mjs
// concentration scales convert normalized pools -> µM, and G6PD_FLUX_SCALE
// converts the resulting flux back to the normalized NADPH-production rate per
// unit model-time. `g6pUM` is the (HK-gated) glucose-6-phosphate seen by G6PD.
// ---------------------------------------------------------------------------
function g6pdFlux(s, k, g6pUM) {
  const nadpUM = s.nadp * P.NADP_POOL_UM;
  const nadphUM = s.nadph * P.NADP_POOL_UM;
  const atpUM = s.atp * P.ADENINE_POOL_UM;
  const bpgUM = s.bpg * P.BPG_POOL_UM;

  const num = (k.vmax * (nadpUM * g6pUM)) / (k.kmNADP * k.kmG6P);
  const den =
    1 +
    (nadpUM / k.kmNADP) * (1 + g6pUM / k.kmG6P) +
    nadphUM / k.kiNADPH +
    atpUM / k.kiATP +
    bpgUM / k.ki23BPG;

  return (P.G6PD_FLUX_SCALE * num) / den;
}

// Resolve the G6PD kinetics for a run: an explicit per-patient set if supplied,
// otherwise the control set with Vmax scaled by the abstract genotype gain.
function resolveKinetics(g6pd, genotype) {
  if (g6pd) return g6pd;
  return {
    ...P.G6PD_CONTROL_KINETICS,
    vmax: P.G6PD_CONTROL_KINETICS.vmax * genotype.g6pd,
  };
}

// The right-hand side of the ODE system: dState/dt at a given state, windowed
// oxidant level, genotype, and resolved G6PD kinetics.
function derivatives(s, oxidant, g, kinetics) {
  // Glycolytic carbon entry — hexokinase-gated supply for the ATP/BPG arm, and
  // the (HK-gated) G6P concentration the G6PD rate law sees.
  const supply = g.hk * mm(P.GLUCOSE, P.KM_GLUCOSE);
  const g6pUM = P.G6P_UM * g.hk;

  // Controller — published G6PD rate law (normalized NADPH production).
  const vG6PD = g6pdFlux(s, kinetics, g6pUM);

  // Glutathione reductase — actuator. Spends NADPH to turn GSSG back into GSH;
  // stalls as NADPH falls (so GSH cannot recover once the reserve is gone).
  const vGR = P.VMAX_GR * mm(s.nadph, P.KM_NADPH_GR) * mm(s.gssg, P.KM_GSSG);

  // GSH oxidation sources (each: 2 GSH -> GSSG per turn):
  //   windowed disturbance (session-1), constant basal leak, and the transient
  //   bolus H2O2 consumed by glutathione peroxidase.
  const vOxWindow = oxidant * mm(s.gsh, P.KM_GSH_OX);
  const vBasal = P.K_BASAL_OXIDANT * mm(s.gsh, P.KM_GSH_OX);
  const vGPx = P.K_GPX * s.h2o2 * mm(s.gsh, P.KM_GSH_OX);
  const vOxTotal = vOxWindow + vBasal + vGPx;

  // Direct baseline NADPH drain (non-glutathione housekeeping).
  const vBase = P.K_BASELINE_OXIDATION * mm(s.nadph, P.KM_NADPH_GR);

  // ATP arm — pyruvate-kinase-gated production vs first-order consumption.
  const vPK = P.VMAX_PK * g.pk * supply * mm(s.adp, P.KM_ADP);
  const vATPase = P.K_ATPASE * s.atp;

  // 2,3-BPG shunt — diversion rises as PK pull-through falls.
  const diversion = P.KM_PK_DIVERSION / (P.KM_PK_DIVERSION + g.pk);
  const vBPGsyn = P.K_BPG_SYN * supply * diversion;
  const vBPGdeg = P.K_BPG_DEG * s.bpg;

  // Damage keys off the NADPH RESERVE, not GSH (the session-1 causal claim).
  const dDamage = P.K_DAMAGE * deficit(P.NADPH_CRIT, s.nadph);

  return {
    nadph: vG6PD - vGR - vBase,
    nadp: -vG6PD + vGR + vBase,
    gsh: 2 * vGR - 2 * vOxTotal,
    gssg: -vGR + vOxTotal,
    atp: vPK - vATPase,
    adp: -(vPK - vATPase),
    bpg: vBPGsyn - vBPGdeg,
    h2o2: -vGPx,
    damage: dDamage,
  };
}

// s + h * d, componentwise (used for the RK4 stage states).
function step(s, d, h) {
  return {
    nadph: s.nadph + h * d.nadph,
    nadp: s.nadp + h * d.nadp,
    gsh: s.gsh + h * d.gsh,
    gssg: s.gssg + h * d.gssg,
    atp: s.atp + h * d.atp,
    adp: s.adp + h * d.adp,
    bpg: s.bpg + h * d.bpg,
    h2o2: s.h2o2 + h * d.h2o2,
    damage: s.damage + h * d.damage,
  };
}

// Pull a state back onto its conservation manifolds after a raw RK4 step:
// clamp every variable non-negative, then renormalize each conserved couple to
// its pool total, then apply any experimental clamps. h2o2 and damage are not
// conserved — a non-negative clamp is all they need.
function renormalize(s, clamps) {
  const nadph = Math.max(0, s.nadph);
  const nadp = Math.max(0, s.nadp);
  const gsh = Math.max(0, s.gsh);
  const gssg = Math.max(0, s.gssg);
  const atp = Math.max(0, s.atp);
  const adp = Math.max(0, s.adp);

  // NADP couple -> NADP_TOTAL.
  const nadpSum = nadph + nadp;
  const nf = nadpSum > 0 ? P.NADP_TOTAL / nadpSum : 0;
  // Glutathione couple (gsh + 2*gssg) -> GSH_TOTAL.
  const gQty = gsh + 2 * gssg;
  const gf = gQty > 0 ? P.GSH_TOTAL / gQty : 0;
  // Adenine couple -> ADENINE_TOTAL.
  const aSum = atp + adp;
  const af = aSum > 0 ? P.ADENINE_TOTAL / aSum : 0;

  const out = {
    nadph: nadph * nf,
    nadp: nadp * nf,
    gsh: gsh * gf,
    gssg: gssg * gf,
    atp: atp * af,
    adp: adp * af,
    bpg: Math.max(0, s.bpg),
    h2o2: Math.max(0, s.h2o2),
    damage: Math.max(0, s.damage),
  };

  // Experimental clamps (causal dissection only). Pin a variable and rebalance
  // its conserved partner so the couple stays consistent.
  if (clamps?.nadph !== undefined) {
    out.nadph = Math.min(P.NADP_TOTAL, Math.max(0, clamps.nadph));
    out.nadp = P.NADP_TOTAL - out.nadph;
  }
  if (clamps?.gsh !== undefined) {
    out.gsh = Math.min(P.GSH_TOTAL, Math.max(0, clamps.gsh));
    out.gssg = (P.GSH_TOTAL - out.gsh) / 2;
  }

  return out;
}

// One RK4 step across [t, t+dt], evaluating the (time-dependent) oxidant at the
// correct sub-times, then renormalizing back onto the conservation manifolds.
function rk4(s, t, dt, config, kinetics) {
  const g = config.genotype;
  const ox1 = oxidantAt(t, config.oxidant);
  const oxMid = oxidantAt(t + dt / 2, config.oxidant);
  const ox4 = oxidantAt(t + dt, config.oxidant);

  const k1 = derivatives(s, ox1, g, kinetics);
  const k2 = derivatives(step(s, k1, dt / 2), oxMid, g, kinetics);
  const k3 = derivatives(step(s, k2, dt / 2), oxMid, g, kinetics);
  const k4 = derivatives(step(s, k3, dt), ox4, g, kinetics);

  const next = {
    nadph: s.nadph + (dt / 6) * (k1.nadph + 2 * k2.nadph + 2 * k3.nadph + k4.nadph),
    nadp: s.nadp + (dt / 6) * (k1.nadp + 2 * k2.nadp + 2 * k3.nadp + k4.nadp),
    gsh: s.gsh + (dt / 6) * (k1.gsh + 2 * k2.gsh + 2 * k3.gsh + k4.gsh),
    gssg: s.gssg + (dt / 6) * (k1.gssg + 2 * k2.gssg + 2 * k3.gssg + k4.gssg),
    atp: s.atp + (dt / 6) * (k1.atp + 2 * k2.atp + 2 * k3.atp + k4.atp),
    adp: s.adp + (dt / 6) * (k1.adp + 2 * k2.adp + 2 * k3.adp + k4.adp),
    bpg: s.bpg + (dt / 6) * (k1.bpg + 2 * k2.bpg + 2 * k3.bpg + k4.bpg),
    h2o2: s.h2o2 + (dt / 6) * (k1.h2o2 + 2 * k2.h2o2 + 2 * k3.h2o2 + k4.h2o2),
    damage: s.damage + (dt / 6) * (k1.damage + 2 * k2.damage + 2 * k3.damage + k4.damage),
  };

  return renormalize(next, config.clamps);
}

// The oxidant disturbance at model-time `t`: a constant level inside the
// challenge window, zero outside it.
export function oxidantAt(t, oxidant) {
  return t >= oxidant.tOn && t < oxidant.tOff ? oxidant.level : 0;
}

// Build the healthy resting state, then apply any caller overrides.
function initialState(config) {
  const base = {
    nadph: P.RESTING.nadph,
    nadp: P.RESTING.nadp,
    gsh: P.RESTING.gsh,
    gssg: P.RESTING.gssg,
    atp: P.RESTING.atp,
    adp: P.RESTING.adp,
    bpg: P.RESTING.bpg,
    h2o2: P.RESTING.h2o2,
    damage: P.RESTING.damage,
  };
  const merged = { ...base, ...(config.initial ?? {}) };
  // Place the start point on the conservation manifolds and honor clamps at t=0.
  return renormalize(merged, config.clamps);
}

// Derive the whole-run summary metrics from a completed trajectory.
function computeMetrics(traj) {
  const first = traj[0];
  let minNadph = Infinity;
  let minGsh = Infinity;
  let maxGssg = -Infinity;
  let minAtp = Infinity;
  let maxBpg = -Infinity;
  let maxDamage = -Infinity;
  let timeToHemolysis = null;

  for (const p of traj) {
    if (p.nadph < minNadph) minNadph = p.nadph;
    if (p.gsh < minGsh) minGsh = p.gsh;
    if (p.gssg > maxGssg) maxGssg = p.gssg;
    if (p.atp < minAtp) minAtp = p.atp;
    if (p.bpg > maxBpg) maxBpg = p.bpg;
    if (p.damage > maxDamage) maxDamage = p.damage;
    if (timeToHemolysis === null && p.damage >= P.HEMOLYSIS_THRESHOLD) {
      timeToHemolysis = p.t;
    }
  }

  const last = traj[traj.length - 1];
  return {
    minNadph,
    minGsh,
    maxGssg,
    finalAtp: last.atp,
    minAtp,
    maxBpg,
    finalBpg: last.bpg,
    finalDamage: last.damage,
    maxDamage,
    hemolyzed: maxDamage >= P.HEMOLYSIS_THRESHOLD,
    timeToHemolysis,
    gshRecovered: last.gsh >= P.GSH_RECOVERY_FRACTION * first.gsh,
  };
}

// Integrate a configuration to completion and return the full trajectory plus
// derived metrics. The trajectory includes the initial point and one point per
// fixed RK4 step.
export function simulate(config) {
  const steps = Math.round(config.duration / config.dt);
  const kinetics = resolveKinetics(config.g6pd, config.genotype);
  const trajectory = [];

  let s = initialState(config);
  trajectory.push({ t: 0, ...s });

  for (let i = 0; i < steps; i++) {
    const t = i * config.dt;
    s = rk4(s, t, config.dt, config, kinetics);
    trajectory.push({ t: (i + 1) * config.dt, ...s });
  }

  return { config, trajectory, metrics: computeMetrics(trajectory) };
}

// ---------------------------------------------------------------------------
// Bolus perturbation (session-2 protocol). Settle to the pre-bolus steady
// state, apply a one-time H2O2 bolus, observe recovery of the GSH/GSSG ratio.
// ---------------------------------------------------------------------------
export function simulateBolus(label, cfg) {
  const genotype = cfg.genotype ?? P.HEALTHY;

  // 1. Settle (no oxidant) to the pre-bolus steady state.
  const settle = simulate({
    genotype,
    g6pd: cfg.g6pd,
    oxidant: NO_OXIDANT,
    duration: cfg.settle,
    dt: cfg.dt,
  });
  const settled = settle.trajectory[settle.trajectory.length - 1];
  const preBolusGsh = settled.gsh;
  const preBolusGssg = settled.gssg;
  const initialRedox = preBolusGssg > 0 ? preBolusGsh / preBolusGssg : Infinity;

  // 2. Apply the bolus (set H2O2) from the settled state and observe.
  const obs = simulate({
    genotype,
    g6pd: cfg.g6pd,
    oxidant: NO_OXIDANT,
    duration: cfg.window,
    dt: cfg.dt,
    initial: {
      nadph: settled.nadph,
      nadp: settled.nadp,
      gsh: settled.gsh,
      gssg: settled.gssg,
      atp: settled.atp,
      adp: settled.adp,
      bpg: settled.bpg,
      h2o2: cfg.dose,
      damage: settled.damage,
    },
  });

  // 3. Recovery time: after the ratio dips below tolerance (the insult lands),
  // the first time it climbs back within tolerance of the pre-bolus value.
  const threshold = initialRedox * (1 - P.REDOX_RECOVERY_TOL);
  let dipped = false;
  let recoveryTime = null;
  let minRedoxAfterBolus = initialRedox;

  for (const p of obs.trajectory) {
    const redox = p.gssg > 1e-12 ? p.gsh / p.gssg : Infinity;
    if (redox < minRedoxAfterBolus) minRedoxAfterBolus = redox;
    if (redox < threshold) dipped = true;
    if (dipped && recoveryTime === null && redox >= threshold) {
      recoveryTime = p.t;
    }
  }

  // If the bolus never perturbed the ratio beyond tolerance, it "recovered"
  // immediately; if it dipped but never returned within the window, it did not.
  const recovered = !dipped || recoveryTime !== null;
  if (!dipped) recoveryTime = 0;

  return {
    label,
    initialRedox,
    recoveryTime,
    recovered,
    preBolusGsh,
    preBolusGssg,
    minRedoxAfterBolus,
  };
}
