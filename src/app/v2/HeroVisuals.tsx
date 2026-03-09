"use client";

import { useRef, useEffect } from "react";

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
   Lookup map
   ═══════════════════════════════════════════════════ */
export const heroVisuals = [
  { id: "original", label: "Original (Unicorn Studio)", component: null },
  { id: "tree", label: "1. Growing Tree", component: TreeVisual },
  { id: "city", label: "2. City Skyline", component: CityVisual },
  { id: "cell", label: "3. Cell Division (Spore)", component: CellVisual },
  { id: "network", label: "4. Network Graph", component: NetworkVisual },
  { id: "staircase", label: "5. Staircase Builder", component: StaircaseVisual },
  { id: "snowball", label: "6. Snowball", component: SnowballVisual },
  { id: "garden", label: "7. Garden", component: GardenVisual },
  { id: "signal", label: "8. Signal Amplifier", component: SignalVisual },
  { id: "blueprint", label: "9. Blueprint Unfold", component: BlueprintVisual },
  { id: "evolution", label: "10. Evolution Chain", component: EvolutionVisual },
  { id: "unicorn-2", label: "11. Unicorn Scene (New)", component: null },
  { id: "tree-3d", label: "12. 3D Growing Tree", component: null },
] as const;

export type HeroVisualId = typeof heroVisuals[number]["id"];
