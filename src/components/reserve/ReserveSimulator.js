// Reserve — the live room simulator (Experiment 09).
//
// A THIN VIEW over the real engine in src/lib/reserve/. It adds NO model logic:
// every number on screen comes from simulate() in engine.mjs, and the
// genotypes/baselines come from params.mjs. The job here is only to (1) let a
// visitor pick a genotype and an oxidant level, (2) run the real ODE, and (3)
// animate the trajectory forward so the cell's reserves can be watched draining
// and either recovering or running away.
//
// Ported from the Keel build (session 3). Two changes for floviken-site: it is
// plain JS (no TypeScript), and it is styled with this site's inline-hex tokens
// instead of Keel's CSS variables. The site is light-only, so the original
// dark-mode gauge handling is dropped. The four gauge hexes are kept verbatim.
//
// Why these run constants: the published G6PD rate law (session 2) is stiff;
// the fixed-step RK4 is only stable at dt <= 0.1 (at dt = 0.25 it spuriously
// crashes NADPH to zero even with no oxidant). So the UI integrates at dt = 0.1
// — the same step the validation harness uses. duration/window and the slider
// range were chosen off an engine probe so a severe-G6PD cell under a moderate
// oxidant tips into failure while a healthy cell rides the same disturbance out
// — the two-click teaching contrast.

"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { simulate } from "@/lib/reserve/engine.mjs";
import {
  HEALTHY,
  G6PD_SEVERE,
  PK_DEFICIENCY,
  RESTING,
  NADPH_CRIT,
  HEMOLYSIS_THRESHOLD,
} from "@/lib/reserve/params.mjs";
import { ReserveCell } from "./cell";

// --- floviken-site tokens (inline hex; the site has no CSS-var palette) ------
const SANS = '"Inter", -apple-system, "Segoe UI", Roboto, system-ui, sans-serif';
const C = {
  ink: "#2a2a2a",
  body: "#4a4a4a",
  muted: "#8a8a8a",
  rule: "#d8d2c5",
  surface: "#ffffff",
  accent: "#7a1f2b", // oxblood/maroon — the Reserve room accent
  accentBg: "#f3e7e4", // pale maroon tint (selected genotype)
  card: "#f1ede3", // warm card surface (gauges, plot)
  track: "#e2dac9", // empty bar segment
  grid: "#d8d2c5", // baseline / reference rules on the plot
  success: "#2d7a3e",
  warning: "#b07d2d",
  danger: "#a32d2d",
};
// Mandated gauge hexes — kept verbatim across the port.
const GAUGE_COLOR = {
  nadph: "#1D9E75",
  gsh: "#378ADD",
  atp: "#BA7517",
  bpg: "#7F77DD",
};

// --- genotypes: EXACTLY the three that exist in params.mjs ------------------
// Labels are faithful to the engine's own comments. The severe set is "≈4%
// activity (WHO class I/II)"; params.mjs explicitly notes 4% is a representative
// severe value, not a named variant — so the label says "severe", not
// "Mediterranean", to avoid claiming a variant the engine does not model.
const GENOTYPES = [
  { key: "healthy", label: "Healthy", note: "full enzyme activity", genotype: HEALTHY },
  {
    key: "g6pd",
    label: "G6PD — severe",
    note: "≈4% activity · WHO class I/II",
    genotype: G6PD_SEVERE,
  },
  {
    key: "pk",
    label: "Pyruvate kinase",
    note: "≈25% activity",
    genotype: PK_DEFICIENCY,
  },
];

// --- calibrated run constants ----------------------------------------------
const DT = 0.1;
const DURATION = 60;
const OX_ON = 6;
// Sustained disturbance: the oxidant comes on at OX_ON and stays on for the
// rest of the run (OX_OFF past DURATION). This keeps the displayed state honest
// — a hemolyzed cell's reserves stay drained to the final frame instead of
// refilling after a pulse ends while the verdict still (correctly) reads
// "damaged past recovery". A surviving cell instead settles at a depressed but
// stable level and holds it: the loop rejecting a continuous disturbance.
const OX_OFF = 220;
const OX_MAX = 1.5;
const OX_STEP = 0.05;
const OX_DEFAULT = 0.6;
const DEFAULT_GENO = "g6pd";
const ANIM_MS = 4000;

// --- gauges: one reserve variable each --------------------------------------
// `base` is the resting baseline the live value is shown as a percentage of.
const GAUGES = [
  { key: "nadph", label: "NADPH", color: GAUGE_COLOR.nadph, base: RESTING.nadph },
  { key: "gsh", label: "Glutathione", color: GAUGE_COLOR.gsh, base: RESTING.gsh },
  { key: "atp", label: "ATP", color: GAUGE_COLOR.atp, base: RESTING.atp },
  { key: "bpg", label: "2,3-BPG", color: GAUGE_COLOR.bpg, base: RESTING.bpg },
];

const N_BARS = 14;
const PLOT_W = 620;
const PLOT_H = 200;
const PLOT_PAD = 10;
const Y_MAX = 1.6; // normalized; fits the PK 2,3-BPG rise (~160% of baseline)
const PLOT_SAMPLES = 240; // downsampled points for the polylines

function oxWord(level) {
  if (level <= 0) return "none";
  if (level <= 0.2) return "mild";
  if (level <= 0.7) return "moderate";
  return "severe";
}

// Derive the verdict from the engine's real outputs only.
//   hemolysis — cumulative NADPH-driven damage crossed the hemolysis threshold.
//   strained  — survived, but the reserve was drawn down hard: NADPH grazed its
//               critical line (within 0.15 of NADPH_CRIT) or GSH fell below half.
//   stable    — rode the disturbance out with margin to spare.
// The thresholds are a presentation choice over engine metrics, not new model
// logic; hemolysis itself is exactly metrics.hemolyzed.
function verdictOf(m) {
  if (m.hemolyzed) return "hemolysis";
  if (m.minNadph < NADPH_CRIT + 0.15 || m.minGsh < 0.5) return "strained";
  return "stable";
}

const VERDICT_COPY = {
  stable: "The cell absorbed the challenge — the feedback loop held.",
  strained:
    "The reserve is drawn down but holding — the loop is rejecting the disturbance with little margin to spare.",
  hemolysis:
    "Reserve exhausted — the feedback loop can't reject this disturbance. The cell is damaged past recovery and would be cleared.",
};

const VERDICT_STYLE = {
  stable: { fg: C.success, bg: "rgba(45, 122, 62, 0.09)" },
  strained: { fg: C.warning, bg: "rgba(176, 125, 45, 0.11)" },
  hemolysis: { fg: C.danger, bg: "rgba(163, 45, 45, 0.09)" },
};

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

// Run the real engine for a genotype + oxidant level.
function runEngine(genoKey, level) {
  const geno = GENOTYPES.find((g) => g.key === genoKey).genotype;
  return simulate({
    genotype: geno,
    oxidant: { level, tOn: OX_ON, tOff: OX_OFF },
    duration: DURATION,
    dt: DT,
  });
}

export function ReserveSimulator() {
  const [genoKey, setGenoKey] = useState(DEFAULT_GENO);
  const [level, setLevel] = useState(OX_DEFAULT);
  // Compute the default run synchronously so the first paint already has the
  // resting frame — no null flash, no layout shift on hydrate.
  const [result, setResult] = useState(() => runEngine(DEFAULT_GENO, OX_DEFAULT));
  const [frame, setFrame] = useState(0);
  const [running, setRunning] = useState(false);

  const rafRef = useRef(null);

  const N = result.trajectory.length - 1;
  const cur = result.trajectory[Math.min(frame, N)];
  const verdict = verdictOf(result.metrics);
  const revealed = N > 0 ? frame / N : 1;

  // Companion-cell drivers — pure functions of the CURRENT engine frame (no
  // timer). Definition tracks the redox reserve (the same NADPH/GSH the gauges
  // read); "cleared" is the engine's real per-frame damage crossing the
  // hemolysis threshold. clearReveal ramps the fade + fragment shedding off the
  // damage value, so it deepens as the cell is cleared rather than snapping.
  const nadphFrac = Math.max(0, Math.min(1, cur.nadph / RESTING.nadph));
  const gshFrac = Math.max(0, Math.min(1, cur.gsh / RESTING.gsh));
  const reserve = (nadphFrac + gshFrac) / 2;
  const cleared = cur.damage >= HEMOLYSIS_THRESHOLD;
  const clearReveal = cleared
    ? Math.max(0, Math.min(1, (cur.damage - HEMOLYSIS_THRESHOLD) / HEMOLYSIS_THRESHOLD))
    : 0;
  const cellState = cleared ? "cleared" : reserve < 0.5 ? "straining" : "holding";

  const cancelAnim = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  // Run + animate forward over ANIM_MS. Cancels any in-flight animation first
  // (no overlap). Honors prefers-reduced-motion by jumping to the final frame.
  const play = useCallback(
    (gk, lvl) => {
      cancelAnim();
      const res = runEngine(gk, lvl);
      const last = res.trajectory.length - 1;
      setResult(res);

      if (prefersReducedMotion()) {
        setFrame(last);
        setRunning(false);
        return;
      }

      setFrame(0);
      setRunning(true);
      let start = 0;
      const tick = (now) => {
        if (start === 0) start = now;
        const p = Math.min(1, (now - start) / ANIM_MS);
        setFrame(Math.round(p * last));
        if (p < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          rafRef.current = null;
          setRunning(false);
        }
      };
      rafRef.current = requestAnimationFrame(tick);
    },
    [cancelAnim],
  );

  // Static preview (no animation) — used for live slider scrubbing so dragging
  // the slider doesn't restart the 4s animation on every input event.
  const preview = useCallback(
    (gk, lvl) => {
      cancelAnim();
      const res = runEngine(gk, lvl);
      setResult(res);
      setFrame(res.trajectory.length - 1);
      setRunning(false);
    },
    [cancelAnim],
  );

  // Auto-run the default (severe + moderate) on mount: a visitor who touches
  // nothing still watches the cell tip into failure. The kickoff is deferred to
  // the next frame so no state is set synchronously inside the effect body (the
  // first paint already shows the resting frame from the useState initializer).
  useEffect(() => {
    const id = requestAnimationFrame(() => play(DEFAULT_GENO, OX_DEFAULT));
    return () => {
      cancelAnimationFrame(id);
      cancelAnim();
    };
  }, [play, cancelAnim]);

  const onSelectGenotype = (gk) => {
    setGenoKey(gk);
    play(gk, level);
  };
  const onSliderInput = (v) => {
    setLevel(v);
    preview(genoKey, v); // live static feedback while dragging
  };
  const onSliderCommit = () => play(genoKey, level);
  const onRun = () => play(genoKey, level);
  const onReset = () => {
    setGenoKey(DEFAULT_GENO);
    setLevel(OX_DEFAULT);
    play(DEFAULT_GENO, OX_DEFAULT);
  };

  // Downsampled plot coordinates for each series, recomputed per run.
  const series = useMemo(() => {
    const traj = result.trajectory;
    const stepN = Math.max(1, Math.floor((traj.length - 1) / PLOT_SAMPLES));
    const innerW = PLOT_W - 2 * PLOT_PAD;
    const innerH = PLOT_H - 2 * PLOT_PAD;
    const x = (i) => PLOT_PAD + (i / (traj.length - 1)) * innerW;
    const y = (v) => PLOT_PAD + innerH - (Math.min(v, Y_MAX) / Y_MAX) * innerH;
    return GAUGES.map((g) => {
      const pts = [];
      for (let i = 0; i < traj.length; i += stepN) {
        const v = traj[i][g.key] / g.base;
        pts.push({ x: x(i), y: y(v), i });
      }
      // always include the final point
      const lastI = traj.length - 1;
      const lastV = traj[lastI][g.key] / g.base;
      pts.push({ x: x(lastI), y: y(lastV), i: lastI });
      return { key: g.key, color: g.color, pts };
    });
  }, [result]);

  // Plot geometry helpers in normalized→pixel space.
  const yPix = (v) =>
    PLOT_PAD + (PLOT_H - 2 * PLOT_PAD) - (Math.min(v, Y_MAX) / Y_MAX) * (PLOT_H - 2 * PLOT_PAD);
  const xPix = (frac) => PLOT_PAD + frac * (PLOT_W - 2 * PLOT_PAD);
  const oxOnX = xPix(OX_ON / DURATION);
  const baselineY = yPix(1);
  const critY = yPix(NADPH_CRIT / RESTING.nadph);
  const playheadX = xPix(revealed);

  const genoLabel = GENOTYPES.find((g) => g.key === genoKey).label;
  const srSummary =
    `Reserve simulator. Genotype ${genoLabel}, oxidant challenge ${oxWord(level)}. ` +
    `Outcome: ${VERDICT_COPY[verdict]} ` +
    GAUGES.map(
      (g) =>
        `${g.label} ${Math.round((100 * cur[g.key]) / g.base)} percent of baseline`,
    ).join(", ") +
    ".";

  return (
    <section
      aria-label="Reserve metabolic simulator"
      style={{ marginTop: "8px", fontFamily: SANS }}
    >
      {/* Screen-reader-only live summary of the current state. */}
      <p
        aria-live="polite"
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: "hidden",
          clip: "rect(0 0 0 0)",
          whiteSpace: "nowrap",
          border: 0,
        }}
      >
        {srSummary}
      </p>

      {/* ---- controls -------------------------------------------------- */}
      <div style={{ marginBottom: "20px" }}>
        <Label>Genotype — the loop gain</Label>
        <div
          role="group"
          aria-label="Genotype"
          style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "8px" }}
        >
          {GENOTYPES.map((g) => {
            const selected = g.key === genoKey;
            return (
              <button
                key={g.key}
                type="button"
                aria-pressed={selected}
                onClick={() => onSelectGenotype(g.key)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontFamily: SANS,
                  background: selected ? C.accentBg : C.surface,
                  border: selected
                    ? `2px solid ${C.accent}`
                    : `0.5px solid ${C.rule}`,
                  // keep total box size identical selected/unselected (2px vs
                  // 0.5px border) so buttons never shift when toggled
                  margin: selected ? 0 : "1.5px",
                  color: C.ink,
                  fontSize: "13px",
                  fontWeight: selected ? 500 : 400,
                  lineHeight: 1.3,
                  transition: "background 120ms ease",
                }}
              >
                <span>{g.label}</span>
                <span style={{ fontSize: "11px", fontWeight: 400, color: C.muted, marginTop: "2px" }}>
                  {g.note}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ marginBottom: "24px", maxWidth: "440px" }}>
        <Label>Oxidant challenge — the disturbance</Label>
        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginTop: "8px" }}>
          <input
            type="range"
            min={0}
            max={OX_MAX}
            step={OX_STEP}
            value={level}
            aria-label="Oxidant challenge level"
            aria-valuetext={`${oxWord(level)} (${level.toFixed(2)})`}
            onChange={(e) => onSliderInput(parseFloat(e.target.value))}
            onPointerUp={onSliderCommit}
            onKeyUp={onSliderCommit}
            style={{ flex: 1, accentColor: C.accent, cursor: "pointer" }}
          />
          <span
            style={{
              minWidth: "76px",
              textAlign: "right",
              fontSize: "13px",
              fontWeight: 500,
              color: C.body,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {oxWord(level)}
          </span>
        </div>
      </div>

      {/* ---- companion red blood cell (above the gauges) -------------- */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          flexWrap: "wrap",
          background: C.card,
          borderRadius: "8px",
          padding: "12px 16px",
          marginBottom: "12px",
        }}
      >
        <ReserveCell reserve={reserve} clearReveal={clearReveal} stateWord={cellState} />
        <div style={{ flex: "1 1 200px", minWidth: "180px" }}>
          <div style={{ fontSize: "12px", fontWeight: 500, color: C.body }}>
            Red blood cell
          </div>
          <div
            style={{
              fontSize: "11px",
              color: C.muted,
              marginTop: "4px",
              lineHeight: 1.5,
              maxWidth: "300px",
            }}
          >
            Its shape tracks the live reserve — a clean disc while the loop holds,
            losing definition as NADPH and glutathione drain, faded and shedding
            fragments when the cell is cleared. It is removed, not burst.
          </div>
        </div>
      </div>

      {/* ---- reserve gauges ------------------------------------------- */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "12px",
          marginBottom: "20px",
        }}
      >
        {GAUGES.map((g) => {
          const value = cur[g.key];
          const pct = Math.round((100 * value) / g.base);
          const filled = Math.max(0, Math.min(N_BARS, Math.round((pct / 100) * N_BARS)));
          return (
            <div
              key={g.key}
              style={{
                background: C.card,
                borderRadius: "8px",
                padding: "12px 14px",
              }}
            >
              <div style={{ fontSize: "12px", fontWeight: 500, color: C.body }}>
                {g.label}
              </div>
              <div
                aria-hidden="true"
                style={{ display: "flex", gap: "2px", height: "22px", alignItems: "flex-end", margin: "10px 0 8px" }}
              >
                {Array.from({ length: N_BARS }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: "100%",
                      borderRadius: "1px",
                      background: i < filled ? g.color : C.track,
                      transition: "background 80ms linear",
                    }}
                  />
                ))}
              </div>
              <div
                style={{
                  fontSize: "28px",
                  fontWeight: 500,
                  lineHeight: 1,
                  color: g.color,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {pct}
                <span style={{ fontSize: "14px", fontWeight: 400 }}>%</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ---- trajectory plot ------------------------------------------ */}
      <div
        style={{
          background: C.card,
          borderRadius: "8px",
          padding: "14px 14px 12px",
          marginBottom: "16px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "14px",
            marginBottom: "10px",
          }}
        >
          {GAUGES.map((g) => (
            <span key={g.key} style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "11px", color: C.body }}>
              <span style={{ width: "10px", height: "2px", background: g.color, display: "inline-block" }} />
              {g.label}
            </span>
          ))}
        </div>
        <svg
          viewBox={`0 0 ${PLOT_W} ${PLOT_H}`}
          width="100%"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Reserve levels over time, normalized to resting baseline"
          style={{ display: "block" }}
        >
          {/* oxidant onset marker (disturbance starts here, then sustained) */}
          <line
            x1={oxOnX}
            x2={oxOnX}
            y1={PLOT_PAD}
            y2={PLOT_H - PLOT_PAD}
            stroke={C.muted}
            strokeWidth={1}
            strokeDasharray="2 2"
            opacity={0.5}
          />
          <text x={oxOnX + 4} y={PLOT_PAD + 11} fontSize="9" fill={C.muted}>
            oxidant on
          </text>
          {/* 100% baseline */}
          <line
            x1={PLOT_PAD}
            x2={PLOT_W - PLOT_PAD}
            y1={baselineY}
            y2={baselineY}
            stroke={C.grid}
            strokeWidth={1}
          />
          <text x={PLOT_W - PLOT_PAD} y={baselineY - 4} fontSize="9" fill={C.muted} textAnchor="end">
            100% baseline
          </text>
          {/* NADPH critical line */}
          <line
            x1={PLOT_PAD}
            x2={PLOT_W - PLOT_PAD}
            y1={critY}
            y2={critY}
            stroke={GAUGE_COLOR.nadph}
            strokeWidth={1}
            strokeDasharray="2 3"
            opacity={0.5}
          />
          <text x={PLOT_PAD + 2} y={critY - 4} fontSize="9" fill={GAUGE_COLOR.nadph} opacity={0.8}>
            NADPH critical
          </text>
          {/* revealed series */}
          {series.map((s) => {
            const visible = s.pts.filter((p) => p.i / N <= revealed + 1e-9);
            if (visible.length < 2) return null;
            const points = visible.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" ");
            return (
              <polyline
                key={s.key}
                points={points}
                fill="none"
                stroke={s.color}
                strokeWidth={1.6}
                strokeLinejoin="round"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            );
          })}
          {/* playhead while running */}
          {running && (
            <line
              x1={playheadX}
              x2={playheadX}
              y1={PLOT_PAD}
              y2={PLOT_H - PLOT_PAD}
              stroke={C.muted}
              strokeWidth={1}
              opacity={0.45}
            />
          )}
        </svg>
      </div>

      {/* ---- verdict bar (space always reserved) ---------------------- */}
      <div
        role="status"
        style={{
          minHeight: "44px",
          display: "flex",
          alignItems: "center",
          padding: "10px 14px",
          borderRadius: "8px",
          fontSize: "13px",
          lineHeight: 1.4,
          background: running ? C.card : VERDICT_STYLE[verdict].bg,
          color: running ? C.muted : VERDICT_STYLE[verdict].fg,
          fontWeight: running ? 400 : 500,
          transition: "background 200ms ease, color 200ms ease",
        }}
      >
        {running ? "Running simulation…" : VERDICT_COPY[verdict]}
      </div>

      {/* ---- run / reset --------------------------------------------- */}
      <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
        <button
          type="button"
          onClick={onRun}
          style={{
            padding: "8px 18px",
            borderRadius: "6px",
            fontFamily: SANS,
            border: `1px solid ${C.accent}`,
            background: C.accent,
            color: "#ffffff",
            fontSize: "13px",
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          Run
        </button>
        <button
          type="button"
          onClick={onReset}
          style={{
            padding: "8px 18px",
            borderRadius: "6px",
            fontFamily: SANS,
            border: `0.5px solid ${C.rule}`,
            background: C.surface,
            color: C.body,
            fontSize: "13px",
            fontWeight: 400,
            cursor: "pointer",
          }}
        >
          Reset
        </button>
      </div>
    </section>
  );
}

function Label({ children }) {
  return (
    <div
      style={{
        fontSize: "12px",
        fontWeight: 500,
        color: C.body,
        letterSpacing: "0.01em",
      }}
    >
      {children}
    </div>
  );
}
