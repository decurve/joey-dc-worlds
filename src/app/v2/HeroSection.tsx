"use client";

/**
 * HeroSection — the above-the-fold hero.
 *
 * Desktop (≥1024px): left side flows naturally with flexbox,
 * staircase is absolutely positioned to align with the grid overlay.
 * Mobile (<1024px): simple stacked layout.
 */

import { useRef, useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import { ArrowRight, Building2, Users, Crown, Clock, Rocket } from "lucide-react";
import gsap from "gsap";
import { useHeroVisual } from "./HeroVisualContext";
import GlowButton from "./GlowButton";
import { heroVisuals } from "./HeroVisuals";

const UnicornScene = dynamic(() => import("unicornstudio-react/next"), { ssr: false });
const TreeScene = dynamic(() => import("./TreeScene"), { ssr: false });

/* Grid constants — must match GridOverlay props */
const COLUMNS = 7;
const GAP = 16;
const SIDE_PADDING = 24;
const MAX_WIDTH = 9999; // fluid — container edges are the boundary
const DESKTOP_BREAKPOINT = 1024;

const marqueeItems = [
  { icon: Building2, text: "Companies Trained: 4,500+" },
  { icon: Users, text: "Growth Operators: 100,000+" },
  { icon: Crown, text: "Unicorns In Network: 18" },
  { icon: Clock, text: "Years of Methodology: 10" },
  { icon: Rocket, text: "YC-Backed" },
];

const serviceTags = [
  "Growth Architecture",
  "Paid Acquisition",
  "AI Search Engine",
  "Story System",
  "Growth Catalyst",
  "Revenue System",
];

const stats = [
  { value: "4,500+", label: "Startups Trained" },
  { value: "100K+", label: "Growth Operators" },
  { value: "10yrs", label: "of Methodology" },
];

/* ─── Unicorn Studio project IDs ─── */
const US_SDK_URL = "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.1.3/dist/unicornStudio.umd.js";
const US_PROJECT_ID_NEW = "vVefbomY3BsVb9Otn028";

/* ─── Live Clock ─── */
function LiveClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    function tick() {
      const now = new Date();
      const raw = now.getHours();
      const h12 = raw === 0 ? 12 : raw > 12 ? raw - 12 : raw;
      const ampm = raw < 12 ? "am" : "pm";
      const m = now.getMinutes().toString().padStart(2, "0");
      const s = now.getSeconds().toString().padStart(2, "0");
      setTime(`${h12}:${m}:${s} ${ampm}`);
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return <span>{time}</span>;
}

/* ─── Glitch Word Rotation ─── */
const GLITCH_WORDS = ["Systems", "Architecture", "Engines"];
const GLITCH_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*!?";

function GlitchWord() {
  const textRef = useRef<HTMLSpanElement>(null);
  const wordIndex = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let cancelled = false;

    function glitchTo(newWord: string) {
      if (cancelled || !textRef.current) return;
      const el = textRef.current;
      const oldWord = el.textContent || "";
      const maxLen = newWord.length;

      const scrambleDuration = 0.4;
      const steps = 8;
      for (let s = 0; s < steps; s++) {
        gsap.delayedCall(scrambleDuration * (s / steps), () => {
          if (cancelled || !textRef.current) return;
          let result = "";
          for (let i = 0; i < maxLen; i++) {
            if (Math.random() < s / steps) {
              result += GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
            } else {
              result += oldWord[i] || " ";
            }
          }
          el.textContent = result;
        });
      }

      const resolveStart = scrambleDuration;
      const resolveDuration = 0.4;
      for (let s = 0; s <= steps; s++) {
        gsap.delayedCall(resolveStart + resolveDuration * (s / steps), () => {
          if (cancelled || !textRef.current) return;
          let result = "";
          for (let i = 0; i < newWord.length; i++) {
            if (Math.random() < s / steps) {
              result += newWord[i];
            } else {
              result += GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
            }
          }
          el.textContent = result;
        });
      }

      gsap.delayedCall(resolveStart + resolveDuration + 0.05, () => {
        if (!cancelled && textRef.current) {
          el.textContent = newWord;
        }
      });
    }

    function scheduleNext() {
      if (cancelled) return;
      const delay = 4000 + Math.random() * 2000;
      timeoutRef.current = setTimeout(() => {
        if (cancelled) return;
        wordIndex.current = (wordIndex.current + 1) % GLITCH_WORDS.length;
        glitchTo(GLITCH_WORDS[wordIndex.current]);
        timeoutRef.current = setTimeout(() => scheduleNext(), 900);
      }, delay);
    }

    scheduleNext();

    return () => {
      cancelled = true;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      gsap.killTweensOf({});
    };
  }, []);

  return <span ref={textRef} style={{ display: "inline", overflow: "hidden", whiteSpace: "nowrap" }}>Systems</span>;
}

/* GlowButton imported from ./GlowButton */

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cellSize, setCellSize] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const { visualId } = useHeroVisual();

  const recalc = useCallback(() => {
    if (!containerRef.current) return;
    const rawW = containerRef.current.offsetWidth;
    setContainerWidth(rawW);
    // Cell size — from actual width (capped at maxWidth), so staircase scales on small screens
    const effectiveWidth = Math.min(rawW, MAX_WIDTH);
    const innerWidth = effectiveWidth - SIDE_PADDING * 2;
    const cs = (innerWidth - (COLUMNS - 1) * GAP) / COLUMNS;
    setCellSize(Math.max(cs, 40));
  }, []);

  useEffect(() => {
    recalc();
    const ro = new ResizeObserver(recalc);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [recalc]);

  const isDesktop = containerWidth >= DESKTOP_BREAKPOINT;

  // Grid math — only used for the staircase positioning
  const unit = cellSize + GAP;
  const colLeft = (col: number) => SIDE_PADDING + col * unit;
  const rowTop = (row: number) => row * unit;

  // Staircase: 5 rows tall, 4 cols wide (cols 3-6)
  const stairW = 4 * cellSize + 3 * GAP;
  const stairH = 5 * cellSize + 4 * GAP;
  const subUnitX = (col: number) => col * unit;
  const subUnitY = (row: number) => row * unit;

  const clipPoints = cellSize > 0 ? [
    `${subUnitX(2)}px 0px`,
    `${stairW}px 0px`,
    `${stairW}px ${stairH}px`,
    `0px ${stairH}px`,
    `0px ${subUnitY(2)}px`,
    `${subUnitX(1)}px ${subUnitY(2)}px`,
    `${subUnitX(1)}px ${subUnitY(1)}px`,
    `${subUnitX(2)}px ${subUnitY(1)}px`,
    `${subUnitX(2)}px 0px`,
  ] : [];

  const clipPath = clipPoints.length > 0 ? `polygon(${clipPoints.join(", ")})` : "none";

  // Width of the left content area — 3 columns wide (cols 0-2)
  const leftContentWidth = 3 * cellSize + 2 * GAP;

  /* ─── Mobile / Tablet layout ─── */
  if (!isDesktop) {
    return (
      <div ref={containerRef} className="min-h-screen flex flex-col border-b border-black/10">
        <div className="flex-1 flex flex-col justify-center px-6 py-24">
          <h1 className="font-heading text-4xl md:text-5xl leading-[0.92] tracking-tight mb-6">
            We Help Startups Build{" "}
            <span className="italic rainbow-text-hover cursor-default">
              Growth Systems
            </span>
          </h1>
          <p className="text-base md:text-lg font-light text-neutral-600 leading-relaxed mb-6 max-w-md">
            Growth isn&apos;t something you stumble into. It&apos;s something you engineer. We&apos;ve spent a decade proving it with 4,500+ startups.
          </p>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="font-mono-ui text-[10px] uppercase tracking-widest text-neutral-500 bg-neutral-100 border border-dashed border-neutral-300 rounded px-2.5 py-1">10 Years Proven</span>
            <span className="font-mono-ui text-[10px] uppercase tracking-widest text-neutral-500 bg-neutral-100 border border-dashed border-neutral-300 rounded px-2.5 py-1">YC-Backed</span>
          </div>
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <GlowButton href="/v2/services" className="px-6 py-3">
              Explore the Growth Studio <ArrowRight className="w-4 h-4" />
            </GlowButton>
            <a
              href="#growth-program"
              className="rainbow-hover text-sm font-medium flex items-center gap-2 hover:text-black transition-colors"
            >
              Or build it yourself <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <div className="flex flex-wrap gap-2 mb-10">
            {serviceTags.map((tag) => (
              <span key={tag} className="font-mono-ui text-[10px] uppercase tracking-widest text-neutral-500 bg-neutral-100 border border-dashed border-neutral-300 rounded px-2.5 py-1">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex gap-8">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="font-heading text-3xl tracking-tight">{stat.value}</div>
                <div className="font-mono-ui text-[10px] text-neutral-400 uppercase tracking-widest mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Mobile marquee */}
        <div className="border-t border-black/10 py-3 overflow-hidden font-mono-ui text-xs tracking-widest uppercase text-neutral-500 rainbow-hover cursor-default bg-[#f9f9f8] relative z-10">
          <div className="marquee-content whitespace-nowrap">
            {[0, 1].map((i) => (
              <span key={i} className="flex">
                {marqueeItems.map((item, j) => (
                  <span key={`${i}-${j}`} className="contents">
                    <span className="px-8 flex items-center gap-2.5">
                      <span className="marquee-square" style={{ animationDelay: `${j * 0.5}s` }} />
                      <item.icon className="w-3.5 h-3.5" /> {item.text}
                    </span>
                    |
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ─── Desktop layout ─── */
  return (
    <div ref={containerRef} className="relative flex flex-col border-b border-black/10" style={{ height: "calc(100vh + 40px)", maxHeight: 1120 }}>
      {/* Main hero content area — fills viewport minus marquee */}
      <div className={`relative flex-1 ${visualId.endsWith("-full") ? "" : "overflow-hidden"}`}>

        {/* ── Full particle overlay (same position as staircase, no clip) ── */}
        {cellSize > 0 && visualId.endsWith("-full") && (() => {
          const match = heroVisuals.find((v) => v.id === visualId);
          const FullVisual = match?.component;
          return FullVisual ? (
            <div
              className="absolute"
              style={{
                left: colLeft(3),
                top: rowTop(1),
                width: stairW,
                height: stairH,
              }}
            >
              <div style={{ position: "relative", width: stairW, height: stairH, overflow: "visible" }}>
                <FullVisual width={stairW} height={stairH} />
              </div>
            </div>
          ) : null;
        })()}

        {/* ── Staircase (absolutely positioned to align with grid) ── */}
        {cellSize > 0 && !visualId.endsWith("-full") && (
          <>
            <div
              className="absolute overflow-hidden"
              style={{
                left: colLeft(3),
                top: rowTop(1),
                width: stairW,
                height: stairH,
                clipPath,
                WebkitClipPath: clipPath,
                background: `hsl(var(--rainbow-hue, 0), 60%, 45%)`,
              }}
            >
              {/* Hero visual — Unicorn Studio, 3D scene, or canvas-based visual */}
              {visualId === "tree-3d" ? (
                <>
                  <TreeScene width={stairW} height={stairH} />
                  {/* CRT scanlines over 3D tree */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.12) 2px, rgba(0,0,0,0.12) 3px)",
                      opacity: 0.5,
                    }}
                  />
                </>
              ) : (visualId === "original" || visualId === "unicorn-2") ? (
                <>
                  {/* Unicorn Studio scene */}
                  <div style={visualId === "unicorn-2"
                    ? { position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }
                    : { position: "absolute", top: "-15%", left: "-15%", width: "145%", height: "150%" }
                  }>
                    <UnicornScene
                      projectId={visualId === "unicorn-2" ? "P8ECoi8pU2yZlvT96xi9" : US_PROJECT_ID_NEW}
                      sdkUrl={visualId === "unicorn-2" ? "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.1.3/dist/unicornStudio.umd.js" : US_SDK_URL}
                      width="100%"
                      height="100%"
                      scale={1}
                      dpi={1.5}
                      fps={60}
                      lazyLoad={false}
                    />
                  </div>
                  {/* Rainbow color overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `hsl(var(--rainbow-hue, 0), 60%, 45%)`,
                      mixBlendMode: "multiply",
                      opacity: 0.6,
                    }}
                  />
                  {/* Grayscale noise */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                      backgroundSize: "512px 512px",
                      opacity: 0.35,
                      mixBlendMode: "multiply",
                    }}
                  />
                  {/* CRT scanlines */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.12) 2px, rgba(0,0,0,0.12) 3px)",
                      opacity: 0.5,
                    }}
                  />
                </>
              ) : (
                (() => {
                  const match = heroVisuals.find((v) => v.id === visualId);
                  const VisualComponent = match?.component;
                  const isParticleScene = ["reactor", "gear-particles", "rocket-particles", "morph"].includes(visualId);
                  const isParticleSceneDark = isParticleScene; // dark versions need black bg
                  return VisualComponent ? (
                    <div style={{ position: "relative", width: stairW, height: stairH, background: isParticleSceneDark ? "#000" : undefined }}>
                      <VisualComponent width={stairW} height={stairH} />
                      {/* Vignette for particle scenes — lighter edges, darker center */}
                      {isParticleScene && (
                        <div
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            background: "radial-gradient(ellipse at center, transparent 30%, rgba(255,255,255,0.06) 100%)",
                          }}
                        />
                      )}
                      {/* Grayscale noise */}
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                          backgroundSize: "512px 512px",
                          opacity: isParticleScene ? 0.15 : 0.35,
                          mixBlendMode: isParticleScene ? "screen" : "multiply",
                        }}
                      />
                      {/* CRT scanlines */}
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          backgroundImage: isParticleScene
                            ? "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 3px)"
                            : "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.12) 2px, rgba(0,0,0,0.12) 3px)",
                          opacity: 0.5,
                        }}
                      />
                    </div>
                  ) : null;
                })()
              )}
            </div>

            {/* "Build real traction" label — bottom-right corner of staircase */}
            <div
              className="absolute flex items-end justify-end"
              style={{
                left: colLeft(3) + 3 * unit,
                top: rowTop(1) + 4 * unit,
                width: cellSize,
                height: cellSize,
                padding: 8,
              }}
            >
              <div className="font-mono-ui text-[10px] text-neutral-400 text-right uppercase tracking-widest leading-relaxed">
                Build real traction with<br />systems, not guesswork.
              </div>
            </div>
          </>
        )}

        {/* ── Left content — normal flexbox flow ── */}
        <div
          className="relative z-[2] flex flex-col h-full pointer-events-none"
          style={{ paddingLeft: SIDE_PADDING + 8, paddingRight: SIDE_PADDING }}
        >
          {/* Top bar — DC label + credential tags at col 1 + clock */}
          <div className="flex items-end pt-4 pb-2 pointer-events-auto" style={{ minHeight: cellSize }}>
            {/* DC label — sits in col 0 */}
            <div className="font-mono-ui text-[10px] text-neutral-400 uppercase tracking-widest leading-relaxed" style={{ width: cellSize }}>
              Demand Curve<br /><span className="text-neutral-300">& Growth Systems</span>
            </div>
            {/* Clock — pushed to the right */}
            <div className="ml-auto font-mono-ui text-base tracking-tight text-neutral-500 tabular-nums" style={{ paddingRight: 8 }}>
              <LiveClock />
            </div>
          </div>

          {/* Headline */}
          <div className="mt-10 pointer-events-auto">
            <h1
              className="font-heading leading-[0.92] tracking-tight"
              style={{ fontSize: `clamp(48px, 5.8vw, 80px)` }}
            >
              We Help Startups<br />Build{" "}
              <span className="italic rainbow-text-hover cursor-default">
                Growth <GlitchWord />
              </span>
            </h1>
          </div>

          {/* Subtext */}
          <div className="mt-10 pointer-events-auto" style={{ maxWidth: leftContentWidth || undefined }}>
            <p className="text-sm lg:text-base font-light text-neutral-600 leading-relaxed">
              Growth isn&apos;t something you stumble into. It&apos;s something you engineer. We&apos;ve spent a decade proving it with 4,500+ startups.
            </p>
          </div>

          {/* Spacer — splits space between subtext and CTA */}
          <div style={{ flex: "1 1 0" }} />

          {/* CTA */}
          <div className="pointer-events-auto" style={{ maxWidth: leftContentWidth || undefined }}>
            <div className="flex flex-wrap items-center gap-4">
              <GlowButton href="/v2/services" className="px-6 py-3">
                Explore the Growth Studio <ArrowRight className="w-4 h-4" />
              </GlowButton>
              <a
                href="#growth-program"
                className="rainbow-hover text-sm font-medium flex items-center gap-2 hover:text-black transition-colors"
              >
                Or build it yourself <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Service tags */}
          <div className="mt-5 pointer-events-auto" style={{ maxWidth: leftContentWidth || undefined }}>
            <div className="flex flex-wrap gap-2">
              {serviceTags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono-ui text-[10px] uppercase tracking-widest text-neutral-500 bg-neutral-100 border border-dashed border-neutral-300 rounded px-2.5 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Spacer — splits space between tags and stats */}
          <div style={{ flex: "1 1 0" }} />

          {/* Stats — bottom of the hero, each aligned to its column */}
          <div className="flex pb-4 pointer-events-auto">
            {stats.map((stat, i) => (
              <div key={stat.label} style={{ width: cellSize, marginRight: i < stats.length - 1 ? GAP : 0 }}>
                <div className="font-heading text-4xl xl:text-5xl tracking-tight" style={{ marginBottom: 2 }}>{stat.value}</div>
                <div className="font-mono-ui text-[10px] text-neutral-400 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Marquee — pinned to bottom of viewport */}
      <div className="border-t border-b border-black/10 py-3 overflow-hidden font-mono-ui text-xs tracking-widest uppercase text-neutral-500 rainbow-hover cursor-default bg-[#f9f9f8] relative z-10">
        <div className="marquee-content whitespace-nowrap">
          {[0, 1].map((i) => (
            <span key={i} className="flex">
              {marqueeItems.map((item, j) => (
                <span key={`${i}-${j}`} className="contents">
                  <span className="px-8 flex items-center gap-2.5">
                    <span className="marquee-square" style={{ animationDelay: `${j * 0.5}s` }} />
                    <item.icon className="w-3.5 h-3.5" /> {item.text}
                  </span>
                  |
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
