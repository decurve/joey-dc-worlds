"use client";

import { useEffect } from "react";

/**
 * Drives two sets of CSS variables:
 *
 * 1. --rainbow-hue — global hover color cycle (24°/s, full cycle ~15s)
 *
 * 2. Background gradient blobs — four blobs, each oscillating within the
 *    DC blue family (hue ~200–260: sky blue → cobalt → indigo).
 *    Each has a different center hue, amplitude, and phase so they drift
 *    independently, creating organic variation within the brand palette.
 *    --bg-hue-1 through --bg-hue-4
 */

// Each blob: [centerHue, amplitude, phaseOffset (radians), speed (rad/s)]
// Range = centerHue ± amplitude, staying in the 195–265° blue family
const BLOBS: [number, number, number, number][] = [
  [228, 28,  0.0,  0.12],  // blob 1: DC cobalt, top-right
  [195, 20,  1.8,  0.09],  // blob 2: teal bridge between blue + green, center
  [148, 18,  3.5,  0.07],  // blob 3: green nebula, bottom-left
  [220, 18,  5.2,  0.08],  // blob 4: periwinkle, light pages only
];

export default function RainbowProvider() {
  useEffect(() => {
    let hoverHue = 0;
    let t = 0;
    let lastTime = performance.now();
    let raf: number;

    const tick = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;
      t += dt;

      // Hover rainbow — full spectrum, fast
      hoverHue = (hoverHue + dt * 24) % 360;
      document.documentElement.style.setProperty("--rainbow-hue", String(Math.round(hoverHue)));

      // Background blobs — oscillate within blue family
      BLOBS.forEach(([center, amp, phase, speed], i) => {
        const hue = center + amp * Math.sin(t * speed + phase);
        document.documentElement.style.setProperty(`--bg-hue-${i + 1}`, String(Math.round(hue)));
      });

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return null;
}
