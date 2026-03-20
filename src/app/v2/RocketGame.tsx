"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/*
  Flappy-bird-style rocket game for the bottom of the page.
  - Tap/click to boost upward, gravity pulls you down
  - Obstacles scroll from right to left (marketing threats)
  - Powerups scroll from right (DC frameworks)
  - Rocket starts janky, upgrades as you collect powerups
*/

function clamp(t: number, min = 0, max = 1) { return Math.max(min, Math.min(max, t)); }

// ── Obstacle & powerup types ──
type Obstacle = {
  x: number;
  gapY: number;     // center of gap
  gapH: number;     // height of gap
  label: string;
  passed: boolean;
};

type Powerup = {
  x: number;
  y: number;
  type: "f5" | "catalyst" | "program" | "studio" | "vanity" | "shiny" | "spray" | "premature";
  label: string;
  collected: boolean;
  bobOffset: number;
  bad: boolean;
};

type Particle = {
  x: number; y: number;
  vx: number; vy: number;
  life: number; maxLife: number;
  size: number;
  color: string;
};

type RocketState = {
  repaired: boolean;       // F5 collected — smoother flight
  forcefield: number;      // Catalyst timer (seconds remaining)
  autopilot: number;       // Program timer (seconds remaining) — BAD: flies you erratically
  studioBoost: boolean;    // Studio collected — permanent speed
  inverted: number;        // Vanity metrics — inverts controls temporarily
  heavy: number;           // Premature scaling — extra gravity temporarily
};

const OBSTACLE_LABELS = [
  "AD FATIGUE", "CHURN", "BAD POSITIONING", "CHANNEL DECAY",
  "FOUNDER-LED SALES", "VANITY METRICS", "SPRAY & PRAY",
  "SHINY OBJECT SYNDROME", "PREMATURE SCALING", "GUESSWORK",
];

const GOOD_POWERUPS: { type: Powerup["type"]; label: string }[] = [
  { type: "f5", label: "F5 FRAMEWORK" },
  { type: "catalyst", label: "GROWTH CATALYST" },
  { type: "studio", label: "GROWTH STUDIO" },
];

const BAD_POWERUPS: { type: Powerup["type"]; label: string }[] = [
  { type: "vanity", label: "VANITY METRICS" },
  { type: "shiny", label: "SHINY OBJECT" },
  { type: "spray", label: "SPRAY & PRAY" },
  { type: "premature", label: "PREMATURE SCALING" },
];

const GRAVITY = 0.32;
const BOOST = -5.5;
const SCROLL_SPEED = 2.8;

export default function RocketGame({ visible }: { visible: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<{
    rocket: { x: number; y: number; vy: number; angle: number; targetAngle: number };
    obstacles: Obstacle[];
    powerups: Powerup[];
    particles: Particle[];
    state: RocketState;
    score: number;
    distance: number;
    alive: boolean;
    started: boolean;
    gameOver: boolean;
    bestScore: number;
    time: number;
    lastObstacle: number;
    lastPowerup: number;
    lastGapY: number;
    screenShake: number;
    w: number;
    h: number;
  } | null>(null);
  const [gameState, setGameState] = useState<"idle" | "playing" | "over">("idle");

  const initGame = useCallback((w: number, h: number) => {
    gameRef.current = {
      rocket: { x: w * 0.2, y: h / 2, vy: 0, angle: 0, targetAngle: 0 },
      obstacles: [],
      powerups: [],
      particles: [],
      state: { repaired: false, forcefield: 0, autopilot: 0, studioBoost: false, inverted: 0, heavy: 0 },
      score: 0,
      distance: 0,
      alive: true,
      started: false,
      gameOver: false,
      bestScore: gameRef.current?.bestScore ?? 0,
      time: 0,
      lastObstacle: 0,
      lastPowerup: -200,
      lastGapY: h / 2,
      screenShake: 0,
      w, h,
    };
    setGameState("idle");
  }, []);

  const boost = useCallback(() => {
    const g = gameRef.current;
    if (!g) return;
    if (g.gameOver) {
      initGame(g.w, g.h);
      return;
    }
    if (!g.started) {
      g.started = true;
      setGameState("playing");
    }
    if (!g.alive) return;

    const power = g.state.repaired ? BOOST * 0.85 : BOOST;
    // Inverted controls: tap pushes you DOWN instead of up
    g.rocket.vy = g.state.inverted > 0 ? -power * 0.7 : power;

    // Exhaust particles
    spawnExhaust(g);
  }, [initGame]);

  useEffect(() => {
    if (!visible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const parent = canvas!.parentElement!;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = w + "px";
      canvas!.style.height = h + "px";
      if (!gameRef.current || gameRef.current.gameOver) {
        initGame(w, h);
      } else {
        gameRef.current.w = w;
        gameRef.current.h = h;
      }
    }
    resize();
    window.addEventListener("resize", resize);

    let frame = 0;
    const dt = 1 / 60;

    function draw() {
      frame = requestAnimationFrame(draw);
      const g = gameRef.current;
      if (!g) return;

      const { w, h } = g;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      g.time += dt;
      const speed = SCROLL_SPEED * (g.state.studioBoost ? 1.3 : 1);

      // ── Screen shake ──
      if (g.screenShake > 0) {
        const sx = (Math.random() - 0.5) * g.screenShake * 8;
        const sy = (Math.random() - 0.5) * g.screenShake * 8;
        ctx.translate(sx, sy);
        g.screenShake *= 0.9;
        if (g.screenShake < 0.01) g.screenShake = 0;
      }

      // ── Background stars ──
      ctx.fillStyle = "rgba(0,0,0,0.03)";
      for (let i = 0; i < 40; i++) {
        const sx = ((i * 137.5 + g.distance * (0.2 + (i % 3) * 0.1)) % (w + 20)) - 10;
        const sy = ((i * 97.3) % h);
        const size = 1 + (i % 3);
        ctx.fillRect(sx, sy, size, size);
      }

      if (g.started && g.alive) {
        // ── Physics ──
        const heavyMult = g.state.heavy > 0 ? 1.6 : 1;
        const grav = (g.state.repaired ? GRAVITY * 0.85 : GRAVITY) * heavyMult;
        g.rocket.vy += grav;
        g.rocket.vy = clamp(g.rocket.vy, -12, 12);
        g.rocket.y += g.rocket.vy;
        g.distance += speed;

        // Decrement forcefield
        if (g.state.forcefield > 0) {
          g.state.forcefield -= dt;
        }

        // Decrement bad states
        if (g.state.inverted > 0) g.state.inverted -= dt;
        if (g.state.heavy > 0) g.state.heavy -= dt;

        // Angle based on velocity
        g.rocket.targetAngle = clamp(g.rocket.vy * 3, -35, 45);
        g.rocket.angle += (g.rocket.targetAngle - g.rocket.angle) * 0.1;

        // Ceiling — soft bounce, never kills you
        if (g.rocket.y < 20) { g.rocket.y = 20; g.rocket.vy = Math.abs(g.rocket.vy) * 0.3; }
        if (g.rocket.y > h - 20) {
          if (g.state.forcefield > 0) {
            g.rocket.y = h - 20;
            g.rocket.vy = -3;
          } else {
            die(g);
          }
        }

        // ── Spawn obstacles ──
        // Max vertical shift between consecutive gaps so the path is always possible
        const maxGapShift = 140;
        if (g.distance - g.lastObstacle > 280) {
          const gapH = Math.max(130, 200 - g.score * 1.5);
          // New gap must be within maxGapShift of the previous gap
          const minY = Math.max(gapH / 2 + 40, g.lastGapY - maxGapShift);
          const maxY = Math.min(h - gapH / 2 - 40, g.lastGapY + maxGapShift);
          const gapY = minY + Math.random() * (maxY - minY);
          g.obstacles.push({
            x: w + 40,
            gapY,
            gapH,
            label: OBSTACLE_LABELS[Math.floor(Math.random() * OBSTACLE_LABELS.length)],
            passed: false,
          });
          g.lastGapY = gapY;
          g.lastObstacle = g.distance;
        }

        // ── Spawn powerups (good and bad) ──
        if (g.distance - g.lastPowerup > 450 + Math.random() * 300) {
          // 55% chance good, 45% chance bad
          const isGood = Math.random() < 0.55;
          const pool = isGood ? GOOD_POWERUPS : BAD_POWERUPS;
          const pu = pool[Math.floor(Math.random() * pool.length)];
          // Spawn near the flight path
          const puY = clamp(
            g.lastGapY + (Math.random() - 0.5) * 100,
            60, h - 60
          );
          g.powerups.push({
            x: w + 40 + Math.random() * 80,
            y: puY,
            type: pu.type,
            label: pu.label,
            collected: false,
            bobOffset: Math.random() * Math.PI * 2,
            bad: !isGood,
          });
          g.lastPowerup = g.distance;
        }

        // ── Move & collide obstacles ──
        for (let i = g.obstacles.length - 1; i >= 0; i--) {
          const obs = g.obstacles[i];
          obs.x -= speed;
          if (obs.x < -60) { g.obstacles.splice(i, 1); continue; }

          // Score
          if (!obs.passed && obs.x < g.rocket.x) {
            obs.passed = true;
            g.score++;
          }

          // Collision
          const rx = g.rocket.x;
          const ry = g.rocket.y;
          const rw = 28, rh = 16;
          const obsW = 40;

          if (rx + rw / 2 > obs.x - obsW / 2 && rx - rw / 2 < obs.x + obsW / 2) {
            const inGap = ry > obs.gapY - obs.gapH / 2 && ry < obs.gapY + obs.gapH / 2;
            if (!inGap) {
              if (g.state.forcefield > 0) {
                // Forcefield absorbs hit
                g.state.forcefield = 0;
                g.screenShake = 0.5;
                spawnExplosion(g, obs.x, ry);
                g.obstacles.splice(i, 1);
              } else {
                die(g);
              }
            }
          }
        }

        // ── Move & collide powerups ──
        for (let i = g.powerups.length - 1; i >= 0; i--) {
          const pu = g.powerups[i];
          pu.x -= speed;
          if (pu.x < -60) { g.powerups.splice(i, 1); continue; }
          if (pu.collected) continue;

          const dx = g.rocket.x - pu.x;
          const dy = g.rocket.y - (pu.y + Math.sin(g.time * 2 + pu.bobOffset) * 8);
          if (Math.abs(dx) < 30 && Math.abs(dy) < 30) {
            pu.collected = true;
            collectPowerup(g, pu);
          }
        }

        // ── Exhaust trail ──
        if (Math.random() < 0.4) {
          const trailColor = g.state.forcefield > 0 ? "rgba(80,120,255,0.5)"
            : g.state.repaired ? "rgba(40,40,80,0.4)" : "rgba(100,80,60,0.3)";
          g.particles.push({
            x: g.rocket.x - 14,
            y: g.rocket.y + (Math.random() - 0.5) * 8,
            vx: -1.5 - Math.random(),
            vy: (Math.random() - 0.5) * 1.5,
            life: 0, maxLife: 20 + Math.random() * 15,
            size: 2 + Math.random() * 3,
            color: trailColor,
          });
        }
      }

      // ── Update particles ──
      for (let i = g.particles.length - 1; i >= 0; i--) {
        const p = g.particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vy *= 0.98;
        p.vx *= 0.97;
        if (p.life >= p.maxLife) { g.particles.splice(i, 1); }
      }

      // ── DRAW ──

      // Draw obstacles
      for (const obs of g.obstacles) {
        const obsW = 40;
        const topH = obs.gapY - obs.gapH / 2;
        const botY = obs.gapY + obs.gapH / 2;

        // Top pillar
        ctx.fillStyle = "rgba(0,0,0,0.08)";
        ctx.fillRect(obs.x - obsW / 2, 0, obsW, topH);
        ctx.fillStyle = "rgba(0,0,0,0.15)";
        ctx.fillRect(obs.x - obsW / 2, topH - 4, obsW, 4);

        // Bottom pillar
        ctx.fillStyle = "rgba(0,0,0,0.08)";
        ctx.fillRect(obs.x - obsW / 2, botY, obsW, h - botY);
        ctx.fillStyle = "rgba(0,0,0,0.15)";
        ctx.fillRect(obs.x - obsW / 2, botY, obsW, 4);

        // Label (rotated)
        ctx.save();
        ctx.translate(obs.x, obs.gapY - obs.gapH / 2 - 12);
        ctx.font = "7px 'IBM Plex Mono', monospace";
        ctx.fillStyle = "rgba(0,0,0,0.2)";
        ctx.textAlign = "center";
        ctx.fillText(obs.label, 0, 0);
        ctx.restore();
      }

      // Draw powerups
      for (const pu of g.powerups) {
        if (pu.collected) continue;
        const py = pu.y + Math.sin(g.time * 2 + pu.bobOffset) * 8;
        const glow = 0.3 + Math.sin(g.time * 3) * 0.1;

        // Glow circle — green/blue for good, red/orange for bad
        ctx.beginPath();
        ctx.arc(pu.x, py, 18, 0, Math.PI * 2);
        let puColor: string;
        if (pu.bad) {
          puColor = pu.type === "vanity" ? `rgba(200,50,50,${glow})`
            : pu.type === "shiny" ? `rgba(220,160,30,${glow})`
            : pu.type === "spray" ? `rgba(200,80,30,${glow})`
            : `rgba(180,40,80,${glow})`;
        } else {
          puColor = pu.type === "f5" ? `rgba(60,180,80,${glow})`
            : pu.type === "catalyst" ? `rgba(80,120,255,${glow})`
            : `rgba(160,60,200,${glow})`;
        }
        ctx.fillStyle = puColor;
        ctx.fill();

        // Warning ring on bad pickups
        if (pu.bad) {
          ctx.strokeStyle = `rgba(200,50,50,${0.15 + Math.sin(g.time * 5) * 0.1})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(pu.x, py, 22, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Icon
        ctx.fillStyle = "#fff";
        ctx.font = "bold 8px 'IBM Plex Mono', monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        let icon: string;
        if (pu.bad) {
          icon = pu.type === "vanity" ? "VM"
            : pu.type === "shiny" ? "SO"
            : pu.type === "spray" ? "SP"
            : "PS";
        } else {
          icon = pu.type === "f5" ? "F5"
            : pu.type === "catalyst" ? "GC"
            : "GS";
        }
        ctx.fillText(icon, pu.x, py);

        // Label below
        ctx.font = "6px 'IBM Plex Mono', monospace";
        ctx.fillStyle = pu.bad ? "rgba(180,40,40,0.4)" : "rgba(0,0,0,0.3)";
        ctx.fillText(pu.label, pu.x, py + 26);
      }

      // Draw particles
      for (const p of g.particles) {
        const lifeR = p.life / p.maxLife;
        const alpha = (1 - lifeR) * 0.6;
        const size = p.size * (1 - lifeR * 0.5);
        ctx.fillStyle = p.color.replace(/[\d.]+\)$/, `${alpha})`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw rocket
      drawRocket(ctx, g);

      // ── HUD ──
      ctx.textAlign = "left";
      ctx.textBaseline = "top";

      // Score (below nav)
      ctx.font = "bold 14px 'IBM Plex Mono', monospace";
      ctx.fillStyle = "rgba(0,0,0,0.6)";
      ctx.fillText(`${g.score}`, 20, 60);

      ctx.font = "9px 'IBM Plex Mono', monospace";
      ctx.fillStyle = "rgba(0,0,0,0.25)";
      ctx.fillText("OBSTACLES CLEARED", 20, 78);

      // Active effects
      let hudY = 98;
      if (g.state.repaired) {
        ctx.fillStyle = "rgba(60,180,80,0.5)";
        ctx.fillText("● F5 FRAMEWORK — SMOOTHER FLIGHT", 20, hudY);
        hudY += 14;
      }
      if (g.state.forcefield > 0) {
        ctx.fillStyle = "rgba(80,120,255,0.5)";
        ctx.fillText(`● GROWTH CATALYST — SHIELD ${Math.ceil(g.state.forcefield)}s`, 20, hudY);
        hudY += 14;
      }
      if (g.state.studioBoost) {
        ctx.fillStyle = "rgba(160,60,200,0.5)";
        ctx.fillText("● GROWTH STUDIO — SPEED BOOST", 20, hudY);
        hudY += 14;
      }
      // Bad effects
      if (g.state.inverted > 0) {
        ctx.fillStyle = "rgba(200,50,50,0.6)";
        ctx.fillText(`⚠ VANITY METRICS — CONTROLS INVERTED ${Math.ceil(g.state.inverted)}s`, 20, hudY);
        hudY += 14;
      }
      if (g.state.heavy > 0) {
        ctx.fillStyle = "rgba(180,40,80,0.6)";
        ctx.fillText(`⚠ PREMATURE SCALING — HEAVY ${Math.ceil(g.state.heavy)}s`, 20, hudY);
      }

      // ── Idle state ──
      if (!g.started) {
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "bold 18px 'PP Mondwest', monospace";
        ctx.fillStyle = "rgba(0,0,0,0.7)";
        ctx.fillText("GROWTH FLIGHT", w / 2, h * 0.35);
        ctx.font = "11px 'IBM Plex Mono', monospace";
        ctx.fillStyle = "rgba(0,0,0,0.35)";
        ctx.fillText("CLICK OR TAP TO FLY", w / 2, h * 0.35 + 28);
        ctx.font = "9px 'IBM Plex Mono', monospace";
        ctx.fillStyle = "rgba(0,0,0,0.2)";
        ctx.fillText("DODGE OBSTACLES  ·  COLLECT POWERUPS", w / 2, h * 0.35 + 48);
      }

      // ── Game over ──
      if (g.gameOver) {
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        // Dimmed overlay
        ctx.fillStyle = "rgba(249,249,248,0.6)";
        ctx.fillRect(0, 0, w, h);

        ctx.font = "bold 22px 'PP Mondwest', monospace";
        ctx.fillStyle = "#000";
        ctx.fillText("GAME OVER", w / 2, h * 0.4);

        ctx.font = "13px 'IBM Plex Mono', monospace";
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fillText(`SCORE: ${g.score}`, w / 2, h * 0.4 + 30);

        if (g.score >= g.bestScore && g.bestScore > 0) {
          ctx.fillStyle = "rgba(60,180,80,0.6)";
          ctx.fillText("NEW BEST!", w / 2, h * 0.4 + 50);
        }

        ctx.font = "11px 'IBM Plex Mono', monospace";
        ctx.fillStyle = "rgba(0,0,0,0.3)";
        ctx.fillText("CLICK TO TRY AGAIN", w / 2, h * 0.4 + 75);
      }

      // Game label
      ctx.textAlign = "right";
      ctx.font = "8px 'IBM Plex Mono', monospace";
      ctx.fillStyle = "rgba(0,0,0,0.12)";
      ctx.fillText("GROWTH FLIGHT — DEMAND CURVE", w - 16, h - 16);

      ctx.restore();
    }

    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, [visible, initGame]);

  // Handle click/tap
  useEffect(() => {
    if (!visible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    function onClick(e: MouseEvent | TouchEvent) {
      e.preventDefault();
      boost();
    }
    canvas.addEventListener("mousedown", onClick);
    canvas.addEventListener("touchstart", onClick, { passive: false });

    function onKey(e: KeyboardEvent) {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        boost();
      }
    }
    window.addEventListener("keydown", onKey);

    return () => {
      canvas.removeEventListener("mousedown", onClick);
      canvas.removeEventListener("touchstart", onClick);
      window.removeEventListener("keydown", onKey);
    };
  }, [visible, boost]);

  return (
    <div
      className="absolute inset-0 transition-opacity duration-500"
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        zIndex: 3,
      }}
    >
      <canvas ref={canvasRef} className="w-full h-full" style={{ display: "block", cursor: "pointer" }} />
    </div>
  );
}

// ── Helper functions (outside component to avoid recreating) ──

function spawnExhaust(g: any) {
  for (let i = 0; i < 3; i++) {
    g.particles.push({
      x: g.rocket.x - 14,
      y: g.rocket.y + (Math.random() - 0.5) * 6,
      vx: -3 - Math.random() * 2,
      vy: (Math.random() - 0.5) * 3,
      life: 0, maxLife: 12 + Math.random() * 10,
      size: 3 + Math.random() * 3,
      color: g.state.repaired ? "rgba(80,120,255,0.5)" : "rgba(200,120,40,0.4)",
    });
  }
}

function spawnExplosion(g: any, x: number, y: number) {
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2;
    g.particles.push({
      x, y,
      vx: Math.cos(angle) * (2 + Math.random() * 3),
      vy: Math.sin(angle) * (2 + Math.random() * 3),
      life: 0, maxLife: 20 + Math.random() * 20,
      size: 2 + Math.random() * 3,
      color: "rgba(255,100,50,0.6)",
    });
  }
}

function collectPowerup(g: any, pu: Powerup) {
  switch (pu.type) {
    // Good
    case "f5":
      g.state.repaired = true;
      break;
    case "catalyst":
      g.state.forcefield = 8;
      break;
    case "studio":
      g.state.studioBoost = true;
      break;
    // Bad
    case "vanity":
      g.state.inverted = 4;
      break;
    case "shiny":
      // Random velocity jolt — sends you in a random direction
      g.rocket.vy = (Math.random() - 0.5) * 8;
      break;
    case "spray":
      // Temporary screen shake + slight speed wobble
      g.screenShake = 1.5;
      g.rocket.vy += (Math.random() - 0.5) * 6;
      break;
    case "premature":
      g.state.heavy = 5;
      break;
  }
  // Particles — green for good, red for bad
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    let color: string;
    if (pu.bad) {
      color = "rgba(200,50,50,0.6)";
    } else {
      color = pu.type === "f5" ? "rgba(60,180,80,0.6)"
        : pu.type === "catalyst" ? "rgba(80,120,255,0.6)"
        : "rgba(160,60,200,0.6)";
    }
    g.particles.push({
      x: pu.x, y: pu.y,
      vx: Math.cos(angle) * 3,
      vy: Math.sin(angle) * 3,
      life: 0, maxLife: 25,
      size: 3,
      color,
    });
  }
  g.screenShake = 0.3;
}

function die(g: any) {
  g.alive = false;
  g.gameOver = true;
  if (g.score > g.bestScore) g.bestScore = g.score;
  g.screenShake = 1;
  spawnExplosion(g, g.rocket.x, g.rocket.y);
}

function drawRocket(ctx: CanvasRenderingContext2D, g: any) {
  const { rocket, state } = g;
  const { x, y, angle } = rocket;

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate((angle * Math.PI) / 180);

  const repaired = state.repaired;

  // Forcefield
  if (state.forcefield > 0) {
    const pulse = 0.3 + Math.sin(g.time * 6) * 0.1;
    ctx.beginPath();
    ctx.arc(0, 0, 24, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(80,120,255,${pulse})`;
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  // Rocket body
  if (repaired) {
    // Clean rocket
    ctx.fillStyle = "#1a1a2e";
    ctx.beginPath();
    ctx.moveTo(16, 0);
    ctx.lineTo(-10, -8);
    ctx.lineTo(-10, 8);
    ctx.closePath();
    ctx.fill();

    // Window
    ctx.fillStyle = "rgba(100,150,255,0.4)";
    ctx.beginPath();
    ctx.arc(2, 0, 3, 0, Math.PI * 2);
    ctx.fill();

    // Fins
    ctx.fillStyle = "#2a2a4a";
    ctx.beginPath();
    ctx.moveTo(-10, -8);
    ctx.lineTo(-16, -14);
    ctx.lineTo(-14, -6);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(-10, 8);
    ctx.lineTo(-16, 14);
    ctx.lineTo(-14, 6);
    ctx.closePath();
    ctx.fill();
  } else {
    // Janky rocket — rough edges, dents
    ctx.fillStyle = "#555";
    ctx.beginPath();
    ctx.moveTo(14, 1);
    ctx.lineTo(12, -2);
    ctx.lineTo(-9, -7);
    ctx.lineTo(-11, -6);
    ctx.lineTo(-10, 7);
    ctx.lineTo(-8, 9);
    ctx.lineTo(13, 2);
    ctx.closePath();
    ctx.fill();

    // Dent marks
    ctx.strokeStyle = "rgba(0,0,0,0.2)";
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(-2, -3);
    ctx.lineTo(1, -1);
    ctx.moveTo(4, 2);
    ctx.lineTo(6, 4);
    ctx.stroke();

    // Crooked fin
    ctx.fillStyle = "#666";
    ctx.beginPath();
    ctx.moveTo(-9, -7);
    ctx.lineTo(-15, -12);
    ctx.lineTo(-12, -5);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(-8, 9);
    ctx.lineTo(-17, 13);
    ctx.lineTo(-13, 6);
    ctx.closePath();
    ctx.fill();

    // Smoke puffs from janky rocket
    if (g.started && g.alive && Math.random() < 0.3) {
      g.particles.push({
        x: x - 12 + (Math.random() - 0.5) * 6,
        y: y + (Math.random() - 0.5) * 10,
        vx: -0.5 - Math.random(),
        vy: (Math.random() - 0.5) * 2 - 0.5,
        life: 0, maxLife: 30,
        size: 3 + Math.random() * 4,
        color: "rgba(80,80,80,0.15)",
      });
    }
  }

  // Autopilot indicator
  if (state.autopilot > 0) {
    ctx.fillStyle = "rgba(200,120,40,0.5)";
    ctx.font = "bold 6px 'IBM Plex Mono', monospace";
    ctx.textAlign = "center";
    ctx.fillText("AUTO", 0, -16);
  }

  ctx.restore();
}
