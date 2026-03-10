"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import RocketGame from "./RocketGame";

/*
  Simple scroll animation:
    0–0.7: Big DEMAND CURVE shrinks from max size to small
    0.7+: "Keep scrolling for a secret" hint
    0.85+: Back to top button
    0.96+: Rocket game takes over
*/

const SCROLL_HEIGHT = 8000;
const MAX_PARTICLES = 120;

function clamp(t: number) { return Math.max(0, Math.min(1, t)); }
function lerp(a: number, b: number, t: number) { return a + (b - a) * clamp(t); }
function easeOut(t: number) { return 1 - Math.pow(1 - clamp(t), 3); }
function pp(g: number, s: number, e: number) { return clamp((g - s) / (e - s)); }

type Particle = {
  x: number; y: number; vx: number; vy: number;
  life: number; maxLife: number; size: number;
};

export default function MassiveTypeScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(0);
  const smoothProgress = useRef(-1);
  const frameRef = useRef(0);
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 });
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const lastBackToTop = useRef(false);
  const lastShowGame = useRef(false);
  const timeRef = useRef(0);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext("2d")!;

    function spawnParticles(x: number, y: number, count: number, spread: number) {
      const particles = particlesRef.current;
      for (let j = 0; j < count; j++) {
        if (particles.length >= MAX_PARTICLES) {
          const oldest = particles.reduce((a, b) => a.life > b.life ? a : b);
          oldest.x = x + (Math.random() - 0.5) * spread;
          oldest.y = y + (Math.random() - 0.5) * 20;
          oldest.vx = (Math.random() - 0.5) * 1.2;
          oldest.vy = -Math.random() * 1.2 - 0.3;
          oldest.life = 0;
          oldest.maxLife = 40 + Math.random() * 50;
          oldest.size = 1 + Math.random() * 2;
        } else {
          particles.push({
            x: x + (Math.random() - 0.5) * spread,
            y: y + (Math.random() - 0.5) * 20,
            vx: (Math.random() - 0.5) * 1.2,
            vy: -Math.random() * 1.2 - 0.3,
            life: 0,
            maxLife: 40 + Math.random() * 50,
            size: 1 + Math.random() * 2,
          });
        }
      }
    }

    function updateAndDrawParticles() {
      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vy -= 0.01;
        p.vx *= 0.98;

        const lifeRatio = p.life / p.maxLife;
        if (lifeRatio >= 1) { particles.splice(i, 1); continue; }

        const fadeIn = Math.min(lifeRatio * 5, 1);
        const fadeOut = 1 - Math.pow(lifeRatio, 2);
        const alpha = fadeIn * fadeOut * 0.35;
        const size = p.size * (1 - lifeRatio * 0.5);
        ctx.fillStyle = `rgba(60, 40, 100, ${alpha})`;
        ctx.fillRect(p.x - size / 2, p.y - size / 2, size, size);
      }
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = w + "px";
      canvas!.style.height = h + "px";
      sizeRef.current = { w, h, dpr };
    }
    resize();
    window.addEventListener("resize", resize);

    function onScroll() {
      const rect = container!.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      progressRef.current = clamp(-rect.top / scrollable);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    function draw() {
      frameRef.current = requestAnimationFrame(draw);
      timeRef.current += 0.016;

      if (smoothProgress.current < 0) smoothProgress.current = progressRef.current;
      smoothProgress.current += (progressRef.current - smoothProgress.current) * 0.12;
      const p = smoothProgress.current;
      const time = timeRef.current;

      const { w, h, dpr } = sizeRef.current;

      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;

      // ── Show/hide game ──
      const shouldShowGame = p > 0.96;
      if (shouldShowGame !== lastShowGame.current) {
        lastShowGame.current = shouldShowGame;
        setShowGame(shouldShowGame);
      }

      // ── Big DEMAND CURVE — shrinks as you scroll ──
      // At p=0: max size. At p=0.85: small. Fades out when game shows.
      const shrinkP = easeOut(pp(p, 0, 0.85));
      const gameFade = shouldShowGame ? 0 : 1;

      if (gameFade > 0) {
        ctx.font = "bold 100px 'PP Mondwest', monospace";
        const measure100 = ctx.measureText("DEMAND CURVE").width;
        const maxSize = Math.min((w * 0.9 / measure100) * 100, h * 0.32);
        const minSize = Math.min(w * 0.025, 28);

        // Subtle breathing
        const breathe = 1 + Math.sin(time * 0.6) * 0.005;
        const fontSize = lerp(maxSize, minSize, shrinkP) * breathe;

        // Fade slightly as it gets small
        const alpha = lerp(1, 0.4, shrinkP) * gameFade;

        ctx.globalAlpha = alpha;
        ctx.fillStyle = "#000";
        ctx.font = `bold ${fontSize}px 'PP Mondwest', monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("DEMAND CURVE", cx, h / 2);

        // Sparse particles around text
        if (shrinkP < 0.5 && Math.random() < 0.08) {
          spawnParticles(cx + (Math.random() - 0.5) * fontSize * 5, h / 2, 1, fontSize * 2);
        }

        // "Keep scrolling for a secret" hint
        if (shrinkP > 0.6 && !shouldShowGame) {
          const hintAlpha = clamp((shrinkP - 0.6) * 2.5);
          const pulse = 0.4 + Math.sin(time * 1.8) * 0.15;
          ctx.globalAlpha = hintAlpha * pulse * gameFade;
          ctx.font = "11px 'IBM Plex Mono', monospace";
          ctx.fillStyle = "#000";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("↓  KEEP SCROLLING FOR A SECRET  ↓", cx, h / 2 + fontSize * 0.5 + 24);
        }

        ctx.globalAlpha = 1;
      }

      // ── Draw particles ──
      updateAndDrawParticles();

      // Back-to-top
      const shouldShow = p > 0.85;
      if (shouldShow !== lastBackToTop.current) {
        lastBackToTop.current = shouldShow;
        setShowBackToTop(shouldShow);
      }

      ctx.restore();
    }

    frameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <div ref={containerRef} className="relative" style={{ height: SCROLL_HEIGHT }}>
        <div className="sticky top-0 h-screen v2-bg overflow-hidden" style={{ zIndex: 2 }}>
          <canvas ref={canvasRef} className="w-full h-full" style={{ position: "relative", zIndex: 1 }} />

          <RocketGame visible={showGame} />

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="absolute bottom-8 right-8 flex flex-col items-center gap-2 transition-all duration-500"
            style={{
              opacity: showBackToTop ? 1 : 0,
              pointerEvents: showBackToTop ? "auto" : "none",
              transform: showBackToTop ? "translateY(0)" : "translateY(12px)",
              zIndex: 4,
            }}
          >
            <div
              className="w-16 h-16 border border-black/20 flex items-center justify-center"
              style={{ background: "rgba(249,249,248,0.4)", backdropFilter: "blur(4px)" }}
            >
              <div className="w-11 h-11 rounded-full bg-black/90 flex items-center justify-center">
                <ArrowUp className="w-4 h-4 text-white/70" />
              </div>
            </div>
            <span
              className="font-mono text-[9px] uppercase tracking-[0.2em] text-black/40"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              Back to top
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
