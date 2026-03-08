"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  opacityTarget: number;
  opacitySpeed: number;
  vx: number;
  vy: number;
}

const STAR_COUNT = 180;

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let stars: Star[] = [];

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = Array.from({ length: STAR_COUNT }, () => ({
        x: randomBetween(0, canvas.width),
        y: randomBetween(0, canvas.height),
        size: randomBetween(0.4, 1.6),
        opacity: randomBetween(0.1, 0.7),
        opacityTarget: randomBetween(0.1, 0.7),
        opacitySpeed: randomBetween(0.003, 0.012),
        vx: randomBetween(-0.04, 0.04),
        vy: randomBetween(-0.04, 0.04),
      }));
    };

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const star of stars) {
        // Drift
        star.x += star.vx;
        star.y += star.vy;

        // Wrap edges
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        // Twinkle — ease toward opacityTarget
        const diff = star.opacityTarget - star.opacity;
        star.opacity += diff * star.opacitySpeed * 60 * (1 / 60);
        if (Math.abs(diff) < 0.01) {
          star.opacityTarget = randomBetween(0.05, 0.75);
        }

        // Draw — slight blue-white tint to match DC brand
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(210, 220, 255, ${star.opacity})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };

    const onResize = () => {
      init();
    };

    init();
    raf = requestAnimationFrame(tick);
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
