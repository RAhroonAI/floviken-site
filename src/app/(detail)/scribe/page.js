import { tileMetadata } from "@/app/_components/tile-data";
import { ClosingTile, BackLink } from "@/app/_components/ActionTile";

export const metadata = tileMetadata("scribe", {
  title: "Scribe — A different seat | Floviken",
  description:
    "A position from the lab: AI scribes solve transcription, but the next step is a chart-aware companion that reads alongside the clinician — a backup behind clinical intuition, not a replacement for it.",
});

const paragraph = {
  fontFamily: '"Georgia", serif',
  fontSize: "1rem",
  lineHeight: "1.7",
  color: "#4a4a4a",
  marginBottom: "1rem",
  marginTop: 0,
};

export default function Scribe() {
  return (
    <article>
      <p
        style={{
          fontFamily: '"Inter", -apple-system, sans-serif',
          fontSize: "0.75rem",
          letterSpacing: "0.15em",
          color: "#8a8a8a",
          textTransform: "uppercase",
          margin: "0 0 0.5rem 0",
        }}
      >
        Scribe
      </p>
      <h1
        style={{
          fontFamily: '"Georgia", serif',
          fontSize: "1.75rem",
          fontWeight: 400,
          fontStyle: "italic",
          color: "#2a2a2a",
          marginBottom: "1.5rem",
          marginTop: 0,
        }}
      >
        A different seat.
      </h1>
      <p style={paragraph}>
        AI scribes are good and getting better. They save clinicians time, they reduce after-hours charting, and the trajectory is real. The work being done here is solid.
      </p>
      <p style={paragraph}>
        What follows is a forward-looking thought about where the same technology could go next, in acute care.
      </p>
      <p style={paragraph}>
        For AI to become a strong clinical companion, it would need unfiltered transcription of the patient&apos;s voice as input to its analysis &mdash; not as the product, but as data. The chart is the substrate: past medical history, prior encounters, procedures, medication trajectory, the longitudinal record of how this patient has moved through the system before. The voice, fed into that record, becomes the final piece. The input that completes the picture.
      </p>
      <p style={paragraph}>
        The hard work of acute care &mdash; finding the shape of what&apos;s actually happening when the story is partial and the data is mixed &mdash; belongs with physicians, and probably will for a long time. No tool described here changes that. But around that work, there&apos;s room for a different kind of companion. One that reads the chart and the voice together, and after the physician has made the call, offers a quiet second view. A backup behind clinical intuition, not a replacement for it.
      </p>
      <p style={paragraph}>
        Diagnostic anchoring and premature closure are real sources of harm in acute care. A companion with full chart context, speaking only when it has something to add, is well-positioned to help with them.
      </p>
      <p style={paragraph}>
        The conversation isn&apos;t the center of gravity. It&apos;s the closing data point.
      </p>
      <p style={paragraph}>
        This is one view. There are many out there, and the lab is interested in hearing them.
      </p>

      <ClosingTile slug="scribe" />
      <BackLink />
    </article>
  );
}
