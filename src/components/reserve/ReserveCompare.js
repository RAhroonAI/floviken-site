// Reserve — the "threshold window" comparison (/reserve/compare).
//
// A companion view of experiment 09. A HEALTHY cell and a REAL published
// G6PD-deficient patient run the SAME validated engine under the SAME oxidant,
// side by side. Only the six measured G6PD parameters differ between them. The
// point is not "they differ" — it is WHERE the line is for each, and how wide
// the gap is: there is a band of oxidant doses safe for the healthy cell but
// dangerous for the patient. That band is the clinical window.
//
// HONESTY: this reuses the same engine and the same companion cell visual as
// the room. The window is QUALITATIVE — the G6PD reaction is grounded in
// published kinetics but the surrounding network is illustrative, so there are
// no dose/mg numbers anywhere. Verdicts come from each cell's real engine
// metrics. The healthy cell's NADPH reserve is so large that, in this model, it
// never crosses into hemolysis at any dose shown — it only begins to strain;
// the upper edge of the window is therefore "where the healthy cell starts to
// struggle," not where it fails. No validation claims.

"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { simulate } from "@/lib/reserve/engine.mjs";
import {
  HEALTHY,
  RESTING,
  NADPH_CRIT,
  HEMOLYSIS_THRESHOLD,
  G6PD_PATIENTS,
} from "@/lib/reserve/params.mjs";
import { ReserveCell } from "./cell";

// --- tokens (this site's inline-hex palette; matches the room) --------------
const SANS = '"Inter", -apple-system, "Segoe UI", Roboto, system-ui, sans-serif';
const C = {
  ink: "#2a2a2a",
  body: "#4a4a4a",
  muted: "#8a8a8a",
  rule: "#d8d2c5",
  surface: "#ffffff",
  card: "#f1ede3",
  track: "#e2dac9",
  grid: "#d8d2c5",
  success: "#2d7a3e",
  warning: "#b07d2d",
  danger: "#a32d2d",
};
const NADPH_COLOR = "#1D9E75";
const GSH_COLOR = "#378ADD";
// The two lines/cells are distinguished by CELL identity, not by variable.
const HEALTHY_LINE = "#2d7a3e"; // calm green
const PATIENT_LINE = "#a32d2d"; // oxblood / danger

// --- the two cells: same engine, only the G6PD parameters differ ------------
// Healthy = the non-deficient "control" reference. Patient = a real, individually
// documented severe G6PD-deficient patient from Shimo, Nishino & Tomita (2011),
// Table 1. Patient 3 is chosen because it is among the lowest residual enzyme
// activities in the published set (severe), is stable at rest, and has a
// discoverable oxidant threshold — the most severe sets (patients 1, 4) hemolyze
// even at rest in this model, leaving no lower threshold to find.
const HEALTHY_KIN = G6PD_PATIENTS.control;
const PATIENT_KIN = G6PD_PATIENTS.patient3;
const PATIENT_LABEL = "Patient 3";
const PATIENT_SUBLABEL = "real documented case · Shimo et al. 2011";

// --- calibrated run constants (same engine path as the room) ----------------
const DT = 0.1;
const DURATION = 30; // the fork + crash complete by ~t15; a short tail follows
const OX_ON = 6;
const OX_OFF = 220; // sustained, as in the room
const OX_MAX = 1.5;
const OX_STEP = 0.05;
const OX_DEFAULT = 0.45; // inside the window: patient fails, healthy holds
const ANIM_MS = 5000;
const BEAT_MS = 650; // a held beat at the point of divergence

const clamp = (x, a, b) => Math.max(a, Math.min(b, x));

function runCell(kinetics, level) {
  // genotype HEALTHY supplies pk/hk = 1.0; the explicit `g6pd` kinetics make the
  // rate law use the patient's six measured parameters verbatim (the genotype
  // multiplier is ignored). So the ONLY difference between the two cells is the
  // published G6PD parameter set; the oxidant is identical.
  return simulate({
    genotype: HEALTHY,
    g6pd: kinetics,
    oxidant: { level, tOn: OX_ON, tOff: OX_OFF },
    duration: DURATION,
    dt: DT,
  });
}

// The window edges are PROPERTIES OF THE ENGINE, derived once by scanning the
// oxidant — not hardcoded. Lower edge = the lowest dose at which the patient's
// cell hemolyzes. Upper edge = the lowest dose at which the healthy cell's
// glutathione is drawn below half (it starts to strain; it does not hemolyze in
// range). Deterministic, so SSR and client agree.
function computeWindow() {
  let patientThreshold = null;
  let healthyStrain = null;
  for (let i = 0; i <= Math.round(OX_MAX / OX_STEP); i++) {
    const lvl = i * OX_STEP;
    if (patientThreshold === null && runCell(PATIENT_KIN, lvl).metrics.hemolyzed) {
      patientThreshold = lvl;
    }
    if (healthyStrain === null && runCell(HEALTHY_KIN, lvl).metrics.minGsh < 0.5) {
      healthyStrain = lvl;
    }
    if (patientThreshold !== null && healthyStrain !== null) break;
  }
  return {
    patientThreshold: patientThreshold == null ? 0 : patientThreshold,
    healthyStrain: healthyStrain == null ? OX_MAX : healthyStrain,
  };
}
const WINDOW = computeWindow();

// Verdict from real engine metrics only (same definition as the room).
function verdictOf(m) {
  if (m.hemolyzed) return "hemolysis";
  if (m.minNadph < NADPH_CRIT + 0.15 || m.minGsh < 0.5) return "strained";
  return "stable";
}
const VERDICT_COPY = {
  stable: "Held the line — the reserve covered the challenge.",
  strained: "Strained — the reserve was drawn down hard, but it held.",
  hemolysis: "Reserve exhausted — the cell is damaged past recovery and would be cleared.",
};
const VERDICT_STYLE = {
  stable: { fg: C.success, bg: "rgba(45, 122, 62, 0.10)" },
  strained: { fg: C.warning, bg: "rgba(176, 125, 45, 0.12)" },
  hemolysis: { fg: C.danger, bg: "rgba(163, 45, 45, 0.10)" },
};

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

// Cell-visual drivers from a trajectory frame (same as the room).
function cellDrivers(cur) {
  const nadphFrac = clamp(cur.nadph / RESTING.nadph, 0, 1);
  const gshFrac = clamp(cur.gsh / RESTING.gsh, 0, 1);
  const reserve = (nadphFrac + gshFrac) / 2;
  const cleared = cur.damage >= HEMOLYSIS_THRESHOLD;
  const clearReveal = cleared
    ? clamp((cur.damage - HEMOLYSIS_THRESHOLD) / HEMOLYSIS_THRESHOLD, 0, 1)
    : 0;
  const state = cleared ? "cleared" : reserve < 0.5 ? "straining" : "holding";
  return { reserve, clearReveal, state };
}

// --- plot geometry ----------------------------------------------------------
const PLOT_W = 640;
const PLOT_H = 250;
const PLOT_PAD_L = 14;
const PLOT_PAD = 12;
const Y_MAX = 1.08; // normalized NADPH (baseline 1.0) with a little headroom
const PLOT_SAMPLES = 220;

function buildSeries(res) {
  const traj = res.trajectory;
  const stepN = Math.max(1, Math.floor((traj.length - 1) / PLOT_SAMPLES));
  const innerW = PLOT_W - PLOT_PAD_L - PLOT_PAD;
  const innerH = PLOT_H - 2 * PLOT_PAD;
  const x = (i) => PLOT_PAD_L + (i / (traj.length - 1)) * innerW;
  const y = (v) => PLOT_PAD + innerH - (clamp(v, 0, Y_MAX) / Y_MAX) * innerH;
  const pts = [];
  for (let i = 0; i < traj.length; i += stepN) {
    pts.push({ x: x(i), y: y(traj[i].nadph / RESTING.nadph), i });
  }
  const last = traj.length - 1;
  pts.push({ x: x(last), y: y(traj[last].nadph / RESTING.nadph), i: last });
  return pts;
}

// First moment the two NADPH lines separate (gap > 8% of baseline), or null when
// they never diverge. Pure + top-level so the call site auto-memoizes cleanly.
function findFork(resH, resD) {
  const base = RESTING.nadph;
  const a = resH.trajectory;
  const b = resD.trajectory;
  for (let i = 0; i < a.length; i++) {
    if ((a[i].nadph - b[i].nadph) / base > 0.08) {
      return { t: i * DT, frac: i / (a.length - 1) };
    }
  }
  return null;
}

export function ReserveCompare() {
  const [level, setLevel] = useState(OX_DEFAULT);
  const [resH, setResH] = useState(() => runCell(HEALTHY_KIN, OX_DEFAULT));
  const [resD, setResD] = useState(() => runCell(PATIENT_KIN, OX_DEFAULT));
  const [frame, setFrame] = useState(0);
  const [running, setRunning] = useState(false);
  const rafRef = useRef(null);

  const N = resH.trajectory.length - 1; // both runs share length + time axis
  const curH = resH.trajectory[Math.min(frame, N)];
  const curD = resD.trajectory[Math.min(frame, N)];
  const revealed = N > 0 ? frame / N : 1;
  const dH = cellDrivers(curH);
  const dD = cellDrivers(curD);
  const vH = verdictOf(resH.metrics);
  const vD = verdictOf(resD.metrics);

  // The single most important moment: where the two NADPH lines stop tracking
  // and fork. Derived from the two real trajectories (first time the gap exceeds
  // 8% of baseline). null when they never separate (both hold, or both fail).
  const forkInfo = findFork(resH, resD);

  const seriesH = useMemo(() => buildSeries(resH), [resH]);
  const seriesD = useMemo(() => buildSeries(resD), [resD]);

  const cancelAnim = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  // Run both cells and animate the shared timeline forward, holding a brief beat
  // exactly at the fork so the divergence is not rushed past. Reduced motion →
  // jump to the final frame.
  const play = useCallback(
    (lvl) => {
      cancelAnim();
      const rH = runCell(HEALTHY_KIN, lvl);
      const rD = runCell(PATIENT_KIN, lvl);
      const last = rH.trajectory.length - 1;
      setResH(rH);
      setResD(rD);

      if (prefersReducedMotion()) {
        setFrame(last);
        setRunning(false);
        return;
      }

      // fork fraction for this specific run (recomputed from the new trajectories)
      const base = RESTING.nadph;
      let forkFrac = null;
      for (let i = 0; i < rH.trajectory.length; i++) {
        if ((rH.trajectory[i].nadph - rD.trajectory[i].nadph) / base > 0.08) {
          forkFrac = i / (rH.trajectory.length - 1);
          break;
        }
      }

      setFrame(0);
      setRunning(true);
      let start = 0;
      let pauseAccum = 0;
      let beatDone = false;
      let pauseStart = 0;
      const tick = (now) => {
        if (start === 0) start = now;
        let p = (now - start - pauseAccum) / ANIM_MS;
        if (forkFrac != null && !beatDone && p >= forkFrac) {
          if (pauseStart === 0) pauseStart = now;
          if (now - pauseStart < BEAT_MS) {
            p = forkFrac; // hold the beat
          } else {
            pauseAccum += now - pauseStart;
            beatDone = true;
            p = (now - start - pauseAccum) / ANIM_MS;
          }
        }
        p = Math.min(1, Math.max(0, p));
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

  const preview = useCallback(
    (lvl) => {
      cancelAnim();
      const rH = runCell(HEALTHY_KIN, lvl);
      const rD = runCell(PATIENT_KIN, lvl);
      setResH(rH);
      setResD(rD);
      setFrame(rH.trajectory.length - 1);
      setRunning(false);
    },
    [cancelAnim],
  );

  // Auto-run the default on mount (deferred a frame so no setState runs
  // synchronously in the effect body; first paint shows the resting frame).
  useEffect(() => {
    const id = requestAnimationFrame(() => play(OX_DEFAULT));
    return () => {
      cancelAnimationFrame(id);
      cancelAnim();
    };
  }, [play, cancelAnim]);

  const onSliderInput = (v) => {
    setLevel(v);
    preview(v);
  };
  const onSliderCommit = () => play(level);
  const onRun = () => play(level);
  const onReset = () => {
    setLevel(OX_DEFAULT);
    play(OX_DEFAULT);
  };

  // Qualitative band on the slider (fractions of the range — no dose numbers).
  const bandStart = clamp(WINDOW.patientThreshold / OX_MAX, 0, 1);
  const bandEnd = clamp(WINDOW.healthyStrain / OX_MAX, 0, 1);

  let doseNote;
  if (level < WINDOW.patientThreshold) {
    doseNote = "At this dose, both cells hold.";
  } else if (level < WINDOW.healthyStrain) {
    doseNote = "At this dose: safe for the healthy cell, dangerous for the patient.";
  } else {
    doseNote = "At this dose the healthy cell is straining too — but its reserve still holds.";
  }

  // plot reference geometry
  const innerH = PLOT_H - 2 * PLOT_PAD;
  const yPix = (v) => PLOT_PAD + innerH - (clamp(v, 0, Y_MAX) / Y_MAX) * innerH;
  const xPix = (frac) => PLOT_PAD_L + frac * (PLOT_W - PLOT_PAD_L - PLOT_PAD);
  const critY = yPix(NADPH_CRIT / RESTING.nadph);
  const baselineY = yPix(1);
  const oxOnX = xPix(OX_ON / DURATION);
  const playheadX = xPix(revealed);
  const forkShown = forkInfo != null && revealed >= forkInfo.frac - 1e-9;

  const srSummary =
    `Threshold-window comparison. A healthy cell and ${PATIENT_LABEL}, a real documented severe ` +
    `G6PD-deficient patient, under the same oxidant. Healthy outcome: ${VERDICT_COPY[vH]} ` +
    `Patient outcome: ${VERDICT_COPY[vD]} ${doseNote}`;

  return (
    <section aria-label="Reserve threshold-window comparison" style={{ fontFamily: SANS }}>
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

      {/* ---- CENTERPIECE: one shared two-line plot ---------------------- */}
      <div style={{ background: C.card, borderRadius: "8px", padding: "14px 14px 12px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", marginBottom: "8px" }}>
          <LegendSwatch color={HEALTHY_LINE} label="Healthy cell — NADPH reserve" />
          <LegendSwatch color={PATIENT_LINE} label={`${PATIENT_LABEL} — NADPH reserve`} />
        </div>
        <svg
          viewBox={`0 0 ${PLOT_W} ${PLOT_H}`}
          width="100%"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="NADPH reserve over time for the healthy cell and the patient, same oxidant, normalized to baseline"
          style={{ display: "block" }}
        >
          {/* oxidant onset */}
          <line x1={oxOnX} x2={oxOnX} y1={PLOT_PAD} y2={PLOT_H - PLOT_PAD} stroke={C.muted} strokeWidth={1} strokeDasharray="2 2" opacity={0.45} />
          <text x={oxOnX + 4} y={PLOT_PAD + 11} fontSize="9" fill={C.muted}>oxidant on</text>
          {/* baseline */}
          <line x1={PLOT_PAD_L} x2={PLOT_W - PLOT_PAD} y1={baselineY} y2={baselineY} stroke={C.grid} strokeWidth={1} />
          <text x={PLOT_W - PLOT_PAD} y={baselineY - 4} fontSize="9" fill={C.muted} textAnchor="end">baseline reserve</text>
          {/* hemolysis / critical reserve line */}
          <line x1={PLOT_PAD_L} x2={PLOT_W - PLOT_PAD} y1={critY} y2={critY} stroke={C.danger} strokeWidth={1} strokeDasharray="3 3" opacity={0.6} />
          <text x={PLOT_PAD_L + 2} y={critY + 12} fontSize="9" fill={C.danger} opacity={0.85}>
            hemolysis threshold — below this, the reserve is failing
          </text>
          {/* divergence marker (quiet; appears as the reveal reaches the fork) */}
          {forkInfo != null && (
            <g opacity={forkShown ? 1 : 0} style={{ transition: "opacity 200ms ease" }}>
              <line x1={xPix(forkInfo.frac)} x2={xPix(forkInfo.frac)} y1={PLOT_PAD} y2={PLOT_H - PLOT_PAD} stroke={C.ink} strokeWidth={1} opacity={0.35} />
              <text x={xPix(forkInfo.frac) + 4} y={PLOT_H - PLOT_PAD - 4} fontSize="9" fill={C.body}>they separate here</text>
            </g>
          )}
          {/* the two revealed lines */}
          {[{ s: seriesH, c: HEALTHY_LINE }, { s: seriesD, c: PATIENT_LINE }].map((ln, k) => {
            const visible = ln.s.filter((p) => p.i / N <= revealed + 1e-9);
            if (visible.length < 2) return null;
            const points = visible.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" ");
            return <polyline key={k} points={points} fill="none" stroke={ln.c} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />;
          })}
          {/* playhead */}
          {running && <line x1={playheadX} x2={playheadX} y1={PLOT_PAD} y2={PLOT_H - PLOT_PAD} stroke={C.muted} strokeWidth={1} opacity={0.4} />}
        </svg>
      </div>

      {/* ---- shared oxidant slider + the window band ------------------- */}
      <div style={{ marginTop: "20px", maxWidth: "560px" }}>
        <Label>Oxidant challenge — one dose, applied to both cells</Label>
        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginTop: "8px" }}>
          <div style={{ flex: 1, position: "relative" }}>
            {/* qualitative window band behind the slider (no numbers) */}
            <div aria-hidden="true" style={{ position: "absolute", top: "50%", left: 0, right: 0, height: "6px", transform: "translateY(-50%)", background: C.track, borderRadius: "3px" }}>
              <div style={{ position: "absolute", top: 0, bottom: 0, left: `${bandStart * 100}%`, width: `${(bandEnd - bandStart) * 100}%`, background: "rgba(163, 45, 45, 0.18)", borderLeft: `2px solid ${C.danger}`, borderRight: `1px dashed ${C.warning}` }} />
            </div>
            <input
              type="range"
              min={0}
              max={OX_MAX}
              step={OX_STEP}
              value={level}
              aria-label="Oxidant challenge level, applied to both cells"
              aria-valuetext={doseNote}
              onChange={(e) => onSliderInput(parseFloat(e.target.value))}
              onPointerUp={onSliderCommit}
              onKeyUp={onSliderCommit}
              style={{ position: "relative", width: "100%", accentColor: C.accent ?? C.danger, cursor: "pointer", background: "transparent" }}
            />
          </div>
        </div>
        <p style={{ fontSize: "12px", color: C.body, marginTop: "10px", marginBottom: 0, lineHeight: 1.5 }}>
          {doseNote}
        </p>
        <p style={{ fontSize: "11px", color: C.muted, marginTop: "6px", marginBottom: 0, lineHeight: 1.5 }}>
          The shaded band is the window: doses the healthy cell shrugs off, but
          the patient&apos;s cell cannot. Raise the dose to find where the patient
          tips, then keep going to where even the healthy cell begins to strain.
          It is a phenomenon, not a measured dose — no milligrams here.
        </p>
      </div>

      {/* ---- the two cells (supporting) ------------------------------- */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "14px", marginTop: "20px" }}>
        <CellPanel
          title="Healthy cell"
          subtitle="non-deficient reference"
          accent={HEALTHY_LINE}
          drivers={dH}
          cur={curH}
          verdict={vH}
          running={running}
        />
        <CellPanel
          title={PATIENT_LABEL}
          subtitle={PATIENT_SUBLABEL}
          accent={PATIENT_LINE}
          drivers={dD}
          cur={curD}
          verdict={vD}
          running={running}
        />
      </div>

      {/* ---- run / reset --------------------------------------------- */}
      <div style={{ display: "flex", gap: "10px", marginTop: "18px" }}>
        <button type="button" onClick={onRun} style={btnPrimary}>Run</button>
        <button type="button" onClick={onReset} style={btnGhost}>Reset</button>
      </div>
    </section>
  );
}

function CellPanel({ title, subtitle, accent, drivers, cur, verdict, running }) {
  return (
    <div style={{ background: C.card, borderRadius: "8px", padding: "14px 16px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <ReserveCell reserve={drivers.reserve} clearReveal={drivers.clearReveal} stateWord={drivers.state} />
        <div>
          <div style={{ fontSize: "13px", fontWeight: 600, color: accent }}>{title}</div>
          <div style={{ fontSize: "11px", color: C.muted, marginTop: "2px", lineHeight: 1.35 }}>{subtitle}</div>
        </div>
      </div>
      <div style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
        <Bar label="NADPH" value={cur.nadph} base={RESTING.nadph} color={NADPH_COLOR} />
        <Bar label="Glutathione" value={cur.gsh} base={RESTING.gsh} color={GSH_COLOR} />
      </div>
      <div
        role="status"
        style={{
          marginTop: "12px",
          minHeight: "40px",
          display: "flex",
          alignItems: "center",
          padding: "8px 10px",
          borderRadius: "6px",
          fontSize: "12px",
          lineHeight: 1.4,
          background: running ? C.surface : VERDICT_STYLE[verdict].bg,
          color: running ? C.muted : VERDICT_STYLE[verdict].fg,
          fontWeight: running ? 400 : 500,
        }}
      >
        {running ? "Running…" : VERDICT_COPY[verdict]}
      </div>
    </div>
  );
}

// Compact horizontal reserve bar (reuses the room's gauge color + percent).
function Bar({ label, value, base, color }) {
  const pct = Math.round((100 * value) / base);
  const w = clamp(pct, 0, 100);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <span style={{ fontSize: "11px", color: C.body, width: "78px", flexShrink: 0 }}>{label}</span>
      <span style={{ flex: 1, height: "8px", background: C.track, borderRadius: "4px", overflow: "hidden" }}>
        <span style={{ display: "block", height: "100%", width: `${w}%`, background: color, transition: "width 80ms linear" }} />
      </span>
      <span style={{ fontSize: "12px", fontWeight: 500, color, width: "40px", textAlign: "right", fontVariantNumeric: "tabular-nums" }}>
        {pct}%
      </span>
    </div>
  );
}

function LegendSwatch({ color, label }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "7px", fontSize: "12px", color: C.body }}>
      <span style={{ width: "16px", height: "3px", background: color, display: "inline-block", borderRadius: "2px" }} />
      {label}
    </span>
  );
}

function Label({ children }) {
  return <div style={{ fontSize: "12px", fontWeight: 500, color: C.body, letterSpacing: "0.01em" }}>{children}</div>;
}

const btnPrimary = {
  padding: "8px 18px",
  borderRadius: "6px",
  fontFamily: SANS,
  border: `1px solid ${C.danger}`,
  background: C.danger,
  color: "#ffffff",
  fontSize: "13px",
  fontWeight: 500,
  cursor: "pointer",
};
const btnGhost = {
  padding: "8px 18px",
  borderRadius: "6px",
  fontFamily: SANS,
  border: `0.5px solid ${C.rule}`,
  background: C.surface,
  color: C.body,
  fontSize: "13px",
  fontWeight: 400,
  cursor: "pointer",
};
