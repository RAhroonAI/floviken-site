# Decisions — Keel tile addition (2026-05-21)

These are judgment calls made while matching Keel to the existing tile
pattern in `src/app/page.js`. The spec said to document ambiguity here
and proceed.

1. **SVG aspect ratio.** Used `preserveAspectRatio="xMidYMid meet"` on
   the Keel illustration; every other tile uses `slice`. Keel's SVG is
   160×130 (wider than tall) — `slice` on a 1:1 tile would crop the
   sides, including the horizon waves. `meet` letterboxes top and
   bottom with the tile's own #c8d5d7 background, which is seamless.

2. **Inner background rect removed.** The SVG ships with
   `<rect width="160" height="130" fill="#c8d5d7"/>`. The tile container
   already paints #c8d5d7, and the spec explicitly allowed removing
   the rect. Removing it lets the `meet` letterbox bands blend with
   the tile background instead of stopping at a visible edge.

3. **Number slot omitted.** Rather than rendering an empty placeholder
   in the tag position, I dropped the tag `<div>` entirely. With
   `nameStyle.marginTop: '4px'` retained, "Keel" sits a few pixels
   lower than the top of `innerBase` padding but visibly higher than
   "About" sits below its "00" tag — the intended distinction.

4. **Text and pill color.** All Keel typography (name, italic tagline,
   EMR pill) uses `#2d4346`, the same dark slate as the illustration
   strokes/fills. The status pill inherits `statusBase`'s `opacity: 0.55`
   so EMR reads as quiet as the LIVE / IN PROGRESS / POSITION pills on
   other tiles.

5. **Click target.** `<a href="https://keel.floviken.se">` with no
   `target="_blank"` — opens in the same tab per spec.
