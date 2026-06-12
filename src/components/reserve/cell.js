// Reserve — the companion red-blood-cell visual, shared by the simulator
// (/reserve) and the side-by-side comparison (/reserve/compare).
//
// A single biconcave cell whose DEFINITION is driven by the live redox reserve
// (NADPH + GSH at the current frame — the same values the gauges read) and whose
// CLEARED state is driven by the engine's real per-frame damage crossing the
// hemolysis threshold. No timer and no scripted timeline: the cell is a pure
// function of the current engine state, so it degrades in step with the gauges
// during the run and, under prefers-reduced-motion (which pins the sim to its
// final frame), simply renders the final outcome. Clean disc when the reserve is
// high → roughened, desaturated, muddied dimple as it drains → faded with a few
// shed fragments when damage trips hemolysis. It CLEARS (phagocytic removal of a
// damaged cell), it does not burst. Echoes the Reserve board tile: oxblood body,
// salmon rim, dark central depression.
const CELL_HEALTHY_BODY = "#bb4038";
const CELL_DEAD_BODY = "#9b817a";
const CELL_HEALTHY_RIM = "#d8786a";
const CELL_DEAD_RIM = "#9a847d";
const CELL_DIMPLE = "#7a1f2b";

const CELL_N = 30;
// Fixed deterministic rim-perturbation profile (no RNG → SSR and client render
// identically, and the SAME lumps simply grow as the reserve falls — smooth
// degradation, not jitter). Roughly normalized to [-1, 1].
const CELL_NOISE = Array.from({ length: CELL_N }, (_, i) =>
  0.55 * Math.sin(i * 2.3 + 0.7) +
  0.3 * Math.sin(i * 4.9 + 2.1) +
  0.18 * Math.sin(i * 1.3 + 4.0),
);
// Fixed fragment placements (angle rad, radial offset beyond the rim, radii).
// They sit a short distance off the cell — detached, not flung.
const CELL_FRAGMENTS = [
  { ang: 3.6, off: 6, rx: 5.5, ry: 4 },
  { ang: 5.5, off: 9, rx: 4, ry: 3 },
  { ang: 1.15, off: 7, rx: 4.5, ry: 3.5 },
];

function lerp(a, b, t) {
  return a + (b - a) * t;
}
function hexToRgb(h) {
  const s = h.replace("#", "");
  return [parseInt(s.slice(0, 2), 16), parseInt(s.slice(2, 4), 16), parseInt(s.slice(4, 6), 16)];
}
function rgbToHex(r, g, b) {
  const f = (x) => Math.max(0, Math.min(255, Math.round(x))).toString(16).padStart(2, "0");
  return "#" + f(r) + f(g) + f(b);
}
function lerpColor(c1, c2, t) {
  const a = hexToRgb(c1);
  const b = hexToRgb(c2);
  return rgbToHex(lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t));
}
// Smooth closed blob through `CELL_N` perturbed points (quadratic midpoint
// smoothing keeps the edge soft, not polygonal).
function smoothBlob(cx, cy, R, rough) {
  const p = [];
  for (let i = 0; i < CELL_N; i++) {
    const ang = (i / CELL_N) * Math.PI * 2;
    const r = R * (1 + rough * CELL_NOISE[i]);
    p.push([cx + r * Math.cos(ang), cy + r * Math.sin(ang)]);
  }
  const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  const m0 = mid(p[CELL_N - 1], p[0]);
  let d = `M ${m0[0].toFixed(2)},${m0[1].toFixed(2)} `;
  for (let i = 0; i < CELL_N; i++) {
    const c = p[i];
    const m = mid(p[i], p[(i + 1) % CELL_N]);
    d += `Q ${c[0].toFixed(2)},${c[1].toFixed(2)} ${m[0].toFixed(2)},${m[1].toFixed(2)} `;
  }
  return d + "Z";
}

export function ReserveCell({ reserve, clearReveal, stateWord }) {
  const R = 38;
  const cx = 60;
  const cy = 60;
  const rough = 0.1 * (1 - reserve) + 0.03 * clearReveal;
  const body = lerpColor(CELL_DEAD_BODY, CELL_HEALTHY_BODY, reserve);
  const rim = lerpColor(CELL_DEAD_RIM, CELL_HEALTHY_RIM, reserve);
  const dimpleColor = lerpColor(body, CELL_DIMPLE, reserve * 0.9);
  const dimpleOpacity = lerp(0.18, 0.8, reserve);
  const dimpleRx = lerp(11, 16, reserve);
  const dimpleRy = lerp(8, 12, reserve);
  const cellOpacity = 1 - 0.55 * clearReveal;
  const disc = smoothBlob(cx, cy, R, rough);

  return (
    <svg
      viewBox="0 0 120 120"
      width="112"
      height="112"
      role="img"
      aria-label={`Red blood cell, ${stateWord}. Its definition tracks the live NADPH and glutathione reserve; it fades and sheds fragments when the cell is cleared.`}
      style={{ display: "block", flexShrink: 0 }}
    >
      <g opacity={cellOpacity}>
        <path d={disc} fill={body} stroke={rim} strokeWidth="2" strokeLinejoin="round" />
        <ellipse cx={cx} cy={cy} rx={dimpleRx} ry={dimpleRy} fill={dimpleColor} opacity={dimpleOpacity} />
      </g>
      {clearReveal > 0 && (
        <g opacity={Math.min(1, clearReveal)} aria-hidden="true">
          {CELL_FRAGMENTS.map((f, i) => {
            const fx = cx + (R + f.off) * Math.cos(f.ang);
            const fy = cy + (R + f.off) * Math.sin(f.ang);
            return (
              <ellipse
                key={i}
                cx={fx.toFixed(2)}
                cy={fy.toFixed(2)}
                rx={f.rx}
                ry={f.ry}
                fill={body}
                stroke={rim}
                strokeWidth="1"
                opacity="0.85"
                transform={`rotate(${((f.ang * 180) / Math.PI).toFixed(1)} ${fx.toFixed(2)} ${fy.toFixed(2)})`}
              />
            );
          })}
        </g>
      )}
    </svg>
  );
}
