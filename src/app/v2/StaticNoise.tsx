"use client";

/**
 * StaticNoise — full-screen animated fine grain noise using canvas.
 * Renders at 1024x1024 with smooth scaling for very fine, film-like grain
 * that moves like static. Sits behind page content (z-index 1).
 */

import { useEffect, useRef } from "react";

export default function StaticNoise({ opacity = 0.06 }: { opacity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Large canvas = very fine grain when scaled to full screen
    const W = 1024;
    const H = 1024;
    canvas.width = W;
    canvas.height = H;

    const imageData = ctx.createImageData(W, H);
    const data = imageData.data;
    let raf: number;

    const draw = () => {
      for (let i = 0; i < data.length; i += 4) {
        const v = (Math.random() * 255) | 0;
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
        data[i + 3] = 255;
      }
      ctx.putImageData(imageData, 0, 0);
      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{
        zIndex: 999,
        opacity,
        mixBlendMode: "multiply",
      }}
    />
  );
}
