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
          I&apos;m Richard Ahroon, an internist and hospitalist with a background in biomedical engineering. I&apos;m a US/Swedish dual citizen with an active part-time clinical practice in the United States, based in Karlstad, Sweden.
        </p>
        <p style={{ margin: '0 0 1rem 0' }}>
          Floviken is a working laboratory for clinical AI. Each experiment is a room. When a room needs a clinical surface to live in, it runs on <a href="https://keel.floviken.se" target="_blank" rel="noopener noreferrer" style={{ color: '#5a5a5a', textDecoration: 'none', borderBottom: '1px solid #d8d2c5', paddingBottom: '1px' }}>Keel</a>, a synthetic EMR I built as the lab&apos;s substrate. Keel holds patients, charts, imaging, problem lists, and an agent log.
        </p>
        <p style={{ margin: '0 0 1rem 0' }}>
          The lab is built around inpatient hospital medicine. Admissions, cross-cover, ICU co-management, the full arc of an acute-care stay. Wake captures the patients who came off the service overnight so they don&apos;t disappear from the morning list. Lowfire moves from the neutropenic fever alert to the orders inside the 60-minute window. Doorstep gives the AMA discharge a documentation path. Margin reads radiology reports and surfaces incidental findings into the problem list so they don&apos;t get missed. The lab&apos;s commitment is to build AI into the chart, not next to it, and to constrain what the AI does with something verifiable: a source document, a guideline, or a deterministic algorithm.
        </p>
        <p style={{ margin: '0 0 1rem 0' }}>
          The patients are synthetic. The guidelines are public. Nothing here is deployed in any clinical setting. Floviken is personal work on personal time, not affiliated with any employer or health system.
        </p>
        <p style={{ margin: 0 }}>
          If you work in clinical AI and want a clinician&apos;s perspective, get in touch. Opinions on the lab or any experiment are welcome.
        </p>
      </div>

      <ClosingTile slug="about" />
      <BackLink />
    </article>
  );
}
