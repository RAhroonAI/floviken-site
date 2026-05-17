import { tileMetadata } from "@/app/_components/tile-data";
import { ClosingTile, BackLink } from "@/app/_components/ActionTile";

export const metadata = tileMetadata("about");

export default function About() {
  return (
    <article>
      <h1 style={{
        fontFamily: '"Georgia", serif',
        fontSize: '2rem',
        fontWeight: 400,
        color: '#2a2a2a',
        marginTop: 0,
        marginBottom: '2rem',
      }}>
        About
      </h1>

      <div style={{
        fontFamily: '"Georgia", "Times New Roman", serif',
        fontSize: '1.0625rem',
        lineHeight: '1.7',
        color: '#3a3a3a',
      }}>
        <p style={{ margin: '0 0 1rem 0' }}>
          I&apos;m Richard Ahroon, a board-certified internist and US/Swedish dual citizen, with active clinical practice in the United States. I trained in biomedical engineering before medicine, and that background has shaped a long-standing interest in where clinical medicine meets technology.
        </p>
        <p style={{ margin: '0 0 1rem 0' }}>
          My day-to-day work is inpatient hospital medicine, including ICU-level care, increasingly mediated by AI-enabled tools &mdash; ambient documentation, clinical decision support, and alert systems for sepsis and deterioration. I&apos;ve seen firsthand where these tools help and where they fall short.
        </p>
        <p style={{ margin: '0 0 1rem 0' }}>
          I build small clinical AI experiments exploring common hospitalist workflow questions &mdash; handoff structure, time-critical decision support, high-risk encounter documentation. Built from public guidelines and synthetic cases. Independent projects, not deployed in any clinical setting.
        </p>
        <p style={{ margin: 0 }}>
          If you&apos;re working on clinical AI and want a clinician&apos;s perspective, or you&apos;re a clinician thinking about getting closer to the tech side, I&apos;d like to hear from you.
        </p>
      </div>

      <ClosingTile slug="about" />
      <BackLink />
    </article>
  );
}
