// Reserve — type definitions for the red-blood-cell metabolic engine.
//
// floviken-site is a JavaScript project, so the TypeScript interfaces from the
// original Keel build are carried here as JSDoc @typedefs: they document the
// engine's shapes (and give editors type hints) without adding a TS toolchain.
// This module exports nothing at runtime.
//
// Reserve models a single red blood cell as a CONTROL LOOP. The plant is the
// cell's redox chemistry; the regulated variable is its reducing reserve
// (NADPH, and the glutathione pool it keeps charged); the disturbance is an
// oxidant load. The controller is the pentose phosphate pathway, whose entry
// step (G6PD) makes NADPH from NADP+ to defend the setpoint.
//
// Behaviour EMERGES from two independent knobs and one shared parameter set:
//   1. GAIN        — the G6PD reaction. Either an abstract enzyme-activity
//                    multiplier (Genotype, scaling a control Vmax) OR a full
//                    published per-patient kinetic set (G6pdKinetics).
//   2. DISTURBANCE — an oxidant load: a windowed rate (OxidantProfile) or a
//                    one-time H2O2 bolus (the perturbation protocol).
//
// The G6PD rate law and its six parameters are SOURCED from Shimo, Nishino &
// Tomita 2011 (Advances in Hematology, DOI 10.1155/2011/398945). Everything
// else stays reduced/illustrative and is tagged as such in params.mjs.

/**
 * Abstract enzyme-activity multipliers relative to wild-type (1.0 = 100%).
 * The loop GAIN. `g6pd` scales the control-set Vmax of the published rate law.
 * @typedef {Object} Genotype
 * @property {number} g6pd  Glucose-6-phosphate dehydrogenase — the loop gain.
 * @property {number} pk    Pyruvate kinase — gates lower-glycolytic ATP.
 * @property {number} hk    Hexokinase — gates glycolytic entry / carbon supply.
 */

/**
 * The six parameters of the G6PD competitive product/effector-inhibition rate
 * law (Shimo, Nishino & Tomita 2011). Vmax in M/s (relative magnitude); all K's
 * in µM. NOTE: the paper's Table 1 column labeled "KiNADP" is the NADPH
 * inhibition constant per its equation and text — mapped to `kiNADPH` here.
 * @typedef {Object} G6pdKinetics
 * @property {number} vmax
 * @property {number} kmG6P
 * @property {number} kmNADP
 * @property {number} kiNADPH
 * @property {number} kiATP
 * @property {number} ki23BPG
 */

/**
 * Instantaneous metabolic state. Conserved couples are renormalized to their
 * pool total each step; the ATP couple tracks ATP with ADP as its complement.
 * @typedef {Object} RbcState
 * @property {number} nadph
 * @property {number} nadp
 * @property {number} gsh
 * @property {number} gssg
 * @property {number} atp
 * @property {number} adp
 * @property {number} bpg
 * @property {number} h2o2   Transient H2O2 from a one-time bolus; 0 otherwise.
 * @property {number} damage Cumulative oxidative-damage marker (non-decreasing).
 */

/**
 * A windowed oxidant challenge: constant `level` over [tOn, tOff), 0 otherwise.
 * @typedef {Object} OxidantProfile
 * @property {number} level
 * @property {number} tOn
 * @property {number} tOff
 */

/**
 * Optional experimental pins for causal dissection (NOT normal simulation).
 * @typedef {Object} Clamps
 * @property {number} [nadph]
 * @property {number} [gsh]
 */

/**
 * @typedef {Object} SimConfig
 * @property {Genotype} genotype
 * @property {OxidantProfile} oxidant
 * @property {number} duration
 * @property {number} dt
 * @property {G6pdKinetics} [g6pd]   Explicit kinetics; overrides genotype.g6pd.
 * @property {Partial<RbcState>} [initial]
 * @property {Clamps} [clamps]
 */

/**
 * @typedef {Object} BolusConfig
 * @property {G6pdKinetics} [g6pd]
 * @property {Genotype} [genotype]
 * @property {number} dose
 * @property {number} settle
 * @property {number} window
 * @property {number} dt
 */

/**
 * @typedef {Object} BolusReadout
 * @property {string} label
 * @property {number} initialRedox
 * @property {number|null} recoveryTime
 * @property {boolean} recovered
 * @property {number} preBolusGsh
 * @property {number} preBolusGssg
 * @property {number} minRedoxAfterBolus
 */

/**
 * @typedef {RbcState & { t: number }} TrajectoryPoint
 */

/**
 * @typedef {Object} SimulationMetrics
 * @property {number} minNadph
 * @property {number} minGsh
 * @property {number} maxGssg
 * @property {number} finalAtp
 * @property {number} minAtp
 * @property {number} maxBpg
 * @property {number} finalBpg
 * @property {number} finalDamage
 * @property {number} maxDamage
 * @property {boolean} hemolyzed
 * @property {number|null} timeToHemolysis
 * @property {boolean} gshRecovered
 */

/**
 * @typedef {Object} SimulationResult
 * @property {SimConfig} config
 * @property {TrajectoryPoint[]} trajectory
 * @property {SimulationMetrics} metrics
 */

export {};
