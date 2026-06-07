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
          Board certified internist and hospitalist with an active part-time clinical practice. US/Swedish dual citizen, based in Karlstad. Trained in biomedical engineering before medicine.
        </p>
        <p style={{ margin: '0 0 1rem 0' }}>
          My daily work is inpatient hospital medicine: admissions, cross cover, ICU co management, the full arc of an acute care stay.
        </p>
        <p style={{ margin: 0 }}>
          floviken.se is where I build small experiments at the intersection of medicine, AI, and bioengineering. The tools have reached a point where a physician can take an idea, write the code, put coding agents to work, and build a working experiment, whether that&apos;s an EMR workflow or a simulator for red blood cell metabolism. It&apos;s a fascinating space, and I&apos;m having a lot of fun in it. Personal work on personal time, nothing deployed, views my own.
        </p>
      </div>

      <ClosingTile slug="about" />
      <BackLink />
    </article>
  );
}
