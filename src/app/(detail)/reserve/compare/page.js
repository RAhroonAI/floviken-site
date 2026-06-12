import { BackLink } from "@/app/_components/ActionTile";
import { ReserveCompare } from "@/components/reserve/ReserveCompare";
import Link from "next/link";

export const metadata = {
  title: "Reserve — the threshold window · Floviken",
  description:
    "A healthy red blood cell and a real documented severe G6PD-deficient patient under the same oxidant — the window of doses safe for one and dangerous for the other. Floviken lab, Experiment 09.",
  alternates: { canonical: "https://floviken.se/reserve/compare" },
  openGraph: {
    title: "Reserve — the threshold window · Floviken",
    description:
      "Same dose, a different outcome — the window of exposures safe for a healthy cell but dangerous for a G6PD-deficient patient.",
    url: "https://floviken.se/reserve/compare",
    siteName: "Floviken",
    type: "website",
    images: [{ url: "https://floviken.se/og/reserve.png", width: 1200, height: 627, alt: "Reserve" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reserve — the threshold window · Floviken",
    description:
      "Same dose, a different outcome — the window of exposures safe for a healthy cell but dangerous for a G6PD-deficient patient.",
    images: ["https://floviken.se/og/reserve.png"],
  },
};

const paragraph = {
  fontFamily: '"Georgia", serif',
  fontSize: "1rem",
  lineHeight: "1.7",
  color: "#4a4a4a",
  marginBottom: "1rem",
  marginTop: 0,
};

const statusLine = {
  fontFamily: '"Inter", -apple-system, sans-serif',
  fontSize: "0.75rem",
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "#8a8a8a",
  textAlign: "center",
  marginTop: "1.25rem",
  marginBottom: "1rem",
};

const roomLink = {
  fontFamily: '"Inter", -apple-system, sans-serif',
  fontSize: "0.8125rem",
  letterSpacing: "0.02em",
  color: "#7a1f2b",
  textDecoration: "none",
  borderBottom: "1px solid #e0c6c0",
  paddingBottom: "1px",
};

export default function ReserveComparePage() {
  return (
    <article>
      <p style={{
        fontFamily: '"Inter", -apple-system, sans-serif',
        fontSize: "0.75rem",
        letterSpacing: "0.15em",
        color: "#8a8a8a",
        textTransform: "uppercase",
        margin: "0 0 0.5rem 0",
      }}>
        Reserve &middot; the threshold window
      </p>
      <h1 style={{
        fontFamily: '"Georgia", serif',
        fontSize: "1.75rem",
        fontWeight: 400,
        color: "#2a2a2a",
        marginBottom: "1.5rem",
        marginTop: 0,
      }}>
        Reserve &mdash; the same dose, a different outcome
      </h1>

      <p style={paragraph}>
        Two cells, one dose. On the left, a healthy red blood cell. On the right,
        a real, individually documented patient with a severe G6PD deficiency.
        They run the same simulation &mdash; the same engine, the same oxidant
        &mdash; and the only thing different between them is the patient&apos;s
        measured enzyme. Watch the single graph: both reserves fall together for a
        moment, then fork. The healthy cell pulls back; the patient&apos;s keeps
        dropping, past the line, and the cell is cleared.
      </p>

      <p style={paragraph}>
        The point isn&apos;t that they differ &mdash; it&apos;s the gap. Raise the
        dose and you can find two lines: the dose where the patient&apos;s cell
        tips into failure, and, much higher, the dose where even the healthy cell
        begins to strain. Between them is a window &mdash; a whole range of
        exposures safe for most people and dangerous for this patient. That window
        is the clinical problem. It is qualitative here, a phenomenon rather than a
        milligram figure.
      </p>

      <div style={{ marginTop: "2rem", marginBottom: "0.5rem" }}>
        <ReserveCompare />
      </div>

      <div style={{ textAlign: "center", marginTop: "1.75rem" }}>
        <Link href="/reserve" style={roomLink}>&larr; Back to the Reserve room</Link>
      </div>

      <div style={statusLine}>09 &middot; In progress</div>

      <BackLink />
    </article>
  );
}
