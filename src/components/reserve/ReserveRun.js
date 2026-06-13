// Reserve — the single interactive page, toggled between two existing tools and
// driven by ONE shared disturbance control (a real-drug menu).
//
// COMPOSITION, not a rewrite: it renders the existing ReserveCompare (side-by-
// side, default) or ReserveSimulator (single cell), unchanged in behaviour, and
// feeds BOTH the same `oxidantLevel` derived from the selected drug's risk tier.
//
// HONESTY (the core of this change): the drug list and their RISK TIERS are
// sourced fact. How hard each drug pushes the cell is QUALITATIVE — the TIER
// (not a per-drug potency) maps to one of three oxidant-stress levels. Nothing
// invented in between: real tier in -> qualitative behaviour out. No dose/mg
// numbers, no per-drug numeric potency, no "safe at X".
//
// SOURCES (drugs + tiers): Youngster I, et al. "Medications and glucose-6-
// phosphate dehydrogenase deficiency: an evidence-based review." Drug Saf. 2010;
// 33(9):713-726. And CPIC (Clinical Pharmacogenetics Implementation Consortium)
// G6PD drug-risk categories (high / medium / low). The tier->oxidant-level map
// below is illustrative, NOT from those sources.

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
  card: "#f1ede3",
  accent: "#7a1f2b",
  accentBg: "#f3e7e4",
};

// Risk tiers (sourced) -> qualitative oxidant-stress level (illustrative). The
// level is the existing engine's oxidant input; no engine math changes.
const TIERS = {
  avoid: { label: "Avoid / high risk", level: 1.0, color: "#a32d2d", stress: "strong oxidant stress" },
  caution: { label: "Caution / variable", level: 0.45, color: "#b07d2d", stress: "moderate oxidant stress" },
  lower: { label: "Lower risk", level: 0.1, color: "#2d7a3e", stress: "mild oxidant stress" },
};
const TIER_ORDER = ["avoid", "caution", "lower"];

// Drugs grouped by their real tier. Within a tier the qualitative stress is the
// SAME — no per-drug potency. Dose qualifiers ("high dose") are part of the
// sourced guidance, not numbers.
const DRUGS = [
  // Avoid / high risk — Youngster et al. 2010 (definite risk); CPIC high.
  { id: "primaquine", name: "Primaquine", tier: "avoid" },
  { id: "rasburicase", name: "Rasburicase", tier: "avoid" },
  { id: "dapsone", name: "Dapsone", tier: "avoid" },
  { id: "nitrofurantoin", name: "Nitrofurantoin", tier: "avoid" },
  { id: "phenazopyridine", name: "Phenazopyridine", tier: "avoid" },
  { id: "methylene-blue", name: "Methylene blue", tier: "avoid" },
  { id: "toluidine-blue", name: "Toluidine blue", tier: "avoid" },
  // Caution / variable — CPIC medium (possible / dose- or variant-dependent).
  { id: "sulfamethoxazole", name: "Sulfamethoxazole", tier: "caution" },
  { id: "ciprofloxacin", name: "Ciprofloxacin", tier: "caution" },
  { id: "chloroquine", name: "Chloroquine", tier: "caution" },
  { id: "aspirin-high", name: "Aspirin (high dose)", tier: "caution" },
  { id: "vitamin-k", name: "Vitamin K analogues", tier: "caution" },
  // Lower risk — CPIC low (commonly asked about; low risk at normal doses).
  { id: "acetaminophen", name: "Acetaminophen (paracetamol)", tier: "lower" },
  { id: "aspirin-low", name: "Aspirin (low dose)", tier: "lower" },
  { id: "ascorbic-acid", name: "Ascorbic acid (vitamin C)", tier: "lower" },
];
const DEFAULT_DRUG = "primaquine"; // an Avoid drug — the clearest first image

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
  const [drugId, setDrugId] = useState(DEFAULT_DRUG);

  const drug = DRUGS.find((d) => d.id === drugId) || DRUGS[0];
  const tier = TIERS[drug.tier];
  const oxidantLevel = tier.level;

  return (
    <div style={{ fontFamily: SANS }}>
      {/* view toggle */}
      <div
        role="group"
        aria-label="Choose a view"
        style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "20px" }}
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

      {/* shared disturbance control: a real-drug menu (drives both views) */}
      <div style={{ marginBottom: "12px", maxWidth: "520px" }}>
        <label
          htmlFor="reserve-drug"
          style={{ fontSize: "12px", fontWeight: 500, color: C.body, letterSpacing: "0.01em" }}
        >
          Drug — the disturbance
        </label>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "8px", flexWrap: "wrap" }}>
          <select
            id="reserve-drug"
            value={drugId}
            onChange={(e) => setDrugId(e.target.value)}
            style={{
              fontFamily: SANS,
              fontSize: "14px",
              color: C.ink,
              background: C.surface,
              border: `1px solid ${C.rule}`,
              borderRadius: "6px",
              padding: "8px 10px",
              minWidth: "240px",
              cursor: "pointer",
            }}
          >
            {TIER_ORDER.map((tk) => (
              <optgroup key={tk} label={TIERS[tk].label}>
                {DRUGS.filter((d) => d.tier === tk).map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          <span
            aria-label={`Risk tier: ${tier.label}`}
            style={{
              fontSize: "12px",
              fontWeight: 500,
              color: "#ffffff",
              background: tier.color,
              borderRadius: "999px",
              padding: "3px 11px",
              whiteSpace: "nowrap",
            }}
          >
            {tier.label}
          </span>
          <span style={{ fontSize: "12px", color: C.muted }}>{tier.stress}</span>
        </div>
      </div>

      {/* required framing line — prominent, near the drug control */}
      <p
        style={{
          fontFamily: '"Georgia", serif',
          fontSize: "0.875rem",
          lineHeight: 1.6,
          color: C.body,
          background: C.card,
          borderLeft: `3px solid ${C.accent}`,
          borderRadius: "0 6px 6px 0",
          padding: "10px 14px",
          margin: "0 0 22px",
          maxWidth: "640px",
        }}
      >
        A sketch of how a clinician might reason about oxidant risk. The drugs and
        their risk tiers are real (CPIC; Youngster et al. 2010). How hard each one
        pushes this cell is illustrative &mdash; a qualitative stress level by risk
        tier, not a dose or a prediction. Not a clinical tool.
      </p>

      {view === "compare" ? (
        <ReserveCompare oxidantLevel={oxidantLevel} />
      ) : (
        <ReserveSimulator oxidantLevel={oxidantLevel} />
      )}
    </div>
  );
}
