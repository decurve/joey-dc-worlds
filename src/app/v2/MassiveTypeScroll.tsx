"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";

/*
  Effects:
  - Smooth interpolation (Stripe-style chase)
  - Sine wave wobble + breathing on crawl lines
  - Color shift: lines shift from black → deep blue/purple as they go up
  - Particle dust trailing behind text
  - No glow, no hollow text

  Phases:
    0–0.48: Star Wars crawl
    0.48–0.58: Flatten
    0.58–0.78: Door split (big DEMAND CURVE appears mid-split)
    0.78–1.0: Big DEMAND CURVE grows to final size
    At end: Breakout game — the big text becomes bricks
*/

const SCROLL_HEIGHT = 26000;
const MAX_PARTICLES = 200;

function clamp(t: number) { return Math.max(0, Math.min(1, t)); }
function lerp(a: number, b: number, t: number) { return a + (b - a) * clamp(t); }
function easeInOut(t: number) {
  const c = clamp(t);
  return c < 0.5 ? 4 * c * c * c : 1 - Math.pow(-2 * c + 2, 3) / 2;
}
function easeOut(t: number) { return 1 - Math.pow(1 - clamp(t), 3); }
function pp(g: number, s: number, e: number) { return clamp((g - s) / (e - s)); }

// Color shift: black at bottom → deep blue/purple at top
function depthColor(depth: number, alpha: number): string {
  const r = Math.round(lerp(0, 40, depth));
  const g = Math.round(lerp(0, 20, depth));
  const b = Math.round(lerp(0, 80, depth));
  return `rgba(${r},${g},${b},${alpha})`;
}

type Particle = {
  x: number; y: number; vx: number; vy: number;
  life: number; maxLife: number; size: number;
};

// ── Breakout game types & helpers ──

// 5x7 pixel font for letters
const FONT: Record<string, number[][]> = {
  D: [[1,1,1,0,0],[1,0,0,1,0],[1,0,0,1,0],[1,0,0,1,0],[1,0,0,1,0],[1,0,0,1,0],[1,1,1,0,0]],
  E: [[1,1,1,1,0],[1,0,0,0,0],[1,0,0,0,0],[1,1,1,0,0],[1,0,0,0,0],[1,0,0,0,0],[1,1,1,1,0]],
  M: [[1,0,0,0,1],[1,1,0,1,1],[1,0,1,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1]],
  A: [[0,1,1,0,0],[1,0,0,1,0],[1,0,0,1,0],[1,1,1,1,0],[1,0,0,1,0],[1,0,0,1,0],[1,0,0,1,0]],
  N: [[1,0,0,0,1],[1,1,0,0,1],[1,0,1,0,1],[1,0,0,1,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1]],
  C: [[0,1,1,1,0],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[0,1,1,1,0]],
  U: [[1,0,0,1,0],[1,0,0,1,0],[1,0,0,1,0],[1,0,0,1,0],[1,0,0,1,0],[1,0,0,1,0],[0,1,1,0,0]],
  R: [[1,1,1,0,0],[1,0,0,1,0],[1,0,0,1,0],[1,1,1,0,0],[1,0,1,0,0],[1,0,0,1,0],[1,0,0,1,0]],
  V: [[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[0,1,0,1,0],[0,1,0,1,0],[0,0,1,0,0],[0,0,1,0,0]],
  " ": [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
};

type Brick = { x: number; y: number; w: number; h: number; alive: boolean };

type GameState = {
  bricks: Brick[];
  ball: { x: number; y: number; vx: number; vy: number; r: number };
  paddle: { x: number; w: number; h: number };
  launched: boolean;
  won: boolean;
  lost: boolean;
  active: boolean;
  transitionIn: number; // 0→1 fade in
};

function buildBricks(w: number, h: number): Brick[] {
  const text = "DEMAND CURVE";
  const letters = text.split("");

  let totalCols = 0;
  for (const ch of letters) {
    const glyph = FONT[ch];
    if (glyph) totalCols += glyph[0].length + 1;
  }
  totalCols -= 1;

  const rows = 7;
  const gap = 2;
  const brickW = Math.min(18, (w * 0.85) / totalCols);
  const brickH = brickW * 0.9;

  const totalW = totalCols * (brickW + gap);
  const startX = (w - totalW) / 2;
  const startY = h * 0.3 - (rows * (brickH + gap)) / 2;

  const bricks: Brick[] = [];
  let colOffset = 0;

  for (const ch of letters) {
    const glyph = FONT[ch];
    if (!glyph) continue;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < glyph[0].length; col++) {
        if (glyph[row][col]) {
          bricks.push({
            x: startX + (colOffset + col) * (brickW + gap),
            y: startY + row * (brickH + gap),
            w: brickW,
            h: brickH,
            alive: true,
          });
        }
      }
    }
    colOffset += glyph[0].length + 1;
  }

  return bricks;
}

export default function MassiveTypeScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(0);
  const smoothProgress = useRef(-1);
  const frameRef = useRef(0);
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 });
  const [showBackToTop, setShowBackToTop] = useState(false);
  const lastBackToTop = useRef(false);
  const timeRef = useRef(0);
  const particlesRef = useRef<Particle[]>([]);
  const mouseXRef = useRef(0);
  const gameRef = useRef<GameState>({
    bricks: [],
    ball: { x: 0, y: 0, vx: 0, vy: 0, r: 6 },
    paddle: { x: 0, w: 0, h: 12 },
    launched: false,
    won: false,
    lost: false,
    active: false,
    transitionIn: 0,
  });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext("2d")!;

    // ── Particle system ──
    function spawnParticles(x: number, y: number, count: number, spread: number) {
      const particles = particlesRef.current;
      for (let j = 0; j < count; j++) {
        if (particles.length >= MAX_PARTICLES) {
          const oldest = particles.reduce((a, b) => a.life > b.life ? a : b);
          oldest.x = x + (Math.random() - 0.5) * spread;
          oldest.y = y + (Math.random() - 0.5) * 20;
          oldest.vx = (Math.random() - 0.5) * 1.5;
          oldest.vy = -Math.random() * 1.5 - 0.5;
          oldest.life = 0;
          oldest.maxLife = 40 + Math.random() * 60;
          oldest.size = 1 + Math.random() * 2;
        } else {
          particles.push({
            x: x + (Math.random() - 0.5) * spread,
            y: y + (Math.random() - 0.5) * 20,
            vx: (Math.random() - 0.5) * 1.5,
            vy: -Math.random() * 1.5 - 0.5,
            life: 0,
            maxLife: 40 + Math.random() * 60,
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
        if (lifeRatio >= 1) {
          particles.splice(i, 1);
          continue;
        }

        const fadeIn = Math.min(lifeRatio * 5, 1);
        const fadeOut = 1 - Math.pow(lifeRatio, 2);
        const alpha = fadeIn * fadeOut * 0.4;

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

    // ── Game mouse/touch tracking ──
    function onMouseMove(e: MouseEvent) {
      mouseXRef.current = e.clientX;
    }
    function onTouchMove(e: TouchEvent) {
      mouseXRef.current = e.touches[0].clientX;
    }
    function onClick() {
      const game = gameRef.current;
      if (!game.active) return;
      if (!game.launched) {
        // Launch the ball
        game.launched = true;
        const angle = -Math.PI / 2 + (Math.random() - 0.5) * 0.5;
        const speed = 5;
        game.ball.vx = Math.cos(angle) * speed;
        game.ball.vy = Math.sin(angle) * speed;
      } else if (game.won || game.lost) {
        // Restart
        const { w, h } = sizeRef.current;
        initGame(w, h);
      }
    }
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    canvas.addEventListener("click", onClick);

    function initGame(w: number, h: number) {
      const game = gameRef.current;
      const paddleW = Math.min(w * 0.075, 80);
      game.bricks = buildBricks(w, h);
      game.paddle = { x: w / 2 - paddleW / 2, w: paddleW, h: 12 };
      game.ball = { x: w / 2, y: h - 80 - 6, vx: 0, vy: 0, r: 6 };
      game.launched = false;
      game.won = false;
      game.lost = false;
      game.active = true;
      game.transitionIn = 0;
    }

    function updateGame(w: number, h: number) {
      const game = gameRef.current;
      if (!game.active) return;

      // Transition in
      if (game.transitionIn < 1) {
        game.transitionIn = Math.min(1, game.transitionIn + 0.02);
      }

      const { ball, paddle, bricks } = game;

      // Move paddle toward mouse
      paddle.x += (mouseXRef.current - paddle.w / 2 - paddle.x) * 0.12;
      paddle.x = Math.max(0, Math.min(w - paddle.w, paddle.x));

      // Ball follows paddle before launch
      if (!game.launched) {
        ball.x = paddle.x + paddle.w / 2;
        ball.y = h - 80 - ball.r;
      }

      if (game.launched && !game.won && !game.lost) {
        ball.x += ball.vx;
        ball.y += ball.vy;

        // Wall bounces
        if (ball.x - ball.r < 0) { ball.x = ball.r; ball.vx = Math.abs(ball.vx); }
        if (ball.x + ball.r > w) { ball.x = w - ball.r; ball.vx = -Math.abs(ball.vx); }
        if (ball.y - ball.r < 0) { ball.y = ball.r; ball.vy = Math.abs(ball.vy); }

        // Paddle bounce
        const paddleTop = h - 80 - paddle.h;
        if (
          ball.vy > 0 &&
          ball.y + ball.r >= paddleTop &&
          ball.y + ball.r <= paddleTop + paddle.h + 8 &&
          ball.x >= paddle.x - ball.r &&
          ball.x <= paddle.x + paddle.w + ball.r
        ) {
          ball.y = paddleTop - ball.r;
          const hitPos = (ball.x - paddle.x) / paddle.w;
          const angle = -Math.PI * 0.15 - hitPos * Math.PI * 0.7;
          const speed = Math.min(Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy) * 1.003, 8);
          ball.vx = Math.cos(angle) * speed;
          ball.vy = Math.sin(angle) * speed;
        }

        // Ball lost
        if (ball.y - ball.r > h) {
          game.lost = true;
        }

        // Brick collisions
        for (const brick of bricks) {
          if (!brick.alive) continue;
          if (
            ball.x + ball.r > brick.x &&
            ball.x - ball.r < brick.x + brick.w &&
            ball.y + ball.r > brick.y &&
            ball.y - ball.r < brick.y + brick.h
          ) {
            brick.alive = false;
            const overlapLeft = ball.x + ball.r - brick.x;
            const overlapRight = brick.x + brick.w - (ball.x - ball.r);
            const overlapTop = ball.y + ball.r - brick.y;
            const overlapBottom = brick.y + brick.h - (ball.y - ball.r);
            const minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);
            if (minOverlap === overlapTop || minOverlap === overlapBottom) {
              ball.vy = -ball.vy;
            } else {
              ball.vx = -ball.vx;
            }
            // Spawn particles on brick break
            spawnParticles(brick.x + brick.w / 2, brick.y + brick.h / 2, 3, brick.w);
            break;
          }
        }

        // Check win
        if (bricks.every((b) => !b.alive)) {
          game.won = true;
        }
      }
    }

    function drawGame(w: number, h: number) {
      const game = gameRef.current;
      if (!game.active) return;

      const alpha = easeOut(game.transitionIn);
      ctx.globalAlpha = alpha;

      const { ball, paddle, bricks } = game;

      // Draw bricks
      for (const brick of bricks) {
        if (!brick.alive) continue;
        ctx.fillStyle = "#000";
        ctx.fillRect(brick.x, brick.y, brick.w, brick.h);
      }

      // Draw paddle
      const paddleY = h - 80 - paddle.h;
      ctx.fillStyle = "#000";
      ctx.beginPath();
      ctx.roundRect(paddle.x, paddleY, paddle.w, paddle.h, 4);
      ctx.fill();

      // Draw ball
      ctx.fillStyle = "#1a1a2e";
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
      ctx.fill();

      // Text overlays
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      if (!game.launched && !game.won && !game.lost) {
        ctx.font = "12px 'IBM Plex Mono', monospace";
        ctx.fillStyle = "rgba(0,0,0,0.3)";
        ctx.fillText("CLICK TO LAUNCH", w / 2, h - 30);
      }

      if (game.won) {
        ctx.font = "bold 24px 'PP Mondwest', monospace";
        ctx.fillStyle = "#000";
        ctx.fillText("YOU WIN!", w / 2, h * 0.55);
        ctx.font = "12px 'IBM Plex Mono', monospace";
        ctx.fillStyle = "rgba(0,0,0,0.4)";
        ctx.fillText("CLICK TO PLAY AGAIN", w / 2, h * 0.55 + 30);
      }

      if (game.lost) {
        ctx.font = "bold 24px 'PP Mondwest', monospace";
        ctx.fillStyle = "#000";
        ctx.fillText("GAME OVER", w / 2, h * 0.55);
        ctx.font = "12px 'IBM Plex Mono', monospace";
        ctx.fillStyle = "rgba(0,0,0,0.4)";
        ctx.fillText("CLICK TO TRY AGAIN", w / 2, h * 0.55 + 30);
      }

      // Game label
      ctx.font = "9px 'IBM Plex Mono', monospace";
      ctx.fillStyle = "rgba(0,0,0,0.2)";
      ctx.textAlign = "left";
      ctx.fillText("BREAKOUT: DEMAND CURVE", 24, h - 20);

      ctx.globalAlpha = 1;
    }

    function draw() {
      frameRef.current = requestAnimationFrame(draw);
      timeRef.current += 0.016;

      if (smoothProgress.current < 0) {
        smoothProgress.current = progressRef.current;
      }

      smoothProgress.current += (progressRef.current - smoothProgress.current) * 0.12;
      const p = smoothProgress.current;
      const time = timeRef.current;

      const { w, h, dpr } = sizeRef.current;

      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const crawlP = pp(p, 0, 0.48);
      const flattenP = easeInOut(pp(p, 0.48, 0.58));
      const doorP = easeOut(pp(p, 0.58, 0.78));
      const growP = easeInOut(pp(p, 0.78, 1.0));

      // ── Detect if we should show the game ──
      const gameThreshold = 0.96;
      const game = gameRef.current;

      if (p >= gameThreshold && !game.active) {
        initGame(w, h);
      } else if (p < 0.86 && game.active) {
        // Scrolled back up — deactivate game
        game.active = false;
        game.transitionIn = 0;
      }

      // If game is active, draw game instead of big text
      if (game.active) {
        updateGame(w, h);
        drawGame(w, h);

        // Still draw particles
        updateAndDrawParticles();

        // Back-to-top
        const shouldShow = true;
        if (shouldShow !== lastBackToTop.current) {
          lastBackToTop.current = shouldShow;
          setShowBackToTop(shouldShow);
        }

        ctx.restore();
        return;
      }

      const tilt = 1 - flattenP;
      const baseFontSize = Math.min(w * 0.045, 58);
      const cx = w / 2;
      const maxLines = 40;

      const linesVisible = flattenP > 0
        ? maxLines
        : Math.max(1, Math.min(maxLines, Math.floor(1 + crawlP * maxLines * 1.8)));

      const scrollAmount = crawlP * maxLines * 1.2;

      // Fade stack during grow
      const stackAlpha = 1 - clamp((growP - 0.15) * 2);

      if (stackAlpha > 0.01) {
        ctx.globalAlpha = stackAlpha;

        for (let i = 0; i < linesVisible; i++) {
          const lineIndex = i;

          const crawlDepth = clamp((lineIndex - (linesVisible - 1) + scrollAmount) / Math.max(1, linesVisible));
          const flatDepth = lineIndex / maxLines;
          const depth = lerp(crawlDepth, flatDepth, flattenP);

          const vanishY = h * 0.08;
          const bottomY = h * 0.88;
          const crawlY = bottomY - (bottomY - vanishY) * Math.pow(depth, 0.7);
          const flatY = h * 0.06 + (lineIndex / maxLines) * h * 0.88;
          let yScreen = lerp(crawlY, flatY, 1 - tilt);

          // Sine wave wobble
          const wobbleAmount = Math.sin(time * 0.8 + lineIndex * 0.7) * (3 + depth * 8) * tilt;
          yScreen += wobbleAmount;

          if (yScreen < -60 || yScreen > h + 80) continue;

          const closeness = 1 - depth;
          const crawlSize = baseFontSize * (0.25 + closeness * 1.6);
          const flatSize = baseFontSize * (0.45 + (lineIndex / maxLines) * 0.8);
          const size = lerp(crawlSize, flatSize, 1 - tilt);

          if (size < 5) continue;

          // Breathing font size
          const breathe = 1 + Math.sin(time * 1.2 + depth * 4) * 0.02 * tilt;
          const finalSize = size * breathe;

          const crawlAlpha = 0.03 + (1 - depth) * 0.85;
          const flatAlpha = 0.06 + (lineIndex / maxLines) * 0.94;
          let alpha = lerp(crawlAlpha, flatAlpha, 1 - tilt);

          if (flattenP < 0.01) {
            const lineAge = linesVisible - 1 - i;
            if (lineAge < 3) alpha *= lineAge / 3;
          }

          alpha = clamp(alpha);
          if (alpha < 0.01) continue;

          // ── Spawn particles from the closest/newest lines ──
          if (closeness > 0.7 && tilt > 0.5 && Math.random() < 0.15) {
            const textWidth = finalSize * 7;
            spawnParticles(cx + (Math.random() - 0.5) * textWidth, yScreen, 1, textWidth * 0.3);
          }

          // Door split
          if (doorP > 0) {
            const normalizedPos = flattenP > 0.5 ? (lineIndex / maxLines) : closeness;
            const doorInfluence = 0.12 + normalizedPos * 0.88;
            const splitDist = doorP * w * 0.55 * doorInfluence;
            const fadeDelay = normalizedPos * 0.12;
            alpha *= 1 - clamp((doorP - 0.25 - fadeDelay) * 2.0);

            if (splitDist > 0.5 && alpha > 0.01) {
              ctx.font = `bold ${finalSize}px 'PP Mondwest', monospace`;
              ctx.textBaseline = "middle";
              ctx.textAlign = "left";

              const totalW = ctx.measureText("DEMAND CURVE").width;
              const demandW = ctx.measureText("DEMAND").width;
              const spaceW = ctx.measureText(" ").width;
              const halfTotal = totalW / 2;

              ctx.fillStyle = depthColor(depth, alpha);
              ctx.fillText("DEMAND", cx - halfTotal - splitDist, yScreen);
              ctx.fillText("CURVE", cx - halfTotal + demandW + spaceW + splitDist, yScreen);

              if (doorP > 0.1 && Math.random() < 0.2) {
                spawnParticles(cx, yScreen, 2, w * 0.3);
              }
              continue;
            }
          }

          // ── Normal draw with color shift ──
          ctx.font = `bold ${finalSize}px 'PP Mondwest', monospace`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = depthColor(depth, alpha);
          ctx.fillText("DEMAND CURVE", cx, yScreen);
        }

        ctx.globalAlpha = 1;
      }

      // ── Draw particles ──
      updateAndDrawParticles();

      // ── Big DEMAND CURVE — simple solid, grows in smoothly ──
      const bigStart = 0.3;
      const bigProgress = doorP > bigStart
        ? clamp((doorP - bigStart) / (1 - bigStart))
        : 0;
      const totalBigP = growP > 0
        ? 0.3 + growP * 0.7
        : bigProgress * 0.3;

      if (totalBigP > 0 && !game.active) {
        ctx.font = "bold 100px 'PP Mondwest', monospace";
        const measure100 = ctx.measureText("DEMAND CURVE").width;
        const maxSize = Math.min((w * 0.9 / measure100) * 100, h * 0.32);
        const startSize = baseFontSize * 0.6;

        const sineWave = totalBigP > 0.5 ? Math.sin(time * 0.6) * 0.008 : 0;
        const finalSize = lerp(startSize, maxSize, easeOut(totalBigP)) * (1 + sineWave);
        const bigAlpha = clamp(totalBigP * 2.5);

        ctx.globalAlpha = bigAlpha;
        ctx.fillStyle = "#000";
        ctx.font = `bold ${finalSize}px 'PP Mondwest', monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("DEMAND CURVE", cx, h / 2);

        if (totalBigP > 0.1 && totalBigP < 0.8 && Math.random() < 0.3) {
          spawnParticles(cx + (Math.random() - 0.5) * finalSize * 4, h / 2, 2, finalSize * 2);
        }

        // "Keep scrolling for a secret" hint
        if (growP > 0.6) {
          const hintAlpha = clamp((growP - 0.6) * 2.5);
          const pulse = 0.4 + Math.sin(time * 1.8) * 0.15;
          ctx.globalAlpha = hintAlpha * pulse;
          ctx.font = "11px 'IBM Plex Mono', monospace";
          ctx.fillStyle = "#000";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("↓  KEEP SCROLLING FOR A SECRET  ↓", cx, h / 2 + finalSize * 0.55 + 20);
        }

        ctx.globalAlpha = 1;
      }

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
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <>
      <div ref={containerRef} className="relative" style={{ height: SCROLL_HEIGHT }}>
        <div className="sticky top-0 h-screen v2-bg overflow-hidden" style={{ zIndex: 2 }}>
          <canvas ref={canvasRef} className="w-full h-full" style={{ position: "relative", zIndex: 1 }} />

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="absolute bottom-8 right-8 flex flex-col items-center gap-2 transition-all duration-500"
            style={{
              opacity: showBackToTop ? 1 : 0,
              pointerEvents: showBackToTop ? "auto" : "none",
              transform: showBackToTop ? "translateY(0)" : "translateY(12px)",
              zIndex: 2,
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
