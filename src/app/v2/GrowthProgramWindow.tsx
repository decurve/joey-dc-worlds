"use client";

import { FileText, FolderOpen } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";

const gpItems = [
  { title: "The Foundational Five", type: "Framework", path: "Foundation" },
  { title: "Growth Catalysts: Finding Your Edge", type: "Deep Dive", path: "Foundation" },
  { title: "Building Your Growth Model", type: "Framework", path: "Foundation" },
  { title: "The Meta Ads Scaling System", type: "Playbook", path: "Acquisition" },
  { title: "Positioning That Converts", type: "Deep Dive", path: "Foundation" },
  { title: "Channel-Market Fit", type: "Framework", path: "Acquisition" },
  { title: "Landing Page Conversion Playbook", type: "Playbook", path: "Acquisition" },
  { title: "Pricing & Packaging Strategy", type: "Deep Dive", path: "Monetization" },
  { title: "Retention Flywheels", type: "Framework", path: "Retention" },
  { title: "The Growth Experimentation Process", type: "Playbook", path: "Strategy" },
];

const tabs = [
  { label: "all-modules.md", path: null, icon: FolderOpen },
  { label: "foundation.md", path: "Foundation", icon: FileText },
  { label: "acquisition.md", path: "Acquisition", icon: FileText },
  { label: "monetization.md", path: "Monetization", icon: FileText },
  { label: "retention.md", path: "Retention", icon: FileText },
];

/* ── Mini Game ── */
function MiniGame({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const gameRef = useRef({
    playerY: 0,
    velocityY: 0,
    isJumping: false,
    obstacles: [] as { x: number; w: number; h: number; type: string }[],
    score: 0,
    speed: 4,
    groundY: 0,
    gameOver: false,
    started: false,
  });

  const jump = useCallback(() => {
    const g = gameRef.current;
    if (g.gameOver) {
      // Reset
      g.playerY = 0;
      g.velocityY = 0;
      g.isJumping = false;
      g.obstacles = [];
      g.score = 0;
      g.speed = 4;
      g.gameOver = false;
      g.started = true;
      return;
    }
    if (!g.started) {
      g.started = true;
    }
    if (!g.isJumping) {
      g.velocityY = -12;
      g.isJumping = true;
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      gameRef.current.groundY = canvas.height - 40;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleKey = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        jump();
      }
      if (e.code === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    canvas.addEventListener("click", jump);

    let lastObstacle = 0;

    const loop = () => {
      const g = gameRef.current;
      const W = canvas.width;
      const H = canvas.height;
      const ground = g.groundY;

      ctx.clearRect(0, 0, W, H);

      // Background
      ctx.fillStyle = "#fafafa";
      ctx.fillRect(0, 0, W, H);

      // Ground line
      ctx.strokeStyle = "rgba(0,0,0,0.1)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, ground);
      ctx.lineTo(W, ground);
      ctx.stroke();

      // Ground hash marks
      ctx.fillStyle = "rgba(0,0,0,0.06)";
      for (let x = (g.score * -2) % 20; x < W; x += 20) {
        ctx.fillRect(x, ground + 1, 10, 1);
      }

      if (!g.started) {
        ctx.fillStyle = "#000";
        ctx.font = "bold 14px 'IBM Plex Mono', monospace";
        ctx.textAlign = "center";
        ctx.fillText("CLICK OR PRESS SPACE TO START", W / 2, H / 2 - 10);
        ctx.font = "11px 'IBM Plex Mono', monospace";
        ctx.fillStyle = "#999";
        ctx.fillText("ESC to close", W / 2, H / 2 + 15);
        // Draw idle player
        drawPlayer(ctx, 60, ground - 20, false);
        frameRef.current = requestAnimationFrame(loop);
        return;
      }

      if (!g.gameOver) {
        // Physics
        g.velocityY += 0.7;
        g.playerY += g.velocityY;
        if (g.playerY >= 0) {
          g.playerY = 0;
          g.velocityY = 0;
          g.isJumping = false;
        }

        // Score & speed
        g.score++;
        g.speed = 4 + Math.floor(g.score / 200) * 0.5;

        // Spawn obstacles
        lastObstacle++;
        if (lastObstacle > 60 + Math.random() * 80) {
          const types = ["box", "tall", "double"];
          const type = types[Math.floor(Math.random() * types.length)];
          const h = type === "tall" ? 35 : type === "double" ? 20 : 25;
          const w = type === "double" ? 40 : 18;
          g.obstacles.push({ x: W + 20, w, h, type });
          if (type === "double") {
            g.obstacles.push({ x: W + 55, w: 18, h: 25, type: "box" });
          }
          lastObstacle = 0;
        }

        // Move obstacles
        g.obstacles = g.obstacles.filter((o) => {
          o.x -= g.speed;
          return o.x > -50;
        });

        // Collision
        const px = 60, pw = 16, ph = 20;
        const py = ground - 20 + g.playerY;
        for (const o of g.obstacles) {
          const ox = o.x, ow = o.w, oh = o.h;
          const oy = ground - oh;
          if (px + pw > ox + 3 && px < ox + ow - 3 && py + ph > oy + 3) {
            g.gameOver = true;
          }
        }
      }

      // Draw obstacles
      for (const o of g.obstacles) {
        ctx.fillStyle = "rgba(0,0,0,0.12)";
        ctx.fillRect(o.x, g.groundY - o.h, o.w, o.h);
        ctx.strokeStyle = "rgba(0,0,0,0.25)";
        ctx.lineWidth = 1;
        ctx.strokeRect(o.x + 0.5, g.groundY - o.h + 0.5, o.w - 1, o.h - 1);
      }

      // Draw player
      drawPlayer(ctx, 60, ground - 20 + g.playerY, g.isJumping);

      // Score
      ctx.fillStyle = "#000";
      ctx.font = "bold 11px 'IBM Plex Mono', monospace";
      ctx.textAlign = "right";
      ctx.fillText(`SCORE: ${Math.floor(g.score / 5)}`, W - 16, 24);

      // Speed indicator
      ctx.fillStyle = "#999";
      ctx.font = "10px 'IBM Plex Mono', monospace";
      ctx.textAlign = "left";
      ctx.fillText(`SPEED: ${g.speed.toFixed(1)}x`, 16, 24);

      if (g.gameOver) {
        ctx.fillStyle = "rgba(249,249,248,0.85)";
        ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = "#000";
        ctx.font = "bold 16px 'IBM Plex Mono', monospace";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", W / 2, H / 2 - 20);
        ctx.font = "13px 'IBM Plex Mono', monospace";
        ctx.fillText(`Score: ${Math.floor(g.score / 5)}`, W / 2, H / 2 + 5);
        ctx.font = "11px 'IBM Plex Mono', monospace";
        ctx.fillStyle = "#999";
        ctx.fillText("Click to retry · ESC to close", W / 2, H / 2 + 30);
      }

      frameRef.current = requestAnimationFrame(loop);
    };

    frameRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("click", jump);
    };
  }, [jump, onClose]);

  return (
    <div className="absolute inset-0 z-20 bg-[#fafafa]">
      <canvas ref={canvasRef} className="w-full h-full cursor-pointer" />
    </div>
  );
}

function drawPlayer(ctx: CanvasRenderingContext2D, x: number, y: number, jumping: boolean) {
  // Simple block character
  ctx.fillStyle = "#000";
  // Body
  ctx.fillRect(x, y, 16, 16);
  // Eye
  ctx.fillStyle = "#fff";
  ctx.fillRect(x + 10, y + 3, 4, 4);
  ctx.fillStyle = "#000";
  ctx.fillRect(x + 12, y + 4, 2, 2);
  // Legs
  if (jumping) {
    ctx.fillRect(x + 2, y + 16, 4, 2);
    ctx.fillRect(x + 10, y + 16, 4, 2);
  } else {
    ctx.fillRect(x + 2, y + 16, 4, 4);
    ctx.fillRect(x + 10, y + 16, 4, 4);
  }
}

/* ── Main Component ── */
export default function GrowthProgramWindow() {
  const [activeTab, setActiveTab] = useState(0);
  const [showGame, setShowGame] = useState(false);

  const filteredItems = tabs[activeTab].path
    ? gpItems.filter((item) => item.path === tabs[activeTab].path)
    : gpItems;

  return (
    <div className="border border-black/10 relative">
      {showGame && <MiniGame onClose={() => setShowGame(false)} />}

      {/* Title bar — macOS dots + spec label */}
      <div className="flex items-center gap-3 px-4 py-2.5 border-b border-black/10 bg-neutral-50 relative z-30">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57] cursor-pointer hover:brightness-90" onClick={() => setShowGame(false)} />
          <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <button className="w-2.5 h-2.5 rounded-full bg-[#28c840] cursor-pointer hover:brightness-90" onClick={() => setShowGame(!showGame)} />
        </div>
        <span className="font-mono-ui text-[10px] text-neutral-400 ml-1">
          {showGame ? "[ GROWTH RUNNER — ESC TO EXIT ]" : "[ GROWTH PROGRAM — 50+ MODULES ]"}
        </span>
      </div>

      {/* Tab bar */}
      <div className="flex border-b border-black/10 bg-neutral-50/50">
        {tabs.map((tab, i) => {
          const isActive = activeTab === i;
          const Icon = tab.icon;
          return (
            <button
              key={tab.label}
              onClick={() => setActiveTab(i)}
              className={`px-4 py-2.5 text-xs font-mono-ui border-r border-black/10 transition-colors ${
                isActive
                  ? "bg-white text-black font-medium relative -mb-px z-10"
                  : "text-neutral-400 hover:text-black"
              }`}
            >
              <Icon className={`w-3 h-3 inline-block mr-1.5 ${isActive ? "opacity-40" : "opacity-30"}`} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Column headers */}
      <div className="hidden md:flex items-center border-b border-black/10 px-6 py-3 font-mono-ui text-[10px] uppercase tracking-widest text-neutral-400">
        <div className="w-28 shrink-0">Path</div>
        <div className="flex-1">Module</div>
        <div className="w-28 text-right">Type</div>
      </div>

      {/* Rows */}
      {filteredItems.map((item, i) => (
        <div
          key={`${item.title}-${i}`}
          className="flex items-center border-b border-black/10 px-6 py-5 group program-row-hover cursor-pointer transition-colors"
        >
          <div className="w-28 shrink-0 text-xs font-mono-ui flex items-center gap-2.5">
            <span className="gp-square" style={{ animationDelay: `${i * 0.4}s` }} />
            {item.path}
          </div>
          <div className="flex-1 text-xl md:text-2xl font-medium leading-tight">
            {item.title}
          </div>
          <div className="w-28 text-right shrink-0">
            <span className="inline-block rounded-sm px-2 py-1 text-[10px] font-mono-ui uppercase tracking-widest border border-black/10 bg-white">
              {item.type}
            </span>
          </div>
        </div>
      ))}

      {/* Footer — stats + see all */}
      <div className="flex items-center justify-between px-6 py-4 bg-neutral-50 font-mono-ui text-[10px] text-neutral-400">
        <span>MODULES: 50+ &nbsp;·&nbsp; PATHS: 5 &nbsp;·&nbsp; TYPES: 5 &nbsp;·&nbsp; AVG. COMPLETION: 2.5 HRS</span>
        <a href="/v2/growth-program" className="text-black font-medium hover:underline flex items-center gap-1">
          See all modules →
        </a>
      </div>
    </div>
  );
}
