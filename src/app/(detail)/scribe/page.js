import Link from "next/link";
import { tileMetadata } from "@/app/_components/tile-data";
import { BackLink } from "@/app/_components/ActionTile";

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

const speakUpWrapper = {
  aspectRatio: "1 / 1",
  borderRadius: "14px",
  overflow: "hidden",
  position: "relative",
  fontFamily: "Georgia, serif",
  textDecoration: "none",
  display: "block",
  maxWidth: "480px",
  width: "100%",
  margin: "3rem auto 0",
  boxSizing: "border-box",
  background: "#B8C2B0",
};

const speakUpArt = {
  position: "absolute",
  inset: 0,
  overflow: "hidden",
  pointerEvents: "none",
};

const speakUpContent = {
  width: "100%",
  height: "100%",
  padding: "28px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  position: "relative",
  boxSizing: "border-box",
  color: "#2A2E26",
};

const speakUpTagRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontFamily: '"Inter", -apple-system, sans-serif',
  fontSize: "11px",
  letterSpacing: "2px",
  textTransform: "uppercase",
  color: "#4A5448",
  opacity: 0.8,
};

const speakUpName = {
  fontFamily: '"Georgia", serif',
  fontSize: "32px",
  lineHeight: 1.1,
  color: "#2A2E26",
  marginBottom: "10px",
};

const speakUpTagline = {
  fontFamily: '"Georgia", serif',
  fontStyle: "italic",
  fontSize: "16px",
  lineHeight: 1.45,
  color: "#4A5448",
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

      <a className="action-tile" href="mailto:richard@floviken.se" style={speakUpWrapper}>
        <div style={speakUpArt}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 400 400"
            preserveAspectRatio="xMidYMid slice"
          >
            <g transform="rotate(22 270 250)">
              <ellipse cx="270" cy="210" rx="30" ry="42" fill="#2A2E26" stroke="#2A2E26" strokeWidth="2" />
              <line x1="248" y1="195" x2="292" y2="195" stroke="#B8C2B0" strokeWidth="1" />
              <line x1="246" y1="208" x2="294" y2="208" stroke="#B8C2B0" strokeWidth="1" />
              <line x1="246" y1="221" x2="294" y2="221" stroke="#B8C2B0" strokeWidth="1" />
              <line x1="248" y1="234" x2="292" y2="234" stroke="#B8C2B0" strokeWidth="1" />
              <circle cx="270" cy="248" r="2.5" fill="#C25A3B" />
              <rect x="261" y="256" width="18" height="10" fill="#2A2E26" />
              <line x1="270" y1="266" x2="270" y2="330" stroke="#2A2E26" strokeWidth="2" strokeLinecap="round" />
            </g>
          </svg>
        </div>
        <div style={speakUpContent}>
          <div style={speakUpTagRow}>
            <span>&middot;</span>
            <span>Open</span>
          </div>
          <div>
            <div style={speakUpName}>Speak up</div>
            <div style={speakUpTagline}>
              Have a thought on any of this?
              <br />
              I&apos;d like to hear it.
            </div>
          </div>
        </div>
      </a>

      <BackLink />
    </article>
  );
}
