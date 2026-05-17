import Link from "next/link";
import { tiles } from "./tile-data";

const wrapperBase = {
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
};

const artLayer = {
  position: "absolute",
  inset: 0,
  overflow: "hidden",
  pointerEvents: "none",
};

const contentLayer = {
  width: "100%",
  height: "100%",
  padding: "28px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  position: "relative",
  boxSizing: "border-box",
};

const tagStyle = {
  fontFamily: '"Inter", -apple-system, sans-serif',
  fontSize: "11px",
  letterSpacing: "2px",
  textTransform: "uppercase",
  opacity: 0.72,
};

const verbStyle = {
  fontFamily: '"Georgia", serif',
  fontStyle: "italic",
  fontSize: "30px",
  lineHeight: 1.15,
  marginBottom: "10px",
};

const subStyle = {
  fontFamily: '"Inter", -apple-system, sans-serif',
  fontSize: "13px",
  letterSpacing: "0.5px",
  opacity: 0.78,
};

export default function ActionTile({
  bg,
  color = "#F2EEDF",
  tag,
  verb,
  sub,
  tagColor,
  subColor,
  href,
  external,
  glyphSvg,
}) {
  const content = (
    <>
      <div style={artLayer}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 400 400"
          preserveAspectRatio="xMidYMid slice"
          dangerouslySetInnerHTML={{ __html: glyphSvg }}
        />
      </div>
      <div style={{ ...contentLayer, color }}>
        <div style={{ ...tagStyle, color: tagColor || color }}>{tag}</div>
        <div>
          <div style={verbStyle}>{verb}</div>
          <div style={{ ...subStyle, color: subColor || color }}>{sub}</div>
        </div>
      </div>
    </>
  );

  const style = { ...wrapperBase, background: bg };

  if (href) {
    if (external) {
      return (
        <a
          className="action-tile"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          style={style}
        >
          {content}
        </a>
      );
    }
    if (href.startsWith("mailto:") || href.startsWith("tel:")) {
      return (
        <a className="action-tile" href={href} style={style}>
          {content}
        </a>
      );
    }
    return (
      <Link className="action-tile" href={href} style={style}>
        {content}
      </Link>
    );
  }

  return <div style={style}>{content}</div>;
}

export function ClosingTile({ slug }) {
  const t = tiles[slug];
  if (!t) return null;
  return (
    <ActionTile
      bg={t.bg}
      color={t.color}
      tag={t.tag}
      verb={t.verb}
      sub={t.sub}
      tagColor={t.tagColor}
      subColor={t.subColor}
      href={t.href}
      external={t.external}
      glyphSvg={t.glyph}
    />
  );
}

export function BackLink() {
  return (
    <div style={{ textAlign: "center", marginTop: "24px", marginBottom: "1rem" }}>
      <Link
        href="/"
        className="back-link"
        style={{
          fontFamily: '"Georgia", serif',
          fontStyle: "italic",
          fontSize: "14px",
          color: "#5A5142",
          textDecoration: "none",
        }}
      >
        &larr; Back to the lab
      </Link>
    </div>
  );
}
