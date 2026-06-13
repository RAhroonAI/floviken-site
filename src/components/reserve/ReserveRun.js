// Reserve — the single interactive page, toggled between two existing tools.
//
// This is COMPOSITION, not a rewrite: it renders the existing ReserveCompare
// (side-by-side, default) or the existing ReserveSimulator (single cell),
// unchanged in behaviour. The only new thing here is the toggle. Conditional
// render (only the active tool mounted) keeps each tool's auto-run-on-mount
// intact — switching shows that tool's default run fresh.

"use client";

import { useState } from "react";
import { ReserveCompare } from "./ReserveCompare";
import { ReserveSimulator } from "./ReserveSimulator";

const SANS = '"Inter", -apple-system, "Segoe UI", Roboto, system-ui, sans-serif';
const C = {
  ink: "#2a2a2a",
  body: "#4a4a4a",
  muted: "#8a8a8a",
  rule: "#d8d2c5",
  surface: "#ffffff",
  accent: "#7a1f2b",
  accentBg: "#f3e7e4",
};

function ToggleBtn({ active, onClick, label, sub }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: "8px 14px",
        borderRadius: "6px",
        cursor: "pointer",
        fontFamily: SANS,
        background: active ? C.accentBg : C.surface,
        border: active ? `2px solid ${C.accent}` : `0.5px solid ${C.rule}`,
        // keep total box size identical active/inactive (2px vs 0.5px border)
        margin: active ? 0 : "1.5px",
        color: C.ink,
        fontSize: "13px",
        fontWeight: active ? 500 : 400,
        lineHeight: 1.3,
        transition: "background 120ms ease",
      }}
    >
      <span>{label}</span>
      <span style={{ fontSize: "11px", fontWeight: 400, color: C.muted, marginTop: "2px" }}>
        {sub}
      </span>
    </button>
  );
}

export function ReserveRun() {
  const [view, setView] = useState("compare");
  return (
    <div style={{ fontFamily: SANS }}>
      <div
        role="group"
        aria-label="Choose a view"
        style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "22px" }}
      >
        <ToggleBtn
          active={view === "compare"}
          onClick={() => setView("compare")}
          label="Compare two cells"
          sub="healthy vs. a real patient"
        />
        <ToggleBtn
          active={view === "single"}
          onClick={() => setView("single")}
          label="Single cell"
          sub="pick a genotype"
        />
      </div>

      {view === "compare" ? <ReserveCompare /> : <ReserveSimulator />}
    </div>
  );
}
