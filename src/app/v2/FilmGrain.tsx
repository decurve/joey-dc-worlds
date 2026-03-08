"use client";

/**
 * FilmGrain — a full-screen noise overlay using an SVG feTurbulence filter.
 * The baseFrequency seed is animated via CSS to create a "live video" grain.
 * Pointer-events are disabled so it never blocks interaction.
 */

export default function FilmGrain() {
  return (
    <>
      {/* SVG filter definition (hidden, just defines the noise pattern) */}
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <filter id="film-grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
              seed="0"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
      </svg>

      {/* Noise overlay — covers entire viewport, always on top */}
      <div className="film-grain-overlay" />
    </>
  );
}
