"use client";

import { useEffect, useRef, useCallback } from "react";

/* ─── Shared helpers ─── */
function clamp(t: number) { return Math.max(0, Math.min(1, t)); }
function lerp(a: number, b: number, t: number) { return a + (b - a) * clamp(t); }
function easeOut(t: number) { return 1 - Math.pow(1 - clamp(t), 3); }
function easeInOut(t: number) {
  const c = clamp(t);
  return c < 0.5 ? 4 * c * c * c : 1 - Math.pow(-2 * c + 2, 3) / 2;
}

function VariationLabel({ num, title }: { num: number; title: string }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="font-mono-ui text-[10px] bg-black text-white px-2 py-0.5">V{num}</span>
      <span className="font-mono-ui text-xs text-neutral-500 uppercase tracking-widest">{title}</span>
    </div>
  );
}

function ScrollLock({
  height = 4000,
  children,
}: {
  height?: number;
  children: (progress: number) => React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const smoothRef = useRef(-1);
  const frameRef = useRef(0);
  const cbRef = useRef(children);
  cbRef.current = children;

  const canvasHolderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    function onScroll() {
      const rect = container!.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      progressRef.current = clamp(-rect.top / scrollable);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    function tick() {
      frameRef.current = requestAnimationFrame(tick);
      if (smoothRef.current < 0) smoothRef.current = progressRef.current;
      smoothRef.current += (progressRef.current - smoothRef.current) * 0.12;
    }
    frameRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative" style={{ height }}>
      <div ref={canvasHolderRef} className="sticky top-0 h-screen v2-bg overflow-hidden">
        <ProgressCanvas containerRef={containerRef} smoothRef={smoothRef}>
          {children}
        </ProgressCanvas>
      </div>
    </div>
  );
}

/* Canvas-based progress renderer */
function ProgressCanvas({
  containerRef,
  smoothRef,
  children,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
  smoothRef: React.RefObject<number>;
  children: (progress: number) => React.ReactNode;
}) {
  // This just re-renders the children function — actual drawing is in each variation
  // We need a different approach: each variation gets its own canvas with a draw loop
  return <>{children(0)}</>;
}

/* ─────────────────────────────────────────────
   V1: SLOT MACHINE / AIRPORT BOARD FLIP
   ───────────────────────────────────────────── */
function SlotMachine() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const smoothRef = useRef(-1);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext("2d")!;

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?<>{}[]";
    const target = "DEMAND CURVE";
    let frame = 0;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = window.innerWidth * dpr;
      canvas!.height = window.innerHeight * dpr;
      canvas!.style.width = window.innerWidth + "px";
      canvas!.style.height = window.innerHeight + "px";
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
      frame = requestAnimationFrame(draw);
      if (smoothRef.current < 0) smoothRef.current = progressRef.current;
      smoothRef.current += (progressRef.current - smoothRef.current) * 0.1;
      const p = smoothRef.current;
      const time = performance.now() / 1000;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const fontSize = Math.min(w * 0.07, 90);
      ctx.font = `bold ${fontSize}px 'PP Mondwest', monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const totalChars = target.length;
      const charWidth = ctx.measureText("M").width * 1.05;
      const startX = w / 2 - (totalChars * charWidth) / 2 + charWidth / 2;

      for (let i = 0; i < totalChars; i++) {
        const targetChar = target[i];
        // Each letter locks in sequence
        const lockProgress = clamp((p - i * 0.06) / 0.15);
        const locked = lockProgress >= 1;

        let displayChar: string;
        if (targetChar === " ") {
          displayChar = " ";
        } else if (locked) {
          displayChar = targetChar;
        } else if (lockProgress > 0) {
          // Cycling faster as it approaches lock
          const cycleSpeed = 4 + lockProgress * 20;
          const idx = Math.floor(time * cycleSpeed + i * 7) % chars.length;
          displayChar = chars[idx];
        } else {
          displayChar = " ";
        }

        const x = startX + i * charWidth;
        const y = h / 2;

        // Slot machine flip effect — slight vertical offset during cycling
        let yOffset = 0;
        if (!locked && lockProgress > 0) {
          yOffset = Math.sin(time * 15 + i) * 3 * (1 - lockProgress);
        }

        // Flash white when locking
        if (lockProgress > 0.85 && lockProgress < 1) {
          ctx.fillStyle = `rgba(0,0,0,${0.3 + lockProgress * 0.7})`;
        } else if (locked) {
          ctx.fillStyle = "#000";
        } else {
          ctx.fillStyle = `rgba(0,0,0,${lockProgress * 0.5})`;
        }

        ctx.fillText(displayChar, x, y + yOffset);

        // Underline for each slot
        if (lockProgress > 0 && targetChar !== " ") {
          ctx.fillStyle = locked ? "rgba(0,0,0,0.15)" : "rgba(0,0,0,0.06)";
          ctx.fillRect(x - charWidth * 0.4, y + fontSize * 0.55, charWidth * 0.8, 2);
        }
      }

      // Locked count indicator
      const lockedCount = target.split("").filter((_, i) => {
        const lp = clamp((p - i * 0.06) / 0.15);
        return lp >= 1 && target[i] !== " ";
      }).length;
      const totalLetters = target.replace(/ /g, "").length;
      if (lockedCount > 0 && lockedCount < totalLetters) {
        ctx.font = "10px 'IBM Plex Mono', monospace";
        ctx.fillStyle = "rgba(0,0,0,0.2)";
        ctx.textAlign = "center";
        ctx.fillText(`${lockedCount}/${totalLetters}`, w / 2, h / 2 + fontSize * 0.8);
      }

      ctx.restore();
    }

    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative" style={{ height: 5000 }}>
      <div className="sticky top-0 h-screen v2-bg overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   V2: CONSTELLATION / CONNECT THE DOTS
   ───────────────────────────────────────────── */

// 5x7 pixel font for constellation targets
const PIXEL_FONT: Record<string, number[][]> = {
  D: [[1,1,1,0],[1,0,0,1],[1,0,0,1],[1,0,0,1],[1,0,0,1],[1,0,0,1],[1,1,1,0]],
  E: [[1,1,1,1],[1,0,0,0],[1,0,0,0],[1,1,1,0],[1,0,0,0],[1,0,0,0],[1,1,1,1]],
  M: [[1,0,0,0,1],[1,1,0,1,1],[1,0,1,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1]],
  A: [[0,1,1,0],[1,0,0,1],[1,0,0,1],[1,1,1,1],[1,0,0,1],[1,0,0,1],[1,0,0,1]],
  N: [[1,0,0,1],[1,1,0,1],[1,0,1,1],[1,0,0,1],[1,0,0,1],[1,0,0,1],[1,0,0,1]],
  C: [[0,1,1,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[0,1,1,0]],
  U: [[1,0,0,1],[1,0,0,1],[1,0,0,1],[1,0,0,1],[1,0,0,1],[1,0,0,1],[0,1,1,0]],
  R: [[1,1,1,0],[1,0,0,1],[1,0,0,1],[1,1,1,0],[1,0,1,0],[1,0,0,1],[1,0,0,1]],
  V: [[1,0,0,0,1],[1,0,0,0,1],[0,1,0,1,0],[0,1,0,1,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0]],
  " ": [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
};

function Constellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const smoothRef = useRef(-1);
  const dotsRef = useRef<{ x: number; y: number; tx: number; ty: number; ox: number; oy: number }[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext("2d")!;
    let frame = 0;
    let w = 0, h = 0;

    function buildTargets() {
      w = window.innerWidth;
      h = window.innerHeight;
      const text = "DEMAND CURVE";
      const letters = text.split("");

      let totalCols = 0;
      for (const ch of letters) {
        const g = PIXEL_FONT[ch];
        if (g) totalCols += g[0].length + 1;
      }
      totalCols--;

      const cellSize = Math.min(16, (w * 0.8) / totalCols);
      const totalW = totalCols * cellSize;
      const startX = (w - totalW) / 2;
      const startY = h / 2 - 3.5 * cellSize;

      const targets: { tx: number; ty: number }[] = [];
      let col = 0;
      for (const ch of letters) {
        const g = PIXEL_FONT[ch];
        if (!g) continue;
        for (let r = 0; r < 7; r++) {
          for (let c = 0; c < g[0].length; c++) {
            if (g[r][c]) {
              targets.push({
                tx: startX + (col + c) * cellSize + cellSize / 2,
                ty: startY + r * cellSize + cellSize / 2,
              });
            }
          }
        }
        col += g[0].length + 1;
      }

      dotsRef.current = targets.map((t) => ({
        x: Math.random() * w,
        y: Math.random() * h,
        ox: Math.random() * w,
        oy: Math.random() * h,
        tx: t.tx,
        ty: t.ty,
      }));
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = w + "px";
      canvas!.style.height = h + "px";
      buildTargets();
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
      frame = requestAnimationFrame(draw);
      if (smoothRef.current < 0) smoothRef.current = progressRef.current;
      smoothRef.current += (progressRef.current - smoothRef.current) * 0.08;
      const p = smoothRef.current;
      const time = performance.now() / 1000;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const dots = dotsRef.current;
      const formation = easeInOut(clamp(p * 1.5));

      // Update positions
      for (const dot of dots) {
        const drift = Math.sin(time * 0.3 + dot.ox * 0.01) * 15 * (1 - formation);
        const driftY = Math.cos(time * 0.4 + dot.oy * 0.01) * 10 * (1 - formation);
        dot.x = lerp(dot.ox + drift, dot.tx, formation);
        dot.y = lerp(dot.oy + driftY, dot.ty, formation);
      }

      // Draw lines between nearby dots
      const lineThreshold = lerp(120, 20, formation);
      ctx.strokeStyle = `rgba(0,0,0,${lerp(0.04, 0.12, formation)})`;
      ctx.lineWidth = 0.5;
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < lineThreshold) {
            const alpha = 1 - dist / lineThreshold;
            ctx.globalAlpha = alpha;
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;

      // Draw dots
      const dotSize = lerp(2.5, 3.5, formation);
      for (const dot of dots) {
        ctx.fillStyle = `rgba(0,0,0,${lerp(0.3, 0.85, formation)})`;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dotSize, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }

    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative" style={{ height: 5000 }}>
      <div className="sticky top-0 h-screen v2-bg overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   V3: MAGNETIC CURSOR REPULSION
   ───────────────────────────────────────────── */
function MagneticText() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const smoothRef = useRef(-1);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext("2d")!;
    let frame = 0;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = window.innerWidth * dpr;
      canvas!.height = window.innerHeight * dpr;
      canvas!.style.width = window.innerWidth + "px";
      canvas!.style.height = window.innerHeight + "px";
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

    function onMouse(e: MouseEvent) {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    }
    window.addEventListener("mousemove", onMouse);

    // Break text into individual character positions
    const text = "DEMAND CURVE";
    const charOffsets: { current: { char: string; baseX: number; baseY: number; dx: number; dy: number; vx: number; vy: number }[] } = { current: [] };

    function buildChars() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const fontSize = Math.min(w * 0.07, 90);
      ctx.font = `bold ${fontSize}px 'PP Mondwest', monospace`;
      const charWidth = ctx.measureText("M").width * 1.0;
      const startX = w / 2 - (text.length * charWidth) / 2 + charWidth / 2;

      charOffsets.current = text.split("").map((char, i) => ({
        char,
        baseX: startX + i * charWidth,
        baseY: h / 2,
        dx: 0, dy: 0,
        vx: 0, vy: 0,
      }));
    }
    buildChars();
    window.addEventListener("resize", () => buildChars());

    function draw() {
      frame = requestAnimationFrame(draw);
      if (smoothRef.current < 0) smoothRef.current = progressRef.current;
      smoothRef.current += (progressRef.current - smoothRef.current) * 0.1;
      const p = smoothRef.current;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const showP = easeOut(clamp(p * 2));
      if (showP < 0.01) { ctx.restore(); return; }

      const fontSize = Math.min(w * 0.07, 90);
      ctx.font = `bold ${fontSize}px 'PP Mondwest', monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const repelRadius = 150;
      const repelStrength = 80;

      for (const ch of charOffsets.current) {
        // Repulsion from mouse
        const ddx = (ch.baseX + ch.dx) - mx;
        const ddy = (ch.baseY + ch.dy) - my;
        const dist = Math.sqrt(ddx * ddx + ddy * ddy);

        if (dist < repelRadius && dist > 0) {
          const force = (1 - dist / repelRadius) * repelStrength;
          ch.vx += (ddx / dist) * force * 0.1;
          ch.vy += (ddy / dist) * force * 0.1;
        }

        // Spring back
        ch.vx -= ch.dx * 0.06;
        ch.vy -= ch.dy * 0.06;

        // Damping
        ch.vx *= 0.88;
        ch.vy *= 0.88;

        ch.dx += ch.vx;
        ch.dy += ch.vy;

        const alpha = showP;
        ctx.fillStyle = `rgba(0,0,0,${alpha})`;
        ctx.fillText(ch.char, ch.baseX + ch.dx, ch.baseY + ch.dy);
      }

      // Hint text
      if (showP > 0.8) {
        ctx.font = "11px 'IBM Plex Mono', monospace";
        ctx.fillStyle = "rgba(0,0,0,0.2)";
        ctx.fillText("MOVE YOUR MOUSE", w / 2, h / 2 + fontSize * 0.6);
      }

      ctx.restore();
    }

    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative" style={{ height: 4000 }}>
      <div className="sticky top-0 h-screen v2-bg overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   V4: LIQUID / MERCURY RISE
   ───────────────────────────────────────────── */
function LiquidRise() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const smoothRef = useRef(-1);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext("2d")!;
    let frame = 0;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = window.innerWidth * dpr;
      canvas!.height = window.innerHeight * dpr;
      canvas!.style.width = window.innerWidth + "px";
      canvas!.style.height = window.innerHeight + "px";
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
      frame = requestAnimationFrame(draw);
      if (smoothRef.current < 0) smoothRef.current = progressRef.current;
      smoothRef.current += (progressRef.current - smoothRef.current) * 0.08;
      const p = smoothRef.current;
      const time = performance.now() / 1000;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const riseP = easeOut(clamp(p * 1.3));
      const fontSize = Math.min(w * 0.07, 90);

      // The "liquid level" rises from bottom
      const liquidTop = h - riseP * h * 0.7;

      // Draw wavy liquid surface
      if (riseP > 0.01 && riseP < 0.95) {
        ctx.beginPath();
        ctx.moveTo(0, h);
        ctx.lineTo(0, liquidTop);
        for (let x = 0; x <= w; x += 4) {
          const wave = Math.sin(x * 0.015 + time * 2) * 8 * (1 - riseP)
                     + Math.sin(x * 0.03 + time * 3.5) * 4 * (1 - riseP);
          ctx.lineTo(x, liquidTop + wave);
        }
        ctx.lineTo(w, h);
        ctx.closePath();
        ctx.fillStyle = "rgba(0,0,0,0.03)";
        ctx.fill();
      }

      // Draw text — clip to reveal from bottom (like rising out of liquid)
      ctx.save();

      // Full text in final position (faint, destination)
      const textY = h / 2;
      ctx.font = `bold ${fontSize}px 'PP Mondwest', monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Clip: only show text below the liquid line (it's "submerged" until revealed)
      // Actually: reveal text as liquid rises past it
      const revealTop = liquidTop;

      // Draw the text with a clip region — only the part below revealTop shows
      ctx.beginPath();
      ctx.rect(0, revealTop - fontSize, w, h - revealTop + fontSize * 2);
      ctx.clip();

      // Wobbly distortion on the text near the liquid surface
      const distortZone = 60;
      const textTop = textY - fontSize / 2;
      const textBot = textY + fontSize / 2;

      // If liquid is near the text, apply wobble by drawing text multiple times
      if (revealTop > textTop - distortZone && revealTop < textBot + distortZone) {
        // Draw with horizontal displacement near the surface
        for (let dy = -fontSize; dy <= fontSize; dy += 2) {
          const lineY = textY + dy;
          const distToSurface = Math.abs(lineY - revealTop);
          if (distToSurface < distortZone) {
            const wobble = Math.sin(time * 4 + dy * 0.15) * (1 - distToSurface / distortZone) * 12;
            ctx.save();
            ctx.beginPath();
            ctx.rect(0, lineY - 1, w, 3);
            ctx.clip();
            ctx.fillStyle = "#000";
            ctx.fillText("DEMAND CURVE", w / 2 + wobble, textY);
            ctx.restore();
          }
        }
      }

      // Clean text where fully revealed
      ctx.fillStyle = `rgba(0,0,0,${clamp(riseP * 1.5)})`;
      ctx.fillText("DEMAND CURVE", w / 2, textY);

      ctx.restore();
      ctx.restore();
    }

    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative" style={{ height: 5000 }}>
      <div className="sticky top-0 h-screen v2-bg overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   V5: REDACTION / CLASSIFIED REVEAL
   ───────────────────────────────────────────── */
function RedactionReveal() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const smoothRef = useRef(-1);
  const barsRef = useRef<{ x: number; y: number; w: number; h: number; removeAt: number; slideDir: number }[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext("2d")!;
    let frame = 0;

    function buildBars() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const bars: typeof barsRef.current = [];

      // Cover the center area with random black bars
      const cx = w / 2;
      const cy = h / 2;
      const coverW = w * 0.7;
      const coverH = h * 0.25;
      const left = cx - coverW / 2;
      const top = cy - coverH / 2;

      // Dense horizontal bars
      for (let y = top; y < top + coverH; y += 4 + Math.random() * 8) {
        const barH = 3 + Math.random() * 12;
        const barX = left + Math.random() * coverW * 0.1;
        const barW = coverW * (0.3 + Math.random() * 0.7);
        bars.push({
          x: barX,
          y,
          w: barW,
          h: barH,
          removeAt: 0.2 + Math.random() * 0.7, // when this bar slides away
          slideDir: Math.random() > 0.5 ? 1 : -1,
        });
      }

      // Sort by removeAt so they peel off in a satisfying order
      bars.sort((a, b) => a.removeAt - b.removeAt);
      barsRef.current = bars;
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = window.innerWidth * dpr;
      canvas!.height = window.innerHeight * dpr;
      canvas!.style.width = window.innerWidth + "px";
      canvas!.style.height = window.innerHeight + "px";
      buildBars();
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
      frame = requestAnimationFrame(draw);
      if (smoothRef.current < 0) smoothRef.current = progressRef.current;
      smoothRef.current += (progressRef.current - smoothRef.current) * 0.1;
      const p = smoothRef.current;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      // Draw the text underneath
      const fontSize = Math.min(w * 0.07, 90);
      ctx.font = `bold ${fontSize}px 'PP Mondwest', monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#000";
      ctx.fillText("DEMAND CURVE", w / 2, h / 2);

      // Classified watermark
      if (p < 0.8) {
        ctx.globalAlpha = (1 - p) * 0.08;
        ctx.font = "bold 14px 'IBM Plex Mono', monospace";
        ctx.fillStyle = "#000";
        for (let y = 60; y < h; y += 80) {
          for (let x = 40; x < w; x += 240) {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(-0.15);
            ctx.fillText("CLASSIFIED", 0, 0);
            ctx.restore();
          }
        }
        ctx.globalAlpha = 1;
      }

      // Draw redaction bars — slide off as progress increases
      for (const bar of barsRef.current) {
        const revealP = clamp((p - bar.removeAt) / 0.15);
        if (revealP >= 1) continue; // fully removed

        const slideOffset = easeInOut(revealP) * w * 0.6 * bar.slideDir;
        const alpha = 1 - revealP;

        ctx.fillStyle = `rgba(0,0,0,${alpha})`;
        ctx.fillRect(bar.x + slideOffset, bar.y, bar.w, bar.h);
      }

      // "TOP SECRET" stamp that fades
      if (p < 0.3) {
        ctx.globalAlpha = (1 - p / 0.3) * 0.15;
        ctx.save();
        ctx.translate(w / 2, h / 2);
        ctx.rotate(-0.2);
        ctx.font = "bold 60px 'IBM Plex Mono', monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.strokeStyle = "rgba(180, 40, 40, 1)";
        ctx.lineWidth = 3;
        ctx.strokeText("TOP SECRET", 0, 0);
        ctx.restore();
        ctx.globalAlpha = 1;
      }

      ctx.restore();
    }

    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative" style={{ height: 5000 }}>
      <div className="sticky top-0 h-screen v2-bg overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PAGE
   ───────────────────────────────────────────── */
const variations = [
  { num: 1, title: "Slot Machine / Airport Board Flip", Component: SlotMachine },
  { num: 2, title: "Constellation / Connect the Dots", Component: Constellation },
  { num: 3, title: "Magnetic Cursor Repulsion", Component: MagneticText },
  { num: 4, title: "Liquid / Mercury Rise", Component: LiquidRise },
  { num: 5, title: "Redaction / Classified Reveal", Component: RedactionReveal },
];

export default function AnimationExplorePage() {
  return (
    <div className="v2-world v2-bg text-[#1a1a1a]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace" }}>
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 v2-bg border-b border-black/10">
        <div className="flex items-center justify-between px-6 py-3">
          <a href="/v2" className="font-mono-ui text-xs text-neutral-400 hover:text-black transition-colors">
            ← Back to V2
          </a>
          <span className="font-mono-ui text-[10px] uppercase tracking-widest text-neutral-400">
            Scroll Animation Explorations
          </span>
          <span className="font-mono-ui text-[10px] text-neutral-300">5 variations</span>
        </div>
      </div>

      <div className="pt-16">
        {variations.map((v, i) => (
          <div key={v.num}>
            {/* Variation label — sticky so you know which one you're in */}
            <div className="sticky top-12 z-40 px-6 py-3">
              <VariationLabel num={v.num} title={v.title} />
            </div>
            <v.Component />
            {/* Spacer between variations */}
            {i < variations.length - 1 && (
              <div className="h-32 flex items-center justify-center">
                <div className="w-12 h-px bg-black/10" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
