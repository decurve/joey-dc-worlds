"use client";

import { useRef, useEffect, useState } from "react";

type VisualProps = {
  width: number;
  height: number;
};

/* ═══════════════════════════════════════════════════
   1. Growing Tree — starts as a seed, mouse grows it into a massive tree
   Branches spread fractally, leaves bloom, roots dig deep.
   Move mouse around = the tree grows. Leave = it slowly withers back.
   ═══════════════════════════════════════════════════ */
export function TreeVisual({ width, height }: VisualProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const state = useRef({
    mouse: { x: width / 2, y: height / 2, active: false },
    growth: 0,
    time: 0,
    seed: Math.random() * 999,
  });
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = width;
    canvas.height = height;

    const s = state.current;
    const trunkX = width * 0.5;
    const trunkY = height * 0.82;

    const handleMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      s.mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top, active: true };
    };
    const handleLeave = () => { s.mouse.active = false; };
    canvas.addEventListener("mousemove", handleMove);
    canvas.addEventListener("mouseleave", handleLeave);

    // Generate stable random values using only the seed and an index.
    // This avoids the old bug where x/y positions (which change due to sway)
    // were fed back into seededRandom, causing jitter every frame.
    function seededRandom(n: number) {
      const x = Math.sin(s.seed + n * 127.1) * 43758.5453;
      return x - Math.floor(x);
    }

    // Pre-generate branch structure once so it never changes frame-to-frame.
    // Each branch node stores its stable random values (spread, shrink, hasExtra).
    // We use a simple counter ("branchId") that increments as we recurse,
    // giving each branch a unique but deterministic random seed.
    type BranchNode = {
      spread: number;
      shrink: number;
      hasExtra: boolean;
      extraAngleOffset: number;
      swayOffset: number;
      left: BranchNode | null;
      right: BranchNode | null;
      extra: BranchNode | null;
    };

    let branchIdCounter = 0;
    function buildBranchTree(depth: number, maxDepth: number): BranchNode | null {
      if (depth > maxDepth) return null;
      const id = branchIdCounter++;
      const r1 = seededRandom(id * 3);
      const r2 = seededRandom(id * 3 + 1);
      const r3 = seededRandom(id * 3 + 2);
      const spread = 0.35 + r1 * 0.35;
      const shrink = 0.62 + r2 * 0.15;
      const hasExtra = depth < 3 && r3 > 0.45;
      const extraAngleOffset = (r1 - 0.5) * 0.9;
      const swayOffset = id * 0.37; // stable per-branch sway offset
      return {
        spread,
        shrink,
        hasExtra,
        extraAngleOffset,
        swayOffset,
        left: buildBranchTree(depth + 1, maxDepth),
        right: buildBranchTree(depth + 1, maxDepth),
        extra: hasExtra ? buildBranchTree(depth + 1, maxDepth) : null,
      };
    }

    // Build the tree structure once at the deepest level we'll ever need (9).
    // During rendering, we simply stop recursing when depth exceeds the current maxDepth.
    branchIdCounter = 0;
    const branchTree = buildBranchTree(0, 9);

    // Pre-generate root random values the same way — one value per depth per root.
    const rootRandoms: number[] = [];
    for (let i = 0; i < 50; i++) {
      rootRandoms.push(seededRandom(1000 + i * 7));
    }

    function drawBranch(
      x: number, y: number, angle: number, len: number,
      depth: number, maxDepth: number, thickness: number,
      node: BranchNode | null
    ) {
      if (!node || depth > maxDepth || len < 2 || !ctx) return;

      const growFactor = Math.min(1, (s.growth - depth * 8) / 12);
      if (growFactor <= 0) return;

      // Sway uses depth and the stable per-node offset (not x/y positions)
      const sway = Math.sin(s.time * 1.5 + depth * 0.7 + node.swayOffset) * (depth * 0.015);
      const finalAngle = angle + sway;
      const finalLen = len * growFactor;

      const endX = x + Math.cos(finalAngle) * finalLen;
      const endY = y + Math.sin(finalAngle) * finalLen;

      // Branch line
      const alpha = Math.max(0.2, 0.85 - depth * 0.08);
      ctx.strokeStyle = `rgba(0,0,0,${alpha})`;
      ctx.lineWidth = thickness * growFactor;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(endX, endY);
      ctx.stroke();

      // Leaves at tips
      if (depth >= maxDepth - 2 && growFactor > 0.6) {
        const leafSize = (3 + depth) * growFactor;
        const leafAlpha = 0.15 + growFactor * 0.15;
        ctx.fillStyle = `rgba(0,0,0,${leafAlpha})`;
        ctx.beginPath();
        ctx.arc(endX, endY, leafSize, 0, Math.PI * 2);
        ctx.fill();
      }

      drawBranch(endX, endY, finalAngle - node.spread, len * node.shrink, depth + 1, maxDepth, thickness * 0.7, node.left);
      drawBranch(endX, endY, finalAngle + node.spread, len * node.shrink, depth + 1, maxDepth, thickness * 0.7, node.right);

      // Extra branch on lower depths
      if (node.hasExtra) {
        drawBranch(endX, endY, finalAngle + node.extraAngleOffset, len * node.shrink * 0.75, depth + 1, maxDepth, thickness * 0.5, node.extra);
      }
    }

    function drawRoots(growth: number) {
      if (!ctx) return;
      const rootGrowth = Math.min(1, growth / 40);
      if (rootGrowth <= 0) return;

      function root(x: number, y: number, angle: number, len: number, depth: number, rootIdx: number) {
        if (depth > 4 || len < 3 || !ctx) return;
        const rg = Math.min(1, (rootGrowth * 4 - depth) / 1);
        if (rg <= 0) return;
        const endX = x + Math.cos(angle) * len * rg;
        const endY = y + Math.sin(angle) * len * rg;
        ctx.strokeStyle = `rgba(0,0,0,${0.3 + rg * 0.25})`;
        ctx.lineWidth = Math.max(0.5, (3 - depth) * rg);
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        const r = rootRandoms[(rootIdx * 5 + depth) % rootRandoms.length];
        root(endX, endY, angle - 0.3 - r * 0.5, len * 0.7, depth + 1, rootIdx);
        root(endX, endY, angle + 0.3 + r * 0.4, len * 0.7, depth + 1, rootIdx);
      }
      root(trunkX - 5, trunkY, Math.PI / 2 + 0.3, height * 0.12, 0, 0);
      root(trunkX + 5, trunkY, Math.PI / 2 - 0.3, height * 0.12, 0, 1);
      root(trunkX, trunkY, Math.PI / 2, height * 0.08, 0, 2);
    }

    function loop() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      s.time += 0.016;

      // Growth: mouse presence grows, absence shrinks
      if (s.mouse.active) {
        s.growth = Math.min(100, s.growth + 0.6);
      } else {
        s.growth = Math.max(5, s.growth - 0.15);
      }

      const maxDepth = Math.min(9, Math.floor(s.growth / 10) + 2);
      const trunkLen = 40 + s.growth * 1.2;
      const trunkThickness = 2 + s.growth * 0.06;

      // Ground line
      ctx.strokeStyle = "rgba(0,0,0,0.40)";
      ctx.lineWidth = 1;
      ctx.setLineDash([6, 6]);
      ctx.beginPath();
      ctx.moveTo(0, trunkY);
      ctx.lineTo(width, trunkY);
      ctx.stroke();
      ctx.setLineDash([]);

      drawRoots(s.growth);
      drawBranch(trunkX, trunkY, -Math.PI / 2, trunkLen, 0, maxDepth, trunkThickness, branchTree);

      // Growth indicator
      ctx.fillStyle = "rgba(0,0,0,0.66)";
      ctx.font = "bold 9px 'IBM Plex Mono', monospace";
      ctx.textAlign = "left";
      ctx.fillText(`GROWTH: ${Math.round(s.growth)}%`, 10, height - 10);

      frameRef.current = requestAnimationFrame(loop);
    }
    s.growth = 5;
    frameRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frameRef.current);
      canvas.removeEventListener("mousemove", handleMove);
      canvas.removeEventListener("mouseleave", handleLeave);
    };
  }, [width, height]);

  return <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} />;
}

/* ═══════════════════════════════════════════════════
   2. City Skyline — move mouse left to right and buildings
   rise from the ground. The closer your mouse, the taller
   they get. Windows light up. Cranes appear at top.
   ═══════════════════════════════════════════════════ */
export function CityVisual({ width, height }: VisualProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const state = useRef({
    mouse: { x: -1, y: -1 },
    buildings: [] as { x: number; w: number; maxH: number; h: number; windows: boolean[] }[],
    time: 0,
  });
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = width;
    canvas.height = height;

    const s = state.current;
    const ground = height * 0.88;

    // Generate dense buildings
    const b: typeof s.buildings = [];
    let x = 4;
    while (x < width - 4) {
      const w = 15 + Math.random() * 30;
      const maxH = 60 + Math.random() * (height * 0.7);
      const windowCount = Math.floor(w / 7) * Math.floor(maxH / 10);
      const windows = Array.from({ length: windowCount }, () => Math.random() > 0.35);
      b.push({ x, w, maxH, h: 3, windows });
      x += w + 2 + Math.random() * 4;
    }
    s.buildings = b;

    const handleMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      s.mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const handleLeave = () => { s.mouse = { x: -1, y: -1 }; };
    canvas.addEventListener("mousemove", handleMove);
    canvas.addEventListener("mouseleave", handleLeave);

    function loop() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      s.time += 0.016;

      const mx = s.mouse.x;

      for (const bld of s.buildings) {
        // Proximity-based height
        const dist = mx >= 0 ? Math.abs(bld.x + bld.w / 2 - mx) : 9999;
        const proximity = Math.max(0, 1 - dist / (width * 0.25));
        const targetH = 3 + (bld.maxH - 3) * proximity;
        bld.h += (targetH - bld.h) * 0.06;

        const bx = bld.x;
        const by = ground - bld.h;

        // Building body
        ctx.fillStyle = `rgba(0,0,0,${0.2 + proximity * 0.3})`;
        ctx.fillRect(bx, by, bld.w, bld.h);

        // Building outline
        ctx.strokeStyle = `rgba(0,0,0,${0.3 + proximity * 0.4})`;
        ctx.lineWidth = 0.5;
        ctx.strokeRect(bx, by, bld.w, bld.h);

        // Windows — only show when building is tall enough
        if (bld.h > 25) {
          const cols = Math.floor(bld.w / 7);
          const rows = Math.floor(bld.h / 10);
          for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
              const wi = r * cols + c;
              const wx = bx + 3 + c * 7;
              const wy = by + 5 + r * 10;
              if (wy < ground - 3) {
                const lit = bld.windows[wi % bld.windows.length];
                const flicker = lit ? 0.3 + proximity * 0.35 + Math.sin(s.time * 3 + wi) * 0.05 : 0.04;
                ctx.fillStyle = `rgba(0,0,0,${flicker})`;
                ctx.fillRect(wx, wy, 4, 6);
              }
            }
          }
        }

        // Antenna / crane at top of tall buildings
        if (bld.h > height * 0.4 && proximity > 0.5) {
          ctx.strokeStyle = `rgba(0,0,0,${0.4 * proximity})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(bx + bld.w / 2, by);
          ctx.lineTo(bx + bld.w / 2, by - 15);
          ctx.stroke();
          ctx.fillStyle = `rgba(0,0,0,${0.6 * proximity})`;
          ctx.fillRect(bx + bld.w / 2 - 1, by - 17, 3, 3);
        }
      }

      // Ground
      ctx.fillStyle = "rgba(0,0,0,0.36)";
      ctx.fillRect(0, ground, width, 2);

      // Label
      const totalHeight = s.buildings.reduce((sum, b2) => sum + b2.h, 0);
      const avgH = totalHeight / s.buildings.length;
      ctx.fillStyle = "rgba(0,0,0,0.66)";
      ctx.font = "bold 9px 'IBM Plex Mono', monospace";
      ctx.textAlign = "left";
      ctx.fillText(`AVG HEIGHT: ${Math.round(avgH)}`, 10, height - 10);

      frameRef.current = requestAnimationFrame(loop);
    }
    frameRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frameRef.current);
      canvas.removeEventListener("mousemove", handleMove);
      canvas.removeEventListener("mouseleave", handleLeave);
    };
  }, [width, height]);

  return <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} />;
}

/* ═══════════════════════════════════════════════════
   3. Cell Division (Spore) — one cell splits into many.
   Mouse proximity feeds them energy. They pulse, divide,
   connect with membrane lines. Feels truly organic.
   ═══════════════════════════════════════════════════ */
export function CellVisual({ width, height }: VisualProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const state = useRef({
    mouse: { x: width / 2, y: height / 2, active: false },
    cells: [] as { x: number; y: number; r: number; vx: number; vy: number; pulse: number; energy: number }[],
    time: 0,
    splitCooldown: 0,
  });
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = width;
    canvas.height = height;

    const s = state.current;
    // Start with 3 cells
    s.cells = [
      { x: width * 0.5, y: height * 0.5, r: 18, vx: 0, vy: 0, pulse: 0, energy: 0 },
      { x: width * 0.4, y: height * 0.45, r: 14, vx: 0.3, vy: -0.2, pulse: 1, energy: 0 },
      { x: width * 0.55, y: height * 0.55, r: 12, vx: -0.2, vy: 0.3, pulse: 2, energy: 0 },
    ];

    const handleMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      s.mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top, active: true };
    };
    const handleLeave = () => { s.mouse.active = false; };
    canvas.addEventListener("mousemove", handleMove);
    canvas.addEventListener("mouseleave", handleLeave);

    function loop() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      s.time += 0.02;
      s.splitCooldown = Math.max(0, s.splitCooldown - 1);

      const c = s.cells;
      const maxCells = 100;

      // Feed cells energy when mouse is near
      for (const cell of c) {
        if (s.mouse.active) {
          const dx = s.mouse.x - cell.x;
          const dy = s.mouse.y - cell.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const feed = Math.max(0, 1 - dist / (width * 0.4));
          cell.energy = Math.min(1, cell.energy + feed * 0.008);
        } else {
          cell.energy = Math.max(0, cell.energy - 0.002);
        }
        cell.pulse += 0.03;
      }

      // Split cells with enough energy
      if (s.splitCooldown <= 0 && c.length < maxCells) {
        for (let i = c.length - 1; i >= 0; i--) {
          if (c[i].energy > 0.8 && c.length < maxCells) {
            const parent = c[i];
            const angle = Math.random() * Math.PI * 2;
            const pushDist = parent.r * 0.8;
            parent.r = Math.max(6, parent.r * 0.8);
            parent.energy = 0.2;
            c.push({
              x: parent.x + Math.cos(angle) * pushDist,
              y: parent.y + Math.sin(angle) * pushDist,
              r: parent.r * (0.7 + Math.random() * 0.4),
              vx: Math.cos(angle) * 1.5,
              vy: Math.sin(angle) * 1.5,
              pulse: Math.random() * Math.PI * 2,
              energy: 0.3,
            });
            s.splitCooldown = 8;
            break;
          }
        }
      }

      // Slowly remove excess cells when mouse leaves
      if (!s.mouse.active && c.length > 3) {
        for (let i = c.length - 1; i >= 3; i--) {
          if (c[i].energy <= 0 && c[i].r < 5) {
            c.splice(i, 1);
            break;
          }
          if (c[i].energy <= 0) c[i].r *= 0.998;
        }
      }

      // Physics
      for (let i = 0; i < c.length; i++) {
        const a = c[i];
        // Gentle center pull
        a.vx += (width / 2 - a.x) * 0.00015;
        a.vy += (height / 2 - a.y) * 0.00015;

        // Soft repulsion between cells
        for (let j = i + 1; j < c.length; j++) {
          const b = c[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minDist = a.r + b.r + 3;
          if (dist < minDist && dist > 0.1) {
            const force = (minDist - dist) / dist * 0.04;
            a.vx -= dx * force;
            a.vy -= dy * force;
            b.vx += dx * force;
            b.vy += dy * force;
          }
        }
        a.vx *= 0.96;
        a.vy *= 0.96;
        a.x += a.vx;
        a.y += a.vy;
        a.x = Math.max(a.r + 2, Math.min(width - a.r - 2, a.x));
        a.y = Math.max(a.r + 2, Math.min(height - a.r - 2, a.y));
      }

      // Draw membrane connections
      for (let i = 0; i < c.length; i++) {
        for (let j = i + 1; j < c.length; j++) {
          const dx = c[j].x - c[i].x;
          const dy = c[j].y - c[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = c[i].r + c[j].r + 25;
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.12;
            ctx.strokeStyle = `rgba(0,0,0,${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(c[i].x, c[i].y);
            ctx.lineTo(c[j].x, c[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw cells
      for (const cell of c) {
        const pulseScale = 1 + Math.sin(cell.pulse) * 0.06;
        const r = cell.r * pulseScale;
        const energyAlpha = 0.08 + cell.energy * 0.15;

        // Outer glow
        ctx.fillStyle = `rgba(0,0,0,${energyAlpha * 0.8})`;
        ctx.beginPath();
        ctx.arc(cell.x, cell.y, r * 1.4, 0, Math.PI * 2);
        ctx.fill();

        // Cell body
        ctx.fillStyle = `rgba(0,0,0,${energyAlpha})`;
        ctx.beginPath();
        ctx.arc(cell.x, cell.y, r, 0, Math.PI * 2);
        ctx.fill();

        // Cell membrane
        ctx.strokeStyle = `rgba(0,0,0,${0.4 + cell.energy * 0.35})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(cell.x, cell.y, r, 0, Math.PI * 2);
        ctx.stroke();

        // Nucleus
        ctx.fillStyle = `rgba(0,0,0,${0.3 + cell.energy * 0.35})`;
        ctx.beginPath();
        ctx.arc(cell.x, cell.y, r * 0.3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Count label
      ctx.fillStyle = "rgba(0,0,0,0.66)";
      ctx.font = "bold 9px 'IBM Plex Mono', monospace";
      ctx.textAlign = "left";
      ctx.fillText(`CELLS: ${c.length}`, 10, height - 10);

      frameRef.current = requestAnimationFrame(loop);
    }
    frameRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frameRef.current);
      canvas.removeEventListener("mousemove", handleMove);
      canvas.removeEventListener("mouseleave", handleLeave);
    };
  }, [width, height]);

  return <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} />;
}

/* ═══════════════════════════════════════════════════
   4. Network Graph — nodes spawn and connect as you explore.
   Mouse creates new nodes. Connections form automatically.
   The network grows denser and more connected over time.
   ═══════════════════════════════════════════════════ */
export function NetworkVisual({ width, height }: VisualProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const state = useRef({
    mouse: { x: -1, y: -1 },
    nodes: [] as { x: number; y: number; r: number; vx: number; vy: number; label: string }[],
    time: 0,
    spawnTimer: 0,
  });
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = width;
    canvas.height = height;

    const s = state.current;
    const labels = ["SEO", "ADS", "CRO", "EMAIL", "BRAND", "SOCIAL", "PR", "VIRAL", "REF", "CONTENT", "PARTNER", "PLG", "SALES", "COMMUNITY", "EVENTS"];

    // Seed nodes
    s.nodes = [
      { x: width * 0.5, y: height * 0.5, r: 8, vx: 0, vy: 0, label: "GROWTH" },
      { x: width * 0.3, y: height * 0.4, r: 5, vx: 0.2, vy: -0.1, label: "ACQ" },
      { x: width * 0.7, y: height * 0.6, r: 5, vx: -0.1, vy: 0.2, label: "RET" },
    ];

    const handleMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      s.mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const handleLeave = () => { s.mouse = { x: -1, y: -1 }; };
    canvas.addEventListener("mousemove", handleMove);
    canvas.addEventListener("mouseleave", handleLeave);

    function loop() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      s.time += 0.01;

      const n = s.nodes;
      const mx = s.mouse.x;
      const my = s.mouse.y;

      // Spawn nodes near mouse
      if (mx >= 0 && n.length < 50) {
        s.spawnTimer++;
        if (s.spawnTimer > 20) {
          const angle = Math.random() * Math.PI * 2;
          const dist = 30 + Math.random() * 50;
          n.push({
            x: mx + Math.cos(angle) * dist,
            y: my + Math.sin(angle) * dist,
            r: 3 + Math.random() * 5,
            vx: (Math.random() - 0.5) * 0.8,
            vy: (Math.random() - 0.5) * 0.8,
            label: labels[n.length % labels.length],
          });
          s.spawnTimer = 0;
        }
      }

      // Physics — gentle drift + repulsion
      for (const node of n) {
        node.x += node.vx;
        node.y += node.vy;
        node.vx *= 0.985;
        node.vy *= 0.985;
        // Bounce off edges softly
        if (node.x < node.r + 5) node.vx += 0.05;
        if (node.x > width - node.r - 5) node.vx -= 0.05;
        if (node.y < node.r + 5) node.vy += 0.05;
        if (node.y > height - node.r - 5) node.vy -= 0.05;
      }

      // Draw connections
      for (let i = 0; i < n.length; i++) {
        for (let j = i + 1; j < n.length; j++) {
          const dx = n[j].x - n[i].x;
          const dy = n[j].y - n[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 100;
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.2;
            ctx.strokeStyle = `rgba(0,0,0,${alpha})`;
            ctx.lineWidth = (1 - dist / maxDist) * 2;
            ctx.beginPath();
            ctx.moveTo(n[i].x, n[i].y);
            ctx.lineTo(n[j].x, n[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (const node of n) {
        const pulse = 1 + Math.sin(s.time * 4 + node.x * 0.02) * 0.08;
        const r = node.r * pulse;

        ctx.fillStyle = `rgba(0,0,0,0.36)`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, r * 1.8, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(0,0,0,0.60)`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = `rgba(0,0,0,0.77)`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.stroke();

        // Label
        if (r > 4) {
          ctx.fillStyle = `rgba(0,0,0,0.77)`;
          ctx.font = "bold 7px 'IBM Plex Mono', monospace";
          ctx.textAlign = "center";
          ctx.fillText(node.label, node.x, node.y + r + 10);
        }
      }

      ctx.fillStyle = "rgba(0,0,0,0.66)";
      ctx.font = "bold 9px 'IBM Plex Mono', monospace";
      ctx.textAlign = "left";
      ctx.fillText(`NODES: ${n.length}`, 10, height - 10);

      frameRef.current = requestAnimationFrame(loop);
    }
    frameRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frameRef.current);
      canvas.removeEventListener("mousemove", handleMove);
      canvas.removeEventListener("mouseleave", handleLeave);
    };
  }, [width, height]);

  return <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} />;
}

/* ═══════════════════════════════════════════════════
   5. Staircase Builder — each mouse movement builds
   another step. Metrics appear on steps. Keeps climbing.
   A figure climbs the stairs as they build.
   ═══════════════════════════════════════════════════ */
export function StaircaseVisual({ width, height }: VisualProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const state = useRef({
    mouse: { x: 0, active: false },
    stepsBuilt: 1,
    time: 0,
    climberPos: 0,
  });
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = width;
    canvas.height = height;

    const s = state.current;
    const maxSteps = 15;
    const metrics = ["1K", "5K", "10K", "25K", "50K", "75K", "100K", "150K", "250K", "500K", "750K", "1M", "1.5M", "2M", "3M"];

    const handleMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      s.mouse = { x: e.clientX - rect.left, active: true };
    };
    const handleLeave = () => { s.mouse.active = false; };
    canvas.addEventListener("mousemove", handleMove);
    canvas.addEventListener("mouseleave", handleLeave);

    function loop() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      s.time += 0.016;

      // Target steps based on mouse X position
      const targetSteps = s.mouse.active
        ? Math.min(maxSteps, Math.floor((s.mouse.x / width) * maxSteps) + 1)
        : Math.max(1, s.stepsBuilt - 0.03);
      s.stepsBuilt += (targetSteps - s.stepsBuilt) * 0.06;

      const ground = height * 0.92;
      const stepW = (width * 0.9) / maxSteps;
      const stepMaxH = height * 0.75;
      const startX = width * 0.05;
      const builtCount = Math.ceil(s.stepsBuilt);

      // Draw steps
      for (let i = 0; i < builtCount; i++) {
        const progress = Math.min(1, s.stepsBuilt - i);
        const x = startX + i * stepW;
        const h = ((i + 1) / maxSteps) * stepMaxH * progress;
        const y = ground - h;

        // Step block
        const alpha = 0.06 + (i / maxSteps) * 0.14;
        ctx.fillStyle = `rgba(0,0,0,${alpha * progress})`;
        ctx.fillRect(x, y, stepW - 2, h);

        // Step outline
        ctx.strokeStyle = `rgba(0,0,0,${(0.25 + (i / maxSteps) * 0.35) * progress})`;
        ctx.lineWidth = 0.5;
        ctx.strokeRect(x, y, stepW - 2, h);

        // Top surface highlight
        ctx.fillStyle = `rgba(0,0,0,${0.2 * progress})`;
        ctx.fillRect(x, y, stepW - 2, 3);

        // Metric label on step
        if (progress > 0.5 && h > 20) {
          ctx.fillStyle = `rgba(0,0,0,${0.25 + (i / maxSteps) * 0.2})`;
          ctx.font = "bold 8px 'IBM Plex Mono', monospace";
          ctx.textAlign = "center";
          ctx.fillText(metrics[i] || "", x + (stepW - 2) / 2, y + 14);
        }
      }

      // Climber figure on current top step
      if (s.stepsBuilt > 1) {
        const topStep = Math.floor(s.stepsBuilt) - 1;
        const stepX = startX + topStep * stepW + (stepW - 2) / 2;
        const stepY = ground - ((topStep + 1) / maxSteps) * stepMaxH;
        const targetClimber = stepX;
        s.climberPos += (targetClimber - s.climberPos) * 0.08;

        const cx = s.climberPos;
        const cy = stepY - 12;
        const bob = Math.sin(s.time * 3) * 1.5;

        // Head
        ctx.fillStyle = "rgba(0,0,0,0.66)";
        ctx.beginPath();
        ctx.arc(cx, cy - 6 + bob, 4, 0, Math.PI * 2);
        ctx.fill();
        // Body
        ctx.strokeStyle = "rgba(0,0,0,0.66)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(cx, cy - 2 + bob);
        ctx.lineTo(cx, cy + 8 + bob);
        ctx.stroke();
        // Flag
        ctx.fillStyle = "rgba(0,0,0,0.60)";
        ctx.beginPath();
        ctx.moveTo(cx + 3, cy - 8 + bob);
        ctx.lineTo(cx + 12, cy - 5 + bob);
        ctx.lineTo(cx + 3, cy - 2 + bob);
        ctx.closePath();
        ctx.fill();
      }

      // Growth arrow
      ctx.strokeStyle = "rgba(0,0,0,0.45)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(startX, ground);
      ctx.lineTo(startX + maxSteps * stepW, ground - stepMaxH);
      ctx.stroke();
      ctx.setLineDash([]);

      frameRef.current = requestAnimationFrame(loop);
    }
    s.stepsBuilt = 1;
    s.climberPos = width * 0.05 + ((width * 0.9) / 15) / 2;
    frameRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frameRef.current);
      canvas.removeEventListener("mousemove", handleMove);
      canvas.removeEventListener("mouseleave", handleLeave);
    };
  }, [width, height]);

  return <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} />;
}

/* ═══════════════════════════════════════════════════
   6. Snowball — your cursor IS the snowball. Move it
   around to absorb particles. It gets bigger and bigger.
   Absorbed count shows. Trail particles fall off.
   ═══════════════════════════════════════════════════ */
export function SnowballVisual({ width, height }: VisualProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const state = useRef({
    mouse: { x: width / 2, y: height / 2 },
    ball: { x: width / 2, y: height / 2, r: 12 },
    particles: [] as { x: number; y: number; r: number; absorbed: boolean; alpha: number }[],
    trail: [] as { x: number; y: number; r: number; alpha: number }[],
    time: 0,
  });
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = width;
    canvas.height = height;

    const s = state.current;
    // Scatter lots of particles
    s.particles = [];
    for (let i = 0; i < 300; i++) {
      s.particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 1 + Math.random() * 3,
        absorbed: false,
        alpha: 0.1 + Math.random() * 0.15,
      });
    }
    s.ball = { x: width / 2, y: height / 2, r: 12 };
    s.trail = [];

    const handleMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      s.mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    canvas.addEventListener("mousemove", handleMove);

    function loop() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      s.time += 0.02;

      const b = s.ball;
      const prevX = b.x;
      const prevY = b.y;

      // Smooth follow
      b.x += (s.mouse.x - b.x) * 0.08;
      b.y += (s.mouse.y - b.y) * 0.08;

      // Drop trail
      const speed = Math.sqrt((b.x - prevX) ** 2 + (b.y - prevY) ** 2);
      if (speed > 1 && s.trail.length < 80) {
        s.trail.push({ x: prevX + (Math.random() - 0.5) * b.r, y: prevY + (Math.random() - 0.5) * b.r, r: 1 + Math.random() * 2, alpha: 0.15 });
      }

      // Fade trail
      for (let i = s.trail.length - 1; i >= 0; i--) {
        s.trail[i].alpha -= 0.003;
        if (s.trail[i].alpha <= 0) s.trail.splice(i, 1);
      }

      // Draw trail
      for (const t of s.trail) {
        ctx.fillStyle = `rgba(0,0,0,${t.alpha})`;
        ctx.beginPath();
        ctx.arc(t.x, t.y, t.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Check absorption
      let absorbed = 0;
      for (const part of s.particles) {
        if (part.absorbed) { absorbed++; continue; }
        const dx = part.x - b.x;
        const dy = part.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Pull particles toward ball when close
        if (dist < b.r * 3) {
          const pull = (1 - dist / (b.r * 3)) * 0.03;
          part.x -= dx * pull;
          part.y -= dy * pull;
        }

        if (dist < b.r + part.r) {
          part.absorbed = true;
          absorbed++;
          b.r = Math.min(80, b.r + 0.25);
        }
      }

      // Draw unabsorbed particles
      for (const part of s.particles) {
        if (part.absorbed) continue;
        ctx.fillStyle = `rgba(0,0,0,${part.alpha})`;
        ctx.beginPath();
        ctx.arc(part.x, part.y, part.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw ball with rings
      ctx.fillStyle = "rgba(0,0,0,0.24)";
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r * 1.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "rgba(0,0,0,0.40)";
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "rgba(0,0,0,0.66)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.stroke();

      // Inner rings for depth
      if (b.r > 20) {
        ctx.strokeStyle = "rgba(0,0,0,0.32)";
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r * 0.6, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Count in center
      ctx.fillStyle = "rgba(0,0,0,0.81)";
      ctx.font = `bold ${Math.max(10, b.r * 0.35)}px 'IBM Plex Mono', monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(`${absorbed}`, b.x, b.y);
      ctx.textBaseline = "alphabetic";

      frameRef.current = requestAnimationFrame(loop);
    }
    frameRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frameRef.current);
      canvas.removeEventListener("mousemove", handleMove);
    };
  }, [width, height]);

  return <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} />;
}

/* ═══════════════════════════════════════════════════
   7. Garden — mouse plants seeds that grow into flowers,
   trees, and bushes. The garden fills up over time.
   Flowers sway. Everything feels alive.
   ═══════════════════════════════════════════════════ */
export function GardenVisual({ width, height }: VisualProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const state = useRef({
    mouse: { x: -1, y: -1 },
    plants: [] as { x: number; groundY: number; growth: number; maxH: number; type: number; sway: number; bloomed: boolean }[],
    time: 0,
    plantTimer: 0,
  });
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = width;
    canvas.height = height;

    const s = state.current;
    s.plants = [];

    const handleMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      s.mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const handleLeave = () => { s.mouse = { x: -1, y: -1 }; };
    canvas.addEventListener("mousemove", handleMove);
    canvas.addEventListener("mouseleave", handleLeave);

    function loop() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      s.time += 0.016;

      // Plant seeds wherever the mouse moves — plants grow upward from that spot
      if (s.mouse.x >= 0 && s.plants.length < 60) {
        s.plantTimer++;
        if (s.plantTimer > 6) {
          s.plants.push({
            x: s.mouse.x + (Math.random() - 0.5) * 40,
            groundY: s.mouse.y + (Math.random() - 0.5) * 20,
            growth: 0,
            maxH: 30 + Math.random() * 80,
            type: Math.floor(Math.random() * 4),
            sway: Math.random() * Math.PI * 2,
            bloomed: false,
          });
          s.plantTimer = 0;
        }
      }

      // Grow and draw plants
      for (const plant of s.plants) {
        plant.growth = Math.min(1, plant.growth + 0.006);
        const h = plant.maxH * plant.growth;
        const sway = Math.sin(s.time * 1.5 + plant.sway) * (2 + plant.growth * 3);
        const stemTop = plant.groundY - h;

        // Stem
        ctx.strokeStyle = `rgba(0,0,0,${0.3 + plant.growth * 0.35})`;
        ctx.lineWidth = 1 + plant.growth;
        ctx.beginPath();
        ctx.moveTo(plant.x, plant.groundY);
        // Curved stem
        ctx.quadraticCurveTo(plant.x + sway * 0.5, plant.groundY - h * 0.5, plant.x + sway, stemTop);
        ctx.stroke();

        // Bloom when grown enough
        if (plant.growth > 0.4) {
          const bloom = (plant.growth - 0.4) / 0.6;
          const bx = plant.x + sway;
          const by = stemTop;

          if (plant.type === 0) {
            // Big flower with petals
            const petalCount = 6;
            for (let p = 0; p < petalCount; p++) {
              const pAngle = (p / petalCount) * Math.PI * 2 + s.time * 0.3;
              const pr = 5 + bloom * 12;
              const px = bx + Math.cos(pAngle) * pr * 0.5;
              const py = by + Math.sin(pAngle) * pr * 0.5;
              ctx.fillStyle = `rgba(0,0,0,${bloom * 0.35})`;
              ctx.beginPath();
              ctx.ellipse(px, py, pr * 0.6, pr * 0.3, pAngle, 0, Math.PI * 2);
              ctx.fill();
            }
            // Center
            ctx.fillStyle = `rgba(0,0,0,${bloom * 0.45})`;
            ctx.beginPath();
            ctx.arc(bx, by, 3 + bloom * 4, 0, Math.PI * 2);
            ctx.fill();
          } else if (plant.type === 1) {
            // Conifer / triangle tree
            const treeH = bloom * 30;
            const treeW = bloom * 18;
            ctx.fillStyle = `rgba(0,0,0,${bloom * 0.35})`;
            ctx.beginPath();
            ctx.moveTo(bx, by - treeH * 0.3);
            ctx.lineTo(bx - treeW / 2, by + treeH * 0.7);
            ctx.lineTo(bx + treeW / 2, by + treeH * 0.7);
            ctx.closePath();
            ctx.fill();
            ctx.strokeStyle = `rgba(0,0,0,${bloom * 0.45})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          } else if (plant.type === 2) {
            // Bush — cluster of circles
            for (let b2 = 0; b2 < 5; b2++) {
              const angle = (b2 / 5) * Math.PI * 2;
              const br = 4 + bloom * 8;
              const bx2 = bx + Math.cos(angle + s.time * 0.5) * br * 0.4;
              const by2 = by + Math.sin(angle + s.time * 0.5) * br * 0.3;
              ctx.fillStyle = `rgba(0,0,0,${bloom * 0.455})`;
              ctx.beginPath();
              ctx.arc(bx2, by2, br * 0.6, 0, Math.PI * 2);
              ctx.fill();
            }
          } else {
            // Tall grass / wheat
            for (let g = -2; g <= 2; g++) {
              const gAngle = g * 0.15 + Math.sin(s.time * 2 + plant.sway) * 0.1;
              const gLen = bloom * 15;
              const gx2 = bx + Math.cos(-Math.PI / 2 + gAngle) * gLen;
              const gy2 = by + Math.sin(-Math.PI / 2 + gAngle) * gLen;
              ctx.strokeStyle = `rgba(0,0,0,${bloom * 0.4})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(bx, by);
              ctx.lineTo(gx2, gy2);
              ctx.stroke();
              // Seed head
              ctx.fillStyle = `rgba(0,0,0,${bloom * 0.35})`;
              ctx.beginPath();
              ctx.ellipse(gx2, gy2, 2, 4, -Math.PI / 2 + gAngle, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      }

      ctx.fillStyle = "rgba(0,0,0,0.66)";
      ctx.font = "bold 9px 'IBM Plex Mono', monospace";
      ctx.textAlign = "left";
      ctx.fillText(`PLANTED: ${s.plants.length}`, 10, height - 10);

      frameRef.current = requestAnimationFrame(loop);
    }
    frameRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frameRef.current);
      canvas.removeEventListener("mousemove", handleMove);
      canvas.removeEventListener("mouseleave", handleLeave);
    };
  }, [width, height]);

  return <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} />;
}

/* ═══════════════════════════════════════════════════
   8. Signal Amplifier — waves start tiny, grow massive
   with mouse presence. Multiple frequency layers.
   Feels like a heartbeat / EKG getting stronger.
   ═══════════════════════════════════════════════════ */
export function SignalVisual({ width, height }: VisualProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const state = useRef({
    mouse: { active: false, y: height / 2 },
    amplitude: 3,
    time: 0,
    peak: 3,
  });
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = width;
    canvas.height = height;

    const s = state.current;

    const handleMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      s.mouse = { active: true, y: e.clientY - rect.top };
    };
    const handleLeave = () => { s.mouse.active = false; };
    canvas.addEventListener("mousemove", handleMove);
    canvas.addEventListener("mouseleave", handleLeave);

    function loop() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      s.time += 0.025;

      if (s.mouse.active) {
        s.amplitude = Math.min(height * 0.42, s.amplitude + 1.2);
      } else {
        s.amplitude = Math.max(3, s.amplitude - 0.5);
      }
      s.peak = Math.max(s.peak, s.amplitude);

      const centerY = height / 2;

      // Background grid
      ctx.strokeStyle = "rgba(0,0,0,0.12)";
      ctx.lineWidth = 0.5;
      for (let y = 0; y < height; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      for (let x = 0; x < width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Draw multiple wave layers
      const layers = 5;
      for (let l = 0; l < layers; l++) {
        const amp = s.amplitude * (1 - l * 0.18);
        const freq = 0.012 + l * 0.004;
        const phase = s.time * (1.2 - l * 0.15) + l * 1.2;
        const alpha = 0.25 - l * 0.04;
        const lineW = 2.5 - l * 0.4;

        ctx.strokeStyle = `rgba(0,0,0,${alpha})`;
        ctx.lineWidth = lineW;
        ctx.beginPath();
        for (let x = 0; x <= width; x += 1) {
          // Complex wave — sum of multiple frequencies for organic feel
          const y = centerY
            + Math.sin(x * freq + phase) * amp
            * (0.5 + 0.5 * Math.sin(x * 0.004 + s.time * 0.3))
            + Math.sin(x * freq * 2.7 + phase * 1.3) * amp * 0.15;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Fill between top and bottom wave for depth
      ctx.fillStyle = `rgba(0,0,0,0.12)`;
      ctx.beginPath();
      for (let x = 0; x <= width; x += 2) {
        const y = centerY + Math.sin(x * 0.012 + s.time * 1.2) * s.amplitude * (0.5 + 0.5 * Math.sin(x * 0.004 + s.time * 0.3));
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      for (let x = width; x >= 0; x -= 2) {
        const y = centerY - Math.sin(x * 0.012 + s.time * 1.2 + 0.5) * s.amplitude * 0.3;
        ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();

      // Labels
      ctx.fillStyle = "rgba(0,0,0,0.66)";
      ctx.font = "bold 9px 'IBM Plex Mono', monospace";
      ctx.textAlign = "left";
      ctx.fillText(`SIGNAL: ${Math.round(s.amplitude)}dB`, 10, height - 10);
      ctx.textAlign = "right";
      ctx.fillText(`PEAK: ${Math.round(s.peak)}dB`, width - 10, height - 10);

      frameRef.current = requestAnimationFrame(loop);
    }
    frameRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frameRef.current);
      canvas.removeEventListener("mousemove", handleMove);
      canvas.removeEventListener("mouseleave", handleLeave);
    };
  }, [width, height]);

  return <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} />;
}

/* ═══════════════════════════════════════════════════
   9. Blueprint Unfold — a growth system diagram that
   reveals as you mouse over it. Boxes, connections,
   labels all progressively appear. Feels like a
   strategy blueprint being drawn in real-time.
   ═══════════════════════════════════════════════════ */
export function BlueprintVisual({ width, height }: VisualProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const state = useRef({
    mouse: { x: width / 2, y: height / 2 },
    reveal: 0,
    time: 0,
  });
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = width;
    canvas.height = height;

    const s = state.current;

    const boxes = [
      { x: 0.08, y: 0.08, w: 0.22, h: 0.14, label: "POSITIONING" },
      { x: 0.58, y: 0.06, w: 0.32, h: 0.14, label: "CHANNELS" },
      { x: 0.05, y: 0.32, w: 0.25, h: 0.14, label: "ACQUISITION" },
      { x: 0.38, y: 0.30, w: 0.25, h: 0.14, label: "ACTIVATION" },
      { x: 0.70, y: 0.32, w: 0.25, h: 0.14, label: "RETENTION" },
      { x: 0.05, y: 0.56, w: 0.28, h: 0.14, label: "MONETIZATION" },
      { x: 0.42, y: 0.56, w: 0.25, h: 0.14, label: "REFERRAL" },
      { x: 0.25, y: 0.78, w: 0.50, h: 0.16, label: "GROWTH ENGINE" },
    ];
    const connections = [
      [0, 2], [0, 3], [1, 3], [1, 4],
      [2, 5], [3, 5], [3, 6], [4, 6],
      [5, 7], [6, 7], [2, 7], [4, 7],
    ];

    const handleMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      s.mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      s.reveal = Math.min(1, s.reveal + 0.004);
    };
    canvas.addEventListener("mousemove", handleMove);

    function loop() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      s.time += 0.01;

      const r = s.reveal;

      // Blueprint dot grid
      ctx.fillStyle = `rgba(0,0,0,${0.1 * Math.min(1, r * 3)})`;
      for (let x = 0; x < width; x += 12) {
        for (let y = 0; y < height; y += 12) {
          ctx.fillRect(x, y, 1, 1);
        }
      }

      // Connections — draw as animated dashed lines
      for (let ci = 0; ci < connections.length; ci++) {
        const threshold = ci / connections.length * 0.6;
        if (r < threshold) continue;
        const [a, b] = connections[ci];
        const ba = boxes[a], bb = boxes[b];
        const ax = (ba.x + ba.w / 2) * width;
        const ay = (ba.y + ba.h / 2) * height;
        const bx = (bb.x + bb.w / 2) * width;
        const by = (bb.y + bb.h / 2) * height;
        const progress = Math.min(1, (r - threshold) / 0.3);

        // Animated line drawing
        const mx = ax + (bx - ax) * progress;
        const my = ay + (by - ay) * progress;

        ctx.strokeStyle = `rgba(0,0,0,${0.12 * progress})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 4]);
        ctx.lineDashOffset = -s.time * 20;
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(mx, my);
        ctx.stroke();
        ctx.setLineDash([]);

        // Arrow at end
        if (progress > 0.9) {
          const angle = Math.atan2(by - ay, bx - ax);
          ctx.fillStyle = `rgba(0,0,0,${0.15 * progress})`;
          ctx.beginPath();
          ctx.moveTo(mx, my);
          ctx.lineTo(mx - Math.cos(angle - 0.4) * 6, my - Math.sin(angle - 0.4) * 6);
          ctx.lineTo(mx - Math.cos(angle + 0.4) * 6, my - Math.sin(angle + 0.4) * 6);
          ctx.closePath();
          ctx.fill();
        }
      }

      // Boxes
      for (let i = 0; i < boxes.length; i++) {
        const threshold = i / boxes.length * 0.5;
        if (r < threshold) continue;
        const box = boxes[i];
        const progress = Math.min(1, (r - threshold) / 0.25);

        const bx = box.x * width;
        const by = box.y * height;
        const bw = box.w * width;
        const bh = box.h * height;

        // Box fill
        ctx.fillStyle = `rgba(0,0,0,${0.04 * progress})`;
        ctx.fillRect(bx, by, bw * progress, bh * progress);

        // Box border — draws progressively
        ctx.strokeStyle = `rgba(0,0,0,${0.2 * progress})`;
        ctx.lineWidth = 1;
        ctx.strokeRect(bx, by, bw * progress, bh * progress);

        // Corner markers
        if (progress > 0.5) {
          const cp = (progress - 0.5) * 2;
          const cornerSize = 4;
          ctx.strokeStyle = `rgba(0,0,0,${0.3 * cp})`;
          ctx.lineWidth = 1.5;
          // Top-left
          ctx.beginPath();
          ctx.moveTo(bx, by + cornerSize);
          ctx.lineTo(bx, by);
          ctx.lineTo(bx + cornerSize, by);
          ctx.stroke();
          // Top-right
          const bx2 = bx + bw * progress;
          ctx.beginPath();
          ctx.moveTo(bx2 - cornerSize, by);
          ctx.lineTo(bx2, by);
          ctx.lineTo(bx2, by + cornerSize);
          ctx.stroke();
          // Bottom corners
          const by2 = by + bh * progress;
          ctx.beginPath();
          ctx.moveTo(bx, by2 - cornerSize);
          ctx.lineTo(bx, by2);
          ctx.lineTo(bx + cornerSize, by2);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(bx2 - cornerSize, by2);
          ctx.lineTo(bx2, by2);
          ctx.lineTo(bx2, by2 - cornerSize);
          ctx.stroke();
        }

        // Label
        if (progress > 0.6) {
          const lp = (progress - 0.6) / 0.4;
          ctx.fillStyle = `rgba(0,0,0,${0.4 * lp})`;
          ctx.font = "bold 9px 'IBM Plex Mono', monospace";
          ctx.textAlign = "center";
          ctx.fillText(box.label, bx + (bw * progress) / 2, by + (bh * progress) / 2 + 3);
        }
      }

      // Reveal %
      ctx.fillStyle = "rgba(0,0,0,0.66)";
      ctx.font = "bold 9px 'IBM Plex Mono', monospace";
      ctx.textAlign = "left";
      ctx.fillText(`BLUEPRINT: ${Math.round(r * 100)}%`, 10, height - 10);

      frameRef.current = requestAnimationFrame(loop);
    }
    frameRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frameRef.current);
      canvas.removeEventListener("mousemove", handleMove);
    };
  }, [width, height]);

  return <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} />;
}

/* ═══════════════════════════════════════════════════
   10. Evolution Chain — Spore-inspired. A creature starts
   as a dot and evolves through stages as you interact.
   Gets more complex: limbs, features, orbiting elements.
   Shows stage name + progress bar.
   ═══════════════════════════════════════════════════ */
export function EvolutionVisual({ width, height }: VisualProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const state = useRef({
    mouse: { active: false },
    evo: 0,
    time: 0,
    particles: [] as { angle: number; dist: number; speed: number; size: number }[],
  });
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = width;
    canvas.height = height;

    const s = state.current;
    // Ambient particles
    s.particles = Array.from({ length: 30 }, () => ({
      angle: Math.random() * Math.PI * 2,
      dist: 40 + Math.random() * 80,
      speed: 0.2 + Math.random() * 0.5,
      size: 1 + Math.random() * 2,
    }));

    const stages = [
      { name: "SEED", bodyR: 8, limbs: 0, features: 0 },
      { name: "SPROUT", bodyR: 14, limbs: 2, features: 0 },
      { name: "SAPLING", bodyR: 20, limbs: 4, features: 1 },
      { name: "SYSTEM", bodyR: 28, limbs: 6, features: 2 },
      { name: "ENGINE", bodyR: 36, limbs: 8, features: 3 },
      { name: "MACHINE", bodyR: 46, limbs: 10, features: 4 },
    ];

    const handleEnter = () => { s.mouse.active = true; };
    const handleLeave = () => { s.mouse.active = false; };
    canvas.addEventListener("mouseenter", handleEnter);
    canvas.addEventListener("mouseleave", handleLeave);

    function loop() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      s.time += 0.02;

      if (s.mouse.active) {
        s.evo = Math.min(stages.length - 1, s.evo + 0.008);
      } else {
        s.evo = Math.max(0, s.evo - 0.003);
      }

      const stageIdx = Math.floor(s.evo);
      const stageProg = s.evo - stageIdx;
      const stage = stages[stageIdx];
      const nextStage = stages[Math.min(stageIdx + 1, stages.length - 1)];
      const bodyR = stage.bodyR + (nextStage.bodyR - stage.bodyR) * stageProg;
      const limbCount = Math.round(stage.limbs + (nextStage.limbs - stage.limbs) * stageProg);
      const featureCount = Math.round(stage.features + (nextStage.features - stage.features) * stageProg);

      const cx = width / 2;
      const cy = height * 0.45;
      const bob = Math.sin(s.time * 2) * 4;
      const breathe = 1 + Math.sin(s.time * 3) * 0.04;

      // Ambient particles
      for (const p of s.particles) {
        p.angle += p.speed * 0.01;
        const px = cx + Math.cos(p.angle) * (p.dist + bodyR);
        const py = cy + bob + Math.sin(p.angle) * (p.dist + bodyR) * 0.6;
        const alpha = 0.05 + (s.evo / 5) * 0.08;
        ctx.fillStyle = `rgba(0,0,0,${alpha})`;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Orbit rings
      if (s.evo > 1) {
        for (let ring = 0; ring < Math.min(3, Math.floor(s.evo)); ring++) {
          const ringR = bodyR * (1.8 + ring * 0.7);
          ctx.strokeStyle = `rgba(0,0,0,${0.04 + ring * 0.02})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.ellipse(cx, cy + bob, ringR, ringR * 0.5, 0, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // Limbs / extensions
      for (let i = 0; i < limbCount; i++) {
        const angle = (i / limbCount) * Math.PI * 2 + s.time * 0.5;
        const limbLen = bodyR * (0.6 + (s.evo / 5) * 0.6);
        const lx = cx + Math.cos(angle) * (bodyR * breathe + limbLen * 0.3);
        const ly = cy + bob + Math.sin(angle) * (bodyR * breathe + limbLen * 0.3) * 0.7;
        const lx2 = cx + Math.cos(angle) * (bodyR * breathe + limbLen);
        const ly2 = cy + bob + Math.sin(angle) * (bodyR * breathe + limbLen) * 0.7;

        ctx.strokeStyle = `rgba(0,0,0,${0.15 + s.evo * 0.03})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(lx, ly);
        ctx.lineTo(lx2, ly2);
        ctx.stroke();

        // Limb tip
        ctx.fillStyle = `rgba(0,0,0,${0.12 + s.evo * 0.02})`;
        ctx.beginPath();
        ctx.arc(lx2, ly2, 2 + s.evo * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Pulse rings
      if (s.evo > 2) {
        const pulseCount = Math.floor(s.evo) - 1;
        for (let p = 0; p < pulseCount; p++) {
          const phase = (s.time * 2 + p * 1.5) % 4;
          if (phase < 3) {
            const pulseR = bodyR + phase * 15;
            const pulseAlpha = (1 - phase / 3) * 0.1;
            ctx.strokeStyle = `rgba(0,0,0,${pulseAlpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(cx, cy + bob, pulseR * breathe, 0, Math.PI * 2);
            ctx.stroke();
          }
        }
      }

      // Main body — outer glow
      ctx.fillStyle = `rgba(0,0,0,0.16)`;
      ctx.beginPath();
      ctx.arc(cx, cy + bob, bodyR * breathe * 1.6, 0, Math.PI * 2);
      ctx.fill();

      // Main body
      ctx.fillStyle = `rgba(0,0,0,${0.2 + s.evo * 0.06})`;
      ctx.beginPath();
      ctx.arc(cx, cy + bob, bodyR * breathe, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = `rgba(0,0,0,${0.25 + s.evo * 0.04})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy + bob, bodyR * breathe, 0, Math.PI * 2);
      ctx.stroke();

      // Inner features
      if (featureCount >= 1) {
        // Core
        ctx.fillStyle = `rgba(0,0,0,0.36)`;
        ctx.beginPath();
        ctx.arc(cx, cy + bob, bodyR * 0.4, 0, Math.PI * 2);
        ctx.fill();
      }
      if (featureCount >= 2) {
        // Eyes
        const eyeSpread = bodyR * 0.35;
        ctx.fillStyle = `rgba(0,0,0,0.60)`;
        ctx.beginPath();
        ctx.arc(cx - eyeSpread, cy + bob - bodyR * 0.15, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(cx + eyeSpread, cy + bob - bodyR * 0.15, 3, 0, Math.PI * 2);
        ctx.fill();
      }
      if (featureCount >= 3) {
        // Inner ring detail
        ctx.strokeStyle = "rgba(0,0,0,0.32)";
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.arc(cx, cy + bob, bodyR * 0.65, 0, Math.PI * 2);
        ctx.stroke();
      }
      if (featureCount >= 4) {
        // Crown / top feature
        const crownY = cy + bob - bodyR * breathe;
        for (let c = -2; c <= 2; c++) {
          ctx.fillStyle = "rgba(0,0,0,0.45)";
          ctx.beginPath();
          ctx.arc(cx + c * 6, crownY - 5, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Stage label
      ctx.fillStyle = "rgba(0,0,0,0.77)";
      ctx.font = "bold 10px 'IBM Plex Mono', monospace";
      ctx.textAlign = "center";
      ctx.fillText(stage.name, cx, cy + bob + bodyR * breathe + 22);

      // Evolution progress bar
      const barW = width * 0.6;
      const barX = (width - barW) / 2;
      const barY = height - 20;
      ctx.fillStyle = "rgba(0,0,0,0.20)";
      ctx.fillRect(barX, barY, barW, 5);
      ctx.fillStyle = "rgba(0,0,0,0.60)";
      ctx.fillRect(barX, barY, barW * (s.evo / (stages.length - 1)), 5);
      ctx.strokeStyle = "rgba(0,0,0,0.40)";
      ctx.lineWidth = 0.5;
      ctx.strokeRect(barX, barY, barW, 5);

      // Stage markers on bar
      for (let i = 0; i < stages.length; i++) {
        const mx2 = barX + (i / (stages.length - 1)) * barW;
        ctx.fillStyle = s.evo >= i ? "rgba(0,0,0,0.55)" : "rgba(0,0,0,0.32)";
        ctx.fillRect(mx2 - 1, barY - 2, 2, 9);
      }

      frameRef.current = requestAnimationFrame(loop);
    }
    frameRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frameRef.current);
      canvas.removeEventListener("mouseenter", handleEnter);
      canvas.removeEventListener("mouseleave", handleLeave);
    };
  }, [width, height]);

  return <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} />;
}

/* ═══════════════════════════════════════════════════
   11. Rube Goldberg Engine — interlocking gears activated by mouse proximity
   Mouse proximity adds energy to the nearest gear; energy propagates
   through meshing neighbours. Idle gears slowly wind down.
   ═══════════════════════════════════════════════════ */
export function MachineVisual({ width, height }: VisualProps) {
  const [Scene, setScene] = useState<React.ComponentType<{ width: number; height: number }> | null>(null);

  useEffect(() => {
    import("./MachineScene").then((mod) => setScene(() => mod.default));
  }, []);

  if (!Scene) return null;
  return <Scene width={width} height={height} />;
}


/* ═══════════════════════════════════════════════════
   12. Circuit Board — signals flow along PCB-style traces
   Mouse proximity lights up nearby nodes and speeds signal flow.
   Nodes pulse when signals pass through. Ambient slow flow.
   ═══════════════════════════════════════════════════ */
export function CircuitVisual({ width, height }: { width: number; height: number }) {
  const [Scene, setScene] = useState<any>(null);
  useEffect(() => {
    import("./CircuitScene").then(mod => setScene(() => mod.default));
  }, []);
  if (!Scene) return null;
  return <Scene width={width} height={height} />;
}

/* ═══════════════════════════════════════════════════
   13. Compound Interest Curve — a single exponential line graph
   Mouse X controls how far the curve is revealed.
   Milestones appear along the path. Particles trail the leading edge.
   ═══════════════════════════════════════════════════ */
export function CompoundVisual({ width, height }: VisualProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const state = useRef({
    mouse: { x: 0, active: false },
    revealT: 0,
    particles: [] as {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      life: number;
    }[],
    time: 0,
  });
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = width;
    canvas.height = height;

    const s = state.current;

    const marginL = 60;
    const marginR = 40;
    const marginT = 40;
    const marginB = 60;
    const gw = width - marginL - marginR;
    const gh = height - marginT - marginB;

    const milestones = [
      { t: 0.2, label: "First 100 users" },
      { t: 0.4, label: "Product-market fit" },
      { t: 0.6, label: "Channel-market fit" },
      { t: 0.8, label: "Scale" },
    ];

    // Exponential curve: flat for ~60% then hockey-stick
    const k = 6;
    const expDenom = Math.exp(k) - 1;
    function curveY(t: number) {
      return (Math.exp(k * t) - 1) / expDenom;
    }

    function toCanvas(t: number): { x: number; y: number } {
      return {
        x: marginL + t * gw,
        y: marginT + gh - curveY(t) * gh,
      };
    }

    const handleMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      s.mouse.x = (e.clientX - rect.left) / rect.width;
      s.mouse.active = true;
    };
    const handleLeave = () => {
      s.mouse.active = false;
    };
    canvas.addEventListener("mousemove", handleMove);
    canvas.addEventListener("mouseleave", handleLeave);

    function loop() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      s.time += 0.016;

      // Ease revealT toward target
      const target = s.mouse.active
        ? Math.max(0.02, Math.min(1, s.mouse.x))
        : 0;
      const speed = s.mouse.active ? 0.04 : 0.015;
      s.revealT += (target - s.revealT) * speed;
      if (s.revealT < 0.001) s.revealT = 0;

      const reveal = s.revealT;

      // --- Grid lines (very faint) ---
      ctx.strokeStyle = "rgba(0,0,0,0.04)";
      ctx.lineWidth = 0.5;
      const gridCountX = 12;
      const gridCountY = 8;
      for (let i = 0; i <= gridCountX; i++) {
        const x = marginL + (i / gridCountX) * gw;
        ctx.beginPath();
        ctx.moveTo(x, marginT);
        ctx.lineTo(x, marginT + gh);
        ctx.stroke();
      }
      for (let i = 0; i <= gridCountY; i++) {
        const y = marginT + (i / gridCountY) * gh;
        ctx.beginPath();
        ctx.moveTo(marginL, y);
        ctx.lineTo(marginL + gw, y);
        ctx.stroke();
      }

      // --- Axes ---
      ctx.strokeStyle = "rgba(0,0,0,0.15)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(marginL, marginT);
      ctx.lineTo(marginL, marginT + gh);
      ctx.lineTo(marginL + gw, marginT + gh);
      ctx.stroke();

      // Axis labels
      ctx.fillStyle = "rgba(0,0,0,0.25)";
      ctx.font = "9px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "alphabetic";
      ctx.fillText("TIME \u2192", marginL + gw / 2, marginT + gh + 30);
      ctx.save();
      ctx.translate(18, marginT + gh / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText("\u2191 GROWTH", 0, 0);
      ctx.restore();

      // --- Draw curve ---
      if (reveal > 0.001) {
        ctx.strokeStyle = "rgba(0,0,0,0.7)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        const steps = Math.floor(reveal * 200);
        for (let i = 0; i <= steps; i++) {
          const t = i / 200;
          const p = toCanvas(t);
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();

        // Leading edge dot
        const edge = toCanvas(reveal);
        ctx.fillStyle = "rgba(0,0,0,0.8)";
        ctx.beginPath();
        ctx.arc(edge.x, edge.y, 4, 0, Math.PI * 2);
        ctx.fill();

        // Spawn trail particles at edge
        if (Math.random() < 0.3 && reveal > 0.01) {
          s.particles.push({
            x: edge.x,
            y: edge.y,
            vx: (Math.random() - 0.5) * 1.5,
            vy: (Math.random() - 0.5) * 1.5,
            alpha: 0.4,
            life: 1,
          });
        }

        // --- Milestones ---
        for (const ms of milestones) {
          if (ms.t > reveal) continue;
          const p = toCanvas(ms.t);

          // Dot
          ctx.fillStyle = "rgba(0,0,0,0.6)";
          ctx.beginPath();
          ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
          ctx.fill();

          // Dashed line down to x-axis
          ctx.save();
          ctx.setLineDash([2, 3]);
          ctx.strokeStyle = "rgba(0,0,0,0.1)";
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x, marginT + gh);
          ctx.stroke();
          ctx.restore();

          // Label
          ctx.fillStyle = "rgba(0,0,0,0.5)";
          ctx.font = "9px monospace";
          ctx.textAlign = "left";
          ctx.textBaseline = "alphabetic";
          ctx.fillText(ms.label, p.x + 6, p.y - 10);
        }
      }

      // --- Particles ---
      for (let i = s.particles.length - 1; i >= 0; i--) {
        const p = s.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.015;
        p.alpha = p.life * 0.3;
        if (p.life <= 0) {
          s.particles.splice(i, 1);
          continue;
        }
        ctx.fillStyle = `rgba(0,0,0,${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
      if (s.particles.length > 60)
        s.particles.splice(0, s.particles.length - 60);

      // --- Bottom-left label ---
      const pct = Math.round(reveal * 100);
      ctx.fillStyle = "rgba(0,0,0,0.35)";
      ctx.font = "bold 11px monospace";
      ctx.textAlign = "left";
      ctx.textBaseline = "alphabetic";
      ctx.fillText(`COMPOUND GROWTH  ${pct}%`, marginL, height - 14);

      frameRef.current = requestAnimationFrame(loop);
    }

    frameRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frameRef.current);
      canvas.removeEventListener("mousemove", handleMove);
      canvas.removeEventListener("mouseleave", handleLeave);
    };
  }, [width, height]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════
   14. Flywheel — a heavy industrial wheel with momentum
   Mouse movement adds angular velocity. Spins with inertia.
   Labels orbit around the rim. Particles fly off when fast.
   ═══════════════════════════════════════════════════ */
export function FlywheelVisual({ width, height }: VisualProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const state = useRef({
    mouse: { x: 0, y: 0, prevX: 0, prevY: 0, active: false },
    angle: 0,
    angularVel: 0,
    particles: [] as {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      life: number;
    }[],
    time: 0,
    wobble: 0,
  });
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = width;
    canvas.height = height;

    const s = state.current;
    const cx = width / 2;
    const cy = height / 2;
    const radius = Math.min(width, height) * 0.38;
    const rimWidth = radius * 0.12;
    const spokeCount = 8;
    const labels = ["CONTENT", "TRAFFIC", "LEADS", "REVENUE", "REINVEST"];

    const handleMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      s.mouse.prevX = s.mouse.x;
      s.mouse.prevY = s.mouse.y;
      s.mouse.x = e.clientX - rect.left;
      s.mouse.y = e.clientY - rect.top;
      s.mouse.active = true;

      // Cross product gives tangential component of mouse movement
      const dx = s.mouse.x - cx;
      const dy = s.mouse.y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > 20) {
        const mdx = s.mouse.x - s.mouse.prevX;
        const mdy = s.mouse.y - s.mouse.prevY;
        const cross = (dx * mdy - dy * mdx) / (dist * dist);
        s.angularVel += cross * 0.8;
      }
    };
    const handleLeave = () => {
      s.mouse.active = false;
    };
    const handleEnter = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      s.mouse.x = e.clientX - rect.left;
      s.mouse.y = e.clientY - rect.top;
      s.mouse.prevX = s.mouse.x;
      s.mouse.prevY = s.mouse.y;
      s.mouse.active = true;
    };
    canvas.addEventListener("mousemove", handleMove);
    canvas.addEventListener("mouseleave", handleLeave);
    canvas.addEventListener("mouseenter", handleEnter);

    function loop() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      s.time += 0.016;

      // Friction
      s.angularVel *= 0.995;

      // Clamp max speed
      const maxVel = 0.15;
      if (s.angularVel > maxVel) s.angularVel = maxVel;
      if (s.angularVel < -maxVel) s.angularVel = -maxVel;

      // Wobble when nearly still
      const absVel = Math.abs(s.angularVel);
      if (absVel < 0.002) {
        s.wobble += 0.03;
        s.angle += Math.sin(s.wobble) * 0.001;
      } else {
        s.angle += s.angularVel;
        s.wobble = 0;
      }

      const rpm = Math.round(
        (Math.abs(s.angularVel) * 60) / (Math.PI * 2) * 60
      );
      const intensity = Math.min(1, absVel / 0.08);

      // --- Rim ---
      const outerR = radius;
      const innerR = radius - rimWidth;
      const baseAlpha = 0.15 + intensity * 0.55;

      ctx.beginPath();
      ctx.arc(cx, cy, outerR, 0, Math.PI * 2);
      ctx.arc(cx, cy, innerR, 0, Math.PI * 2, true);
      ctx.fillStyle = `rgba(0,0,0,${baseAlpha * 0.3})`;
      ctx.fill();

      ctx.strokeStyle = `rgba(0,0,0,${baseAlpha})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, outerR, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx, cy, innerR, 0, Math.PI * 2);
      ctx.stroke();

      // --- Hub ---
      const hubR = radius * 0.1;
      ctx.fillStyle = `rgba(0,0,0,${baseAlpha * 0.4})`;
      ctx.beginPath();
      ctx.arc(cx, cy, hubR, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = `rgba(0,0,0,${baseAlpha})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // --- Spokes with motion blur ---
      const blurCopies = intensity > 0.3 ? Math.floor(intensity * 4) : 0;
      for (let b = -blurCopies; b <= 0; b++) {
        const blurAngle = s.angle + b * s.angularVel * 0.5;
        const blurAlpha = b === 0 ? baseAlpha : baseAlpha * 0.12;
        ctx.strokeStyle = `rgba(0,0,0,${blurAlpha})`;
        ctx.lineWidth = b === 0 ? 1.5 : 1;
        for (let i = 0; i < spokeCount; i++) {
          const a = blurAngle + (i / spokeCount) * Math.PI * 2;
          const sx = cx + Math.cos(a) * (hubR + 2);
          const sy = cy + Math.sin(a) * (hubR + 2);
          const ex = cx + Math.cos(a) * (innerR - 2);
          const ey = cy + Math.sin(a) * (innerR - 2);
          ctx.beginPath();
          ctx.moveTo(sx, sy);
          ctx.lineTo(ex, ey);
          ctx.stroke();
        }
      }

      // --- Center "DC" text ---
      ctx.fillStyle = `rgba(0,0,0,${0.2 + intensity * 0.4})`;
      ctx.font = `bold ${Math.round(hubR * 0.9)}px monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("DC", cx, cy + 1);

      // --- Orbiting labels ---
      const labelR = outerR + 22;
      ctx.font = "9px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      for (let i = 0; i < labels.length; i++) {
        const a = s.angle + (i / labels.length) * Math.PI * 2;
        const lx = cx + Math.cos(a) * labelR;
        const ly = cy + Math.sin(a) * labelR;
        ctx.fillStyle = `rgba(0,0,0,${0.25 + intensity * 0.35})`;

        ctx.save();
        ctx.translate(lx, ly);
        ctx.rotate(a + Math.PI / 2);
        ctx.fillText(labels[i], 0, 0);
        ctx.restore();

        // Arrow to next label
        const midA = a + (1 / labels.length) * Math.PI;
        const arrowR = outerR + 14;
        const ax = cx + Math.cos(midA) * arrowR;
        const ay = cy + Math.sin(midA) * arrowR;
        ctx.fillStyle = `rgba(0,0,0,${0.15 + intensity * 0.2})`;
        ctx.font = "8px monospace";
        ctx.save();
        ctx.translate(ax, ay);
        ctx.rotate(midA + Math.PI / 2);
        ctx.fillText("\u2192", 0, 0);
        ctx.restore();
        // Reset font for next label iteration
        ctx.font = "9px monospace";
      }

      // --- Centrifugal particles ---
      if (absVel > 0.02 && Math.random() < intensity * 0.5) {
        const spawnAngle = s.angle + Math.random() * Math.PI * 2;
        const px = cx + Math.cos(spawnAngle) * outerR;
        const py = cy + Math.sin(spawnAngle) * outerR;
        const tangentDir = s.angularVel > 0 ? 1 : -1;
        const outVx = Math.cos(spawnAngle) * absVel * 15;
        const outVy = Math.sin(spawnAngle) * absVel * 15;
        const tanVx =
          -Math.sin(spawnAngle) * tangentDir * absVel * 10;
        const tanVy =
          Math.cos(spawnAngle) * tangentDir * absVel * 10;
        s.particles.push({
          x: px,
          y: py,
          vx: outVx + tanVx + (Math.random() - 0.5),
          vy: outVy + tanVy + (Math.random() - 0.5),
          alpha: 0.3 + intensity * 0.3,
          life: 1,
        });
      }

      // Update & draw particles
      for (let i = s.particles.length - 1; i >= 0; i--) {
        const p = s.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.97;
        p.vy *= 0.97;
        p.life -= 0.02;
        p.alpha = p.life * 0.3;
        if (p.life <= 0) {
          s.particles.splice(i, 1);
          continue;
        }
        ctx.fillStyle = `rgba(0,0,0,${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
      if (s.particles.length > 80)
        s.particles.splice(0, s.particles.length - 80);

      // --- RPM indicator bottom-left ---
      ctx.fillStyle = "rgba(0,0,0,0.35)";
      ctx.font = "bold 11px monospace";
      ctx.textAlign = "left";
      ctx.textBaseline = "alphabetic";
      ctx.fillText(`RPM: ${rpm}`, 20, height - 14);

      frameRef.current = requestAnimationFrame(loop);
    }

    frameRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frameRef.current);
      canvas.removeEventListener("mousemove", handleMove);
      canvas.removeEventListener("mouseleave", handleLeave);
      canvas.removeEventListener("mouseenter", handleEnter);
    };
  }, [width, height]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════
   15. Ecosystem — seed → full ecosystem. Mouse X = time/evolution.
   Move right to fast-forward from bare ground to thriving forest.
   ═══════════════════════════════════════════════════ */
export function EcosystemVisual({ width, height }: VisualProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const state = useRef({
    mouse: { x: 0, y: height / 2, active: false },
    time: 0,
    seed: Math.random() * 999,
    progress: 0,
  });
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = width;
    canvas.height = height;

    const s = state.current;
    const groundY = height * 0.7;

    function seededRandom(n: number) {
      const x = Math.sin(s.seed + n * 127.1) * 43758.5453;
      return x - Math.floor(x);
    }

    const handleMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      s.mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top, active: true };
    };
    const handleLeave = () => { s.mouse.active = false; };
    canvas.addEventListener("mousemove", handleMove);
    canvas.addEventListener("mouseleave", handleLeave);

    // Pre-generate stable positions
    const grassBlades: { x: number; h: number }[] = [];
    for (let i = 0; i < 80; i++) {
      grassBlades.push({ x: seededRandom(i * 3) * width, h: 5 + seededRandom(i * 3 + 1) * 15 });
    }
    const treeDefs: { x: number; maxH: number; canopyR: number; appearAt: number }[] = [
      { x: width * 0.5, maxH: 120, canopyR: 50, appearAt: 0.15 },
      { x: width * 0.3, maxH: 80, canopyR: 35, appearAt: 0.50 },
      { x: width * 0.7, maxH: 90, canopyR: 40, appearAt: 0.55 },
      { x: width * 0.15, maxH: 70, canopyR: 30, appearAt: 0.65 },
      { x: width * 0.85, maxH: 75, canopyR: 32, appearAt: 0.70 },
      { x: width * 0.42, maxH: 100, canopyR: 45, appearAt: 0.72 },
      { x: width * 0.62, maxH: 85, canopyR: 38, appearAt: 0.75 },
    ];
    const flowerDefs: { x: number; stemH: number; appearAt: number }[] = [];
    for (let i = 0; i < 15; i++) {
      flowerDefs.push({ x: seededRandom(200 + i) * width, stemH: 8 + seededRandom(201 + i) * 12, appearAt: 0.3 + seededRandom(202 + i) * 0.3 });
    }
    const birdDefs: { baseX: number; baseY: number; speed: number; amp: number; appearAt: number }[] = [];
    for (let i = 0; i < 6; i++) {
      birdDefs.push({
        baseX: seededRandom(300 + i) * width,
        baseY: height * 0.1 + seededRandom(301 + i) * height * 0.25,
        speed: 0.3 + seededRandom(302 + i) * 0.5,
        amp: 5 + seededRandom(303 + i) * 10,
        appearAt: 0.65 + seededRandom(304 + i) * 0.2,
      });
    }
    const mushroomDefs: { treeIdx: number; side: number; appearAt: number }[] = [];
    for (let i = 0; i < 5; i++) {
      mushroomDefs.push({ treeIdx: i % treeDefs.length, side: seededRandom(400 + i) > 0.5 ? 1 : -1, appearAt: 0.8 + seededRandom(401 + i) * 0.15 });
    }

    function getStage(p: number): string {
      if (p < 0.15) return "BARREN SOIL";
      if (p < 0.30) return "FIRST SPROUT";
      if (p < 0.50) return "YOUNG GROWTH";
      if (p < 0.70) return "WOODLAND";
      if (p < 0.85) return "FOREST";
      return "FULL ECOSYSTEM";
    }

    function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
    function clamp01(v: number) { return Math.max(0, Math.min(1, v)); }

    function getGroundYAt(x: number) {
      return groundY + Math.sin(x * 0.008 + 1) * 8 + Math.sin(x * 0.015 + 3) * 5;
    }

    function drawGround(p: number) {
      ctx!.beginPath();
      ctx!.moveTo(0, groundY);
      for (let x = 0; x <= width; x += 2) {
        ctx!.lineTo(x, getGroundYAt(x));
      }
      ctx!.lineTo(width, height);
      ctx!.lineTo(0, height);
      ctx!.closePath();
      ctx!.fillStyle = `rgba(0,0,0,${0.04 + p * 0.04})`;
      ctx!.fill();
      ctx!.beginPath();
      for (let x = 0; x <= width; x += 2) {
        if (x === 0) ctx!.moveTo(x, getGroundYAt(x));
        else ctx!.lineTo(x, getGroundYAt(x));
      }
      ctx!.strokeStyle = `rgba(0,0,0,${0.15 + p * 0.1})`;
      ctx!.lineWidth = 1;
      ctx!.stroke();
    }

    function drawSeed(p: number) {
      if (p > 0.2) return;
      const seedProgress = clamp01(p / 0.15);
      const seedX = width * 0.5;
      const landY = getGroundYAt(seedX);
      const seedY = lerp(landY - 60, landY - 3, seedProgress);
      const opacity = p < 0.05 ? clamp01(p / 0.05) : (p > 0.15 ? 1 - clamp01((p - 0.15) / 0.05) : 1);
      ctx!.beginPath();
      ctx!.arc(seedX, seedY, 3, 0, Math.PI * 2);
      ctx!.fillStyle = `rgba(0,0,0,${0.5 * opacity})`;
      ctx!.fill();
    }

    function drawGrass(p: number) {
      const grassAppear = clamp01((p - 0.12) / 0.2);
      if (grassAppear <= 0) return;
      const numBlades = Math.floor(grassBlades.length * clamp01(p / 0.6));
      for (let i = 0; i < numBlades; i++) {
        const blade = grassBlades[i];
        const gy = getGroundYAt(blade.x);
        const h = blade.h * grassAppear;
        const sway = Math.sin(s.time * 0.002 + blade.x * 0.05) * 2 * grassAppear;
        ctx!.beginPath();
        ctx!.moveTo(blade.x, gy);
        ctx!.lineTo(blade.x + sway, gy - h);
        ctx!.strokeStyle = `rgba(0,0,0,${0.12 * grassAppear})`;
        ctx!.lineWidth = 1;
        ctx!.stroke();
      }
    }

    function drawTree(treeDef: typeof treeDefs[0], p: number) {
      const treeProgress = clamp01((p - treeDef.appearAt) / 0.2);
      if (treeProgress <= 0) return;
      const tx = treeDef.x;
      const gy = getGroundYAt(tx);
      const trunkH = treeDef.maxH * treeProgress;
      const canopyR = treeDef.canopyR * treeProgress;

      ctx!.beginPath();
      ctx!.moveTo(tx, gy);
      ctx!.lineTo(tx, gy - trunkH);
      ctx!.strokeStyle = `rgba(0,0,0,${0.25 * treeProgress})`;
      ctx!.lineWidth = 2 + treeProgress * 2;
      ctx!.stroke();

      if (treeProgress > 0.3) {
        const canopyOp = clamp01((treeProgress - 0.3) / 0.7);
        ctx!.beginPath();
        ctx!.ellipse(tx, gy - trunkH - canopyR * 0.5, canopyR, canopyR * 0.8, 0, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(0,0,0,${0.06 * canopyOp})`;
        ctx!.fill();
        ctx!.strokeStyle = `rgba(0,0,0,${0.12 * canopyOp})`;
        ctx!.lineWidth = 1;
        ctx!.stroke();
      }
    }

    function drawFlowers(p: number) {
      for (const f of flowerDefs) {
        const fp = clamp01((p - f.appearAt) / 0.1);
        if (fp <= 0) continue;
        const gy = getGroundYAt(f.x);
        const h = f.stemH * fp;
        const sway = Math.sin(s.time * 0.003 + f.x * 0.1) * 1.5 * fp;
        ctx!.beginPath();
        ctx!.moveTo(f.x, gy);
        ctx!.lineTo(f.x + sway, gy - h);
        ctx!.strokeStyle = `rgba(0,0,0,${0.15 * fp})`;
        ctx!.lineWidth = 1;
        ctx!.stroke();
        ctx!.beginPath();
        ctx!.arc(f.x + sway, gy - h, 2 * fp, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(0,0,0,${0.2 * fp})`;
        ctx!.fill();
      }
    }

    function drawRiver(p: number) {
      const riverAppear = clamp01((p - 0.45) / 0.15);
      if (riverAppear <= 0) return;
      const riverY = groundY + 20;
      ctx!.beginPath();
      for (let x = 0; x <= width; x += 2) {
        const wave = Math.sin(x * 0.02 + s.time * 0.003) * 3 * riverAppear;
        if (x === 0) ctx!.moveTo(x, riverY + wave);
        else ctx!.lineTo(x, riverY + wave);
      }
      ctx!.strokeStyle = `rgba(0,0,0,${0.1 * riverAppear})`;
      ctx!.lineWidth = 1.5;
      ctx!.stroke();
      if (riverAppear > 0.5) {
        const rippleOp = clamp01((riverAppear - 0.5) / 0.5);
        for (let i = 0; i < 8; i++) {
          const rx = seededRandom(500 + i) * width;
          const rw = 10 + seededRandom(510 + i) * 15;
          const wave2 = Math.sin(rx * 0.02 + s.time * 0.003) * 3 * riverAppear;
          ctx!.beginPath();
          ctx!.moveTo(rx, riverY + wave2 + 4);
          ctx!.lineTo(rx + rw, riverY + wave2 + 4);
          ctx!.strokeStyle = `rgba(0,0,0,${0.06 * rippleOp})`;
          ctx!.lineWidth = 1;
          ctx!.stroke();
        }
      }
    }

    function drawBirds(p: number) {
      for (const b of birdDefs) {
        const bp = clamp01((p - b.appearAt) / 0.1);
        if (bp <= 0) continue;
        const bx = (b.baseX + s.time * b.speed * 0.05) % (width + 40) - 20;
        const by = b.baseY + Math.sin(s.time * 0.002 * b.speed + b.baseX) * b.amp;
        ctx!.beginPath();
        ctx!.moveTo(bx - 5, by + 2);
        ctx!.lineTo(bx, by);
        ctx!.lineTo(bx + 5, by + 2);
        ctx!.strokeStyle = `rgba(0,0,0,${0.2 * bp})`;
        ctx!.lineWidth = 1;
        ctx!.stroke();
      }
    }

    function drawClouds(p: number) {
      const cloudAppear = clamp01((p - 0.8) / 0.15);
      if (cloudAppear <= 0) return;
      for (let i = 0; i < 3; i++) {
        const cx = (seededRandom(600 + i) * width + s.time * 0.02 * (i + 1)) % (width + 100) - 50;
        const cy = height * 0.08 + seededRandom(610 + i) * height * 0.1;
        ctx!.beginPath();
        ctx!.ellipse(cx, cy, 30, 10, 0, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(0,0,0,${0.03 * cloudAppear})`;
        ctx!.fill();
        ctx!.beginPath();
        ctx!.ellipse(cx + 15, cy - 3, 20, 8, 0, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(0,0,0,${0.025 * cloudAppear})`;
        ctx!.fill();
      }
    }

    function drawMushrooms(p: number) {
      for (const m of mushroomDefs) {
        const mp = clamp01((p - m.appearAt) / 0.1);
        if (mp <= 0) continue;
        const tree = treeDefs[m.treeIdx];
        const mx = tree.x + m.side * (8 + seededRandom(m.treeIdx * 7) * 8);
        const gy = getGroundYAt(mx);
        ctx!.beginPath();
        ctx!.moveTo(mx, gy);
        ctx!.lineTo(mx, gy - 6 * mp);
        ctx!.strokeStyle = `rgba(0,0,0,${0.15 * mp})`;
        ctx!.lineWidth = 1.5;
        ctx!.stroke();
        ctx!.beginPath();
        ctx!.arc(mx, gy - 6 * mp, 4 * mp, Math.PI, 0);
        ctx!.fillStyle = `rgba(0,0,0,${0.1 * mp})`;
        ctx!.fill();
      }
    }

    function drawLabel(p: number) {
      ctx!.font = "11px monospace";
      ctx!.fillStyle = "rgba(0,0,0,0.35)";
      ctx!.fillText(`ECOSYSTEM: ${getStage(p)}`, 16, height - 16);
    }

    function draw() {
      s.time++;
      const targetProgress = s.mouse.active ? clamp01(s.mouse.x / width) : s.progress;
      s.progress += (targetProgress - s.progress) * 0.04;
      const p = s.progress;

      ctx!.clearRect(0, 0, width, height);
      drawGround(p);
      drawSeed(p);
      drawGrass(p);
      drawRiver(p);
      for (const t of treeDefs) drawTree(t, p);
      drawFlowers(p);
      drawMushrooms(p);
      drawBirds(p);
      drawClouds(p);
      drawLabel(p);

      frameRef.current = requestAnimationFrame(draw);
    }

    frameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frameRef.current);
      canvas.removeEventListener("mousemove", handleMove);
      canvas.removeEventListener("mouseleave", handleLeave);
    };
  }, [width, height]);

  return <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} />;
}

/* ═══════════════════════════════════════════════════
   16. Telescope — constellation map revealed by mouse proximity.
   Move your mouse to discover 5 hidden growth-framework constellations.
   ═══════════════════════════════════════════════════ */
export function TelescopeVisual({ width, height }: VisualProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const state = useRef({
    mouse: { x: -999, y: -999, active: false },
    time: 0,
    seed: Math.random() * 999,
    discovered: new Set<number>(),
  });
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = width;
    canvas.height = height;

    const s = state.current;

    function seededRandom(n: number) {
      const x = Math.sin(s.seed + n * 127.1) * 43758.5453;
      return x - Math.floor(x);
    }

    const handleMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      s.mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top, active: true };
    };
    const handleLeave = () => { s.mouse.active = false; };
    canvas.addEventListener("mousemove", handleMove);
    canvas.addEventListener("mouseleave", handleLeave);

    // Background stars
    const bgStars: { x: number; y: number; baseOp: number; phase: number; speed: number }[] = [];
    for (let i = 0; i < 140; i++) {
      bgStars.push({
        x: seededRandom(i * 5) * width,
        y: seededRandom(i * 5 + 1) * height,
        baseOp: 0.08 + seededRandom(i * 5 + 2) * 0.12,
        phase: seededRandom(i * 5 + 3) * Math.PI * 2,
        speed: 0.5 + seededRandom(i * 5 + 4) * 1.5,
      });
    }

    // Constellation definitions
    type ConstellationDef = {
      name: string;
      cx: number; cy: number;
      stars: { x: number; y: number }[];
      lines: [number, number][];
      reveal: number;
    };

    const constellations: ConstellationDef[] = [
      // THE FUNNEL — triangle/funnel shape, upper-left area
      {
        name: "THE FUNNEL", cx: width * 0.18, cy: height * 0.25, reveal: 0,
        stars: [
          { x: -30, y: -40 }, { x: 30, y: -40 },
          { x: -20, y: -15 }, { x: 20, y: -15 },
          { x: -10, y: 10 }, { x: 10, y: 10 },
          { x: 0, y: 35 },
        ],
        lines: [[0,1],[0,2],[1,3],[2,4],[3,5],[4,6],[5,6]],
      },
      // THE FLYWHEEL — circular pattern, upper-right
      {
        name: "THE FLYWHEEL", cx: width * 0.8, cy: height * 0.22, reveal: 0,
        stars: (() => {
          const pts: { x: number; y: number }[] = [];
          for (let i = 0; i < 7; i++) {
            const angle = (i / 7) * Math.PI * 2 - Math.PI / 2;
            pts.push({ x: Math.cos(angle) * 35, y: Math.sin(angle) * 35 });
          }
          return pts;
        })(),
        lines: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,0]],
      },
      // THE LOOP — figure-8, center
      {
        name: "THE LOOP", cx: width * 0.5, cy: height * 0.5, reveal: 0,
        stars: [
          { x: 0, y: 0 },
          { x: -25, y: -20 }, { x: -35, y: 0 }, { x: -25, y: 20 },
          { x: 25, y: -20 }, { x: 35, y: 0 }, { x: 25, y: 20 },
        ],
        lines: [[0,1],[1,2],[2,3],[3,0],[0,4],[4,5],[5,6],[6,0]],
      },
      // THE LADDER — step pattern, lower-left
      {
        name: "THE LADDER", cx: width * 0.22, cy: height * 0.72, reveal: 0,
        stars: [
          { x: -20, y: 35 }, { x: 10, y: 35 },
          { x: 10, y: 15 }, { x: 30, y: 15 },
          { x: 30, y: -5 }, { x: 50, y: -5 },
          { x: 50, y: -30 },
        ],
        lines: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6]],
      },
      // THE NETWORK — web pattern, lower-right
      {
        name: "THE NETWORK", cx: width * 0.78, cy: height * 0.72, reveal: 0,
        stars: [
          { x: 0, y: 0 },
          { x: -30, y: -20 }, { x: 25, y: -25 },
          { x: -35, y: 15 }, { x: 30, y: 20 },
          { x: 0, y: 35 },
        ],
        lines: [[0,1],[0,2],[0,3],[0,4],[0,5],[1,2],[2,4],[4,5],[5,3],[3,1]],
      },
    ];

    const REVEAL_RADIUS = 150;

    function drawBgStars() {
      for (const star of bgStars) {
        const twinkle = Math.sin(s.time * 0.02 * star.speed + star.phase) * 0.5 + 0.5;
        const op = star.baseOp * (0.5 + twinkle * 0.5);
        ctx!.beginPath();
        ctx!.arc(star.x, star.y, 1, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(0,0,0,${op})`;
        ctx!.fill();
      }
    }

    function drawConstellation(c: ConstellationDef) {
      const r = c.reveal;
      if (r <= 0.01) {
        for (const star of c.stars) {
          ctx!.beginPath();
          ctx!.arc(c.cx + star.x, c.cy + star.y, 1.5, 0, Math.PI * 2);
          ctx!.fillStyle = "rgba(0,0,0,0.08)";
          ctx!.fill();
        }
        return;
      }

      // Glow behind stars
      for (const star of c.stars) {
        const sx = c.cx + star.x;
        const sy = c.cy + star.y;
        const glow = ctx!.createRadialGradient(sx, sy, 0, sx, sy, 10 * r);
        glow.addColorStop(0, `rgba(0,0,0,${0.08 * r})`);
        glow.addColorStop(1, "rgba(0,0,0,0)");
        ctx!.beginPath();
        ctx!.arc(sx, sy, 10 * r, 0, Math.PI * 2);
        ctx!.fillStyle = glow;
        ctx!.fill();
      }

      // Lines
      ctx!.strokeStyle = `rgba(0,0,0,${0.15 * r})`;
      ctx!.lineWidth = 1;
      for (const [a, b] of c.lines) {
        ctx!.beginPath();
        ctx!.moveTo(c.cx + c.stars[a].x, c.cy + c.stars[a].y);
        ctx!.lineTo(c.cx + c.stars[b].x, c.cy + c.stars[b].y);
        ctx!.stroke();
      }

      // Stars (brighter)
      for (const star of c.stars) {
        const twinkle = Math.sin(s.time * 0.03 + star.x * 0.1 + star.y * 0.1) * 0.15;
        ctx!.beginPath();
        ctx!.arc(c.cx + star.x, c.cy + star.y, 1.5 + r * 1.5, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(0,0,0,${(0.25 + twinkle) * r + 0.08 * (1 - r)})`;
        ctx!.fill();
      }

      // Name label
      if (r > 0.3) {
        ctx!.font = "10px monospace";
        ctx!.fillStyle = `rgba(0,0,0,${0.3 * Math.min(1, (r - 0.3) / 0.4)})`;
        ctx!.fillText(c.name, c.cx - ctx!.measureText(c.name).width / 2, c.cy + 55);
      }
    }

    function drawLens() {
      if (!s.mouse.active) return;
      ctx!.beginPath();
      ctx!.arc(s.mouse.x, s.mouse.y, REVEAL_RADIUS, 0, Math.PI * 2);
      ctx!.strokeStyle = "rgba(0,0,0,0.06)";
      ctx!.lineWidth = 1;
      ctx!.setLineDash([4, 6]);
      ctx!.stroke();
      ctx!.setLineDash([]);
    }

    function drawLabel() {
      ctx!.font = "11px monospace";
      ctx!.fillStyle = "rgba(0,0,0,0.35)";
      ctx!.fillText(`PATTERNS DISCOVERED: ${s.discovered.size}/5`, 16, height - 16);
    }

    function draw() {
      s.time++;
      ctx!.clearRect(0, 0, width, height);

      drawBgStars();

      for (let i = 0; i < constellations.length; i++) {
        const c = constellations[i];
        const dx = s.mouse.x - c.cx;
        const dy = s.mouse.y - c.cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const inRange = s.mouse.active && dist < REVEAL_RADIUS;

        if (inRange) {
          c.reveal = Math.min(1, c.reveal + 0.025);
          if (c.reveal > 0.5) s.discovered.add(i);
        } else {
          c.reveal = Math.max(0, c.reveal - 0.015);
        }

        drawConstellation(c);
      }

      drawLens();
      drawLabel();

      frameRef.current = requestAnimationFrame(draw);
    }

    frameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frameRef.current);
      canvas.removeEventListener("mousemove", handleMove);
      canvas.removeEventListener("mouseleave", handleLeave);
    };
  }, [width, height]);

  return <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} />;
}

/* ═══════════════════════════════════════════════════
   17. Foundation → Skyscraper — a building grows from a
   solid cross-hatched foundation upward floor by floor on
   hover. Weak, cracked buildings wobble in the background.
   Crane sits on top while growing.
   ═══════════════════════════════════════════════════ */
export function FoundationVisual({ width, height }: VisualProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const state = useRef({
    mouse: { x: width / 2, y: height / 2, active: false },
    growth: 0,
    time: 0,
    seed: Math.random() * 999,
  });
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = width;
    canvas.height = height;

    const s = state.current;
    const maxFloors = 5;
    const floorLabels = ["POSITIONING", "CHANNELS", "OPTIMIZATION", "SCALE", "SCALE"];
    const groundY = height * 0.80;
    const foundationH = height * 0.15;
    const buildingW = width * 0.18;
    const buildingX = width * 0.5 - buildingW / 2;
    const floorH = (groundY - foundationH - height * 0.08) / maxFloors;

    const weakBuildings = [
      { x: width * 0.12, w: width * 0.08, h: height * 0.32, lean: 3, crackSeed: 1 },
      { x: width * 0.24, w: width * 0.06, h: height * 0.22, lean: -4, crackSeed: 2 },
      { x: width * 0.72, w: width * 0.07, h: height * 0.28, lean: -3, crackSeed: 3 },
      { x: width * 0.84, w: width * 0.05, h: height * 0.18, lean: 5, crackSeed: 4 },
    ];

    function seededRandom(n: number) {
      const v = Math.sin(s.seed + n * 127.1) * 43758.5453;
      return v - Math.floor(v);
    }

    const handleMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      s.mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top, active: true };
    };
    const handleLeave = () => { s.mouse.active = false; };
    canvas.addEventListener("mousemove", handleMove);
    canvas.addEventListener("mouseleave", handleLeave);

    function loop() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      s.time += 0.016;

      const targetGrowth = s.mouse.active ? maxFloors : Math.max(0, s.growth - 0.008);
      const spd = s.mouse.active ? 0.03 : 0.008;
      s.growth += (targetGrowth - s.growth) * spd;

      // Ground line (dashed)
      ctx.strokeStyle = "rgba(0,0,0,0.25)";
      ctx.lineWidth = 1;
      ctx.setLineDash([6, 4]);
      ctx.beginPath();
      ctx.moveTo(0, groundY);
      ctx.lineTo(width, groundY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Weak background buildings
      for (const wb of weakBuildings) {
        const wobble = Math.sin(s.time * 1.2 + wb.crackSeed * 2) * 0.8;
        const ang = ((wb.lean + wobble) * Math.PI) / 180;
        ctx.save();
        ctx.translate(wb.x + wb.w / 2, groundY);
        ctx.rotate(ang);

        ctx.fillStyle = "rgba(0,0,0,0.04)";
        ctx.fillRect(-wb.w / 2, -wb.h, wb.w, wb.h);
        ctx.strokeStyle = "rgba(0,0,0,0.15)";
        ctx.lineWidth = 0.5;
        ctx.strokeRect(-wb.w / 2, -wb.h, wb.w, wb.h);

        ctx.strokeStyle = "rgba(0,0,0,0.18)";
        ctx.lineWidth = 0.5;
        for (let c = 0; c < 3; c++) {
          const crY = -wb.h * seededRandom(wb.crackSeed * 10 + c);
          const crX = -wb.w / 2 + wb.w * seededRandom(wb.crackSeed * 10 + c + 5);
          ctx.beginPath();
          ctx.moveTo(crX, crY);
          ctx.lineTo(crX + seededRandom(wb.crackSeed + c) * 12 - 6, crY + 8 + seededRandom(wb.crackSeed + c + 1) * 10);
          ctx.lineTo(crX + seededRandom(wb.crackSeed + c + 2) * 8 - 4, crY + 18 + seededRandom(wb.crackSeed + c + 3) * 8);
          ctx.stroke();
        }

        for (let wy = 0; wy < 3; wy++) {
          for (let wx = 0; wx < 2; wx++) {
            const wX = -wb.w / 2 + 3 + wx * (wb.w / 2 - 2);
            const wY = -wb.h + 6 + wy * (wb.h / 3.5);
            const skew = (seededRandom(wb.crackSeed + wy * 2 + wx) - 0.5) * 3;
            ctx.fillStyle = "rgba(0,0,0,0.08)";
            ctx.save();
            ctx.translate(wX + 3, wY + 3);
            ctx.rotate((skew * Math.PI) / 180);
            ctx.fillRect(-3, -3, 6, 6);
            ctx.restore();
          }
        }
        ctx.restore();
      }

      // Foundation (always visible)
      const fX = buildingX - 8;
      const fW = buildingW + 16;
      const fY = groundY - foundationH;
      ctx.fillStyle = "rgba(0,0,0,0.08)";
      ctx.fillRect(fX, fY, fW, foundationH);
      ctx.strokeStyle = "rgba(0,0,0,0.35)";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(fX, fY, fW, foundationH);

      // Cross-hatch
      ctx.save();
      ctx.beginPath();
      ctx.rect(fX, fY, fW, foundationH);
      ctx.clip();
      ctx.strokeStyle = "rgba(0,0,0,0.12)";
      ctx.lineWidth = 0.5;
      const hatchSp = 8;
      for (let hi = -(foundationH / hatchSp); hi < (fW / hatchSp) + 1; hi++) {
        const ho = hi * hatchSp;
        ctx.beginPath();
        ctx.moveTo(fX + ho, fY);
        ctx.lineTo(fX + ho - foundationH, fY + foundationH);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(fX + ho, fY + foundationH);
        ctx.lineTo(fX + ho + foundationH, fY);
        ctx.stroke();
      }
      ctx.restore();

      ctx.fillStyle = "rgba(0,0,0,0.3)";
      ctx.font = "bold 9px 'IBM Plex Mono', monospace";
      ctx.textAlign = "center";
      ctx.fillText("FOUNDATION", fX + fW / 2, fY + foundationH / 2 + 3);

      // Main building floors
      const builtFloors = Math.min(maxFloors, s.growth);
      for (let i = 0; i < Math.ceil(builtFloors); i++) {
        const progress = Math.min(1, builtFloors - i);
        const curFloorY = fY - (i + 1) * floorH;
        const al = progress;

        ctx.fillStyle = `rgba(0,0,0,${0.03 * al})`;
        ctx.fillRect(buildingX, curFloorY + floorH * (1 - progress), buildingW, floorH * progress);
        ctx.strokeStyle = `rgba(0,0,0,${0.35 * al})`;
        ctx.lineWidth = 1;
        ctx.strokeRect(buildingX, curFloorY + floorH * (1 - progress), buildingW, floorH * progress);

        if (progress > 0.5) {
          const winAl = (progress - 0.5) * 2;
          const winSz = Math.min(8, floorH * 0.35);
          const winSpc = buildingW / 4;
          for (let w = 0; w < 3; w++) {
            const wxx = buildingX + winSpc * (w + 1) - winSz / 2;
            const wyy = curFloorY + floorH * 0.35 - winSz / 2;
            ctx.fillStyle = `rgba(0,0,0,${0.12 * winAl})`;
            ctx.fillRect(wxx, wyy, winSz, winSz);
            ctx.strokeStyle = `rgba(0,0,0,${0.2 * winAl})`;
            ctx.lineWidth = 0.5;
            ctx.strokeRect(wxx, wyy, winSz, winSz);
          }
          ctx.fillStyle = `rgba(0,0,0,${0.28 * winAl})`;
          ctx.font = "bold 7px 'IBM Plex Mono', monospace";
          ctx.textAlign = "center";
          ctx.fillText(floorLabels[i], buildingX + buildingW / 2, curFloorY + floorH * 0.78);
        }
      }

      // Crane
      if (s.growth > 0.5 && s.mouse.active) {
        const crAlpha = Math.min(1, s.growth / 2) * 0.4;
        const topFl = Math.ceil(builtFloors);
        const crBaseY = fY - topFl * floorH;
        const crX = buildingX + buildingW * 0.7;
        const crTopY = crBaseY - height * 0.1;
        const crArmEnd = crX + width * 0.08;

        ctx.strokeStyle = `rgba(0,0,0,${crAlpha})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(crX, crBaseY);
        ctx.lineTo(crX, crTopY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(crX - 10, crTopY);
        ctx.lineTo(crArmEnd, crTopY);
        ctx.stroke();
        const cSwing = Math.sin(s.time * 2) * 3;
        ctx.strokeStyle = `rgba(0,0,0,${crAlpha * 0.7})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(crArmEnd - 5, crTopY);
        ctx.lineTo(crArmEnd - 5 + cSwing, crTopY + 15);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(crArmEnd - 5 + cSwing, crTopY + 17, 2, 0, Math.PI, false);
        ctx.stroke();
      }

      // Floor counter
      ctx.fillStyle = "rgba(0,0,0,0.3)";
      ctx.font = "bold 10px 'IBM Plex Mono', monospace";
      ctx.textAlign = "left";
      ctx.fillText(`FLOORS: ${Math.min(maxFloors, Math.floor(s.growth))}/${maxFloors}`, 12, height - 14);

      frameRef.current = requestAnimationFrame(loop);
    }
    frameRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frameRef.current);
      canvas.removeEventListener("mousemove", handleMove);
      canvas.removeEventListener("mouseleave", handleLeave);
    };
  }, [width, height]);

  return <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} />;
}

/* ═══════════════════════════════════════════════════
   18. Drafting Table — top-down blueprint being drawn
   in real-time. Mouse movement traces a growth system
   diagram with boxes, arrows, and architectural markings.
   ═══════════════════════════════════════════════════ */
export function DraftingVisual({ width, height }: VisualProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const state = useRef({
    mouse: { x: width / 2, y: height / 2, active: false },
    prevMouse: { x: width / 2, y: height / 2 },
    totalDist: 0,
    time: 0,
  });
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = width;
    canvas.height = height;

    const s = state.current;

    const boxW = width * 0.13;
    const boxH = height * 0.09;
    const dLabels = ["AUDIENCE", "CONTENT", "DISTRIBUTION", "CONVERSION", "RETENTION"];
    const dims = ["120px", "1.5x", "3.2x", "0.8x"];

    const boxes = [
      { x: width * 0.15, y: height * 0.25 },
      { x: width * 0.38, y: height * 0.18 },
      { x: width * 0.58, y: height * 0.35 },
      { x: width * 0.38, y: height * 0.52 },
      { x: width * 0.62, y: height * 0.62 },
    ];

    const segments: { type: "box" | "arrow" | "label"; idx: number; length: number }[] = [];
    let totalPath = 0;
    for (let i = 0; i < boxes.length; i++) {
      const perim = (boxW + boxH) * 2;
      segments.push({ type: "box", idx: i, length: perim });
      totalPath += perim;
      segments.push({ type: "label", idx: i, length: 20 });
      totalPath += 20;
      if (i < boxes.length - 1) {
        const adx = boxes[i + 1].x - boxes[i].x;
        const ady = boxes[i + 1].y - boxes[i].y;
        segments.push({ type: "arrow", idx: i, length: Math.sqrt(adx * adx + ady * ady) });
        totalPath += segments[segments.length - 1].length;
      }
    }

    const handleMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const nx = e.clientX - rect.left;
      const ny = e.clientY - rect.top;
      const mdx = nx - s.prevMouse.x;
      const mdy = ny - s.prevMouse.y;
      s.totalDist += Math.sqrt(mdx * mdx + mdy * mdy);
      s.prevMouse = { x: nx, y: ny };
      s.mouse = { x: nx, y: ny, active: true };
    };
    const handleLeave = () => { s.mouse.active = false; };
    canvas.addEventListener("mousemove", handleMove);
    canvas.addEventListener("mouseleave", handleLeave);

    function drawSerif(sx: number, sy: number, vert: boolean) {
      if (!ctx) return;
      ctx.beginPath();
      if (vert) { ctx.moveTo(sx - 3, sy); ctx.lineTo(sx + 3, sy); }
      else { ctx.moveTo(sx, sy - 3); ctx.lineTo(sx, sy + 3); }
      ctx.stroke();
    }

    function loop() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      s.time += 0.016;

      const drawProg = Math.min(1, s.totalDist / (totalPath * 1.2));
      const drawnLen = drawProg * totalPath;
      const done = drawProg > 0.98;

      // Grid
      const gridSp = 20;
      ctx.strokeStyle = "rgba(0,0,0,0.04)";
      ctx.lineWidth = 0.5;
      for (let gx = 0; gx < width; gx += gridSp) {
        ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, height); ctx.stroke();
      }
      for (let gy = 0; gy < height; gy += gridSp) {
        ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(width, gy); ctx.stroke();
      }

      // Edge rulers
      ctx.strokeStyle = "rgba(0,0,0,0.12)";
      ctx.lineWidth = 0.5;
      for (let rx = 0; rx < width; rx += gridSp) {
        const th = rx % (gridSp * 5) === 0 ? 8 : 4;
        ctx.beginPath(); ctx.moveTo(rx, 0); ctx.lineTo(rx, th); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(rx, height); ctx.lineTo(rx, height - th); ctx.stroke();
      }
      for (let ry = 0; ry < height; ry += gridSp) {
        const tw = ry % (gridSp * 5) === 0 ? 8 : 4;
        ctx.beginPath(); ctx.moveTo(0, ry); ctx.lineTo(tw, ry); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(width, ry); ctx.lineTo(width - tw, ry); ctx.stroke();
      }

      // Diagram segments
      let used = 0;
      for (const seg of segments) {
        if (used >= drawnLen) break;
        const sp = Math.min(1, (drawnLen - used) / seg.length);
        const pa = done ? 0.3 + Math.sin(s.time * 2) * 0.1 : 0.35;

        if (seg.type === "box") {
          const b = boxes[seg.idx];
          ctx.strokeStyle = `rgba(0,0,0,${pa})`;
          ctx.lineWidth = 1;
          const perim = (boxW + boxH) * 2;
          const dr = sp * perim;
          ctx.beginPath();
          const tl = Math.min(dr, boxW);
          ctx.moveTo(b.x, b.y); ctx.lineTo(b.x + tl, b.y);
          if (dr > boxW) { const rl = Math.min(dr - boxW, boxH); ctx.moveTo(b.x + boxW, b.y); ctx.lineTo(b.x + boxW, b.y + rl); }
          if (dr > boxW + boxH) { const bl = Math.min(dr - boxW - boxH, boxW); ctx.moveTo(b.x + boxW, b.y + boxH); ctx.lineTo(b.x + boxW - bl, b.y + boxH); }
          if (dr > boxW * 2 + boxH) { const ll = Math.min(dr - boxW * 2 - boxH, boxH); ctx.moveTo(b.x, b.y + boxH); ctx.lineTo(b.x, b.y + boxH - ll); }
          ctx.stroke();
          if (sp > 0.95) {
            ctx.strokeStyle = `rgba(0,0,0,${pa * 0.8})`;
            drawSerif(b.x, b.y, true); drawSerif(b.x + boxW, b.y, true);
            drawSerif(b.x, b.y + boxH, true); drawSerif(b.x + boxW, b.y + boxH, true);
          }
        }

        if (seg.type === "label") {
          const b = boxes[seg.idx];
          if (sp > 0.5) {
            const la = (sp - 0.5) * 2 * (done ? (0.3 + Math.sin(s.time * 2) * 0.08) : 0.3);
            ctx.fillStyle = `rgba(0,0,0,${la})`;
            ctx.font = "bold 8px 'IBM Plex Mono', monospace";
            ctx.textAlign = "center";
            ctx.fillText(dLabels[seg.idx], b.x + boxW / 2, b.y + boxH / 2 + 3);
          }
        }

        if (seg.type === "arrow") {
          const fr = boxes[seg.idx];
          const to = boxes[seg.idx + 1];
          const asx = fr.x + boxW, asy = fr.y + boxH / 2;
          const aex = to.x, aey = to.y + boxH / 2;
          const adx = aex - asx, ady = aey - asy;
          ctx.strokeStyle = `rgba(0,0,0,${pa * 0.8})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(asx, asy);
          ctx.lineTo(asx + adx * sp, asy + ady * sp);
          ctx.stroke();
          if (sp > 0.95) {
            const aa = Math.atan2(ady, adx);
            const hl = 6;
            ctx.beginPath();
            ctx.moveTo(aex, aey);
            ctx.lineTo(aex - hl * Math.cos(aa - 0.4), aey - hl * Math.sin(aa - 0.4));
            ctx.moveTo(aex, aey);
            ctx.lineTo(aex - hl * Math.cos(aa + 0.4), aey - hl * Math.sin(aa + 0.4));
            ctx.stroke();
            if (dims[seg.idx]) {
              const dmx = asx + adx * 0.5, dmy = asy + ady * 0.5 - 8;
              ctx.fillStyle = `rgba(0,0,0,${pa * 0.6})`;
              ctx.font = "7px 'IBM Plex Mono', monospace";
              ctx.textAlign = "center";
              ctx.fillText(dims[seg.idx], dmx, dmy);
            }
          }
        }
        used += seg.length;
      }

      // Crosshair
      if (s.mouse.active) {
        ctx.strokeStyle = "rgba(0,0,0,0.08)";
        ctx.lineWidth = 0.5;
        ctx.setLineDash([4, 4]);
        ctx.beginPath(); ctx.moveTo(s.mouse.x, 0); ctx.lineTo(s.mouse.x, height); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, s.mouse.y); ctx.lineTo(width, s.mouse.y); ctx.stroke();
        ctx.setLineDash([]);
        ctx.strokeStyle = "rgba(0,0,0,0.2)";
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(s.mouse.x - 8, s.mouse.y); ctx.lineTo(s.mouse.x + 8, s.mouse.y);
        ctx.moveTo(s.mouse.x, s.mouse.y - 8); ctx.lineTo(s.mouse.x, s.mouse.y + 8);
        ctx.stroke();
      }

      // Compass rose
      const cpx = width - 35, cpy = 35, cpr = 12;
      ctx.strokeStyle = "rgba(0,0,0,0.15)";
      ctx.lineWidth = 0.5;
      ctx.beginPath(); ctx.arc(cpx, cpy, cpr, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cpx, cpy - cpr); ctx.lineTo(cpx, cpy + cpr);
      ctx.moveTo(cpx - cpr, cpy); ctx.lineTo(cpx + cpr, cpy);
      ctx.stroke();
      ctx.fillStyle = "rgba(0,0,0,0.18)";
      ctx.font = "bold 5px 'IBM Plex Mono', monospace";
      ctx.textAlign = "center";
      ctx.fillText("N", cpx, cpy - cpr - 3);
      ctx.fillText("S", cpx, cpy + cpr + 7);
      ctx.fillText("E", cpx + cpr + 6, cpy + 2);
      ctx.fillText("W", cpx - cpr - 6, cpy + 2);

      // Title block
      const tbW = width * 0.22, tbH = height * 0.08;
      const tbX = width - tbW - 12, tbY = height - tbH - 12;
      ctx.strokeStyle = "rgba(0,0,0,0.18)";
      ctx.lineWidth = 0.5;
      ctx.setLineDash([3, 3]);
      ctx.strokeRect(tbX, tbY, tbW, tbH);
      ctx.setLineDash([]);
      ctx.fillStyle = "rgba(0,0,0,0.22)";
      ctx.font = "bold 8px 'IBM Plex Mono', monospace";
      ctx.textAlign = "center";
      ctx.fillText("GROWTH SYSTEM v2.0", tbX + tbW / 2, tbY + tbH / 2 + 3);

      // Progress
      ctx.fillStyle = "rgba(0,0,0,0.25)";
      ctx.font = "9px 'IBM Plex Mono', monospace";
      ctx.textAlign = "left";
      ctx.fillText(`DRAWN: ${Math.round(drawProg * 100)}%`, 12, height - 14);

      frameRef.current = requestAnimationFrame(loop);
    }
    frameRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frameRef.current);
      canvas.removeEventListener("mousemove", handleMove);
      canvas.removeEventListener("mouseleave", handleLeave);
    };
  }, [width, height]);

  return <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} />;
}


export function ReactorVisual({ width, height }: VisualProps) {
  const [Scene, setScene] = useState<any>(null);
  useEffect(() => {
    import("./ReactorScene").then(mod => setScene(() => mod.default));
  }, []);
  if (!Scene) return null;
  return <Scene width={width} height={height} />;
}

export function GearParticleVisual({ width, height }: VisualProps) {
  const [Scene, setScene] = useState<any>(null);
  useEffect(() => {
    import("./GearParticleScene").then(mod => setScene(() => mod.default));
  }, []);
  if (!Scene) return null;
  return <Scene width={width} height={height} />;
}

export function RocketParticleVisual({ width, height }: VisualProps) {
  const [Scene, setScene] = useState<any>(null);
  useEffect(() => {
    import("./RocketParticleScene").then(mod => setScene(() => mod.default));
  }, []);
  if (!Scene) return null;
  return <Scene width={width} height={height} />;
}

export function MorphVisual({ width, height }: VisualProps) {
  const [Scene, setScene] = useState<any>(null);
  useEffect(() => {
    import("./MorphScene").then(mod => setScene(() => mod.default));
  }, []);
  if (!Scene) return null;
  return <Scene width={width} height={height} />;
}

export function ReactorLightVisual({ width, height }: VisualProps) {
  const [Scene, setScene] = useState<any>(null);
  useEffect(() => {
    import("./ReactorSceneLight").then(mod => setScene(() => mod.default));
  }, []);
  if (!Scene) return null;
  return <Scene width={width} height={height} />;
}

export function GearParticleLightVisual({ width, height }: VisualProps) {
  const [Scene, setScene] = useState<any>(null);
  useEffect(() => {
    import("./GearParticleSceneLight").then(mod => setScene(() => mod.default));
  }, []);
  if (!Scene) return null;
  return <Scene width={width} height={height} />;
}

export function RocketParticleLightVisual({ width, height }: VisualProps) {
  const [Scene, setScene] = useState<any>(null);
  useEffect(() => {
    import("./RocketParticleSceneLight").then(mod => setScene(() => mod.default));
  }, []);
  if (!Scene) return null;
  return <Scene width={width} height={height} />;
}

export function MorphLightVisual({ width, height }: VisualProps) {
  const [Scene, setScene] = useState<any>(null);
  useEffect(() => {
    import("./MorphSceneLight").then(mod => setScene(() => mod.default));
  }, []);
  if (!Scene) return null;
  return <Scene width={width} height={height} />;
}

export function RocketMorphVisual({ width, height }: VisualProps) {
  const [Scene, setScene] = useState<any>(null);
  useEffect(() => {
    import("./RocketMorphScene").then(mod => setScene(() => mod.default));
  }, []);
  if (!Scene) return null;
  return <Scene width={width} height={height} />;
}

/* ═══════════════════════════════════════════════════
   Lookup map
   ═══════════════════════════════════════════════════ */
export const heroVisuals = [
  { id: "original", label: "Original (Unicorn Studio)", component: null },
  { id: "tree", label: "1. Growing Tree", component: TreeVisual },
  { id: "cell", label: "2. Cell Division (Spore)", component: CellVisual },
  { id: "network", label: "3. Network Graph", component: NetworkVisual },
  { id: "snowball", label: "4. Snowball", component: SnowballVisual },
  { id: "blueprint", label: "5. Blueprint Unfold", component: BlueprintVisual },
  { id: "evolution", label: "6. Evolution Chain", component: EvolutionVisual },
  { id: "machine", label: "7. Rube Goldberg Engine", component: MachineVisual },
  { id: "circuit", label: "8. Circuit Board", component: CircuitVisual },
  { id: "flywheel", label: "9. Flywheel", component: FlywheelVisual },
  { id: "reactor", label: "10. Reactor (Dark)", component: ReactorVisual },
  { id: "reactor-light", label: "11. Reactor (Light)", component: ReactorLightVisual },
  { id: "gear-particles", label: "12. Gears (Dark)", component: GearParticleVisual },
  { id: "gear-light", label: "13. Gears (Light)", component: GearParticleLightVisual },
  { id: "rocket-particles", label: "14. Rocket (Dark)", component: RocketParticleVisual },
  { id: "rocket-light", label: "15. Rocket (Light)", component: RocketParticleLightVisual },
  { id: "morph", label: "16. Morphing (Dark)", component: MorphVisual },
  { id: "morph-light", label: "17. Morphing (Light)", component: MorphLightVisual },
  { id: "reactor-full", label: "18. Reactor (Full)", component: ReactorLightVisual },
  { id: "gear-full", label: "19. Gears (Full)", component: GearParticleLightVisual },
  { id: "rocket-full", label: "20. Rocket (Full)", component: RocketParticleLightVisual },
  { id: "morph-full", label: "21. Morphing (Full)", component: MorphLightVisual },
  { id: "rocket-morph", label: "22. Rocket Morph", component: RocketMorphVisual },
  { id: "rocket-morph-full", label: "23. Rocket Morph (Full)", component: RocketMorphVisual },
  { id: "unicorn-2", label: "18. Unicorn Scene (New)", component: null },
  { id: "tree-3d", label: "19. 3D Growing Tree", component: null },
] as const;

export type HeroVisualId = typeof heroVisuals[number]["id"];
