import { BackLink } from "@/app/_components/ActionTile";
import { ReserveRun } from "@/components/reserve/ReserveRun";
import Link from "next/link";

export const metadata = {
  title: "Reserve: run the experiment · Floviken",
  description:
    "Run the Reserve red-blood-cell simulation: compare a healthy cell with a real documented G6PD-deficient patient under the same oxidant, or drive a single cell yourself. Floviken lab, Experiment 09.",
  alternates: { canonical: "https://floviken.se/reserve/run" },
  openGraph: {
    title: "Reserve: run the experiment · Floviken",
    description:
      "Compare a healthy cell with a real G6PD-deficient patient under the same oxidant, or drive a single cell yourself.",
    url: "https://floviken.se/reserve/run",
    siteName: "Floviken",
    type: "website",
    images: [{ url: "https://floviken.se/og/reserve.png", width: 1200, height: 627, alt: "Reserve" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reserve: run the experiment · Floviken",
    description:
      "Compare a healthy cell with a real G6PD-deficient patient under the same oxidant, or drive a single cell yourself.",
    images: ["https://floviken.se/og/reserve.png"],
  },
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

export default function ReserveRunPage() {
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
        Reserve &middot; run the experiment
      </p>
      <h1 style={{
        fontFamily: '"Georgia", serif',
        fontSize: "1.75rem",
        fontWeight: 400,
        color: "#2a2a2a",
        marginBottom: "1rem",
        marginTop: 0,
      }}>
        Run the experiment
      </h1>

      <p style={{
        fontFamily: '"Georgia", serif',
        fontSize: "1rem",
        lineHeight: 1.7,
        color: "#4a4a4a",
        marginTop: 0,
        marginBottom: "1.75rem",
      }}>
        Compare a healthy cell with a real documented patient under one shared
        drug, or switch to a single cell and pick the genotype yourself.
      </p>

      <ReserveRun />

      <div style={{ textAlign: "center", marginTop: "1.75rem" }}>
        <Link href="/reserve" style={roomLink}>&larr; Back to the Reserve write-up</Link>
      </div>

      <div style={statusLine}>09 &middot; In progress</div>

      <BackLink />
    </article>
  );
}
