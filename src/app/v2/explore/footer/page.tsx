"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { ArrowRight } from "lucide-react";

/* ─── Shared footer ─── */
function PreFooter() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 min-h-[300px] border-t border-black/10">
      <div className="p-8 md:p-12 border-r border-black/10 flex flex-col justify-between">
        <div>
          <div className="section-tag mb-6">Start Building</div>
          <h3 className="font-heading text-3xl font-light leading-snug max-w-md">
            Whether you want us to build your growth system or you want to build it yourself — we&apos;ve got you covered.
          </h3>
        </div>
        <div className="mt-12 flex flex-col sm:flex-row gap-3 items-start">
          <a href="/v2/services" className="glow-btn relative px-8 py-3 rounded-md text-sm font-medium overflow-hidden inline-flex items-center justify-center">
            <span className="relative z-10">Talk to the Growth Studio</span>
          </a>
          <a href="/v2/growth-program" className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 hover:text-black transition-colors rainbow-hover py-3">
            Explore the Growth Program <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
      <div className="grid grid-rows-2 divide-y divide-black/10">
        <div className="p-8 md:p-12">
          <div className="section-tag mb-6">Social</div>
          <div className="flex gap-4 text-xs font-mono-ui uppercase">
            {["LinkedIn", "Twitter/X", "Newsletter"].map((s) => (
              <a key={s} href="#" className="border border-black/10 px-2 py-1 hover:bg-black hover:text-white transition-colors">{s}</a>
            ))}
          </div>
        </div>
        <div className="p-8 md:p-12">
          <div className="section-tag mb-6">Resources</div>
          <div className="flex gap-4 text-xs font-mono-ui uppercase">
            {["Growth Program", "Newsletter Archive"].map((r) => (
              <a key={r} href="#" className="border border-black/10 px-2 py-1 hover:bg-black hover:text-white transition-colors">{r}</a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SmallFooter() {
  return (
    <footer className="border-t border-black/10 py-6 px-8 flex justify-between items-center font-mono-ui text-xs text-neutral-500 uppercase">
      <div className="flex items-center gap-4">
        <div className="w-4 h-4 rounded-full border border-black/20 flex items-center justify-center">
          <span className="text-[8px] font-serif font-bold">D</span>
        </div>
        <span>© 2026 Demand Curve</span>
      </div>
      <div className="flex gap-6">
        <a href="#" className="rainbow-hover hover:text-black">Privacy</a>
        <a href="#" className="rainbow-hover hover:text-black">Terms</a>
      </div>
    </footer>
  );
}

function VariationLabel({ num, title }: { num: number; title: string }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="font-mono-ui text-[10px] bg-black text-white px-2 py-0.5">V{num}</span>
      <span className="font-mono-ui text-xs text-neutral-500 uppercase tracking-widest">{title}</span>
    </div>
  );
}

/* ─── Scroll-locked container ───
   This wraps any scroll-driven animation. It creates a tall scrollable
   area with a sticky viewport. The child receives `progress` (0→1)
   based on how far through the section you've scrolled. You stay
   "locked" in the animation until progress reaches 1.
*/
function ScrollLock({
  height = 2500,
  children,
}: {
  height?: number;
  children: (progress: number) => React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    function onScroll() {
      const rect = el!.getBoundingClientRect();
      const viewH = window.innerHeight;
      // progress: 0 when top of container hits bottom of viewport
      // progress: 1 when bottom of container hits bottom of viewport
      const scrollableDistance = rect.height - viewH;
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / scrollableDistance));
      setProgress(p);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative" style={{ height }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {children(progress)}
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   SCROLL CASCADE VARIATIONS (V1–V7)
   Based on stripe.dev — text appears in different styles as you scroll
   ═══════════════════════════════════════════════════════════════ */

/* V1: Classic Cascade — growing sizes, outline + fill, centered */
function V1BigType() {
  const layers = [
    { style: "outline-thin", size: 3.5 },
    { style: "filled-light", size: 4.5 },
    { style: "outline", size: 5.5 },
    { style: "filled-light", size: 6.5 },
    { style: "outline", size: 7.5 },
    { style: "filled-mid", size: 8.5 },
    { style: "outline-thick", size: 9.5 },
    { style: "filled-mid", size: 10.5 },
    { style: "outline-thick", size: 11.5 },
    { style: "filled", size: 13 },
    { style: "outline-thick", size: 14.5 },
    { style: "filled", size: 16 },
  ];

  function getStyle(s: string): React.CSSProperties {
    switch (s) {
      case "outline-thin": return { WebkitTextStroke: "0.5px rgba(0,0,0,0.15)", WebkitTextFillColor: "transparent" };
      case "outline": return { WebkitTextStroke: "1px rgba(0,0,0,0.2)", WebkitTextFillColor: "transparent" };
      case "outline-thick": return { WebkitTextStroke: "2px rgba(0,0,0,0.3)", WebkitTextFillColor: "transparent" };
      case "filled-light": return { color: "rgba(0,0,0,0.08)" };
      case "filled-mid": return { color: "rgba(0,0,0,0.2)" };
      case "filled": return { color: "#000" };
      default: return {};
    }
  }

  return (
    <ScrollLock height={3000}>
      {(progress) => (
        <div className="h-full flex items-center justify-center relative">
          {layers.map((layer, i) => {
            const threshold = i / layers.length;
            const active = Math.max(0, Math.min(1, (progress - threshold * 0.7) * 3.5));
            const yOffset = (1 - active) * 60;
            return (
              <div
                key={i}
                className="absolute font-mondwest tracking-tighter text-center select-none whitespace-nowrap"
                style={{
                  fontSize: `${layer.size}vw`,
                  lineHeight: 0.85,
                  opacity: active,
                  transform: `translateY(${yOffset}px) scale(${0.95 + active * 0.05})`,
                  ...getStyle(layer.style),
                }}
              >
                DEMAND CURVE
              </div>
            );
          })}
        </div>
      )}
    </ScrollLock>
  );
}

/* V2: Cascade with alternating left/right alignment */
function V2BigType() {
  const layers = Array.from({ length: 15 }, (_, i) => ({
    size: 3 + i * 0.9,
    align: i % 3 === 0 ? "left" : i % 3 === 1 ? "center" : "right",
    isOutline: i % 2 === 0,
    opacity: 0.05 + (i / 14) * 0.95,
  }));

  return (
    <ScrollLock height={3500}>
      {(progress) => (
        <div className="h-full flex flex-col justify-center px-8 relative">
          {layers.map((layer, i) => {
            const threshold = i / layers.length;
            const active = Math.max(0, Math.min(1, (progress - threshold * 0.65) * 3));
            const xSlide = layer.align === "left" ? (1 - active) * -100 : layer.align === "right" ? (1 - active) * 100 : 0;
            return (
              <div
                key={i}
                className="font-mondwest tracking-tighter select-none whitespace-nowrap"
                style={{
                  fontSize: `${layer.size}vw`,
                  lineHeight: 0.9,
                  textAlign: layer.align as "left" | "center" | "right",
                  opacity: active * layer.opacity,
                  transform: `translateX(${xSlide}px)`,
                  ...(layer.isOutline
                    ? { WebkitTextStroke: `${0.5 + i * 0.1}px rgba(0,0,0,${0.1 + active * 0.3})`, WebkitTextFillColor: "transparent" }
                    : { color: `rgba(0,0,0,${active * layer.opacity})` }),
                }}
              >
                DEMAND CURVE
              </div>
            );
          })}
        </div>
      )}
    </ScrollLock>
  );
}

/* V3: Perspective Zoom — each line zooms from tiny to huge */
function V3BigType() {
  const count = 18;

  return (
    <ScrollLock height={4000}>
      {(progress) => (
        <div className="h-full flex items-center justify-center relative" style={{ perspective: "1200px" }}>
          {Array.from({ length: count }).map((_, i) => {
            const threshold = i / count;
            const active = Math.max(0, Math.min(1, (progress - threshold * 0.55) * 3));
            const z = (1 - active) * -800;
            const rotX = (1 - active) * 30;
            const size = 3 + i * 0.8;
            const isOutline = i % 3 !== 0;
            const alphaBase = 0.05 + (i / count) * 0.95;

            return (
              <div
                key={i}
                className="absolute font-mondwest tracking-tighter text-center select-none whitespace-nowrap"
                style={{
                  fontSize: `${size}vw`,
                  lineHeight: 0.85,
                  opacity: active * alphaBase,
                  transform: `translateZ(${z}px) rotateX(${rotX}deg)`,
                  ...(isOutline
                    ? { WebkitTextStroke: `${0.5 + (i / count) * 2}px rgba(0,0,0,${alphaBase})`, WebkitTextFillColor: "transparent" }
                    : { color: `rgba(0,0,0,${alphaBase})` }),
                }}
              >
                DEMAND CURVE
              </div>
            );
          })}
        </div>
      )}
    </ScrollLock>
  );
}

/* V4: Split Words — DEMAND and CURVE cascade separately from opposite sides */
function V4BigType() {
  const count = 12;

  return (
    <ScrollLock height={3500}>
      {(progress) => (
        <div className="h-full flex items-center justify-center relative overflow-hidden">
          {Array.from({ length: count }).map((_, i) => {
            const threshold = i / count;
            const active = Math.max(0, Math.min(1, (progress - threshold * 0.6) * 3));
            const size = 3 + i * 1.1;
            const isOutline = i % 2 === 0;
            const alpha = 0.05 + (i / count) * 0.95;
            const demandX = (1 - active) * -200;
            const curveX = (1 - active) * 200;

            return (
              <div key={i} className="absolute w-full text-center select-none" style={{ opacity: active * alpha }}>
                <span
                  className="font-mondwest tracking-tighter inline-block"
                  style={{
                    fontSize: `${size}vw`,
                    lineHeight: 0.85,
                    transform: `translateX(${demandX}px)`,
                    ...(isOutline
                      ? { WebkitTextStroke: `${0.5 + (i / count) * 2}px rgba(0,0,0,${alpha})`, WebkitTextFillColor: "transparent" }
                      : { color: `rgba(0,0,0,${alpha})` }),
                  }}
                >
                  DEMAND{" "}
                </span>
                <span
                  className="font-mondwest tracking-tighter inline-block"
                  style={{
                    fontSize: `${size}vw`,
                    lineHeight: 0.85,
                    transform: `translateX(${curveX}px)`,
                    ...(isOutline
                      ? { WebkitTextStroke: `${0.5 + (i / count) * 2}px rgba(0,0,0,${alpha})`, WebkitTextFillColor: "transparent" }
                      : { color: `rgba(0,0,0,${alpha})` }),
                  }}
                >
                  CURVE
                </span>
              </div>
            );
          })}
        </div>
      )}
    </ScrollLock>
  );
}

/* V5: Rotation Cascade — each layer rotates in from a different angle */
function V5BigType() {
  const count = 14;

  return (
    <ScrollLock height={3500}>
      {(progress) => (
        <div className="h-full flex items-center justify-center relative">
          {Array.from({ length: count }).map((_, i) => {
            const threshold = i / count;
            const active = Math.max(0, Math.min(1, (progress - threshold * 0.6) * 3));
            const size = 3.5 + i * 0.9;
            const isOutline = i % 2 === 0;
            const alpha = 0.04 + (i / count) * 0.96;
            const rotate = (1 - active) * (i % 2 === 0 ? 15 : -15);
            const scale = 0.7 + active * 0.3;

            return (
              <div
                key={i}
                className="absolute font-mondwest tracking-tighter text-center select-none whitespace-nowrap"
                style={{
                  fontSize: `${size}vw`,
                  lineHeight: 0.85,
                  opacity: active * alpha,
                  transform: `rotate(${rotate}deg) scale(${scale})`,
                  ...(isOutline
                    ? { WebkitTextStroke: `${0.5 + (i / count) * 2}px rgba(0,0,0,${alpha})`, WebkitTextFillColor: "transparent" }
                    : { color: `rgba(0,0,0,${alpha})` }),
                }}
              >
                DEMAND CURVE
              </div>
            );
          })}
        </div>
      )}
    </ScrollLock>
  );
}

/* V6: Stacked Vertical — lines stack from top to bottom, each appearing on scroll */
function V6BigType() {
  const count = 20;

  return (
    <ScrollLock height={4000}>
      {(progress) => (
        <div className="h-full flex flex-col justify-center items-center gap-0 relative px-4">
          {Array.from({ length: count }).map((_, i) => {
            const threshold = i / count;
            const active = Math.max(0, Math.min(1, (progress - threshold * 0.5) * 4));
            const size = 2.5 + i * 0.5;
            const isOutline = i % 3 !== 2;
            const alpha = 0.03 + (i / count) * 0.97;

            return (
              <div
                key={i}
                className="font-mondwest tracking-tighter text-center select-none whitespace-nowrap"
                style={{
                  fontSize: `${size}vw`,
                  lineHeight: 1,
                  opacity: active * alpha,
                  transform: `translateY(${(1 - active) * 30}px)`,
                  ...(isOutline
                    ? { WebkitTextStroke: `${Math.max(0.3, (i / count) * 1.5)}px rgba(0,0,0,${alpha})`, WebkitTextFillColor: "transparent" }
                    : { color: `rgba(0,0,0,${alpha})` }),
                }}
              >
                DEMAND CURVE
              </div>
            );
          })}
        </div>
      )}
    </ScrollLock>
  );
}

/* V7: Color Gradient Cascade — each layer has a different hue from rainbow */
function V7BigType() {
  const count = 14;

  return (
    <ScrollLock height={3500}>
      {(progress) => (
        <div className="h-full flex items-center justify-center relative">
          {Array.from({ length: count }).map((_, i) => {
            const threshold = i / count;
            const active = Math.max(0, Math.min(1, (progress - threshold * 0.6) * 3));
            const size = 3 + i * 1;
            const hue = (i / count) * 360;
            const alpha = 0.1 + (i / count) * 0.9;
            const isLast = i === count - 1;

            return (
              <div
                key={i}
                className="absolute font-mondwest tracking-tighter text-center select-none whitespace-nowrap"
                style={{
                  fontSize: `${size}vw`,
                  lineHeight: 0.85,
                  opacity: active * alpha,
                  transform: `translateY(${(1 - active) * 50}px)`,
                  ...(isLast
                    ? { color: "#000" }
                    : { WebkitTextStroke: `${0.5 + (i / count) * 2}px hsla(${hue}, 70%, 50%, ${alpha})`, WebkitTextFillColor: "transparent" }),
                }}
              >
                DEMAND CURVE
              </div>
            );
          })}
        </div>
      )}
    </ScrollLock>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SAND / DISSOLVE / PHYSICS VARIATIONS (V8–V14)
   ═══════════════════════════════════════════════════════════════ */

/* Helper: get text pixel positions */
function getTextPixels(
  w: number, h: number, gap: number,
  lines: { text: string; y: number }[],
  fontSize: number,
): { x: number; y: number }[] {
  const offscreen = document.createElement("canvas");
  offscreen.width = w;
  offscreen.height = h;
  const ctx = offscreen.getContext("2d")!;
  ctx.fillStyle = "#000";
  ctx.font = `bold ${fontSize}px 'PP Mondwest', monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  for (const line of lines) ctx.fillText(line.text, w / 2, line.y);
  const imgData = ctx.getImageData(0, 0, w, h);
  const points: { x: number; y: number }[] = [];
  for (let y = 0; y < h; y += gap) {
    for (let x = 0; x < w; x += gap) {
      const i = (y * w + x) * 4;
      if (imgData.data[i + 3] > 128) points.push({ x, y });
    }
  }
  return points;
}

/* V8: Classic Sand Fall — text crumbles into grains */
function V8BigType() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setTriggered(true); }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!triggered) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const w = (canvas.width = canvas.parentElement!.clientWidth);
    const h = (canvas.height = 500);
    const fontSize = Math.min(w * 0.13, 180);

    const points = getTextPixels(w, h, 2, [
      { text: "DEMAND", y: h * 0.3 },
      { text: "CURVE", y: h * 0.55 },
    ], fontSize);

    const grains = points.map((p) => ({
      x: p.x, y: p.y, vy: 0, settled: false, delay: Math.random(),
    }));
    grains.sort((a, b) => a.delay - b.delay);

    const floorMap = new Float32Array(w).fill(h);
    let startIdx = 0;
    let frame = 0;
    let animFrame: number;

    function animate() {
      frame++;
      startIdx = Math.min(grains.length, startIdx + Math.floor(grains.length / 80));
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#000";

      for (let i = 0; i < grains.length; i++) {
        const g = grains[i];
        if (i >= startIdx) {
          ctx.fillRect(g.x, g.y, 1.5, 1.5);
          continue;
        }
        if (!g.settled) {
          g.vy += 0.35 + Math.random() * 0.1;
          g.y += g.vy;
          g.x += (Math.random() - 0.5) * 0.6;
          const col = Math.floor(Math.max(0, Math.min(w - 1, g.x)));
          if (g.y >= floorMap[col] - 1) {
            g.y = floorMap[col] - 1;
            g.settled = true;
            floorMap[col]--;
          }
        }
        ctx.fillRect(g.x, g.y, 1.5, 1.5);
      }

      if (frame < 500) animFrame = requestAnimationFrame(animate);
    }
    animFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame);
  }, [triggered]);

  return (
    <div ref={containerRef} className="w-full py-4 px-4" style={{ minHeight: 500 }}>
      <canvas ref={canvasRef} className="w-full" />
    </div>
  );
}

/* V9: Sand with Wind — grains blow sideways as they fall */
function V9BigType() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setTriggered(true); }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!triggered) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const w = (canvas.width = canvas.parentElement!.clientWidth);
    const h = (canvas.height = 500);
    const fontSize = Math.min(w * 0.13, 180);

    const points = getTextPixels(w, h, 2, [
      { text: "DEMAND", y: h * 0.3 },
      { text: "CURVE", y: h * 0.55 },
    ], fontSize);

    const grains = points.map((p) => ({
      x: p.x, y: p.y, vx: 0, vy: 0, settled: false, delay: Math.random(),
    }));
    grains.sort((a, b) => a.delay - b.delay);

    let startIdx = 0;
    let frame = 0;
    let animFrame: number;
    let windAngle = 0;

    function animate() {
      frame++;
      windAngle += 0.02;
      const wind = Math.sin(windAngle) * 2;
      startIdx = Math.min(grains.length, startIdx + Math.floor(grains.length / 100));
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#000";

      for (let i = 0; i < grains.length; i++) {
        const g = grains[i];
        if (i >= startIdx) {
          ctx.fillRect(g.x, g.y, 1.5, 1.5);
          continue;
        }
        if (!g.settled) {
          g.vy += 0.25;
          g.vx += wind * 0.02;
          g.vx *= 0.98;
          g.x += g.vx;
          g.y += g.vy;
          if (g.y >= h - 2) {
            g.y = h - 2;
            g.settled = true;
          }
          if (g.x < 0) g.x = 0;
          if (g.x > w) g.x = w;
        }
        ctx.fillRect(g.x, g.y, 1.5, 1.5);
      }

      if (frame < 600) animFrame = requestAnimationFrame(animate);
    }
    animFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame);
  }, [triggered]);

  return (
    <div ref={containerRef} className="w-full py-4 px-4" style={{ minHeight: 500 }}>
      <canvas ref={canvasRef} className="w-full" />
    </div>
  );
}

/* V10: Scroll-Controlled Sand — YOU control the dissolve by scrolling */
function V10BigType() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const grainsRef = useRef<{ x: number; y: number; ox: number; oy: number; vx: number; vy: number; idx: number }[]>([]);
  const initRef = useRef(false);
  const wRef = useRef(0);
  const hRef = useRef(0);
  const floorMapRef = useRef<Float32Array>(new Float32Array(0));

  const draw = useCallback((progress: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const w = wRef.current;
    const h = hRef.current;

    if (!initRef.current) {
      wRef.current = canvas.parentElement!.clientWidth;
      hRef.current = 500;
      const ww = wRef.current;
      const hh = hRef.current;
      canvas.width = ww;
      canvas.height = hh;
      const fontSize = Math.min(ww * 0.13, 180);
      const pts = getTextPixels(ww, hh, 2, [
        { text: "DEMAND", y: hh * 0.3 },
        { text: "CURVE", y: hh * 0.55 },
      ], fontSize);
      grainsRef.current = pts.map((p, idx) => ({
        x: p.x, y: p.y, ox: p.x, oy: p.y, vx: 0, vy: 0, idx,
      }));
      // Sort by Y so top falls first
      grainsRef.current.sort((a, b) => a.oy - b.oy);
      floorMapRef.current = new Float32Array(ww).fill(hh);
      initRef.current = true;
      return;
    }

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#000";
    const grains = grainsRef.current;
    const releaseIdx = Math.floor(progress * grains.length);
    const floorMap = floorMapRef.current;

    for (let i = 0; i < grains.length; i++) {
      const g = grains[i];
      if (i >= releaseIdx) {
        // Still in place
        ctx.fillRect(g.ox, g.oy, 1.5, 1.5);
      } else {
        // Falling
        g.vy += 0.4;
        g.x += g.vx + (Math.random() - 0.5) * 0.5;
        g.y += g.vy;
        const col = Math.floor(Math.max(0, Math.min(w - 1, g.x)));
        if (g.y >= floorMap[col] - 1) {
          g.y = floorMap[col] - 1;
          g.vy = 0;
          floorMap[col]--;
        }
        ctx.fillRect(g.x, g.y, 1.5, 1.5);
      }
    }
  }, []);

  return (
    <ScrollLock height={3000}>
      {(progress) => {
        // requestAnimationFrame-free: draw directly from scroll
        if (typeof window !== "undefined") {
          requestAnimationFrame(() => draw(progress));
        }
        return (
          <div className="h-full flex items-center justify-center px-4">
            <canvas ref={canvasRef} className="w-full max-w-6xl" style={{ height: 500 }} />
          </div>
        );
      }}
    </ScrollLock>
  );
}

/* V11: Disintegration — pixels scatter outward in random directions, like Thanos snap */
function V11BigType() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setTriggered(true); }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!triggered) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const w = (canvas.width = canvas.parentElement!.clientWidth);
    const h = (canvas.height = 500);
    const fontSize = Math.min(w * 0.13, 180);

    const points = getTextPixels(w, h, 2, [
      { text: "DEMAND", y: h * 0.35 },
      { text: "CURVE", y: h * 0.65 },
    ], fontSize);

    // Wave moves from left to right
    const maxX = Math.max(...points.map(p => p.x));
    const minX = Math.min(...points.map(p => p.x));
    const particles = points.map((p) => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1 + Math.random() * 4;
      return {
        x: p.x, y: p.y, ox: p.x, oy: p.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1,
        released: false,
        alpha: 1,
        threshold: (p.x - minX) / (maxX - minX), // dissolve left to right
      };
    });

    let frame = 0;
    let waveProgress = 0;
    let animFrame: number;

    function animate() {
      frame++;
      waveProgress = Math.min(1.2, frame / 150);
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        if (!p.released && waveProgress > p.threshold) {
          p.released = true;
        }

        if (p.released) {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.02;
          p.alpha = Math.max(0, p.alpha - 0.008);
          ctx.fillStyle = `rgba(0,0,0,${p.alpha})`;
        } else {
          ctx.fillStyle = "#000";
        }
        ctx.fillRect(p.x, p.y, 1.5, 1.5);
      }

      if (frame < 400) animFrame = requestAnimationFrame(animate);
    }
    animFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame);
  }, [triggered]);

  return (
    <div ref={containerRef} className="w-full py-4 px-4" style={{ minHeight: 500 }}>
      <canvas ref={canvasRef} className="w-full" />
    </div>
  );
}

/* V12: Reverse Sand — grains fly UP from a pile and assemble into text */
function V12BigType() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setTriggered(true); }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!triggered) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const w = (canvas.width = canvas.parentElement!.clientWidth);
    const h = (canvas.height = 500);
    const fontSize = Math.min(w * 0.13, 180);

    const targets = getTextPixels(w, h, 2, [
      { text: "DEMAND", y: h * 0.3 },
      { text: "CURVE", y: h * 0.6 },
    ], fontSize);

    // Start from bottom pile
    const particles = targets.map((t) => ({
      x: w * 0.2 + Math.random() * w * 0.6,
      y: h - 5 - Math.random() * 20,
      ox: t.x, oy: t.y,
      vx: 0, vy: 0,
      arrived: false,
    }));

    let frame = 0;
    let animFrame: number;

    function animate() {
      frame++;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#000";
      let allArrived = true;

      for (const p of particles) {
        if (!p.arrived) {
          const dx = p.ox - p.x;
          const dy = p.oy - p.y;
          p.vx += dx * 0.03;
          p.vy += dy * 0.03;
          p.vx *= 0.92;
          p.vy *= 0.92;
          p.x += p.vx;
          p.y += p.vy;
          if (Math.abs(dx) < 1 && Math.abs(dy) < 1 && Math.abs(p.vx) < 0.5 && Math.abs(p.vy) < 0.5) {
            p.x = p.ox;
            p.y = p.oy;
            p.arrived = true;
          } else {
            allArrived = false;
          }
        }
        ctx.fillRect(p.x, p.y, 1.5, 1.5);
      }

      if (!allArrived && frame < 400) animFrame = requestAnimationFrame(animate);
    }
    animFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame);
  }, [triggered]);

  return (
    <div ref={containerRef} className="w-full py-4 px-4" style={{ minHeight: 500 }}>
      <canvas ref={canvasRef} className="w-full" />
    </div>
  );
}

/* V13: Sand Hourglass — text at top dissolves, sand falls, forms new text at bottom */
function V13BigType() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setTriggered(true); }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!triggered) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const w = (canvas.width = canvas.parentElement!.clientWidth);
    const h = (canvas.height = 600);
    const fontSize = Math.min(w * 0.1, 120);

    // "DEMAND" at top
    const topPts = getTextPixels(w, h, 2, [{ text: "DEMAND", y: 100 }], fontSize);
    // "CURVE" at bottom
    const botPts = getTextPixels(w, h, 2, [{ text: "CURVE", y: 500 }], fontSize);

    const topGrains = topPts.map((p) => ({
      x: p.x, y: p.y, vy: 0, released: false, settled: false, delay: Math.random(),
    }));
    topGrains.sort((a, b) => a.delay - b.delay);

    // Draw target bottom text faintly
    const botCtx = document.createElement("canvas").getContext("2d")!;

    const floorMap = new Float32Array(w).fill(h - 20);
    // Pre-fill floor based on bottom text shape
    for (const p of botPts) {
      const col = Math.floor(p.x);
      if (col >= 0 && col < w && p.y < floorMap[col]) {
        // Don't adjust — let sand pile naturally
      }
    }

    let startIdx = 0;
    let frame = 0;
    let animFrame: number;

    function animate() {
      frame++;
      startIdx = Math.min(topGrains.length, startIdx + Math.floor(topGrains.length / 120));
      ctx.clearRect(0, 0, w, h);

      // Draw hourglass shape faintly
      ctx.strokeStyle = "rgba(0,0,0,0.08)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(w * 0.15, 0);
      ctx.lineTo(w * 0.45, h * 0.5);
      ctx.lineTo(w * 0.15, h);
      ctx.moveTo(w * 0.85, 0);
      ctx.lineTo(w * 0.55, h * 0.5);
      ctx.lineTo(w * 0.85, h);
      ctx.stroke();

      ctx.fillStyle = "#000";
      for (let i = 0; i < topGrains.length; i++) {
        const g = topGrains[i];
        if (i >= startIdx) {
          ctx.fillRect(g.x, g.y, 1.5, 1.5);
          continue;
        }
        if (!g.settled) {
          g.vy += 0.3;
          g.y += g.vy;
          // Funnel toward center
          const centerX = w / 2;
          g.x += (centerX - g.x) * 0.01 + (Math.random() - 0.5) * 0.5;

          const col = Math.floor(Math.max(0, Math.min(w - 1, g.x)));
          if (g.y >= floorMap[col] - 1) {
            g.y = floorMap[col] - 1;
            g.settled = true;
            floorMap[col]--;
          }
        }
        ctx.fillRect(g.x, g.y, 1.5, 1.5);
      }

      // Draw faint "CURVE" guide at bottom
      ctx.fillStyle = "rgba(0,0,0,0.04)";
      ctx.font = `bold ${fontSize}px 'PP Mondwest', monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("CURVE", w / 2, 500);

      if (frame < 600) animFrame = requestAnimationFrame(animate);
    }
    animFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame);
  }, [triggered]);

  return (
    <div ref={containerRef} className="w-full py-4 px-4" style={{ minHeight: 600 }}>
      <canvas ref={canvasRef} className="w-full" />
    </div>
  );
}

/* V14: Explosion then Reassemble — particles explode outward with trails, then pull back */
function V14BigType() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setTriggered(true); }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!triggered) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const w = (canvas.width = canvas.parentElement!.clientWidth);
    const h = (canvas.height = 500);
    const fontSize = Math.min(w * 0.12, 160);

    const pts = getTextPixels(w, h, 3, [
      { text: "DEMAND", y: h * 0.35 },
      { text: "CURVE", y: h * 0.67 },
    ], fontSize);

    const cx = w / 2, cy = h / 2;
    const particles = pts.map((p) => {
      const angle = Math.atan2(p.y - cy, p.x - cx) + (Math.random() - 0.5) * 0.5;
      const speed = 8 + Math.random() * 15;
      return {
        ox: p.x, oy: p.y,
        x: p.x, y: p.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        phase: "explode" as "explode" | "return",
      };
    });

    let frame = 0;
    let animFrame: number;
    const switchFrame = 80;

    function animate() {
      frame++;
      // Fade trail
      ctx.fillStyle = "rgba(249,249,248,0.12)";
      ctx.fillRect(0, 0, w, h);

      if (frame === switchFrame) {
        for (const p of particles) {
          p.phase = "return";
          p.vx = 0;
          p.vy = 0;
        }
      }

      ctx.fillStyle = "#000";
      let allHome = true;
      for (const p of particles) {
        if (p.phase === "explode") {
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.97;
          p.vy *= 0.97;
          p.vy += 0.08;
          allHome = false;
        } else {
          const dx = p.ox - p.x;
          const dy = p.oy - p.y;
          p.vx += dx * 0.06;
          p.vy += dy * 0.06;
          p.vx *= 0.88;
          p.vy *= 0.88;
          p.x += p.vx;
          p.y += p.vy;
          if (Math.abs(dx) > 1 || Math.abs(dy) > 1) allHome = false;
        }
        ctx.fillRect(p.x, p.y, 2, 2);
      }

      if (!allHome && frame < 400) animFrame = requestAnimationFrame(animate);
      else {
        // Clean final render
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = "#000";
        ctx.font = `bold ${fontSize}px 'PP Mondwest', monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("DEMAND", w / 2, h * 0.35);
        ctx.fillText("CURVE", w / 2, h * 0.67);
      }
    }
    animFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame);
  }, [triggered]);

  return (
    <div ref={containerRef} className="w-full py-4 px-4" style={{ minHeight: 500 }}>
      <canvas ref={canvasRef} className="w-full" />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TOWER / VORTEX VARIATIONS (V15–V20)
   ═══════════════════════════════════════════════════════════════ */

/* V15: 3D Tower — layers build up with 3D perspective, like looking down a tunnel */
function V15BigType() {
  const count = 30;
  return (
    <ScrollLock height={4000}>
      {(progress) => (
        <div className="h-full flex items-center justify-center relative" style={{ perspective: "1000px" }}>
          {Array.from({ length: count }).map((_, i) => {
            const threshold = i / count;
            const active = Math.max(0, Math.min(1, (progress - threshold * 0.5) * 3));
            const z = -1000 + active * 1000;
            const scale = 0.2 + (i / count) * 0.8;
            const isOutline = i % 3 !== 0;
            const alpha = Math.min(1, active * 2) * (0.05 + (i / count) * 0.95);
            const size = 3 + i * 0.5;

            return (
              <div
                key={i}
                className="absolute font-mondwest tracking-tighter text-center select-none whitespace-nowrap"
                style={{
                  fontSize: `${size}vw`,
                  lineHeight: 0.85,
                  opacity: alpha,
                  transform: `translateZ(${z}px) scale(${scale})`,
                  ...(isOutline
                    ? { WebkitTextStroke: `${0.3 + (i / count) * 2}px rgba(0,0,0,${alpha})`, WebkitTextFillColor: "transparent" }
                    : { color: `rgba(0,0,0,${alpha})` }),
                }}
              >
                DEMAND CURVE
              </div>
            );
          })}
        </div>
      )}
    </ScrollLock>
  );
}

/* V16: Spiral Tower — layers rotate as they come forward */
function V16BigType() {
  const count = 25;
  return (
    <ScrollLock height={4000}>
      {(progress) => (
        <div className="h-full flex items-center justify-center relative" style={{ perspective: "800px" }}>
          {Array.from({ length: count }).map((_, i) => {
            const threshold = i / count;
            const active = Math.max(0, Math.min(1, (progress - threshold * 0.5) * 3));
            const z = -600 + active * 600;
            const rotateZ = (1 - active) * (i * 8);
            const isOutline = i % 2 === 0;
            const alpha = Math.min(1, active * 2) * (0.03 + (i / count) * 0.97);
            const size = 2.5 + i * 0.55;

            return (
              <div
                key={i}
                className="absolute font-mondwest tracking-tighter text-center select-none whitespace-nowrap"
                style={{
                  fontSize: `${size}vw`,
                  lineHeight: 0.85,
                  opacity: alpha,
                  transform: `translateZ(${z}px) rotate(${rotateZ}deg)`,
                  ...(isOutline
                    ? { WebkitTextStroke: `${0.3 + (i / count) * 1.5}px rgba(0,0,0,${alpha})`, WebkitTextFillColor: "transparent" }
                    : { color: `rgba(0,0,0,${alpha})` }),
                }}
              >
                DEMAND CURVE
              </div>
            );
          })}
        </div>
      )}
    </ScrollLock>
  );
}

/* V17: Flip Tower — each layer flips into place like cards */
function V17BigType() {
  const count = 20;
  return (
    <ScrollLock height={3500}>
      {(progress) => (
        <div className="h-full flex items-center justify-center relative" style={{ perspective: "1200px" }}>
          {Array.from({ length: count }).map((_, i) => {
            const threshold = i / count;
            const active = Math.max(0, Math.min(1, (progress - threshold * 0.55) * 3));
            const rotateX = (1 - active) * 90;
            const y = (i - count / 2) * (active * 3);
            const isOutline = i % 3 !== 2;
            const alpha = 0.04 + (i / count) * 0.96;
            const size = 3 + i * 0.65;

            return (
              <div
                key={i}
                className="absolute font-mondwest tracking-tighter text-center select-none whitespace-nowrap"
                style={{
                  fontSize: `${size}vw`,
                  lineHeight: 0.85,
                  opacity: active * alpha,
                  transform: `rotateX(${rotateX}deg) translateY(${y}px)`,
                  transformOrigin: "center bottom",
                  ...(isOutline
                    ? { WebkitTextStroke: `${0.3 + (i / count) * 2}px rgba(0,0,0,${alpha})`, WebkitTextFillColor: "transparent" }
                    : { color: `rgba(0,0,0,${alpha})` }),
                }}
              >
                DEMAND CURVE
              </div>
            );
          })}
        </div>
      )}
    </ScrollLock>
  );
}

/* V18: Scale Explosion — layers zoom from tiny center to fill screen */
function V18BigType() {
  const count = 16;
  return (
    <ScrollLock height={3500}>
      {(progress) => (
        <div className="h-full flex items-center justify-center relative overflow-hidden">
          {Array.from({ length: count }).map((_, i) => {
            const threshold = i / count;
            const active = Math.max(0, Math.min(1, (progress - threshold * 0.55) * 3));
            const scale = active * (0.3 + (i / count) * 0.7);
            const isOutline = i % 2 === 0;
            const alpha = 0.04 + (i / count) * 0.96;
            const size = 15; // All same size, scale changes

            return (
              <div
                key={i}
                className="absolute font-mondwest tracking-tighter text-center select-none whitespace-nowrap"
                style={{
                  fontSize: `${size}vw`,
                  lineHeight: 0.85,
                  opacity: active * alpha,
                  transform: `scale(${scale})`,
                  ...(isOutline
                    ? { WebkitTextStroke: `${0.5 + (i / count) * 3}px rgba(0,0,0,${alpha})`, WebkitTextFillColor: "transparent" }
                    : { color: `rgba(0,0,0,${alpha})` }),
                }}
              >
                DEMAND CURVE
              </div>
            );
          })}
        </div>
      )}
    </ScrollLock>
  );
}

/* V19: Waves + Tower — layers wave up and down as they appear */
function V19BigType() {
  const count = 22;
  const [time, setTime] = useState(0);

  useEffect(() => {
    let frame: number;
    function tick() {
      setTime(Date.now() / 1000);
      frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <ScrollLock height={4000}>
      {(progress) => (
        <div className="h-full flex items-center justify-center relative" style={{ perspective: "900px" }}>
          {Array.from({ length: count }).map((_, i) => {
            const threshold = i / count;
            const active = Math.max(0, Math.min(1, (progress - threshold * 0.5) * 3));
            const wave = Math.sin(time * 2 + i * 0.4) * 8 * active;
            const z = -500 + active * 500;
            const isOutline = i % 2 === 0;
            const alpha = 0.03 + (i / count) * 0.97;
            const size = 2.5 + i * 0.6;

            return (
              <div
                key={i}
                className="absolute font-mondwest tracking-tighter text-center select-none whitespace-nowrap"
                style={{
                  fontSize: `${size}vw`,
                  lineHeight: 0.85,
                  opacity: active * alpha,
                  transform: `translateZ(${z}px) translateY(${wave}px)`,
                  ...(isOutline
                    ? { WebkitTextStroke: `${0.3 + (i / count) * 1.5}px rgba(0,0,0,${alpha})`, WebkitTextFillColor: "transparent" }
                    : { color: `rgba(0,0,0,${alpha})` }),
                }}
              >
                DEMAND CURVE
              </div>
            );
          })}
        </div>
      )}
    </ScrollLock>
  );
}

/* V20: The Mega — combines cascade + tower + dissolve at the end.
   First half: layers cascade in. Second half: the assembled text dissolves into sand. */
function V20BigType() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const count = 15;

  return (
    <ScrollLock height={5000}>
      {(progress) => {
        const cascadeProgress = Math.min(1, progress * 2); // first half
        const dissolveProgress = Math.max(0, (progress - 0.5) * 2); // second half

        return (
          <div className="h-full flex items-center justify-center relative" style={{ perspective: "1000px" }}>
            {/* Cascade layers — fade out as dissolve begins */}
            {dissolveProgress < 0.1 && Array.from({ length: count }).map((_, i) => {
              const threshold = i / count;
              const active = Math.max(0, Math.min(1, (cascadeProgress - threshold * 0.6) * 3));
              const z = -500 + active * 500;
              const isOutline = i % 3 !== 0;
              const alpha = (0.04 + (i / count) * 0.96) * (1 - dissolveProgress * 10);
              const size = 3 + i * 0.85;

              return (
                <div
                  key={i}
                  className="absolute font-mondwest tracking-tighter text-center select-none whitespace-nowrap"
                  style={{
                    fontSize: `${size}vw`,
                    lineHeight: 0.85,
                    opacity: active * alpha,
                    transform: `translateZ(${z}px)`,
                    ...(isOutline
                      ? { WebkitTextStroke: `${0.3 + (i / count) * 2}px rgba(0,0,0,${Math.max(0, alpha)})`, WebkitTextFillColor: "transparent" }
                      : { color: `rgba(0,0,0,${Math.max(0, alpha)})` }),
                  }}
                >
                  DEMAND CURVE
                </div>
              );
            })}

            {/* Final solid text — visible briefly before dissolve */}
            {cascadeProgress > 0.8 && dissolveProgress < 0.05 && (
              <div className="absolute font-mondwest text-[15vw] leading-[0.85] tracking-tighter text-center select-none whitespace-nowrap text-black">
                DEMAND CURVE
              </div>
            )}

            {/* Dissolve phase hint */}
            {dissolveProgress > 0 && dissolveProgress < 1 && (
              <div
                className="absolute font-mondwest text-[15vw] leading-[0.85] tracking-tighter text-center select-none whitespace-nowrap"
                style={{
                  opacity: 1 - dissolveProgress,
                  filter: `blur(${dissolveProgress * 8}px)`,
                  transform: `scale(${1 + dissolveProgress * 0.3})`,
                }}
              >
                DEMAND CURVE
              </div>
            )}
          </div>
        );
      }}
    </ScrollLock>
  );
}

/* ─── Main page ─── */
const variations: { num: number; title: string; Component: React.FC }[] = [
  // Cascade family
  { num: 1, title: "Classic Scroll Cascade", Component: V1BigType },
  { num: 2, title: "Left/Right Alternating Cascade", Component: V2BigType },
  { num: 3, title: "Perspective Zoom Cascade", Component: V3BigType },
  { num: 4, title: "Split Words (DEMAND ← / CURVE →)", Component: V4BigType },
  { num: 5, title: "Rotation Cascade", Component: V5BigType },
  { num: 6, title: "Vertical Stack Build", Component: V6BigType },
  { num: 7, title: "Rainbow Gradient Cascade", Component: V7BigType },
  // Sand/Dissolve family
  { num: 8, title: "Classic Sand Fall", Component: V8BigType },
  { num: 9, title: "Sand with Wind", Component: V9BigType },
  { num: 10, title: "Scroll-Controlled Sand (You Drive It)", Component: V10BigType },
  { num: 11, title: "Thanos Snap Disintegration", Component: V11BigType },
  { num: 12, title: "Reverse Sand (Assembles Upward)", Component: V12BigType },
  { num: 13, title: "Hourglass (DEMAND → sand → CURVE)", Component: V13BigType },
  { num: 14, title: "Explosion + Reassemble with Trails", Component: V14BigType },
  // Tower/Vortex family
  { num: 15, title: "3D Tunnel Tower", Component: V15BigType },
  { num: 16, title: "Spiral Tower", Component: V16BigType },
  { num: 17, title: "Card Flip Tower", Component: V17BigType },
  { num: 18, title: "Scale Explosion (Tiny → Full)", Component: V18BigType },
  { num: 19, title: "Wavy Tower (Undulating Layers)", Component: V19BigType },
  { num: 20, title: "The Mega (Cascade → Tower → Dissolve)", Component: V20BigType },
];

export default function ExploreFooter() {
  return (
    <div className="bg-[#f9f9f8] min-h-screen">
      {/* Header */}
      <div className="border-b border-black/10 px-8 py-12">
        <div className="section-tag mb-4" style={{ display: "inline-flex" }}>Explore</div>
        <h1 className="font-heading text-4xl md:text-5xl tracking-tight mb-3">Footer & Big Type — Round 2</h1>
        <p className="text-neutral-500 text-sm max-w-xl">
          20 variations across three families: Scroll Cascades (V1–7), Sand/Dissolve effects (V8–14),
          and 3D Tower/Vortex (V15–20). Scroll-driven animations lock the viewport so you experience the full animation.
        </p>
        <div className="mt-4 flex gap-6 font-mono-ui text-[10px] uppercase tracking-widest text-neutral-400">
          <span>V1–7: Cascade</span>
          <span>V8–14: Sand/Physics</span>
          <span>V15–20: Tower/3D</span>
        </div>
      </div>

      {/* Variations */}
      <div className="divide-y divide-black/10">
        {variations.map(({ num, title, Component }) => (
          <div key={num} className="py-12">
            <div className="px-6 md:px-8">
              <VariationLabel num={num} title={title} />
            </div>
            <div className="px-6 md:px-8">
              <div className="border border-black/10 bg-white">
                <PreFooter />
                <SmallFooter />
              </div>
            </div>
            {/* BigType lives OUTSIDE overflow containers so sticky works */}
            <Component />
          </div>
        ))}
      </div>
    </div>
  );
}
