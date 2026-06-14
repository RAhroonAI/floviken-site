// Reserve — "the loop the experiment models": a small, static, explanatory SVG.
//
// Five nodes, one feedback loop, so a visitor sees the mechanism (cell redox
// metabolism) before touching the simulator. Static markup only — no animation,
// no engine wiring, no controls. Node colors deliberately match the room's
// gauges (NADPH teal #1D9E75, glutathione blue #378ADD) so the figure and the
// simulator visually rhyme. The honesty caption flags it as a simplification.
//
// Server component (no hooks); purely presentational.

const SANS = '"Inter", -apple-system, "Segoe UI", Roboto, system-ui, sans-serif';

// node palette — strokes are the EXACT gauge hexes; fills are faint tints;
// text is a slightly darker shade for legibility on the tint.
const NODES = {
  glucose: { stroke: "#9b9286", fill: "#f2f0ec", ink: "#6f685c" },
  g6pd: { stroke: "#7a1f2b", fill: "#f7ebe9", ink: "#7a1f2b" },
  nadph: { stroke: "#1D9E75", fill: "#e9f6f1", ink: "#178a64" },
  gsh: { stroke: "#378ADD", fill: "#e9f2fb", ink: "#2f73bd" },
  oxidant: { stroke: "#c2553b", fill: "#f9ece7", ink: "#b34a31" },
};
const MUTED = "#8a8a8a";
const ARROW = "#8a8275";

function Pill({ cx, cy, w, h = 40, node, label }) {
  return (
    <g>
      <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h} rx={h / 2} fill={node.fill} stroke={node.stroke} strokeWidth={1.8} />
      <text x={cx} y={cy + 4} textAnchor="middle" fontFamily={SANS} fontSize="13" fontWeight="600" fill={node.ink}>
        {label}
      </text>
    </g>
  );
}

export function ReserveLoopDiagram() {
  return (
    <figure style={{ margin: "2.25rem 0 0.5rem", textAlign: "center" }}>
      <svg
        viewBox="0 0 700 236"
        width="100%"
        style={{ display: "block", maxWidth: "620px", height: "auto", margin: "0 auto" }}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-labelledby="reserve-loop-title reserve-loop-desc"
      >
        <title id="reserve-loop-title">The core protective loop Reserve models</title>
        <desc id="reserve-loop-desc">
          Glucose feeds the G6PD step, which makes NADPH, which charges glutathione.
          Glutathione absorbs an oxidant hit from a drug and is spent; the loop must
          refill the glutathione reserve by running the G6PD step again. In G6PD
          deficiency that step is the weak link.
        </desc>

        <defs>
          <marker id="rlArrow" markerWidth="9" markerHeight="9" refX="6.5" refY="3" orient="auto" markerUnits="userSpaceOnUse">
            <path d="M0,0 L6.5,3 L0,6 Z" fill={ARROW} />
          </marker>
          <marker id="rlArrowCoral" markerWidth="9" markerHeight="9" refX="6.5" refY="3" orient="auto" markerUnits="userSpaceOnUse">
            <path d="M0,0 L6.5,3 L0,6 Z" fill={NODES.oxidant.stroke} />
          </marker>
        </defs>

        {/* chain arrows (left → right) */}
        <line x1={130} y1={130} x2={190} y2={130} stroke={ARROW} strokeWidth={1.6} markerEnd="url(#rlArrow)" />
        <line x1={309} y1={130} x2={369} y2={130} stroke={ARROW} strokeWidth={1.6} markerEnd="url(#rlArrow)" />
        <line x1={470} y1={130} x2={532} y2={130} stroke={ARROW} strokeWidth={1.6} markerEnd="url(#rlArrow)" />

        {/* oxidant hits glutathione, which absorbs it */}
        <line x1={595} y1={64} x2={595} y2={107} stroke={NODES.oxidant.stroke} strokeWidth={1.6} markerEnd="url(#rlArrowCoral)" />
        <text x={607} y={92} textAnchor="start" fontFamily={SANS} fontSize="10" fill={MUTED}>absorbs</text>

        {/* the loop: spent glutathione must be recharged via the G6PD step */}
        <path d="M 595 152 C 595 206, 250 206, 250 156" fill="none" stroke={ARROW} strokeWidth={1.6} markerEnd="url(#rlArrow)" />
        <text x={423} y={200} textAnchor="middle" fontFamily={SANS} fontSize="11" fill={MUTED}>refill the reserve</text>

        {/* nodes */}
        <Pill cx={80} cy={130} w={92} node={NODES.glucose} label="glucose" />
        <Pill cx={250} cy={130} w={112} node={NODES.g6pd} label="G6PD step" />
        <Pill cx={420} cy={130} w={96} node={NODES.nadph} label="NADPH" />
        <Pill cx={595} cy={130} w={122} node={NODES.gsh} label="glutathione" />
        <Pill cx={595} cy={42} w={196} node={NODES.oxidant} label="oxidant hit, from a drug" />

        {/* one tiny role hint on the broken step (kept minimal); placed above
            the node so it clears the refill arrow returning into it from below */}
        <text x={250} y={102} textAnchor="middle" fontFamily={SANS} fontSize="10" fill={NODES.g6pd.stroke}>the weak link in deficiency</text>
      </svg>

      <figcaption
        style={{
          fontFamily: SANS,
          fontSize: "0.6875rem",
          lineHeight: 1.5,
          color: "#8a8a8a",
          marginTop: "0.5rem",
          maxWidth: "440px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        The core protective loop. The real erythrocyte network is much larger.
        This is the part the experiment turns on.
      </figcaption>
    </figure>
  );
}
